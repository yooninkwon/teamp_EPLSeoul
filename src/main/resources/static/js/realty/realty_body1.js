/**
 * 
 */

function chart(buyingStat) {
		
	console.log(buyingStat);
	
	let chart_buying = $('#chart-buying');
		
	let chartBuild_buying = new Chart(chart_buying, {
		type: 'bar',
		data: {
			labels: ['2011', '2012', '2013', '2014', 
				'2015', '2016', '2017', '2018', 
				'2019', '2020', '2021', '2022', 
				'2023', '2024'],
			datasets: [
				{
					label: '아파트 매매가 평균',
					data: [
						buyingStat[2].avg_thing_amt * 10000, 
						buyingStat[6].avg_thing_amt * 10000, 
						buyingStat[10].avg_thing_amt * 10000, 
						buyingStat[14].avg_thing_amt * 10000, 
						buyingStat[18].avg_thing_amt * 10000, 
						buyingStat[22].avg_thing_amt * 10000, 
						buyingStat[26].avg_thing_amt * 10000, 
						buyingStat[30].avg_thing_amt * 10000, 
						buyingStat[34].avg_thing_amt * 10000, 
						buyingStat[38].avg_thing_amt * 10000, 
						buyingStat[42].avg_thing_amt * 10000, 
						buyingStat[46].avg_thing_amt * 10000, 
						buyingStat[50].avg_thing_amt * 10000, 
						buyingStat[54].avg_thing_amt * 10000
					],
					backgroundColor: '#005197',
					borderColor: 'white',
					borderWidth: 2,
					maxBarThickness: 30
				},
				{
					label: '단독다가구 매매가 평균',
					data: [
						buyingStat[3].avg_thing_amt * 10000, 
						buyingStat[7].avg_thing_amt * 10000, 
						buyingStat[11].avg_thing_amt * 10000, 
						buyingStat[15].avg_thing_amt * 10000, 
						buyingStat[19].avg_thing_amt * 10000, 
						buyingStat[23].avg_thing_amt * 10000, 
						buyingStat[27].avg_thing_amt * 10000, 
						buyingStat[31].avg_thing_amt * 10000, 
						buyingStat[35].avg_thing_amt * 10000, 
						buyingStat[39].avg_thing_amt * 10000, 
						buyingStat[43].avg_thing_amt * 10000, 
						buyingStat[47].avg_thing_amt * 10000, 
						buyingStat[51].avg_thing_amt * 10000, 
						buyingStat[55].avg_thing_amt * 10000
					],
					backgroundColor: '#970000',
					borderColor: 'white',
					borderWidth: 2,
					maxBarThickness: 30
				},
				{
					label: '연립다세대 매매가 평균',
					data: [
						buyingStat[1].avg_thing_amt * 10000, 
						buyingStat[5].avg_thing_amt * 10000, 
						buyingStat[9].avg_thing_amt * 10000, 
						buyingStat[13].avg_thing_amt * 10000, 
						buyingStat[17].avg_thing_amt * 10000, 
						buyingStat[21].avg_thing_amt * 10000, 
						buyingStat[25].avg_thing_amt * 10000, 
						buyingStat[29].avg_thing_amt * 10000, 
						buyingStat[33].avg_thing_amt * 10000, 
						buyingStat[37].avg_thing_amt * 10000, 
						buyingStat[41].avg_thing_amt * 10000, 
						buyingStat[45].avg_thing_amt * 10000, 
						buyingStat[49].avg_thing_amt * 10000, 
						buyingStat[53].avg_thing_amt * 10000
					],
					backgroundColor: '#E0CE06',
					borderColor: 'white',
					borderWidth: 2,
					maxBarThickness: 30
				},
				{
					label: '오피스텔 매매가 평균',
					data: [
						buyingStat[0].avg_thing_amt * 10000, 
						buyingStat[4].avg_thing_amt * 10000, 
						buyingStat[8].avg_thing_amt * 10000, 
						buyingStat[12].avg_thing_amt * 10000, 
						buyingStat[16].avg_thing_amt * 10000, 
						buyingStat[20].avg_thing_amt * 10000, 
						buyingStat[24].avg_thing_amt * 10000, 
						buyingStat[28].avg_thing_amt * 10000, 
						buyingStat[32].avg_thing_amt * 10000, 
						buyingStat[36].avg_thing_amt * 10000, 
						buyingStat[40].avg_thing_amt * 10000, 
						buyingStat[44].avg_thing_amt * 10000, 
						buyingStat[48].avg_thing_amt * 10000, 
						buyingStat[52].avg_thing_amt * 10000
					],
					backgroundColor: '#00C900',
					borderColor: 'white',
					borderWidth: 2,
					maxBarThickness: 30
				}
			]
		}
		
	});

}