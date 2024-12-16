/**
 * 
 */
$(document).ready(function() {

	const juminChartSeoul = $('#jumin-chart-seoul')
	const juminChartGu = $('#jumin-chart-gu')
	
	const input_chart_type = $('input[name="chart-type"]');
	const gu_chart_type = $('#gu-chart-container');
	const seoul_chart_type = $('#seoul-chart-container');
	
	const labels = [
		'2007', '2008', '2009', '2010',
		'2011', '2012', '2013', '2014',
		'2015', '2016', '2017', '2018',
		'2019', '2020', '2021', '2022',
		'2023'];

	const seoul = [
		'서울시'
	];

	const guNames = [
		'강남구', '강동구', '강북구', '강서구', '관악구',
		'광진구', '구로구', '금천구', '노원구', '도봉구',
		'동대문구', '동작구', '마포구', '서대문구', '서초구',
		'성동구', '성북구', '송파구', '양천구', '영등포구',
		'용산구', '은평구', '종로구', '중구', '중랑구'
	];

	const dataArray = [];

	const backgroundColors = [
		'rgb(231, 76, 60)',   // 부드러운 빨강
		'rgb(52, 152, 219)',  // 차분한 파랑
		'rgb(241, 196, 15)',  // 따뜻한 노랑
		'rgb(26, 188, 156)',  // 세련된 청록색
		'rgb(142, 68, 173)',  // 은은한 보라
		'rgb(230, 126, 34)',  // 부드러운 주황
		'rgb(149, 165, 166)', // 차분한 연회색
		'rgb(46, 204, 113)',  // 싱그러운 녹색
		'rgb(22, 160, 133)',  // 깊은 에메랄드
		'rgb(155, 89, 182)',  // 따뜻한 라일락
		'rgb(241, 148, 138)', // 밝은 로즈
		'rgb(52, 73, 94)',    // 어두운 회색
		'rgb(135, 211, 124)', // 밝은 잔디색
		'rgb(243, 156, 18)',  // 톤 다운된 호박색
		'rgb(108, 122, 137)', // 고급스러운 스틸 블루
		'rgb(244, 208, 63)',  // 따뜻한 레몬색
		'rgb(93, 173, 226)',  // 시원한 하늘색
		'rgb(214, 137, 16)',  // 부드러운 황토색
		'rgb(133, 193, 233)', // 밝은 아이스 블루
		'rgb(205, 97, 85)',   // 은은한 산호색
		'rgb(52, 201, 36)',   // 생동감 있는 초록색
		'rgb(202, 207, 280)', // 차분한 실버
		'rgb(125, 60, 152)',  // 깊은 퍼플
		'rgb(255, 178, 102)', // 따뜻한 밀크티 색
		'rgb(89, 98, 117)'    // 톤 다운된 다크 블루
	];

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

	loadData();

	function loadData() {
		fetch('/epl/jumin-data', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error. status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				spliceData(data);
			})
			.catch(error => {
				console.error(error)
			});
	}

	function spliceData(data) {
		for (let i = 0; i < 26; i++) {
			dataArray.push(data.splice(0, 17));
		}
		createChartSeoul(juminChartSeoul, dataArray);
		createChartGu(juminChartGu, dataArray);
	}

	function createChartSeoul(context, dataArray) {
		return new Chart(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: createDatasetsSeoul(dataArray)
			},
			options: options
		});
	}

	function createChartGu(context, dataArray) {
		return new Chart(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: createDatasetsGu(dataArray)
			},
			options: options
		});
	}

	function createDatasetsSeoul(dataArray) {
		return seoul.map((name, index) => ({
			label: name,
			data: getJuminData(dataArray[index]),
			backgroundColor: '#73A3FF',
			borderColor: '#735588',
			borderWidth: 2,
			tension: 0.4,
			spanGaps: true,
			fill: false
		}));
	}

	function createDatasetsGu(dataArray) {
		return guNames.map((name, index) => ({
			label: name,
			data: getJuminData(dataArray[index + 1]),
			backgroundColor: backgroundColors[index],
			borderColor: backgroundColors[index],
			borderWidth: 2,
			tension: 0.4,
			spanGaps: true,
			fill: false
		}));
	}

	function getJuminData(juminData) {
		const data = [];

		for (let i = 0; i < 17; i++) {
			data.push(juminData[i].jumin);
		}
		return data;
	}
	
	input_chart_type.on('change', function() {
		seoul_chart_type.toggleClass('on off');
		gu_chart_type.toggleClass('on off');	
	});

});