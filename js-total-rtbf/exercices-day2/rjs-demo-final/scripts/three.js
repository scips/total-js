define('three',
	// ["jquery"], // Bonus 2 : dépendance à jQuery
	function(/* $ */) {
		return function three() {
			console.log('Three!');
			// $('body').css('color', 'red');
		};
	});
