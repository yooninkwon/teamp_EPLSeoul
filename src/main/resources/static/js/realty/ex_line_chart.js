/**
 * 
 */

/**
 * 
 */
$(document).ready(function() {
	const chartDiv = $('#chart1');
	
	const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
	
	const labels = ['2011', '2012', '2013', '2014',
		'2015', '2016', '2017', '2018',
		'2019', '2020', '2021', '2022',
		'2023', '2024'];
		
	chart1();

	function chart1() {
	    new Chart(chartDiv, {
	        type: 'line',
	        data: {
	            labels: labels,
	            datasets: [
					{
		                label: '강남구',
		                data: [
							10, 20, 1, 50, 12, 
							10, 20, 1, 50, 12, 
							10, 20, 1, 50, 12, 
							10, 20, 1, 50, 12, 
							10, 20, 1, 50, 12						
						],
		                backgroundColor: 'rgba(231, 76, 60, 0.2)', // 투명도 추가
		                borderColor: 'rgb(231, 76, 60)',
		                borderWidth: 2,
		                tension: 0.4, // 선의 곡률 조정 (0이면 직선)
		                spanGaps: true, // 누락된 데이터가 있어도 선 연결
		                fill: false // 배경색 비활성화
		            },
					{
						label: '동작구',
		                data: [
							14, 25, 11, 10, 52, 
							11, 10, 15, 54, 32, 
							11, 40, 15, 51, 22, 
							14, 20, 16, 51, 42, 
							11, 21, 16, 53, 12						
						],
		                backgroundColor: 'yellow', // 투명도 추가
		                borderColor: 'yellow',
		                borderWidth: 2,
		                tension: 0.4, // 선의 곡률 조정 (0이면 직선)
		                spanGaps: true, // 누락된 데이터가 있어도 선 연결
		                fill: false // 배경색 비활성화
					}
				]
	        },
	        options: options
	    });
	}
});