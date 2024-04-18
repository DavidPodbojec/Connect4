#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <cstring>

char maximiser = '2';
char minimiser = '1';
char board[6][7];
int MAXDEPTH = 7;

void print() {
	std::vector<std::vector<char>> matrix;
    for (int i = 0; i < 7; i++) {
		std::vector<char> matrix_row;
        
        for (int j = 0; j < 6; j++) {
			matrix_row.push_back(board[j][i]); 
            
        }
		matrix.push_back(matrix_row);
    }
    std::cout << "[";

    for (int i = 0; i < matrix.size(); ++i) {
        std::cout << "[";
        for (int j = 0; j < matrix[i].size(); ++j) {
            if (j +1 == matrix[i].size()) {
                std::cout << matrix[i][j];
            } else {
                std::cout << matrix[i][j] << ",";
            }
        }
        
        if (i == matrix.size()-1) {
            std::cout << "]";
        } else {
            std::cout << "],";
        }
    }
    std::cout << "]" << std::endl;
}


bool nomovesleft() {
    for (int i = 0; i < 7; i++) {
        if (board[0][i] == '0') {
            return false;
        }
    }
    return true;
}

bool wins(char c) {
    // horizontal
    for (int i = 0; i < 6; i++) {
        for (int j = 0; j < 4; j++) {
            if (board[i][j] == c && board[i][j + 1] == c && board[i][j + 2] == c && board[i][j + 3] == c) {
                return true;
            }
        }
    }

    // vertical
    for (int j = 0; j < 7; j++) {
        for (int i = 0; i < 3; i++) {
            if (board[i][j] == c && board[i + 1][j] == c && board[i + 2][j] == c && board[i + 3][j] == c) {
                return true;
            }
        }
    }

    // diagonal
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            if (board[i][j] == c && board[i + 1][j + 1] == c && board[i + 2][j + 2] == c && board[i + 3][j + 3] == c) {
                return true;
            }
        }
    }
    for (int i = 0; i < 3; i++) {
        for (int j = 6; j >= 3; j--) {
            if (board[i][j] == c && board[i + 1][j - 1] == c && board[i + 2][j - 2] == c && board[i + 3][j - 3] == c) {
                return true;
            }
        }
    }

    return false;
}

void Insert(int col, char c) {
    for (int i = 5; i >= 0; i--) {
        if (board[i][col] == '0') {
            board[i][col] = c;
            return;
        }
    }
}

void Remove(int col) {
    for (int i = 0; i < 6; i++) {
        if (board[i][col] != '0') {
            board[i][col] = '0';
            return;
        }
    }
}

int count2s(char c) {
    // horizontal
    int count = 0;
    for (int i = 0; i < 6; i++) {
        for (int j = 0; j < 6; j++) {
            if (j > 0 && board[i][j - 1] == '0' && board[i][j] == c && board[i][j + 1] == c) {
                count++;
            } else if (j < 5 && board[i][j] == c && board[i][j + 1] == c && board[i][j + 2] == '0') {
                count++;
            }
        }
    }

    // vertical
    for (int j = 0; j < 7; j++) {
        for (int i = 1; i < 5; i++) {
            if (board[i - 1][j] == '0' && board[i][j] == c && board[i + 1][j] == c) {
                count++;
            }
        }
    }

    // diagonal
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 6; j++) {
            if (j > 0 && i > 0 && board[i - 1][j - 1] == '0' && board[i][j] == c && board[i + 1][j + 1] == c) {
                count++;
            } else if (j < 5 && i < 4 && board[i][j] == c && board[i + 1][j + 1] == c && board[i + 2][j + 2] == '0') {
                count++;
            }
        }
    }
    for (int i = 0; i < 5; i++) {
        for (int j = 6; j >= 1; j--) {
            if (j < 6 && i > 0 && board[i - 1][j + 1] == '0' && board[i][j] == c && board[i + 1][j - 1] == c) {
                count++;
            } else if (j > 1 && i < 4 && board[i][j] == c && board[i + 1][j - 1] == c && board[i + 2][j - 2] == '0') {
                count++;
            }
        }
    }

    return count;
}

int count3s(char c) {
    // horizontal
    int count = 0;
    for (int i = 0; i < 6; i++) {
        for (int j = 0; j < 5; j++) {
            if (j > 0 && board[i][j - 1] == '0' && board[i][j] == c && board[i][j + 1] == c && board[i][j + 2]) {
                count++;
            } else if (j < 4 && board[i][j] == c && board[i][j + 1] == c && board[i][j + 2] == c && board[i][j + 3] == '0') {
                count++;
            }
        }
    }

    // vertical
    for (int j = 0; j < 7; j++) {
        for (int i = 1; i < 4; i++) {
            if (board[i - 1][j] == '0' && board[i][j] == c && board[i + 1][j] == c && board[i + 2][j] == c) {
                count++;
            }
        }
    }

    // diagonall
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 5; j++) {
            if (j > 0 && i > 0 && board[i - 1][j - 1] == '0' && board[i][j] == c && board[i + 1][j + 1] == c && board[i + 2][j + 2] == c) {
                count++;
            } else if (j < 4 && i < 3 && board[i][j] == c && board[i + 1][j + 1] == c && board[i + 2][j + 2] == c && board[i + 3][j + 3] == '0') {
                count++;
            }
        }
    }
    for (int i = 0; i < 4; i++) {
        for (int j = 6; j >= 2; j--) {
            if (j < 6 && i > 0 && board[i - 1][j + 1] == '0' && board[i][j] == c && board[i + 1][j - 1] == c && board[i + 2][j - 2] == c) {
                count++;
            } else if (j > 2 && i < 3 && board[i][j] == c && board[i + 1][j - 1] == c && board[i + 2][j - 2] == c && board[i + 3][j - 3] == '0') {
                count++;
            }
        }
    }

    return count;
}

int minimax(int depth, char c, int alpha, int beta) {
    if (wins(maximiser)) {
        return 100 - depth;
    } else if (wins(minimiser)) {
        return -100 + depth;
    } else if (nomovesleft()) {
        return 0;
    }

    if (depth >= MAXDEPTH) {
        return 5 * (count2s(maximiser) - count2s(minimiser)) + 10 * (count3s(maximiser) - count3s(minimiser));
    }

    int curbest, value;
    if (c == maximiser) {
        curbest = -100;
        for (int j = 0; j < 7; j++) {
            if (board[0][j] == '0') {
                Insert(j, maximiser);
                curbest = std::max(curbest, minimax(depth + 1, minimiser, alpha, beta));
                Remove(j);
                alpha = std::max(alpha, curbest);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        return curbest;
    } else {
        curbest = 100;
        for (int j = 0; j < 7; j++) {
            if (board[0][j] == '0') {
                Insert(j, minimiser);
                curbest = std::min(curbest, minimax(depth + 1, maximiser, alpha, beta));
                Remove(j);
                beta = std::min(beta, curbest);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        return curbest;
    }
}

int findmove() {
    int curmove;
    int curbest = -100, value;

    for (int j = 0; j < 7; j++) {
        if (board[0][j] == '0') {
            Insert(j, maximiser);
            value = minimax(0, minimiser, -1000, 1000);
            if (value > curbest) {
                curbest = value;
                curmove = j;
            }
            Remove(j);
        }
    }
    return curmove;
}
int main(int argc, char* argv[]){
	if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <matrix_string>" << std::endl;
        return 1; 
    }

    std::string matrixString = argv[1];
	int bestmove;

	int index = 1;
    int times = 0;

	std::vector<std::vector<char>> turnedBoard; 

    while (times < 7) {
        
        std::vector<char> turnedRow; 
        for (int i = index; i < matrixString.length(); i++) {
            if (matrixString[i] == '[' || matrixString[i] == ',') {
                continue;
                   
            
        } else if (matrixString[i] == ']') {
            turnedBoard.push_back(turnedRow);
            index = i;
            break;

        }else {
            turnedRow.push_back(matrixString[i]);
        }             
                

    }
    index+=3;
    times++;    
    
    } 
	
	int x_index = 0;
	int y_index = 0;
	for (int i = 0; i < 6; i++ ) {
		
		for (int j = 0; j < 7; j++ ) {
			board[x_index][y_index] = turnedBoard[j][i];
			y_index++;
			

		}
		x_index++;
		y_index = 0;
		
	}

	bestmove=findmove();
	Insert(bestmove, maximiser);
	print();
	
	
	
	return 0;
}