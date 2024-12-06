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
			if(!response.ok) {
				throw new Error(`HTTP error. status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.error(error)
		});
	}
	
	
});