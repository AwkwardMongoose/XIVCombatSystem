const magnitudeArr = [0,0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,300]
const mpCostArr = [0,10,45,80,115,150,185,220,255,290,325,360,395,430,465,500,535,570,605,640,675,710,745,780,815,850,885,920,955,990,1025,1060,1095,1130,1165,1200,1235,1270,1305,1340,1375,1410,1445,1480,1515,1550,1585,1620,16551690,1725,1760,1795,1830,1865,1900,1935,1970]
const buffMagArr = ['-','+5','+10','+15']
const debuffMagArr = ['-','-5','-10','-15']
const buffCostArr = [0,50,60,70]

var currRole = 'none';
var sdmg = 0;
var heal = 0;
var maxMp = 0;
var mpCritThreshold = 0;

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
            maxMp = 3500;
            mpCritThreshold = 52;
        break
        case 'tank':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'ltank':
            sdmg = 20;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'mstriker':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'rstriker':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'caster':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'heal':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'tminion':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'dminion':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'hminion':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'boss':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
        case 'limit':
            sdmg = 0;
            heal = 0;
            maxMp = 0;
            mpCritThreshold = 0;
        break
    }
    updateAll()
    console.log(sdmg)
}

function updateAll() {
    var magDisplay1 = document.getElementById('magnitude-display-1');
    var magDisplay2 = document.getElementById('magnitude-display-2');
    var magCount1 = magnitudeRowArr[1].value;
    var magCount2 = magnitudeRowArr[2].value;
    var magCount3 = magnitudeRowArr[3].value;
    magnitudeRowArr[1] = {value: magCount1};
    magnitudeRowArr[2] = {value: magCount2};
    magnitudeRowArr[3] = {value: magCount3};
    var magRow1 = magnitudeRowArr[1].value;
    var magRow2 = magnitudeRowArr[2].value;
    var magRow3 = magnitudeRowArr[3].value;
    
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
    var displayPlusRow = 'mag-button-plus-' + row;
    var displayMinusRow = 'mag-button-down-' + row;
    var displayFieldRow = 'magnitude-display-' + row;
    var displayPlusButton = document.getElementById(displayPlusRow);
    var displayMinusButton = document.getElementById(displayMinusRow);
    var displayField = document.getElementById(displayFieldRow);
    displayPlusButton.disabled = true;
    displayMinusButton.disabled = true;
    displayField.classList.remove('effect-magstyle');
    displayField.classList.add('effect-magstyle-disabled');
    magnitudeRowArr[row] = {value: 0}
    displayField.innerHTML = '-';
}

function enableMagnitude(row) {
    magnitudeRowArr[row] = {value: 0}
    var displayPlusRow = 'mag-button-plus-' + row;
    var displayMinusRow = 'mag-button-down-' + row;
    var displayFieldRow = 'magnitude-display-' + row;
    var displayPlusButton = document.getElementById(displayPlusRow);
    var displayMinusButton = document.getElementById(displayMinusRow);
    var displayField = document.getElementById(displayFieldRow);
    displayPlusButton.disabled = false;
    displayMinusButton.disabled = false;
    displayField.classList.remove('effect-magstyle-disabled');
    displayField.classList.add('effect-magstyle');
    displayField.innerHTML = '-';
}

function magnitudeDisplay(element) {
    var firedButton = $(element).attr('id');
    var buttonNumber = firedButton.slice(16);
    var buttonType = firedButton.slice(11,15);
    var magNumber = 'magnitude-display-' + buttonNumber;
    var magDisplay = document.getElementById(magNumber);
    var magCount = magnitudeRowArr[buttonNumber].value;
    console.log(magCount)
    var currEffect = effectTypeRowArr[buttonNumber].value;
    if (currEffect == 'dmg' || currEffect == 'heal') {
        switch(buttonType) {
            case 'plus':
                if (magCount >= 52) {
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
        magnitudeRowArr[buttonNumber] = {value: magCount};
        var magRow = magnitudeRowArr[buttonNumber].value;
        switch(effectTypeRowArr[buttonNumber].val) {
            case 'dmg':
            if (currRole == 'none') {
                if (magRow < 1) {
                    magDisplay.innerHTML = '-';
                } else {
                    magDisplay.innerHTML = '+'+(sdmg+magnitudeArr[magRow]);
                }
            } else {
                if (magRow < 1) {
                    magDisplay.innerHTML = '-';
                } else {
                    magDisplay.innerHTML = (sdmg+magnitudeArr[magRow]);
                }
            }
            break;
            case 'heal':
            if (currRole == 'none') {
                if (magRow < 1) {
                    magDisplay.innerHTML = '-';
                } else {
                    magDisplay.innerHTML = '+'+(heal+magnitudeArr[magRow]);
                }
            } else {
                if (magRow < 1) {
                    magDisplay.innerHTML = '-';
                } else {
                    magDisplay.innerHTML = (heal+magnitudeArr[magRow]);
                }
            }
            break;
        }
    } else if (currEffect == 'buff') {
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
        magnitudeRowArr[buttonNumber] = {value: magCount};
        var magRow = magnitudeRowArr[buttonNumber].value;
        if (currRole == 'none') {
            if (magRow < 1) {
                magDisplay.innerHTML = '-';
            } else {
                magDisplay.innerHTML = (buffMagArr[magRow]);
            }
        } else {
            if (magRow < 1) {
                magDisplay.innerHTML = '-';
            } else {
                magDisplay.innerHTML = (buffMagArr[magRow]);
            }
        }
    } else if (currEffect == 'debuff') {
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
        magnitudeRowArr[buttonNumber] = {value: magCount};
        var magRow = magnitudeRowArr[buttonNumber].value;
        if (currRole == 'none') {
            if (magRow < 1) {
                magDisplay.innerHTML = '-';
            } else {
                magDisplay.innerHTML = (debuffMagArr[magRow]);
            }
        } else {
            if (magRow < 1) {
                magDisplay.innerHTML = '-';
            } else {
                magDisplay.innerHTML = (debuffMagArr[magRow]);
            }
        }
    } else {
        return;
    }
    console.log(magCount)
}



myStorage = window.localStorage;


$(".magbutton").click(function() {
    magnitudeDisplay(this)
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