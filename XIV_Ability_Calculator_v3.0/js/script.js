import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getDatabase, ref, set, child, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithRedirect, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCySm2B_qI8Z-EP0-qGqKHYE-TF9ipD7Eg",
    authDomain: "xiv-ability-maker.firebaseapp.com",
    databaseURL: "https://xiv-ability-maker-default-rtdb.firebaseio.com",
    projectId: "xiv-ability-maker",
    storageBucket: "xiv-ability-maker.appspot.com",
    messagingSenderId: "847796021187",
    appId: "1:847796021187:web:9a2570fdd88c14b3553f76"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const db1 = getDatabase();
const provider = new GoogleAuthProvider();

const auth = getAuth();
const user = auth.currentUser;


//Login Scripts

const googleSignInButton = document.getElementById('googlesignin');
const emailCreateButton = document.getElementById('loginlauncher');
const logOutButton = document.getElementById('logout');
const overlay = document.getElementById('loginoverlay');
const createScreen = document.getElementById('createscreen');
const signInScreen = document.getElementById('signinscreen');
const createSubmit = document.getElementById('create');
const emailLogin = document.getElementById('emaillogin');
const loginWrapper = document.getElementById('loginoptions');
const topBar = document.getElementById('topbar');

var uid = null;

onAuthStateChanged(auth,(user) => {
    if (user) {
        console.log('Signed in!')
        uid = user.uid;
        let userData = user.providerData[0];
        let emailAddress = userData.email;
        let provider = user.providerData[0].providerId;
        logOutButton.style.display = "block";
        emailCreateButton.style.display = "none";
        loginWrapper.style.visibility = "visible";
        topBar.style.visibility = "visible";
        if (provider == 'google.com') {
            let loginType = document.getElementById('logintype');
            loginType.innerText = 'Google Auth';
        } else {
            let loginType = document.getElementById('logintype');
            loginType.innerText = emailAddress;
        }
        liveUpdate(uid)
    } else {
        loginDisplay()
        uid = null;
        logOutButton.style.display = "none";
        emailCreateButton.style.display = "block";
        loginWrapper.style.visibility = "visible";
        topBar.style.visibility = "visible";
    }
});

googleSignInButton.addEventListener('click', function() {
    signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})

function loginDisplay() {
    overlay.style.display = 'block';
    createScreen.style.display = 'block';
}

emailCreateButton.addEventListener('click', function() {
    loginDisplay()
})

overlay.addEventListener('click', function() {
    overlay.style.display = 'none';
    createScreen.style.display = 'none';
    onAuthStateChanged(auth,(user) => {
        if (user) {
            console.log('Signed in!')
            uid = user.uid;
            let userData = user.providerData[0];
            let emailAddress = userData.email;
            let provider = user.providerData[0].providerId;
            logOutButton.style.display = "block";
            emailCreateButton.style.display = "none";
            loginWrapper.style.visibility = "visible";
            topBar.style.visibility = "visible";
            if (provider == 'google.com') {
                let loginType = document.getElementById('logintype');
                loginType.innerText = 'Google Auth';
            } else {
                let loginType = document.getElementById('logintype');
                loginType.innerText = emailAddress;
            }
        } else {
            loginDisplay()
            uid = null;
            logOutButton.style.display = "none";
            emailCreateButton.style.display = "block";
            loginWrapper.style.visibility = "visible";
            topBar.style.visibility = "visible";
        }
    });
})

createSubmit.addEventListener('click', function() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    overlay.style.display = 'none';
    createScreen.style.display = 'none';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
})

emailLogin.addEventListener('click', function() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    overlay.style.display = 'none';
    createScreen.style.display = 'none';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})


logOutButton.addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log('Signed Out')
        update(ref(db, 'testing/new'), {
            test: 2,
        });
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
})








//Page Scripts
const magnitudeArr = ['-',0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370];
const mpCostArr = [0,10,45,80,115,150,185,220,255,290,325,360,395,430,465,500,535,570,605,640,675,710,745,780,815,850,885,920,955,990,1025,1060,1095,1130,1165,1200,1235,1270,1305,1340,1375,1410,1445,1480,1515,1550,1585,1620,1655,1690,1725,1760,1795,1830,1865,1900,1935,1970,2005,2040,2075,2110,2145,2180,2215,2250,2285,2320,2355,2390,2425,2460,2495,2530,2565,2600];
const buffMagArr = ['-','+5','+10','+15'];
const debuffMagArr = ['-','-5','-10','-15'];
const buffCostArr = [0,50,60,70];
const rowArr = ['null',1,2,3];

var loadSwitch = false;

var currName = ''
var currRole = 'none';
var sdmg = 0;
var heal = 0;
var maxMp = 2600;
var mpHalfMag = 63;
var mpCritThreshold = 76;
var targetCount = 1;

var readoutText = '-';
var mpCostTotal = 0;

var effectType1 = {value:'dmg'};
var prevEffectType1 = {value:'dmg'};
var targetType1 = {value:'enemy'};
var magnitude1 = {value: 0};
var magDisplay1 = {value: 0};
var areaEffect1 = {value:0};
var periodic1 = {value:0};
var mpCost1 = {value:0};
var magState1 = {value: 'enabled'};
var actions1 = {value: 1}

var effectType2 = {value:'none'};
var prevEffectType2 = {value:'none'};
var targetType2 = {value:'enemy'};
var magnitude2 = {value: 0};
var magDisplay2 = {value: 0};
var areaEffect2 = {value:0};
var periodic2 = {value:0};
var mpCost2 = {value:0};
var magState2 = {value: 'disabled'};
var actions2 = {value: 1}

var effectType3 = {value:'none'};
var prevEffectType3 = {value:'none'};
var targetType3 = {value:'enemy'};
var magnitude3 = {value: 0};
var magDisplay3 = {value: 0};
var areaEffect3 = {value:0};
var periodic3 = {value:0};
var mpCost3 = {value:0};
var magState3 = {value: 'disabled'};
var actions3 = {value: 1}

let effectTypeRowArr = ['null',effectType1,effectType2,effectType3];
let prevEffectTypeRowArr = ['null',prevEffectType1,prevEffectType2,prevEffectType3];
let targetTypeRowArr = ['null',targetType1,targetType2,targetType3];
let magnitudeRowArr = ['null',magnitude1,magnitude2,magnitude3];
let magDisplayRowArr = ['null',magDisplay1,magDisplay2,magDisplay3];
let areaEffectRowArr = ['null',areaEffect1,areaEffect2,areaEffect3];
let periodicRowArr = ['null',periodic1,periodic2,periodic3];
let mpCostRowArr = ['null',mpCost1,mpCost2,mpCost3];
let magStateRowArr = ['null',magState1,magState2,magState3];
let actionsRowArr = ['null',actions1, actions2, actions3];

const targetInput = document.getElementById('targets');

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
        if (effect == 'summon' || effect == 'invuln' || effect == 'stealth' || effect == 'esuna' || effect == 'revive' || effect == 'movement') {
            disableTargetEnemy(number)
        } else {
            enableTargetAll(number)
        }
        if (effect == 'summon' || effect == 'movement') {
            disableArea(number)
        } else {
            enableArea(number)
        }
    }
    updateMPCost()
    readoutDisplay()
    prevEffectTypeRowArr[number] = {value: effect}
    let delayedSwitch = setTimeout(function(){loadSwitch = false;},0);
}
function targetSelect(element) {
    let target = element.val();
    let number = element.attr('id').slice(6,7);
    targetTypeRowArr[number] = {value: target};
    updateMPCost()
    readoutDisplay()
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
            sdmg = 25;
            heal = 5;
            maxMp = 250;
            mpHalfMag = 4;
            mpCritThreshold = 7;
        break
        case 'ltank':
            sdmg = 25;
            heal = 5;
            maxMp = 300;
            mpHalfMag = 5;
            mpCritThreshold = 8;
        break
        case 'mstriker':
            sdmg = 35;
            heal = 5;
            maxMp = 250;
            mpHalfMag = 4;
            mpCritThreshold = 7;
        break
        case 'rstriker':
            sdmg = 30;
            heal = 5;
            maxMp = 200;
            mpHalfMag = 3;
            mpCritThreshold = 6;
        break
        case 'caster':
            sdmg = 45;
            heal = 5;
            maxMp = 550;
            mpHalfMag = 8;
            mpCritThreshold = 16;
        break
        case 'heal':
            sdmg = 20;
            heal = 35;
            maxMp = 550;
            mpHalfMag = 8;
            mpCritThreshold = 16;
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
            maxMp = 400;
            mpHalfMag = 6;
            mpCritThreshold = 12;
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
    targetField.disabled = false;
    if (prevEffectTypeRowArr[row].value != effectTypeRowArr[row].value && loadSwitch == false) {
        $(targetField).val('enemy');
        targetTypeRowArr[row] = {value: 'enemy'};
    }
}


function disablePeriodic(row) {
    let eotFieldRow = 'eot-check-' + row;
    let eotInput = document.getElementById('eot-check-' + row)
    let eotField = document.getElementById(eotFieldRow);
    eotField.disabled = true;
    if (loadSwitch == false) {
        eotField.checked = false;
    }
    effectCheckboxHandler(eotInput)
}

function enablePeriodic(row) {
    let eotFieldRow = 'eot-check-' + row;
    let eotInput = document.getElementById('eot-check-' + row)
    let eotField = document.getElementById(eotFieldRow);
    eotField.disabled = false;
    if (loadSwitch == false) {
        eotField.checked = false;
    }
    effectCheckboxHandler(eotInput)
}

function disableArea(row) {
    let aoeFieldRow = 'aoe-check-' + row;
    let aoeInput = document.getElementById('aoe-check-' + row)
    let aoeField = document.getElementById(aoeFieldRow);
    aoeField.disabled = true;
    if (loadSwitch == false) {
        aoeField.checked = false;
    }
    effectCheckboxHandler(aoeInput)
}

function enableArea(row) {
    let aoeFieldRow = 'aoe-check-' + row;
    let aoeInput = document.getElementById('aoe-check-' + row)
    let aoeField = document.getElementById(aoeFieldRow);
    aoeField.disabled = false;
    if (loadSwitch == false) {
        aoeField.checked = false;
    }
    effectCheckboxHandler(aoeInput)
}

function disableMagnitude(row) {
    magStateRowArr[row] = {value: 'disabled'}
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
    magnitudeRowArr[row] = {value: -1}
    displayField.innerHTML = '-';
}

function enableMagnitude(row) {
    magStateRowArr[row] = {value: 'enabled'}
    if ((magnitudeRowArr[row].value <= 0 || prevEffectTypeRowArr[row].value != effectTypeRowArr[row].value) && loadSwitch == false) {
        magnitudeRowArr[row] = {value: 0}
    }
    let displayPlusRow = 'mag-button-plus-' + row;
    let displayMinusRow = 'mag-button-down-' + row;
    let displayFieldRow = 'magnitude-display-' + row;
    let aoeFieldRow = 'aoe-check-' + row;
    let eotFieldRow = 'eot-check-' + row;
    let checkbox = document.getElementById('eot-check-' + row)
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
    effectCheckboxHandler(checkbox)
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
                    actions1
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
    updateMPCost()
    readoutDisplay()
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
            let effectChecker = document.getElementById('effectcheck'+rowNumber);
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
                    effectChecker.value = currEffect;
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
                case 'movement':
                    mpBaseCost = 50;
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
            let magCrit = document.getElementById('effect-magcell-'+rowNumber)
            if (magNumber >= mpCritThreshold && (currEffect == 'dmg' || currEffect == 'heal')) {
                magCrit.classList.remove('magnitudecell')
                magCrit.classList.add('magnitudecell-crit')
            } else {
                magCrit.classList.remove('magnitudecell-crit')
                magCrit.classList.add('magnitudecell')
            }
        } else {
            return;
        }
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        mpCostTotal = mpTotalCostArr.reduce(reducer);
    })
    let mpCostDisplay = document.getElementById("mpcost-display-total");
    let mpCostError = document.getElementById("mpcost-display-error");
    mpCostDisplay.innerHTML = mpCostTotal;
    if (mpCostTotal > maxMp) {
        mpCostDisplay.classList.remove('effect-mptotalstyle')
        mpCostDisplay.classList.add('effect-mptotalstyle-over')
        mpCostError.innerHTML = 'Over Max MP!'
        mpCostError.style.visibility = 'visible'
    } else {
        mpCostDisplay.classList.remove('effect-mptotalstyle-over')
        mpCostDisplay.classList.add('effect-mptotalstyle')
        mpCostError.innerHTML = ''
        mpCostError.style.visibility = 'hidden'
    }
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
    readoutDisplay()
}

function readoutDisplay() {
    var readoutArr = []
    var readoutText = document.getElementById('ability-readout');
    let isAoE = false;
    areaEffectRowArr.forEach(el => {
        if (el.value == 1) {
            isAoE = true;
        }
    })
    if (isAoE == false) {
        targetCount = 2;
        targetInput.value = 2;
        document.getElementById('targetswrapper').style.visibility = 'hidden';
        document.getElementById('targetsdiv').style.visibility = 'hidden';
    } else if (isAoE == true) {
        document.getElementById('targetswrapper').style.visibility = 'visible';
        document.getElementById('targetsdiv').style.visibility = 'visible';
    }
    rowArr.forEach(row => {
        if (row != 'null') {
            let effectType = effectTypeRowArr[row].value;
            let targetType = targetTypeRowArr[row].value;
            let magnitude = magnitudeRowArr[row].value;
            let magDisplayText2 = magDisplayRowArr[row].value;
            let areaEffect = areaEffectRowArr[row].value;
            let periodic = periodicRowArr[row].value;
            let magDisplayText = magDisplayText2;
            let readoutEffect = '';
            let readoutTarget = '';
            let checkedBoxes = 'none';
            let dmgReduction = 0;
            if (targetCount > 2 && areaEffect == 1) {
                dmgReduction = ((targetCount-2)*5);
                magDisplayText = Math.max(5,magDisplayText2-dmgReduction);
            } else {
                dmgReduction = 0;
            }
            if (areaEffectRowArr[row].value == 1 || effectType == 'summon' || effectType == 'stealth') {
                actionsRowArr[row] = {value:2};
            } else {
                actionsRowArr[row] = {value:1};
            }
            if (periodic == true) {
                if (magDisplayText == '+5') {
                    //magDisplayText = '+5';
                } else if (currRole == 'none') {
                    let magDisplayInt = parseInt(magDisplayText);
                    magDisplayText = '+' + (Math.floor((magDisplayInt/2)/5)*5);
                } else {
                    let magDisplayInt = parseInt(magDisplayText);
                    magDisplayText = (Math.floor((magDisplayInt/2)/5)*5);
                }
            } else {
            }
            if (areaEffect == true && periodic == true) {
                checkedBoxes = 'both'
            } else if (areaEffect == true && periodic == false) {
                checkedBoxes = 'aoe'
            } else if (areaEffect == false && periodic == true) {
                checkedBoxes = 'eot'
            } else {
                checkedBoxes = 'none'
            }
            if (effectType != 'none' && magnitude != 0) {
                switch (effectType) {
                    case 'dmg':
                        if (periodic != true) {
                            readoutEffect = magDisplayText + ' DMG to ';
                        } else {
                            readoutEffect = magDisplayText + ' DMG/turn to ';
                        }
                        break;
                    case 'heal':
                        if (periodic != true) {
                            readoutEffect = magDisplayText + ' HEAL to ';
                        } else {
                            readoutEffect = magDisplayText + ' HEAL/turn to ';
                        }
                        break;
                    case 'buff':
                        readoutEffect = magDisplayText + ' Buff on ';
                        break;
                    case 'debuff':
                        readoutEffect = magDisplayText + ' Debuff on ';
                        break;
                    case 'esuna':
                        readoutEffect = 'Esuna on ';
                        break;
                    case 'invuln':
                        readoutEffect = 'Invulnerability on ';
                        break;
                    case 'stealth':
                        readoutEffect = 'Stealth on ';
                        break;
                    case 'summon':
                        readoutEffect = 'Summon Minion';
                        break;
                    case 'revive':
                        readoutEffect = 'Revive ';
                        break;
                    case 'stun':
                        readoutEffect = 'Stun ';
                        break;
                    case 'movement':
                        readoutEffect = 'Movement ';
                        break;
                }
                if (effectType == 'summon') {
                    readoutTarget = '';
                } else if (areaEffect == true) {
                    if (targetType == 'enemy') {
                        readoutTarget = 'Enemies (AoE)';
                    } else if (targetType == 'ally') {
                        readoutTarget = 'Self & Allies (AoE)';
                    } else {
                        return
                    }
                } else if (areaEffect != true && effectType != 'movement') {
                    if (targetType == 'enemy') {
                        readoutTarget = 'Enemy';
                    } else if (targetType == 'ally') {
                        readoutTarget = 'Self/Ally';
                    } else {
                        return
                    }
                } else if(areaEffect != true && effectType == 'movement') {
                    readoutTarget = '(Self)';
                } else {
                    return
                }
                let readoutFinal = readoutEffect + readoutTarget;
                readoutArr.push(readoutFinal)
            } else {
                return
            }
        } else {
            return
        }
    })
    readoutText.innerHTML = readoutArr.join(' <br> ')
    let actionsHighest = [];
    actionsRowArr.forEach(el => {
        if (el.value != undefined) {
            actionsHighest.push(el.value)
        }
    })
    let actionsNumber = Math.max(...actionsHighest)
    document.getElementById('actions-display').innerText = actionsNumber;
}

function updateDropDowns() {
    let roleChoice = document.getElementById('role-option-' + currRole);
    let roleElement = document.getElementById('role-option');
    let role = $(roleElement)
    rowArr.forEach(row => {
        if (row != 'null') {
            //effect
            let currEffect = effectTypeRowArr[row].value;
            let effectChoice = document.getElementById('effect' + row + '-option-' + currEffect);
            effectChoice.selected = true;
            let effectElement = document.getElementById('effect' + row + '-option');
            let effect = $(effectElement)
            //target
            let currTarget = targetTypeRowArr[row].value;
            let targetChoice = document.getElementById('target' + row + '-option-' + currTarget);
            targetChoice.selected = true;
            let targetElement = document.getElementById('target' + row + '-option');
            let target = $(targetElement)
            //periodic
            let eot = document.getElementById('eot-check-' + row);
            let eotState = periodicRowArr[row].value;
            eot.checked = eotState;
            //aoe
            let aoe = document.getElementById('aoe-check-' + row);
            let aoeState = areaEffectRowArr[row].value == 1 ? true : false;
            aoe.checked = aoeState;
            updateMPCost()
            effectSelect(effect)
            targetSelect(target)
        } else {
            return
        }
    })
    roleChoice.selected = true;
    roleSelect(role)
}

function updateAll() {
    let name = document.getElementById('ability-name');
    $(name).val(currName)
    loadSwitch = true;
    updateMPCost()
    updateMag()
    readoutDisplay()
    let effect = 0;
    let roleElement = document.getElementById('role-option');
    let role = $(roleElement);
    rowArr.forEach(row => {
    })
    targetInput.value = targetCount;
    updateDropDowns()
    roleSelect(role)
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

function saveFile() {
    /*var saveFile = {
        'currRole': currRole,
        'sdmg': sdmg,
        'heal': heal,
        'maxMp': maxMp,
        'mpHalfMag': mpHalfMag,
        'mpCritThreshold': mpCritThreshold,
    
        'readoutText': readoutText,
        'mpCostTotal': mpCostTotal,
    
        'effectType1': effectTypeRowArr[1].value,
        'prevEffectType1': prevEffectTypeRowArr[1].value,
        'targetType1': targetTypeRowArr[1].value,
        'magnitude1': magnitudeRowArr[1].value,
        'magDisplay1': magDisplayRowArr[1].value,
        'areaEffect1': areaEffectRowArr[1].value,
        'periodic1': periodicRowArr[1].value,
        'mpCost1': mpCostRowArr[1].value,
        'magState1': magStateRowArr[1].value,
    
        'effectType2': effectTypeRowArr[2].value,
        'prevEffectType2': prevEffectTypeRowArr[2].value,
        'targetType2': targetTypeRowArr[2].value,
        'magnitude2': magnitudeRowArr[2].value,
        'magDisplay2': magDisplayRowArr[2].value,
        'areaEffect2': areaEffectRowArr[2].value,
        'periodic2': periodicRowArr[2].value,
        'mpCost2': mpCostRowArr[2].value,
        'magState2': magStateRowArr[2].value,
    
        'effectType3': effectTypeRowArr[3].value,
        'prevEffectType3': prevEffectTypeRowArr[3].value,
        'targetType3': targetTypeRowArr[3].value,
        'magnitude3': magnitudeRowArr[3].value,
        'magDisplay3': magDisplayRowArr[3].value,
        'areaEffect3': areaEffectRowArr[3].value,
        'periodic3': periodicRowArr[3].value,
        'mpCost3': mpCostRowArr[3].value,
        'magState3': magStateRowArr[3].value,
    };*/
    let name = document.getElementById('ability-name');
    currName = $(name).val();
    let saveFile = {
        'currName': currName,
        'currRole': currRole,
        'sdmg': sdmg,
        'heal': heal,
        'maxMp': maxMp,
        'mpHalfMag': mpHalfMag,
        'mpCritThreshold': mpCritThreshold,
        'targetCount': targetCount,
    
        'readoutText': readoutText,
        'mpCostTotal': mpCostTotal,
    
        'effectType': effectTypeRowArr,
        'prevEffectType': prevEffectTypeRowArr,
        'targetType': targetTypeRowArr,
        'magnitude': magnitudeRowArr,
        'magDisplay': magDisplayRowArr,
        'areaEffect': areaEffectRowArr,
        'periodic': periodicRowArr,
        'mpCost': mpCostRowArr,
        'magState': magStateRowArr,
    }
    
    var textToSave = JSON.stringify(saveFile);
    var hiddenElement = document.createElement('a');
  
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = currName+'.txt';
    hiddenElement.click();
}

function loadFile() {
    var file = document.getElementById("loadfile").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var fileLoad = JSON.parse(evt.target.result);
            currName = fileLoad.currName;
            currRole = fileLoad.currRole;
            sdmg = fileLoad.sdmg;
            heal = fileLoad.heal;
            maxMp = fileLoad.maxMp;
            mpHalfMag = fileLoad.mpHalfMag;
            mpCritThreshold = fileLoad.mpCritThreshold;
            targetCount = fileLoad.targetCount;
        
            readoutText = fileLoad.readoutText;
            mpCostTotal = fileLoad.mpCostTotal;
        
            effectTypeRowArr = fileLoad.effectType;
            prevEffectTypeRowArr = fileLoad.prevEffectType;
            targetTypeRowArr = fileLoad.targetType;
            magnitudeRowArr = fileLoad.magnitude;
            magDisplayRowArr = fileLoad.magDisplay;
            areaEffectRowArr = fileLoad.areaEffect;
            periodicRowArr = fileLoad.periodic;
            mpCostRowArr = fileLoad.mpCost;
            magStateRowArr = fileLoad.magState;
            updateAll()
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
}


var testSave = {
    'name': 'David',
    'age': 32,
}

$("#testcheckbox").click(function() {
});

$("#savefile").click(function() {
    saveFile()
});


$("#loadfile").change(function() {
    loadFile()
});

targetInput.addEventListener('change', function() {
    targetCount = this.value;
    updateAll()
})


function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("abilitylist");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }


const saveAbilityButton = document.getElementById('saveability')
saveAbilityButton.addEventListener('click', function() {
    let name = document.getElementById('ability-name');
    currName = $(name).val();
    let currId = currName.replaceAll(" ","_");
    if (currName != '') {
        let currAbility = $('[name="abilities"]:checked')[0];
        update(ref(db, 'users/'+uid), {
            [currName]: {
                'currName': currName,
                'currRole': currRole,
                'sdmg': sdmg,
                'heal': heal,
                'maxMp': maxMp,
                'mpHalfMag': mpHalfMag,
                'mpCritThreshold': mpCritThreshold,
                'targetCount': targetCount,
            
                'readoutText': readoutText,
                'mpCostTotal': mpCostTotal,
            
                'effectType': effectTypeRowArr,
                'prevEffectType': prevEffectTypeRowArr,
                'targetType': targetTypeRowArr,
                'magnitude': magnitudeRowArr,
                'magDisplay': magDisplayRowArr,
                'areaEffect': areaEffectRowArr,
                'periodic': periodicRowArr,
                'mpCost': mpCostRowArr,
                'magState': magStateRowArr,
            }
        })
        if (currAbility) {
            let abilityId = currAbility.id.slice(7).replaceAll("_"," ");
            let newName = "ability_"+abilityId.replaceAll(" ","_")
            if (abilityId != currName) {
                if (createdArr.includes(newName) == true) {
                    createdArr.forEach(em => {
                        if (em == newName) {
                            let index = createdArr.indexOf(em);
                            createdArr.splice(index,1)
                        }
                    })
                    deleteAbility(abilityId)
                } else {
                    deleteAbility(abilityId)
                }
            }
        }
        let nextId = 'option-'+currId;
        let newEl = document.getElementById(nextId);
        newEl.checked = true
    }
})

function loadAbility(el) {
    get(child(dbRef, 'users/'+uid)).then((snapshot) => {
        let data = snapshot.val();
        let newName = el.replaceAll("_"," ");
        for (let x in data) {
            let a = data[x];
            if (a.currName == newName) {
                var fileLoad = a;
                currName = fileLoad.currName;
                currRole = fileLoad.currRole;
                sdmg = fileLoad.sdmg;
                heal = fileLoad.heal;
                maxMp = fileLoad.maxMp;
                mpHalfMag = fileLoad.mpHalfMag;
                mpCritThreshold = fileLoad.mpCritThreshold;
                targetCount = fileLoad.targetCount;
            
                readoutText = fileLoad.readoutText;
                mpCostTotal = fileLoad.mpCostTotal;
            
                effectTypeRowArr = fileLoad.effectType;
                prevEffectTypeRowArr = fileLoad.prevEffectType;
                targetTypeRowArr = fileLoad.targetType;
                magnitudeRowArr = fileLoad.magnitude;
                magDisplayRowArr = fileLoad.magDisplay;
                areaEffectRowArr = fileLoad.areaEffect;
                periodicRowArr = fileLoad.periodic;
                mpCostRowArr = fileLoad.mpCost;
                magStateRowArr = fileLoad.magState;
                updateAll()
            }
        }
    })
}

function loadNewAbility() {
    get(child(dbRef, 'users/universal')).then((snapshot) => {
        let data = snapshot.val();
        for (let x in data) {
            let a = data[x];
            if (a.currName == '') {
                var fileLoad = a;
                currName = fileLoad.currName;
                currRole = fileLoad.currRole;
                sdmg = fileLoad.sdmg;
                heal = fileLoad.heal;
                maxMp = fileLoad.maxMp;
                mpHalfMag = fileLoad.mpHalfMag;
                mpCritThreshold = fileLoad.mpCritThreshold;
                targetCount = fileLoad.targetCount;
            
                readoutText = fileLoad.readoutText;
                mpCostTotal = fileLoad.mpCostTotal;
            
                effectTypeRowArr = fileLoad.effectType;
                prevEffectTypeRowArr = fileLoad.prevEffectType;
                targetTypeRowArr = fileLoad.targetType;
                magnitudeRowArr = fileLoad.magnitude;
                magDisplayRowArr = fileLoad.magDisplay;
                areaEffectRowArr = fileLoad.areaEffect;
                periodicRowArr = fileLoad.periodic;
                mpCostRowArr = fileLoad.mpCost;
                magStateRowArr = fileLoad.magState;
                updateAll()
            }
        }
    })
}

let newAbilityButton = document.getElementById('newability');

function newAbility() {
    let newCheck = document.getElementById('ability_temp')
    if (newCheck) {

    } else {
    //Clear Ability Maker
    loadNewAbility()
    //Create Ability
    let abilityList = document.getElementById('abilitylist');
    let el = 'temp'
    let newName = "New Ability";
    // li element
    let li = document.createElement('li');
    li.classList.add('abilitylistitem')
    li.id = 'ability_'+el;
    abilityList.appendChild(li)
    // bounce Span
    let selectBounce = document.createElement('span');
    selectBounce.classList.add('selectbounce')
    let arrow = document.createTextNode('>')
    selectBounce.appendChild(arrow)
    li.appendChild(selectBounce)
    // input
    let input = document.createElement('input')
    input.classList.add('abilitylistinput')
    input.type = 'radio';
    input.id = 'option-'+el;
    input.value = createdArr.length;
    input.name = 'abilities';
    li.appendChild(input)
    // label
    let label = document.createElement('label')
    label.htmlFor = 'option-'+el;
    li.appendChild(label)
    // name span
    let name = document.createElement('span')
    name.classList.add("abilitylabel")
    let nameText = document.createTextNode(newName)
    name.appendChild(nameText)
    label.appendChild(name)
    input.onchange = function() {loadNewAbility()};
    createdArr.push(li.id)
    let charLength = nameText.length;
    if (charLength > 13) {
        let lengthDiff = charLength-13;
        name.classList.add('marquee'+lengthDiff)
    }
    if (createdArr.length == 1) {
        let firstRadio = $('[name="abilities"][value="0"]')[0];
        firstRadio.checked = true;
        loadAbility(firstRadio.id.slice(7))
    } else {
        input.checked = true;
    }

    }
}

newAbilityButton.addEventListener('click', function() {
    newAbility()
})

function marquee() {
    let listArr = document.getElementsByClassName('abilitylabel')
    for (let x in listArr) {
        let string = x.innerHTML;
        let charLength = string.size();
        if (charLength > 13) {
            x.classList.add('marquee')
        }
    }
}
let createdArr = [];
let deletedArr = [];
function liveUpdate(uid) {
    onValue(ref(db, 'users/'+uid), (snapshot) => {
        let data = snapshot.val();
        if (data) {            
            let listArr = [];
            let dbArr = [];
            let dataArr = Object.keys(data)
            dataArr.forEach(x => {
                let newId = x.replaceAll(/ /g,"_");
                dbArr.push(newId)
                listArr.push(newId)
                let list = $('.abilitylistitem');
            })
            //New Item Creation
            let list = $('.abilitylistitem');
            let abilityList = document.getElementById('abilitylist');
            listArr.forEach(el => {
                if (createdArr.includes('ability_'+el) != true) {
                    let newName = el.replaceAll("_"," ");
                    // li element
                    let li = document.createElement('li');
                    li.classList.add('abilitylistitem')
                    li.id = 'ability_'+el;
                    abilityList.appendChild(li)
                    // bounce Span
                    /*let selectBounce = document.createElement('span');
                    selectBounce.classList.add('selectbounce')
                    let arrow = document.createTextNode('>')
                    selectBounce.appendChild(arrow)
                    li.appendChild(selectBounce)*/
                    // Hand
                    let selectHand = document.createElement('img');
                    selectHand.src = './img/hand16.png';
                    selectHand.classList.add('selectbounce')
                    li.appendChild(selectHand)
                    // input
                    let input = document.createElement('input')
                    input.classList.add('abilitylistinput')
                    input.type = 'radio';
                    input.id = 'option-'+el;
                    input.value = createdArr.length;
                    input.name = 'abilities';
                    li.appendChild(input)
                    // label
                    let label = document.createElement('label')
                    label.htmlFor = 'option-'+el;
                    li.appendChild(label)
                    // name span
                    let name = document.createElement('span')
                    name.classList.add("abilitylabel")
                    let nameText = document.createTextNode(newName)
                    name.appendChild(nameText)
                    label.appendChild(name)
                    input.onchange = function() {loadAbility(el)};
                    createdArr.push(li.id)
                    let charLength = nameText.length;
                    if (charLength > 13) {
                        let lengthDiff = charLength-13;
                        name.classList.add('marquee'+lengthDiff)
                    }
                    if (createdArr.length == 1) {
                        let firstRadio = $('[name="abilities"][value="0"]')[0];
                        firstRadio.checked = true;
                        loadAbility(firstRadio.id.slice(7))
                    }
                }
            })
            sortList()
            list.each(function(i) {
                let el = list[i];
                let id = el.id;
                if (createdArr.includes(id) != true) {
                    el.remove()
                }
            })    
        } else {
            console.log('NO DATA')
            if (createdArr.length <= 0) {
                newAbility()
                
                /*update(ref(db, 'users/'+uid), {
                    'New Ability': {
                        'areaEffect': [null,{'value':0},{'value':0},{'value':0}],
                        'currName': '',
                        'currRole': 'none',
                        'effectType': [null,{'value':'dmg'},{'value':'none'},{'value':'none'}],
                        'heal': 0,
                        'magDisplay': [null,{'value':0},{'value':0},{'value':0}],
                        'magState': [null,{'value':'enabled'},{'value':'disabled'},{'value':'disabled'}],
                        'magnitude': [null,{'value':0},{'value':-1},{'value':-1}],
                        'maxMp': 2600,
                        'mpCost': [null,{'value':0},{'value':0},{'value':0}],
                        'mpCostTotal': 0,
                        'mpCritThreshold': 76,
                        'mpHalfMag': 63,
                        'periodic': [null,{'value':0},{'value':0},{'value':0}],
                        'prevEffectType': [null,{'value':'dmg'},{'value':'none'},{'value':'none'}],
                        'readoutText': "-",
                        'sdmg': 0,
                        'targetType': [null,{'value':'enemy'},{'value':'enemy'},{'value':'enemy'}]
                    }
                })*/
            }
            let list = $('.abilitylistitem');
            list.each(function(i) {
                let el = list[i];
                let id = el.id;
                if (createdArr.includes(id) != true) {
                    el.remove()
                }
            })  
        }
    })
}

function deleteAbility(el) {
    let list = Array.from(document.getElementsByClassName('abilitylistinput'));
    if (el == 'temp' && list.length == 1) {

    } else {
        let newName = "ability_"+el.replaceAll(" ","_");
        let element = document.getElementById(newName);
        if (createdArr.includes(newName) == true) {
            createdArr.forEach(em => {
                if (em == newName) {
                    let index = createdArr.indexOf(em);
                    createdArr.splice(index,1)
                }
            })
        }
        element.remove()
        let list = Array.from(document.getElementsByClassName('abilitylistinput'));
        if (list.length > 0) {
            list[0].checked = true;
        }
        console.log(el+" has been deleted.")
        set(ref(db, 'users/'+uid+'/'+el), null);
    }
}

  let delButton = document.getElementById('deleteability')

delButton.addEventListener('click', function() {
    let currAbility = $('[name="abilities"]:checked')[0];
    let abilityId = currAbility.id.slice(7).replaceAll("_"," ");
    deleteAbility(abilityId)
})

let newAbilityStats = {
    'areaEffect': [null,{'value':0},{'value':0},{'value':0}],
    'currName': 'New Ability',
    'currRole': 'none',
    'effectType': [null,{'value':'dmg'},{'value':'none'},{'value':'none'}],
    'heal': 0,
    'magDisplay': [null,{'value':0},{'value':0},{'value':0}],
    'magState': [null,{'value':'enabled'},{'value':'disabled'},{'value':'disabled'}],
    'magnitude': [null,{'value':0},{'value':-1},{'value':-1}],
    'maxMp': 2600,
    'mpCost': [null,{'value':0},{'value':0},{'value':0}],
    'mpCostTotal': 0,
    'mpCritThreshold': 76,
    'mpHalfMag': 63,
    'periodic': [null,{'value':0},{'value':0},{'value':0}],
    'prevEffectType': [null,{'value':'dmg'},{'value':'none'},{'value':'none'}],
    'readoutText': "-",
    'sdmg': 0,
    'targetType': [null,{'value':'enemy'},{'value':'enemy'},{'value':'enemy'}]
}
let newAbilityStats2 = {"currName":"","currRole":"none","sdmg":0,"heal":0,"maxMp":2600,"mpHalfMag":63,"mpCritThreshold":76,"readoutText":"-","mpCostTotal":0,"effectType":[null,{"value":"dmg"},{"value":"none"},{"value":"none"}],"prevEffectType":[null,{"value":"dmg"},{"value":"none"},{"value":"none"}],"targetType":[null,{"value":"enemy"},{"value":"enemy"},{"value":"enemy"}],"magnitude":[null,{"value":0},{"value":-1},{"value":-1}],"magDisplay":[null,{"value":0},{"value":0},{"value":0}],"areaEffect":[null,{"value":0},{"value":0},{"value":0}],"periodic":[null,{"value":0},{"value":0},{"value":0}],"mpCost":[null,{"value":0},{"value":0},{"value":0}],"magState":[null,{"value":"enabled"},{"value":"disabled"},{"value":"disabled"}]}
