kakao.maps.load(function () {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5759, 126.9796),  // 초기 지도 중심 (서울)
        level: 3
    };
    var map = new kakao.maps.Map(container, options);

    var markers = [];
    var currentInfoWindow = null;
    var currentPosition = null; // 현재 선택된 위치를 저장하는 변수

    var searchInput = document.getElementById('searchInput');
    var suggestions = document.getElementById('suggestions');

    // 검색 입력 이벤트
    searchInput.addEventListener('input', function () {
        var searchValue = searchInput.value.trim().toLowerCase();
        suggestions.innerHTML = '';

        // 카테고리 버튼 초기화
        clearCategoryActive();

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
                        focusStation(station);  // 마커 초기화 및 새로 추가
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
        suggestions.innerHTML = '';
        if (searchValue) {
            var matchedStation = busStations.find(function (station) {        
                return station.station_name.toLowerCase() === searchValue.toLowerCase();
            });

            if (matchedStation) {
                focusStation(matchedStation);  // 마커 초기화 및 새로 추가
            } else {
                alert("검색 결과가 없습니다.");
            }
        } else {
            alert("장소 이름을 입력해주세요.");
        }

        // 검색 후 카테고리 버튼 초기화
        clearCategoryActive();
    
	});

    function focusStation(station) {
        var position = new kakao.maps.LatLng(station.y_coord, station.x_coord);
        map.setCenter(position);
        map.setLevel(3);

        currentPosition = position;  // 선택된 위치 저장

        clearMarkers();  // 기존 마커 초기화
        clearCategoryMarkers();
		closeCategoryInfoWindows();
     
		 var markerImage = new kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new kakao.maps.Size(24, 35),
            {
                offset: new kakao.maps.Point(12, 35)
            }
        );
        
        var marker = new kakao.maps.Marker({
            position: position,
            title: station.station_name,
            image: markerImage
        });
        marker.setMap(map);

        var infoWindow = new kakao.maps.InfoWindow({
            content: `<div class="info-window">${station.station_name}</div>`
        });

        closeInfoWindow();
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;

        markers.push(marker);

        kakao.maps.event.addListener(marker, 'click', function () {
            var infoWindow = new kakao.maps.InfoWindow({
                content: `<div class="info-window">${station.station_name}</div>`
            });

            closeInfoWindow();
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });

        searchNearbyPlaces(position);

        // 카테고리 검색을 해당 위치를 기준으로 실행
        searchCategoryPlaces(currentPosition);
    }

    // 카테고리 버튼 클릭 시 해당 카테고리의 장소만 검색
    document.querySelectorAll('.category-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var category = button.getAttribute('data-category');

            if (currentPosition) {
                searchCategoryPlaces(category, currentPosition);  // 선택된 위치를 기준으로 카테고리 검색
            } else {
                alert("먼저 정류소를 선택해 주세요.");
            }

            // 카테고리 버튼 클릭 시 초기화
            clearCategoryActive();
            button.classList.add('active');  // 클릭된 버튼에 'active' 클래스 추가
	
		  });
    });

    var categoryMarkers = [];
	var categoryInfoWindows = []; // 카테고리 관련 InfoWindow들을 저장할 배열

	function closeCategoryInfoWindows() {
	    categoryInfoWindows.forEach(function (infoWindow) {
	        infoWindow.close(); // 지도에서 InfoWindow 닫기
	    });
	    categoryInfoWindows = []; // 배열 초기화
	}

	// 기존의 `searchCategoryPlaces` 함수에서 InfoWindow를 생성하는 부분을 수정
	function searchCategoryPlaces(category, position) {
	    var placesService = new kakao.maps.services.Places();
	    var bounds = map.getBounds();

	    clearCategoryMarkers();
	    closeCategoryInfoWindows(); // 카테고리 정보창 닫기

		// 카테고리에 따른 마커 이미지 설정
		  var markerImages = {
		      'FD6': '/static/images/bus/utensils.png',
		      'CE7': '/static/images/bus/coffee.png',
		      'HP8': '/static/images/bus/hospital.png',
		      'PM9': '/static/images/bus/prescription.png',
		      'CS2': '/static/images/bus/store.png',
		      'PK6': '/static/images/bus/parking.png',
		      'SW8': '/static/images/bus/subway.png',
		      'BK9': '/static/images/bus/bank.png',
		      'CT1': '/static/images/bus/landmark.png',
		      'AD5': '/static/images/bus/hotel.png'
		  };
		
		
		
		
		  placesService.categorySearch(category, function (results, status) {
		          if (status === kakao.maps.services.Status.OK) {
		              results.forEach(function (place) {
		                  var placePosition = new kakao.maps.LatLng(place.y, place.x);

		                  if (bounds.contain(placePosition)) {
		                      var markerImage = new kakao.maps.MarkerImage(
		                          markerImages[category], // 카테고리별 이미지
		                          new kakao.maps.Size(25, 25), // 이미지 크기 조정
		                          { offset: new kakao.maps.Point(10, 0) } // 마커의 앵커 포인트
		                      );

		                      var marker = new kakao.maps.Marker({
		                          position: placePosition,
		                          title: place.place_name,
		                          image: markerImage // 사용자 정의 이미지 설정
		                      });
		                      marker.setMap(map);

		                      var content = `<div class="info-window">
		                                         <strong>${place.place_name}</strong><br>
		                                         ${place.address_name}<br>
		                                         <a href="${place.place_url}" target="_blank">자세히 보기</a>
		                                     </div>`;

		                      var infoWindow = new kakao.maps.InfoWindow({
		                          content: content
		                      });

		                      kakao.maps.event.addListener(marker, 'click', function () {
		                          closeCategoryInfoWindows();
		                          infoWindow.open(map, marker);
		                          categoryInfoWindows.push(infoWindow);
		                      });

		                      categoryMarkers.push(marker);
		                  }
		              });
		          } else {
		              console.log("주변 장소를 찾을 수 없습니다.");
		          }
		      }, {
		          location: position,
		          radius: 500 // 검색 반경 설정
		      });
		  }

    // 카테고리 마커를 지우는 함수
    function clearCategoryMarkers() {
        categoryMarkers.forEach(function (marker) {
            marker.setMap(null);  // 지도에서 마커 제거
        });
        categoryMarkers = [];  // 배열 초기화
    }

    // 모든 카테고리 버튼에서 'active' 클래스를 제거하는 함수
    function clearCategoryActive() {
        document.querySelectorAll('.category-btn').forEach(function (btn) {
            btn.classList.remove('active');  // 모든 버튼에서 'active' 클래스 제거
        });
    }

    function clearMarkers() {
        markers.forEach(function (marker) {
            marker.setMap(null);  // 지도에서 마커 제거
        });
        markers = [];  // 배열 초기화
    }

    function closeInfoWindow() {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
    }
});