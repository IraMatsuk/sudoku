function findNextEmptyCell(matrix, i, j) {
  var obj = {
    i: 0,
    j: 0
  };

  for (var row = i; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (matrix[row][column] == 0) {
        obj.i = row;
        obj.j = column;
        return obj;
      } 
    }  
  }
  
  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (matrix[row][column] == 0) {
        obj.i = row;
        obj.j = column;
        return obj;
      } 
    }  
  }
  obj.i = -1;
  obj.j = -1;
  return obj;
}

function isValid(matrix, i, j, k) {
  var rowValid = false;
  var columnValid = false;

  for (let column = 0; column < 9; column++) {
    if (k == matrix[i][column]) {
      rowValid = false;
      break;
    }
    else {
      rowValid = true;
    }
  }

  if (rowValid) {
    for (let row = 0; row < 9; row++) {
      if (k == matrix[row][j]) {
        columnValid = false;
        break;
      }
      else {
        columnValid = true;
      }
    }
    if (columnValid) {
      var sectionTopX = Math.floor(i/3)*3;
      var sectionTopY = Math.floor(j/3)*3;

      for (let row = sectionTopX; row < sectionTopX+3; row++) {
        for (let column = sectionTopY; column < sectionTopY+3; column++) {
          if (matrix[row][column] == k) {
            return false;
          }
        }
      }
      return true;
    }
  }
  return false;
}

function solveSudokuRecursively(matrix, i, j) {
  var obj = findNextEmptyCell(matrix, i, j);
  i = obj.i; // install current position in the matrix
  j = obj.j;

  if(obj.i == -1) {
    return true; // sudoku is solved, matrix does not have zeros
  }

  for (let k = 1; k < 10; k++) {
    if(isValid(matrix, i, j, k)) {
      matrix[i][j] = k; // save a valid number for the row, column, section to matrix
      if (solveSudokuRecursively(matrix, i, j)) { // continue to solve the sudoku
        return true; // sudoku is solved
      }
      matrix[i][j] = 0;
    }
  }

  return false;
}

module.exports = function solveSudoku(matrix) {
  var i = 0, j = 0;
   
  solveSudokuRecursively(matrix, i, j);
  return matrix;
}