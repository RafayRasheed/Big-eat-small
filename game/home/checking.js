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



function findInd(dummyBoard, id) {
    return dummyBoard.findIndex(x => x.id == id)
}
function printPlayer0(newBoa){
    const newBoard =[]
    newBoa.map((it)=>{
        newBoard.push(it.player)
    })
    console.log(newBoard[0], newBoard[1], newBoard[2])
    console.log(newBoard[3], newBoard[4], newBoard[5])
    console.log(newBoard[6], newBoard[7], newBoard[8])
}

export function minimax0(newBoard0, player, full) {
    const newBoard= []
    newBoard0.map((it)=>{
        newBoard.push(it)
    }) 
       // const newBoard = [...newBoard1]
    const aiPlayer = 0
    const huPlayer = 1
    let availSpots = emptySquares(newBoard);
    
    if (checkWin(newBoard, huPlayer, full)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer, full)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    let moves = [];
    // return 'yes'
    for (let i = 0; i < availSpots.length; i++) {
        const sing= availSpots[i]
        const ind= findInd(newBoard, sing.id)
        
        let move = {};
         
        // move = newBoard[ind];
        move.index=newBoard[ind]
        move.size = 1
        newBoard[ind].player = player;
        console.log('*************' )
        printPlayer(newBoard)
        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer, full);
         
            move.score = result.score;
            console.log('bestMove0' , move.score)

        } else {
            let result = minimax(newBoard, aiPlayer, full);
            move.score = result.score;
            console.log('bestMove1' , move.score)

        }


        newBoard[ind] = move.index;
        console.log('==============', move)
        printPlayer(newBoard)

        moves.push(move);
    }

    // return
    
    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;

            }
        }
    }

    return moves[bestMove];
}
function checkWin(board, player) {

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}
function emptySquares(newBoard) {
    // console.log(dummyBoard2)

    return newBoard.filter(x =>  typeof x == 'number')
    // return newBoard.filter(x =>  x.player == null)
}
function printPlayer(newBoa){
    const newBoard =[]
    newBoa.map((it)=>{
        newBoard.push(it)
    })
    console.log(newBoard[0], newBoard[1], newBoard[2])
    console.log(newBoard[3], newBoard[4], newBoard[5])
    console.log(newBoard[6], newBoard[7], newBoard[8])
}
export function minimax(newBoard0, player) {
    const newBoard= []
    newBoard0.map((it)=>{
        newBoard.push(it)
    }) 
       // const newBoard = [...newBoard1]
    const aiPlayer = 'red'
    const huPlayer = 'blue'
    let availSpots = emptySquares(newBoard);
    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    let moves = [];
    // return 'yes'
    for (let i = 0; i < availSpots.length; i++) {
        // if(i==0){

            const ind= availSpots[i]
            
            let move = {};
             
            move.index=newBoard[ind]
            newBoard[ind] = player;
            // console.log(newBoard)
    
            // console.log('*************' )
            // printPlayer(newBoard)
            if (player == aiPlayer) {
                let result = minimax(newBoard, huPlayer, full);
             
                move.score = result.score;
                // console.log('bestMove0' , move.score)
    
            } else {
                let result = minimax(newBoard, aiPlayer, full);
                move.score = result.score;
                // console.log('bestMove1' , move.score)
    
            }
    
    
            // newBoard[ind] = move.index;v
            // printPlayer(newBoard)
    
            moves.push(move);
        // }
    }

    // return
    
    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;

            }
        }
    }

    return moves[bestMove];
}
