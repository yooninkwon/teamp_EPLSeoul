document.addEventListener("DOMContentLoaded", () => {

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
    };

    let currentPage = 0;
    const pageSize = 20;
    let isFetching = false;
    let hasMoreData = true;
    let selectedDistrict = "";
    let districtName = "";
	let activeFilterButton = null;
	let selectFilter = "한식";
	let searchType ='';
	let searchKeyword ='';
	
	
	// 검색 버튼 클릭 이벤트
    elements.searchSubmit.addEventListener("click", () => {
        searchType = document.getElementById("searchFilter").value;
        searchKeyword = document.getElementById("searchInput").value.trim();

        // 검색 상태 초기화
        currentPage = 0;
        hasMoreData = true;
        elements.listTableBody.innerHTML = ""; // 기존 데이터 초기화
        loadMoreRestaurants(selectFilter, searchType, searchKeyword);
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

    // 초기 상태 설정
    initState();

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

    // 필터 버튼 이벤트 설정
    elements.filterButtonLeft.addEventListener("click", () => toggleFilter("left"));
    elements.filterButtonRight.addEventListener("click", () => toggleFilter("right"));

    // 스크롤 이벤트로 데이터 추가 로드
    elements.listUp.addEventListener("scroll", () => handleScrollLoad());

    // 초기 상태 설정 함수
    function initState() {
        elements.expContainer.classList.add("active");
        elements.filterButtonLeft.classList.add("active");
        toggleDisplay([elements.seoulMap, elements.mapSide, elements.liking, elements.localList], false);
    }

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

        currentPage = 0;
        hasMoreData = true;
        elements.listTableBody.innerHTML = "";
        loadMoreRestaurants(selectFilter);
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

	        const row = document.createElement("tr");
			row.innerHTML = `
	            <td style="width: 30%; float: left; margin-left: 50px;">${restaurant.business_name}</td>
	            <td style="width: 5%; float: left; margin-left: 50px;">${businessType}</td>
	            <td style="width: 30%; float: left; margin-left: 50px;">${shortenedAddress}</td>
	            ${sizeTag ? `<td id="sizeTag">${sizeTag}</td>` : ""}
	            ${newTag ? `<td id="newTag">${newTag}</td>` : ""}
	            
	        `;
	        elements.listTableBody.appendChild(row);
	    });
	}

	
    // 여러 요소 표시/숨기기 토글 함수
    function toggleDisplay(elements, show) {
        elements.forEach(element => element.style.display = show ? "block" : "none");
    }
});
