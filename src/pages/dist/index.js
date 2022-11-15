"use strict";
exports.__esModule = true;
var Home = function () {
    //Sudoku rules
    //1. Each row must contain the numbers 1-9 without repetition.
    //2. Each column must contain the numbers 1-9 without repetition.
    //3. Each of the nine 3x3 sub-boxes of the grid must contain the numbers 1-9 without repetition.
    var n = 9;
    var array = new Array(n)
        .fill(0)
        .map(function () { return new Array(n).fill(" "); });
    var checkSpecRow = function (row, col, num) {
        for (var i = 0; i < n; i++) {
            if (array[row][i] === num) {
                return false;
            }
        }
        return true;
    };
    var checkSpecCol = function (row, col, num) {
        for (var i = 0; i < n; i++) {
            if (array[i][col] === num) {
                return false;
            }
        }
        return true;
    };
    var checkSpecBox = function (row, col, num) {
        var rowStart = row - (row % 3);
        var colStart = col - (col % 3);
        for (var i = rowStart; i < rowStart + 3; i++) {
            for (var j = colStart; j < colStart + 3; j++) {
                if (array[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    };
    var checkSpec = function (row, col, num) {
        return (checkSpecRow(row, col, num) &&
            checkSpecCol(row, col, num) &&
            checkSpecBox(row, col, num));
    };
    var solveSudoku = function () {
        var row = -1;
        var col = -1;
        var isEmpty = true;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
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
        for (var num = 1; num <= n; num++) {
            if (checkSpec(row, col, num)) {
                array[row][col] = num;
                if (solveSudoku()) {
                    return true;
                }
                else {
                    array[row][col] = " ";
                }
            }
        }
        return false;
    };
    var removeKDigits = function (k) {
        var count = k;
        while (count !== 0) {
            var cellId = Math.floor(Math.random() * (n * n) + 1);
            var i = Math.floor((cellId - 1) / n);
            var j = (cellId - 1) % 10;
            if (j !== 0) {
                j = j - 1;
            }
            if (array[i][j] !== " ") {
                count--;
                array[i][j] = " ";
            }
        }
    };
    solveSudoku();
    removeKDigits(40);
    return (React.createElement("main", { className: "mt-10 flex flex-col items-center" },
        React.createElement("h1", { className: "text-4xl font-bold" },
            "Welcome to ",
            React.createElement("span", { className: " text-green-400" }, "Sudoku"),
            "!"),
        React.createElement("div", { className: "mt-10 text-xl" }, array.map(function (row, i) { return (React.createElement("div", { className: "flex flex-row" }, row.map(function (col, j) { return (React.createElement("div", { className: "border border-black w-10 h-10 flex justify-center items-center" }, col === " " ? (React.createElement("input", { className: "w-10 h-10 text-center", type: "number", min: "1", max: "9" })) : (col))); }))); }))));
};
exports["default"] = Home;
