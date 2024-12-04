document.addEventListener('DOMContentLoaded', function() {

	// 지도 생성하기
	var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var mapOption = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(37.5658, 126.9769), //지도의 중심좌표. 위도(latitude), 경도(longitude)
		level: 3 //지도의 레벨(확대, 축소 정도)
	};
	
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
	
	// 생성된 마커 객체 배열
	var markers = [];
	
	// 마커를 모두 삭제하는 함수
	function clearMarkers() {
	    markers.forEach(marker => marker.setMap(null));
	    markers = [];
	}
	
	// 마커를 생성하는 공통 함수
	function createMarker(position, imageSrc) {
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
		
		// 인포윈도우를 생성합니다
		var iwContent = `<div style="padding:5px;">${position.addr1} ${position.addr2}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
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
		
		// 마커에 클릭이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'click', function() {
		    var message = `클릭한 장소 주소는 ${position.addr1} ${position.addr2} 입니다`;
		    var resultDiv = document.getElementById('result'); 
		    resultDiv.innerHTML = message;  
		});
	}
	
	// 데이터를 호출하는 공통 함수(js코드 모듈화를 위해 글로벌 등록)
	window.fetchAndDisplayData = function (imageSrc, service, useGeocoder = false) {
		clearMarkers(); // 기존 마커 제거
		var totalData = 0; // 총 station 개수를 저장하는 변수
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
									createMarker({
	                                    addr1: station.PSTN,
	                                    addr2: station.DTL_PSTN,
	                                    latlng: coords,
	                                }, imageSrc);
	                            }
	                        });
	                    });
	                } else { // 위도와 경도가 제공되는 경우(따릉이 정보)
						stations.forEach(station => {
	                        createMarker({
	                            addr1: station.ADDR1,
	                            addr2: station.ADDR2,
	                            latlng: new kakao.maps.LatLng(station.LAT, station.LOT),
	                        }, imageSrc);
	                    });
	                }
		        });
				
				console.log(`총 ${totalData}개 ${service} 데이터 호출 완료.`);
	        })
	        .catch(error => console.error('Error fetching data:', error)); // 에러 처리
	}
});