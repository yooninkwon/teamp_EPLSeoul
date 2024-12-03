/**
 * 
 */
$(document).ready(function() {
	
	let type = 'apt';
	let chartType = 'avg';
	let typeLabel = '아파트';
	
	let charts = [];
	
	let buying_container = $('#buying-container');
	let rent_rtfe_container = $('#rent-rtfe-container');
	let rent_grfe_container = $('#rent-grfe-container');
	let jeonse_container = $('#jeonse-container');
	
	let chart_gu_buying_avg = $('#chart-gu-buying-avg');
	let chart_gu_buying_max = $('#chart-gu-buying-max');
	let chart_gu_buying_min = $('#chart-gu-buying-min');
	
	let chart_gu_rent_rtfe_avg = $('#chart-gu-rent-rtfe-avg');
	let chart_gu_rent_rtfe_max = $('#chart-gu-rent-rtfe-max');
	let chart_gu_rent_rtfe_min = $('#chart-gu-rent-rtfe-min');
	
	let chart_gu_rent_grfe_avg = $('#chart-gu-rent-grfe-avg');
	let chart_gu_rent_grfe_max = $('#chart-gu-rent-grfe-max');
	let chart_gu_rent_grfe_min = $('#chart-gu-rent-grfe-min');
	
	let chart_gu_jeonse_avg = $('#chart-gu-jeonse-avg');
	let chart_gu_jeonse_max = $('#chart-gu-jeonse-max');
	let chart_gu_jeonse_min = $('#chart-gu-jeonse-min');
	
	let buy_avg_div = $('#buy-avg-div');
	let buy_max_div = $('#buy-max-div');
	let buy_min_div = $('#buy-min-div');

	let rent_rtfe_avg_div = $('#rent-rtfe-avg-div');
	let rent_rtfe_max_div = $('#rent-rtfe-max-div');
	let rent_rtfe_min_div = $('#rent-rtfe-min-div');
		
	let rent_grfe_avg_div = $('#rent-grfe-avg-div');
	let rent_grfe_max_div = $('#rent-grfe-max-div');
	let rent_grfe_min_div = $('#rent-grfe-min-div');
		
	let jeonse_avg_div = $('#jeonse-avg-div');
	let jeonse_max_div = $('#jeonse-max-div');
	let jeonse_min_div = $('#jeonse-min-div');

	let beforeLiveSeChecked = buying_container;
	
	loadData(type);
	
	$('input[name="chart-type"]').on('change', function() {
		chartType = $('input[name="chart-type"]:checked').val();
		changeChartTypeDiv(chartType);
	});
	
	$('input[name="avg"]').on('change', function() {
		type = $('input[name="avg"]:checked').val();
		if (type === 'apt') {
			typeLabel = '아파트';
		} else if(type === 'single') {
			typeLabel = '단독다가구';			
		} else if(type === 'multi') {
			typeLabel = '연립다세대';			
		} else {
			typeLabel = '오피스텔';			
		}
		loadData(type);
	});

	$('input[name="living-se"]').on('change', function() {
		let linvingSe = $('input[name="living-se"]:checked').val();
		changeLiveSeDivClass(linvingSe);
	});
	
	function changeChartTypeDiv(chartType) {
		
		buying_container.children('.on').removeClass().addClass('off');
		rent_rtfe_container.children('.on').removeClass().addClass('off');
		rent_grfe_container.children('.on').removeClass().addClass('off');
		jeonse_container.children('.on').removeClass().addClass('off');

		if(chartType === 'avg') {
			buy_avg_div.removeClass().addClass('on');
			rent_rtfe_avg_div.removeClass().addClass('on');
			rent_grfe_avg_div.removeClass().addClass('on');
			jeonse_avg_div.removeClass().addClass('on');
		} else if(chartType === 'max') {
			buy_max_div.removeClass().addClass('on');
			rent_rtfe_max_div.removeClass().addClass('on');
			rent_grfe_max_div.removeClass().addClass('on');
			jeonse_max_div.removeClass().addClass('on');
		} else {
			buy_min_div.removeClass().addClass('on');
			rent_rtfe_min_div.removeClass().addClass('on');
			rent_grfe_min_div.removeClass().addClass('on');
			jeonse_min_div.removeClass().addClass('on');
		} 
	}
	
	function changeLiveSeDivClass(linvingSe) {
		
		beforeLiveSeChecked.removeClass().addClass('off');
		
		if(linvingSe === 'buying') {
			buying_container.removeClass().addClass('on');
			beforeLiveSeChecked = buying_container;
		} else if(linvingSe === 'rent-rtfe') {
			rent_rtfe_container.removeClass().addClass('on');
			beforeLiveSeChecked = rent_rtfe_container;
		} else if(linvingSe === 'rent-grfe') {
			rent_grfe_container.removeClass().addClass('on');
			beforeLiveSeChecked = rent_grfe_container;
		} else {
			jeonse_container.removeClass().addClass('on');	
			beforeLiveSeChecked = jeonse_container;
		}
	}
	
	function loadData(type) {
		fetch('/epl/gu-data?type=' + type, {
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
			chart(data);
		})
		.catch(error => {
			console.error(error);
		});
		
	}

	function chart(data) {

		charts.forEach(chart => {
			chart.destroy();
		});
		
		const labels = ['강남구', '강동구', '강북구', '강서구', '관악구',
			'광진구', '구로구', '금천구', '노원구', '도봉구',
			'동대문구', '동작구', '마포구', '서대문구', '서초구',
			'성동구', '성북구', '송파구', '양천구', '영등포구',
			'용산구', '은평구', '종로구', '중구', '중랑구'];

		const backgroundColors = [
			'rgb(255, 100, 132)', 'rgb(54, 162, 123)', 'rgb(99, 206, 86)', 'rgb(75, 192, 77)',
			'rgb(153, 102, 44)', 'rgb(255, 15, 64)', 'rgb(255, 10, 132)', 'rgb(54, 99, 235)',
			'rgb(125, 206, 86)', 'rgb(75, 20, 192)', 'rgb(35, 102, 255)', 'rgb(113, 159, 64)',
			'rgb(75, 98, 192)', 'rgb(153, 35, 255)', 'rgb(255, 99, 255)', 'rgb(54, 162, 98)',
			'rgb(255, 206, 186)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)',
			'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(77, 192, 192)', 'rgb(153, 88, 255)',
		];

		const createDataset = (label, data) => ({
			label,
			data: data.map(d => d * 10000),
			backgroundColor: backgroundColors,
			borderColor: 'white',
			borderWidth: 2,
			maxBarThickness: 10
		});

		
		let chartBuild_gu_buying_avg = new Chart(chart_gu_buying_avg, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 매매 평균가', data.guAvgBuying.map(item => item.avg_thing_amt))
				]
			}
		});
				
		let chartBuild_gu_buying_max = new Chart(chart_gu_buying_max, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 매매 최고가', data.guAvgBuying.map(item => item.max_thing_amt))
				]
			}
		});
		let chartBuild_gu_buying_min = new Chart(chart_gu_buying_min, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 매매 최저가', data.guAvgBuying.map(item => item.min_thing_amt))
				]
			}
		});
		
		charts.push(chartBuild_gu_buying_avg);
		charts.push(chartBuild_gu_buying_max);
		charts.push(chartBuild_gu_buying_min);
		
		// // // // //
		
		let chartBuild_guRent_rtfe_avg = new Chart(chart_gu_rent_rtfe_avg, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 평균가', data.guAvgRent.map(item => item.avg_rtfe))
				]
			}
		});
		
		let chartBuild_guRent_rtfe_max = new Chart(chart_gu_rent_rtfe_max, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 최고가', data.guAvgRent.map(item => item.max_rtfe))
				]
			}
		});
		
		let chartBuild_guRent_rtfe_min = new Chart(chart_gu_rent_rtfe_min, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 최저가', data.guAvgRent.map(item => item.min_rtfe))
				]
			}
		});

		charts.push(chartBuild_guRent_rtfe_avg);
		charts.push(chartBuild_guRent_rtfe_max);
		charts.push(chartBuild_guRent_rtfe_min);

		// // // // // //
		
		let chartBuild_guRent_grfe_avg = new Chart(chart_gu_rent_grfe_avg, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 보증금 평균가', data.guAvgRent.map(item => item.avg_grfe))
				]
			}
		});
		
		let chartBuild_guRent_grfe_max = new Chart(chart_gu_rent_grfe_max, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 보증금 최고가', data.guAvgRent.map(item => item.max_grfe))
				]
			}
		});
		
		let chartBuild_guRent_grfe_min = new Chart(chart_gu_rent_grfe_min, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 월세 보증금 최저가', data.guAvgRent.map(item => item.min_grfe))
				]
			}
		});

		charts.push(chartBuild_guRent_grfe_avg);
		charts.push(chartBuild_guRent_grfe_max);
		charts.push(chartBuild_guRent_grfe_min);

		// // // // // //
		
		let chartBuild_guJeonse_avg = new Chart(chart_gu_jeonse_avg, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 전세 보증금 평균가', data.guAvgJeonse.map(item => item.avg_grfe))
				]
			}
		});
		
		let chartBuild_guJeonse_max = new Chart(chart_gu_jeonse_max, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 전세 보증금 최고가', data.guAvgJeonse.map(item => item.max_grfe))
				]
			}
		});
		
		let chartBuild_guJeonse_min = new Chart(chart_gu_jeonse_min, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset(typeLabel + ' 전세 보증금 최저가', data.guAvgJeonse.map(item => item.min_grfe))
				]
			}
		});

		charts.push(chartBuild_guJeonse_avg);
		charts.push(chartBuild_guJeonse_max);
		charts.push(chartBuild_guJeonse_min);
		
	}

	function pageScroll(y) {
		window.scrollTo({
			top: y,
			behavior: 'smooth'
		});
	}
});