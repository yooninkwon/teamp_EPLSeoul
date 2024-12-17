kakao.maps.load(function() {
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
	searchInput.addEventListener('input', function() {
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
			data.forEach(function(place) {
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
					li.addEventListener('click', function() {
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
	document.getElementById('searchButton').addEventListener('click', function() {
		var searchValue = searchInput.value.trim();
		suggestions.innerHTML = ''; // 이전 추천 목록 초기화
		if (searchValue) {
			ps.keywordSearch(searchValue, function(data, status) {
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
		console.log("position:", position);
		// 기존 마커 제거
		markers.forEach(function(markerObj) {
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
		kakao.maps.event.addListener(marker, 'click', function() {
			if (currentInfoWindow) {
				currentInfoWindow.close();
			}
			infoWindow.open(map, marker);
			currentInfoWindow = infoWindow;  // 클릭한 장소의 정보창을 currentInfoWindow로 업데이트
		});

		// 주변 버스정류장 마커 표시
		var nearbyStations = busStations.filter(function(station) {
			var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);
			var distance = getDistance(position, stationPosition);  // 거리 계산
			return distance < 500; // 500m 내의 정류소만 표시
		});

		nearbyStations.forEach(function(station) {
			var stationPosition = new kakao.maps.LatLng(station.y_coord, station.x_coord);
			var stationMarker = new kakao.maps.Marker({
				position: stationPosition,
				title: station.station_name
			});

			stationMarker.setMap(map);
			markers.push({ marker: stationMarker, station: station });



			// 버스 정류장 마커 클릭 시 정보창 표시
			kakao.maps.event.addListener(stationMarker, 'click', function() {
				var stationInfoWindowContent = '<div class="info-main-window" style="padding:5px;">' +
					'<strong>' + station.station_name + '</strong><br>';
				var stationInfoWindow = new kakao.maps.InfoWindow({
					content: stationInfoWindowContent
				});

				// 정보창을 표시
				stationInfoWindow.open(map, stationMarker);

				// 마커 클릭 시 해당 정류장 이름을 infoPanel에 표시
				document.getElementById('infoPanel').querySelector('h3').innerHTML = station.station_name;

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
								updateBusLocation(bus.busNo); // 각 버스 위치 업데이트
								// 각 버스 클릭 시 정보 표시 기능 추가
								arrivalInfoContent +=
									`<p id="bus_${bus.busNo}" class="bus-info" data-bus-no="${bus.busNo}">
				                        <strong>${bus.plainNo}</strong> 
				                        <br> (도착 시간: ${bus.arrmsg1})
				                    </p>`;
							}
						});

						// 유효한 버스 정보가 없는 경우 한 번만 메시지 표시
						if (!hasValidBusInfo) {
							arrivalInfoContent = '<p>버스 정보가 없습니다.</p>';
						}

						// #busArrivalList div에 버스 도착 정보 나열
						document.getElementById('busArrivalList').innerHTML = arrivalInfoContent;

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
						        <h4>버스 번호: ${busDetails.plainNo}</h4>			        
						        <p>버스 종류: ${busType}</p>
						        <p>혼잡도: ${congestion}</p>
						        <p>위도: ${busDetails.posX}</p>
						        <p>경도: ${busDetails.posY}</p>
						    `;
							document.getElementById('modalBusDetails').innerHTML = busDetailsContent;

							// 모달창 표시
							var modal = document.getElementById('busDetailModal');
							modal.style.display = "block";  // 모달을 보이게 설정
						}

						// 모달창 닫기 버튼 이벤트 추가
						document.getElementById('closeModal').addEventListener('click', function() {
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