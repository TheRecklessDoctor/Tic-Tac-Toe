let board;
let tieChecker;

const gameBoard = (() => {

    
    const initialize = () => {

        board = [];
        for(let i = 0; i< 9; i++){
            board.push("");
        }
    
        const gameBoard = document.querySelector(".gameboard");
    
        board.forEach((value, index) => {
    
            let cell = document.createElement("div");
            cell.className = "cell grid-lines";
            cell.id = index;
            cell.innerText = value;
    
            gameBoard.append(cell);
        });
    }

    const resetBoard = () => {

        const cells = document.querySelectorAll(".cell");
        cells.forEach((value, index) => {
            value.innerText = "";
        });
        board = [];
        for(let i = 0; i< 9; i++){
            board.push("");
        }

        const playerName = document.querySelector(".PlayerName");
        playerName.innerText = '';

        // display pop up form
        const form = document.querySelector(".pop-up-form");
        form.style.display = "block";

        // clear input areas
        const one = document.querySelector("#PlayerX");
        const two = document.querySelector("#PlayerO");

        one.innerHTML = "";
        two.innerText = "";
        console.log(board);

        // reset tiecheker variable
        tieChecker = 0;


    }

    const addButtonFunctionality = () => {
        const resetBtn = document.querySelector(".reset");
        resetBtn.addEventListener("click", () => {
            resetBoard();
        })
    }





    return {
        resetBoard,
        addButtonFunctionality,
        initialize
    }

})();


const playGame = (() => {

    let currentPlayer = "X";
    let PlayerOne = '';
    let PlayerTwo = '';

    const interaction = () => {

        // add functionality for name form submti button
        const formSubmit = document.querySelector("#submit-btn");
        formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            getPlayerNames();
        });


         

         

        // game functionality
        let cells = document.querySelectorAll(".cell");
        tieChecker = 0;

        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if(cell.innerText == ""){
                    
                    console.log(PlayerOne);
                    
                    //handle cell and internal state 
                    board[cell.id] = currentPlayer;
                    cell.innerText = currentPlayer;
                    console.log(board);

                    // handle winner
                    let hasWon = handleWinner();
                    console.log(hasWon);
                    
                    if(hasWon) {
                        tieChecker = 0;
                        setTimeout(() => {
                            const winner = currentPlayer === "X"?"O":"X";
                            alert(`Game over, winner:${winner}.`);
                        },500);
                    
                    }else if(tieChecker === 8){
                        setTimeout(() => {
                            alert("No winner, game ended in a tie.")
                        }, 500);
                    }else {
                        tieChecker++;
                    }

                    // handle player change
                    currentPlayer = currentPlayer === "X" ? "O" : "X";

                    // set player name on screen
                    const nameSect = document.querySelector(".PlayerName");
                    if(currentPlayer == "X"){
                        nameSect.innerText = PlayerOne+" make your move.";
                    }else {
                        nameSect.innerText = PlayerTwo+" make your move.";
                    }
                }
            })
        })
    };

    const getPlayerNames = () => {
        const playerOne = document.querySelector("#PlayerX");
        const playerTwo = document.querySelector("#PlayerO");

        PlayerOne = playerOne.value;
        PlayerTwo = playerTwo.value;


        const form = document.querySelector(".pop-up-form");
        form.style.display = "None";


        // set player name on screen
        console.log(PlayerOne);
        const nameSect = document.querySelector(".PlayerName");
        if(currentPlayer == "X"){
            nameSect.innerText = PlayerOne+" make your move.";
        }else {
            nameSect.innerText = PlayerTwo+" make your move.";
        }



    }

    const handleWinner = () => {
        let win = false;
        let winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for(let i = 0; i<=7; i++){
            let winningComb = winningCombinations[i];
            let a = board[winningComb[0]];
            let b = board[winningComb[1]];
            let c = board[winningComb[2]];

            if(a === '' && b === '' && c === '') {
                continue;
            }else if(a === b && b === c){
                win = true;
            }
        }

        return win;
    }

    

    return {
        interaction
    }
})();

const main = (() => {

    const play_Game = () => {
        // set the screen 
        gameBoard.initialize();

        // add reset button functionality
        gameBoard.addButtonFunctionality();

        // add reset capabilities
        gameBoard.resetBoard();

        // play the game
        playGame.interaction()

    };


    return {
        play_Game
    }
})();

main.play_Game();




