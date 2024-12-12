document.addEventListener('DOMContentLoaded', async function() {
	// 지도 생성하기
	var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var mapOption = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(37.5658, 126.9769), //지도의 중심좌표. 위도(latitude), 경도(longitude)
		level: 3 //지도의 레벨(확대, 축소 정도)
	}
	
	var map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

	// geolocation(현재 위치정보)으로 중심좌표 생성하기
	// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
	if (navigator.geolocation) {
	    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
	    navigator.geolocation.getCurrentPosition(function(position) {
	        
	        var lat = position.coords.latitude, // 위도
	            lon = position.coords.longitude; // 경도
	        
	        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
	        
	        // 지도의 중심좌표를 교체합니다
	        map.setCenter(locPosition);
	    });
	}
		
	// 자전거도로 정보 보기
	document.getElementById('chkBicycle').addEventListener('change',function(){
	    // 현재 체크박스 상태 확인
	    var isChecked = this.checked;

	    // 지도 타입을 제거합니다
	    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);

	    // 체크박스가 체크된 경우 지도 타입 추가
	    if (isChecked) {
	          map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
	    }
	});
	
	// SBD(Stations by district) 데이터 가져오기
    const sbdDatas = await fetch('/epl/mobility/data/sbdDatas')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching sbdDatas:', error);
            return [];
        });

    // guSelect 옵션 추가
    const guList = [...new Set(sbdDatas.map(item => item.gu))]; // 중복 제거
    guList.forEach(gu => {
        const option = document.createElement('option');
        option.value = gu;
        option.textContent = gu;
        document.getElementById('guSelect').appendChild(option);
    });

    // gu 선택값으로 dongSelect 옵션 추가
    document.getElementById('guSelect').addEventListener('change', function () {
        const selectedGu = this.value;
        document.getElementById('dongSelect').innerHTML = '<option value="">동 선택</option>'; // 초기화
        document.getElementById('stationSelect').innerHTML = ''; // 초기화

        if (!selectedGu) return;

        const dongList = [...new Set(sbdDatas
            .filter(item => item.gu === selectedGu)
            .map(item => item.dong))];
		
        dongList.forEach(dong => {
            const option = document.createElement('option');
            option.value = dong;
            option.textContent = dong;
            document.getElementById('dongSelect').appendChild(option);
        });
    });

    // dong 선택값으로 stationSelect 옵션 추가
    document.getElementById('dongSelect').addEventListener('change', function () {
        const selectedGu = document.getElementById('guSelect').value;
        const selectedDong = this.value;
        document.getElementById('stationSelect').innerHTML = ''; // 초기화

        if (!selectedDong) return;

        const stationList = sbdDatas
			.filter(item => item.gu === selectedGu && item.dong === selectedDong);
			
        stationList.forEach(station => {
            const btn = document.createElement('button');
            btn.textContent = station.name;
            btn.className = 'option-item';
			btn.addEventListener('click', () => { // 각 station 클릭 이벤트: 좌표값으로 지도 변경
				const lat = parseFloat(station.lat);
                const lot = parseFloat(station.lot);
				var locPosition = new kakao.maps.LatLng(lat, lot);
	            map.setCenter(locPosition);
	        });
            document.getElementById('stationSelect').appendChild(btn);
        });
    });
			
	// 따릉이 대여소 정보 호출
	document.getElementById('fetchBikeData').addEventListener('click', function () {
		document.getElementById('bikeInfo').style.display = "block";
		document.getElementById('kickboardInfo').style.display = "none";
		fetchAndDisplayData('/static/images/mobility/marker_bike.png', 'rentBikeStatus', false);
	});

	// 전동킥보드 주차구역 정보 호출
	document.getElementById('fetchKickboardData').addEventListener('click', function () {
		document.getElementById('kickboardInfo').style.display = "block";
		document.getElementById('bikeInfo').style.display = "none";
		fetchAndDisplayData('/static/images/mobility/marker_kickboard.png', 'parkingKickboard', true);
	});
	
	// 생성된 마커 객체 배열
	var markers = [];
	
	// 마커를 모두 삭제하는 함수
	function clearMarkers() {
	    markers.forEach(marker => marker.setMap(null));
	    markers = [];
	}
	
	// 마커를 생성하는 공통 함수
	function createMarker(service, position, imageSrc) {
		// 마커 이미지를 생성합니다
	    const imageSize = new kakao.maps.Size(35, 35);
	    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

		// 마커를 생성합니다
	    const marker = new kakao.maps.Marker({
	        map: map, // 마커를 표시할 지도
	        position: position.latlng, // 마커를 표시할 위치
	        image: markerImage, // 마커 이미지
	        clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
	    });

	    markers.push(marker); // 생성된 마커를 배열에 추가합니다
		
		// service별 인포윈도우를 생성합니다
		var iwContent; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
		if (service === 'parkingKickboard') {
			iwContent = `<div style="padding:5px;">${position.addr}</div>`;
		}else if (service === 'rentBikeStatus') {
			iwContent = `<div style="padding:5px;">${position.name}</div>`;
		}
		var infowindow = new kakao.maps.InfoWindow({
		    content : iwContent
		});
		
		// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
		kakao.maps.event.addListener(marker, 'mouseover', function() {
		    infowindow.open(map, marker);
		});
		
		// 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
		kakao.maps.event.addListener(marker, 'mouseout', function() {
		    infowindow.close();
		});

		// service별 마커에 클릭이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'click', function() {
			if (service === 'parkingKickboard') {
				document.getElementById('stationAddr').innerHTML = `${position.addr}`;
				document.getElementById('stationAvailable').innerHTML = `${position.stand}`;
				document.getElementById('stationRackCnt').innerHTML = `${position.standCnt}`;
			}else if (service === 'rentBikeStatus') {
				document.getElementById('stationName').innerHTML = `${position.name}`;
				document.getElementById('stationTotRackCnt').innerHTML = `${position.totrackCtn}`;
				document.getElementById('stationParkingCnt').innerHTML = `${position.parkingCtn}`;
				document.getElementById('stationAbleRackCnt').innerHTML = `${position.ableRackCtn}`;
			} 
		});
	}
	
	// 데이터를 호출하는 공통 함수
	function fetchAndDisplayData (imageSrc, service, useGeocoder) {
		clearMarkers(); // 기존 마커 제거
		var totalData = 0; // 총 데이터 개수를 저장하는 변수
		const geocoder = useGeocoder ? new kakao.maps.services.Geocoder() : null; // 주소-좌표 변환 객체 생성
	    fetch(`/epl/mobility/data/apiSeoul?service=${service}`) // 서버에 데이터 요청
	        .then(response => response.json()) // JSON 문자열을 JS 객체로 변환
	        .then(data => { // 서버에서 받은 데이터를 활용
				data.forEach(page => {
		            const parsedPage = JSON.parse(page); // 각 JSON 페이지를 객체로 변환
		            const stations = parsedPage[service].row; // 필요한 데이터 접근
	                totalData += stations.length; // 총 개수 누적
					// 주소 검색을 사용하는 경우(킥보드 정보)
					if (useGeocoder) {
	                    stations.forEach(station => {
	                        geocoder.addressSearch(station.PSTN, (result, status) => {
	                            if (status === kakao.maps.services.Status.OK) {
	                                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
									createMarker(service,
										{addr: station.PSTN + station.DTL_PSTN,
	                                    stand: station.STAND_YN,
										standCnt: station.STAND_SIZE,
	                                    latlng: coords},
										imageSrc);
	                            }
	                        });
	                    });
	                } else { // 위도와 경도가 제공되는 경우(따릉이 정보)
						stations.forEach(station => {
	                        createMarker(service,
								{name: station.stationName,
	                            totrackCtn: station.rackTotCnt,
	                            parkingCtn: station.parkingBikeTotCnt,
	                            ableRackCtn: station.rackTotCnt - station.parkingBikeTotCnt,
	                            latlng: new kakao.maps.LatLng(station.stationLatitude, station.stationLongitude)},
								imageSrc);
	                    });
	                }
		        });
				
				console.log(`총 ${totalData}개 ${service} 데이터 호출 완료.`);
	        })
	        .catch(error => console.error('Error fetching data:', error)); // 에러 처리
	}
});