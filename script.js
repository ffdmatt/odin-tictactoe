// module for game board, score keeping, etc
const gameBoard = (() => {
    //const board = {}[9];
    const board = ["o", "x", "x", "x", "X", "O", "O", "O", "X"];
    
    return board;
})();

// displayController module
// should render the contents of the gameboard array to the webpage
const displayController = (() => {
    const boardContainer = document.getElementById("gameBoard");
    const loadBoard = () => {
        for(i = 0; i < 9; i++) {
            let div = document.createElement("div");
            let span = document.createElement("span");
            boardContainer.appendChild(div).appendChild(span).append(gameBoard[i]);
            
        }
    }
    return {loadBoard, boardContainer};
})();

// player factory with score, marker(?), winlose(?) 
const player = (score, marker, playerNumber) => {
    const testFunction = () => console.log('player' + playerNumber + ' ready!');
    return {score, marker, playerNumber, testFunction};    
};

// load the board
displayController.loadBoard();