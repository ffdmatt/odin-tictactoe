
// module for game board, score keeping, etc
const gameBoard = (() => {
    //const board = {}[9];
    // private variable for board
    //const board = ["o", "x", "x", "x", "X", "O", "O", "O", "X"];
    const board = new Array(9);

    // create a square object?
    // might be useful later, think react
    const square = (mark, color, isFilled) => {
        const setMark = (mark) => {
            this.mark = mark;
        }
        const setColor = (color) => {
            this.color = color;   
        }
        const checkFilled = () => {
            return isFilled === true;
        }
        return {setMark, setColor, checkFilled, mark, color}
    }

    const fillBoard = (() => {
        for (i = 0; i < board.length; i++) {
            let newSquare = square("X", "green", false);
            board[i] = newSquare;
        }
    })();

    // setters and getters public
    const markBoard = (mark, location) => {
        if(isFillable(location)) {
            board[location] = mark;
        }
    }

    const isFillable = (index) => {
        return isEmpty(board[index]);
    }

    const isEmpty = (item) => {
        return textContent.trim() === "";
    }

    const getBoard = () => {
        return board;
    }

    const getSquare = (index) => {
        return board[i];
    }

    return {getBoard, markBoard, getSquare, square};
})();



// displayController module
// should render the contents of the gameboard array to the webpage
const displayController = (() => {
    const boardContainer = document.getElementById("gameBoard");
    const theBoard = gameBoard.getBoard();

    const loadBoard = () => {
        for(i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.addEventListener("click", function() {
                currentLocation = i;
                console.log("clicked " + i);
            });
                
            let span = document.createElement("span");
            boardContainer.appendChild(div).appendChild(span).append(theBoard[i].mark);
            
        }
    }
    return {loadBoard, boardContainer};
})();

// player factory with score, marker(?), winlose(?) 
const player = (id, marker, name) => {
    const testFunction = () => console.log('player ' + name + ' ready!');
    /*
    const markBoard = () => {
        gameBoard.markBoard(marker);
    }
    */
    
    return {id, marker, name, testFunction};    
};


// turn handler?
const turnHandler = ((player) => {
    
})();

// load the board
displayController.loadBoard();

// create two players
const player1 = player(1, "X", "Matt");
const player2 = player(2, "O", "John");
