
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
let currentTurn = 0;

// player factory with score, marker(?), winlose(?) 
const player = (id, marker, name) => {
    const testFunction = () => console.log('player ' + name + ' ready!');
    
    const getId = () => {
        return id;
    }
    const getMarker = () => {
        return marker;
    }
    const getName = () => {
        return name;
    }
    
    return {getId, getMarker, getName, testFunction};    
};


const gameHandler = (() => {

    // create two players
    const player1 = player(0, "X", "Matt");
    const player2 = player(1, "O", "John");

    // add to array
    const players = [player1, player2];

    // start at player 1
    //currentTurn = 1;

    const checkTurn = () => {
        return players[currentTurn % 2].getMarker();
    }

    return {checkTurn};

})();

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
                
                // this works, but should it be elsewhere?
                if(theGameBoard.markBoard(gameHandler.checkTurn(), location)) {
                    loadBoard();
                    if (currentTurn > 4) {
                        switch(checkGameOver.gameCheck()) {
                            case 0:
                                console.log("You Win!");
                                break;
                            case 1:
                                console.log("Game Over, it's a tie!");
                                break;
                            case 2:
                                console.log("No Winner Found, Game Resumes");
                                break;
                        }
                    } else {
                        console.log("Not enough turns to determine winner.");
                    }
                    currentTurn++;
                } else {
                    console.log("Spot filled");
                };
            });
        })
    }
    return {loadBoard};
})();


// load the board
displayController.loadBoard();

/*
// turn handler?
const turnHandler = ((players) => {
    const checkTurn = () => {
        return players[currentTurn % 2].getMarker();
    }
    // during the turn, click, then reload board through displayController
    return checkTurn;
})();
*/

// check for winning moves. Either 3 across or diagnol.
// lets map it out
// 0 1 2
// 3 4 5
// 6 7 8
// so 0 1 2, 3 4 5, 6 7 8, 0 3 6, 1 4 7, 2 5 8, 0 4 8, 2 4 6
// recursion can do this, look at one and keep checking for not empty and is matching

// otherwise, long and heavy way. Check horizontal, check vertical, check diagnol.

// LONG WAY
const checkGameOver = (() => {
    // check if all spots full
    const gameCheck = () => {
        const theBoard = gameBoard.getBoard();
        if (checkHorizontal(theBoard) || checkVertical(theBoard) || checkDiag(theBoard)) {
            return 0;
        } else if (checkTie(theBoard)) {
            return 1;
        } else {
            return 2;
        }
    }
    // check horizontals
    const checkHorizontal = (theBoard) => {
        //return (theBoard[0].getMark() == theBoard[1].getMark() == theBoard[2].getMark() || 
        //    theBoard[3].getMark() == theBoard[4].getMark() == theBoard[5].getMark() || 
        //    theBoard[6].getMark() == theBoard[7].getMark() == theBoard[8].getMark());
        // loop 3 times
        // each time start at 0, 3, and 6 (n+3)
        for(i = 0; i < 9; i+=3) {
            // inner loop moves 1 step
            if(theBoard[i].checkFilled()) {
                if(theBoard[i].getMark() == theBoard[i + 1].getMark() 
                && theBoard[i].getMark() == theBoard[i + 2].getMark()) {
                    console.log("horizontal win");
                    return true;
                }
            }
        }
        return false;
    }
    // check verticals
    const checkVertical = (theBoard) => {
        //return (theBoard[0].getMark() == theBoard[3] == theBoard[6] || 
        //    theBoard[1] == theBoard[4] == theBoard[7] || 
        //    theBoard[2] == theBoard[5] == theBoard[8]);
        // loop 3 times
        // each time start at 0, 1, and 2 (n+1)
        for(i = 0; i < 9; i++) {
            // inner loop moves 3 steps n + 3
            if(theBoard[i].checkFilled()) {
                if(theBoard[i].getMark() == theBoard[i + 3].getMark() 
                && theBoard[i].getMark() == theBoard[i + 6].getMark()) {
                    console.log("vertical win");
                    return true;
                }
            }
        }
        return false;
    
    }
    // check diagnols
    const checkDiag = (theBoard) => {
        return ((theBoard[0].checkFilled() && theBoard[0].getMark() == theBoard[4].getMark() && theBoard[0].getMark() == theBoard[8].getMark()) || 
            (theBoard[2].checkFilled() && theBoard[2].getMark() == theBoard[4].getMark() && theBoard[2].getMark() == theBoard[6].getMark()));
    }
    const checkTie = (theBoard) => {
        for(i = 0; i < theBoard.length; i++) {
            // lol sorry
            if(!(theBoard[i].checkFilled())) {
                return false;
            }
        }
        return true;
    }
    return {gameCheck};
})();