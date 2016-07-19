
function startGame() {

	//var boardObj = new ShowBoard();

	var showboard = new ShowBoard();

	var board = new Board().create();

	var ships = new Ships();

	var fire = new Fire();

	//place ships
	for (var i = 0; i < ships.type.length; i++) {
		ships.place(ships.type[i], board);
	}

	showboard.printBoard(board);

	var cells = document.getElementsByClassName("cell");

	document.getElementById("msgBoard").innerHTML = "";
	// debugger;
	showboard.handleCellClick(cells, fire, showboard, board, ships);

	console.log(board.join(("\n")));
	//console.log(cells);

	//var startBtn = document.getElementById("start");

}