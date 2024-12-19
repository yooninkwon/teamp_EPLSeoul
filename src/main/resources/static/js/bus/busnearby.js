
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
	// boardingChart 변수를 전역적으로 선언
	let boardingChart = null;  // 처음에는 null로 초기화
	
	// 전역 마커 배열 초기화
	if (!window.busMarkers) {
	    window.busMarkers = [];
	}

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
		map.setLevel(4);

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
		clearChart();

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
						new kakao.maps.Size(20, 20),
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
				
				
		
				// 정류장 클릭 이벤트 처리
				kakao.maps.event.addListener(stationMarker, 'click', function() {
				    // 정류장 이름을 categoryInfoList 상단에 표시
				    var categoryInfoList = document.getElementById('categoryInfoList');
				    
				    // 정류장 이름을 상단에 추가
				    categoryInfoList.innerHTML = `<h3>${station.station_name}</h3>`; // 정류장 이름 추가					
				    console.log("station.stId:" + station.stId);

				    // chartTitleContainer를 업데이트하여 제목 변경
				    var chartTitleContainer = document.getElementById('chartTitleContainer');
				    chartTitleContainer.innerHTML = '<h1>정류장 시간대별 승합차 인원</h1>';

				    // 데이터를 가져와 차트를 그리기
				    fetch(`/epl/busStopData?stationId=${station.stId}`)
				        .then(response => response.json())
				        .then(data => {
				            // 시간대 라벨
				            const labels = Array.from({ length: 24 }, (_, i) => `${i}시`);

				            // 승차 데이터와 하차 데이터를 각각 배열로 구성
				            const boardingData = [];
				            const alightingData = [];
				            
				            data.forEach(item => {
				                const hourlyBoarding = [];
				                const hourlyAlighting = [];
				                
				                // 각 시간별 승차 및 하차 데이터 추가
				                for (let i = 0; i < 24; i++) {
				                    hourlyBoarding.push(item[`hour_${String(i).padStart(2, '0')}_boarding`]);
				                    hourlyAlighting.push(item[`hour_${String(i).padStart(2, '0')}_alighting`]);
				                }

				                boardingData.push(hourlyBoarding);
				                alightingData.push(hourlyAlighting);
				            });

				            // Chart.js로 그래프 그리기
				            const ctx = document.getElementById('boardingChart').getContext('2d');

				            // 차트가 이미 존재하는 경우 삭제하고 새 차트를 그리기
				            if (boardingChart) {
				                boardingChart.destroy();  // 기존 차트를 삭제
				                boardingChart = null;     // 차트 객체를 null로 설정
				            }

				            // 새로운 차트 생성
				            boardingChart = new Chart(ctx, {
				                type: 'bar',
				                data: {
				                    labels: labels,
				                    datasets: [
				                        {
				                            label: '승차',
				                            data: boardingData[0], // 첫 번째 데이터 세트로 승차 데이터
				                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
				                            borderColor: 'rgba(75, 192, 192, 1)',
				                            borderWidth: 1
				                        },
				                        {
				                            label: '하차',
				                            data: alightingData[0], // 첫 번째 데이터 세트로 하차 데이터
				                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
				                            borderColor: 'rgba(255, 99, 132, 1)',
				                            borderWidth: 1
				                        }
				                    ]
				                },
				                options: {
				                    scales: {
				                        y: {
				                            beginAtZero: true
				                        }
				                    }
				                }
				            });

				            console.log("Boarding Data:", boardingData);
				            console.log("Alighting Data:", alightingData);
				        })
				        .catch(error => {
				            console.error('Error fetching boarding data:', error);
				        });
				
					
				
					
				    // #busArrivalList div에 버스 도착 정보 나열
				    fetch(`/epl/getBusArrivalInfo?stationId=${station.stId}`)
				        .then(response => response.json())
				        .then(data => {
				            var arrivalInfoContent = '';
				            var hasValidBusInfo = false; // 유효한 버스 정보가 있는지 확인하는 플래그

				            data.forEach(function(bus) {
				                // busNo가 0인 경우는 제외
				                if (bus.busNo && bus.busNo !== "0") {
									updateBusLocation(bus.busNo); // 각 버스 위치 업데이트
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
				       
									// 좌표계 정의 (TM 중부원점 기준, EPSG:5186 → WGS84 변환)
									proj4.defs([
										['EPSG:5186', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1.0 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'], // TM 중부원점
										['WGS84', '+proj=longlat +datum=WGS84 +no_defs'] // WGS84
									]);

									// 좌표 변환 함수
									function transformCoordinates(posX, posY) {
										// TM 좌표계 (EPSG:5186)를 WGS84로 변환
										const [lng, lat] = proj4('EPSG:5186', 'WGS84', [posX, posY]);

										// 변환된 좌표 디버깅
										console.log("변환된 좌표:", lat, lng);
										return { lat, lng };
									}

									// 버스 위치를 실시간으로 업데이트하는 함수
									function updateBusLocation(busNo) {
										// 기존에 표시된 버스 마커를 모두 지운다.
										if (window.busMarkers && window.busMarkers.length > 0) {
											window.busMarkers.forEach(function(marker) {
												marker.setMap(null);  // 기존 마커 제거
											});
											window.busMarkers = [];  // 마커 배열 초기화
										}

										// 먼저, 1회성으로 버스의 현재 위치를 지도에 표시
										fetch(`/epl/getBusDetails?vehId1=${busNo}`)
											.then(response => response.json())
											.then(data => {
												console.log("버스 위치 데이터:", data);

												// data가 배열이 아니면, 배열로 처리할 수 있게 감싸기
												if (!Array.isArray(data)) {
													data = [data];  // 배열이 아니면 배열로 감싸서 처리
												}

												// 여러 버스의 좌표를 처리하기 위해 배열로 저장
												let busPositions = [];

												// 각 버스에 대해 좌표 변환 후 처리
												data.forEach(function(bus) {
													// posX, posY 값이 유효한지 체크
													if (bus.posX && bus.posY) {
														const transformed = transformCoordinates(bus.posX, bus.posY);
														if (transformed && transformed.lat && transformed.lng) {
															busPositions.push(transformed);
														} else {
															console.error("좌표 변환 실패:", bus.posX, bus.posY);
														}
													} else {
														console.error("유효하지 않은 posX 또는 posY:", bus.posX, bus.posY);
													}
												});

												// 변환된 좌표를 디버깅용으로 출력
												console.log("변환된 좌표들:", busPositions);

												// 각 버스 마커 추가
												busPositions.forEach(function(position) {
													addBusMarker(position.lat, position.lng);
												});
											})
											.catch(error => {
												console.error("버스 위치 업데이트 오류:", error);
											});

										// 이후 5초마다 실시간으로 위치를 갱신
										setInterval(function() {
											
											// 기존 마커 제거
											clearBusMarkers();
											
											fetch(`/epl/getBusDetails?vehId1=${busNo}`)
												.then(response => response.json())
												.then(data => {
													console.log("버스 위치 데이터:", data);

													
												

													// data가 배열이 아니면, 배열로 처리할 수 있게 감싸기
													if (!Array.isArray(data)) {
														data = [data];  // 배열이 아니면 배열로 감싸서 처리
													}

													// 여러 버스의 좌표를 처리하기 위해 배열로 저장
													let busPositions = [];

													// 각 버스에 대해 좌표 변환 후 처리
													data.forEach(function(bus) {
														// posX, posY 값이 유효한지 체크
														if (bus.posX && bus.posY) {
															const transformed = transformCoordinates(bus.posX, bus.posY);
															if (transformed && transformed.lat && transformed.lng) {
																busPositions.push(transformed);
															} else {
																console.error("좌표 변환 실패:", bus.posX, bus.posY);
															}
														} else {
															console.error("유효하지 않은 posX 또는 posY:", bus.posX, bus.posY);
														}
													});

													// 변환된 좌표를 디버깅용으로 출력
													console.log("변환된 좌표들:", busPositions);

													// 각 버스 마커 추가
													busPositions.forEach(function(position) {
														addBusMarker(position.lat, position.lng);
													});
												})
												.catch(error => {
													console.error("버스 위치 업데이트 오류:", error);
												});
										}, 20000); // 5초마다 호출
									}

									// 버스를 지도에 마커로 추가하는 함수
									function addBusMarker(lat, lng) {
										// 새로운 마커를 생성하고 지도에 추가
										var busMarkerPosition = new kakao.maps.LatLng(lat, lng);
										var busMarkerImage = new kakao.maps.MarkerImage(
											'/static/images/bus/bus_1.png',
											new kakao.maps.Size(35, 35) // 마커 크기 설정
										);

										var busMarker = new kakao.maps.Marker({
											position: busMarkerPosition,
											image: busMarkerImage,
											map: map // 마커를 표시할 지도
										});


										// 마커를 배열에 추가
										window.busMarkers.push(busMarker);
									}

									// 버스를 클릭했을 때 해당 버스 정보 표시
									document.querySelectorAll('.bus-info').forEach(function(busElement) {
										busElement.addEventListener('click', function() {
											var busNo = busElement.dataset.busNo;
											console.log("busNo", busNo);

											fetch(`/epl/getBusDetails?vehId1=${busNo}`)
												.then(response => response.text())  // 먼저 텍스트로 응답을 받음
												.then(text => {
													if (text) {
														return JSON.parse(text); // 텍스트를 JSON으로 파싱
													} else {
														throw new Error("빈 응답이 반환되었습니다.");
													}
												})
												.then(data => {
													console.log("버스 상세 정보:", data); // 받아온 데이터 로그 출력
													displayBusDetails(data, busNo);  // busNo를 전달하여 클릭된 버스의 마커를 구별
												})
												.catch(error => {
													console.error('버스 상세 정보 요청 오류:', error);
												});
										
									});


									// 버스 세부 정보 표시 함수 및 마커 이미지 변경
									function displayBusDetails(busDetails) {
									    // 버스의 위치가 제공되었는지 확인
									    if (busDetails && busDetails.posX && busDetails.posY) {
									        const transformed = transformCoordinates(busDetails.posX, busDetails.posY);
									        if (transformed && transformed.lat && transformed.lng) {
									            // 지도 중심을 해당 버스의 위치로 이동
									            var busPosition = new kakao.maps.LatLng(transformed.lat, transformed.lng);
									            map.setCenter(busPosition);  // 지도 중심을 버스 위치로 이동

									            // 지도 레벨을 1로 설정
									            map.setLevel(1);  // 지도 레벨을 1로 변경
								           
									        } else {
									            console.error("좌표 변환 실패:", busDetails.posX, busDetails.posY);
									        }
									    } else {
									        console.error("버스 위치 정보가 없습니다.");
									    }


										// busType에 따른 버스 종류 출력
										var busType = busDetails.busType === "1" ? "저상" : "일반";

										// congestion에 따른 혼잡도 출력
										var congestion;
										switch (busDetails.congetion) {
											case "0":
												congestion = "없음";
												break;
											case "3":
												congestion = "여유";
												break;
											case "4":
												congestion = "보통";
												break;
											case "5":
												congestion = "혼잡";
												break;
											case "6":
												congestion = "매우혼잡";
												break;
											default:
												congestion = "정보 없음";
												break;
										}

										// 모달창 내용 채우기
										var busDetailsContent = `
										    <h4>버스 번호: <span>${busDetails.plainNo}</span></h4>
										    <p>버스 종류: <span>${busType}</span></p>
										    <p>혼잡도: <span>${congestion}</span></p>
										    <p>정류소 도착 여부: <span>${busDetails.stopFlag === "1" ? "도착" : "운행중"}</span></p>
										    <p>최종 정류장 ID: <span>${busDetails.lastStnIdName}</span></p>
										    <p>정류소 순번: <span>${busDetails.stOrd}</span></p>
										    <p>만차 여부: <span>${busDetails.isFullFlag === "1" ? "만차" : "여유"}</span></p>
										   
										`;
										document.getElementById('modalBusDetails').innerHTML = busDetailsContent;

										// 모달창 표시
										var modal = document.getElementById('busDetailModal');
										modal.style.display = "block";  // 모달을 보이게 설정
									}

									// 모달창 닫기 버튼 이벤트 추가
									document.getElementById('closeBtn').addEventListener('click', function() {
										document.getElementById('busDetailModal').style.display = "none";  // 모달 닫기
									});
								});

							// 모달창 외부 영역 클릭 시 닫기
							window.addEventListener('click', function(event) {
								var modal = document.getElementById('busDetailModal');
								if (event.target === modal) {
									modal.style.display = "none";
								}
							});


							// 이전에 열린 정보창이 있으면 닫기
							if (currentInfoWindow) {
								currentInfoWindow.close();
							}

							stationInfoWindow.open(map, stationMarker);
							currentInfoWindow = stationInfoWindow;  // 클릭한 버스정류장의 정보창을 currentInfoWindow로 업데이트
						
						
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


		// 기존에 표시된 버스 마커를 모두 지우는 함수
		function clearBusMarkers() {
		    if (window.busMarkers && window.busMarkers.length > 0) {
		        window.busMarkers.forEach(function(marker) {
		            marker.setMap(null); // 지도에서 마커 제거
		        });
		        window.busMarkers = []; // 배열 초기화
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
		    blogListContainer.innerHTML = ''; // 기존 내용을 초기화

		    // <h1> 태그를 생성하여 블로그 리뷰 추가
		    var header = document.createElement('h1');
		    header.textContent = '블로그 리뷰';
		    blogListContainer.appendChild(header);

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

		// 타이틀과 표(차트)를 제거하는 함수
		function clearChart() {
		    // 타이틀을 비우기
		    var chartTitleContainer = document.getElementById('chartTitleContainer');
		    chartTitleContainer.innerHTML = '';

		    // 차트를 비우기
		    var ctx = document.getElementById('boardingChart').getContext('2d');
		    if (boardingChart) {
		        boardingChart.destroy();  // 차트 객체 삭제
		        boardingChart = null;     // 차트 객체를 null로 설정
		    }
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