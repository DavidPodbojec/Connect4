function noMoves(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

export {noMoves}