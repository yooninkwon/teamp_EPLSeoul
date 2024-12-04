$(document).ready(function() {

	Chart.register(ChartDataLabels);

	
	// 모든 <tr> 요소를 선택
    const rows = document.querySelectorAll('.crimeGraphData tr');
    
    // 각 <tr>에서 데이터를 추출
    const crimeData = Array.from(rows).map(row => {
        return {
            year: row.getAttribute('data-year'),
            scrime: parseInt(row.getAttribute('data-scrime'), 10),
            camera: parseInt(row.getAttribute('data-camera'), 10),
            
        };
    }).reverse();
	
	
	
	// 성추행 데이터 (scrime)
	const sCrime = crimeData.map(item => item.scrime);

	// 카메라 촬영 데이터 (camera)
	const cameraCrime = crimeData.map(item => item.camera);
	console.log(crimeData.length);  // crimeData 배열의 길이
		console.log(sCrime.length);     // 성추행 데이터 배열 길이
		console.log(cameraCrime.length); // 카메라 데이터 배열 길이
	
	// 차트의 컨텍스트
	const crimeChartBox = document.getElementById('crimeChart').getContext('2d');

	// 지하철 성범죄 차트
	new Chart(crimeChartBox, {
		type: 'line',
		data: {
			labels: crimeData.map(item => item.year), // 연도별 레이블,
			datasets: [
				{
					label: '성추행',
					data: sCrime,
					borderColor: 'rgb(75, 192, 192)',
					fill: false
				},
				{
					label: '카메라촬영',
					data: cameraCrime,
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
						text: '연도'
					}
				},
				y: {
					title: {
						display: true,
						text: '건수'
					},
					beginAtZero: true
				}
			}
		}
	});

	
	// 'accident-data' 클래스를 가진 tbody 안의 모든 tr 요소를 선택
	const rows2 = document.querySelectorAll('.accidentGraphData tr');

	// 각 <tr>에서 데이터를 추출
	const accidentData = Array.from(rows2).map(row => {
	    return {
	        year: row.getAttribute('data-year'),
	        others: parseInt(row.getAttribute('data-others'), 10),
	        slip: parseInt(row.getAttribute('data-slip'), 10),
	        elevator: parseInt(row.getAttribute('data-elevator'), 10),
	        station_accident: parseInt(row.getAttribute('data-station_accident'), 10),
	        train_accident: parseInt(row.getAttribute('data-train_accident'), 10),
	        door: parseInt(row.getAttribute('data-door'), 10)
	    };
	}).reverse();

	// 연도별 데이터
	const years = accidentData.map(item => item.year);

	// 각 항목별 데이터
	const othersData = accidentData.map(item => item.others);
	const slipData = accidentData.map(item => item.slip);
	const elevatorData = accidentData.map(item => item.elevator);
	const stationAccidentData = accidentData.map(item => item.station_accident);
	const trainAccidentData = accidentData.map(item => item.train_accident);
	const doorData = accidentData.map(item => item.door);

	// 차트의 컨텍스트
	const accidentChartBox = document.getElementById('accidentChart').getContext('2d');

	new Chart(accidentChartBox, {
	    type: 'bar', // bar 차트 설정
	    data: {
	        labels: years, // 연도별 레이블
	        datasets: [
	            {
	                label: '기타',
	                data: othersData,
	                backgroundColor: 'rgba(75, 192, 192, 0.5)', // 색상
	                borderColor: 'rgba(75, 192, 192, 1)',
	                borderWidth: 1
	            },
	            {
	                label: '발빠짐',
	                data: slipData,
	                backgroundColor: 'rgba(255, 99, 132, 0.5)',
	                borderColor: 'rgba(255, 99, 132, 1)',
	                borderWidth: 1
	            },
	            {
	                label: '승강설비관련',
	                data: elevatorData,
	                backgroundColor: 'rgba(54, 162, 235, 0.5)',
	                borderColor: 'rgba(54, 162, 235, 1)',
	                borderWidth: 1
	            },
	            {
	                label: '역내 사고',
	                data: stationAccidentData,
	                backgroundColor: 'rgba(153, 102, 255, 0.5)',
	                borderColor: 'rgba(153, 102, 255, 1)',
	                borderWidth: 1
	            },
	            {
	                label: '열차내 사고',
	                data: trainAccidentData,
	                backgroundColor: 'rgba(255, 159, 64, 0.5)',
	                borderColor: 'rgba(255, 159, 64, 1)',
	                borderWidth: 1
	            },
	            {
	                label: '출입문관련',
	                data: doorData,
	                backgroundColor: 'rgba(255, 206, 86, 0.5)',
	                borderColor: 'rgba(255, 206, 86, 1)',
	                borderWidth: 1
	            }
	        ]
	    },
	    options: {
	        responsive: true,
	        scales: {
	            x: {
	                title: {
	                    display: true,
	                    text: '연도'
	                }
	            },
	            y: {
	                title: {
	                    display: true,
	                    text: '사고 건수'
	                },
	                beginAtZero: true
	            }
	        }
	    }
	});

	
	
});