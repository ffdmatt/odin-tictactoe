
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
        // TODO THEN DisplayController.loadBoard();
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

// is this safe?
const theGameBoard = gameBoard;

// displayController module
// should render the contents of the gameboard array to the webpage
const displayController = (() => {
    const boardContainer = document.getElementById("gameBoard");
    // below was making a copy .. maybe no bueno?
    //const theBoard = gameBoard.getBoard();

    const loadBoard = () => {
        boardContainer.innerHTML = "";

        // TODO why does this make all of them "9"?
        for(z = 0; z < 9; z++) {
            let str = "square-";
            let div = document.createElement("div");
            div.classList.add("square");
            div.setAttribute("id", str.concat(z));
            let span = document.createElement("span");
            boardContainer.appendChild(div).appendChild(span).append(theGameBoard.getBoard()[z].getMark());
        }
        // add event listeners later
        const squares = document.querySelectorAll(".square");
        squares.forEach(element => {
            element.addEventListener("click", function(){
                console.log("Clicked: " + this.id);
                const location = this.id.slice(-1);
                console.log("The ID is: " + location);
                
                if(theGameBoard.markBoard("X", location)) {
                    loadBoard();
                } else {
                    console.log("Spot filled");
                };
            });
        })
    }
    return {loadBoard, boardContainer};
})();

// player factory with score, marker(?), winlose(?) 
const player = (id, marker, name) => {
    const testFunction = () => console.log('player ' + name + ' ready!');
    
    const markBoard = (event) => {
        theGameBoard.markBoard(marker, event);
        displayController.loadBoard();
    }
    
    
    return {id, marker, name, testFunction};    
};


// turn handler?
const turnHandler = ((player) => {
    // during the turn, click, then reload board through displayController
        
})();

// load the board
displayController.loadBoard();

// create two players
const player1 = player(1, "X", "Matt");
const player2 = player(2, "O", "John");
