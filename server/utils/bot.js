const { spawn } = require('child_process');
const path = require('path');


function getMatrixSum(matrix) {
  return new Promise((resolve, reject) => {
    
    const command = path.join(__dirname, '../algorithm/algorithm.exe');
    const args = [`[${matrix[0]}],[${matrix[1]}],[${matrix[2]}],[${matrix[3]}],[${matrix[4]}],[${matrix[5]}],[${matrix[6]}]`]; 

    const cplusplusProcess = spawn(command, args);

    let result = '';

    
    cplusplusProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    
    cplusplusProcess.on('close', (code) => {
      if (code === 0) {
        
        resolve(result.trim()); 
      } else {
        reject(`C++ program exited with code ${code}`);
      }
    });
  });
}


module.exports = getMatrixSum;