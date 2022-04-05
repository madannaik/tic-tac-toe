window.addEventListener('DOMContentLoaded', () => {

    // query selectors
    const tile = document.querySelectorAll(".board__tile");
    const playerTurnTxt = document.getElementById('player__turn');
    const playerScoreTxt = document.getElementById('player_score');
    const endBtn = document.getElementById('end_game');
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

    tile.forEach((sTile, index) => {
        sTile.addEventListener("click", () => markBoard(sTile, index))
    })

    function closeModal() {
        modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        playerOScore = 0;
        playerXScore = 0;
        setScore()
        clearBoard()
    }
    endBtn.addEventListener('click', endGame);

    document.getElementById('reset_game').addEventListener('click', clearBoard);

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
        board = ['', '', '', '', '', '', '', '', ''];
    }
    function markBoard(sTile, index) {
        if (sTile.innerHTML === '') {
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
                alert(`Player ${f} won`);
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
        document.getElementById("game_details").innerHTML = playerXScore > playerOScore ? "Player X won" : "Player O won";

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
})


















