

const origBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let current = 'Z'
let s = 1


export function checkWinEasy(board, player) {
    var winning_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var gameWon = null;
    var score = 0;
    var i;

    for (i = 0; i < winning_combos.length; i++) {
        score = 0;
        for (var j = 0; j < 3; j++) {

            if (board[winning_combos[i][j]].player == player)

                score++;
            else
                break;
        }

        if (score == 3) {

            gameWon = { index: i, player: player, format: winning_combos[i] };
            break;
        }
    }
    return gameWon;
}
function emptySquares(newBoard) {
    const newMap = []
    newBoard.map((x, i) => {
        if (x.player == null) {
            newMap.push(i)
        }
    })
    return newMap
}
export function minimaxEasy(newBoard, depth, alpha, beta, player) {
    bot_mark = 0
    player_mark = 1
    var availSpots = emptySquares(newBoard);
    //    const it= [{player: 0, size: 2}, {player: 1, size: null}, {player: 0, size: null},
    //      {player: 1, size: null}, {player: 0, size: null}, {player: 1, size: null},
    //       {player: 0, size: 2}, {player: null, size: 0}, {player: 0, size: null}]
    // calculating the playable spots in a board state
    // if terminal state reaches, return with the score

    // return console.log(checkWinEasy(it, player),availSpots)
    if (checkWinEasy(newBoard, bot_mark)) //let opponent(ai) be the minimizer
        return { score: -20 + depth };
    else if (checkWinEasy(newBoard, player_mark)) // let player1(human) be the maximiser
        return { score: 20 - depth };
    else if (availSpots.length == 0) // tie 
        return { score: 0 };


    //if it is the ai's turn, lowest score (as we have taken ai as the minimiser)
    if (player == bot_mark) {
        var bestScore = 10000;
        var bestMove = {};
        for (var i = 0; i < availSpots.length; i++) {
            newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player }; // set the empty spot to the current player

            var value = minimaxEasy(newBoard, depth + 1, alpha, beta, player_mark);

            if (value.score < bestScore) {
                bestScore = value.score;
                bestMove.index = availSpots[i];
                bestMove.score = bestScore;
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = { size: null, player: null };

            beta = Math.min(beta, bestScore);
            if (beta <= alpha)
                break;
        }
        return bestMove;
    }
    else // else highest score (as human player is the maximiser)
    {
        var bestScore = -10000;
        var bestMove = {};
        for (var i = 0; i < availSpots.length; i++) {
            // set the empty spot to the current player
            newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player };
            var value = minimaxEasy(newBoard, depth + 1, alpha, beta, bot_mark);
            if (value.score > bestScore) {
                bestScore = value.score;
                bestMove.index = availSpots[i];
                bestMove.score = bestScore;
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = { size: null, player: null };

            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha)
                break;
        }
        return bestMove;
    }
}
