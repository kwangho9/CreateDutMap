var consoleWin = undefined;

// 자동 실행 함수
$(document).ready(function() {
    // console용 popup window를 생성한다.
    consoleWin = window.open('/console', 'Console Window', 'width=640, height=480, location=no, directories=no, status=no, toolbar=no, scrollbars= no, target=_blank');
    // popup window에 html을 작성한다. -> textarea
    consoleWin.document.write('<!DOCTYPE html><html><head><title>Console Window</title></head><body><center><textarea id="console" cols="82" rows="27" readonly style="resize:none;"></textarea></br><b>Console Terminal</b></center></body></html>');

    // textarea에 모든 내용을 clear한다.
    consoleWin.document.getElementById('console').value = '';

    dbgout('open console window!\n');
});


/*
var SwitchMap = [
    // PS1030 Switch Map.
    [
        // signal number : 1 -> Single Switch Select 명령으로 제어한다.
        [
            [0], [1], [2], [3], [4], [5], [6], [7], [8], [9],
            [10], [11], [12], [13], [14], [15], [16], [17], [18], [19],
            [20], [21], [22], [23], [24], [25], [26], [27], [28], [29]
        ],
        // signal number : 2 -> Group-4, Row & Column Select 명령으로 제어한다.
        [
            [0, 1], [2, 3], [4, 5], [6, 7], [8, 9],
            [10, 11], [12, 13], [14, 15], [16, 17], [18, 19],
            [20, 21], [22, 23], [24, 25], [26, 27], [28, 29]
        ],
        // signal number : 3 -> Group-10, Row Select 명령으로 제어한다.
        [
            [0, 10, 20], [1, 11, 21],
            [2, 12, 22], [3, 13, 23],
            [4, 14, 24], [5, 15, 25],
            [6, 16, 26], [7, 17, 27],
            [8, 18, 28], [9, 19, 29]
        ],
        // signal number : 4 -> Group-4, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3], [4, 5, 6, 7],
            [8, 9, 10, 11], [12, 13, 14, 15],
            [16, 17, 18, 19], [20, 21, 22, 23],
            [24, 25, 26, 27]
        ],
        // signal number : 5 -> Group-6, Row Select 명령으로 제어한다.
        [
            [0, 6, 12, 18, 24], [1, 7, 13, 19, 25],
            [2, 8, 14, 20, 26], [3, 9, 15, 21, 27],
            [4, 10, 16, 22, 28], [5, 11, 17, 23, 29]
        ],
        // signal number : 6 -> Group-6, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29]
        ],
        // signal number : 7 -> Group-16, Column & Row Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12, 13],
            [16, 17, 18, 19, 20, 21, 22],
            [23, 24, 25, 26, 27, 28, 29]
        ],
        // signal number : 8 -> Group-8, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22, 23]
        ],
        // signal number : 9 -> Group-10, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8],
            [10, 11, 12, 13, 14, 15, 16, 17, 18],
            [20, 21, 22, 23, 24, 25, 26, 27, 28]
        ],
        // signal number : 10 -> Group-10, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        ],
        // signal number : 11 -> Group-12, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
        ],
        // signal number : 12 -> Group-12, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        ],
        // signal number : 13 -> Group-16, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        ],
        // signal number : 14 -> Group-16, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        ],
        // signal number : 15 -> Group-10, Column Select 명령으로 제어한다.
        [
            [0, 10, 20, 1, 11, 21, 2, 12, 22, 3, 13, 23, 4, 14, 24],
            [5, 15, 25, 6, 16, 26, 7, 17, 27, 8, 18, 28, 9, 19, 29]
        ],
        // signal number : 16 -> Group-16, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        ]
    ],
    // PS1060 Switch Map.
    [
        // signal number : 1 -> Group-x, Single Switch Select 명령으로 제어한다.
        [
            [0], [1], [2], [3], [4], [5], [6], [7], [8], [9],
            [10], [11], [12], [13], [14], [15], [16], [17], [18], [19],
            [20], [21], [22], [23], [24], [25], [26], [27], [28], [29],
            [30], [31], [32], [33], [34], [35], [36], [37], [38], [39],
            [40], [41], [42], [43], [44], [45], [46], [47], [48], [49],
            [50], [51], [52], [53], [54], [55], [56], [57], [58], [59]
        ],
        // signal number : 2 -> Group-4, Column & Row Select 명령으로 제어한다.
        [
            [0, 1], [2, 3], [4, 5], [6, 7], [8, 9],
            [10, 11], [12, 13], [14, 15], [16, 17], [18, 19],
            [20, 21], [22, 23], [24, 25], [26, 27], [28, 29],
            [30, 31], [32, 33], [34, 35], [36, 37], [38, 39],
            [40, 41], [42, 43], [44, 45], [46, 47], [48, 49],
            [50, 51], [52, 53], [54, 55], [56, 57], [58, 59]
        ],
        // signal number : 3 -> Group-6, Column & Row Select 명령으로 제어한다.
        [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11],
            [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23],
            [24, 25, 26], [27, 28, 29], [30, 31, 32], [33, 34, 35],
            [36, 37, 38], [39, 40, 41], [42, 43, 44], [45, 46, 47],
            [48, 49, 50], [51, 52, 53], [54, 55, 56], [57, 58, 59]
        ],
        // signal number : 4 -> Group-4, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11],
            [12, 13, 14, 15], [16, 17, 18, 19], [20, 21, 22, 23],
            [24, 25, 26, 27], [28, 29, 30, 31], [32, 33, 34, 35],
            [36, 37, 38, 39], [40, 41, 42, 43], [44, 45, 46, 47],
            [48, 49, 50, 51], [52, 53, 54, 55], [56, 57, 58, 59]
        ],
        // signal number : 5 -> Group-12, Row Select 명령으로 제어한다.
        [
            [0, 12, 24, 36, 48], [1, 13, 25, 37, 49],
            [2, 14, 26, 38, 50], [3, 15, 27, 39, 51],
            [4, 16, 28, 40, 52], [5, 17, 29, 41, 53],
            [6, 18, 30, 42, 54], [7, 19, 31, 43, 55],
            [8, 20, 32, 44, 56], [9, 21, 33, 45, 57],
            [10, 22, 34, 46, 58], [11, 23, 35, 47, 59]
        ],
        // signal number : 6 -> Group-6, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29], [30, 31, 32, 33, 34, 35],
            [36, 37, 38, 39, 40, 41], [42, 43, 44, 45, 46, 47],
            [48, 49, 50, 51, 52, 53], [54, 55, 56, 57, 58, 59]
        ],
        // signal number : 7 -> Group-8, Row Select 명령으로 제어한다.
        [
            [0, 8, 16, 24, 32, 40, 48], [1, 9, 17, 25, 33, 41, 49],
            [2, 10, 18, 26, 34, 42, 50], [3, 11, 19, 27, 35, 43, 51],
            [4, 12, 20, 28, 36, 44, 52], [5, 13, 21, 29, 37, 45, 53],
            [6, 14, 22, 30, 38, 46, 54], [7, 15, 23, 31, 39, 47, 55],
        ],
        // signal number : 8 -> Group-8, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29, 30, 31],
            [32, 33, 34, 35, 36, 37, 38, 39], [40, 41, 42, 43, 44, 45, 46, 47],
            [48, 49, 50, 51, 52, 53, 54, 55]
        ],
        // signal number : 9 -> Group-10, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8], [10, 11, 12, 13, 14, 15, 16, 17, 18], 
            [20, 21, 22, 23, 24, 25, 26, 27, 28], [30, 31, 32, 33, 34, 35, 36, 37, 38], 
            [40, 41, 42, 43, 44, 45, 46, 47, 48], [50, 51, 52, 53, 54, 55, 56, 57, 58]
        ],
        // signal number : 10 -> Group-10, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 
            [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 
            [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
        ],
        // signal number : 11 -> Group-12, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
            [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
            [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
        ],
        // signal number : 12 -> Group-12, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
            [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 45],
            [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
        ],
        // signal number : 13 -> Group-12, Row(3개) Select 명령으로 제어한다.
        [
            [0, 12, 24, 36, 48, 1, 13, 25, 37, 49, 2, 14, 26],
            [3, 15, 27, 39, 51, 4, 16, 28, 40, 52, 5, 17, 29],
            [6, 18, 30, 42, 54, 7, 19, 31, 43, 55, 8, 20, 32],
            [9, 21, 33, 45, 57, 10, 22, 34, 46, 58, 11, 23, 35]
        ],
        // signal number : 14 -> Group-12, Row(3개) Select 명령으로 제어한다.
        [
            [0, 12, 24, 36, 48, 1, 13, 25, 37, 49, 2, 14, 26, 38],
            [3, 15, 27, 39, 51, 4, 16, 28, 40, 52, 5, 17, 29, 41],
            [6, 18, 30, 42, 54, 7, 19, 31, 43, 55, 8, 20, 32, 44],
            [9, 21, 33, 45, 57, 10, 22, 34, 46, 58, 11, 23, 35, 47]
        ],
        // signal number : 15 -> Group-12, Row(3개) Select 명령으로 제어한다.
        [
            [0, 12, 24, 36, 48, 1, 13, 25, 37, 49, 2, 14, 26, 38, 50],
            [3, 15, 27, 39, 51, 4, 16, 28, 40, 52, 5, 17, 29, 41, 53],
            [6, 18, 30, 42, 54, 7, 19, 31, 43, 55, 8, 20, 32, 44, 56],
            [9, 21, 33, 45, 57, 10, 22, 34, 46, 58, 11, 23, 35, 47, 59]
        ],
        // signal number : 16 -> Group-16, Column Select 명령으로 제어한다.
        [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
        ]
    ],
    // PS1120 Switch Map.
    [
        // 2분기로 동작하는 Card에 대해서 Switch Map을 작성함.
        // signal number : 1
        [
            [0], [1], [2], [3], [4], [5], [6], [7],
            [10], [11], [12], [13], [14], [15], [16], [17],
            [20], [21], [22], [23], [24], [25], [26], [27],
            [30], [31], [32], [33], [34], [35], [36], [37],
            [40], [41], [42], [43], [44], [45], [46], [47],
            [50], [51], [52], [53], [54], [55], [56], [57],
            [60], [61], [62], [63], [64], [65], [66], [67],
            [70], [71], [72], [73], [74], [75], [76], [77],
            [80], [81], [82], [83], [84], [85], [86], [87],
            [90], [91], [92], [93], [94], [95], [96], [97],
            [100], [101], [102], [103], [104], [105], [106], [107],
            [110], [111], [112], [113], [114], [115], [116], [117]
        ],
        // signal number : 2
        [
            [0, 2], [1, 3], [4, 6], [5, 7],
            [10, 12], [11, 13], [14, 16], [15, 17],
            [20, 22], [21, 23], [24, 26], [25, 27],
            [30, 32], [31, 33], [34, 36], [35, 37],
            [40, 42], [41, 43], [44, 46], [45, 47],
            [50, 52], [51, 53], [54, 56], [55, 57],
            [60, 62], [61, 63], [64, 66], [65, 67],
            [70, 72], [71, 73], [74, 76], [75, 77],
            [80, 82], [81, 83], [84, 86], [85, 87],
            [90, 92], [91, 93], [94, 96], [95, 97],
            [100, 102], [101, 103], [104, 106], [105, 107],
            [110, 112], [111, 113], [114, 116], [115, 117]
        ],
        // signal number : 3
        [
            [0, 2, 4], [1, 3, 5],
            [6, 10, 12], [7, 11, 13],
            [14, 16, 20], [15, 17, 21],
            [22, 24, 26], [23, 25, 27],
            [30, 32, 34], [31, 33, 35],
            [36, 40, 42], [37, 41, 43],
            [44, 46, 50], [45, 47, 51],
            [52, 54, 56], [53, 55, 57],
            [60, 62, 64], [61, 63, 65],
            [66, 70, 72], [67, 71, 73],
            [74, 76, 80], [75, 77, 81],
            [82, 84, 86], [83, 85, 87],
            [90, 92, 94], [91, 93, 95],
            [96, 100, 102], [97, 101, 103],
            [104, 106, 110], [105, 107, 111],
            [112, 114, 116], [113, 115, 117]
        ],
        // signal number : 4
        [
            [0, 2, 4, 6], [1, 3, 5, 7],
            [10, 12, 14, 16], [11, 13, 15, 17],
            [20, 22, 24, 26], [21, 23, 25, 27],
            [30, 32, 34, 36], [31, 33, 35, 37],
            [40, 42, 44, 46], [41, 43, 45, 47],
            [50, 52, 54, 56], [51, 53, 55, 57],
            [60, 62, 64, 66], [61, 63, 65, 67],
            [70, 72, 74, 76], [71, 73, 75, 77],
            [80, 82, 84, 86], [81, 83, 85, 87],
            [90, 92, 94, 96], [91, 93, 95, 97],
            [100, 102, 104, 106], [101, 103, 105, 107],
            [110, 112, 114, 116], [111, 113, 115, 117]
        ],
        // signal number : 5
        [
            [0, 2, 4, 6, 10], [1, 3, 5, 7, 11],
            [12, 14, 16, 20, 22], [13, 15, 17, 21, 23],
            [24, 26, 30, 32, 34], [25, 27, 31, 33, 35],
            [36, 40, 42, 44, 46], [37, 41, 43, 45, 47],
            [50, 52, 54, 56, 60], [51, 53, 55, 57, 61],
            [62, 64, 66, 70, 72], [63, 65, 67, 71, 73],
            [74, 76, 80, 82, 84], [75, 77, 81, 83, 85],
            [86, 90, 92, 94, 96], [87, 91, 93, 95, 97],
            [100, 102, 104, 106, 110], [101, 103, 105, 107, 111]
        ],
        // signal number : 6
        [
            [0, 2, 4, 6, 10, 12], [1, 3, 5, 7, 11, 13],
            [14, 16, 20, 22, 24, 26], [15, 17, 21, 23, 25, 27],
            [30, 32, 34, 36, 40, 42], [31, 33, 35, 37, 41, 43],
            [44, 46, 50, 52, 54, 56], [45, 47, 51, 53, 55, 57],
            [60, 62, 64, 66, 70, 72], [61, 63, 65, 67, 71, 73],
            [74, 76, 80, 82, 84, 86], [75, 77, 81, 83, 85, 87],
            [90, 92, 94, 96, 100, 102], [91, 93, 95, 97, 101, 103],
            [104, 106, 110, 112, 114, 116], [105, 107, 111, 113, 115, 117]
        ],
        // signal number : 7
        // 2-branch : 12-DUT, All switch select command.
        [
            [0, 2, 4, 6, 10, 12, 14],
            [1, 3, 5, 7, 11, 13, 15],
            [20, 22, 24, 26, 30, 32, 34],
            [21, 23, 25, 27, 31, 33, 35],
            [40, 42, 44, 46, 50, 52, 54],
            [41, 43, 45, 47, 51, 53, 55],
            [60, 62, 64, 66, 70, 72, 74],
            [61, 63, 65, 67, 71, 73, 75],
            [80, 82, 84, 86, 90, 92, 94],
            [81, 83, 85, 87, 91, 93, 95],
            [100, 102, 104, 106, 110, 112, 114],
            [101, 103, 105, 107, 111, 113, 115],
        ],
        // signal number : 8
        [
            [0, 2, 4, 6, 10, 12, 14, 16],
            [1, 3, 5, 7, 11, 13, 15, 17],
            [20, 22, 24, 26, 30, 32, 34, 36],
            [21, 23, 25, 27, 31, 33, 35, 37],
            [40, 42, 44, 46, 50, 52, 54, 56],
            [41, 43, 45, 47, 51, 53, 55, 57],
            [60, 62, 64, 66, 70, 72, 74, 76],
            [61, 63, 65, 67, 71, 73, 75, 77],
            [80, 82, 84, 86, 90, 92, 94, 96],
            [81, 83, 85, 87, 91, 93, 95, 97],
            [100, 102, 104, 106, 110, 112, 114, 116],
            [101, 103, 105, 107, 111, 113, 115, 117]
        ],
    ],
];

const deviceSwitch = [30, 60, 120];
const validGroupForSignal = [
// signal : 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 -> group : 4(0), 6(1), 8(2), 10(3), 12(4), 16(5)
    [0, 0, 3, 0, 1, 1, 5, 2, 3, 3, 4, 2, 5, 5, 3, 5],     // PS1030
    [0, 0, 1, 0, 4, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5],     // PS1060
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]      // PS1120
];
*/

var maxBank;
var maxDUTs;
var device;
var signalsPerDut;
var DUTsPerBank;
var DUTsPerChip;
var CHIPsPerBank;
var usedSwitchMap;
// event 함수를 작성한다.
$(document).on('click', '#CreateDutMap', function(e) {
    device = parseInt($('#deviceName').val());
    maxDUTs = parseInt($('#maxDUTs').val());
    signalsPerDut = parseInt($('#signalsPerDut').val());
    DUTsPerBank = parseInt($('#DUTsPerBank').val());

//    dbgout(`DUTsPerBank = ${DUTsPerBank} -> `);
    if( (DUTsPerBank === undefined) || isNaN(DUTsPerBank) ) DUTsPerBank = 0;
    if( isNaN(maxDUTs) ) maxDUTs = 1024;
    if( isNaN(signalsPerDut) ) signalsPerDut = 7;
//    dbgout(`${DUTsPerBank}\n`);

//    dbgout(`typeof device = ${typeof(device)}\n`);
//    dbgout(`typeof maxDUTs = ${typeof(maxDUTs)}\n`);
//    dbgout(`typeof signalsPerDut = ${typeof(signalsPerDut)}\n`);
//    dbgout(`typeof DUTsPerBank = ${typeof(DUTsPerBank)}\n`);

    var name = $('#deviceName option:selected').text();
//    usedSwitchMap = SwitchMap[device][signalsPerDut-1];
    usedSwitchMap = SwitchMap[device][signalsPerDut-1][ validGroupForSignal[device][signalsPerDut-1] ];
    DUTsPerChip = usedSwitchMap.length;
    dbgout(`usedSwitchMap = ${usedSwitchMap}\n`);

    var str = 'CreateDutMap?';
    str += 'device=' + device.toString();
    str += '&maxDUTs=' + maxDUTs.toString();
    str += '&signalsPerDut=' + signalsPerDut.toString();
    str += '&DUTsPerBank=' + DUTsPerBank.toString();
//    dbgout(str);
    dbgout(`device = ${device}, max dut = ${maxDUTs}, signal number = ${signalsPerDut}, dut in bank = ${DUTsPerBank}\n`);

    usedSwitchMap.forEach(function(dut, index) {
        dbgout(`DUT[${index}] : ${dut}\n`);
    });

    if( device == 2 ) {
        DUTsPerChip = usedSwitchMap.length;
    } else {
        DUTsPerChip = Math.floor(deviceSwitch[device] / signalsPerDut);
    }
    if( DUTsPerBank > (DUTsPerChip * 8) ) {
        CHIPsPerBank = 8;
        DUTsPerBank = DUTsPerChip * CHIPsPerBank;
    } else {
        if( DUTsPerBank == 0 ) {
            CHIPsPerBank = 8;
            DUTsPerBank = DUTsPerChip * CHIPsPerBank;
        } else {
            CHIPsPerBank = Math.ceil(DUTsPerBank / DUTsPerChip);    // 소수점 올림.
//        CHIPsPerBank = Math.floor(DUTsPerBank / DUTsPerChip);    // 소수점 버림.
//        CHIPsPerBank = Math.round(DUTsPerBank / DUTsPerChip);    // 소수점 반올림.
        }
    }
    maxBank = Math.ceil(maxDUTs / DUTsPerBank);     // 올림.

    dbgout(`DUT number per Chip(${name}) = ${DUTsPerChip}\n`);
    dbgout(`Bank당 CHIP(${name})의 개수 : ${CHIPsPerBank}\n`);
    dbgout(`Max Bank = ${maxBank}\n`);

    if( (DUTsPerChip * 8) < DUTsPerBank ) {
        dbgout(`Not Support DUTs count in Bank\n`);
    } else {
        dbgout(`- unused DUTs in Bank : ${(DUTsPerChip * 8) - DUTsPerBank}\n`);
    }

    var total = 0;
    var used = 0;
//    dbgout(`typeof userd = ${typeof(used)}, ${typeof(signalsPerDut)}\n`);
    var nDut = 0;
    var nChip = 0;
    for(var bank=0; bank < maxBank; bank++) {
        for(var chip=0; chip < CHIPsPerBank; chip++) {
            total += deviceSwitch[device];//(Math.pow(2, device) * 30);
            for(var dut=0; dut < DUTsPerChip; dut++) {
                used += signalsPerDut;
                if( ++nDut == maxDUTs ) break;
            }
            if( nDut == maxDUTs ) break;
        }
        if( nDut == maxDUTs ) break;
//        dbgout(`total = ${total}, used = ${used}, nDut = ${nDut}\n`);
    }

    var s = '';
    s += ` * ${name}당 DUT의 개수 : ${DUTsPerChip}\n`;
    s += ` * Bank당 max DUT의 개수 : ${DUTsPerBank}\n`;
    s += ` * Bank(Site)당 ${name}의 개수 : ${CHIPsPerBank}\n`;
    s += ` * Total ${name} : ${Math.ceil(nDut / DUTsPerChip)}\n`;
    s += ` * Total FPGA Chip : ${(maxBank > 16) ? 2 : 1}(${3*maxBank} I/O)\n`;
    s += ` * Total Bank(Site) 개수 : ${maxBank}\n`;

    s += ` * Total Switch 사용율 : ${((used / total) * 100).toFixed(2)}%(${used}/${total})`;

    $('#summery').val(s);
    $('#summery').css("display", 'block');


    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.href+str, true);
    xhr.send();
    xhr.onreadystatechange=function() {
        if( xhr.readyState == 4 && xhr.status == 200 ) {
            var type = xhr.getResponseHeader('Content-Type');
            if( type.match(/^text/) ) { }
        }
    }

//    window.open(str, 'DUT Map', 'toolbar=no, menubar=no, width=640, height=480, location=no, status=no', true);
});

$(document).on('change', '#DUTsPerBank', function(e) {
//    dbgout(`type = ${e.type}, target value = ${e.target.value}\n`);
    var max = 255;

    // PS1030
    if( $('#deviceName').val() == 0 ) max = 240;

//    dbgout(`max = ${max}\n`);
    if( e.target.value > max ) $('#DUTsPerBank').val( max );
});

$(document).on('change', '#deviceName', function(e) {
    dbgout(`type = ${e.type}, target value = ${e.target.value}\n`);
    if( e.target.value == 0 ) {         // PS1030
//        $('#BranchLabel').css("display", "none");
        $('#DUTsPerBank').prop({"max" : 255});
    } else if( e.target.value == 1 ) {         // PS1060
//        $('#BranchLabel').css("display", "none");
    } else {                            // PS1120
//        $('#BranchLabel').css("display", "inline-block");
        $('#DUTsPerBank').prop({"max" : 240});
    }
});

//$(document).on('click', '#deviceName', function(e) {
//    dbgout(`type = ${e.type}, target value = ${e.target.value}\n`);
//});

var siteMapWindow = undefined;
$(document).on('click', '#ViewMap', function(e) {
    if( siteMapWindow != undefined )
        siteMapWindow.close();

    var str = '/CardMap?';
    str += 'device=' + $('#deviceName').val();
    str += '&maxDUTs=' + $('#maxDUTs').val();
    str += '&signalsPerDut=' + $('#signalsPerDut').val();
    str += '&DUTsPerBank=' + $('#DUTsPerBank').val();

    dbgout(str);

    // popup windows size.
    var w = 640;
    var h = 460;
    if( maxBank <= 16 ) {
        h = 40 + (maxBank * 50) + 200;
    } else {
        w = 1280;
        h = 40 + (maxBank * 25) + 200 + ((maxBank % 2) ? 25 : 0);
    }
    dbgout(`maxBank = ${maxBank}, w = ${w}, h = ${h}\n`);

    var opt = 'toolbar=no, menubar=no, location=no, status=no, ';
    opt += 'width=' + w.toString() + ', height=' + h.toString();
    siteMapWindow = window.open(str, 'Card Map', opt, true);
});


// 함수 작성.
function dbgout(s) {
    if( (consoleWin != undefined) && !consoleWin.closed ) {
        var text = consoleWin.document.getElementById('console');
        text.value += s;
        text.scrollTop = text.scrollHeight;
    }
}

