function columnCheck(arr ,player) {
    for (let i = 0; i <= arr.length - 4; i++) {
        if (arr[i] === arr[i + 1] && arr[i] === arr[i + 2] && arr[i] === arr[i + 3]) {
            if (arr[i]=== player) {
              return true
            }
        }
    }
    return false;
}
  
function rowCheck(matrix, player) {
    for (let i = 0; i < matrix.length-3; i++) {
      for (let j=matrix[i].length-1; j>=0; j--) {
        if (matrix[i][j]=== matrix[i+1][j] && 
          matrix[i][j] === player && 
          matrix[i+1][j]=== matrix[i+2][j] && 
          matrix[i+2][j]=== matrix[i+3][j] ) {
            return true
          } 
        
        
      }
    }
    return false
}
  
function     diagonalCheck(matrix, player) {
    const rows = matrix.length;
    const cols = matrix[0].length;

   
    for (let i = 0; i <= rows - 4; i++) {
        for (let j = 0; j <= cols - 4; j++) {
            if (
                matrix[i][j] === matrix[i + 1][j + 1] &&
                matrix[i][j] === matrix[i + 2][j + 2] &&
                matrix[i][j] === matrix[i + 3][j + 3] && matrix[i][j] === player
            ) {
                return true;
            }
        }
    }

    
    for (let i = 0; i <= rows - 4; i++) {
        for (let j = cols - 1; j >= 3; j--) {
            if (
                matrix[i][j] === matrix[i + 1][j - 1] &&
                matrix[i][j] === matrix[i + 2][j - 2] &&
                matrix[i][j] === matrix[i + 3][j - 3] && matrix[i][j] === player
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkWin(connec4_board, currentPlayer) {


    if (rowCheck(connec4_board, currentPlayer)=== true) {
      return true
      
    } else if(diagonalCheck(connec4_board, currentPlayer) === true) {
        return true
    }

    for (let i=0; i<connec4_board.length; i++) {
      if (columnCheck(connec4_board[i], currentPlayer) === true) {
        return true
            
      }
    }
    
      
      
}


export {checkWin}