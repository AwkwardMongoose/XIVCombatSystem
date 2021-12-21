const magnitudeArr = ['-',0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370]
const mpCostArr = [0,10,45,80,115,150,185,220,255,290,325,360,395,430,465,500,535,570,605,640,675,710,745,780,815,850,885,920,955,990,1025,1060,1095,1130,1165,1200,1235,1270,1305,1340,1375,1410,1445,1480,1515,1550,1585,1620,1655,1690,1725,1760,1795,1830,1865,1900,1935,1970,2005,2040,2075,2110,2145,2180,2215,2250,2285,2320,2355,2390,2425,2460,2495,2530,2565,2600]
const buffMagArr = ['-','+5','+10','+15']
const debuffMagArr = ['-','-5','-10','-15']
const buffCostArr = [0,50,60,70]
const rowArr = ['null',1,2,3]

var currRole = 'none';
var sdmg = 0;
var heal = 0;
var maxMp = 2600;
var mpHalfMag = 63;
var mpCritThreshold = 76;

var readoutText = '-';
var mpCostTotal = 0;

var effectType1 = {value:'dmg'};
var targetType1 = {value:'enemy'};
var magnitude1 = {value: 0};
var magDisplay1 = {value: 0};
var areaEffect1 = {value:0};
var periodic1 = {value:0};
var mpCost1 = {value:0};

var effectType2 = {value:'none'};
var targetType2 = {value:'enemy'};
var magnitude2 = {value: 0};
var magDisplay2 = {value: 0};
var areaEffect2 = {value:0};
var periodic2 = {value:0};
var mpCost2 = {value:0};

var effectType3 = {value:'none'};
var targetType3 = {value:'enemy'};
var magnitude3 = {value: 0};
var magDisplay3 = {value: 0};
var areaEffect3 = {value:0};
var periodic3 = {value:0};
var mpCost3 = {value:0};

const effectTypeRowArr = ['null',effectType1,effectType2,effectType3]
const targetTypeRowArr = ['null',targetType1,targetType2,targetType3]
const magnitudeRowArr = ['null',magnitude1,magnitude2,magnitude3]
const magDisplayRowArr = ['null',magDisplay1,magDisplay2,magDisplay3]
const areaEffectRowArr = ['null',areaEffect1,areaEffect2,areaEffect3]
const periodicRowArr = ['null',periodic1,periodic2,periodic3]
const mpCostRowArr = ['null',mpCost1,mpCost2,mpCost3]

function initialLoad() {
    rowArr.forEach(row => {
        if (row != 'null'){
            let element = '<select class="effect-selector" id="effect' + row + '-option">'
            let rowElement = $('#effect' + row + '-option')
            effectSelect(rowElement)
        } else {
            return
        }
    })
}

function effectSelect(element) {
    let effect = element.val();
    let number = element.attr('id').slice(6,7);
    effectTypeRowArr[number] = {value: effect};
    if (effect == 'none') {
        disableArea(number)
        disableMagnitude(number)
        disablePeriodic(number)
        disableTargetAlly(number)
    } else {
        if (effect == 'dmg' || effect == 'heal' || effect == 'buff' || effect == 'debuff') {
            enableMagnitude(number)
        } else {
            disableMagnitude(number)
        }
        if (effect != 'dmg' && effect != 'heal') {
            disablePeriodic(number)
        } else {
            enablePeriodic(number);
        }
        if (effect == 'summon' || effect == 'invuln' || effect == 'stealth' || effect == 'esuna' || effect == 'revive') {
            disableTargetEnemy(number)
        } else {
            enableTargetAll(number)
        }
        if (effect == 'summon') {
            disableArea(number)
        } else {
            enableArea(number)
        }
    }
    updateMPCost()
}

function targetSelect(element) {
    let target = element.val();
    let number = element.attr('id').slice(6,7);
    targetTypeRowArr[number] = {value: target};
    updateMPCost()
}


function roleSelect(element) {
    let role = element.val();
    currRole = role;
    switch (role) {
        case 'none':
            sdmg = 0;
            heal = 0;
            maxMp = 2600;
            mpHalfMag = 63;
            mpCritThreshold = 76;
        break
        case 'tank':
            sdmg = 20;
            heal = 5;
            maxMp = 200;
            mpHalfMag = 4;
            mpCritThreshold = 6;
        break
        case 'ltank':
            sdmg = 25;
            heal = 5;
            maxMp = 250;
            mpHalfMag = 5;
            mpCritThreshold = 7;
        break
        case 'mstriker':
            sdmg = 35;
            heal = 5;
            maxMp = 200;
            mpHalfMag = 4;
            mpCritThreshold = 6;
        break
        case 'rstriker':
            sdmg = 30;
            heal = 5;
            maxMp = 150;
            mpHalfMag = 3;
            mpCritThreshold = 5;
        break
        case 'caster':
            sdmg = 45;
            heal = 5;
            maxMp = 500;
            mpHalfMag = 8;
            mpCritThreshold = 15;
        break
        case 'heal':
            sdmg = 20;
            heal = 35;
            maxMp = 500;
            mpHalfMag = 8;
            mpCritThreshold = 15;
        break
        case 'tminion':
            sdmg = 10;
            heal = 0;
            maxMp = 100;
            mpHalfMag = 3;
            mpCritThreshold = 3;
        break
        case 'dminion':
            sdmg = 20;
            heal = 0;
            maxMp = 100;
            mpHalfMag = 3;
            mpCritThreshold = 3;
        break
        case 'hminion':
            sdmg = 0;
            heal = 10;
            maxMp = 100;
            mpHalfMag = 3;
            mpCritThreshold = 3;
        break
        case 'boss':
            sdmg = 50;
            heal = 30;
            maxMp = 500;
            mpHalfMag = 8;
            mpCritThreshold = 15;
        break
        case 'limit':
            sdmg = 100;
            heal = 100;
            maxMp = 2000;
            mpHalfMag = 30;
            mpCritThreshold = 57;
        break
    }
    updateMag()
    updateMPCost()
}

function disableTargetAlly(row) {
    let targetFieldRow = 'target' + row + '-option';
    let targetInput = '<select class="target-selector" id="target' + row + '-option"></select>'
    let targetField = document.getElementById(targetFieldRow);
    $(targetField).val('enemy');
    targetField.disabled = true;
    targetTypeRowArr[row] = {value: 'enemy'};
}

function disableTargetEnemy(row) {
    let targetFieldRow = 'target' + row + '-option';
    let targetInput = '<select class="target-selector" id="target' + row + '-option"></select>'
    let targetField = document.getElementById(targetFieldRow);
    $(targetField).val('ally');
    targetField.disabled = true;
    targetTypeRowArr[row] = {value: 'ally'};
}

function enableTargetAll(row) {
    let targetFieldRow = 'target' + row + '-option';
    let targetInput = '<select class="target-selector" id="target' + row + '-option"></select>'
    let targetField = document.getElementById(targetFieldRow);
    $(targetField).val('enemy');
    targetField.disabled = false;
    targetTypeRowArr[row] = {value: 'enemy'};
}


function disablePeriodic(row) {
    let eotFieldRow = 'eot-check-' + row;
    let eotInput = '<input class="effect-check" type="checkbox" value="0" id="eot-check-' + row + '"></input>'
    let eotField = document.getElementById(eotFieldRow);
    eotField.disabled = true;
    eotField.checked = false;
    effectCheckboxHandler(eotInput)
}

function enablePeriodic(row) {
    let eotFieldRow = 'eot-check-' + row;
    let eotInput = '<input class="effect-check" type="checkbox" value="0" id="eot-check-' + row + '"></input>'
    let eotField = document.getElementById(eotFieldRow);
    eotField.disabled = false;
    effectCheckboxHandler(eotInput)
}

function disableArea(row) {
    let aoeFieldRow = 'aoe-check-' + row;
    let aoeInput = '<input class="effect-check" type="checkbox" value="0" id="aoe-check-' + row + '"></input>'
    let aoeField = document.getElementById(aoeFieldRow);
    aoeField.disabled = true;
    aoeField.checked = false;
    effectCheckboxHandler(aoeInput)
}

function enableArea(row) {
    let aoeFieldRow = 'aoe-check-' + row;
    let aoeInput = '<input class="effect-check" type="checkbox" value="0" id="aoe-check-' + row + '"></input>'
    let aoeField = document.getElementById(aoeFieldRow);
    aoeField.disabled = false;
    effectCheckboxHandler(aoeInput)
}

function disableMagnitude(row) {
    let displayPlusRow = 'mag-button-plus-' + row;
    let displayMinusRow = 'mag-button-down-' + row;
    let displayFieldRow = 'magnitude-display-' + row;
    let displayPlusButton = document.getElementById(displayPlusRow);
    let displayMinusButton = document.getElementById(displayMinusRow);
    let displayField = document.getElementById(displayFieldRow);
    displayPlusButton.disabled = true;
    displayMinusButton.disabled = true;
    displayField.classList.remove('effect-magstyle');
    displayField.classList.add('effect-magstyle-disabled');
    magnitudeRowArr[row] = {value: 0}
    displayField.innerHTML = '-';
}

function enableMagnitude(row) {
    magnitudeRowArr[row] = {value: 0}
    let displayPlusRow = 'mag-button-plus-' + row;
    let displayMinusRow = 'mag-button-down-' + row;
    let displayFieldRow = 'magnitude-display-' + row;
    let aoeFieldRow = 'aoe-check-' + row;
    let eotFieldRow = 'eot-check-' + row;
    let test = '<input class="effect-check" type="checkbox" value="0" id="eot-check-' + row + '"></input>'
    let displayPlusButton = document.getElementById(displayPlusRow);
    let displayMinusButton = document.getElementById(displayMinusRow);
    let displayField = document.getElementById(displayFieldRow);
    let aoeField = document.getElementById(aoeFieldRow);
    let eotField = document.getElementById(eotFieldRow);
    displayPlusButton.disabled = false;
    displayMinusButton.disabled = false;
    eotField.disabled = false;
    displayField.classList.remove('effect-magstyle-disabled');
    displayField.classList.add('effect-magstyle');
    displayField.innerHTML = '-';
    effectCheckboxHandler(test)
}

function magButtons(button) {
    let firedButton = $(button).attr('id');
    let buttonNumber = firedButton.slice(16);
    let buttonType = firedButton.slice(11,15);
    let magCount = magnitudeRowArr[buttonNumber].value;
    let currEffect = effectTypeRowArr[buttonNumber].value;
    if (currEffect == 'dmg' || currEffect == 'heal') {
        switch(buttonType) {
            case 'plus':
                if (magCount >= 75) {
                    break
                } else {
                    magCount++;break
                }
            
            case 'down':
                if (magCount <= 0) {
                    magCount = 0;break
                } else {
                    magCount--;break
                }
            default:break
        }
    } else if (currEffect == 'buff' || currEffect == 'debuff') {
        switch(buttonType) {
            case 'plus':
                if (magCount >= 3) {
                    break
                } else {
                    magCount++;break
                }
            
            case 'down':
                if (magCount <= 0) {
                    magCount = 0;break
                } else {
                    magCount--;break
                }
            default:break
        }
    } else {
        return
    }

    magnitudeRowArr[buttonNumber].value = magCount;
    updateMag()
    updateMPCost()
}

function updateMag() {
    magnitudeRowArr.forEach(element => {
        if (element != 'null') {
            let magNumber = 'magnitude-display-' + magnitudeRowArr.indexOf(element);
            let currEffect = effectTypeRowArr[magnitudeRowArr.indexOf(element)].value;
            let thisMag = element.value;
            let rowNumber = magnitudeRowArr.indexOf(element);
            let magDisplay = document.getElementById(magNumber);
            let magCritDiff = thisMag-mpCritThreshold;
            let magCritPercent = 1;
            if (thisMag < mpCritThreshold) {
                magCritPercent = 1;
            } else if (thisMag == mpCritThreshold) {
                magCritPercent = 1.15;
            } else if (thisMag > mpCritThreshold) {
                magCritPercent = 1.15+((0.05)*magCritDiff);
            }
            switch (currEffect) {
                case 'dmg':
                    if (currRole == 'none') {
                        if (thisMag <= 0) {
                            magDisplayRowArr[rowNumber] = {value: '-'}
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplayRowArr[rowNumber] = {value: '+'+magnitudeArr[element.value]}
                            magDisplay.innerHTML = '+'+magnitudeArr[element.value];
                        }
                    } else {
                        if (thisMag <= 0) {
                            magDisplayRowArr[rowNumber] = {value: '-'}
                            magDisplay.innerHTML = '-';
                        } else if (thisMag >= mpHalfMag && thisMag < mpCritThreshold+7) {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil(((sdmg+sdmg+magnitudeArr[element.value])*magCritPercent)/5)*5}
                            magDisplay.innerHTML = Math.ceil(((sdmg+sdmg+magnitudeArr[element.value])*magCritPercent)/5)*5;
                        } else if (thisMag >= mpHalfMag && thisMag >= mpCritThreshold+7 ) {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil(((sdmg+sdmg+magnitudeArr[element.value])*1.5)/5)*5}
                            magDisplay.innerHTML = Math.ceil(((sdmg+sdmg+magnitudeArr[element.value])*1.5)/5)*5;
                        } else {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil((sdmg+magnitudeArr[element.value])*magCritPercent)}
                            magDisplay.innerHTML = Math.ceil((sdmg+magnitudeArr[element.value])*magCritPercent);
                        }
                    }
                    break;
                case 'heal':
                    if (currRole == 'none') {
                        if (thisMag <= 0) {
                            magDisplayRowArr[rowNumber] = {value: '-'}
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplayRowArr[rowNumber] = {value: '+'+magnitudeArr[element.value]}
                            magDisplay.innerHTML = '+'+magnitudeArr[element.value];
                        }
                    } else {
                        if (thisMag <= 0) {
                            magDisplayRowArr[rowNumber] = {value: '-'}
                            magDisplay.innerHTML = '-';
                        } else if (thisMag >= mpHalfMag && thisMag < mpCritThreshold+7) {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil(((heal+heal+magnitudeArr[element.value])*magCritPercent)/5)*5}
                            magDisplay.innerHTML = Math.ceil(((heal+heal+magnitudeArr[element.value])*magCritPercent)/5)*5;
                        } else if (thisMag >= mpHalfMag && thisMag >= mpCritThreshold+7 ) {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil(((heal+heal+magnitudeArr[element.value])*1.5)/5)*5}
                            magDisplay.innerHTML = Math.ceil(((heal+heal+magnitudeArr[element.value])*1.5)/5)*5;
                        } else {
                            magDisplayRowArr[rowNumber] = {value: Math.ceil((heal+magnitudeArr[element.value])*magCritPercent)}
                            magDisplay.innerHTML = Math.ceil((heal+magnitudeArr[element.value])*magCritPercent);
                        }
                    }
                    break;
                case 'buff':
                    if (thisMag <= 0) {
                        magDisplayRowArr[rowNumber] = {value: '-'}
                        magDisplay.innerHTML = '-';
                    } else {
                        magDisplayRowArr[rowNumber] = {value: buffMagArr[element.value]}
                        magDisplay.innerHTML = buffMagArr[element.value];
                    }
                    break;
                case 'debuff':
                    if (thisMag <= 0) {
                        magDisplayRowArr[rowNumber] = {value: '-'}
                        magDisplay.innerHTML = '-';
                    } else {
                        magDisplayRowArr[rowNumber] = {value: debuffMagArr[element.value]}
                        magDisplay.innerHTML = debuffMagArr[element.value];
                    }
                    break;
            }
            
        } else {
            return
        }
    });
}

function updateMPCost() {
    var mpTotalCostArr = [];
    mpCostRowArr.forEach(element => {
        if (element != 'null') {
            let rowNumber = mpCostRowArr.indexOf(element);
            let mpNumber = 'mpcost-display-' + rowNumber;
            let magNumber = magnitudeRowArr[mpCostRowArr.indexOf(element)].value;
            let mpDisplay = document.getElementById(mpNumber);
            let currEffect = effectTypeRowArr[mpCostRowArr.indexOf(element)].value;
            let mpBaseCost = 0;
            let target = targetTypeRowArr[rowNumber].value;
            let mpSubTotal = 0;
            let mpTotal = 0;
            let aoeMult = 1;
            let eotMult = 1;
            switch (areaEffectRowArr[rowNumber].value) {
                case 1:
                    aoeMult = 1.5;
                    break;
                case 0:
                    aoeMult = 1;
                    break;
            }
            switch (periodicRowArr[rowNumber].value) {
                case 1:
                    eotMult = 1.5;
                    break;
                case 0:
                    eotMult = 1;
                    break;
            }
            switch (currEffect) {
                case 'dmg':
                case 'heal':
                    mpBaseCost = mpCostArr[magNumber];

                    mpSubTotal = Math.ceil(((Math.ceil((mpBaseCost*aoeMult)/5)*5)*eotMult)/5)*5;
                    
                    break;
                case 'buff':
                case 'debuff':
                    mpBaseCost = buffCostArr[magNumber]
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'stun':
                    mpBaseCost = 30;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'esuna':
                    mpBaseCost = 75;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'invuln':
                    mpBaseCost = 200;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'revive':
                    mpBaseCost = 200;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'summon':
                    mpBaseCost = 100;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
                case 'stealth':
                    mpBaseCost = 100;
                    mpSubTotal = Math.ceil((mpBaseCost*aoeMult)/5)*5;
                    break;
            }
            switch (target) {
                case 'enemy':
                    if (currEffect != 'dmg' && currEffect != 'debuff' && currEffect != 'stun'){
                        mpTotal = 0-mpSubTotal;
                        mpDisplay.innerHTML = mpTotal;
                    } else {
                        mpTotal = mpSubTotal;
                        mpDisplay.innerHTML = mpTotal;
                    }
                    break;
                case 'ally':
                    if (currEffect != 'dmg' && currEffect != 'debuff' && currEffect != 'stun'){
                        mpTotal = mpSubTotal;
                        mpDisplay.innerHTML = mpTotal;
                    } else {
                        mpTotal = 0-mpSubTotal;
                        mpDisplay.innerHTML = mpTotal;
                    }
                    break;
            }
            mpCostRowArr[rowNumber] = {value: mpTotal};
            mpTotalCostArr.push(mpCostRowArr[rowNumber].value)
        } else {
            return;
        }
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        mpCostTotal = mpTotalCostArr.reduce(reducer);
    })
    let mpCostDisplay = document.getElementById("mpcost-display-total");
    mpCostDisplay.innerHTML = mpCostTotal;
}

function effectCheckboxHandler(element) {
    let checkChecked = $(element).attr('id');
    let checkNumber = checkChecked.slice(10);
    let checkType = checkChecked.slice(0,3);
    let checkState = $(element).is(':checked');
    switch (checkType) {
        case 'aoe':
            if (checkState == true){
                areaEffectRowArr[checkNumber] = {value: 1}
            } else {
                areaEffectRowArr[checkNumber] = {value: 0}
            }
            break;
        case 'eot':
            if (checkState == true){
                periodicRowArr[checkNumber] = {value: 1}
            } else {
                periodicRowArr[checkNumber] = {value: 0}
            }
            break;
    }
    updateMPCost()
}

function readoutDisplayArray() {
    var readoutArr = []
    rowArr.forEach(row => {
        if (row != 'null') {
            let effectType = effectTypeRowArr[row].value;
            let targetType = targetTypeRowArr[row].value;
            let magnitude = magnitudeRowArr[row].value;
            let magDisplayText = magDisplayRowArr[row].value;
            let areaEffect = areaEffectRowArr[row].value;
            let periodic = periodicRowArr[row].value;
            let checkedBoxes = 'none';
            if (areaEffect == true && periodic == true) {
                checkedBoxes = 'both'
            } else if (areaEffect == true && periodic == false) {
                checkedBoxes = 'aoe'
            } else if (areaEffect == false && periodic == true) {
                checkedBoxes = 'eot'
            } else {
                checkedBoxes = 'none'
            }
            switch (effectType) {
                case 'none':
                    break;
                case 'dmg':
                    let readoutEffect = magDisplayText + ' DMG';
                    console.log(readoutEffect)
                    break;
                case 'heal':
                    readoutEffect = 2;
                    break;
                case 'buff':
                    readoutEffect = 3;
                    break;
                case 'debuff':
                    readoutEffect = 4;
                    break;
                case 'esuna':
                    readoutEffect = 5;
                    break;
                case 'invuln':
                    break;
                case 'stealth':
                    break;
                case 'summon':
                    break;
                case 'revive':
                    break;
                case 'stun':
                    break;
            }
        } else {
            return
        }
    })
}


var intervalId;
var delayId;
$(".magbutton").mousedown(function() {
    magButtons(this)
    let button = this;
    delayId = setTimeout(function(){intervalId = setInterval(magButtons, 100, button)},300);
}).mouseup(function() {
    clearTimeout(delayId)
    clearInterval(intervalId);
}).mouseleave(function() {
    clearTimeout(delayId)
    clearInterval(intervalId);
});

window.addEventListener('load', function() {
    initialLoad()
});

$(".effect-selector").change(function() {
    let element = $(this);
    effectSelect(element);
});

$(".role-selector").change(function() {
    let element = $(this);
    roleSelect(element);
});

$(".effect-check").change(function() {
    effectCheckboxHandler(this)
});

$(".target-selector").change(function() {
    let element = $(this);
    targetSelect(element);
});




var testSave = {
    'name': 'David',
    'age': 32,
}

$("#testcheckbox").click(function() {
    readoutDisplayArray();
});

/*$("#testcheckbox").click(function() {
        var textToSave = JSON.stringify(testSave);
        var hiddenElement = document.createElement('a');
      
        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'myFile.txt';
        hiddenElement.click();
});*/


$("#testcheckbox2").click(function() {
    var file = document.getElementById("loadfile").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var testLoad = JSON.parse(evt.target.result);
            console.log(testLoad.name);
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
});