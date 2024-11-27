kakao.maps.load(function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5759, 126.9796),
        level: 3
    };
    var map = new kakao.maps.Map(container, options);



    var markers = busStations.map(function (station) {
        var position = new kakao.maps.LatLng(station.y_coord, station.x_coord);
        var marker = new kakao.maps.Marker({
            position: position,
            title: station.station_name
        });
        marker.setMap(map);
        return { marker: marker, station: station };
    });

    // 전역 변수로 InfoWindow 선언
    var currentInfoWindow = null;

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
                        focusStation(station);
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
            var foundStation = markers.find(function (item) {
                return item.station.station_name === searchValue;
            });

            if (foundStation) {
                focusStation(foundStation.station);
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

        if (currentInfoWindow) {
            currentInfoWindow.close();
        }

        var infoWindow = new kakao.maps.InfoWindow({
            content: `<div class="info-window">${station.station_name}</div>`
        });
        var marker = markers.find(function (item) {
            return item.station.station_name === station.station_name;
        }).marker;

        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
    }
	
});


