/**
 * 
 */
$(document).ready(function() {

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
		const dataArray = [];
		for (let i = 0; i < 26; i++) {
			dataArray.push(data.splice(0, 17));
		}
		console.log('dataArray:: ', dataArray);

		createChart(dataArray);
	}


	function createChart(dataArray) {
		// 차트 제작
	}

});