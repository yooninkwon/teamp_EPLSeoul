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
    };

    let currentPage = 0;
    const pageSize = 20;
    let isFetching = false;
    let hasMoreData = true;
    let likeType = "";
    let selectedDistrict = "";
    let districtName = "";

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
        loadMoreRestaurants();
    }

    // 필터 토글 처리 함수
    function toggleFilter(side) {
        elements.filterButtonLeft.classList.toggle("active", side === "left");
        elements.filterButtonRight.classList.toggle("active", side === "right");
    }

    // 데이터 로드 함수
    async function loadMoreRestaurants() {
        if (isFetching || !hasMoreData) return;
        isFetching = true;

        try {
            const data = await fetchRestaurants(currentPage, pageSize);
            renderRestaurants(data);
            if (data.length < pageSize) hasMoreData = false;
        } catch (error) {
            console.error("식당 데이터 로드 중 오류:", error);
        } finally {
            isFetching = false;
        }
    }

    // 스크롤 로드 처리 함수
    function handleScrollLoad() {
        const { scrollTop, clientHeight, scrollHeight } = elements.listUp;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
            currentPage++;
            loadMoreRestaurants();
        }
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

    // 식당 데이터 가져오기 함수
    async function fetchRestaurants(page, size) {
        const response = await fetch(`/epl/date/restaurant_info?distname=${districtName}&page=${page}&size=${size}`);
        if (!response.ok) throw new Error("식당 데이터 요청 실패");
        return await response.json();
    }

	function renderRestaurants(restaurants) {
	    restaurants.forEach((restaurant) => {
			// '한식', '중식', '일식', '카페' 외의 경우 '기타', '경양식'은 '양식'으로 설정
	        const allowedTypes = ["한식", "중식", "일식", "카페"];
	        let businessType;

	        if (restaurant.business_type === "경양식") {
	            businessType = "양식"; // 경양식을 양식으로 변환
	        } else if (allowedTypes.includes(restaurant.business_type)) {
	            businessType = restaurant.business_type; // 허용된 타입 유지
	        } else {
	            businessType = "기타"; // 나머지는 기타로 설정
	        }
			
	        // street_address에서 ','나 '(' 기준으로 문자열을 자르기
	        const shortenedAddress = restaurant.street_address.split(/,|\(/)[0].trim() || "주소 없음";

	        const row = document.createElement("tr");
	        row.innerHTML = `
	            <td style="width: 30%;">${restaurant.business_name}</td>
	            <td style="width: 10%;">${businessType}</td>
	            <td style="width: 30%;">${shortenedAddress}</td>
	        `;
	        elements.listTableBody.appendChild(row);
	    });
	}

    // 여러 요소 표시/숨기기 토글 함수
    function toggleDisplay(elements, show) {
        elements.forEach(element => element.style.display = show ? "block" : "none");
    }
});
