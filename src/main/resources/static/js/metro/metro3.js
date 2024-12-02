$(document).ready(function() {

	// 엔터 키가 눌렸을 때
	$(document).on('keypress', function(e) {
		if (e.key === 'Enter') {  // Enter 키 확인
			$('.searchBtn').click();  // .searchBtn 클릭 이벤트 발동
		}
	});

	document.querySelector('.searchBtn').addEventListener('click', function(){
		
		let dateValue = document.getElementById('startDate').value;
		let searchValue = document.querySelector('.searchInput').value;
		if(dateValue == '' || searchValue == ''){
			alert("날짜 및 검색어를 입력해주세요");
			return;
		}
	
		$.ajax({
			url : 'metro/lostFound',
			mthod : 'GET',
			data:{
				dateValue, searchValue
			},
			success : function(data){
				
			},error: function(xhr, status, error) {
				console.error('에러 발생:', error); // 에러 처리
			}
		})

	});
	


});