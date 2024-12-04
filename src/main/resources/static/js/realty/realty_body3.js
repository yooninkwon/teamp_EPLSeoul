/**
 * 
 */
$(document).ready(function() {
	
	const buyingRankMax = $('#buying-rank-max');
	const buyingRankMin = $('#buying-rank-min');
	
	const rentRankGrfeMax = $('#rent-rank-grfe-max');
	const rentRankGrfeMin = $('#rent-rank-grfe-min');
	
	const rentRankRtfeMax = $('#rent-rank-rtfe-max');
	const rentRankRtfeMin = $('#rent-rank-rtfe-min');

	const jeonseRankMax = $('#jeonse-rank-max');
	const jeonseRankMin = $('#jeonse-rank-min');
	
	const allTableDiv = $('#all-table-container');

		loadData();

	function loadData() {
		fetch('/epl/rank-data', {
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

			plateData(data);
		})
		.catch(error => {
			console.error(error);
		});
	}
	
	function plateData(data) {
		
		
		
		console.log(data);
		
		console.log('data.rank_buyMax: ', data.rank_buyMax)
		console.log('data.rank_buyMax[1].cgg_nm: ', data.rank_buyMax[1].cgg_nm)
		
		let buyMax = '';
		let buyMin = '';
		let rentGrfeMax = '';
		let rentGrfeMin = '';
		let rentRtfeMax = '';
		let rentRtfeMin = '';
		let jeonseMax = '';
		let jeonseMin = '';
		
		for(let i = 0; i < 3; i++) {
			buyMax += 
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_buyMax[i].cgg_nm}</td>
				<td>${data.rank_buyMax[i].stdg_nm}</td>
				<td>${data.rank_buyMax[i].bldg_usg}</td>
				<td>${data.rank_buyMax[i].avg_thing_amt * 10000 + '원'}</td></tr>`;
			buyMin +=
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_buyMin[i].cgg_nm}</td>
				<td>${data.rank_buyMin[i].stdg_nm}</td>
				<td>${data.rank_buyMin[i].bldg_usg}</td>
				<td>${data.rank_buyMin[i].avg_thing_amt * 10000 + '원'}</td></tr>`;
			rentGrfeMax +=
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_rentGrfeMax[i].cgg_nm}</td>
				<td>${data.rank_rentGrfeMax[i].stdg_nm}</td>
				<td>${data.rank_rentGrfeMax[i].bldg_usg}</td>
				<td>${data.rank_rentGrfeMax[i].avg_grfe * 10000 + '원'}</td></tr>`;
			rentGrfeMin +=
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_rentGrfeMin[i].cgg_nm}</td>
				<td>${data.rank_rentGrfeMin[i].stdg_nm}</td>
				<td>${data.rank_rentGrfeMin[i].bldg_usg}</td>
				<td>${data.rank_rentGrfeMin[i].avg_grfe * 10000 + '원'}</td></tr>`;
			rentRtfeMax += 
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_rentRtfeMax[i].cgg_nm}</td>
				<td>${data.rank_rentRtfeMax[i].stdg_nm}</td>
				<td>${data.rank_rentRtfeMax[i].bldg_usg}</td>
				<td>${data.rank_rentRtfeMax[i].avg_rtfe * 10000 + '원'}</td></tr>`;
			rentRtfeMin +=
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_rentRtfeMin[i].cgg_nm}</td>
				<td>${data.rank_rentRtfeMin[i].stdg_nm}</td>
				<td>${data.rank_rentRtfeMin[i].bldg_usg}</td>
				<td>${data.rank_rentRtfeMin[i].avg_rtfe * 10000 + '원'}</td></tr>`;
			jeonseMax += 
				`<tr>
				<td>${i + 1}</td><td>${data.rank_jeonseMax[i].cgg_nm}</td>
				<td>${data.rank_jeonseMax[i].stdg_nm}</td>
				<td>${data.rank_jeonseMax[i].bldg_usg}</td>
				<td>${data.rank_jeonseMax[i].avg_grfe * 10000 + '원'}</td></tr>`;
			jeonseMin += 
				`<tr>
				<td>${i + 1}</td>
				<td>${data.rank_jeonseMin[i].cgg_nm}</td>
				<td>${data.rank_jeonseMin[i].stdg_nm}</td>
				<td>${data.rank_jeonseMin[i].bldg_usg}</td>
				<td>${data.rank_jeonseMin[i].avg_grfe * 10000 + '원'}</td></tr>`;
		}
		
		buyingRankMax.children().find('tbody').html(buyMax);
		buyingRankMin.children().find('tbody').html(buyMin);
		rentRankGrfeMax.children().find('tbody').html(rentGrfeMax);
		rentRankGrfeMin.children().find('tbody').html(rentGrfeMin);
		rentRankRtfeMax.children().find('tbody').html(rentRtfeMax);
		rentRankRtfeMin.children().find('tbody').html(rentRtfeMin);
		jeonseRankMax.children().find('tbody').html(jeonseMax);
		jeonseRankMin.children().find('tbody').html(jeonseMin);
	}
	
	$('input[name="tableType"]').on('change', function() {
		let checked = $('input[name="tableType"]:checked').val();
		
		allTableDiv.children('.on').removeClass().addClass('off');
		
		$(`#${checked}`).removeClass().addClass('on');
	});


});