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
		let address = ""; // 초기 값 설정
		kakao.maps.load(function() {
			//지도+마커 불러오기
			map(stationX, stationY);
		// 좌표를 통해 주소를 가져와서 사용
	      var geocoder = new kakao.maps.services.Geocoder();
	      var coord = new kakao.maps.LatLng(stationX, stationY);
	      var callback = function(result, status) {
	          if (status === kakao.maps.services.Status.OK) {
	              address = result[0].address.address_name;  // 주소를 받아옴
				  
				  //지하철기본정보, 이름의 유래, 서울시 지하철 역사 편의시설 현황, 서울교통공사_비상대피 안내도정보 가져오기
				  $.ajax({
				  			url: 'metro/stationInfo',  // 예시 URL
				  			type: 'GET',
				  			data: { stationName, stationRoute,stationId },  // 역 ID 전달
				  			success: function(data) {
				  				$('#resultInfo').empty(); // 기존 결과를 지움
				  				$('#resultHistory').empty(); // 기존 결과를 지움
				  				$('#resultMapName').empty(); // 기존 결과를 지움
				  				$('#resultAmenities').empty(); // 기존 결과를 지움
				  				$('.modal-content').empty(); // 기존 결과를 지움
				  				let stationInfo =
									'<p class="topic"><역사 기본정보></p>' 
				  					+'<table>'
				  							+'<thead>'
				  								+'<tr>'
				  									+'<th>역사명</th>'
				  									+'<th>호선</th>'
				  									+'<th>주소</th>'
				  									+'<th>전화번호</th>'
				  									+'<th>층수</th>'
				  									+'<th>면적(㎡)</th>'
				  									+'<th>준공년도</th>'
				  								+'</tr>'
				  							+'</thead>'
				  							+'<tbody>'
				  								+'<tr>'
				  									+'<td>'+stationName+'</td>'
				  									+'<td>'+stationRoute+'</td>'
				  									+'<td>'+address+'</td>'
				  									+'<td>'+(data.stationInfo && data.stationInfo.stationPhone ? data.stationInfo.stationPhone : '')+'</td>'
				  									+'<td>'+(data.stationInfo && data.stationInfo.floor ? data.stationInfo.floor : '')+'</td>'
				  									+'<td>'+(data.stationInfo && data.stationInfo.area ? data.stationInfo.area : '')+'</td>'
				  									+'<td>'+(data.stationInfo && data.stationInfo.yearBuilt ? data.stationInfo.yearBuilt : '')+'</td>'
				  								+'</tr>'
				  							+'</tbody>'
				  					 +'</table>';
				  				
				  				$('#resultInfo').append(stationInfo);
								
								let stationNameHistory =
									'<p class="topic"><역명의 유래></p>'
									+'<span id="nameHistory">'
									+(data.stationNameHistory && data.stationNameHistory.nameHistory ? data.stationNameHistory.nameHistory : '')
									+'</span>';

								$('#resultHistory').append(stationNameHistory);
								
								let stationMapName =
									'<span class="topic"><역 위치></span>'
									+'<span id="stationHelpMap"> 안내도 보기 </span>';
									
								$('#resultMapName').append(stationMapName);
								
								let stationAmenities =
								'<p class="topic"><편의시설 현황></p>'
								+'<table>'
			  							+'<thead>'
			  								+'<tr>'
			  									+'<th>엘리베이터</th>'
			  									+'<th>휠체어리프트</th>'
			  									+'<th>환승주차장</th>'
			  									+'<th>무인민원발급기</th>'
			  									+'<th>환전키오스크</th>'
			  									+'<th>기차예매역</th>'
			  									+'<th>문화공간</th>'
			  									+'<th>만남의장소</th>'
			  									+'<th>유아수유방</th>'
			  								+'</tr>'
			  							+'</thead>'
			  							+'<tbody>'
			  								+'<tr>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.elevator ? data.stationAmenities.elevator : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.wheelchairLift ? data.stationAmenities.wheelchairLift: '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.parking ? data.stationAmenities.parking : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.selfService ? data.stationAmenities.selfService : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.currencyKiosk ? data.stationAmenities.currencyKiosk : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.trainTicket ? data.stationAmenities.trainTicket : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.culturalSpace ? data.stationAmenities.culturalSpace : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.meetingPlace ? data.stationAmenities.meetingPlace : '')+'</td>'
			  									+'<td>'+(data.stationAmenities && data.stationAmenities.babyRoom ? data.stationAmenities.babyRoom : '')+'</td>'
			  								+'</tr>'
			  							+'</tbody>'
			  					 +'</table>';
								
								 $('#resultAmenities').append(stationAmenities);
								
								if (data.stationHelpMap == null){
									$('#stationHelpMap').hide();
								} 
								 let stationHelpMap =
								 '<img id="modalImage" src='
								 +data.stationHelpMap.image
								 +' alt="이미지">'
								 +'<button class="close-button" id="closeModal">&times;</button>';
								 
								 $('.modal-content').append(stationHelpMap);
				  			}
				  		});
	              console.log('주소:', address); // 주소 확인
	          } else {
	              
	          }
	      };
	      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
		  });

		
		
		


	});

	
	
	//지도 위치+마커
	function map(x, y) {
		var mapContainer = document.getElementById('resultMap'), // 지도를 표시할 div 
			mapOption = {
				center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
				level: 3 // 지도의 확대 레벨
			};

		var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		// 마커가 표시될 위치입니다 
		var markerPosition = new kakao.maps.LatLng(x, y);

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
			position: markerPosition
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
		
	}
	
	// 요소 가져오기
    const modal = document.getElementById('modal');
    

	// 이벤트 위임으로 동적 요소에 이벤트 연결
	$(document).on('click', '#stationHelpMap', function (event) {
	    event.preventDefault(); // 기본 동작 막기
	    modal.style.display = 'flex'; // 모달 표시
	});
	// 이벤트 위임으로 동적 요소에 이벤트 연결
	$(document).on('click', '#closeModal', function (event) {
	    modal.style.display = 'none'; // 모달 숨기기
	});


    

	


	


});