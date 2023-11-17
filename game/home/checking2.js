

const origBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let current = 'Z'
let s = 1
function checkWin0(newBoard, player) {
    // return false
    let isWimmer = false
    const d1 = ['00', '11', '22']
    let d1C = 0
    let d2C = 0
    const d2 = ['02', '11', '20']

    const x = [[], [], []]
    const y = [[], [], []]

    let allCount = 0

    newBoard.map((item, i) => {
        if (item.player == player) {
            // for Diagonal 1
            if (d1.findIndex(it => it == item.id) != -1) {
                d1C += 1
            }

            // for Diagonal 2
            if (d2.findIndex(it => it == item.id) != -1) {
                d2C += 1
            }

            //for horizontal
            x[item.posX] = [...x[item.posX], item.id]

            //for vertical
            y[item.posY] = [...y[item.posY], item.id]

        }
        if (item.player != null) {
            allCount += 1
        }
    })
    // Check Diagonal 1
    if (d1C == 3) {
        isWimmer = true

    }

    // Check Diagonal 2
    if (d2C == 3 && !isWimmer) {
        isWimmer = true

    }

    // Check Horizontal
    x.map((xx, i) => {
        if (xx.length >= 3 && !isWimmer) {
            isWimmer = true

        }
    })

    // Check Vertical
    y.map((yy, i) => {
        if (yy.length >= 3 && !isWimmer) {
            isWimmer = true

        }
    })
    // console.log(isWimmer, winner)
    if (isWimmer) {
        return true
    }
    else if (allCount == 9) {
        return null
    }
    else {
        return false
    }
}

function checkWin(board, player) {
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

            gameWon = { index: i, player: player };
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
export function minimax2(newBoard, depth, alpha, beta, player, playerZeroMocks, playerOneMocks) {
    bot_mark = 0
    player_mark = 1
    var availSpots = emptySquares(newBoard);
    let p0Sizes = []
    let p1Sizes = []
    playerZeroMocks.map((p, i) => {
        if (p.show && p0Sizes.findIndex(it => it == p.size) == -1) {
            p0Sizes.push(p.size)

        }

    })
    playerOneMocks.map((p, i) => {
        if (p.show && p1Sizes.findIndex(it => it == p.size) == -1) {
            p1Sizes.push(p.size)

        }

    })
    //    const it= [{player: 0, size: 2}, {player: 1, size: null}, {player: 0, size: null},
    //      {player: 1, size: null}, {player: 0, size: null}, {player: 1, size: null},
    //       {player: 0, size: 2}, {player: null, size: 0}, {player: 0, size: null}]
    // calculating the playable spots in a board state
    // if terminal state reaches, return with the score

    // return console.log(checkWin(it, player),availSpots)
    if (checkWin(newBoard, bot_mark)) {
        //let opponent(ai) be the minimizer
        // console.log('bot', -20+depth)
        return { score: -20 + depth };
    }
    else if (checkWin(newBoard, player_mark)) {
        // console.log('player', 20-depth)

        // let player1(human) be the maximiser
        return { score: 20 - depth };
    }

    else if (availSpots.length == 0) // tie 
        return { score: 0 };


    //if it is the ai's turn, lowest score (as we have taken ai as the minimiser)
    if (player == bot_mark) {
        var bestScore = 10000;
        var bestMove = {};
        for (var i = 0; i < availSpots.length; i++) {
            for (var i = 0; i < p0Sizes.length; i++) {


                newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player, size:p0Sizes[i] }; // set the empty spot to the current player

                var value = minimax2(newBoard, depth + 1, alpha, beta, player_mark, playerZeroMocks, playerOneMocks);
                if (value.score < bestScore) {
                    bestScore = value.score;
                    bestMove.index = availSpots[i];
                    bestMove.score = bestScore;
                }

                // reset the spot to empty for the next loop itereration
                newBoard[availSpots[i]] = { size: null, player: null };

                beta = Math.min(beta, bestScore);
                if (beta <= alpha) {


                    break;
                }
            }

            return bestMove;
        }

    }
    else // else highest score (as human player is the maximiser)
    {
        var bestScore = -10000;
        var bestMove = {};
        for (var i = 0; i < availSpots.length; i++) {
            // set the empty spot to the current player
            for (var i = 0; i < p1Sizes.length; i++) {

            newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player,size:p1Sizes[i]  };
            var value = minimax2(newBoard, depth + 1, alpha, beta, bot_mark, playerZeroMocks, playerOneMocks);

            if (value.score > bestScore) {
                bestScore = value.score;
                bestMove.index = availSpots[i];
                bestMove.score = bestScore;
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = { size: null, player: null };

            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {


                break;
            }

        }

        return bestMove;
    }

    }
}
function mak() {

    const i = minimax2(origBoard, 0, -10000, 10000, current).index
    console.log('-----------------------------', i)
    origBoard[i] = current
    console.log(origBoard[0], origBoard[1], origBoard[2])
    console.log(origBoard[3], origBoard[4], origBoard[5])
    console.log(origBoard[6], origBoard[7], origBoard[8])
    current = current == 'Z' ? 'X' : 'Z'
    s += 1
    if (s < 9) {
        mak()
    }

}
