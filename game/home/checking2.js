

const origBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let current = 'Z'
let s = 1 
function checkWin(board, player)
{
    var winning_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
    var gameWon = null;
    var score = 0;
    var i;

    for(i = 0; i<winning_combos.length; i++)
    {
        score = 0;
        for(var j = 0; j<3; j++)
        {
            if(board[winning_combos[i][j]] == player)
                score++;
            else
                break;
        }
        if(score == 3)
        {
            gameWon = {index: i, player : player};
            break;
        }
    }
    return gameWon;
}
export function minimax2(newBoard, depth, alpha, beta, player)
{
    opponent_mark = 'Z'
    player_mark = 'X'
    // calculating the playable spots in a board state
    var availSpots = [];
    for(var i=0; i<newBoard.length; i++)
    {
        if(newBoard[i] == 0)
            availSpots.push(i);
    }

    // if terminal state reaches, return with the score
    if(checkWin(newBoard, opponent_mark)) //let opponent(ai) be the minimizer
        return {score: -20+depth};
    else if(checkWin(newBoard, player_mark)) // let player1(human) be the maximiser
        return {score: 20-depth};
    else if(availSpots.length == 0) // tie 
        return {score: 0};


    //if it is the ai's turn, lowest score (as we have taken ai as the minimiser)
    if(player === opponent_mark)
    {
        var bestScore = 10000;
        var bestMove = {};
        for(var i = 0; i < availSpots.length; i++)
        {
            newBoard[availSpots[i]] = player; // set the empty spot to the current player
            
            var value = minimax2(newBoard, depth+1, alpha, beta, player_mark);
            if(value.score < bestScore)
            {
                bestScore = value.score;
                bestMove.index = availSpots[i];
                bestMove.score = bestScore;
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = 0;

            beta = Math.min(beta,bestScore);
            if(beta <= alpha)
                break;
        }
        return bestMove;
    }
    else // else highest score (as human player is the maximiser)
    {
        var bestScore = -10000;
        var bestMove = {};
        for(var i = 0; i < availSpots.length; i++)
        {
            newBoard[availSpots[i]] = player; // set the empty spot to the current player

            var value = minimax2(newBoard, depth+1, alpha, beta, opponent_mark);
            if(value.score > bestScore)
            {
                bestScore = value.score;
                bestMove.index = availSpots[i];
                bestMove.score = bestScore;
            }

            // reset the spot to empty for the next loop itereration
            newBoard[availSpots[i]] = 0;

            alpha = Math.max(alpha,bestScore);
            if(beta <= alpha)
                break;    
        }
        return bestMove;
    }
}
function mak(){
    
const i = minimax2(origBoard, 0, -10000, 10000,current).index
console.log('-----------------------------',i)
origBoard[i] = current
console.log(origBoard[0], origBoard[1], origBoard[2])
console.log(origBoard[3], origBoard[4], origBoard[5])
console.log(origBoard[6], origBoard[7], origBoard[8])
current=current =='Z'?'X':'Z'
s+=1
if(s<9){
    mak()
}

}
