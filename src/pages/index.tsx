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
    //start from random number 1-9 and dont repeat

    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    for (let i = 0; i < nums.length; i++) {
      if (checkSpec(row, col, nums[i])) {
        array[row][col] = nums[i];
        filledArray[row][col] = nums[i];
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
    document.getElementById("overlay")!.style.display = "flex";
    document.getElementById("overlay")!.style.flexDirection = "column";
    document.getElementById("overlay")!.style.alignItems = "center";
    document.getElementById("overlay")!.style.justifyContent = "center";
  };

  solveSudoku();
  removeKDigits(40);

  return (
    <main className="flex flex-col items-center">
      <div id="overlay" className="absolute z-10 hidden h-full w-full">
        <div className="flex flex-col items-center text-3xl">
          <p>You Have</p>
          <span className="text-8xl text-green-500">WON</span>
          <button
            className="absolute bottom-12 mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      </div>
      <h1 className=" mt-10 text-4xl font-bold">
        Welcome to <span className=" text-green-400">Sudoku</span>!
      </h1>
      <div className="mt-10 text-xl">
        {array.map((row, i) => (
          <div className="flex flex-row">
            {row.map((col, j) => (
              <div
                //add green-400 border at bottom of first and second 3rd row and right of first and 3rd col and add white border to all
                className={`border ${
                  i % 3 === 2 && i !== 8 ? "border-b-8 border-b-green-400 " : ""
                } ${j % 3 === 2 && j !== 8 ? "border-r-8 border-r-green-400 " : ""}`}
              >
                {col === " " ? (
                  <input
                    className="h-14 w-14 text-center"
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
                  <p className="h-14 w-14 text-center flex flex-col justify-center items-center">{col}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
        onClick={() => {
          if (compare(array, filledArray).length === 0) {
            setWin();
          } else {
            alert("You have not completed the sudoku");
          }
        }}
      >
        Check
      </button>
    </main>
  );
};

export default Home;
