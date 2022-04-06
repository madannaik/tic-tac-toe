'use strict';
window.addEventListener('DOMContentLoaded', () => {

    // query selectors
    const tile = document.querySelectorAll(".board__tile");
    const playerTurnTxt = document.getElementsByClassName('turn__text')[0];
    const playerScoreTxt = document.getElementsByClassName('player__score')[0];
    const endBtn = document.getElementById('end_game');
    const resetBtn = document.getElementById('reset_game');
    const modal = document.getElementById("myModal");
    const span = document.getElementById("close_t");


    // variables
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let board = ['', '', '', '', '', '', '', '', '']
    let playerTurn = "X";
    let playerXScore = 0;
    let playerOScore = 0;



    // Listeners

    // Mark the tile according to the user turn
    tile.forEach((sTile, index) => {
        sTile.addEventListener("click", () => markBoard(sTile, index))
    })

    // close modal popup
    span.onclick = closeModal;

    endBtn.onclick = endGame;

    resetBtn.onclick = clearBoard;

    // When the user clicks on <span> (x), close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    // utility functions
    function clearBoard() {
        tile.forEach(sTile => {
            sTile.innerHTML = "";
        })
        playerTurn = "X";
        playerTurnTxt.innerHTML = `Player ${playerTurn} turn`;
        tile.forEach((sTile) => sTile.classList.remove('letter__X', 'letter__O'));
        board = ['', '', '', '', '', '', '', '', ''];
    }
    function markBoard(sTile, index) {
        if (sTile.innerHTML === '') {
            // update board
            board[index] = playerTurn;
            sTile.innerHTML = playerTurn;
            sTile.classList.remove('letter__X', 'letter__O')
            sTile.classList.add(`letter__${playerTurn}`);
            playerTurn = playerTurn === "X" ? "O" : "X";
            playerTurnTxt.innerHTML = `Player ${playerTurn} turn`;
            checkScore();
        }

    }
    function checkScore() {
        for (let i = 0; i < winningCondition.length; i++) {

            let f = board[winningCondition[i][0]];
            let s = board[winningCondition[i][1]];
            let t = board[winningCondition[i][2]];

            if (f === '' || s === '' || t === '') {
                continue;
            }
            if (f === s && s === t) {
                f === 'X' ? ++playerXScore : ++playerOScore;
                console.log(playerXScore, playerOScore);
                setScore()
                alert(`Player ${f} scored a point`);
                clearBoard()
                continue;
            }
            checkDraw();

        }

    }

    function setScore() {
        playerScoreTxt.innerHTML = `${playerXScore} - ${playerOScore}`
    }
    function endGame() {
        modal.style.display = "block";
        document.getElementById("game_details").innerHTML =
            playerXScore > playerOScore ?
                "Player X won" : playerOScore === playerXScore ?
                    "Both have Equal Score" : "Player O won";

    }
    function checkDraw() {
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') break;
            else if (i == 8) {
                alert('Draw');
                clearBoard();
            }
        }
    }
    function closeModal() {
        modal.style.display = "none";
        playerOScore = 0;
        playerXScore = 0;
        setScore()
        clearBoard()
    }
})


















