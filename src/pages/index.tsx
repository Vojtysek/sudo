import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  //Sudoku rules
  //1. Each row must contain the numbers 1-9 without repetition.
  //2. Each column must contain the numbers 1-9 without repetition.
  //3. Each of the nine 3x3 sub-boxes of the grid must contain the numbers 1-9 without repetition.

  const n = 9;
  let array: any[][] = new Array(n).fill(0).map(() => new Array(n).fill(" "));

  let filledArray: any[][] = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(" "));

  const checkSpecRow = (row: number, col: number, num: number) => {
    for (let i = 0; i < n; i++) {
      if (array[row][i] === num) {
        return false;
      }
    }
    return true;
  };

  const checkSpecCol = (row: number, col: number, num: number) => {
    for (let i = 0; i < n; i++) {
      if (array[i][col] === num) {
        return false;
      }
    }
    return true;
  };

  const checkSpecBox = (row: number, col: number, num: number) => {
    let rowStart = row - (row % 3);
    let colStart = col - (col % 3);
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (array[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const checkSpec = (row: number, col: number, num: number) => {
    return (
      checkSpecRow(row, col, num) &&
      checkSpecCol(row, col, num) &&
      checkSpecBox(row, col, num)
    );
  };

  const solveSudoku = () => {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (array[i][j] === " ") {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }
    if (isEmpty) {
      return true;
    }
    for (let num = 1; num <= n; num++) {
      if (checkSpec(row, col, num)) {
        array[row][col] = num;
        filledArray[row][col] = num;
        if (solveSudoku()) {
          return true;
        } else {
          array[row][col] = " ";
          filledArray[row][col] = " ";
        }
      }
    }
    return false;
  };

  const removeKDigits = (k: number) => {
    let count = k;
    while (count !== 0) {
      let cellId = Math.floor(Math.random() * (n * n) + 1);
      let i = Math.floor((cellId - 1) / n);
      let j = (cellId - 1) % 10;
      if (j !== 0) {
        j = j - 1;
      }
      if (array[i][j] !== " ") {
        count--;
        array[i][j] = " ";
      }
    }
  };

  const compare = (arr1: any[][], arr2: any[][]) => {
    //Compare and return the umatched values
    let unmatched = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          unmatched.push(arr1[i][j]);
        }
      }
    }
    return unmatched;
  };

  const setWin = () => {
    document.getElementById("overlay")!.style.display = "flex"
    document.getElementById("overlay")!.style.flexDirection = "column"
    document.getElementById("overlay")!.style.alignItems = "center"
    document.getElementById("overlay")!.style.justifyContent = "center"
  }

  solveSudoku();
  removeKDigits(0);

  return (
    <main className="flex flex-col items-center">
      <div id="overlay" className="absolute z-10 hidden w-full h-full">
        <div className="flex flex-col items-center text-3xl">
        <p>You Have</p> 
        <span className="text-green-500 text-8xl">WON</span>
        <button className="absolute bottom-12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => window.location.reload()}>Play Again</button>
        </div>
      </div>
      <h1 className=" mt-10 text-4xl font-bold">
        Welcome to <span className=" text-green-400">Sudoku</span>!
      </h1>
      <div className="mt-10 text-xl">
        {/* Render sudoku array and if the col is " " add input */}
        {array.map((row, i) => (
          <div className="flex flex-row">
            {/* If won show You Won text */}
            {row.map((col, j) => (
              <div className="flex h-8 w-8 items-center justify-center border sm:h-16 sm:w-16">
                {col === " " ? (
                  <input
                    className="h-10 w-10 text-center"
                    maxLength={1}
                    type="text"
                    onChange={(e) => {
                      //Check if the input is a number and not 0
                      if (
                        isNaN(Number(e.target.value)) ||
                        Number(e.target.value) === 0
                      ) {
                        e.target.value = "";
                      } else {
                        array[i][j] = Number(e.target.value);
                      }
                    }}
                  />
                ) : (
                  col
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="mt-10 text-xl rounded-md bg-green-400 p-2 text-white"
        onClick={() => {
          compare(array, filledArray).length === 0
          // flex col and items center  and justify center
            ? setWin()
            : alert("You have not won yet!");
        }}
      >
        Check
      </button>
    </main>
  );
};

export default Home;
