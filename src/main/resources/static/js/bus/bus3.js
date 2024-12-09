
kakao.maps.load(function() {
	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(37.5759, 126.9796),  // 초기 지도 중심 (서울)
		level: 5
	};
	var map = new kakao.maps.Map(container, options);

	
	
	var markers = [];
	var currentInfoWindow = null;
	var currentPosition = null; // 현재 선택된 위치를 저장하는 변수

	var searchInput = document.getElementById('searchInput');
	var suggestions = document.getElementById('suggestions');

	// 검색 입력 이벤트
	searchInput.addEventListener('input', function() {
		var searchValue = searchInput.value.trim().toLowerCase();
		suggestions.innerHTML = '';

		// 카테고리 버튼 초기화
		clearCategoryActive();

		if (searchValue) {
			var filteredStations = busStations.filter(function(station) {
				return station.station_name.toLowerCase().includes(searchValue);
			});

			if (filteredStations.length > 0) {
				suggestions.style.display = 'block';

				filteredStations.forEach(function(station) {
					var li = document.createElement('li');
					li.textContent = station.station_name;
					li.style.padding = '5px';
					li.style.cursor = 'pointer';
					li.addEventListener('click', function() {
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
	document.getElementById('searchButton').addEventListener('click', function() {
		var searchValue = searchInput.value.trim();
		suggestions.innerHTML = '';
		if (searchValue) {
			var matchedStation = busStations.find(function(station) {
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
		map.setLevel(5);

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
			content: `<div class="info-main-window">${station.station_name}</div>`
		});

		closeInfoWindow();
		infoWindow.open(map, marker);
		currentInfoWindow = infoWindow;

		markers.push(marker);

		kakao.maps.event.addListener(marker, 'click', function() {
			var infoWindow = new kakao.maps.InfoWindow({
				content: `<div class="info-main-window">${station.station_name}</div>`
			});

			closeInfoWindow();
			infoWindow.open(map, marker);
			currentInfoWindow = infoWindow;
		});



		// 카테고리 검색을 해당 위치를 기준으로 실행
		searchCategoryPlaces(currentPosition);
	}

	// 카테고리 버튼 클릭 시 해당 카테고리의 장소만 검색
	document.querySelectorAll('.category-btn').forEach(function(button) {
		button.addEventListener('click', function() {
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
		categoryInfoWindows.forEach(function(infoWindow) {
			infoWindow.close(); // 지도에서 InfoWindow 닫기
		});
		categoryInfoWindows = []; // 배열 초기화
	}



	function getGooglePlaceDetails(placeName, callback) {
		// Google Maps Places 서비스 초기화
		var service = new google.maps.places.PlacesService(document.createElement('div'));

		// 장소 검색 요청
		service.textSearch({ query: placeName }, function(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
				var placeId = results[0].place_id;

				// Place Details 요청
				service.getDetails({ placeId: placeId }, function(place, status) {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						var photoUrl = null;
						if (place.photos && place.photos.length > 0) {
							// 첫 번째 사진 URL 생성
							photoUrl = place.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 });
						}

						// 리뷰 수와 평점 가져오기
						var reviews = place.user_ratings_total || 0; // 리뷰 수
						var rating = place.rating || '정보 없음'; // 평점

						callback({
							photoUrl: photoUrl,
							reviews: reviews,
							rating: rating
						});
					} else {
						console.error("Place Details 요청 실패: ", status);
						callback(null);
					}
				});
			} else {
				console.error("Google Places 검색 실패: ", status);
				callback(null);
			}
		});
	}


	// 평점에 맞춰 별을 생성하는 함수
	function generateStars(rating) {
		var fullStars = Math.floor(rating); // 정수 부분
		var halfStar = (rating % 1 >= 0.1) ? 1 : 0; // 0.3 이상일 때 반별
		var emptyStars = 5 - fullStars - halfStar; // 빈 별

		var stars = '';

		// 채워진 별 추가
		for (var i = 0; i < fullStars; i++) {
			stars += '<span class="star full">&#9733;</span>'; // 채워진 별
		}

		// 반별 추가 (0.3 이상일 때 반별)
		if (halfStar) {
			stars += '<span class="star half">&#9733;</span>'; // 반별
		}

		// 빈 별 추가
		for (var i = 0; i < emptyStars; i++) {
			stars += '<span class="star empty">&#9733;</span>'; // 빈 별
		}

		return stars;
	}


	// 기존의 `searchCategoryPlaces` 함수에서 InfoWindow를 생성하는 부분을 수정
	function searchCategoryPlaces(category, position) {
		var placesService = new kakao.maps.services.Places();
		var bounds = map.getBounds();

		clearCategoryMarkers();
		closeCategoryInfoWindows(); // 카테고리 정보창 닫기
		clearCategoryInfoList(); // 카테고리 정보 리스트 초기화

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

		placesService.categorySearch(category, function(results, status) {
			if (status === kakao.maps.services.Status.OK) {
				results.forEach(function(place) {
					var placePosition = new kakao.maps.LatLng(place.y, place.x);

					if (bounds.contain(placePosition)) {
						var markerImage = new kakao.maps.MarkerImage(
							markerImages[category],
							new kakao.maps.Size(25, 25),
							{ offset: new kakao.maps.Point(12, 0) }
						);

						var marker = new kakao.maps.Marker({
							position: placePosition,
							title: place.place_name,
							image: markerImage
						});
						marker.setMap(map);

						// Google Places API 호출하여 이미지 URL, 리뷰 수, 평점 가져오기
						getGooglePlaceDetails(place.place_name, function(data) {
							var content = `<div class="info-window">
		                            <strong>${place.place_name}</strong><br>
		                            ${place.address_name}<br>
		                            전화번호: ${place.phone ? place.phone : '정보 없음'}<br>	                     
		                            리뷰 수: ${data.reviews}<br>
		                            평점: ${generateStars(data.rating)}<br>
		                            <a href="${place.place_url}" target="_blank">자세히 보기</a><br>`;

							if (data.photoUrl) {
								content += `<img src="${data.photoUrl}" alt="${place.place_name}" style="width: 100%; height: 150px; margin-top: 10px;">`;
							} else {
								content += `<img src="/static/images/bus/no_img.jpg" alt="기본 이미지" style="width: 100%; height: 150px; margin-top: 10px;">`;
							}

							content += `</div>`;

							var infoWindow = new kakao.maps.InfoWindow({
								content: content
							});

							kakao.maps.event.addListener(marker, 'click', function() {
								closeCategoryInfoWindows();
								infoWindow.open(map, marker);
								categoryInfoWindows.push(infoWindow);

								// 마커 클릭 시 해당 장소를 categoryInfoList에서 찾아 'selected' 클래스 추가
								var targetPlaceDiv = Array.from(document.querySelectorAll('.category-info-item')).find(function(div) {
									return div.dataset.placeId === place.id; // 각 div에 data-place-id 속성을 설정했다고 가정
								});
								if (targetPlaceDiv) {
									// 모든 div에서 'selected' 클래스 제거
									document.querySelectorAll('.category-info-item').forEach(function(div) {
										div.classList.remove('selected');
									});
									targetPlaceDiv.classList.add('selected');

									// 해당 div로 스크롤 이동
									targetPlaceDiv.scrollIntoView({
										behavior: 'smooth', // 부드럽게 스크롤
										block: 'center' // div가 화면 중앙에 오도록 위치 설정
									});
								}
							});
						});

						categoryMarkers.push(marker);
						addToCategoryInfoList(place);
					}
				});
			} else {
				console.log("주변 장소를 찾을 수 없습니다.");
			}
		}, {
			location: position,
			radius: 500
		});
	}



	// 카테고리 정보 리스트에 장소 추가
	function addToCategoryInfoList(place) {
		var listContainer = document.getElementById('categoryInfoList');

		var placeDiv = document.createElement('div');
		placeDiv.className = 'category-info-item';
		placeDiv.dataset.placeId = place.id; // 각 div에 고유 ID를 설정하여 나중에 식별할 수 있게 함

		// Google Place API로 이미지 URL, 리뷰 수, 평점 가져오기
		getGooglePlaceDetails(place.place_name, function(data) {
			var content = `
		            <img src="${data.photoUrl || '/static/images/bus/no_img.jpg'}" alt="${place.place_name}">
		            <div class="info-content">
		                <strong>${place.place_name}</strong><br>
		                ${place.address_name}<br>
		                <p>리뷰 수: ${data.reviews}</p>
		                <p>평점: ${generateStars(data.rating)}</p>
		                <a href="${place.place_url}" target="_blank">자세히 보기</a>
		            </div>
		        `;

			placeDiv.innerHTML = content;

			// listContainer에 요소 추가 후 scrollIntoView 호출
			listContainer.appendChild(placeDiv);
		});



		// 클릭 이벤트로 지도 중심 이동 및 정보창 열기
		placeDiv.addEventListener('click', function() {
			var position = new kakao.maps.LatLng(place.y, place.x);

			// 지도 중심 이동
			map.setCenter(position);

			// 기존 열려 있는 정보창 닫기
			closeCategoryInfoWindows();

			// 해당 장소의 마커 찾기 (좌표 근사값 비교)
			var targetMarker = categoryMarkers.find(function(marker) {
				var markerPosition = marker.getPosition();
				// 소수점 이하 6자리까지 비교
				return Math.abs(markerPosition.getLat() - position.getLat()) < 0.000001 && Math.abs(markerPosition.getLng() - position.getLng()) < 0.000001;
			});

			if (targetMarker) {
				// 해당 마커에 대해 클릭 이벤트 강제로 트리거
				kakao.maps.event.trigger(targetMarker, 'click');
			} else {
				console.log("마커를 찾을 수 없습니다.");
			}
			// 모든 div에서 선택된 스타일을 제거
			document.querySelectorAll('.category-info-item').forEach(function(div) {
				div.classList.remove('selected');
			});

			// 클릭된 div에 'selected' 클래스를 추가하여 스타일 변경
			placeDiv.classList.add('selected');

			// 해당 div로 스크롤 이동
			placeDiv.scrollIntoView({
				behavior: 'smooth', // 부드럽게 스크롤
				block: 'center' // div가 화면 중앙에 오도록 위치 설정
			});
		
		});

		listContainer.appendChild(placeDiv);
	}

	
	
	
	

	// 카테고리 정보 리스트 초기화
	function clearCategoryInfoList() {
		var listContainer = document.getElementById('categoryInfoList');
		listContainer.innerHTML = '';
	}

	// 카테고리 마커를 지우는 함수
	function clearCategoryMarkers() {
		categoryMarkers.forEach(function(marker) {
			marker.setMap(null);  // 지도에서 마커 제거
		});
		categoryMarkers = [];  // 배열 초기화
	}

	// 모든 카테고리 버튼에서 'active' 클래스를 제거하는 함수
	function clearCategoryActive() {
		document.querySelectorAll('.category-btn').forEach(function(btn) {
			btn.classList.remove('active');  // 모든 버튼에서 'active' 클래스 제거
		});
	}

	function clearMarkers() {
		markers.forEach(function(marker) {
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