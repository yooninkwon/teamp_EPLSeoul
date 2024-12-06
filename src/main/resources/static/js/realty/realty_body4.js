/**
 * 
 */

$(document).ready(function() {
	
	const gu_up_down = $('#gu-up-down');
	
	let type = 'buying'
	
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
	
	loadData(type);
	
	function loadData(type) {
		fetch('/epl/years-gu-data?type=' + type, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if(!response.ok) {
				throw new Error(`HTTP error. status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			guUpDownChart(data);
		})
		.catch(error => {
			console.error(error);
		});
	}
	
	function guUpDownChart(data) {
		
	    new Chart(gu_up_down, {
	        type: 'line',
	        data: {
	            labels: labels,
	            datasets: [
					{
		                label: '강남구',
		                data: [],
		                backgroundColor: 'rgba(231, 76, 60, 0.2)', // 투명도 추가
		                borderColor: 'rgb(231, 76, 60)',
		                borderWidth: 2,
		                tension: 0.4, // 선의 곡률 조정 (0이면 직선)
		                spanGaps: true, // 누락된 데이터가 있어도 선 연결
		                fill: false // 배경색 비활성화
		            },
					{
						label: '동작구',
		                data: [],
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
	
	
	$('input[name="living-se"]').on('change', function() {
		checked = $('input[name="living-se"]:checked').val();
		
		
		$('#all-chart-container').children('.on').removeClass().addClass('off');
		
		
		
		
		loadData(type);
	});
	
	
});