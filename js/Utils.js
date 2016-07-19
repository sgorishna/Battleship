function showShootingMessage(func_fire) {

	if (fire == true) {
		alert("Hit!");
	} else {
		alert("Miss");
	}
}

function showShootValidationMessage(validateShoot){
	
	if(validateShoot == false){
		
		alert ("Invalid coordinates");
	}
	
}

function validateShoot(x, y, field) {

	if (x > field.length) {

		return false;
	}
	if (y > field.length)
		return false;
	else {
		return true

	}

}