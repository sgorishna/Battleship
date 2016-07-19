function Fire() {
	this.counter = 0;
	this.num_ships = 5;
	this.num_ships_sunk = 0;
	this.MAX_SHOOTS = 30;

	this.shoot = function(coords, board, ships, showboard) {
		var col = coords.col;
		var row = coords.row;
		var msg = "";

		if (this.counter >= this.MAX_SHOOTS) {
			msg = "<div>No More Attempts Left. You Have Lost. Click Start to try again.</div>";
			
			//disable clicks
			showboard.disableCellClick();
			document.getElementById("start").style.display = "block";
		} else {
			if (board[row][col] === "-" || board[row][col] === "+") {

				msg = " <div>You have already guessed that</div>";
				return msg;
			} else if (board[row][col] === 0 || board[row][col] === '*') { 
				this.counter++;
				board[row][col] = "-";

				msg = "<div>MISSED. You have: "
						+ (this.MAX_SHOOTS - this.counter)
						+ " shots left.</div>";
				return msg;
			} else { //If hit

				var ship = ships.getShipById(board[row][col]);
				ship.life--;

				board[row][col] = "+";
				this.counter++;

				msg = "<div>HIT. You have: " + (this.MAX_SHOOTS - this.counter)
						+ " shots left.</div> ";

				//check if sunk
				if (ship.life === 0) {
					this.num_ships_sunk++;
					msg += "<br /><div> You have sunk " + ship.name + "</div>";

					//check if all ship had been sunk
					if (this.num_ships_sunk === this.num_ships) {
						msg += "<br /><div> You have sunk all ships! <br />YOU WON !!!</div>";

						//disable clicks
						showboard.disableCellClick();
					}
				}
				return msg;
			}
		}
		return msg;

	};
}

function handleFire(cells, fire, showboard, board, coords, ships) {

	var msgBoard = document.getElementById("msgBoard");

	var msg = fire.shoot(coords, board, ships, showboard);

	msgBoard.innerHTML = msg;

	showboard.printBoard(board);

	showboard.handleCellClick(cells, fire, showboard, board, ships);

}