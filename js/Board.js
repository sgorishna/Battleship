
function Board() {
	this.board = new Array();
	this.dimension = 10;
	this.cellValue = 0;

	this.create = function() {
		for (var i = 0; i < this.dimension; i++)
			this.board[i] = new Array();

		for (var col = 0; col < this.board.length; col++) {
			for (var row = 0; row < this.board.length; row++) {
				this.board[col][row] = this.cellValue;
			}
		}
		return this.board;
	};
};

function ShowBoard() {

	this.printBoard = function(board) {
		document.getElementById("board").innerHTML = this.getBoard(board);

	}

	this.getBoard = function(board) {
		var table = "";
		for (var row = 0; row < board.length; row++) {
			for (var col = 0; col < board[row].length; col++) {
				switch (board[row][col]) {

				case 0:
					table += "<div class='cell empty' data-x='" + row
							+ "'data-y='" + col + "'></div>";
					break;
				case '-':
					table += "<div class='cell missed' data-x='" + row
							+ "' data-y='" + col + "'></div>";
					break;
				case '+':
					table += "<div class='cell hit' data-x='" + row
							+ "' data-y='" + col + "'></div>";
					break;
				default:
					table += "<div class='cell' data-x='" + row + "' data-y='"
							+ col + "'></div>";
				}
			}
			table += "</div>";
		}
		return table;
	}

	this.handleCellClick = function(cells, fire, showboard, board, ships) {

		for (var i = 0; i < cells.length; i++) {

			cells[i].onclick = function() {

				var coords = {

					row : parseInt(this.getAttribute("data-x")),
					col : parseInt(this.getAttribute("data-y"))

				}
				//debugger;
				handleFire(cells, fire, showboard, board, coords, ships);

				//console.log(coords) ;
			};

		}
	};

	this.disableCellClick = function() {

		var cells = document.getElementsByClassName("cell");

		for (var i = 0; i < cells.length; i++) {

			cells[i].onclick = function(event) {

				event.preventDefault();

			};

		}

	}

};

