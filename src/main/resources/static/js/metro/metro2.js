$(document).ready(function() {

	let $zoom = 1;

	function mapZoom() {
		document.querySelector('.mapImage').style.transform = 'scale(' + $zoom + ')'
	}

	addEventListener('keydown', function(event) {
		if (event.key === '+') {
			$zoom += .2
		}
		else if (event.key === '=') {
			$zoom += .2
		}
		else if (event.key === '-') {
			$zoom -= .2
		}
		else if (event.key === '_') {
			$zoom -= .2
		}

		mapZoom();
	})








});