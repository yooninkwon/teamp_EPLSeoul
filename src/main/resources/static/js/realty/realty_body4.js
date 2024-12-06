/**
 * 
 */

$(document).ready(function() {
	const gu_up_down_buying_apt = $('#gu-up-down-buying-apt');
	const gu_up_down_rent_grfe_apt = $('#gu-up-down-rent-grfe-apt');
	const gu_up_down_rent_rtfe_apt = $('#gu-up-down-rent-rtfe-apt');
	const gu_up_down_jeonse_apt = $('#gu-up-down-jeonse-apt');

	const gu_up_down_buying_single = $('#gu-up-down-buying-single');
	const gu_up_down_rent_grfe_single = $('#gu-up-down-rent-grfe-single');
	const gu_up_down_rent_rtfe_single = $('#gu-up-down-rent-rtfe-single');
	const gu_up_down_jeonse_single = $('#gu-up-down-jeonse-single');

	const gu_up_down_buying_multi = $('#gu-up-down-buying-multi');
	const gu_up_down_rent_grfe_multi = $('#gu-up-down-rent-grfe-multi');
	const gu_up_down_rent_rtfe_multi = $('#gu-up-down-rent-rtfe-multi');
	const gu_up_down_jeonse_multi = $('#gu-up-down-jeonse-multi');

	const gu_up_down_buying_office = $('#gu-up-down-buying-office');
	const gu_up_down_rent_grfe_office = $('#gu-up-down-rent-grfe-office');
	const gu_up_down_rent_rtfe_office = $('#gu-up-down-rent-rtfe-office');
	const gu_up_down_jeonse_office = $('#gu-up-down-jeonse-office');

	const div_rent_grfe = $('#rent-grfe-container');
	const div_rent_rtfe = $('#rent-rtfe-container');

	const div_apt_buying = $('#buying-apt-container');
	const div_apt_rent_grfe = $('#rent-grfe-apt-container');
	const div_apt_rent_rtfe = $('#rent-rtfe-apt-container');
	const div_apt_jeonse = $('#jeonse-apt-container');

	const div_single_buying = $('#buying-single-container');
	const div_single_rent_grfe = $('#rent-grfe-single-container');
	const div_single_rent_rtfe = $('#rent-rtfe-single-container');
	const div_single_jeonse = $('#jeonse-single-container');

	const div_multi_buying = $('#buying-multi-container');
	const div_multi_rent_grfe = $('#rent-grfe-multi-container');
	const div_multi_rent_rtfe = $('#rent-rtfe-multi-container');
	const div_multi_jeonse = $('#jeonse-multi-container');

	const div_office_buying = $('#buying-office-container');
	const div_office_rent_grfe = $('#rent-grfe-office-container');
	const div_office_rent_rtfe = $('#rent-rtfe-office-container');
	const div_office_jeonse = $('#jeonse-office-container');


	const charts = [];

	let sliceAptBuyingData = [];
	let sliceSingleBuyingData = [];
	let sliceMultiBuyingData = [];
	let sliceOfficeBuyingData = [];

	let sliceAptRentData = [];
	let sliceSingleRentData = [];
	let sliceMultiRentData = [];
	let sliceOfficeRentData = [];

	let sliceAptJeonseData = [];
	let sliceSingleJeonseData = [];
	let sliceMultiJeonseData = [];
	let sliceOfficeJeonseData = [];

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

	const labels = [
		'2011', '2012', '2013', '2014',
		'2015', '2016', '2017', '2018',
		'2019', '2020', '2021', '2022',
		'2023', '2024'];

	const guNames = [
		'강남구', '강동구', '강북구', '강서구', '관악구',
		'광진구', '구로구', '금천구', '노원구', '도봉구',
		'동대문구', '동작구', '마포구', '서대문구', '서초구',
		'성동구', '성북구', '송파구', '양천구', '영등포구',
		'용산구', '은평구', '종로구', '중구', '중랑구'
	];

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


	loadData();
	function loadData() {
		fetch('/epl/years-gu-data', {
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
				guUpDownChart(data);
			})
			.catch(error => {
				console.error(error);
			});
	}


	function getDataArray(originalData, type) {
		const data = [];
		if (type === 'buying') {
			for (let i = 0; i < 14; i++) {
				data.push(originalData[i].avg_thing_amt * 10000);
			}
		} else if (type === 'rent-grfe') {
			for (let i = 0; i < 14; i++) {
				data.push(originalData[i].avg_grfe * 10000);
			}
		} else if (type === 'rent-rtfe') {
			for (let i = 0; i < 14; i++) {
				data.push(originalData[i].avg_rtfe * 10000);
			}
		} else {
			for (let i = 0; i < 14; i++) {
				data.push(originalData[i].avg_grfe * 10000);
			}
		}
		return data;
	}

	function guUpDownChart(data) {

		charts.forEach(chart => {
			chart.destroy();
		});

		const sliceArray = (data) => {
			let result = [];

			for (let i = 0; i < data.length; i += 14) {
				result.push(data.slice(i, i + 14));
			}
			return result;
		}

		sliceAptBuyingData = sliceArray(data.buying_apt);
		sliceSingleBuyingData = sliceArray(data.buying_single);
		sliceMultiBuyingData = sliceArray(data.buying_multi);
		sliceOfficeBuyingData = sliceArray(data.buying_office);

		sliceAptRentData = sliceArray(data.rent_apt);
		sliceSingleRentData = sliceArray(data.rent_single);
		sliceMultiRentData = sliceArray(data.rent_multi);
		sliceOfficeRentData = sliceArray(data.rent_office);

		sliceAptJeonseData = sliceArray(data.jeonse_apt);
		sliceSingleJeonseData = sliceArray(data.jeonse_single);
		sliceMultiJeonseData = sliceArray(data.jeonse_multi);
		sliceOfficeJeonseData = sliceArray(data.jeonse_office);

		function createDatasets(dataArray, type) {
			return guNames.map((name, index) => ({
				label: name,
				data: getDataArray(dataArray[index], type),
				backgroundColor: backgroundColors[index],
				borderColor: backgroundColors[index],
				borderWidth: 2,
				tension: 0.4,
				spanGaps: true,
				fill: false
			}));
		}

		function createChart(context, data, type) {
			return new Chart(context, {
				type: 'line',
				data: {
					labels: labels,
					datasets: createDatasets(data, type)
				},
				options: options
			});
		}

		// // // // //
		let buying_apt_chart = createChart(gu_up_down_buying_apt, sliceAptBuyingData, 'buying');

		let rent_grfe_apt_chart = createChart(gu_up_down_rent_grfe_apt, sliceAptRentData, 'rent-grfe');

		let rent_rtfe_apt_chart = createChart(gu_up_down_rent_rtfe_apt, sliceAptRentData, 'rent-rtfe');

		let jeonse_apt_chart = createChart(gu_up_down_jeonse_apt, sliceAptJeonseData, 'jeonse');

		// // // // //		
		let buying_single_chart = createChart(gu_up_down_buying_single, sliceSingleBuyingData, 'buying');

		let rent_grfe_single_chart = createChart(gu_up_down_rent_grfe_single, sliceSingleRentData, 'rent-grfe');

		let rent_rtfe_single_chart = createChart(gu_up_down_rent_rtfe_single, sliceSingleRentData, 'rent-rtfe');

		let jeonse_single_chart = createChart(gu_up_down_jeonse_single, sliceSingleJeonseData, 'jeonse');

		// // // // //
		let buying_multi_chart = createChart(gu_up_down_buying_multi, sliceMultiBuyingData, 'buying');

		let rent_grfe_multi_chart = createChart(gu_up_down_rent_grfe_multi, sliceMultiRentData, 'rent-grfe');

		let rent_rtfe_multi_chart = createChart(gu_up_down_rent_rtfe_multi, sliceMultiRentData, 'rent-rtfe');

		let jeonse_multi_chart = createChart(gu_up_down_jeonse_multi, sliceMultiJeonseData, 'jeonses');

		// // // // //
		let buying_office_chart = createChart(gu_up_down_buying_office, sliceOfficeBuyingData, 'buying');

		let rent_grfe_office_chart = createChart(gu_up_down_rent_grfe_office, sliceOfficeRentData, 'rent-grfe');

		let rent_rtfe_office_chart = createChart(gu_up_down_rent_rtfe_office, sliceOfficeRentData, 'rent-rtfe');

		let jeonse_office_chart = createChart(gu_up_down_jeonse_office, sliceOfficeJeonseData, 'jeonse');

		charts.push(buying_apt_chart);
		charts.push(rent_grfe_apt_chart);
		charts.push(rent_rtfe_apt_chart);
		charts.push(jeonse_apt_chart);
		charts.push(buying_single_chart);
		charts.push(rent_grfe_single_chart);
		charts.push(rent_rtfe_single_chart);
		charts.push(jeonse_single_chart);
		charts.push(buying_multi_chart);
		charts.push(rent_grfe_multi_chart);
		charts.push(rent_rtfe_multi_chart);
		charts.push(jeonse_multi_chart);
		charts.push(buying_office_chart);
		charts.push(rent_grfe_office_chart);
		charts.push(rent_rtfe_office_chart);
		charts.push(jeonse_office_chart);
	}


	$('input[name="bldg-usg"]').on('change', function() {
		checked = $('input[name="bldg-usg"]:checked').val();
		$('#all-chart-container').children().children('.on').removeClass().addClass('off');
		$('#all-chart-container').children().children().children('.on').removeClass().addClass('off');
		$('input[name="rent-se"]:input[value="rent-grfe-container"]').prop('checked', true);
		if (checked === 'apt') {
			div_rent_grfe.removeClass().addClass('on');
			div_apt_buying.removeClass().addClass('on');
			div_apt_rent_grfe.removeClass().addClass('on');
			div_apt_rent_rtfe.removeClass().addClass('on');
			div_apt_jeonse.removeClass().addClass('on');
		} else if (checked === 'single') {
			div_rent_grfe.removeClass().addClass('on');
			div_single_buying.removeClass().addClass('on');
			div_single_rent_grfe.removeClass().addClass('on');
			div_single_rent_rtfe.removeClass().addClass('on');
			div_single_jeonse.removeClass().addClass('on');
		} else if (checked === 'multi') {
			div_rent_grfe.removeClass().addClass('on');
			div_multi_buying.removeClass().addClass('on');
			div_multi_rent_grfe.removeClass().addClass('on');
			div_multi_rent_rtfe.removeClass().addClass('on');
			div_multi_jeonse.removeClass().addClass('on');
		} else if(checked === 'office') {
			div_rent_grfe.removeClass().addClass('on');
			div_office_buying.removeClass().addClass('on');
			div_office_rent_grfe.removeClass().addClass('on');
			div_office_rent_rtfe.removeClass().addClass('on');
			div_office_jeonse.removeClass().addClass('on');
		}

	});

	$('input[name="living-se"]').on('change', function() {
		checked = $('input[name="living-se"]:checked').val();
		$('#all-chart-container').children('.on').removeClass().addClass('off');

		$(`#${checked}`).removeClass().addClass('on');
	});

	$('input[name="rent-se"]').on('change', function() {

		div_rent_grfe.toggleClass('on off');
		div_rent_rtfe.toggleClass('on off');
		
	});


});