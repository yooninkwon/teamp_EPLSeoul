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
	
	// 마커를 생성할 객체 배열입니다
	var positions = [];
	
	// 데이터를 fetch하고 마커를 생성하는 공통 함수
	function fetchAndDisplayData(url, imageSrc, category) {
	    fetch(url) // RestController에서 제공하는 API URL
	        .then(response => response.json()) // JSON 데이터를 JS 객체로 변환
	        .then(data => {
				
				// 요청 타입에따라 배열 생성
				if(category == "Bike"){
		            const stations = data.bikeStationMaster.row; // 필요한 데이터 접근
		            positions = stations.map(station => ({
		                addr1: station.ADDR1,
		                addr2: station.ADDR2,
		                latlng: new kakao.maps.LatLng(station.LAT, station.LOT)
		            }));
				} else if(category == "Scooter"){
					/* 추후 추가 */
				}

	            // 배열에따라 마커 생성
	            positions.forEach(position => {
					// 마커 이미지를 생성합니다
					var imageSize = new kakao.maps.Size(35, 35);
	                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
					
					// 마커를 생성합니다
	                var marker = new kakao.maps.Marker({
	                    map: map, // 마커를 표시할 지도
	                    position: position.latlng, // 마커를 표시할 위치
	                    image: markerImage, // 마커 이미지
	                    clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
	                });

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
	            });
	        })
	        .catch(error => console.error('Error fetching data:', error)); // 에러 처리
	}
	
	// 따릉이 대여소 정보 호출
	document.getElementById('fetchBikeData').addEventListener('click', function () {
	    fetchAndDisplayData('/epl/mobility/data/bike', "/static/images/mobility/marker_bicycle.png", "Bike");
	});
	
	// 전동킥보드 대여소 정보 호출
	document.getElementById('fetchScooterData').addEventListener('click', function () {
	    fetchAndDisplayData('/epl/mobility/data/scooter', "/static/images/mobility/marker_scooter.png", "Scooter");
	});
	
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
});