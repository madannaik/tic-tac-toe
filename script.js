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
    let isGameActive = true;


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
        clearLine();
        isGameActive = true;
    }
    function markBoard(sTile, index) {
        if (isGameActive && sTile.innerHTML === '') {
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
                drawLine(winningCondition[i][0], winningCondition[i][2], f);
                f === 'X' ? ++playerXScore : ++playerOScore;
                setScore()
                let amess = `Player ${f} scored a point`;
                showSnackbar(amess);
                isGameActive = false;
                // clearBoard()
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
    function drawLine(f, t, win) {
        const parentelem = document.querySelectorAll('.board')[0].getBoundingClientRect();
        const elem = document.querySelectorAll('.board__tile');
        const strike = document.getElementById('board_strike');
        const rect1 = elem[f].getBoundingClientRect();
        const rect2 = elem[t].getBoundingClientRect();

        const { x1, x2, y1, y2 } = getPoints(parentelem, rect1, rect2);

        const angle = getAngle(x1, x2, y1, y2)

        strike.style.top = 50 + rect1.top - parentelem.top + "px";
        strike.style.left = rect1.left - parentelem.left + 48 + "px";
        strike.style.transform = `rotate(${-angle + 'deg'})`;
        (win === 'X')
            ? strike.style.backgroundColor = "#045de9"
            : strike.style.backgroundColor = "#e9902a";
        strike.style.height = getDistance(x2, x1, y2, y1) + "px";
    }
    function clearLine() {
        const strike = document.getElementById('board_strike');
        strike.style.height = 0;
    }
    function getPoints(parent, rect1, rect2) {
        let x1 = rect1.x - parent.x;
        let x2 = rect2.x - parent.x;
        let y1 = rect1.y - parent.y;
        let y2 = rect2.y - parent.y;
        return { x1, x2, y1, y2 };
    }
    // calculate the angle between points
    function getAngle(x1, x2, y1, y2) {

        // angle between two points
        // θ = tan−1 (y2−y1)/(x2−x1)
        // in degree
        // deg = θ * 180/PI

        let angle = Math.atan(((y2 - y1) / (x2 - x1)));
        angle = angle * (180 / Math.PI);
        if (Math.round(angle) === -45) {
            return angle;
        }
        else { return 90 - angle }
    }
    function getDistance(x2, x1, y2, y1) {
        return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
    }
    function showSnackbar(text) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = text;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
})


















