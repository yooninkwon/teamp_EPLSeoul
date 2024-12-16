document.addEventListener("DOMContentLoaded", async () => {
    const elements = {
        expContainer: document.querySelector(".expContainer"),
        expSubmitButton: document.getElementById("expSubmit"),
        seoulMap: document.querySelector(".seoulMap"),
        objectElement: document.getElementById("seoulSvg"),
        mapSide: document.querySelector(".mapSide"),
        liking: document.querySelector(".liking"),
        distSubmit: document.getElementById("distSubmit"),
        likeStatic: document.getElementById("likeStatic"),
        likeDynamic: document.getElementById("likeDynamic"),
        localList: document.querySelector(".localList"),
        listUp: document.querySelector(".listUp"),
        listTableBody: document.querySelector("#listTable tbody"),
        filterButtonLeft: document.querySelector(".filterButtonLeft"),
        filterButtonRight: document.querySelector(".filterButtonRight"),
        restaurantFilters: document.querySelectorAll(".restaurantFilter"),
        searchSubmit: document.getElementById("searchSubmit"),
        restaurantContainer: document.querySelector(".restaurantDiv"),
        restaurantSide: document.querySelector(".restaurantSide"),
		restaurnatImg: document.getElementById("restaurantImg"),
		restaurantSideName: document.getElementById("restaurantSideName"),
		restaurantSideRate: document.getElementById("restaurantSideRate"),
		restaurantMap : document.getElementById("restaurantMap"),
		activityContainer: document.querySelector(".activityDiv"),
		activitySide: document.getElementById("activitySide"),
		activityImg: document.getElementById("activityImg"),
		activityName: document.getElementById("activityName"),
		changeDist: document.getElementById("changeDist"),
		courseCount: document.getElementById("courseCount"),
		restaurantSubmit: document.getElementById("restaurantSubmit"),
		activitySubmit: document.getElementById("activitySubmit"),
		viewCourse: document.getElementById("viewCourse"),
		navigationContainer: document.querySelector(".navigationContainer"),
		showlocalList: document.getElementById("showlocalList"),
		courseListDiv: document.getElementById("courseListDiv"),
		startAddress: document.getElementById("startAddress"),
		navi: document.getElementById("navi"),
		submitCourse: document.getElementById("submitCourse"),
    };

    let currentPage = 0;
    const pageSize = 20;
    let isFetching = false;
    let hasMoreData = true;
    let selectedDistrict = "";
    let districtName = "";
    let likeType = "";
	let activity  = [];
	let activeFilterButton = null;
    let selectFilter = "한식";
    let searchType = '';
    let searchKeyword = '';
    let googleApiKey = ''; // API 키 저장 변수
	let kakaoRestApiKey = '';
	let kakaoJSApiKey = '';
	let mapContainer = document.getElementById("activityMap");
	let lastClickedMarker = null; // 마지막으로 클릭된 마커 추적 변수
	let lastClickedRow = null
	let course = 0;
	let selectedRowId = null;
	let selectedName = null;
	let selectedAddress = null;
	let selecttedOriginX = 0;
	let selecttedOriginY = 0;
	
	// 초기 상태 설정
	await initState(); // initState를 async로 호출
	// 초기 상태 설정 함수
	async function initState() {
	    elements.expContainer.classList.add("active");
	    elements.filterButtonLeft.classList.add("active");
	    toggleDisplay([
	        elements.seoulMap,
	        elements.mapSide,
	        elements.liking,
	        elements.localList,
	        elements.restaurantSide,
	        elements.activityContainer,
			elements.activitySide,
			elements.navigationContainer,
	    ], false);
		
		getCourseCount();
	    await fetchGoogleApi(); // Google API 키 가져오기
		await fetchKaKaoApi(); // kakao API 키 가져오기
	    await loadGoogleMapsScript(); // Google Maps 스크립트 로드
	}

	// Google API 키 가져오는 함수
	async function fetchGoogleApi() {
	    try {
	        const response = await fetch("/epl/date/api-key");
	        if (!response.ok) throw new Error("API 키 요청 실패");

	        const data = await response.json(); // JSON 형식으로 파싱
	        googleApiKey = data.googleApiKey; // 키를 저장
	    } catch (error) {
	        console.error("API 키 로드 실패:", error);
	    }
	}
	
	async function fetchKaKaoApi() {
		try {
			const response = await fetch("/epl/date/kakao-api-key")
			if (!response.ok) throw new Error("API 키 요청 실패");
			const data = await response.json(); // JSON 형식으로 파싱
	        kakaoRestApiKey = data.kakaoRestApiKey; // 키를 저장
	        kakaoJSApiKey = data.kakaoJSApiKey; // 키를 저장
			console.log(kakaoRestApiKey);
			console.log(kakaoJSApiKey);
	    } catch (error) {
	        console.error("API 키 로드 실패:", error);
	    }
	}
	
	// 검색 버튼 클릭 이벤트
	elements.searchSubmit.addEventListener("click", () => {
		searchType = document.getElementById("searchFilter").value;
		searchKeyword = document.getElementById("searchInput").value.trim();

		// 검색 상태 초기화
		currentPage = 0;
		hasMoreData = true;
		elements.listTableBody.innerHTML = ""; // 기존 데이터 초기화
		loadMoreRestaurants(selectFilter, searchType, searchKeyword);
		activeFilterButton.style.backgroundColor = "";
		activeFilterButton.style.color = "";


	});


	// 초기 한식 필터
	const defaultFilter = Array.from(elements.restaurantFilters).find(
		(button) => button.value === "한식"
	);
	if (defaultFilter) {
		defaultFilter.style.backgroundColor = "#007bff";
		activeFilterButton = defaultFilter;
	}

	// 필터별 결과
	elements.restaurantFilters.forEach((filterButton) => {
		filterButton.addEventListener("click", () => {
			selectFilter = filterButton.value;
			// 이전 활성화된 버튼의 스타일 초기화
			if (activeFilterButton) {
				activeFilterButton.style.backgroundColor = "";
				activeFilterButton.style.color = "";
			}
			// 새로 클릭된 버튼 스타일 설정
			filterButton.style.backgroundColor = "#007bff";
			filterButton.style.color = "white";
			activeFilterButton = filterButton;
			// 데이터 로드
			currentPage = 0;
			hasMoreData = true;
			elements.listTableBody.innerHTML = ""; // 기존 데이터 초기화
			loadMoreRestaurants(selectFilter); // 필터에 맞는 데이터 로드
		});
	});


	// 설명 숨기고 지도 보여주기
	elements.expSubmitButton.addEventListener("click", () => {
		toggleDisplay([elements.expContainer], false);
		toggleDisplay([elements.seoulMap], true);
	});

	// SVG 로드 후 지역 이벤트 설정
	elements.objectElement.addEventListener("load", () => setupDistrictInteractions());

	// "확인" 버튼 클릭 시 좋아요 화면으로 전환
	elements.distSubmit.addEventListener("click", () => {
		toggleDisplay([elements.liking], true);
		toggleDisplay([elements.mapSide, elements.seoulMap], false);
	});

	// 좋아요 정적/동적 선택 처리
	elements.likeStatic.addEventListener("click", () => handleLikeSelection("static"));
	elements.likeDynamic.addEventListener("click", () => handleLikeSelection("dynamic"));

	// 맛집, 카페 필터 이벤트
	elements.filterButtonLeft.addEventListener("click", () => {
		toggleFilter("left")
		toggleDisplay([elements.restaurantContainer], true);
		toggleDisplay([elements.activityContainer], false);

	});

	// 활동 필터 이벤트
	elements.filterButtonRight.addEventListener("click", () => {
		toggleFilter("right")
		toggleDisplay([elements.restaurantContainer], false);
		toggleDisplay([elements.activityContainer], true);
	});

	// 스크롤 이벤트로 데이터 추가 로드
	elements.listUp.addEventListener("scroll", () => handleScrollLoad());


	// 지역 SVG 상호작용 설정 함수
	function setupDistrictInteractions() {
		const svgDoc = elements.objectElement.contentDocument;
		const districts = svgDoc.querySelectorAll("path:not(.district)");
		districts.forEach((district) => {
			district.classList.add("district");
			district.addEventListener("mouseover", () => district.style.fill = "#007bff");
			district.addEventListener("mouseout", () => {
				if (district !== selectedDistrict) district.style.fill = "";
			});
			district.addEventListener("click", () => handleDistrictClick(district));
		});
	}

	// 지역 클릭 처리 함수
	function handleDistrictClick(district) {
		if (selectedDistrict) selectedDistrict.style.fill = "";
		selectedDistrict = district;
		district.style.fill = "#007bff";
		districtName = district.getAttribute("id");

		toggleDisplay([elements.mapSide], true);
		elements.mapSide.classList.add("active");
		elements.objectElement.style.width = "50%";
		fetchDistrictInfo(districtName);
	}

	// 좋아요 선택 처리 함수
	function handleLikeSelection(type) {
	    likeType = type;
	    toggleDisplay([elements.liking], false);
	    toggleDisplay([elements.localList], true);

	    let activity = [];
	    if (likeType === "static") {
	        activity = ["산책로", "서점", "공원", "영화관", "사진관", "전시회", "박물관", "피시방", "미술관", "관광 명소"];
	    } else if (likeType === "dynamic") {
	        activity = ["체험관", "보드게임", "공방", "방탈출", "오락실", "아쿠아리움", "낚시카페", "테마파크", "전망대", "VR카페", "관광 명소"];
	    }

	    if (districtName) {
	        renderActivityMap(activity, districtName); // 행정구 및 카테고리로 지도 렌더링
	    } else {
	        console.error("선택된 행정구가 없습니다.");
	    }

	    currentPage = 0;
	    hasMoreData = true;
	    elements.listTableBody.innerHTML = "";
	    loadMoreRestaurants(selectFilter);
	}

	// 구청 주소 알아오기
	async function getDistrictCenter(districtName) {
	    try {
	        const response = await fetch(`/epl/date/google-api/place?input=${encodeURIComponent(districtName + " 구청")}`);
	        const data = await response.json();

	        if (data.candidates && data.candidates.length > 0) {
	            return data.candidates[0].geometry.location; // { lat, lng }
	        } else {
	            console.error(`구청 위치를 찾을 수 없습니다: ${districtName}`);
	            return null;
	        }
	    } catch (error) {
	        console.error("구청 검색 중 오류 발생:", error);
	        return null;
	    }
	}

	// 활동 지도 불러오기
	async function renderActivityMap(categories, districtName) {
	    
	    const districtCenter = await getDistrictCenter(districtName);

	    const map = new google.maps.Map(mapContainer, {
	        center: districtCenter,
	        zoom: 15,
	    });

	    const service = new google.maps.places.PlacesService(map);
	    categories.forEach((category) => {
	        searchCategoryAndAddMarkers(map, service, category, districtCenter);
	    });
	}

	// 구글맵 카테고리 검색, 마커 추가
	function searchCategoryAndAddMarkers(map, service, category, districtCenter) {
	    service.nearbySearch(
	        {
	            location: districtCenter,
	            radius: 5000, // 검색 반경 (단위: 미터)
	            keyword: category, // 검색 키워드
	        },
	        (results, status) => {
	            if (status === google.maps.places.PlacesServiceStatus.OK) {
	                results.forEach((place) => {
	                    if (place.geometry && place.geometry.location) {
	                        addMarker(map, place, category);
	                    }
	                });
	            } else {
	                console.error(`카테고리 '${category}'에 대한 Places API 요청 실패: ${status}`);
	            }
	        }
	    );
	}

	// 마커 추가
	async function addMarker(map, place, category) {
	    const defaultIcon = {
	        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
	        labelOrigin: new google.maps.Point(30, 10),
	        scaledSize: new google.maps.Size(32, 32), // 기본 크기
	    };

	    const clickedIcon = {
	        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
	        labelOrigin: new google.maps.Point(40, 10),
	        scaledSize: new google.maps.Size(48, 48), // 클릭 시 크기
	    };

	    const marker = new google.maps.Marker({
	        position: place.geometry.location,
	        map: map,
	        title: place.name,
	        icon: defaultIcon,
			customCategory: category, // 카테고리 정보 추가
	    });

	    marker.addListener("click", async () => {
	        // 이전 클릭된 마커 기본 크기로 되돌리기
	        if (lastClickedMarker && lastClickedMarker !== marker) {
	            lastClickedMarker.setIcon(defaultIcon);
	        }
	        marker.setIcon(clickedIcon);
	        map.setCenter(marker.getPosition());
	        lastClickedMarker = marker;

			// 사진 및 웹사이트 정보 로드
		    const { photoUrl, website, rating, userRatingsTotal, formattedAddress  } = await fetchPlaceDetails(place.place_id);
	        if (photoUrl) {
	            elements.activityImg.innerHTML = `<img src="${photoUrl}" style="width:100%;">`;
	        } else {
	            elements.activityImg.innerHTML = `<img src="/static/images/date/activityNoImg.png" style="width:100%;">`;
	        }
			
			// 웹사이트 표시
		    if (website) {
		        document.getElementById('activityWebsite').innerHTML = `<a href="${website}" target="_blank">웹사이트 방문하기</a>`;
		    } else {
		        document.getElementById('activityWebsite').innerHTML = "등록된 웹사이트가 없습니다.";
		    }
			
			// 이미지와 별점 표시
            document.getElementById('activitySideRating').innerHTML = `<div class="restaurantSideRate">${generateStars(rating)}&ensp;&ensp;${userRatingsTotal}개의 평가</div>`;
			
			// 카테고리 정보 표시
	        document.getElementById('activityCategory').textContent = `${marker.customCategory}`;
			
			// 주소 표시
			document.getElementById(`activityAddress`).textContent = `${formattedAddress}`

	        // UI 업데이트
	        toggleDisplay([elements.activitySide], true);
	        mapContainer.style.width = "70%";
			elements.activityName.innerHTML = `<p id="activitySideName">${place.name}</p>`;
			selectedName = place.name;
			selectedAddress = formattedAddress;
	    });
	}
	
	// 활동 불러오는 패치
	async function fetchPlaceDetails(placeId) {
	    try {
	        const response = await fetch(`/epl/date/place/details?place_id=${placeId}`);
	        if (!response.ok) {
	            throw new Error(`HTTP 오류 상태: ${response.status}`);
	        }

	        const data = await response.json();
	        console.log("세부정보:", data);

	        // 데이터 사용
	        const photoUrl = data.photoUrl || null;
	        const website = data.website || null;
	        const rating = data.rating || 0.0;
	        const userRatingsTotal = data.userRatingsTotal || 0;
			const formattedAddress = data.formattedAddress || null;
			
			
	        return { photoUrl, website, rating, userRatingsTotal, formattedAddress };
	    } catch (error) {
	        console.error("세부정보 로드 중 오류 발생:", error);
	        return { photoUrl: null, website: null, rating: 0.0, userRatingsTotal: 0 };
	    }
	}

	

	
	// 필터 토글 처리 함수
	function toggleFilter(side) {
		elements.filterButtonLeft.classList.toggle("active", side === "left");
		elements.filterButtonRight.classList.toggle("active", side === "right");
	}

	// 지역 정보 가져오기 함수
	async function fetchDistrictInfo(districtName) {
		try {
			const response = await fetch(`/epl/date/dist_info?distname=${districtName}`);
			const data = await response.json();
			updateDistrictInfo(data);
		} catch (error) {
			console.error("구 정보 가져오기 오류:", error);
			alert("구 정보를 가져오는 중 문제가 발생했습니다.");
		}
	}

	// 지역 정보 업데이트 함수
	function updateDistrictInfo(data) {
		document.getElementById("districtName").textContent = data.dist_NAME;
		document.getElementById("districtSlogan").textContent = data.dist_SLOGAN;
		document.getElementById("districtMemo").textContent = data.dist_MEMO;
		document.getElementById("landmark").textContent = data.landmark;

		document.getElementById("districtImg").style.backgroundImage =
			`url('/static/images/date/distImg/${data.dist_IMG}.jpeg')`;
		document.getElementById("landmarkImg").style.backgroundImage =
			`url('/static/images/date/landmarkImg/${data.landmark_IMG}.jpeg')`;
	}



	// 스크롤 로드 처리 함수
	function handleScrollLoad() {
		const { scrollTop, clientHeight, scrollHeight } = elements.listUp;
		// hasMoreData가 false일 경우 로드 중단
		if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching && hasMoreData) {
			currentPage++;
			loadMoreRestaurants(selectFilter, searchType, searchKeyword);
		}
	}


	// 데이터 로드 함수
	async function loadMoreRestaurants(filterType = "", searchType = "", searchKeyword = "") {
		if (isFetching || !hasMoreData) return;
		isFetching = true;

		try {
			const data = await fetchRestaurants(currentPage, pageSize, filterType, searchType, searchKeyword);
			renderRestaurants(data);
			if (data.length < pageSize) hasMoreData = false; // 더 이상 데이터가 없으면
		} catch (error) {
			console.error("식당 데이터 로드 중 오류:", error);
		} finally {
			isFetching = false;
		}
	}


	// 식당 데이터 가져오기 함수
	async function fetchRestaurants(page, size, filterType = "", searchType, searchKeyword) {
		const response = await fetch(
			`/epl/date/restaurant_info?distname=${districtName}
			&page=${page}&size=${size}&type=${filterType}
			&searchType=${searchType}&searchKeyword=${searchKeyword}`);
		if (!response.ok) throw new Error("식당 데이터 요청 실패");
		return await response.json();
	}

	// 식당 랜더링
	function renderRestaurants(restaurants) {
		restaurants.forEach((restaurant) => {
			// '한식', '중식', '일식', '카페' 외의 경우 '기타', '경양식'은 '양식'으로 설정
			const allowedTypes = ["한식", "중식", "일식", "까페"];
			let businessType;

			if (restaurant.business_type === "중국식") {
				businessType = "중식";
			} else if (restaurant.business_type === "경양식") {
				businessType = "양식";
			} else if (allowedTypes.includes(restaurant.business_type)) {
				businessType = restaurant.business_type;
			} else {
				businessType = "기타";
			}

			// area_size가 100 이상인 경우 태그 추가
			let sizeTag = "";
			if (Number(restaurant.area_size) >= 100) {
				sizeTag = "넓은공간";
			}

			// 신규오픈 태그 추가 조건
			let newTag = "";
			if (restaurant.permission_date) {
				// permission_date를 Date 객체로 변환
				const permissionDate = new Date(restaurant.permission_date);
				const oneYearAgo = new Date();
				oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

				if (permissionDate > oneYearAgo) {
					newTag = "신규오픈";
				}
			}

			// street_address에서 ','나 '(' 기준으로 문자열을 자르기
			const shortenedAddress = restaurant.street_address.split(/,|\(/)[0].trim() || "주소 없음";
			const rowId = restaurant.management_number;

			const row = document.createElement("tr");
			row.id = rowId;

			row.innerHTML = `
	            <td style="width: 30%; float: left; margin-left: 50px;">${restaurant.business_name}</td>
	            <td style="width: 5%; float: left; margin-left: 50px;">${businessType}</td>
	            <td style="width: 30%; float: left; margin-left: 50px;">${shortenedAddress}</td>
	            ${sizeTag ? `<td id="sizeTag">${sizeTag}</td>` : ""}
	            ${newTag ? `<td id="newTag">${newTag}</td>` : ""}
				<input type="hidden" class="restaurnatId" value="${rowId}">
	            
	        `;

			// 클릭 이벤트 추가
			row.addEventListener("click", () => {
				console.log(`Row clicked: ${rowId}`);
				selectedRowId = rowId;
				// 이전 클릭된 로우의 배경색 초기화
			    if (lastClickedRow) {
			        lastClickedRow.style.backgroundColor = ""; // 초기 상태로 복원
			    }
				// 현재 클릭된 로우의 배경색 변경
			    row.style.backgroundColor = "#f0f8ff"; // 클릭된 로우의 배경색 설정
			    // 마지막 클릭된 로우 업데이트
			    lastClickedRow = row;
				elements.listUp.classList.add("active");
				toggleDisplay([elements.restaurantSide], true);
				fetchPlaceImageAndRating(restaurant.business_name);
				elements.restaurantSideName.innerHTML = restaurant.business_name;
				renderMap(restaurant.business_name);
				selectedName = restaurant.business_name;
				selectedAddress = shortenedAddress;
			});

			elements.listTableBody.appendChild(row);
		});
	}
	
	// 코스 추가 패치
	function addCourse(selectedName, selectedAddress) {
	    const data = {
	        name: selectedName,
	        address: selectedAddress
	    };
	    fetch('/epl/date/addCourse', {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	    })
	    .then(response => {
	        if (response.ok) {
	            return response.json(); // 서버 응답 처리
	        } else {
	            throw new Error('Failed to save course');
	        }
	    })
	    .then(data => {
			if (data.message == '이미 추가된 코스입니다.') {
				alert(data.message);
				getCourseCount();
			} else if (data.message == '코스는 5개 까지만 가능합니다.') {
				alert(data.message);
				getCourseCount();
			} else {				
	        	console.log('코스 저장 완료:', data);
				alert(data.message);
				getCourseCount();
			}
	    })
	    .catch(error => {
	        console.error('에러 발생:', error);
	    });
	}

	async function fetchPlaceImageAndRating(businessName) {
	    try {
			// Google Maps 스크립트 로드
			await loadGoogleMapsScript();
	        // 업체명을 쿼리로 Google Places API 요청
	        const response = await fetch(`/epl/date/google-api/place?input=${encodeURIComponent(businessName)}`);
	        const data = await response.json();
	        // 검색 결과 검증
	        if (data.candidates && data.candidates.length > 0) {
	            const firstCandidate = data.candidates[0];
	            // 별점 정보 확인
	            const rating = firstCandidate.rating || 0;
				const reviewCount = firstCandidate.user_ratings_total || 0;
	            // 사진 정보 확인
	            if (firstCandidate.photos && firstCandidate.photos.length > 0) {
	                const photoReference = firstCandidate.photos[0].photo_reference;

	                // photoReference를 이용해 Google Places Photo API 요청
	                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleApiKey}`;

	                // 이미지와 별점 표시
	                elements.restaurnatImg.innerHTML = `<img src="${photoUrl}" alt="${businessName} Image" style="width:100%;">`;
	                elements.restaurantSideRate.innerHTML = `<div class="restaurantSideRate">${generateStars(rating)}&ensp;&ensp;${reviewCount}개의 평가</div>`;
	            } else {
					elements.restaurnatImg.innerHTML = `<img src="/static/images/date/restaurantNoImg.png" Image" style="width:100%;">`;
					elements.restaurantSideRate.innerHTML = `<div class="restaurantSideRate">${generateStars(rating)}&ensp;&ensp; ${reviewCount}개의 평가</div>`;
	            }
	        } else {
	            elements.restaurnatImg.innerHTML = `<img src="/static/images/date/restaurantNoImg.png" Image" style="width:100%;">`;
	        }
			
	    } catch (error) {
	        console.error("Google Places API 요청 실패:", error);
	        elements.restaurnatImg.innerHTML = "이미지를 로드하는 중 오류가 발생했습니다.";
	    }
	}
	
	function loadGoogleMapsScript() {
	    return new Promise((resolve, reject) => {
	        // 이미 Google Maps API 스크립트가 로드되었는지 확인
	        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
	            resolve(); // 이미 로드됨
	            return;
	        }

	        // 스크립트를 동적으로 추가
	        const script = document.createElement("script");
	        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
	        script.defer = true;

	        script.onload = () => {
	            console.log("Google Maps API 로드 성공");
	            resolve();
	        };

	        script.onerror = () => reject(new Error("Google Maps API 로드 실패"));

	        document.head.appendChild(script);
	    });
	}
	
	async function renderMap(businessName) {
	    try {
	        const response = await fetch(`/epl/date/google-api/place?input=${encodeURIComponent(businessName)}`);
	        const data = await response.json();

	        if (data.candidates && data.candidates.length > 0) {
	            const location = data.candidates[0].geometry.location;

	            const map = new google.maps.Map(elements.restaurantMap, {
	                center: { lat: location.lat, lng: location.lng },
	                zoom: 15,
	            });

	            new google.maps.Marker({
	                position: { lat: location.lat, lng: location.lng },
	                map: map,
	                title: businessName,
	            });
	        } else {
	            elements.restaurantMap.innerHTML = "지도 정보를 찾을 수 없습니다.";
	        }
	    } catch (error) {
	        console.error("Google Places API 요청 실패:", error);
	        elements.restaurantMap.innerHTML = "지도 로드 중 오류가 발생했습니다.";
	    }
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
	
	// 음식점 경유지에 추가 버튼
	elements.restaurantSubmit.addEventListener("click", async () => {
	    addCourse(selectedName, selectedAddress); // 코스 추가
		getCourseCount();
	});
	
	// 코스 카운트 가져오기
	function getCourseCount() {
		fetch('/epl/date/getCourseCount') // 업데이트된 카운트 가져오기
			.then(response => {
			    if (response.ok) {
			        return response.json();
			    } else {
			        throw new Error('Failed to fetch updated course count');
			    }
			})
			.then(data => {
			    course = data.courseCount;
				if(course > 0) {
					toggleDisplay([elements.courseCount], true);
				    elements.courseCount.innerHTML = course; // 화면에 표시
				} else {
					toggleDisplay([elements.courseCount], false);
				}	
			})
			.catch(error => {
			    console.error('Error fetching updated course count:', error);
			});
	}
	
	// 활동 경유지에 추가
	elements.activitySubmit.addEventListener("click" , async () => {
		addCourse(selectedName, selectedAddress); // 코스 추가
		getCourseCount();
	});
	
	elements.changeDist.addEventListener("click" ,() => {
		toggleDisplay([elements.localList, elements.restaurantSide, elements.activitySide], false);
		toggleDisplay([elements.seoulMap, elements.mapSide], true);
		elements.listUp.classList.remove("active");
		mapContainer.style.width = "100%";
		
	});
	
	elements.viewCourse.addEventListener("click" , () =>{
		if(elements.courseCount.style.display == "none"){
			alert("선택된 경유지가 없습니다.");
		}
		toggleDisplay([elements.localList], false);
		toggleDisplay([elements.navigationContainer], true);
		getCourseInfo();
		displayRoute();
	});
	
	async function getCourseInfo() {
        try {
            const response = await fetch('/epl/date/getCourseInfo');
            if (!response.ok) {
                throw new Error('Failed to fetch course info');
            }

            const courseList = await response.json();

            // DOM에 코스 정보 추가
            elements.courseListDiv.innerHTML = ''; // 초기화

            courseList.forEach((course, index) => {
                const courseDiv = document.createElement('div');
                courseDiv.classList.add('course-item');
                courseDiv.setAttribute('draggable', 'true');
                courseDiv.dataset.index = index; // 순서를 저장

                courseDiv.innerHTML = `
                    <span>${course.name}</span>
                `;
                courseListDiv.appendChild(courseDiv);
            });

            makeCourseListDraggable(); // 드래그 앤 드롭 활성화
        } catch (error) {
            console.error('Error fetching course info:', error);
        }
    }
	
	function makeCourseListDraggable() {
	    let draggedItem = null;

	    // 드래그 시작
	    elements.courseListDiv.addEventListener('dragstart', (e) => {
	        if (e.target.classList.contains('course-item')) {
	            draggedItem = e.target;
	            e.target.style.opacity = '0.5';
	        }
	    });

	    // 드래그 종료
	    elements.courseListDiv.addEventListener('dragend', (e) => {
	        if (e.target.classList.contains('course-item')) {
	            e.target.style.opacity = '1';
	        }
	        draggedItem = null;
	    });

	    // 드래그된 요소가 다른 요소 위로 이동 중
	    elements.courseListDiv.addEventListener('dragover', (e) => {
	        e.preventDefault(); // 기본 동작 방지
	    });

	    // 드랍 시 순서 변경
	    elements.courseListDiv.addEventListener('drop', (e) => {
	        e.preventDefault();

	        if (draggedItem && e.target.classList.contains('course-item')) {
	            const allItems = Array.from(courseListDiv.children);
	            const draggedIndex = allItems.indexOf(draggedItem);
	            const targetIndex = allItems.indexOf(e.target);

	            // 순서 변경
	            if (draggedIndex < targetIndex) {
	                elements.courseListDiv.insertBefore(draggedItem, e.target.nextSibling);
	            } else {
	                elements.courseListDiv.insertBefore(draggedItem, e.target);
	            }

	            updateCourseOrder(); // 변경된 순서를 서버에 저장
	        }
	    });
	}

	// 순서 저장 API 호출
	async function updateCourseOrder() {
	    const updatedOrder = Array.from(elements.courseListDiv.children).map((item) => ({
	        name: item.querySelector('span').innerText.split(' (')[0],
	    }));

	    try {
	        const response = await fetch('/epl/date/updateCourseOrder', {
	            method: 'POST',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify(updatedOrder),
	        });

	        if (!response.ok) {
	            throw new Error('Failed to update course order');
	        }
	        console.log('Course order updated successfully');
	    } catch (error) {
	        console.error('Error updating course order:', error);
	    }
	}
	
	elements.showlocalList.addEventListener("click", () => {
		toggleDisplay([elements.localList], true);
		toggleDisplay([elements.navigationContainer], false);
	});
	
	// 출발지 설정
	elements.startAddress.addEventListener("click", () => {
	    new daum.Postcode({
	        oncomplete: function(data) {
	            const startAddress = data.address; // 선택된 주소
	            elements.startAddress.value = startAddress; // 입력 필드에 표시

	            // 출발지를 서버에 저장
	            fetch('/epl/date/setStartAddress', {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({ address: startAddress })
	            })
	            .then(response => {
	                if (!response.ok) {
	                    throw new Error('Failed to save start address');
	                }
	                console.log('Start address saved successfully');
	            })
	            .catch(error => console.error('Error saving start address:', error));
	        }
	    }).open();
	});
	
	async function displayRoute() {
	    try {
			fetchKaKaoApi();
	        // 세션에서 출발지와 웨이포인트 데이터 가져오기
	        const response = await fetch('/epl/date/getRouteData');
	        if (!response.ok) {
	            throw new Error('Failed to fetch route data');
	        }

	        const routeData = await response.json();
	        const startAddress = routeData.startAddress;
	        const waypoints = routeData.waypoints;

	        if (!startAddress) {
	            console.error('Start address is missing');
	            alert('출발지가 설정되지 않았습니다. 출발지를 먼저 설정하세요.');
	            return;
	        }

	        if (!waypoints || waypoints.length === 0) {
	            console.error('Waypoints are missing');
	            alert('웨이포인트(코스)가 설정되지 않았습니다. 코스를 먼저 추가하세요.');
	            return;
	        }

	        console.log('Start Address:', startAddress);
	        console.log('Waypoints:', waypoints);

	        // 출발지와 웨이포인트를 좌표로 변환
	        const origin = await geocodeAddress(startAddress); // 출발지 좌표
			selecttedOriginX = origin.x;
			selecttedOriginY = origin.y;
	        const destination = await geocodeAddress(waypoints[waypoints.length - 1]); // 마지막 웨이포인트 좌표
	        const waypointCoords = await Promise.all(waypoints.slice(0, -1).map(geocodeAddress)); // 중간 웨이포인트 좌표
			
	        // 경로 API 호출
	        const waypointsParam = waypointCoords.map(coord => `${coord.x},${coord.y}`).join('|');
	        const routeResponse = await fetch(`https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.x},${origin.y}&destination=${destination.x},${destination.y}&waypoints=${waypointsParam}`, {
	            method: 'GET',
	            headers: {
	                Authorization: `KakaoAK ${kakaoRestApiKey}`
	            }
	        });

	        if (!routeResponse.ok) {
	            throw new Error('Failed to fetch route directions');
	        }

	        const routeDataJson = await routeResponse.json();
	        renderRouteOnMap(routeDataJson, origin, destination, waypointCoords); // 변수 전달
	    } catch (error) {
	        console.error('Error displaying route:', error);
	    }
	}

	// 주소를 좌표로 변환 (REST API 사용)
	async function geocodeAddress(address) {
	    const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
	        method: 'GET',
	        headers: {
	            Authorization: `KakaoAK ${kakaoRestApiKey}`
	        }
	    });

	    if (!response.ok) {
	        throw new Error('Failed to geocode address');
	    }

	    const data = await response.json();
	    const document = data.documents[0];
	    return { x: document.x, y: document.y }; // 경도, 위도 반환
	}

	// 지도에 경로 표시
	function renderRouteOnMap(routeData, origin, destination, waypoints) {
	    if (typeof kakao === 'undefined' || !kakao.maps) {
	        console.error("Kakao Maps SDK is not loaded");
	        return;
	    }

	    const mapContainer = elements.navi;
	    if (!mapContainer) {
	        console.error("Map container not found");
	        return;
	    }

	    const map = new kakao.maps.Map(mapContainer, {
	        center: new kakao.maps.LatLng(origin.y, origin.x),
	        level: 5
	    });

	    const sections = routeData.routes[0]?.sections;
	    if (!sections || sections.length === 0) {
	        console.error("No sections found in routeData.");
	        return;
	    }

	    const vertexes = sections.flatMap(section =>
	        section.roads.flatMap(road => road.vertexes)
	    );

	    const path = [];
	    for (let i = 0; i < vertexes.length; i += 2) {
	        const lat = parseFloat(vertexes[i + 1]);
	        const lng = parseFloat(vertexes[i]);
	        if (!isNaN(lat) && !isNaN(lng)) {
	            path.push(new kakao.maps.LatLng(lat, lng));
	        }
	    }

	    const polyline = new kakao.maps.Polyline({
	        path: path,
	        strokeWeight: 5,
	        strokeColor: '#007bff',
	        strokeOpacity: 0.8,
	        strokeStyle: 'solid'
	    });
	    polyline.setMap(map);

	    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

	    // 출발지 마커
	    const startMarker = new kakao.maps.Marker({
	        position: new kakao.maps.LatLng(origin.y, origin.x),
	        title: "출발지"
	    });
	    startMarker.setMap(map);

	    // 도착지 마커
	    const endMarker = new kakao.maps.Marker({
	        position: new kakao.maps.LatLng(destination.y, destination.x),
	        title: "도착지"
	    });
	    endMarker.setMap(map);

	    // 도착지 클릭 이벤트
	    kakao.maps.event.addListener(endMarker, 'click', () => {
	        const lastSection = sections[sections.length - 1];
	        if (!lastSection || !lastSection.duration || !lastSection.distance) {
	            console.error("No data for last section.");
	            return;
	        }

	        const timeInMinutes = Math.floor(lastSection.duration / 60);
	        const distanceInKm = (lastSection.distance / 1000).toFixed(2);
	        const content = `
	            <div style="padding:5px;">
	                <strong>도착지</strong><br>
	                소요시간: ${timeInMinutes}분<br>
	                거리: ${distanceInKm} km
	            </div>`;
	        infowindow.setContent(content);
	        infowindow.open(map, endMarker);
	    });

	    // 경유지 마커
	    waypoints.forEach((wp, index) => {
	        const waypointMarker = new kakao.maps.Marker({
	            position: new kakao.maps.LatLng(wp.y, wp.x),
	            title: `경유지 ${index + 1}`
	        });
	        waypointMarker.setMap(map);

	        // 경유지 클릭 이벤트
	        kakao.maps.event.addListener(waypointMarker, 'click', () => {
	            const section = sections[index];
	            if (!section || !section.duration || !section.distance) {
	                console.error(`No data for section at index ${index}`);
	                return;
	            }

	            const timeInMinutes = Math.floor(section.duration / 60);
	            const distanceInKm = (section.distance / 1000).toFixed(2);
	            const content = `
	                <div style="padding:5px;">
	                    <strong>경유지 ${index + 1}</strong><br>
	                    소요시간: ${timeInMinutes}분<br>
	                    거리: ${distanceInKm} km
	                </div>`;
	            infowindow.setContent(content);
	            infowindow.open(map, waypointMarker);
	        });
	    });
	}

	elements.submitCourse.addEventListener("click", () => {
		displayRoute();
	});
	
	// 여러 요소 표시/숨기기 토글 함수
	function toggleDisplay(elements, show) {
		elements.forEach(element => element.style.display = show ? "block" : "none");
	}
});
