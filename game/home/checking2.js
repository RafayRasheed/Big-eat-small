

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
function emptySquares(newBoard, size) {
    const newMap = []
    // newBoard.map((x, i) => {
    //     if (x.player == null) {
    //         newMap.push(i)
    //     }
    // })
    newBoard.map((x, i) => {
        // if (x.player == null || x.size < size) {
            if (x.player == null || x.size < size) {
            newMap.push(i)
        }
    })
    return newMap
}
function printPlayer0(newBoa) {
    const newBoard = []
    newBoa.map((it) => {
        newBoard.push(it.player)
    })
    console.log(newBoard[0], newBoard[1], newBoard[2])
    console.log(newBoard[3], newBoard[4], newBoard[5])
    console.log(newBoard[6], newBoard[7], newBoard[8])
}
export function minimax2(newBoard, depth, alpha, beta, player, playerZeroMocks, playerOneMocks, size, index) {
    bot_mark = 0
    player_mark = 1
    var availSpots = emptySquares(newBoard, size);
    // printPlayer0(newBoard)
    console.log(size, index)
    if (checkWin(newBoard, bot_mark)) {
        //let opponent(ai) be the minimizer

        return { score: -20 + depth };
    }
    else if (checkWin(newBoard, player_mark)) {
        // let player1(human) be the maximiser

        return { score: 20 - depth };
    }

    else if (availSpots.length == 0) {


        return { score: 0 };
    } // tie

    // console.log(availSpots.length)
    let p0Sizes = []
    let p1Sizes = []
    playerZeroMocks.map((p, index) => {
        if (p.show) {
            p0Sizes.push({ size: p.size, index })

        }

    })
    playerOneMocks.map((p, index) => {
        if (p.show) {
            p1Sizes.push({ size: p.size, index })

        }

    })



    //if it is the ai's turn, lowest score (as we have taken ai as the minimiser)
    if (player == bot_mark) {
        var bestScore = 10000;
        var bestMove = {};
        for (var i = 0; i < availSpots.length; i++) {


            newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player, size }; // set the empty spot to the current player
            playerZeroMocks[index] = {
                ...playerZeroMocks[index],
                show: false
            }
            // console.log('-----0-----')
            // printPlayer0(newBoard)
            for (var j = 0; j < p1Sizes.length; j++) {
                // var value = minimax2(newBoard, depth + 1, alpha, beta, player_mark, playerZeroMocks, playerOneMocks, p1Sizes[j].size, p1Sizes[j].index);
                var value = minimax2(newBoard, depth + 1, alpha, beta, player_mark, playerZeroMocks, playerOneMocks, 2, 2);
                if (value.score < bestScore) {
                    bestScore = value.score;
                    bestMove.index = availSpots[i];
                    bestMove.score = bestScore;
                }
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = { size: null, player: null };
            playerZeroMocks[index] = {
                ...playerZeroMocks[index],
                show: true,
            }
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) {


                break;
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

            newBoard[availSpots[i]] = { ...newBoard[availSpots[i]], player, size: size };
            playerOneMocks[index] = {
                ...playerOneMocks[index],
                show: false
            }
            // console.log('-----1-----')
            // printPlayer0(newBoard)
            for (var j = 0; j < p0Sizes.length; j++) {

                // var value = minimax2(newBoard, depth + 1, alpha, beta, bot_mark, playerZeroMocks, playerOneMocks, p0Sizes[j].size, p0Sizes[j].index);
                var value = minimax2(newBoard, depth + 1, alpha, beta, bot_mark, playerZeroMocks, playerOneMocks, 2, 2);

                if (value.score > bestScore) {
                    bestScore = value.score;
                    bestMove.index = availSpots[i];
                    bestMove.score = bestScore;
                }
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = { size: null, player: null };
            playerOneMocks[index] = {
                ...playerOneMocks[index],
                show: true
            }

            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {


                break;
            }


            return bestMove;
        }

    }
}
