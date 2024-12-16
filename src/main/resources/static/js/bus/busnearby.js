
kakao.maps.load(function() {
	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(37.5759, 126.9796),  // 초기 지도 중심 (서울)
		level: 4
	};
	var map = new kakao.maps.Map(container, options);

	var resultdrawArr = [];

	var markers = [];
	var currentInfoWindow = null;
	var currentPosition = null; // 현재 선택된 위치를 저장하는 변수
	var secondPosition = null; // 현재 선택된 위치를 저장하는 변수


	var searchInput = document.getElementById('searchInput');
	var suggestions = document.getElementById('suggestions');
	// 출발점 마커 생성 (red_b.png)
	var startMarker = new kakao.maps.Marker({
		position: currentPosition,
		image: new kakao.maps.MarkerImage(
			'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
			new kakao.maps.Size(24, 35),
			{ offset: new kakao.maps.Point(12, 35) }
		)
	});

	// 도착점 마커 생성 (red_drag.png)
	var endMarker = new kakao.maps.Marker({
		position: secondPosition,
		image: new kakao.maps.MarkerImage(
			'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png',
			new kakao.maps.Size(24, 35),
			{ offset: new kakao.maps.Point(12, 35) }
		)
	});


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

		console.log("currentPosition", currentPosition);

		resetBlogPosts();
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


		displayRouteInfo(null, null);
		resetBlogPosts();
		clearCategoryMarkers();
		closeCategoryInfoWindows(); // 카테고리 정보창 닫기
		clearCategoryInfoList(); // 카테고리 정보 리스트 초기화
		clearDrawnPaths();


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
			'AD5': '/static/images/bus/hotel.png',
			'BS1': '/static/images/bus/bus.png',
		};

		if (category === 'BS1') {
			// 버스정류장 데이터 활용

			var nearbyStations = busStations.filter(function(station) {
				var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);

				var distance = getDistance(position, stationPosition); // 거리 계산
				return distance < 500; // 500m 내 정류장만 필터링

			});

			nearbyStations.forEach(function(station) {
				var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);

				var stationMarker = new kakao.maps.Marker({
					position: stationPosition,
					title: station.station_name,
					image: new kakao.maps.MarkerImage(
						markerImages['BS1'], // 버스 마커 이미지
						new kakao.maps.Size(25, 25),
						{ offset: new kakao.maps.Point(12, 0) }
					)
				});

				stationMarker.setMap(map);
				categoryMarkers.push(stationMarker);

				// 인포윈도우 설정
				var infoWindow = new kakao.maps.InfoWindow({
					content: `<div class="info-main-window">
				                              <strong>${station.station_name}</strong><br>				                            
				                            </div>`

				});
				
				kakao.maps.event.addListener(stationMarker, 'click', function() {
				    // 정류장 이름을 categoryInfoList 상단에 표시
				    var categoryInfoList = document.getElementById('categoryInfoList');
				    
				    // 정류장 이름을 상단에 추가
				    categoryInfoList.innerHTML = `<h3>${station.station_name}</h3>`; // 정류장 이름 추가
				    
				    console.log(station);

				    // #busArrivalList div에 버스 도착 정보 나열
				    fetch(`/epl/getBusArrivalInfo?stationId=${station.stId}`)
				        .then(response => response.json())
				        .then(data => {
				            var arrivalInfoContent = '';
				            var hasValidBusInfo = false; // 유효한 버스 정보가 있는지 확인하는 플래그

				            data.forEach(function(bus) {
				                // busNo가 0인 경우는 제외
				                if (bus.busNo && bus.busNo !== "0") {
				                    hasValidBusInfo = true; // 유효한 버스 정보가 있음
				                    // 각 버스 클릭 시 정보 표시 기능 추가
				                    arrivalInfoContent += `
				                        <p id="bus_${bus.busNo}" class="bus-info" data-bus-no="${bus.busNo}">
				                            <strong>${bus.plainNo}</strong> 
				                            <br> (도착 시간: ${bus.arrmsg1})
				                        </p>
				                    `;
				                }
				            });

				            // 유효한 버스 정보가 없는 경우 한 번만 메시지 표시
				            if (!hasValidBusInfo) {
				                arrivalInfoContent = '<p>버스 정보가 없습니다.</p>';
				            }

				            // 버스 도착 정보 나열
				            categoryInfoList.innerHTML += `<div id="busArrivalList">${arrivalInfoContent}</div>`;
				        });

							closeCategoryInfoWindows(); // 기존 열린 창 닫기
							infoWindow.open(map, stationMarker);
							categoryInfoWindows.push(infoWindow);
							// 정류장 마커 클릭 시 secondPosition 값을 설정
							secondPosition = stationPosition;
							console.log("secondPosition", secondPosition); // 확인용 콘솔 출력



						});
				});

			} else {
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
										// 마커 클릭 시 블로그 리스트 업데이트

										secondPosition = new kakao.maps.LatLng(place.y, place.x);
										console.log("secondPosition", secondPosition);  // 좌표 출력							
										fetchAndUpdateBlogPosts(place.place_name);
										closeCategoryInfoWindows();
										infoWindow.open(map, marker);
										categoryInfoWindows.push(infoWindow);
										displayRouteInfo(null, null);
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
	}




		// 공통 함수: 블로그 데이터를 가져와 업데이트
		function fetchAndUpdateBlogPosts(placeName) {
			fetch('/epl/getBlogPostsByPlace?place=' + encodeURIComponent(placeName))
				.then(response => response.json())
				.then(data => {
					// 블로그 리스트를 업데이트
					updateBlogPosts(data);
				})
				.catch(error => {
					console.error('블로그 데이터를 가져오는 데 실패했습니다:', error);
				});
		}


		// 카테고리 정보 리스트에 장소 추가
		function addToCategoryInfoList(place) {
			var listContainer = document.getElementById('categoryInfoList');

			// 빈 메시지 숨기기
			var emptyMessage = document.getElementById('emptyMessage');
			if (emptyMessage) {
				emptyMessage.style.display = 'none';
			}


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
				secondPosition = position;
				console.log("position", position);

				// 블로그 데이터를 가져와 업데이트
				fetchAndUpdateBlogPosts(place.place_name);

				// 지도 중심 이동
				map.setCenter(position);

				// 기존 열려 있는 정보창 닫기
				closeCategoryInfoWindows();
				displayRouteInfo(null, null);
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



		// 버튼 클릭 이벤트 추가
		document.getElementById('drawLineButton').addEventListener('click', function() {
			// 현재 선택된 위치(currentPosition)와 클릭한 위치(position)가 모두 존재해야 선을 그릴 수 있음

			displayRouteInfo(null, null);
			closeCategoryInfoWindows();
			clearDrawnPaths();
			clearMarkers();  // 기존 마커 초기화


			if (currentPosition && secondPosition) {
				requestRoute(currentPosition, secondPosition);
				map.setLevel(3);
				map.setCenter(currentPosition);
				startMarker.setMap(map);
				endMarker.setMap(map);

			} else {
				alert("장소를 선택해주세요");
				startMarker.setMap(map);
			}

			secondPosition = null;

		});

		// 경로 탐색 요청 함수 (Tmap API)
		function requestRoute(currentPosition, secondPosition) {
			var startX = currentPosition.getLng();
			var startY = currentPosition.getLat();
			var endX = secondPosition.getLng();
			var endY = secondPosition.getLat();

			var headers = {};
			headers["appKey"] = "bbXs9W3rW47xtyLXr2R9m5SFA68ZjMsV3GoyiOzO";

			// 출발지 마커
			var startMarkerImage = new kakao.maps.MarkerImage(
				'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
				new kakao.maps.Size(40, 40) // 이미지 크기 설정
			);
			var startMarker = new kakao.maps.Marker({
				position: currentPosition,
				map: map,
				title: "출발지",
				image: startMarkerImage // 출발지 마커 이미지 설정
			});


			// 도착지 마커
			var endMarkerImage = new kakao.maps.MarkerImage(
				'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
				new kakao.maps.Size(40, 40) // 이미지 크기 설정
			);
			var endMarker = new kakao.maps.Marker({
				position: secondPosition,
				map: map,
				title: "도착지",
				image: endMarkerImage // 도착지 마커 이미지 설정
			});

			// 기존 마커 삭제를 위한 배열에 저장
			markers.push(startMarker);
			markers.push(endMarker);

			$.ajax({
				method: "POST",
				headers: headers,
				url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
				async: false,
				data: {
					"startX": startX,
					"startY": startY,
					"endX": endX,
					"endY": endY,
					"reqCoordType": "WGS84GEO",
					"resCoordType": "EPSG3857",
					"startName": "출발지",
					"endName": "도착지"
				},
				success: function(response) {
					var resultData = response.features;

					// 소요 시간 및 거리 계산
					var totalTime = 0;  // 초 단위
					var totalDistance = 0;  // m 단위

					var kakaoPath = [];
					for (var i in resultData) {
						var properties = resultData[i].properties;
						if (properties && properties.totalTime) {
							totalTime = properties.totalTime;  // 소요 시간 (초)
							totalDistance = properties.totalDistance;  // 거리 (m)
						}

						var geometry = resultData[i].geometry;
						if (geometry.type == "LineString") {
							for (var j in geometry.coordinates) {
								var latlng = new Tmapv2.Point(
									geometry.coordinates[j][0],
									geometry.coordinates[j][1]);
								var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
								var convertChange = new Tmapv2.LatLng(
									convertPoint._lat,
									convertPoint._lng);

								kakaoPath.push(new kakao.maps.LatLng(convertChange.lat(), convertChange.lng()));
							}
						}
					}

					// 경로를 그리는 Polyline
					var polyline = new kakao.maps.Polyline({
						path: kakaoPath,
						strokeWeight: 5,
						strokeColor: '#FF0000',
						strokeOpacity: 0.7,
						strokeStyle: 'solid'
					});
					polyline.setMap(map);
					resultdrawArr.push(polyline);

					// 소요 시간과 거리 표시
					displayRouteInfo(totalTime, totalDistance);
				},
				error: function(request, status, error) {
					console.log("code:" + request.status + "\n"
						+ "message:" + request.responseText + "\n"
						+ "error:" + error);
				}
			});
		}





		// 소요 시간과 거리를 표시하는 함수
		function displayRouteInfo(time, distance) {
			var resultElement = document.getElementById('result');
			var minutes = Math.floor(time / 60);  // 초를 분으로 변환
			var seconds = time % 60;  // 남은 초
			var kilometers = (distance / 1000).toFixed(2);  // m를 km로 변환

			resultElement.innerHTML = `
	          <b>소요 시간:</b> ${minutes}분 ${seconds}초<br>
	          <b>총 거리:</b> ${kilometers} km
	      `;
		}




		function updateBlogPosts(blogPosts) {
			// 기존 블로그 리스트를 클리어
			var blogListContainer = document.getElementById('blogPostList');
			blogListContainer.innerHTML = '';

			// 새로운 블로그 리스트로 업데이트
			blogPosts.forEach(post => {
				var listItem = document.createElement('li');
				listItem.innerHTML = `
	            <a href="${post.link}" target="_blank">${post.title}</a>
	            <p>${post.description}</p>
	        `;
				blogListContainer.appendChild(listItem);
			});

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

		// 기존에 그려진 경로들을 초기화하는 함수
		function clearDrawnPaths() {
			// resultdrawArr 배열에 저장된 Polyline들을 제거
			resultdrawArr.forEach(function(polyline) {
				polyline.setMap(null); // 지도에서 제거

			});
			resultdrawArr = []; // 배열 비우기
		}

		function closeCategoryInfoWindows() {
			categoryInfoWindows.forEach(function(infoWindow) {
				infoWindow.close(); // 지도에서 InfoWindow 닫기
			});
			categoryInfoWindows = []; // 배열 초기화
		}
		// 공통 함수: 블로그 데이터를 초기화
		function resetBlogPosts() {
			// 1. 블로그 데이터를 null로 설정 (필요시 데이터 초기화)
			let blogPosts = null;

			// 2. 블로그 리스트를 비워서 초기화
			var blogListContainer = document.getElementById('blogPostList');
			blogListContainer.innerHTML = '';  // 기존 블로그 리스트 제거

			// 3. 블로그 데이터가 없다면 "데이터 없음" 메시지 추가 (선택 사항)
			var noDataMessage = document.createElement('p');
			noDataMessage.textContent = '블로그 데이터가 없습니다.';
			blogListContainer.appendChild(noDataMessage);

			console.log('블로그 데이터가 초기화되었습니다.');
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
	});