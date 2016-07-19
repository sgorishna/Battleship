function ShipType(name, size, life, id) {

	this.name = name;
	this.size = size;
	this.life = life;
	this.id = id;
};

function Ships() {

	this.type = [ new ShipType("Aircraft carrier", 5, 5, 1),
			new ShipType("Battleship", 4, 4, 2),
			new ShipType("Submarine", 3, 3, 3),
			new ShipType("Cruiser", 3, 3, 4),

			new ShipType("Patrol boat", 2, 2, 5), ];

};

Ships.prototype.getShipOrientation = function() {

	var orientation = Math.floor(Math.random() * 2);
	if (orientation === 1)
		return 'horizontal';
	else
		return 'vertical';
};

Ships.prototype.getShipById = function(shipId) {
	for (var i = 0; i < this.type.length; i++) {
		if (this.type[i].id === shipId) {
			return this.type[i];
		}
	}
};

Ships.prototype.getHeadCoords = function(ship, board, orientation) {

	var coords = {
		"row" : 0,
		"col" : 0
	};

	if (orientation === 'horizontal') {
		coords["row"] = Math.floor(Math.random() * board.length);
		coords["col"] = Math.floor(Math.random() * (board.length - ship.size));
	} else {

		coords["row"] = Math.floor(Math.random() * (board.length - ship.size));
		coords["col"] = Math.floor(Math.random() * board.length);
	}

	return coords;
};

Ships.prototype.isValidCoords = function(coord, ship, orientation, board) {

	var valid = false;
	for (var i = 0; i < ship.size; i++) {
		if (orientation === 'horizontal') {
			if ((board[coord.row][coord.col + i] === 0)
					&& (coord.row + i < board.length)) {
				valid = true;
			} else
				return false;
		} else {
			if ((board[coord.row - i][coord.col]) === 0
					&& (coord.row >= ship.size)) {
				valid = true;
			} else
				return false;
		}
	}

	return valid;
};

Ships.prototype.place = function(ship, board) {

	var orientation = this.getShipOrientation();
	var coord = this.getHeadCoords(ship, board, orientation);
	var row = coord.row;
	var col = coord.col;

	if (this.isValidCoords(coord, ship, orientation, board)) {

		try {
			switch (orientation) {
			case 'horizontal':
				for (var i = 0; i < ship.size; i++) {
					board[row][i + col] = ship.id;
					board[row + 1][i + col] = "*";
					if (row > 0) {
						board[row - 1][i + col] = "*";
					}
				}

				this.setBorders(board, orientation, ship, row, col);

				break;
			case 'vertical':
				for (var i = 0; i < ship.size; i++) {
					board[row - i][col] = ship.id;
					if (col < 9) {
						board[row - i][col + 1] = "*";
					}
					board[row - i][col - 1] = "*";
				}

				this.setBorders(board, orientation, ship, row, col);
				break;
			}

		} catch (err) {

			this.place(ship, board);

		}
	} else {

		this.place(ship, board);
	}

};

Ships.prototype.setBorders = function(board, orientation, ship, row, col) {

	if (orientation === "horizontal") {

		if (row > 0) {
			board[row - 1][col - 1] = "*";
			board[row - 1][col - 1] = "*";

			board[row - 1][col + ship.size] = "*";
		}

		board[row][col + ship.size] = "*";
		board[row + 1][col + ship.size] = "*";

		board[row + 1][col - 1] = "*";

		board[row + 1][col - 1] = "*";

		board[row][col - 1] = "*";

	} else {

		if (col < 9) {
			board[row + 1][col + 1] = "*";
			board[row + ship.size][col + 1] = "*";
		}

		board[row + 1][col] = "*";
		board[row + ship.size][col] = "*";

		board[row + 1][col - 1] = "*";

		board[row + ship.size][col - 1] = "*";

	}

};

Ships.prototype.isSunk = function(ship, board) {

	if (ship.life === 0)
		return true;
	else
		return false;
}

Ships.prototype.isHit = function(coord, ship, board) {

	var col = coord.col;
	var row = coord.row;
	if (board[row][col] === 0) {
		return false;
	} else {
		return true;
	}
};

