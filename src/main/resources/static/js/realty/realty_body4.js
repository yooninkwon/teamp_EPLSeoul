/**
 * 
 */
$(document).ready(function() {
	
	let type = 'apt';
	
	loadData(type);
	
	$('input[name="avg"]').on('change', function() {
		type = $('input[name="avg"]:checked').val();
		loadData(type);
	})
	
	function loadData(type) {
		
		fetch('/epl/gu-data?type=' + type, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if(!response.ok) {
				console.log('response is bad: ', response);
			} else {
				return response.json();
			}
		})
		.then(data => {
			console.log(data);
//			console.log(data.guAvgBuyingApt[0].cgg_nm);
			chart(data);
		})
		.catch(error => {
			console.error(error);
		});
		
	}
	
	
//	chart(guAvgBuyingApt, guAvgRentApt, guAvgJeonseApt);

	$('input[name="avg"]').on('change', function() {
		let checked = $('input[name="avg"]:checked').val();
		if (checked === 'grfe') {
			$('#grfe-chart').removeClass().addClass('on');
			$('#rtfe-chart').removeClass().addClass('off');
		} else {
			$('#grfe-chart').removeClass().addClass('off');
			$('#rtfe-chart').removeClass().addClass('on');
		}
	});

	function chart(data) {
		console.log('type: ', type)
		console.log(data.guAvgBuying);
		console.log(data.guAvgRent);
		console.log(data.guAvgJeonse);

		let chart_gu_buying = $('#chart-gu-buying');
		let chart_gu_rent_rtfe = $('#chart-gu-rent-rtfe');
		let chart_gu_rent_grfe = $('#chart-gu-rent-grfe');
		let chart_gu_jeonse = $('#chart-gu-jeonse');

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

		
		let chartBuild_guBuying = new Chart(chart_gu_buying, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset('구별 아파트 매매 평균가 (2020-2024)', data.guAvgBuying.map(item => item.avg_thing_amt)),
					createDataset('구별 아파트 매매 최대가 (2020-2024)', data.guAvgBuying.map(item => item.max_thing_amt)),
					createDataset('구별 아파트 매매 최저가 (2020-2024)', data.guAvgBuying.map(item => item.min_thing_amt))
				]
			}
		});

		// // // // //


		let chartBuild_guRent_rtfe = new Chart(chart_gu_rent_rtfe, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset('구별 아파트 월세 평균가 (2020-2024)', data.guAvgRent.map(item => item.avg_rtfe)),
					createDataset('구별 아파트 월세 최대가 (2020-2024)', data.guAvgRent.map(item => item.max_rtfe)),
					createDataset('구별 아파트 월세 최저가 (2020-2024)', data.guAvgRent.map(item => item.min_rtfe))
				]
			}
		});

		let chartBuild_guRent = new Chart(chart_gu_rent_grfe, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset('구별 아파트 월세 보증금 평균가 (2020-2024)', data.guAvgRent.map(item => item.avg_grfe)),
					createDataset('구별 아파트 월세 보증금 최대가 (2020-2024)', data.guAvgRent.map(item => item.max_grfe)),
					createDataset('구별 아파트 월세 보증금 최저가 (2020-2024)', data.guAvgRent.map(item => item.min_grfe))
				]
			}
		});

		// // // // // //

		let chartBuild_guJeonse = new Chart(chart_gu_jeonse, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					createDataset('구별 아파트 전세 보증금 평균가 (2020-2024)', data.guAvgJeonse.map(item => item.avg_grfe)),
					createDataset('구별 아파트 전세 보증금 최대가 (2020-2024)', data.guAvgJeonse.map(item => item.max_grfe)),
					createDataset('구별 아파트 전세 보증금 최저가 (2020-2024)', data.guAvgJeonse.map(item => item.min_grfe))
				]
			}
		});



	}


});