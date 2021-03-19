const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()
var excel = require('exceljs');
const open = require('open');
const constants = require('./static/constant');


//var obj = [];
var port = 9900;//1120;

var device;
var maxDUTs;
var signalsPerDut;
var DUTsPerBank;

var maxBank;
var maxSwitch;
var DUTsPerChip;
var CHIPsPerBank;

var DUTCnt = 0;
var workbook;
var fileIndex = 0;
//var date = new Date();
var filename;// = `DutMap_${date.getFullYear()}${twoDigit(date.getMonth()+1)}${twoDigit(date.getDate())}_${fileIndex}.xlsx`;



// DUT Control Type
// 1. Single Switch Control
// 2. Row(Group) Select Control
// 3. Row(Group) & Switch Select Control
// 4. Column Select Control
// 5. Column & Switch Select Control
// 7. Switch Select Control


// command argument => p/P : 포트, l/L : log, d/D : debug message.
process.argv.forEach(function(val, index, array) {
//    console.log(index + " : " + val);
//    if( index == 2 ) {
//        port = val;
//    }
    if( val[0] == '-' ) {
        if( (val[1] == 'p') || (val[1] == 'P') ) {
            port = array[index+1];
        }
    }
});


/*******************************************************************************************
 * node.js sub-function's
 */
function twoDigit(val) {
    if( val < 10 ) return '0'+val;
    return val;
}

function CellColor(cell, value, color, bold)
{
    if( value != null ) cell.value = value;
    cell.fill = {type:'pattern', pattern:'solid', fgColor:{argb:color}};
    if( bold == true ) cell.font = {bold:true};
}

function CellBorder(cell, t, b, l, r)
{
    cell.border = {top:{style:t}, left:{style:l}, bottom:{style:b}, right:{style:r}};
}

function createChip(sheet, site, chip, rect, map)
{
    var Rows;
    var startX = rect[0];
    var startY = rect[1];
    var countX = rect[2];
    var countY = rect[3];

    if( (site == 0) && (chip == 0) ) DUTCnt = 0;
//    console.log(`site = ${site}, chip = ${chip}, countX = ${countX}, countY = ${countY}`);

    // 셀 병합 및 색상 지정, 그리고 Row/Column 이름/번호 작성.
    for(var y=startY; y<(startY+countY); y++) {
        Rows = sheet.getRow(y);
        Rows.alignment = {vertical:'middle', horizontal:'center'};
        if( y == startY ) {           // 6개 cell 병합 후 'column' 문자열 출력.
            sheet.mergeCells(startY, startX, startY+1, startX+1);
            sheet.mergeCells(startY, startX+2, startY, startX+2+countX-3);
            var t = `${DUTsPerChip} DUT x SIGNAL[0:${signalsPerDut-1}]`;
            CellColor(Rows.getCell(startX+2), t, constants.ColumnColor, true);
        } else if( y == (startY+1) ) {    // Rows[2]에서 column[0:1]은 비우고, column[2:7]까지 '[n]'을 출력함.
            for(var x=startX+2; x<(startX+countX); x++) {
                var t = `[${(countX+startX-1)-x}]`;     // 오름차순
                CellColor(Rows.getCell(x), t, constants.ColumnColor, true);
            }
        } else {
            if( y == (startY+2) ) {
                sheet.mergeCells(startY+2, startX, startY+2+countY-3, startX);//3,1,12,1);
                CellColor(Rows.getCell(startX), 'GROUP', constants.RowColor, true);
            }
            CellColor(Rows.getCell(startX+1), `[${(startY+countY-1) - y}]`, constants.RowColor, true);
        }
    }

    if( device == 2 ) {
        sheet.mergeCells(startY+8, startX+1, startY+11, startX+1);
        sheet.mergeCells(startY+6, startX+1, startY+7, startX+1);
        sheet.mergeCells(startY+4, startX+1, startY+5, startX+1);
        var branch = rect[4];
        var color = ['00B0C4DE', '00008080', '0000FFFF', '004169E1', '0087CEFA'];
        if( branch == 0 ) {
            CellColor(sheet.getRow(startY+2).getCell(startX+1), 'Ain[x0]', color[0], true);
            CellColor(sheet.getRow(startY+3).getCell(startX+1), 'Ain[x1]', color[1], true);
            CellColor(sheet.getRow(startY+5).getCell(startX+1), 'Ain[x2]', color[2], true);
            CellColor(sheet.getRow(startY+7).getCell(startX+1), 'Ain[x4]', color[3], true);
            CellColor(sheet.getRow(startY+11).getCell(startX+1), 'Ain[x6]', color[4], true);
        } else if( branch == 1 ) {
            CellColor(sheet.getRow(startY+2).getCell(startX+1), 'Ain[x0]', color[0], true);
            CellColor(sheet.getRow(startY+3).getCell(startX+1), 'Ain[x1]', color[0], true);
            CellColor(sheet.getRow(startY+5).getCell(startX+1), 'Ain[x2]', color[2], true);
            CellColor(sheet.getRow(startY+7).getCell(startX+1), 'Ain[x4]', color[3], true);
            CellColor(sheet.getRow(startY+11).getCell(startX+1), 'Ain[x6]', color[4], true);
        } else if( branch == 2 ) {
            CellColor(sheet.getRow(startY+2).getCell(startX+1), 'Ain[x0]', color[0], true);
            CellColor(sheet.getRow(startY+3).getCell(startX+1), 'Ain[x1]', color[1], true);
            CellColor(sheet.getRow(startY+5).getCell(startX+1), 'Ain[x2]', color[0], true);
            CellColor(sheet.getRow(startY+7).getCell(startX+1), 'Ain[x4]', color[1], true);
            CellColor(sheet.getRow(startY+11).getCell(startX+1), 'Ain[x6]', color[4], true);
        } else if( branch == 3 ) {
            CellColor(sheet.getRow(startY+2).getCell(startX+1), 'Ain[x0]', color[0], true);
            CellColor(sheet.getRow(startY+3).getCell(startX+1), 'Ain[x1]', color[0], true);
            CellColor(sheet.getRow(startY+5).getCell(startX+1), 'Ain[x2]', color[2], true);
            CellColor(sheet.getRow(startY+7).getCell(startX+1), 'Ain[x4]', color[2], true);
            CellColor(sheet.getRow(startY+11).getCell(startX+1), 'Ain[x6]', color[4], true);
        } else if( branch == 4 ) {
            CellColor(sheet.getRow(startY+2).getCell(startX+1), 'Ain[x0]', color[0], true);
            CellColor(sheet.getRow(startY+3).getCell(startX+1), 'Ain[x1]', color[1], true);
            CellColor(sheet.getRow(startY+5).getCell(startX+1), 'Ain[x2]', color[0], true);
            CellColor(sheet.getRow(startY+7).getCell(startX+1), 'Ain[x4]', color[0], true);
            CellColor(sheet.getRow(startY+11).getCell(startX+1), 'Ain[x6]', color[1], true);
        }
    }

    // 테두리 라인 만들기.
    for(var y=startY; y<(countY+startY); y++) {
        Rows = sheet.getRow(y);
        if( y == startY ) {                         // 왼쪽 라인.
            for(var x=startX; x<(countX+startX); x++) {
                if( x == startX ) {                     // 왼쪽 라인의 시작.
                    CellBorder(Rows.getCell(x), 'medium', 'thin', 'medium', 'thin');
                } else if( x == (startX+countX-1) ) {   // 왼쪽 라인의 끝.
                    CellBorder(Rows.getCell(x), 'medium', 'thin', 'thin', 'medium');
                } else {                                // 왼쪽 라인의 중간.
                    CellBorder(Rows.getCell(x), 'medium', 'thin', 'thin', 'thin');
                }
            }
        } else if( y == (startY+countY-1) ) {       // 오른쪽 라인.
            for(var x=startX; x<(countX+startX); x++) {
                if( x == startX ) {                     // 오른쪽 라인의 시작.
                    CellBorder(Rows.getCell(x), 'thin', 'medium', 'medium', 'thin');
                } else if( x == (startX+countX-1) ) {   // 오른쪽 라인의 끝.
                    CellBorder(Rows.getCell(x), 'thin', 'medium', 'thin', 'medium');
                } else {                                // 오른쪽 라인의 중간.
                    CellBorder(Rows.getCell(x), 'thin', 'medium', 'thin', 'thin');
                }
            }
        } else if( y == (startY+1) ) {              // 2번째 라인.
            for(var x=startX; x<(countX+startX); x++) {
                if( x==(startX+1) ) {                   // 왼쪽 2번째 라인.
                    CellBorder(Rows.getCell(x), 'medium', 'thin', 'medium', 'thin');
                    CellColor(Rows.getCell(startX), `CHIIP ${chip}`, constants.ChipColor, true);
                } else if( x == (startX+countX-1) ) {   // 오른쪽 라인.
                    CellBorder(Rows.getCell(x), 'thin', 'thin', 'thin', 'medium');
                } else {
                    CellBorder(Rows.getCell(x), 'thin', 'thin', 'thin', 'thin');
                }
            }
        } else {                                    // 아래쪽 라인.
            for(var x=startX; x<(countX+startX); x++) {
                if( x == startX ) {                     // 위쪽 라인.(시작과 끝은 제외)
                    CellBorder(Rows.getCell(x), 'thin', 'thin', 'medium', 'thin');
                } else if( x == (startX+countX-1) ) {   // 아래쪽 라인.(시작과 끝은 제외)
                    CellBorder(Rows.getCell(x), 'thin', 'thin', 'thin', 'medium');
                } else {
                    CellBorder(Rows.getCell(x), 'thin', 'thin', 'thin', 'thin');
                }
            }
        }
    }

    // defualt all cell setup.
    for(var y=(startY+2); y<(countY+startY); y++) {
        Rows = sheet.getRow(y);
        for(var x=(startX+2); x<(startX+countX); x++) {
            // 253(FD), 233(E9), 217(D9)
            sheet.getColumn(x).width = 12;          // cell width를 12로 설정함.

            var sw = (y - (startY+2)) + ((countY-2) * (x - (startX+2)));
            if( sw < constants.deviceSwitch[device] ) {
                CellColor(Rows.getCell(x), `${sw}`, constants.UnusedColor, false);
//                Rows.getCell(x).fill = {type:'pattern', pattern:'solid', fgColor:{argb:'00D9D9D9'}};
//                Rows.getCell(x).value = `(${sw})`;
            } else {
//                Rows.getCell(x).fill = {type:'pattern', pattern:'solid', fgColor:{argb:'00FFFFFF'}};
                CellColor(Rows.getCell(x), null, constants.EmptyColor, false);
            }
        }
    }

    // switch cell에 Dut와 Signal 정보를 입력한다.
    var base = countY - 2;
    map.forEach(function(dut, dutIndex, array) {
        if( DUTCnt >= (DUTsPerBank * (site + 1)) ) return;
        if( DUTCnt >= maxDUTs ) return;

        var DutNumber = (site * DUTsPerBank) + (chip * DUTsPerChip) + dutIndex;
//        console.log(`color = ${constants.DutColor[dutIndex][1]}`);
//        console.log(`length = ${constants.DutColor.length}`);
        var dutColor = constants.DutColor[dutIndex % constants.DutColor.length][1];
        dut.forEach(function(swNumber, signalIndex) {
            x = (startX + 2) + Math.floor(swNumber / base);
            y = (startY + 2) + (swNumber % base);
//            console.log(`swNumber = ${swNumber} -> (${x}, ${y})`);
            Rows = sheet.getRow(y);
            var t = `${DutNumber}.${signalIndex} (${swNumber})`;
            CellColor(Rows.getCell(x), t, dutColor, false);
//            Rows.getCell(x).value = `${DutNumber}.${signalIndex} (${swNumber})`;
//            if( (dutIndex % 2) == 0 ) {
//                Rows.getCell(x).fill = {type:'pattern', pattern:'solid', fgColor:{argb:'00FABF8F'}};
//            } else {
//                Rows.getCell(x).fill = {type:'pattern', pattern:'solid', fgColor:{argb:'00FDE9D9'}};
//            }
        });
        DUTCnt++;
//        console.log(`DUTCnt = ${DUTCnt}`);
    });

    Rows = sheet.getRow(startY+1);
    for(var x=Math.abs(startX-3); x<startX; x++) {
        if( x == (startX-2) ) {
            if( device == 2 ) {
//                console.log(`H/W BRANCH : ${countY}`);
                Rows.getCell(x).value = `H/W BRANCH : ${rect[4]+1}`;
            } else {
                Rows.getCell(x).value = `SPI-${site}`;
            }
        }
        Rows.getCell(x).border = {bottom:{style:'thick'}};
    }
}



function createfile()
{
        // 전달된 변수.
        // device : 0(PS1030), 1(PS1060), 2(PS1120)
        // maxBank : FPGA와 연결되는 SPI Interface 개수.
        // maxDUTs : Wafer에서 측정되는 DUT의 개수.
        // signalsPerDut : DUT당 Control되는 signal의 개수.
        // DUTsPerBank : Bank(Site)당 연결될 수 있는 DUT의 최대 개수.
        // DUTsPerChip : Chip당 연결되는 DUT의 개수.
        // CHIPsPerBank : Bank(Site)당 연결되는 Chip의 개수.
    console.log(`device = ${device}, maxDUTs = ${maxDUTs}, signal = ${signalsPerDut}, dut = ${DUTsPerBank}`);

    var workbook = new excel.Workbook();
    workbook.creator = 'Kwangho Jung';
    workbook.lastModifiedBy = 'Kwangho Jung';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.calcProperties.fullCalcOnLoad = true;
    workbook.views = [
        {
            // 엑셀 파일을 열었을때 보여주는 탭을 결정한다.
            x:0, y:0, width:10000, height:10000, firstSheet:0, activeTab:0, visibility:'visible'
        }
    ];

    //////////////////////////////////
    // GridLines(눈금선) Off.
    DutMapSheet = workbook.addWorksheet('Dut Map', {views:[{showGridLines:false}]});
    Group4_Sheet = workbook.addWorksheet('Group(4)', {views:[{showGridLines:false}]});
    Group6_Sheet = workbook.addWorksheet('Group(6)', {views:[{showGridLines:false}]});
    Group8_Sheet = workbook.addWorksheet('Group(8)', {views:[{showGridLines:false}]});
    Group10_Sheet = workbook.addWorksheet('Group(10)', {views:[{showGridLines:false}]});
    Group12_Sheet = workbook.addWorksheet('Group(12)', {views:[{showGridLines:false}]});
    Group16_Sheet = workbook.addWorksheet('Group(16)', {views:[{showGridLines:false}]});

    var startX = 5;     // x 축의 시작 cell 번호 : A, B, C, D, E, ...
    var startY = 5;     // y 축의 시작 cell 번호 : 1, 2, 3, 4, 5, ...
    var countX = 8;     // x 축으로 개수.
    var countY = 12;    // y 축으로 개수.

    var x;
    var y = startY;

    var sheet = [Group4_Sheet, Group6_Sheet, Group8_Sheet, Group10_Sheet, Group12_Sheet, Group16_Sheet];


//    x = 2;
    x = 5;
    y = 3;
    if( device == 2 ) {     // PS1120
        GroupType = 3;          // Group[10]
        for(var Branch=0; Branch<5; Branch++) {
            countY = constants.group[device][GroupType][0] + 2;       // group(row) number.
            countX = constants.group[device][GroupType][1] + 2;       // column number.
//            console.log(`device = ${device}, signalsPerDut = ${signalsPerDut}, Branch = ${Branch}`);
            var map = constants.SwitchMap[device][signalsPerDut-1][Branch];
//            console.log(map);
            DUTsPerChip = map.length;
            createChip(DutMapSheet, 0, 0, [x, y, countX, countY, Branch], map);
//        x += countX + 3;
            y += countY + 3;

        }
    } else {                // PS1060, PS1030
        for(var GroupType=0; GroupType<6; GroupType++) {
            countY = constants.group[device][GroupType][0] + 2;       // group(row) number.
            countX = constants.group[device][GroupType][1] + 2;       // column number.
            var map = constants.SwitchMap[device][signalsPerDut-1][GroupType];
            createChip(DutMapSheet, 0, 0, [x, y, countX, countY], map);
//          x += countX + 3;
            y += countY + 3;
        }

        for(var GroupType=0; GroupType<6; GroupType++) {            // group 선택.
            countY = constants.group[device][GroupType][0] + 2;       // group(row) number.
            countX = constants.group[device][GroupType][1] + 2;       // column number.
//            countX = constants.group[GroupType][0] + 2;
//            countY = constants.group[GroupType][1] + 2;

            // FPGA 사각형 그리기.
            sheet[GroupType].mergeCells(startY,startX-4,((countY + 3)*maxBank)+1,startX-4);
            sheet[GroupType].getCell('A4').value = 'FPGA';
            sheet[GroupType].getCell('A4').font = {size:16, bold:true};
            sheet[GroupType].getCell('A4').alignment = { vertical: 'top', horizontal: 'center' };
            sheet[GroupType].getCell('A5').border = {top:{style:'thick'}, left:{style:'thick'}, bottom:{style:'thick'}, right:{style:'thick'}};

            y = startY;
            for(var site = 0; site < maxBank; site++ ) {
                x = startX;

                for(var chip = 0; chip < CHIPsPerBank; chip++ ) {
                    var map = constants.SwitchMap[device][signalsPerDut-1][GroupType];
                    createChip(sheet[GroupType], site, chip, [x, y, countX, countY], map);
                    x += (countX + 3);

                    if( DUTCnt >= maxDUTs ) break;
                }
                if( maxDUTs <= DUTCnt ) break;

                y += (countY + 3);
            }
        }
    }

    console.log("Create Dut Map Done!");

    // file check & new file create.
    do {
        var res = true;
        var date = new Date();
        filename = `DutMap_${date.getFullYear()}${twoDigit(date.getMonth()+1)}${twoDigit(date.getDate())}_${fileIndex}.xlsx`;
//        console.log(`file name : ${filename}, file index : ${fileIndex}`);
        try {
            fs.statSync(filename);
            fileIndex++;
//            res = true;
        } catch(err) {
            if( err.code == 'ENOENT' ) {
                res = false;
            }
        }
//        console.log(`result = ${res}`);
    } while( res );

    workbook.xlsx.writeFile(filename).then(function() {console.log(`${filename} file create done.`);});


//    console.log(`device = ${device}, maxDUTs = ${maxDUTs}, signal = ${signalsPerDut}, dut = ${DUTsPerBank}, maxBank=${maxBank}`);
    // JSON file create
    var DutMap = new Object();
    DutMap.device = device;
    DutMap.totalDut = maxDUTs;
    DutMap.signalPerDut = signalsPerDut;
    DutMap.dutPerBank = DUTsPerBank;
    DutMap.bankCnt = maxBank;
    DutMap.banks = [];

    // signal 개수 순으로 Group-4(0)/6(1)/8(2)/10(3)/12(4)/16(5) 값을 선택한다.
    /*
    var usedGroup = [ [0, 0, 3, 0, 1, 1, 5, 2, 3, 3, 4, 2, 5, 5, 3, 5],     // PS1030
                      [0, 0, 1, 0, 4, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5],     // PS1060
                      [1, 1, 1, 1, 1, 1, 1, 1] ];
    */
    for(var bnk = 0; bnk<DutMap.bankCnt; bnk++) {
        var bankObj = new Object();
        bankObj.bankNumber = bnk;
        bankObj.chips = [];
        for(var chp = 0; chp<CHIPsPerBank; chp++) {
            var chipObj = new Object();
            chipObj.chipNumber = chp;
            chipObj.duts = [];

            var grp = constants.validGroupForSignal[device][signalsPerDut-1];
//    console.log(`constants.validGroupForSignal = ${grp}`);
            constants.SwitchMap[device][signalsPerDut-1][grp].forEach(function(switchs, idx) {
                var dutObj = new Object();
                dutObj.dutNumber = (chp * signalsPerDut) + idx;
                dutObj.switchs = [];
//    console.log(`switchs = ${switchs}`);
                switchs.forEach(function(sw, index) {
                    dutObj.switchs.push( sw );
                });
                chipObj.duts.push(dutObj);
            });
/*
            for(var dt=0; dt<8; dt++) {
                var dutObj = new Object();
                dutObj.dutNumber = dt;
                dutObj.switchs = [];
                for(var i=0; i<signalsPerDut; i++) {
                    var sw = constants.SwitchMap[device][signalsPerDut][ constants.validGroupForSignal[device][signalsPerDut] ][i];
                    dutObj.switchs.push( sw );
                }
                chipObj.duts.push(dutObj);
            }
*/
            bankObj.chips.push(chipObj);
        }
        DutMap.banks.push(bankObj);
    }
    fs.writeFileSync("DutMap.json", JSON.stringify(DutMap));
    console.log("JSON File(DutMap.json) create done!");
}





// express에서 html 파일 경로를 절대 경로에서 상대 경로로 바꾸어 준다.
// html 파일에서의 요청을 '/static'폴더에서 먼저 처리하고, 없다면 다음으로 넘어간다.
app.use('/', express.static(__dirname + '/static'));

app.use(function(req, res, next) {
//    console.log('request -> '+req.protocol + "://" + req.headers.host + req.originalUrl);
    next();
});



// http request 처리함수를 작성한다.
//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/static/index.html');
//})


app.get('/CreateDutMap', function(req, res) {
    res.status(204).send("");

//    console.log('request -> '+ req.protocol + "://" + req.headers.host + req.originalUrl);

//    console.log(req.query.device);
//    console.log(req.query.maxDUTs);
//    console.log(req.query.signalsPerDut);
//    console.log(req.query.DUTsPerBank);

    device = parseInt(req.query.device);
    maxDUTs = parseInt(req.query.maxDUTs);
    signalsPerDut = parseInt(req.query.signalsPerDut);
    DUTsPerBank = parseInt(req.query.DUTsPerBank);

    console.log(`device = ${device}, maxDUTs = ${maxDUTs}, signal = ${signalsPerDut}, dut = ${DUTsPerBank}`);

    // Group 구성(Switch 활용)에 따라서 Chip당 DUT의 개수는 달라질 수 있다.
    DUTsPerChip = Math.floor(constants.deviceSwitch[device] / signalsPerDut);     //????
    if( DUTsPerBank > (DUTsPerChip * 8) ) {
        CHIPsPerBank = 8;
        DUTsPerBank = DUTsPerChip * CHIPsPerBank;
    } else {
        if( DUTsPerBank == 0 ) {
            CHIPsPerBank = 8;
            DUTsPerBank = DUTsPerChip * CHIPsPerBank;
        } else {
            CHIPsPerBank = Math.ceil(DUTsPerBank / DUTsPerChip)
        }
    }
    // 결정된 변수.
    console.log(`DUTsPerChip = ${DUTsPerChip}`);
    console.log(`CHIPsPerBank = ${CHIPsPerBank}`);
    console.log(`DUTsPerBank = ${DUTsPerBank}`);

    maxBank = Math.ceil(maxDUTs / DUTsPerBank);
    console.log(`maxBank = ${maxBank}`);

    createfile();
})

app.get('/CardMap', function(req, res) {
    res.sendFile(__dirname + '/static/card.html');
})

app.get('/switchMap', function(req, res) {
//    console.log(req.query.DUT);
    res.sendFile(__dirname + '/static/chip.html');
})

// console window 생성 request에 대한 응답.
app.get('/console', function(req, res) {
    res.status(204).send('');
});



// http server 실행.
var server = app.listen(port, () => {
    console.log(`Web Server listening at http://localhost:${port}`);
});

//createfile();
// web-browser(client)를 자동으로 실행시킨다.
open(`http://localhost:${port}/`);

