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
		
		let buyMax = makeBuyHtml(data.rank_buyMax);
		let buyMin = makeBuyHtml(data.rank_buyMin);
		let rentGrfeMax = makeGrfeHtml(data.rank_rentGrfeMax);
		let rentGrfeMin = makeGrfeHtml(data.rank_rentGrfeMin);
		let rentRtfeMax = makeRtfeHtml(data.rank_rentRtfeMax);
		let rentRtfeMin = makeRtfeHtml(data.rank_rentRtfeMin);
		let jeonseMax = makeGrfeHtml(data.rank_jeonseMax);
		let jeonseMin = makeGrfeHtml(data.rank_jeonseMin);

		
		buyingRankMax.children().find('tbody').html(buyMax);
		buyingRankMin.children().find('tbody').html(buyMin);
		rentRankGrfeMax.children().find('tbody').html(rentGrfeMax);
		rentRankGrfeMin.children().find('tbody').html(rentGrfeMin);
		rentRankRtfeMax.children().find('tbody').html(rentRtfeMax);
		rentRankRtfeMin.children().find('tbody').html(rentRtfeMin);
		jeonseRankMax.children().find('tbody').html(jeonseMax);
		jeonseRankMin.children().find('tbody').html(jeonseMin);
	}
	
	function makeBuyHtml(data) {
		let html;
		
		for(let i = 0; i < data.length; i++) {
			html += 		
				`<tr>
				<td>${i + 1}</td>
				<td>${data[i].cgg_nm}</td>
				<td>${data[i].stdg_nm}</td>
				<td>${data[i].bldg_usg}</td>
				<td>${data[i].avg_thing_amt * 10000 + '원'}</td></tr>`;
		}
		
		return html;
	}

	function makeGrfeHtml(data) {
		let html;
		
		for(let i = 0; i < data.length; i++) {
			html += 		
				`<tr>
				<td>${i + 1}</td>
				<td>${data[i].cgg_nm}</td>
				<td>${data[i].stdg_nm}</td>
				<td>${data[i].bldg_usg}</td>
				<td>${data[i].avg_grfe * 10000 + '원'}</td></tr>`;
		}

		return html;
	}

	function makeRtfeHtml(data) {
		let html;
		
		for(let i = 0; i < data.length; i++) {
			html += 		
				`<tr>
				<td>${i + 1}</td>
				<td>${data[i].cgg_nm}</td>
				<td>${data[i].stdg_nm}</td>
				<td>${data[i].bldg_usg}</td>
				<td>${data[i].avg_rtfe * 10000 + '원'}</td></tr>`;
		}
		
		return html;
	}
	
	$('input[name="tableType"]').on('change', function() {
		let checked = $('input[name="tableType"]:checked').val();
		
		allTableDiv.children('.on').removeClass().addClass('off');
		
		$(`#${checked}`).removeClass().addClass('on');
	});


});