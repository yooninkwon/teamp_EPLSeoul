/**
 * 
 */

function chart(jeonseStat) {
	
	// buyingStat / rentStat / jeonseStat
	console.log(jeonseStat);
	
	let chart_jeonse = $('#chart-jeonse');
		
		let chartBuild_jeonse = new Chart(chart_jeonse, {
				type: 'bar',
				data: {
					labels: ['2011', '2012', '2013', '2014', 
						'2015', '2016', '2017', '2018', 
						'2019', '2020', '2021', '2022', 
						'2023', '2024'],
					datasets: [
						{
							label: '아파트 전세 보증금 평균',
							data: [
								jeonseStat[2].avg_grfe * 10000, 
								jeonseStat[6].avg_grfe * 10000, 
								jeonseStat[10].avg_grfe * 10000, 
								jeonseStat[14].avg_grfe * 10000, 
								jeonseStat[18].avg_grfe * 10000, 
								jeonseStat[22].avg_grfe * 10000, 
								jeonseStat[26].avg_grfe * 10000, 
								jeonseStat[30].avg_grfe * 10000, 
								jeonseStat[34].avg_grfe * 10000, 
								jeonseStat[38].avg_grfe * 10000, 
								jeonseStat[42].avg_grfe * 10000, 
								jeonseStat[46].avg_grfe * 10000, 
								jeonseStat[50].avg_grfe * 10000, 
								jeonseStat[54].avg_grfe * 10000
							],
							backgroundColor: '#005197',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '단독다가구 전세 보증금 평균',
							data: [
								jeonseStat[3].avg_grfe * 10000, 
								jeonseStat[7].avg_grfe * 10000, 
								jeonseStat[11].avg_grfe * 10000, 
								jeonseStat[15].avg_grfe * 10000, 
								jeonseStat[19].avg_grfe * 10000, 
								jeonseStat[23].avg_grfe * 10000, 
								jeonseStat[27].avg_grfe * 10000, 
								jeonseStat[31].avg_grfe * 10000, 
								jeonseStat[35].avg_grfe * 10000, 
								jeonseStat[39].avg_grfe * 10000, 
								jeonseStat[43].avg_grfe * 10000, 
								jeonseStat[47].avg_grfe * 10000, 
								jeonseStat[51].avg_grfe * 10000, 
								jeonseStat[55].avg_grfe * 10000
							],
							backgroundColor: '#970000',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '연립다세대 전세 보증금 평균',
							data: [
								jeonseStat[1].avg_grfe * 10000, 
								jeonseStat[5].avg_grfe * 10000, 
								jeonseStat[9].avg_grfe * 10000, 
								jeonseStat[13].avg_grfe * 10000, 
								jeonseStat[17].avg_grfe * 10000, 
								jeonseStat[21].avg_grfe * 10000, 
								jeonseStat[25].avg_grfe * 10000, 
								jeonseStat[29].avg_grfe * 10000, 
								jeonseStat[33].avg_grfe * 10000, 
								jeonseStat[37].avg_grfe * 10000, 
								jeonseStat[41].avg_grfe * 10000, 
								jeonseStat[45].avg_grfe * 10000, 
								jeonseStat[49].avg_grfe * 10000, 
								jeonseStat[53].avg_grfe * 10000
							],
							backgroundColor: '#E0CE06',
							borderColor: 'white',
							borderWidth: 2,
							maxBarThickness: 30
						},
						{
							label: '오피스텔 전세 보증금 평균',
							data: [
								jeonseStat[0].avg_grfe * 10000, 
								jeonseStat[4].avg_grfe * 10000, 
								jeonseStat[8].avg_grfe * 10000, 
								jeonseStat[12].avg_grfe * 10000, 
								jeonseStat[16].avg_grfe * 10000, 
								jeonseStat[20].avg_grfe * 10000, 
								jeonseStat[24].avg_grfe * 10000, 
								jeonseStat[28].avg_grfe * 10000, 
								jeonseStat[32].avg_grfe * 10000, 
								jeonseStat[36].avg_grfe * 10000, 
								jeonseStat[40].avg_grfe * 10000, 
								jeonseStat[44].avg_grfe * 10000, 
								jeonseStat[48].avg_grfe * 10000, 
								jeonseStat[52].avg_grfe * 10000
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