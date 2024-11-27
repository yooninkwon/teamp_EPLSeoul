$(document).ready(function() {

	// 엔터 키가 눌렸을 때
	$(document).on('keypress', function(e) {
		if (e.key === 'Enter') {  // Enter 키 확인
			$('.searchBtn').click();  // .searchBtn 클릭 이벤트 발동
		}
	});

	//지하철역 검색 ajax 보내기 해당하는 단어포함되는 지하철역명 리스트 뽑기
	document.querySelector('.searchBtn').addEventListener('click', function() {
		const searchValue = document.querySelector('.searchInput').value;

		if (searchValue != "") {

			$.ajax({
				url: 'metro/searchStationName',
				method: 'GET',
				data: {
					searchValue
				},
				success: function(data) {
					$('.resultNameBox').empty(); // 기존 결과를 지움
					console.log(data)

					data.forEach(function(rs) {
						let name = '<span class="stationName" '
							+ 'data-id=' + rs.BLDN_ID 
							+ ' data-name=' + rs.BLDN_NM
							+ ' data-route=' + rs.ROUTE
							+ ' data-x=' + rs.LAT
							+ ' data-y=' + rs.LOT 
							+ '>' 
							+ rs.BLDN_NM
							+ '(' + rs.ROUTE + ')'
							+ '</span>';
						$('.resultNameBox').append(name);

					});
				},
				error: function(xhr, status, error) {
					console.error('에러 발생:', error); // 에러 처리
				}
			})

		}


	});
	
	
	$(document).on('click', '.stationName', function() {
		  let station = $(this).text();  // 클릭한 역 이름 가져오기
	      let stationId = $(this).data('id');  // 클릭한 역의 ID (필요한 경우)
	      let stationName = $(this).data('name');  // 클릭한 역의 ID (필요한 경우)
	      let stationRoute = $(this).data('route');  // 클릭한 역의 ID (필요한 경우)
	      let stationX = $(this).data('x');  // 클릭한 역의 ID (필요한 경우)
	      let stationY = $(this).data('y');  // 클릭한 역의 ID (필요한 경우)
			
		  //클릭한 역명 표기
	      $('#resultStation').text(station);
	      
		  //맵표기
		  // Kakao Maps 로드 후 지도를 표시하는 함수 호출
		      kakao.maps.load(function() {
		          map(stationX, stationY);
		      });
		  
	      // AJAX 호출 또는 다른 방식으로 해당 역의 상세 정보를 가져올 수 있습니다.
	      // 예시로 간단하게 alert로 표시
	      
	      
	      // 필요한 경우, 데이터를 가져오는 AJAX 호출을 여기에 추가할 수 있습니다.
	      // 예시:
	      /*
	      $.ajax({
	          url: '/station/details',  // 예시 URL
	          type: 'GET',
	          data: { stationId: stationId },  // 역 ID 전달
	          success: function(data) {
	              // 받은 데이터를 사용해 화면에 표시
	              console.log(data);
	          }
	      });
	      */
	  });
	  
	  function map(x,y){
		var mapContainer = document.getElementById('resultMap'), // 지도를 표시할 div 
		    mapOption = { 
		        center: new kakao.maps.LatLng(x,y), // 지도의 중심좌표
		        level: 3 // 지도의 확대 레벨
		    };

		var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		// 마커가 표시될 위치입니다 
		var markerPosition  = new kakao.maps.LatLng(x,y); 

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
		    position: markerPosition
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
	  }
	  



});