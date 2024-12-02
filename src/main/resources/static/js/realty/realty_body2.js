/**
 * 
 */

$('input[name="avg"]').on('change', function() {
	let checked = $('input[name="avg"]:checked').val();
	if(checked === 'grfe') {
		$('#grfe-chart').removeClass().addClass('on');
		$('#rtfe-chart').removeClass().addClass('off');
	} else {
		$('#grfe-chart').removeClass().addClass('off');
		$('#rtfe-chart').removeClass().addClass('on');		
	}
});

function chart(rentStat) {
	
	// buyingStat / rentStat / jeonseStat
	console.log(rentStat);
	
	let chart_rent_grfe = $('#chart-rent-grfe');
	let chart_rent_rtfe = $('#chart-rent-rtfe');
		
	let chartBuild_rent = new Chart(chart_rent_grfe, {
			type: 'bar',
			data: {
				labels: ['2011', '2012', '2013', '2014', 
					'2015', '2016', '2017', '2018', 
					'2019', '2020', '2021', '2022', 
					'2023', '2024'],
				datasets: [
					{
						label: '아파트 월세 보증금 평균',
						data: [
							rentStat[2].avg_grfe * 10000, 
							rentStat[6].avg_grfe * 10000, 
							rentStat[10].avg_grfe * 10000, 
							rentStat[14].avg_grfe * 10000, 
							rentStat[18].avg_grfe * 10000, 
							rentStat[22].avg_grfe * 10000, 
							rentStat[26].avg_grfe * 10000, 
							rentStat[30].avg_grfe * 10000, 
							rentStat[34].avg_grfe * 10000, 
							rentStat[38].avg_grfe * 10000, 
							rentStat[42].avg_grfe * 10000, 
							rentStat[46].avg_grfe * 10000, 
							rentStat[50].avg_grfe * 10000, 
							rentStat[54].avg_grfe * 10000
						],
						backgroundColor: '#005197',
						borderColor: 'white',
						borderWidth: 2,
						maxBarThickness: 30
					},					
					{
						label: '단독다가구 월세 보증금 평균',
						data: [
							rentStat[3].avg_grfe * 10000, 
							rentStat[7].avg_grfe * 10000, 
							rentStat[11].avg_grfe * 10000, 
							rentStat[15].avg_grfe * 10000, 
							rentStat[19].avg_grfe * 10000, 
							rentStat[23].avg_grfe * 10000, 
							rentStat[27].avg_grfe * 10000, 
							rentStat[31].avg_grfe * 10000, 
							rentStat[35].avg_grfe * 10000, 
							rentStat[39].avg_grfe * 10000, 
							rentStat[43].avg_grfe * 10000, 
							rentStat[47].avg_grfe * 10000, 
							rentStat[51].avg_grfe * 10000, 
							rentStat[55].avg_grfe * 10000
						],
						backgroundColor: '#970000',
						borderColor: 'white',
						borderWidth: 2,
						maxBarThickness: 30
					},
					{
						label: '연립다세대 월세 보증금 평균',
						data: [
							rentStat[1].avg_grfe * 10000, 
							rentStat[5].avg_grfe * 10000, 
							rentStat[9].avg_grfe * 10000, 
							rentStat[13].avg_grfe * 10000, 
							rentStat[17].avg_grfe * 10000, 
							rentStat[21].avg_grfe * 10000, 
							rentStat[25].avg_grfe * 10000, 
							rentStat[29].avg_grfe * 10000, 
							rentStat[33].avg_grfe * 10000, 
							rentStat[37].avg_grfe * 10000, 
							rentStat[41].avg_grfe * 10000, 
							rentStat[45].avg_grfe * 10000, 
							rentStat[49].avg_grfe * 10000, 
							rentStat[53].avg_grfe * 10000
						],
						backgroundColor: '#E0CE06',
						borderColor: 'white',
						borderWidth: 2,
						maxBarThickness: 30
					},
					{
						label: '오피스텔 보증금 평균',
						data: [
							rentStat[0].avg_grfe * 10000, 
							rentStat[4].avg_grfe * 10000, 
							rentStat[8].avg_grfe * 10000, 
							rentStat[12].avg_grfe * 10000, 
							rentStat[16].avg_grfe * 10000, 
							rentStat[20].avg_grfe * 10000, 
							rentStat[24].avg_grfe * 10000, 
							rentStat[28].avg_grfe * 10000, 
							rentStat[32].avg_grfe * 10000, 
							rentStat[36].avg_grfe * 10000, 
							rentStat[40].avg_grfe * 10000, 
							rentStat[44].avg_grfe * 10000, 
							rentStat[48].avg_grfe * 10000, 
							rentStat[52].avg_grfe * 10000
						],
						backgroundColor: '#00C900',
						borderColor: 'white',
						borderWidth: 2,
						maxBarThickness: 30
					}
				]
			}
			
		});
		
		let chartBuild_jeonse = new Chart(chart_rent_rtfe, {
				type: 'bar',
				data: {
					labels: ['2011', '2012', '2013', '2014', 
						'2015', '2016', '2017', '2018', 
						'2019', '2020', '2021', '2022', 
						'2023', '2024'],
					datasets: [
						{
							label: '아파트 월세 평균',
							data: [
								rentStat[2].avg_rtfe * 10000, 
								rentStat[6].avg_rtfe * 10000, 
								rentStat[10].avg_rtfe * 10000, 
								rentStat[14].avg_rtfe * 10000, 
								rentStat[18].avg_rtfe * 10000, 
								rentStat[22].avg_rtfe * 10000, 
								rentStat[26].avg_rtfe * 10000, 
								rentStat[30].avg_rtfe * 10000, 
								rentStat[34].avg_rtfe * 10000, 
								rentStat[38].avg_rtfe * 10000, 
								rentStat[42].avg_rtfe * 10000, 
								rentStat[46].avg_rtfe * 10000, 
								rentStat[50].avg_rtfe * 10000, 
								rentStat[54].avg_rtfe * 10000
							],
							backgroundColor: '#005197',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '단독다가구 월세 평균',
							data: [
								rentStat[3].avg_rtfe * 10000, 
								rentStat[7].avg_rtfe * 10000, 
								rentStat[11].avg_rtfe * 10000, 
								rentStat[15].avg_rtfe * 10000, 
								rentStat[19].avg_rtfe * 10000, 
								rentStat[23].avg_rtfe * 10000, 
								rentStat[27].avg_rtfe * 10000, 
								rentStat[31].avg_rtfe * 10000, 
								rentStat[35].avg_rtfe * 10000, 
								rentStat[39].avg_rtfe * 10000, 
								rentStat[43].avg_rtfe * 10000, 
								rentStat[47].avg_rtfe * 10000, 
								rentStat[51].avg_rtfe * 10000, 
								rentStat[55].avg_rtfe * 10000
							],
							backgroundColor: '#970000',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '연립다세대 월세 평균',
							data: [
								rentStat[1].avg_rtfe * 10000, 
								rentStat[5].avg_rtfe * 10000, 
								rentStat[9].avg_rtfe * 10000, 
								rentStat[13].avg_rtfe * 10000, 
								rentStat[17].avg_rtfe * 10000, 
								rentStat[21].avg_rtfe * 10000, 
								rentStat[25].avg_rtfe * 10000, 
								rentStat[29].avg_rtfe * 10000, 
								rentStat[33].avg_rtfe * 10000, 
								rentStat[37].avg_rtfe * 10000, 
								rentStat[41].avg_rtfe * 10000, 
								rentStat[45].avg_rtfe * 10000, 
								rentStat[49].avg_rtfe * 10000, 
								rentStat[53].avg_rtfe * 10000
							],
							backgroundColor: '#E0CE06',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '오피스텔 월세 평균',
							data: [
								rentStat[0].avg_rtfe * 10000, 
								rentStat[4].avg_rtfe * 10000, 
								rentStat[8].avg_rtfe * 10000, 
								rentStat[12].avg_rtfe * 10000, 
								rentStat[16].avg_rtfe * 10000, 
								rentStat[20].avg_rtfe * 10000, 
								rentStat[24].avg_rtfe * 10000, 
								rentStat[28].avg_rtfe * 10000, 
								rentStat[32].avg_rtfe * 10000, 
								rentStat[36].avg_rtfe * 10000, 
								rentStat[40].avg_rtfe * 10000, 
								rentStat[44].avg_rtfe * 10000, 
								rentStat[48].avg_rtfe * 10000, 
								rentStat[52].avg_rtfe * 10000
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