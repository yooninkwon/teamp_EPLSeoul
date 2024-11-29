kakao.maps.load(function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5759, 126.9796),
        level: 3
    };
    var map = new kakao.maps.Map(container, options);

    // 전역 변수로 마커들과 정보 창을 저장할 배열 선언
    var markers = [];
    var currentInfoWindow = null;  // 전역으로 관리되는 정보창

    // 검색창 요소
    var searchInput = document.getElementById('searchInput');
    var suggestions = document.getElementById('suggestions');

    // 실시간 추천 기능
    searchInput.addEventListener('input', function () {
        var searchValue = searchInput.value.trim().toLowerCase();
        suggestions.innerHTML = ''; // 이전 추천 목록 초기화

        if (searchValue) {    
            var filteredStations = busStations.filter(function (station) {
                return station.station_name.toLowerCase().includes(searchValue);       
            });

            if (filteredStations.length > 0) {
                suggestions.style.display = 'block';

                filteredStations.forEach(function (station) {
                    var li = document.createElement('li');
                    li.textContent = station.station_name;
                    li.style.padding = '5px';
                    li.style.cursor = 'pointer';
                    li.addEventListener('click', function () {
                        searchInput.value = station.station_name;
                        suggestions.style.display = 'none';
                        focusStation(station); // 클릭 시 해당 정류소에 포커스
                    });
                    suggestions.appendChild(li);
                });
            } else {
                suggestions.style.display = 'none';
            }
        } else {
            suggestions.style.display = 'none';
        }
    });

    // 검색 버튼 클릭 이벤트
    document.getElementById('searchButton').addEventListener('click', function () {
        var searchValue = searchInput.value.trim();
        if (searchValue) {
            // 이전에 생성된 마커들과 정보 창을 제거
            clearMarkers();
            closeInfoWindow();

            var foundStation = busStations.find(function (station) {
                return station.station_name === searchValue;
            });

            if (foundStation) {
                focusStation(foundStation);
            } else {
                alert("검색한 정류소를 찾을 수 없습니다.");
            }
        } else {
            alert("정류소 이름을 입력해주세요.");
        }
    });

    // 특정 정류소에 포커스
    function focusStation(station) {
        var position = new kakao.maps.LatLng(station.y_coord, station.x_coord);
        map.setCenter(position);
        map.setLevel(3);

        // 새로운 마커 추가
        var marker = new kakao.maps.Marker({
            position: position,
            title: station.station_name
        });
        marker.setMap(map);

        // 정보창 내용
        var infoWindow = new kakao.maps.InfoWindow({
            content: `<div class="info-window">${station.station_name}</div>`
        });

        // 이전에 열린 정보 창을 닫고, 현재 정보를 표시
        closeInfoWindow();
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;

        // 생성된 마커를 배열에 추가
        markers.push(marker);

        // 해당 위치 주변의 다양한 장소 검색
        searchNearbyPlaces(position);
    }

    // 카테고리별 장소 검색 함수 (다양한 카테고리)
    function searchNearbyPlaces(position) {
        var placesService = new kakao.maps.services.Places();  // 카카오 Places 객체 생성

        // 현재 지도의 경계값을 가져와 범위 내의 장소를 검색
        var bounds = map.getBounds();
        
        // 카테고리별 장소 검색 (다양한 카테고리: 맛집, 카페 등)
        var categories = ['FD6', 'CT1', 'HP8'];  // 예시: 'FD6' = 맛집, 'CT1' = 카페, 'HP8' = 병원
        categories.forEach(function(category) {
            placesService.categorySearch(category, function(results, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 검색된 장소 마커와 정보창 표시
                    results.forEach(function(place) {
                        var placePosition = new kakao.maps.LatLng(place.y, place.x);
                        
                        // 지도 범위 내의 장소만 필터링
                        if (bounds.contain(placePosition)) {
                            // 마커 추가
                            var marker = new kakao.maps.Marker({
                                position: placePosition,
                                title: place.place_name
                            });
                            marker.setMap(map);

                            // 정보창 내용 구성
                            var content = `<div class="info-window">
                                               <strong>${place.place_name}</strong><br>
                                               ${place.address_name}<br>
                                               <a href="${place.place_url}" target="_blank">자세히 보기</a>
                                           </div>`;

                            // 마커에 클릭 이벤트 추가
                            kakao.maps.event.addListener(marker, 'click', function() {
                                var infoWindow = new kakao.maps.InfoWindow({
                                    content: content
                                });

                                // 이전 정보창을 닫고 새로운 정보창을 연다
                                closeInfoWindow();
                                infoWindow.open(map, marker);
                                currentInfoWindow = infoWindow;
                            });

                            // 마커를 배열에 추가
                            markers.push(marker);
                        }
                    });
                } else {
                    console.log("주변 장소를 찾을 수 없습니다.");
                }
            }, {
                location: position,  // 검색 기준 위치 설정
                radius: 500         // 검색 반경 (500m)
            });
        });
    }

    // 이전에 생성된 마커들을 모두 제거
    function clearMarkers() {
        markers.forEach(function(marker) {
            marker.setMap(null); // 지도에서 마커 제거
        });
        markers = []; // 마커 배열 초기화
    }

    // 열린 정보 창을 닫기
    function closeInfoWindow() {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
    }
});