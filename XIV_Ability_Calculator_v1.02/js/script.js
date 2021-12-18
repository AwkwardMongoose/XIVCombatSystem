const magnitudeArr = ['-',0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370]
const mpCostArr = [0,10,45,80,115,150,185,220,255,290,325,360,395,430,465,500,535,570,605,640,675,710,745,780,815,850,885,920,955,990,1025,1060,1095,1130,1165,1200,1235,1270,1305,1340,1375,1410,1445,1480,1515,1550,1585,1620,1655,1690,1725,1760,1795,1830,1865,1900,1935,1970,2005,2040,2075,2110,2145,2180,2215,2250,2285,2320,2355,2390,2425,2460,2495,2530,2565,2600]
const buffMagArr = ['-','+5','+10','+15']
const debuffMagArr = ['-','-5','-10','-15']
const buffCostArr = [0,50,60,70]

var currRole = 'none';
var sdmg = 0;
var heal = 0;
var maxMp = 2600;
var mpHalfMag = 63;
var mpCritThreshold = 76;

var effectType1 = {value:'dmg'};
var targetType1 = {value:'enemy'};
var magnitude1 = {value: 0};
var areaEffect1 = {value:0};
var periodic1 = {value:0};
var mpCost1 = {value:0};

var effectType2 = {value:'dmg'};
var targetType2 = {value:'enemy'};
var magnitude2 = {value: 0};
var areaEffect2 = {value:0};
var periodic2 = {value:0};
var mpCost2 = {value:0};

var effectType3 = {value:'dmg'};
var targetType3 = {value:'enemy'};
var magnitude3 = {value: 0};
var areaEffect3 = {value:0};
var periodic3 = {value:0};
var mpCost3 = {value:0};

const effectTypeRowArr = ['null',effectType1,effectType2,effectType3]
const targetTypeRowArr = ['null',targetType1,targetType2,targetType3]
const magnitudeRowArr = ['null',magnitude1,magnitude2,magnitude3]
const areaEffectTypeRowArr = ['null',areaEffect1,areaEffect2,areaEffect3]
const periodicRowArr = ['null',periodic1,periodic2,periodic3]
const mpCostRowArr = ['null',mpCost1,mpCost2,mpCost3]


function effectSelect(element) {
    let effect = element.val();
    let number = element.attr('id').slice(6,7);
    effectTypeRowArr[number] = {value: effect};

    if (effect == 'dmg' || effect == 'heal' || effect == 'buff' || effect == 'debuff') {
        enableMagnitude(number)
    } else {
        disableMagnitude(number)
    }
    
    console.log(magnitudeRowArr[number].value)
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
    console.log(sdmg)
}

function updateAll() {
    let magDisplay1 = document.getElementById('magnitude-display-1');
    let magDisplay2 = document.getElementById('magnitude-display-2');
    let magCount1 = magnitudeRowArr[1].value;
    let magCount2 = magnitudeRowArr[2].value;
    let magCount3 = magnitudeRowArr[3].value;
    magnitudeRowArr[1] = {value: magCount1};
    magnitudeRowArr[2] = {value: magCount2};
    magnitudeRowArr[3] = {value: magCount3};
    let magRow1 = magnitudeRowArr[1].value;
    let magRow2 = magnitudeRowArr[2].value;
    let magRow3 = magnitudeRowArr[3].value;
    
    if (currRole == 'none') {
        if (magRow1 < 1) {
            magDisplay1.innerHTML = '-';
        } else {
            magDisplay1.innerHTML = '+'+(sdmg+magnitudeArr[magRow1]);
        }
        if (magRow2 < 1) {
            magDisplay2.innerHTML = '-';
        } else {
            magDisplay2.innerHTML = '+'+(sdmg+magnitudeArr[magRow2]);
        }
    } else {
            if (magRow1 < 1) {
                magDisplay1.innerHTML = '-';
            } else {
                magDisplay1.innerHTML = (sdmg+magnitudeArr[magRow1]);
            }



            
            if (magRow2 < 1) {
                magDisplay2.innerHTML = '-';
            } else {
                magDisplay2.innerHTML = (sdmg+magnitudeArr[magRow2]);
            }
    }
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
    let displayPlusButton = document.getElementById(displayPlusRow);
    let displayMinusButton = document.getElementById(displayMinusRow);
    let displayField = document.getElementById(displayFieldRow);
    displayPlusButton.disabled = false;
    displayMinusButton.disabled = false;
    displayField.classList.remove('effect-magstyle-disabled');
    displayField.classList.add('effect-magstyle');
    displayField.innerHTML = '-';
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
    console.log(magCount)
    updateMag()
}

function updateMag() {
    magnitudeRowArr.forEach(element => {
        if (element != 'null') {
            let magNumber = 'magnitude-display-' + magnitudeRowArr.indexOf(element);
            let currEffect = effectTypeRowArr[magnitudeRowArr.indexOf(element)].value;
            let thisMag = element.value;
            let magDisplay = document.getElementById(magNumber);
            switch (currEffect) {
                case 'dmg':
                    if (currRole == 'none') {
                        if (thisMag <= 0) {
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplay.innerHTML = '+'+magnitudeArr[element.value];
                        }
                    } else {
                        if (thisMag <= 0) {
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplay.innerHTML = (sdmg+magnitudeArr[element.value]);
                        }
                    }
                    break;
                case 'heal':
                    if (currRole == 'none') {
                        if (thisMag <= 0) {
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplay.innerHTML = '+'+magnitudeArr[element.value];
                        }
                    } else {
                        if (thisMag <= 0) {
                            magDisplay.innerHTML = '-';
                        } else {
                            magDisplay.innerHTML = (heal+magnitudeArr[element.value]);
                        }
                    }
                    break;
                case 'buff':
                    if (thisMag <= 0) {
                        magDisplay.innerHTML = '-';
                    } else {
                        magDisplay.innerHTML = buffMagArr[element.value];
                    }
                    break;
                case 'debuff':
                    if (thisMag <= 0) {
                        magDisplay.innerHTML = '-';
                    } else {
                        magDisplay.innerHTML = debuffMagArr[element.value];
                    }
                    break;
            }
            
        } else {
            return
        }
    });
}



myStorage = window.localStorage;


/*$(".magbutton").click(function() {
    magnitudeDisplay(this)
});*/

$(".magbutton").click(function() {
    magButtons(this)
});

window.addEventListener('load', function() {
});

$(".effect-selector").change(function() {
    let element = $(this);
    effectSelect(element);
});

$(".role-selector").change(function() {
    let element = $(this);
    roleSelect(element);
});

$(".role-selector").hover(function() {
    
});