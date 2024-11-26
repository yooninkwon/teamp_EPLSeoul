$(document).ready(function() {
	
	//지하철역 검색 ajax 보내기 해당하는 단어포함되는 지하철역명 리스트 뽑기
	document.querySelector('.searchBtn').addEventListener('click', function(){
		const searchValue = document.querySelector('.searchInput').value;
		
		if(searchValue != ""){
			
			$.ajax({
				url:'metro/searchStationName',
				method: 'GET',
				data:{
					searchValue
				},
				success: function(data){
					console.log(data)
				},
				error: function (xhr, status, error) {
				        console.error('에러 발생:', error); // 에러 처리
				}
			})
			
		}
		
		
	});
	
	
	
});