
// module for game board, score keeping, etc
const gameBoard = (() => {
    //const board = {}[9];
    // private variable for board
    //const board = ["o", "x", "x", "x", "X", "O", "O", "O", "X"];
    const board = new Array(9);

    // create a square object?
    // might be useful later, think react
    const square = (mark, color, isFilled) => {
        const setMark = (theMark) => {
            if(isFilled) {
                return false;
            } else {
                mark = theMark;
                isFilled = true;
                return true;
            }
        }
        const getMark = () => {
            return mark;
        }
        const setColor = (theColor) => {
            color = theColor;   
        }
        // TODO may not need this
        const checkFilled = () => {
            return isFilled === true;
        }
        return {setMark, setColor, checkFilled, getMark, color}
    }

    // fill the board with square objects that we can later update
    const fillBoard = (() => {
        for (i = 0; i < board.length; i++) {
            let newSquare = square("", "green", false);
            board[i] = newSquare;
        }
    })();

    // setters and getters public
    const markBoard = (mark, location) => {
        //if(isFillable(location)) {
        // by just returning, we can check if true or false
        // this can be used to stop the moving of turns on click
        return board[location].setMark(mark);
        //}
    }

    const getBoard = () => {
        return board;
    }

    const getSquare = (index) => {
        return board[i];
    }

    return {getBoard, markBoard, getSquare, square};
})();

const theGameBoard = gameBoard;

// displayController module
// should render the contents of the gameboard array to the webpage
const displayController = (() => {
    const boardContainer = document.getElementById("gameBoard");
    // below was making a copy .. maybe no bueno?
    //const theBoard = gameBoard.getBoard();

    const loadBoard = () => {
        boardContainer.innerHTML = "";

        for(z = 0; z < 9; z++) {
            let div = document.createElement("div");
            div.addEventListener("click", function() {
                currentLocation = z;
                console.log("clicked " + z);
            });
                
            let span = document.createElement("span");
            boardContainer.appendChild(div).appendChild(span).append(theGameBoard.getBoard()[z].getMark());
            
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
