
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

    const resetBoard = () => {
        for (i = 0; i < board.length; i++) {
            let newSquare = square("", "green", false);
            board[i] = newSquare;
        }
        currentTurn = 0;
    }

    const getBoard = () => {
        return board;
    }

    const getSquare = (index) => {
        return board[i];
    }

    return {getBoard, markBoard, resetBoard, getSquare, square};
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

    const setName = (n) => {
        name = n;
    }
    
    return {getId, getMarker, getName, testFunction, setName};    
};


const gameHandler = (() => {

    // create two players
    const player1 = player(0, "X", "Player 1");
    const player2 = player(1, "O", "Player 2");

    // add to array
    const players = [player1, player2];

    const setPlayers = (p1, p2) => {
        players[0].setName(p1);
        players[1].setName(p2);
    }

    const getWinnerName = () => {
        return players[currentTurn % 2].getName();
    }

    // start at player 1
    //currentTurn = 1;

    const checkTurn = () => {
        return players[currentTurn % 2].getMarker();
    }

    return {checkTurn, setPlayers, getWinnerName};

})();

// displayController module
// should render the contents of the gameboard array to the webpage
const displayController = (() => {
    const boardContainer = document.getElementById("gameBoard");
    // below was making a copy .. maybe no bueno?
    //const theBoard = gameBoard.getBoard();

    const loadBoard = () => {
        boardContainer.innerHTML = "";

        
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
                    if (currentTurn > 3) {
                        switch(checkGameOver.gameCheck()) {
                            case 0:
                                console.log("You Win!");
                                //alert(gameHandler.checkTurn() + " wins! Congratulations " + gameHandler.getWinnerName());
                                modalController.showWinnerModal();
                                disableBoard();
                                // will need to have another function like pause game
                                break;
                            case 1:
                                console.log("Game Over, it's a tie!");
                                alert("It's a tie! Please Restart");
                                disableBoard();
                                // same here
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
    const disableBoard = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(element => {
            element.classList.add("disabled");
        });
    }

    const enableBoard = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(element => {
            element.classList.remove("disabled");
        });
    }

    return {loadBoard, disableBoard, enableBoard};
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
        for(i = 0; i < 3; i++) {
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

// modal controller

const modalController = (() => {
    const modal = document.getElementById('modal');
    const winnerModal = document.getElementById('winner-modal');
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    const btn = document.getElementById('modal-button');
    const form = document.getElementById('playerNames');
    const inputPlayer1 = document.getElementById('player1Name');
    const inputPlayer2 = document.getElementById('player2Name');
    const player1NameDisplay = document.getElementById('player1NameDisplay');
    const player2NameDisplay = document.getElementById('player2NameDisplay');

    // TODO does this need to run like this? 
    const init = (() => {
        title.innerText = "New Game";
        text.innerText = "Welcome to Tic Tac Toe! To begin, enter the names for players 1 and 2. When you're ready, select \"begin game!\""
        btn.addEventListener("click", function(event){
            event.preventDefault();
            resetText();
            getPlayerNames();
            hideModal();
            hideWinnerModal();
        });
    })();

    const resetText = () => {
        title.innerText = "New Game";
        text.innerText = "Welcome to Tic Tac Toe! To begin, enter the names for players 1 and 2. When you're ready, select \"begin game!\""
    }

    const showModal = () => {
        overlay.classList.add('show');
    }

    const hideModal = () => {
        overlay.classList.remove('show');
    }

    const startGameModal = () => {
        showModal();
    }

    const getPlayerNames = () => {
        const player1Name = inputPlayer1.value;
        const player2Name = inputPlayer2.value;
        player1NameDisplay.innerText = player1Name;
        player2NameDisplay.innerText = player2Name;
        gameHandler.setPlayers(player1Name, player2Name);
        return {player1Name, player2Name}
    }

    const showWinnerModal = () => {
        winnerModal.classList.add('show');
        winnerModal.innerText = gameHandler.checkTurn() + " wins! Congratulations " 
            + gameHandler.getWinnerName() + ". If you'd like to play again, select \"Start Game.\"";
    }

    const hideWinnerModal = () => {
        if(winnerModal.classList.contains('show'))  {
            winnerModal.classList.remove('show');
        }
    }

    showModal();

    return {startGameModal, showWinnerModal, hideWinnerModal, player1Name, player2Name}

})();

const resetButton = (() => {
    const button = document.getElementById('start');

    const startGame = () => {
        gameBoard.resetBoard();
        displayController.loadBoard();
        displayController.enableBoard();
        modalController.startGameModal();
    }

    button.addEventListener("click", startGame);
    
    return {startGame}
})();

