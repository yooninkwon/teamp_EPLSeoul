$(document).ready(function() {

	// 엔터 키가 눌렸을 때
	$(document).on('keypress', function(e) {
		if (e.key === 'Enter') {  // Enter 키 확인
			$('.searchBtn').click();  // .searchBtn 클릭 이벤트 발동
		}
	});

	document.querySelector('.searchBtn').addEventListener('click', function() {
		$('.resultNameBox').empty(); // 기존 결과를 지움
		let dateValue = document.getElementById('startDate').value;
		let searchValue = document.querySelector('.searchInput').value;
		if (dateValue == '' || searchValue == '') {
			alert("날짜 및 검색어를 입력해주세요");
			return;
		}

		$.ajax({
			url: 'metro/searchStationName',
			mthod: 'GET',
			data: {
				searchValue
			},
			success: function(data) {
				data.forEach(function(rs) {
					let name = '<span class="stationName" '
						+ ' data-name=' + rs.BLDN_NM
						+ ' data-route=' + rs.ROUTE
						+ '>'
						+ rs.BLDN_NM
						+ '(' + rs.ROUTE + ')'
						+ '</span>';
					$('.resultNameBox').append(name);
					});
				}, error: function(xhr, status, error) {
					console.error('에러 발생:', error); // 에러 처리
				}
		})

	});
	
	
	$(document).on('click', '.stationName', function() {
		
		$('#resultStation').empty(); // 기존 결과를 지움
		$('#dayTopic').empty(); // 기존 결과를 지움
		$('#resultDayData').empty(); // 기존 결과를 지움
		$('#monthTopic').empty(); // 기존 결과를 지움
		$('#resultMonthData').empty(); // 기존 결과를 지움
		$('#congestionTopic').empty(); // 기존 결과를 지움
		$('#congestionData').empty(); // 기존 결과를 지움
		
		let station = $(this).text();  // 클릭한 역 이름 가져오기
		let stationName = $(this).data('name');  // 클릭한 역의 ID (필요한 경우)
		let stationRoute = $(this).data('route');  // 클릭한 역의 ID (필요한 경우)
		let dateValue = document.getElementById('startDate').value;
		if (dateValue == '') {
			alert("날짜를 입력해주세요");
			return;
		}
		
		//클릭한 역명 표기
		$('#resultStation').text(station);
		
		$.ajax({
			url : 'metro/stationPassData',
			method : 'GET',
			data:{
				stationName, stationRoute, dateValue
			},
			success: function(data){
				let dayTopic = 
				'<p class="topic"><일일 승하차 인원 정보></p>';
				$('#dayTopic').append(dayTopic);
				
				let day =
					'<table>'
							+'<thead>'
								+'<tr>'
									+'<th>날짜</th>'
									+'<th>호선명</th>'
									+'<th>역명</th>'
									+'<th>승차총승객수</th>'
									+'<th>하차총승객수</th>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								+'<tr>'
									+'<td>'+(data.day[0] && data.day[0].USE_YMD ? data.day[0].USE_YMD : '' )+'</td>'
									+'<td>'+stationRoute+'</td>'
									+'<td>'+stationName+'</td>'
									+'<td>'+(data.day[0] && data.day[0].GTON_TNOPE ? data.day[0].GTON_TNOPE.toLocaleString() : '' )+'</td>'
									+'<td>'+(data.day[0] && data.day[0].GTOFF_TNOPE ? data.day[0].GTOFF_TNOPE.toLocaleString() : '' )+'</td>'
								+'</tr>'
							+'</tbody>'
					 +'</table>';					
					 $('#resultDayData').append(day);
					 
					 dayGraph(data.day[0] && data.day[0].GTON_TNOPE ? data.day[0].GTON_TNOPE : 0 ,
						 data.day[0] && data.day[0].GTOFF_TNOPE ? data.day[0].GTOFF_TNOPE : 0 );
				
				let monthTopic =
				'<p class="topic"><월·시간대별 승하차 인원 정보></p>';					 
				$('#monthTopic').append(monthTopic);
				
				let month = 
				'<table>'
						+'<thead>'
							+'<tr>'
								+'<th>'+(data.month[0] && data.month[0].USE_MM ? data.month[0].USE_MM : '' )+'</th>'
								+'<th>4~5</th>'
								+'<th>5~6</th>'
								+'<th>6~7</th>'
								+'<th>7~8</th>'
								+'<th>8~9</th>'
								+'<th>9~10</th>'
								+'<th>10~11</th>'
								+'<th>11~12</th>'
								+'<th>12~13</th>'
								+'<th>13~14</th>'
								+'<th>14~15</th>'
								+'<th>15~16</th>'
								+'<th>16~17</th>'
								+'<th>17~18</th>'
								+'<th>18~19</th>'
								+'<th>19~20</th>'
								+'<th>20~21</th>'
								+'<th>21~22</th>'
								+'<th>22~23</th>'
								+'<th>23~24</th>'
								+'<th>24~1</th>'
								+'<th>1~2</th>'
								+'<th>2~3</th>'
								+'<th>3~4</th>'
							+'</tr>'
						+'</thead>'
						+'<tbody>'
							+'<tr>'
								+'<td>승차</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_4_GET_ON_NOPE ? data.month[0].HR_4_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_5_GET_ON_NOPE ? data.month[0].HR_5_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_6_GET_ON_NOPE ? data.month[0].HR_6_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_7_GET_ON_NOPE ? data.month[0].HR_7_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_8_GET_ON_NOPE ? data.month[0].HR_8_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_9_GET_ON_NOPE ? data.month[0].HR_9_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_10_GET_ON_NOPE ? data.month[0].HR_10_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_11_GET_ON_NOPE ? data.month[0].HR_11_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_12_GET_ON_NOPE ? data.month[0].HR_12_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_13_GET_ON_NOPE ? data.month[0].HR_13_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_14_GET_ON_NOPE ? data.month[0].HR_14_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_15_GET_ON_NOPE ? data.month[0].HR_15_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_16_GET_ON_NOPE ? data.month[0].HR_16_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_17_GET_ON_NOPE ? data.month[0].HR_17_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_18_GET_ON_NOPE ? data.month[0].HR_18_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_19_GET_ON_NOPE ? data.month[0].HR_19_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_20_GET_ON_NOPE ? data.month[0].HR_20_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_21_GET_ON_NOPE ? data.month[0].HR_21_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_22_GET_ON_NOPE ? data.month[0].HR_22_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_23_GET_ON_NOPE ? data.month[0].HR_23_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_0_GET_ON_NOPE ? data.month[0].HR_0_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_1_GET_ON_NOPE ? data.month[0].HR_1_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_2_GET_ON_NOPE ? data.month[0].HR_2_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_3_GET_ON_NOPE ? data.month[0].HR_3_GET_ON_NOPE.toLocaleString() : 0 )+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>하차</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_4_GET_OFF_NOPE ? data.month[0].HR_4_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_5_GET_OFF_NOPE ? data.month[0].HR_5_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_6_GET_OFF_NOPE ? data.month[0].HR_6_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_7_GET_OFF_NOPE ? data.month[0].HR_7_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_8_GET_OFF_NOPE ? data.month[0].HR_8_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_9_GET_OFF_NOPE ? data.month[0].HR_9_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_10_GET_OFF_NOPE ? data.month[0].HR_10_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_11_GET_OFF_NOPE ? data.month[0].HR_11_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_12_GET_OFF_NOPE ? data.month[0].HR_12_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_13_GET_OFF_NOPE ? data.month[0].HR_13_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_14_GET_OFF_NOPE ? data.month[0].HR_14_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_15_GET_OFF_NOPE ? data.month[0].HR_15_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_16_GET_OFF_NOPE ? data.month[0].HR_16_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_17_GET_OFF_NOPE ? data.month[0].HR_17_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_18_GET_OFF_NOPE ? data.month[0].HR_18_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_19_GET_OFF_NOPE ? data.month[0].HR_19_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_20_GET_OFF_NOPE ? data.month[0].HR_20_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_21_GET_OFF_NOPE ? data.month[0].HR_21_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_22_GET_OFF_NOPE ? data.month[0].HR_22_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_23_GET_OFF_NOPE ? data.month[0].HR_23_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_0_GET_OFF_NOPE ? data.month[0].HR_0_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_1_GET_OFF_NOPE ? data.month[0].HR_1_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_2_GET_OFF_NOPE ? data.month[0].HR_2_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
								+'<td>'+(data.month[0] && data.month[0].HR_3_GET_OFF_NOPE ? data.month[0].HR_3_GET_OFF_NOPE.toLocaleString() : 0 )+'</td>'
							+'</tr>'
						+'</tbody>'
				 +'</table>';	
				 $('#resultMonthData').append(month);
				 
				 
				 // 승차와 하차 데이터를 추출하여 배열로 변환
				 // 승차와 하차 데이터를 추출하여 배열로 변환
				 const getOnData = [
				     data.month[0].HR_4_GET_ON_NOPE,
				     data.month[0].HR_5_GET_ON_NOPE,
				     data.month[0].HR_6_GET_ON_NOPE,
				     data.month[0].HR_7_GET_ON_NOPE,
				     data.month[0].HR_8_GET_ON_NOPE,
				     data.month[0].HR_9_GET_ON_NOPE,
				     data.month[0].HR_10_GET_ON_NOPE,
				     data.month[0].HR_11_GET_ON_NOPE,
				     data.month[0].HR_12_GET_ON_NOPE,
				     data.month[0].HR_13_GET_ON_NOPE,
				     data.month[0].HR_14_GET_ON_NOPE,
				     data.month[0].HR_15_GET_ON_NOPE,
				     data.month[0].HR_16_GET_ON_NOPE,
				     data.month[0].HR_17_GET_ON_NOPE,
				     data.month[0].HR_18_GET_ON_NOPE,
				     data.month[0].HR_19_GET_ON_NOPE,
				     data.month[0].HR_20_GET_ON_NOPE,
				     data.month[0].HR_21_GET_ON_NOPE,
				     data.month[0].HR_22_GET_ON_NOPE,
				     data.month[0].HR_23_GET_ON_NOPE,
				     data.month[0].HR_0_GET_ON_NOPE,
				     data.month[0].HR_1_GET_ON_NOPE,
				     data.month[0].HR_2_GET_ON_NOPE,
				     data.month[0].HR_3_GET_ON_NOPE
				 ];

				 const getOffData = [
				     data.month[0].HR_4_GET_OFF_NOPE,
				     data.month[0].HR_5_GET_OFF_NOPE,
				     data.month[0].HR_6_GET_OFF_NOPE,
				     data.month[0].HR_7_GET_OFF_NOPE,
				     data.month[0].HR_8_GET_OFF_NOPE,
				     data.month[0].HR_9_GET_OFF_NOPE,
				     data.month[0].HR_10_GET_OFF_NOPE,
				     data.month[0].HR_11_GET_OFF_NOPE,
				     data.month[0].HR_12_GET_OFF_NOPE,
				     data.month[0].HR_13_GET_OFF_NOPE,
				     data.month[0].HR_14_GET_OFF_NOPE,
				     data.month[0].HR_15_GET_OFF_NOPE,
				     data.month[0].HR_16_GET_OFF_NOPE,
				     data.month[0].HR_17_GET_OFF_NOPE,
				     data.month[0].HR_18_GET_OFF_NOPE,
				     data.month[0].HR_19_GET_OFF_NOPE,
				     data.month[0].HR_20_GET_OFF_NOPE,
				     data.month[0].HR_21_GET_OFF_NOPE,
				     data.month[0].HR_22_GET_OFF_NOPE,
				     data.month[0].HR_23_GET_OFF_NOPE,
				     data.month[0].HR_0_GET_OFF_NOPE,
				     data.month[0].HR_1_GET_OFF_NOPE,
				     data.month[0].HR_2_GET_OFF_NOPE,
				     data.month[0].HR_3_GET_OFF_NOPE
				 ];

				 monthGraph(getOnData,getOffData);
					 
				let congestionTopic =
	 				'<p class="topic"><전년도 시간대별 혼잡도></p>';					 
 				$('#congestionTopic').append(congestionTopic);
				 
				let congestionData =
				'<table>'
					+'<thead>'
						+'<tr>'
							+'<th>요일</th>'
							+'<th>구분</th>'
							+'<th>05:30</th>'
							+'<th>06:00</th>'
							+'<th>06:30</th>'
							+'<th>07:00</th>'
							+'<th>07:30</th>'
							+'<th>08:00</th>'
							+'<th>08:30</th>'
							+'<th>09:00</th>'
							+'<th>09:30</th>'
							+'<th>10:00</th>'
							+'<th>10:30</th>'
							+'<th>11:00</th>'
							+'<th>11:30</th>'
							+'<th>12:00</th>'
							+'<th>12:30</th>'
							+'<th>13:00</th>'
							+'<th>13:30</th>'
							+'<th>14:00</th>'
							+'<th>14:30</th>'
							+'<th>15:00</th>'
							+'<th>15:30</th>'
							+'<th>16:00</th>'
							+'<th>16:30</th>'
							+'<th>17:00</th>'
							+'<th>17:30</th>'
							+'<th>18:00</th>'
							+'<th>18:30</th>'
							+'<th>19:00</th>'
							+'<th>19:30</th>'
							+'<th>20:00</th>'
							+'<th>20:30</th>'
							+'<th>21:00</th>'
							+'<th>21:30</th>'
							+'<th>22:00</th>'
							+'<th>22:30</th>'
							+'<th>23:00</th>'
							+'<th>23:30</th>'
							+'<th>00:00</th>'
							+'<th>00:30</th>'
						+'</tr>'
					+'</thead>'
					+'<tbody>';
					// 데이터 순회
					data.congestion.forEach(item => {
					    let row = '<tr>';
						row += '<td>' + item.date + '</td>';
						row += '<td>' + item.upDown + '</td>';
						row += '<td>' + (item.h5 ? item.h5 : 0) + '</td>';
						row += '<td>' + (item.f6 ? item.f6 : 0) + '</td>';
						row += '<td>' + (item.h6 ? item.h6 : 0) + '</td>';
						row += '<td>' + (item.f7 ? item.f7 : 0) + '</td>';
						row += '<td>' + (item.h7 ? item.h7 : 0) + '</td>';
						row += '<td>' + (item.f8 ? item.f8 : 0) + '</td>';
						row += '<td>' + (item.h8 ? item.h8 : 0) + '</td>';
						row += '<td>' + (item.f9 ? item.f9 : 0) + '</td>';
						row += '<td>' + (item.h9 ? item.h9 : 0) + '</td>';
						row += '<td>' + (item.f10 ? item.f10 : 0) + '</td>';
						row += '<td>' + (item.h10 ? item.h10 : 0) + '</td>';
						row += '<td>' + (item.f11 ? item.f11 : 0) + '</td>';
						row += '<td>' + (item.h11 ? item.h11 : 0) + '</td>';
						row += '<td>' + (item.f12 ? item.f12 : 0) + '</td>';
						row += '<td>' + (item.h12 ? item.h12 : 0) + '</td>';
						row += '<td>' + (item.f13 ? item.f13 : 0) + '</td>';
						row += '<td>' + (item.h13 ? item.h13 : 0) + '</td>';
						row += '<td>' + (item.f14 ? item.f14 : 0) + '</td>';
						row += '<td>' + (item.h14 ? item.h14 : 0) + '</td>';
						row += '<td>' + (item.f15 ? item.f15 : 0) + '</td>';
						row += '<td>' + (item.h15 ? item.h15 : 0) + '</td>';
						row += '<td>' + (item.f16 ? item.f16 : 0) + '</td>';
						row += '<td>' + (item.h16 ? item.h16 : 0) + '</td>';
						row += '<td>' + (item.f17 ? item.f17 : 0) + '</td>';
						row += '<td>' + (item.h17 ? item.h17 : 0) + '</td>';
						row += '<td>' + (item.f18 ? item.f18 : 0) + '</td>';
						row += '<td>' + (item.h18 ? item.h18 : 0) + '</td>';
						row += '<td>' + (item.f19 ? item.f19 : 0) + '</td>';
						row += '<td>' + (item.h19 ? item.h19 : 0) + '</td>';
						row += '<td>' + (item.f20 ? item.f20 : 0) + '</td>';
						row += '<td>' + (item.h20 ? item.h20 : 0) + '</td>';
						row += '<td>' + (item.f21 ? item.f21 : 0) + '</td>';
						row += '<td>' + (item.h21 ? item.h21 : 0) + '</td>';
						row += '<td>' + (item.f22 ? item.f22 : 0) + '</td>';
						row += '<td>' + (item.h22 ? item.h22 : 0) + '</td>';
						row += '<td>' + (item.f23 ? item.f23 : 0) + '</td>';
						row += '<td>' + (item.h23 ? item.h23 : 0) + '</td>';
						row += '<td>' + (item.f00 ? item.f00 : 0) + '</td>';
						row += '<td>' + (item.h00 ? item.h00 : 0) + '</td>';
						row += '</tr>';
						congestionData += row;
					});
					
					// 테이블 완성
					congestionData += '</tbody></table>';
					
						
			 $('#congestionData').append(congestionData);
						 
			 
			 
			 
			 
			 
						 
			}, error : function(xhr, status, error) {
				console.error('에러 발생:', error); // 에러 처리
			}
			
		})
		
	});
	
	Chart.register(ChartDataLabels);
	// totalChart 변수를 전역으로 선언
	let dayChart = null;
	function dayGraph(passIn, passOut) {
	    // 기존 차트가 있다면 제거
	    if (dayChart) {
	        dayChart.destroy();
	    }

	    // 차트의 컨텍스트
	    const dayChartBox = document.getElementById('dayChart').getContext('2d');

	    // 새로운 차트 생성
	    dayChart= new Chart(dayChartBox, {
	        type: 'pie',  // 파이 차트
	        data: {
	            labels: ['승차', '하차'],  // 레이블
	            datasets: [{
	                data: [passIn, passOut],  // 데이터 값
	                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],  // 색상
	                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],  // 테두리 색상
	                borderWidth: 1
	            }]
	        },
	        options: {
	            responsive: true,  // 화면 크기에 맞게 반응
	            maintainAspectRatio: false,  // 비율 유지 안 함
	            plugins: {
	                legend: { display: true },  // 범례 표시
	                datalabels: {
	                    display: true,  // 데이터 레이블 표시
	                    color: 'black',  // 레이블 색상
	                    font: { size: 12 },  // 폰트 크기
	                    anchor: 'center',  // 레이블 위치
	                    align: 'center',  // 레이블 정렬
	                    formatter: (value) => {
	                        return value.toLocaleString();  // 천 단위 구분 쉼표 추가
	                    }
	                }
	            }
	        }
	    });
	}
	
	let monthChart = null;
	function monthGraph(getOnData, getOffData) {
		    // 기존 차트가 있다면 제거
		    if (monthChart) {
		        monthChart.destroy();
		    }

		    // 차트의 컨텍스트
		    const monthChartBox = document.getElementById('monthChart').getContext('2d');

	       monthChart = new Chart(monthChartBox, {
	            type: 'line',
	            data: {
                labels: ['4시', '5시', '6시', '7시', '8시', '9시', '10시', '11시', '12시', '13시', 
					     '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', 
					     '23시', '0시', '1시', '2시', '3시'],
	                datasets: [
	                    {
	                        label: '승차',
	                        data: getOnData,
	                        borderColor: 'rgb(75, 192, 192)',
	                        fill: false
	                    },
	                    {
	                        label: '하차',
	                        data: getOffData,
	                        borderColor: 'rgb(255, 99, 132)',
	                        fill: false
	                    }
	                ]
	            },
	            options: {
	                responsive: true,
	                scales: {
	                    x: {
	                        title: {
	                            display: true,
	                            text: '시간'
	                        }
	                    },
	                    y: {
	                        title: {
	                            display: true,
	                            text: '인원수'
	                        },
	                        beginAtZero: true
	                    }
	                }
	            }
	        });
		}



});