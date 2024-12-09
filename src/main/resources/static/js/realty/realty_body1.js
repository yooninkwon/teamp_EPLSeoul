/**
 * 
 */
$(document).ready(function() {

	const input_avg = $('input[name="avg"]');
	const input_seType = $('input[name="seType"]');

	const grfe_chart = $('#grfe-chart');
	const rtfe_chart = $('#rtfe-chart');
	
	const all_chart_div = $('#all-chart-div');

	loadData();

	function loadData() {
		fetch('/epl/years-data', {
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
				console.log(data);
				chart(data.buyingStat, data.rentStat, data.jeonseStat);
			})
			.catch(error => {
				console.error(error);
			});
	}

	function chart(buyingStat, rentStat, jeonseStat) {

		const chart_buying = $('#chart-buying');
		const chart_rent_grfe = $('#chart-rent-grfe');
		const chart_rent_rtfe = $('#chart-rent-rtfe');
		const chart_jeonse = $('#chart-jeonse');

		const datasetsBuyingInfo = [
			{ label: '아파트 매매가 평균', index: 2, color: '#005197' },
			{ label: '단독다가구 매매가 평균', index: 3, color: '#970000' },
			{ label: '연립다세대 매매가 평균', index: 1, color: '#E0CE06' },
			{ label: '오피스텔 매매가 평균', index: 0, color: '#00C900' }
		];

		const datasetInfoRentGrfe = [
			{ label: '아파트 월세 보증금 평균', index: 2, color: '#005197' },
			{ label: '단독다가구 월세 보증금 평균', index: 3, color: '#970000' },
			{ label: '연립다세대 월세 보증금 평균', index: 1, color: '#E0CE06' },
			{ label: '오피스텔 월세 보증금 평균', index: 0, color: '#00C900' }
		];

		const datasetInfoRentRtfe = [
			{ label: '아파트 월세 월납금 평균', index: 2, color: '#005197' },
			{ label: '단독다가구 월세 월납금 평균', index: 3, color: '#970000' },
			{ label: '연립다세대 월세 월납금 평균', index: 1, color: '#E0CE06' },
			{ label: '오피스텔 월세 월납금 평균', index: 0, color: '#00C900' }
		];

		const datasetsJeonseInfo = [
			{ label: '아파트 전세 보증금 평균', index: 2, color: '#005197' },
			{ label: '단독다가구 전세 보증금 평균', index: 3, color: '#970000' },
			{ label: '연립다세대 전세 보증금 평균', index: 1, color: '#E0CE06' },
			{ label: '오피스텔 전세 보증금 평균', index: 0, color: '#00C900' }
		];

		const labels = ['2011', '2012', '2013', '2014',
			'2015', '2016', '2017', '2018',
			'2019', '2020', '2021', '2022',
			'2023', '2024'];

		const datasetsBuying = datasetsBuyingInfo.map(info => {

			const data = [];

			for (let i = 0; i < 14; i++) {
				const statIndex = info.index + i * 4;
				data.push(buyingStat[statIndex].avg_thing_amt * 10000);
			}
			return {
				label: info.label,
				data: data,
				backgroundColor: info.color,
				borderColor: 'white',
				borderWidth: 2,
				maxBarThickness: 30
			};
		});

		const datasetsRentGrfe = datasetInfoRentGrfe.map(info => {
			const data = [];

			for (let i = 0; i < 14; i++) {
				const startIndex = info.index + i * 4;
				data.push(rentStat[startIndex].avg_grfe * 10000);
			}

			return {
				label: info.label,
				data: data,
				backgroundColor: info.color,
				borderColor: 'white',
				borderWidth: 2,
				maxBarThickness: 30
			};
		});

		const datasetsRentRtfe = datasetInfoRentRtfe.map(info => {
			const data = [];

			for (let i = 0; i < 14; i++) {
				const statIndex = info.index + i * 4;
				data.push(rentStat[statIndex].avg_rtfe * 10000);
			}

			return {
				label: info.label,
				data: data,
				backgroundColor: info.color,
				borderColor: 'white',
				borderWidth: 2,
				maxBarThickness: 30
			};
		});

		const datasetsJeonse = datasetsJeonseInfo.map(info => {

			const data = [];

			for (let i = 0; i < 14; i++) {
				const statIndex = info.index + i * 4;
				data.push(jeonseStat[statIndex].avg_grfe * 10000);
			}
			return {
				label: info.label,
				data: data,
				backgroundColor: info.color,
				borderColor: 'white',
				borderWidth: 2,
				maxBarThickness: 30
			};
		});

		new Chart(chart_buying, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasetsBuying
			}
		});

		new Chart(chart_rent_grfe, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasetsRentGrfe
			}

		});

		new Chart(chart_rent_rtfe, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasetsRentRtfe
			}

		});

		new Chart(chart_jeonse, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasetsJeonse
			}
		});
	}

	input_avg.on('change', function() {
		grfe_chart.toggleClass('on off');
		rtfe_chart.toggleClass('on off');
	});

	input_seType.on('change', function() {
		let checked = $('input[name="seType"]:checked').val();

		all_chart_div.children('.on').removeClass().addClass('off');
		$(`#${checked}`).removeClass().addClass('on');
	});


});