$(document).ready(function() {

	// 엔터 키가 눌렸을 때
	$(document).on('keypress', function(e) {
		if (e.key === 'Enter') {  // Enter 키 확인
			$('.searchBtn').click();  // .searchBtn 클릭 이벤트 발동
		}
	});

	document.querySelector('.searchBtn').addEventListener('click', function(){
		
		let stationValue = document.getElementById('station').value;
		let lostItemValue = document.getElementById('lostItem').value;
		if(stationValue == '' || lostItemValue == ''){
			alert("날짜 및 검색어를 입력해주세요");
			return;
		}
	
		$.ajax({
			url : 'metro/lostFound',
			method : 'GET',
			data:{
				stationValue, lostItemValue
			},
			success : function(data){
				
				$('#lostItemTopic').empty(); // 기존 결과를 지움
				$('#resultLostItemData').empty(); // 기존 결과를 지움
				
				let lostItemsTopic =
					'<p class="topic"><'+stationValue+'/'+lostItemValue+' 검색 결과></p>';
					
				$('#lostItemTopic').append(lostItemsTopic);
				
				lostItems =
				'<table>'
					+'<thead>'
						+'<tr>'
							+'<th>습득날짜</th>'
							+'<th>지하철역</th>'
							+'<th>분류</th>'
							+'<th>습득물</th>'
							+'<th>색상</th>'
							+'<th>내용</th>'
						+'</tr>'
					+'</thead>'
					+'<tbody>';
				data.forEach(item => {
				           lostItems += '<tr>'
				               + '<td>' + item.fdYmd + '</td>'    // 습득 날짜
				               + '<td>' + item.depPlace + '</td>'  // 지하철역
				               + '<td>' + item.prdtClNm + '</td>' // 분류
				               + '<td>' + item.fdPrdtNm + '</td>' // 습득물
				               + '<td>' + item.clrNm + '</td>'    // 색상
				               + '<td>' + item.fdSbjt + '</td>'   // 내용
				               + '</tr>';
				       });
			 	
				lostItems +=	
					'</tbody>'
			 +'</table>';
			 $('#resultLostItemData').append(lostItems);

				
				
				
				
			},error: function(xhr, status, error) {
				console.error('에러 발생:', error); // 에러 처리
			}
		})

	});
	


});