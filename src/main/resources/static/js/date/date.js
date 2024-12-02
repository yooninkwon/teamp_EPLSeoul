document.addEventListener("DOMContentLoaded", function () {
    const expContainer = document.querySelector(".expContainer");
    const expSubmitButton = document.getElementById("expSubmit");
    const seoulMap = document.querySelector(".seoulMap");
    const objectElement = document.getElementById("seoulSvg");
	const mapSide = document.querySelector(".mapSide");
	const liking = document.querySelector(".liking");
	const distSubmit = document.getElementById("distSubmit");
	const likeStatic = document.getElementById("likeStatic");
	const likeDynamic = document.getElementById("likeDynamic");
	const localList = document.querySelector(".localList");
	let like = "";
	
	let selectedDistrict = null;

    // 초기 상태 설정: 설명 컨테이너 활성화, 지도 숨기기
    expContainer.classList.add("active");
    seoulMap.style.display = "none";
    mapSide.style.display = "none";
	liking.style.display = "none";
	localList.style.display = "none"
	
    // 버튼 클릭 시 설명 숨기고 지도 보이기
    expSubmitButton.addEventListener("click", function () {
        expContainer.style.display = "none";
        seoulMap.style.display = "block";
    });

    // SVG 내부의 요소에 접근하여 클래스 추가 및 이벤트 처리
    objectElement.addEventListener("load", function () {
        const svgDoc = objectElement.contentDocument;

        // 모든 <path> 태그에 .district 클래스 추가
        const paths = svgDoc.querySelectorAll("path");
        paths.forEach(function (path) {
            if (!path.classList.contains("district")) {
                path.classList.add("district");
            }
        });

        // .district 요소에 이벤트 리스너 추가
        const districts = svgDoc.querySelectorAll(".district");

        districts.forEach(function (district) {
            district.addEventListener("mouseover", function () {
                // 호버 시 시각적 효과를 추가
                this.style.fill = "#73A3FF";
				this.style.cursor = "pointer"
            });

			district.addEventListener("mouseout", function () {
                // 마우스 나갔을 때 원래 색상 복원 (선택된 구 제외)
                if (district !== selectedDistrict) {
                    this.style.fill = "";
                }
            });

			district.addEventListener("click", function () {
	            // 이전 선택된 구의 색상을 초기화
	            if (selectedDistrict) {
	                selectedDistrict.style.fill = "";
	            }
	
	            // 현재 선택된 구 업데이트 및 색상 고정
	            selectedDistrict = district;
	            this.style.fill = "#73A3FF";
				
				// 구 이름 가져오기
				let districtName = this.getAttribute("title") || this.getAttribute("id");

	            // mapSide 활성화
	            mapSide.style.display = "block"; // 먼저 표시
	            setTimeout(() => {
	                mapSide.classList.add("active"); // 애니메이션 트리거
	            }, 10);
	
	            // objectElement 크기 축소
	            objectElement.style.width = "50%";
				
				// 구 정보 가져오기
			    fetchDistrictInfo(districtName);
	        });
        });
		
		distSubmit.addEventListener("click", function() {
			liking.style.display = "block";
			mapSide.style.display = "none";
			seoulMap.style.display = "none";
		});
		
		likeStatic.addEventListener("click", function() {
			liking.style.display = "none";
			like = "static";
			console.log(districtName);
			console.log(like);
			localList.style.display = "block"
		});
		
		likeDynamic.addEventListener("click", function() {
			liking.style.display = "none";
			like = "Dynamic";
			console.log(districtName);
			console.log(like);
			localList.style.display = "block"
		});
		
    });
	
	function fetchDistrictInfo(districtName) {
	    fetch(`/epl/date/dist_info?distname=${districtName}`, {})
	        .then(response => response.json())
			.then(data => {
	            // DOM 요소에 DTO 데이터 반영
	            document.getElementById("districtName").textContent = data.dist_NAME;
	            document.getElementById("districtSlogan").textContent = data.dist_SLOGAN;
	            document.getElementById("districtMemo").textContent = data.dist_MEMO;
				document.getElementById("landmark").textContent = data.landmark;
				
				const districtImgDiv = document.getElementById("districtImg");
	            districtImgDiv.style.backgroundImage = `url('/static/images/date/distImg/${data.dist_IMG}.jpeg')`;
				const landmarkImgDiv = document.getElementById("landmarkImg");
				landmarkImgDiv.style.backgroundImage = `url('/static/images/date/landmarkImg/${data.landmark_IMG}.jpeg')`;
	        })
	        .catch(error => {
	            console.error("Error fetching district info:", error);
	            alert("구 정보를 가져오는 데 문제가 발생했습니다.");
	        });
		
	}
});
