$(document).ready(function() {

	let $zoom = 1;
	let mapImage = document.querySelector('.mapImage');
	let positionX = 0; // 위치 초기값 설정
	let positionY = 0; // 위치 초기값 설정

	function mapZoom() {
		mapImage.style.transform = 'scale(' + $zoom + ')';
	}

	addEventListener('keydown', function(event) {
		// 확대/축소 기능
		if (event.key === '+' || event.key === '=') {
			$zoom += 1.0;
		} else if (event.key === '-' || event.key === '_') {
			$zoom -= 1.0;
		}

		// 이동 기능 (좌우, 상하 이동)
		if (event.key === '6') {
			positionX -= 20;  // 오른쪽으로 이동
		} else if (event.key === '4') {
			positionX += 20;  // 왼쪽으로 이동
		} else if (event.key === '8') {
			positionY += 20;  // 위로 이동
		} else if (event.key === '5') {
			positionY -= 20;  // 아래로 이동
		}

		// 기본 초기화 기능 (0을 누르면)
		if (event.key === '0') {
			$zoom = 1;
			positionX = 0;
			positionY = 0;
		}
		// 최소 크기 제한
		if ($zoom <= 1) {
			$zoom = 1;
		}

		// 이동 적용
		mapImage.style.transform = 'scale(' + $zoom + ') translateX(' + positionX + 'px) translateY(' + positionY + 'px)';
	});


	// 엔터 키가 눌렸을 때
	$(document).on('keypress', function(e) {
		if (e.key === 'Enter') {  // Enter 키 확인
			$('.searchBtn').click();  // .searchBtn 클릭 이벤트 발동
		}
	});

	//지하철역 검색 ajax 보내기 해당하는 단어포함되는 지하철역명 리스트 뽑기
	document.querySelector('.searchBtn').addEventListener('click', function() {

		$zoom = 1;
		positionX = 0;
		positionY = 0;
		// 이동 적용
		
		// 커서 깜빡임을 비활성화하기 위해 포커스 제거
	   document.getElementById('departure').blur();  // departure 입력 필드에서 포커스 제거
	   document.getElementById('destination').blur();  // destination 입력 필드에서 포커스 제거

		let departure = document.getElementById('departure').value;
		let destination = document.getElementById('destination').value;

		if(departure == '서울'){
			departure = '서울역';
		}
		if(destination == '서울'){
			destination = '서울역';
		}
		
		$.ajax({
			url : 'metro/direction',
			method : 'GET',
			data : {departure, destination},
			success : function(data) {
				$('#directionBox').empty(); // 기존 결과를 지움
				$('#directionDataBox').empty(); // 기존 결과를 지움
				$('#arrivalBox').empty(); // 기존 결과를 지움
				
				let pathList = data.direction.pathList;
				let direction = null;
				if (pathList.length == 1) {
				    direction = 
				        '<span class="S' + pathList[0].routeNm + '역">' + pathList[0].fname + '(' + pathList[0].routeNm + ')</span>' +
				        '<span class="L' + pathList[0].routeNm + '라인"></span>' +
				        '<span class="S' + pathList[0].routeNm + '역">' + pathList[0].tname + '</span>';
				    
				    $('#directionBox').append(direction);
				} else {
				    direction = 
				        '<span class="S' + pathList[0].routeNm + '역">' + pathList[0].fname + '(' + pathList[0].routeNm + ')</span>' +
				        '<span class="L' + pathList[0].routeNm + '라인"></span>';
				    
				    pathList.forEach((path, index) => {
				        if (index > 0) {  // 첫 번째 역은 이미 추가했으므로
				            direction +=
				                '<span class="S' + path.routeNm + '역">' + path.fname + '(' + path.routeNm + ')</span>' +
				                '<span class="L' + path.routeNm + '라인"></span>' ;
				        }
						if (index === pathList.length - 1) {
							direction +=	
				                '<span class="S' + path.routeNm + '역">' + path.tname + '</span>';
						}
				    });

				    $('#directionBox').append(direction);
					
				}
					
				let directionData =
					'<span class="directionDataTime">소요시간 : '+data.direction.time+'분</span>'+
					'<span class="directionDataDistance">노선길이 : 약 '+(data.direction.distance/1000)+'km</span>';
				
				directionData +='<span class="stationList">상세안내 : ';	
				data.goMap.forEach((list, index) => {
					if (index === data.goMap.length - 1) {
					    // 마지막 항목은 '-'를 추가하지 않음
					    directionData += list;
					} else {
					    directionData += list + ' - ';
					}
					});
				directionData += '</span>'	
											
				$('#directionDataBox').append(directionData);
				
				let arrivalData =
					'<p class="topic"><'+pathList[0].fname+' 실시간 열차 안내></p>'
					+'이번열차 : <span class="before1">'+data.next[0].trainLineNm +' / '+data.next[0].arvlMsg2+'</span></br>'
					+'다음열차 : <span class="before2">'+data.next[1].trainLineNm +' / '+data.next[1].arvlMsg2+'</span>';
					
				$('#arrivalBox').append(arrivalData);
				
				
				// mapImage 요소 찾기
				let mapImage = document.querySelector('.mapImage');
						mapImage.style.transform = 'scale(' + 1 + ') translateX(' + 0 + 'px) translateY(' + 0 + 'px)';
				if (mapImage) {
					console.log("mapImage found:", mapImage);

					// object 태그 내의 SVG 문서 접근
					let svgDoc = mapImage.contentDocument;
					if (svgDoc) {
						console.log("SVG document loaded successfully");

						// <text> 요소들 찾기
						const textElements = svgDoc.querySelectorAll('text');
						console.log("Text elements found:", textElements);

						// 출발지와 도착지에 해당하는 역 찾기 및 하이라이트 적용
						textElements.forEach(text => {

							// 기존 스타일을 제거 (색상, 두껍게, 크기 등)
							text.setAttribute('style', '');
							text.textContent = text.textContent.replace('(출발)', '');
							text.textContent = text.textContent.replace('(도착)', '');
							text.setAttribute('style', 'opacity: 0.2 !important;');
							const stationName = text.textContent.trim(); // 역 이름 가져오기



							if (stationName === data.goMap[0]) {
								text.setAttribute('style', '');
								text.textContent = stationName + "(출발)"; // (출발) 추가
								text.setAttribute('style', 'fill: red !important; font-size: 7px !important; font-weight: bold !important;');
							}
							// 도착지에 해당하면 색상 변경
							else if (stationName === data.goMap[data.goMap.length-1]) {
								text.setAttribute('style', '');
								text.textContent = stationName + "(도착)"; // (도착) 추가
								text.setAttribute('style', 'fill: blue !important; font-size: 7px !important; font-weight: bold !important;');
							}							// 경유지 스타일
						   else if (data.goMap.includes(stationName)) {
								text.setAttribute('style', '');
								text.setAttribute('style', 'fill: black !important; font-size: 6px !important; font-weight: bold !important;');
						   }
						});
					} else {
						console.error("SVG document is not loaded.");
					}
				} else {
					console.error("mapImage not found.");
				}				
				},
			error: function(xhr, status, error) {
				console.error('에러 발생:', error); // 에러 처리
				$('#directionBox').empty(); // 기존 결과를 지움
				direction = '경로를 찾을 수 없습니다.'
				$('#directionBox').append(direction);
				$('#directionDataBox').empty(); // 기존 결과를 지움
			}
		});
		
		
		
		
		
		
		

	});




















































});