kakao.maps.load(function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5759, 126.9796),  // 초기 지도 중심 (서울)
        level: 3
    };
    var map = new kakao.maps.Map(container, options);
    var markers = [];  // 마커 배열

  
	  // 장소 검색을 위한 카카오맵 검색 객체 생성
    var ps = new kakao.maps.services.Places();

    // 검색창 요소
    var searchInput = document.getElementById('searchInput');
    var suggestions = document.getElementById('suggestions');

    // 실시간 추천 기능
    searchInput.addEventListener('input', function () {
        var searchValue = searchInput.value.trim().toLowerCase();
        suggestions.innerHTML = ''; // 이전 추천 목록 초기화

        if (searchValue) {
            ps.keywordSearch(searchValue, placesSearchCB);
        }
    });

    // 서울시 범위
    var seoulBounds = {
        minLat: 37.4138,  // 최소 위도
        maxLat: 37.7151,  // 최대 위도
        minLng: 126.7341, // 최소 경도
        maxLng: 127.2663  // 최대 경도
    };

    // 검색 결과 콜백 함수
    function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
            suggestions.style.display = 'block';
            data.forEach(function (place) {
                // 장소가 서울시 범위 내에 있는지 확인
                var lat = place.y;
                var lng = place.x;

                // 서울시 범위에 해당하는 장소만 추천 목록에 추가
                if (lat >= seoulBounds.minLat && lat <= seoulBounds.maxLat && 
                    lng >= seoulBounds.minLng && lng <= seoulBounds.maxLng) {

                    var li = document.createElement('li');
                    li.textContent = place.place_name;
                    li.style.padding = '5px';
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', function () {
                        searchInput.value = place.place_name;
                        suggestions.style.display = 'none';
                        focusPlace(place);
                    });
                    suggestions.appendChild(li);
                }
            });
        }
    }

    // 검색 버튼 클릭 이벤트
    document.getElementById('searchButton').addEventListener('click', function () {
        var searchValue = searchInput.value.trim();
        suggestions.innerHTML = ''; // 이전 추천 목록 초기화
        if (searchValue) {
            ps.keywordSearch(searchValue, function (data, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var matchingPlace = null;

                    // 입력한 값과 정확히 일치하는 장소 찾기
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].place_name.toLowerCase() === searchValue.toLowerCase()) {
                            matchingPlace = data[i];
                            break;
                        }
                    }

                    if (matchingPlace) {
                        focusPlace(matchingPlace); // 해당 장소로 이동
                    } else {
                        alert("일치하는 장소가 없습니다.");
                    }
                } else {
                    alert("검색 결과를 불러오지 못했습니다.");
                }
            });
        } else {
            alert("장소 이름을 입력해주세요.");
        }
    });

    var infoWindow = null; // 전역적으로 infoWindow 객체 선언

	var currentInfoWindow = null;  // 현재 열린 정보창을 추적할 변수

	function focusPlace(place) {
	    var position = new kakao.maps.LatLng(place.y, place.x); // 검색된 장소의 좌표
	    map.setCenter(position);
	    map.setLevel(3);

	    // 기존 마커 제거
	    markers.forEach(function (markerObj) {
	        markerObj.marker.setMap(null);
	    });

	    // 검색한 장소에 다른 색의 마커 추가
	    var marker = new kakao.maps.Marker({
	        position: position,
	        title: place.place_name,
	        image: new kakao.maps.MarkerImage(
	            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',  // 사용자 정의 아이콘
	            new kakao.maps.Size(24, 35), // 아이콘 크기
	            { offset: new kakao.maps.Point(12, 35) } // 아이콘의 중심 좌표
	        )
	    });
	    marker.setMap(map); // 지도에 마커 추가
	    markers.push({ marker: marker, place: place });

	    // 이전에 열린 정보창이 있으면 닫기
	    if (currentInfoWindow) {
	        currentInfoWindow.close();
	    }

	    // 검색된 장소 정보창 생성
	    var infoWindowContent = '<div class="info-window" style="padding:5px;">' +
	                            '<strong>' + place.place_name + '</strong><br>' +
	                            '주소: ' + place.address_name + '<br>' +
	                            '전화번호: ' + (place.phone || '정보 없음') + '</div>';

	    var infoWindow = new kakao.maps.InfoWindow({
	        content: infoWindowContent
	    });

	    // 정보창을 마커 위치에 표시
	    infoWindow.open(map, marker);
	    currentInfoWindow = infoWindow;  // 현재 열린 정보창을 업데이트

	    // 검색된 장소 마커에 클릭 이벤트 추가
	    kakao.maps.event.addListener(marker, 'click', function () {
	        if (currentInfoWindow) {
	            currentInfoWindow.close();
	        }
	        infoWindow.open(map, marker);
	        currentInfoWindow = infoWindow;  // 클릭한 장소의 정보창을 currentInfoWindow로 업데이트
	    });

	    // 주변 버스정류장 마커 표시
	    var nearbyStations = busStations.filter(function (station) {
	        var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);
	        var distance = getDistance(position, stationPosition);  // 거리 계산
	        return distance < 500; // 500m 내의 정류소만 표시
	    });

	    nearbyStations.forEach(function (station) {
	        var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);
	        var stationMarker = new kakao.maps.Marker({
	            position: stationPosition,
	            title: station.station_name
	        });

	        stationMarker.setMap(map);
	        markers.push({ marker: stationMarker, station: station });

	        // 버스 정류장 마커 클릭 시 정보창 표시
	        kakao.maps.event.addListener(stationMarker, 'click', function () {
	            var stationInfoWindowContent = '<div class="info-main-window" style="padding:5px;">' +
	                                           '<strong>' + station.station_name + '</strong><br>';
	            var stationInfoWindow = new kakao.maps.InfoWindow({
	                content: stationInfoWindowContent
	            });

				console.log(station.stId);
	           
				
				// AJAX 요청을 통해 해당 정류장의 도착 버스 정보를 가져옵니다.
				fetch(`/epl/getBusArrivalInfo?stationId=${station.stId}`)
				    .then(response => response.json())
				    .then(data => {
				        var arrivalInfoWindowContent = '<div class="info-main-window" style="padding:5px;">' +
				                                       '<strong>' + station.station_name + '</strong><br>' +
				                                       '도착 버스:<br>';
				        // 도착하는 버스 목록 표시
				        data.forEach(function(bus) {
				            if (bus.busNo) {
				                arrivalInfoWindowContent += bus.busNo + ' (도착 시간: ' + bus.arrivalTime + ')<br>';
				            } else {
				                arrivalInfoWindowContent += '버스 정보를 가져오는 데 실패했습니다.<br>';
				            }
				        });
				        arrivalInfoWindowContent += '</div>';

				        // 버스 도착 정보를 정보창에 표시
				        var stationInfoWindow = new kakao.maps.InfoWindow({
				            content: arrivalInfoWindowContent
				        });

				        // 정보창을 마커 위치에 표시
				        stationInfoWindow.open(map, stationMarker);
				        currentInfoWindow = stationInfoWindow; // 업데이트된 정보창을 currentInfoWindow에 할당
				    })
				    .catch(error => {
				        console.error('버스 정보 요청 오류:', error);
				    });
				
				
				
				 // 이전에 열린 정보창이 있으면 닫기
	            if (currentInfoWindow) {
	                currentInfoWindow.close();
	            }

	            stationInfoWindow.open(map, stationMarker);
	            currentInfoWindow = stationInfoWindow;  // 클릭한 버스정류장의 정보창을 currentInfoWindow로 업데이트
	        });
	    });
	}

    function getDistance(latLng1, latLng2) {
        var lat1 = latLng1.getLat();  // 첫 번째 지점의 위도
        var lon1 = latLng1.getLng();  // 첫 번째 지점의 경도
        var lat2 = latLng2.getLat();  // 두 번째 지점의 위도
        var lon2 = latLng2.getLng();  // 두 번째 지점의 경도

        var R = 6371; // 지구 반지름 (단위: 킬로미터)
        var dLat = toRad(lat2 - lat1);  // 위도 차이를 라디안으로 변환
        var dLon = toRad(lon2 - lon1);  // 경도 차이를 라디안으로 변환

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c * 1000; // 미터 단위로 변환

        return distance;
    }

    // 라디안으로 변환하는 함수
    function toRad(deg) {
        return deg * (Math.PI / 180);
    }

	// 열린 정보 창을 닫기
	function closeInfoWindow() {
	    if (infoWindow) {
	        currentInfoWindow.close();
	    }
	}
	
});