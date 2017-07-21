function makeActive(id) {
	$('#homeTab').prop('class', '');
	$('#usersTab').prop('class', '');
	$('#issuesTab').prop('class', '');
	$('#loginTab').prop('class', '');
	
	switch(id) {
		case 1:
			$('#homeTab').prop('class', 'active');
			break;
		case 2:
			$('#usersTab').prop('class', 'active');
			break;
		case 3:
			$('#issuesTab').prop('class', 'active');
			break;
		case 4:
			$('#loginTab').prop('class', 'active');
			break;
	}
}

function clearLoginInputs() {
	$('#login-email').val('');
	$('#login-password').val('');
}