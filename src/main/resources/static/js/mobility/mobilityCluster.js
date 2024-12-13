document.addEventListener('DOMContentLoaded', function() {
	// 지도 생성하기
	var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var mapOption = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(37.566747, 126.978139), //지도의 중심좌표. 위도(latitude), 경도(longitude)
		level: 9 //지도의 레벨(확대, 축소 정도)
	}
	
	var map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴
			
	// 따릉이 대여소 정보 호출
	document.getElementById('fetchBikeRentData').addEventListener('click', function () {
		document.getElementById('bikeRentFilter').style.display = "block";
	});

	
	let combinedData = []; // 조합된 데이터 배열
	let markers = []; // 생성된 마커 객체 배열
	let groupedData = []; // 그룹화된 데이터 배열
	let loadTimer; // 타이머 ID를 저장할 변수

	// 마커 클러스터러를 생성합니다 
	var clusterer = new kakao.maps.MarkerClusterer({
	    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
	    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
	    minLevel: 4, // 클러스터 할 최소 지도 레벨
		minClusterSize: 1,
		girdSize: 150
	});
	
	// 최근 1년의 월별 버튼 표시
	displayMonthlyButtons();
	function displayMonthlyButtons() {
		const currentDate = new Date();
	    for (let i = 0; i < 12; i++) {
	        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
	        const month = date.toISOString().slice(0, 7).replace('-', ''); // 'YYYYMM' 형식

	        const btn = document.createElement('button');
	        btn.textContent = `${month.slice(0, 4)}년 ${Number(month.slice(4))}월`;
			btn.dataset.month = month;
	        btn.className = 'option-item';
			btn.addEventListener('click', () => {
	            handleMonthBtn(btn);

				// 기존 타이머가 있으면 초기화
			    if (loadTimer) {
			        clearTimeout(loadTimer);
			    }

			    // 2초 후에 기간별 데이터 호출
			    loadTimer = setTimeout(() => {
			        loadMonthlyData();
			    }, 2000);
	        });
	        document.getElementById('monthlySelect').appendChild(btn);
	    }
	}
	
	// 클릭 이벤트 처리
	function handleMonthBtn(selectedBtn) {
		// 활성화 or 비활성화
        if (selectedBtn.classList.contains('active')) {
            selectedBtn.classList.remove('active');
        } else {
            selectedBtn.classList.add('active');
        }
	}
	
	// 활성화 여부에 따라 데이터 fetch
	async function loadMonthlyData() {
		// 초기화
		combinedData = [];
		markers = [];
		groupedData = [];
		clusterer.clear();
		document.getElementById('districtSelect').innerHTML = '';
		
		// 월별 대여정보를 순차적으로 호출
		const buttons = document.getElementById('monthlySelect').querySelectorAll('.active');
	    for (const btn of buttons) {
			const month = btn.dataset.month; // 클릭된 버튼의 month 값
			await fetchData('stationUseMonthInfo', month);
	    }
		// 대여소 정보를 호출해 좌표값 추가
		await fetchData('rentBikeStatus','');
		// 마커 생성 후 클러스터러에 추가
		createMarker();
		
		map.setLevel(9);
		map.setCenter(new kakao.maps.LatLng(37.566747, 126.978139));
		
		// 행정구별로 데이터를 그룹화하고 중심 좌표 계산
		groupByDistrictAndCalculateCenter();
		// 행정구별 버튼 생성 및 클릭 이벤트 추가
		groupedData.forEach(data => {
            const btn = document.createElement('button');
            btn.textContent = data.district;
            btn.className = 'option-item active';
			btn.addEventListener('click', () => { // 각 district 클릭 이벤트: 좌표값으로 지도 변경
				const lat = parseFloat(data.centerLat);
                const lot = parseFloat(data.centerLon);
				var locPosition = new kakao.maps.LatLng(lat, lot);
	            map.setCenter(locPosition);
				map.setLevel(6);
				document.getElementById('district').innerHTML = `${data.district}`;
				document.getElementById('totStationCnt').innerHTML = `${data.totStationCnt}`;
				document.getElementById('districtTotRentCnt').innerHTML = data.totRentCnt.toLocaleString();
	        });
            document.getElementById('districtSelect').appendChild(btn);
        });
	}

	// 데이터를 fetch하고 조합하는 함수
	async function fetchData (service, period) {
	    await fetch(`/epl/mobility/data/apiSeoul?service=${service}&period=${period}`) // 서버에 데이터 요청
	        .then(response => response.json()) // JSON 문자열을 JS 객체로 변환
	        .then(data => { // 서버에서 받은 데이터를 활용
				data.forEach(page => {
		            const parsedPage = JSON.parse(page); // 각 JSON 페이지를 객체로 변환
					if (service == 'stationUseMonthInfo') { // 월별 대여정보 합산
						const rentInfos = parsedPage[service].row; // 필요한 데이터 접근
						rentInfos.forEach(rentInfo => {
							// combinedData 배열에서 같은 name을 가진 데이터 검색
							const existingData = combinedData.find(item => item.name === rentInfo.stationName);
						    if (existingData) {
						        // 같은 name이 존재하면 rentCnt 값을 더해줌
						        existingData.rentCnt += Number(rentInfo.rentCnt);
						    } else {
						        // 새 데이터를 추가
						        combinedData.push({
						            name: rentInfo.stationName,
						            district: rentInfo.stationGrpName,
						            rentCnt: Number(rentInfo.rentCnt), // rentCnt를 숫자로 변환
						            lat: null,
						            lon: null
						        });
						    }
						});
					} else if (service == 'rentBikeStatus') { // 대여소 이름으로 좌표 매칭
						const stations = parsedPage[service].row; // 필요한 데이터 접근
						stations.forEach(station => {
							// combinedData 배열에서 같은 name을 가진 데이터 검색
							const existingData = combinedData.find(item => item.name === station.stationName);
						    if (existingData) {
						        // 같은 name이 존재하면 좌표 값을 추가
						        existingData.lat = Number(station.stationLatitude);
						        existingData.lon = Number(station.stationLongitude);
						    }
						});
					}
		        });
	        })
	        .catch(error => console.error('Error fetching data:', error)); // 에러 처리
	}
	
	// 마커를 생성하는 함수
	function createMarker() {
		combinedData.forEach(data => {
            if (data.lat !== null && data.lon !== null) { // 좌표 매칭이 된 경우에만 생성
				// 마커 이미지를 생성합니다
				const imageSrc = '/static/images/mobility/marker_bike.png';
			    const imageSize = new kakao.maps.Size(35, 35);
			    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				
				// 마커를 생성합니다
				// 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
                const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(data.lat, data.lon), // 마커를 표시할 위치
					image: markerImage, // 마커 이미지
					clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
					title: data.rentCnt // 마커 툴팁 : 클러스터 마우스오버에 활용
                });
                markers.push(marker); // 생성된 마커를 배열에 추가합니다

                // 마커에 인포윈도우 추가
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${data.name}</div>`
                });

				// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
				kakao.maps.event.addListener(marker, 'mouseover', function() {
				    infowindow.open(map, marker);
				});

				// 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
				kakao.maps.event.addListener(marker, 'mouseout', function() {
				    infowindow.close();
				});

				// service별 마커에 클릭이벤트를 등록합니다
				kakao.maps.event.addListener(marker, 'click', function() {
					document.getElementById('stationName').innerHTML = `${data.name}`;
					document.getElementById('stationTotRentCnt').innerHTML = data.rentCnt.toLocaleString();
				});
            }
        });

		clusterer.addMarkers(markers); // 클러스터러에 마커 추가
	}
	
	// 행정구별 그룹화 함수
	function groupByDistrictAndCalculateCenter() {
	    // 행정구별 그룹화 객체 생성
	    const groupedObject = combinedData.reduce((acc, data) => { // *accumulator(누산기) : 결과 데이터 누적
			// lat 또는 lon이 null인 경우 건너뜁니다
	        if (data.lat === null || data.lon === null) {
	            return acc;
	        }
			
			// 현재 district 값이 누적 객체(acc)에 없는 경우 초기화
	        if (!acc[data.district]) {
	            acc[data.district] = {
	                district: data.district,
					rentCnt: 0,
	                latSum: 0,
	                lonSum: 0,
	                count: 0
	            };
	        }
			// 그룹별 속성값 합산
	        acc[data.district].rentCnt += data.rentCnt;
	        acc[data.district].latSum += data.lat;
	        acc[data.district].lonSum += data.lon;
	        acc[data.district].count += 1;
			
	        return acc;
	    }, {}); // reduce 함수 초기값(initial value)으로 빈 객체 {}를 설정

	    // 그룹화 객체를 배열로 변환하면서 중심 좌표 계산 및 groupedData에 추가
		Object.values(groupedObject).forEach(group => (
			groupedData.push({
		        district: group.district,
		        totStationCnt: group.count,
		        totRentCnt: group.rentCnt,
		        centerLat: group.latSum / group.count,
		        centerLon: group.lonSum / group.count
			})
	    ));
	}
});