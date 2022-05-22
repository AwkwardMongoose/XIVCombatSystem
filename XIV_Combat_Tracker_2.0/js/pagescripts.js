import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getDatabase, ref, set, child, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnR8xwXkXgZpX8cO2XoOaQpDl82_lQz5w",
  authDomain: "xiv-combat-tracker.firebaseapp.com",
  databaseURL: "https://xiv-combat-tracker-default-rtdb.firebaseio.com",
  projectId: "xiv-combat-tracker",
  storageBucket: "xiv-combat-tracker.appspot.com",
  messagingSenderId: "826191914384",
  appId: "1:826191914384:web:830f8699e773fd1b083f15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const db1 = getDatabase();

window.onload = function() {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log('Signed in!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
}

dragula([document.getElementById('entroot')], {slideFactorY: 50, slideFactorX: 50,});

//CONSTS and VARS
const limitChecks2 = $("input[class='limit-check']");
const createButton = document.getElementById('newentbutton');
var num = 1;


//ROLE OBJECTS
const tank = {
    'hp': 200,
    'mp': 250,
    'atk': 10,
    'def': 80,
    'dmg': 20,
    'sdmg': 25,
    'heal': 5,
    'rec': 35,
}
const ltank = {
    'hp': 170,
    'mp': 300,
    'atk': 15,
    'def': 75,
    'dmg': 25,
    'sdmg': 25,
    'heal': 5,
    'rec': 35,
}
const mstr = {
    'hp': 150,
    'mp': 250,
    'atk': 30,
    'def': 65,
    'dmg': 35,
    'sdmg': 35,
    'heal': 5,
    'rec': 35,
}
const rstr = {
    'hp': 140,
    'mp': 200,
    'atk': 30,
    'def': 60,
    'dmg': 30,
    'sdmg': 30,
    'heal': 5,
    'rec': 35,
}
const cast = {
    'hp': 120,
    'mp': 550,
    'atk': 20,
    'def': 50,
    'dmg': 10,
    'sdmg': 45,
    'heal': 5,
    'rec': 50,
}
const heal = {
    'hp': 100,
    'mp': 550,
    'atk': 0,
    'def': 45,
    'dmg': 10,
    'sdmg': 20,
    'heal': 35,
    'rec': 75,
}
const mtank = {
    'hp': 75,
    'mp': 100,
    'atk': 10,
    'def': 60,
    'dmg': 10,
    'sdmg': 10,
    'heal': '-',
    'rec': 15,
}
const mdps = {
    'hp': 50,
    'mp': 100,
    'atk': 20,
    'def': 40,
    'dmg': 20,
    'sdmg': 20,
    'heal': '-',
    'rec': 15,
}
const mheal = {
    'hp': 30,
    'mp': 100,
    'atk': '-',
    'def': 20,
    'dmg': '-',
    'sdmg': '-',
    'heal': 10,
    'rec': 25,
}
const boss = {
    'hp': 900,
    'mp': 600,
    'atk': 25,
    'def': 60,
    'dmg': 40,
    'sdmg': 50,
    'heal': 30,
    'rec': 50,
}
//END ROLE OBJECTS

//Default New Card
let newCardData = {
    'row': '',
    'name': '',
    'role': 'tank',
    'type': 'npc',
    'init': '',
    'imgURL': 'default',
    'currHP': tank.hp,
    'maxHP': tank.hp,
    'currMP': tank.mp,
    'maxMP': tank.mp,
    'atk': tank.atk,
    'def': tank.def,
    'dmg': tank.dmg,
    'sdmg': tank.sdmg,
    'heal': tank.heal,
    'rec': tank.rec,
    'lb1': false,
    'lb2': false,
    'lb3': false,
};
//
//console.log(del1.id.match(/[a-zA-Z]+/g)[0],del1.id.match(/\d+/g)[0])

function limitBar(element) {
    let row = element.id.match(/\d+/g)[0];
        let limit1 = document.getElementById('limiti'+row);
        let limit2 = document.getElementById('limitii'+row);
        let limit3 = document.getElementById('limitiii'+row);
        let limitSlice = element.id.slice(5);
        let limitNum = (limitSlice.match(/i/g)||[]).length;
        console.log(limitNum)
        let bar1 = document.getElementById('bari'+row);
        let bar2 = document.getElementById('barii'+row);
        let bar3 = document.getElementById('bariii'+row);
        let checked = element.checked;
        switch (limitNum) {
            case 1:
                if (checked == false) {
                    limit2.checked = false;
                    limit3.checked = false;
                    $(bar1).removeClass('limit-fill')
                } else {
                    $(bar1).addClass('limit-fill')
                }
                $(bar2).removeClass('limit-fill')
                $(bar3).removeClass('limit-fill')
                break
            case 2:
                if (checked == false) {
                    limit3.checked = false;
                    $(bar2).removeClass('limit-fill')
                } else {
                    limit1.checked = true;
                    $(bar1).addClass('limit-fill')
                    $(bar2).addClass('limit-fill')
                }
                $(bar3).removeClass('limit-fill')
                break
            case 3:
                if (checked == false) {
                    $(bar3).removeClass('limit-fill')
                } else {
                    limit1.checked = true;
                    limit2.checked = true;
                    $(bar1).addClass('limit-fill')
                    $(bar2).addClass('limit-fill')
                    $(bar3).addClass('limit-fill')
                }
                break
        }
}

function newCard(row,role) {
    let entroot = document.getElementById('entroot');
    let playerView = (window.location.href).includes('playerview');
    let dmView = (window.location.href).includes('dmview');
    if (playerView == true) {
        let hideCardPlayer = document.createElement('input')
        hideCardPlayer.classList.add('hide-card')
        hideCardPlayer.type = 'hidden';
        hideCardPlayer.value = 'npc'
        hideCardPlayer.id = 'hidecard'+row;
        entroot.appendChild(hideCardPlayer)
    }

    //GRID STUFF
    let panel = document.createElement('div');
    panel.classList.add('ent-grid-backpanel')
    panel.id = 'card'+row;
    entroot.appendChild(panel)
    if (dmView == true) {
        let hideCardDM = document.createElement('input')
        hideCardDM.classList.add('hide-card')
        hideCardDM.type = 'hidden';
        hideCardDM.value = 'npc'
        hideCardDM.id = 'hidecard'+row;
        panel.appendChild(hideCardDM)
    }
    let grid = document.createElement('div');
    grid.classList.add('ent-grid')
    panel.appendChild(grid)

    //NAME DIV
    let nameDiv = document.createElement('div');
    nameDiv.classList.add('ent-name')
    grid.appendChild(nameDiv);
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name...';
    nameInput.id = 'name'+row;
    nameDiv.appendChild(nameInput)

    //IMAGE DIV
    let imageDiv = document.createElement('div');
    imageDiv.id = 'image'+row;
    imageDiv.classList.add('ent-image')
    let avImg = document.createElement('img')
    avImg.classList.add('image-item')
    avImg.id = 'img'+row;
    avImg.src = '../img/Blank.png';
    imageDiv.appendChild(avImg)
    let imageButton = document.createElement('button')
    imageButton.classList.add('image-selector')
    imageButton.id = 'imgbutton'+row;
    imageDiv.appendChild(imageButton)
    let imgSrc = document.createElement('img')
    imgSrc.src = "../img/imgbutton.png";
    imgSrc.height = '10';
    imageButton.appendChild(imgSrc)
    grid.appendChild(imageDiv)

    //ROLE DIV
    let roleDiv = document.createElement('div');
    roleDiv.classList.add('ent-role')
    grid.appendChild(roleDiv)
    let roleSel = document.createElement('select');
    roleSel.id = 'role'+row;
    roleSel.value = 'tank';
    roleDiv.appendChild(roleSel)
    let roleTank = document.createElement('option');
    roleTank.value = "tank";
    roleTank.selected = 'true'
    let tankName = document.createTextNode('Tank')
    roleTank.appendChild(tankName)
    let roleLTank = document.createElement('option');
    roleLTank.value = "ltank";
    let lTankName = document.createTextNode('Light Tank')
    roleLTank.appendChild(lTankName)
    let roleMStrike = document.createElement('option');
    roleMStrike.value = "mstr";
    let mStrikeName = document.createTextNode('Melee Striker')
    roleMStrike.appendChild(mStrikeName)
    let roleRStrike = document.createElement('option');
    roleRStrike.value = "rstr";
    let rStrikeName = document.createTextNode('Ranged Striker')
    roleRStrike.appendChild(rStrikeName)
    roleSel.appendChild(roleTank)
    roleSel.appendChild(roleLTank)
    roleSel.appendChild(roleMStrike)
    roleSel.appendChild(roleRStrike)

    //TYPE
    let entTypeSel = document.createElement('select');
    entTypeSel.classList.add('type-selector')
    roleDiv.appendChild(entTypeSel)
    entTypeSel.id = 'type'+row;
    //NPC
    let typeNPC = document.createElement('option');
    entTypeSel.appendChild(typeNPC)
    typeNPC.value = 'npc';
    let npcName = document.createTextNode('NPC')
    typeNPC.appendChild(npcName)
    //Player
    let typePlayer = document.createElement('option');
    entTypeSel.appendChild(typePlayer)
    typePlayer.value = 'player';
    let playerName = document.createTextNode('Player')
    typePlayer.appendChild(playerName)

    //HP DIV
    let hpDiv = document.createElement('div')
    hpDiv.classList.add('ent-HP')
    let hpText = document.createTextNode("HP")
    hpDiv.appendChild(hpText)
    grid.appendChild(hpDiv)
    let hpSpan = document.createElement('span')
    hpSpan.classList.add('underline')
    hpDiv.appendChild(hpSpan)
    let currHPInput = document.createElement('input')
    currHPInput.classList.add('points')
    currHPInput.type = 'text'
    currHPInput.value = role.hp;
    currHPInput.id = 'currhp'+row;
    hpSpan.appendChild(currHPInput)
    let hpSlashSpan = document.createElement('span')
    hpSlashSpan.classList.add('slash')
    let hpSlash = document.createTextNode('/')
    hpSlashSpan.appendChild(hpSlash)
    hpSpan.appendChild(hpSlashSpan)
    let maxHPInput = document.createElement('input')
    maxHPInput.classList.add('points2')
    maxHPInput.type = 'text'
    maxHPInput.value = role.hp;
    maxHPInput.id = 'maxhp'+row;
    hpSpan.appendChild(maxHPInput)


    //MP DIV
    let mpDiv = document.createElement('div')
    mpDiv.classList.add('ent-MP')
    let mpText = document.createTextNode("MP")
    mpDiv.appendChild(mpText)
    grid.appendChild(mpDiv)
    let mpSpan = document.createElement('span')
    mpSpan.classList.add('underline')
    mpDiv.appendChild(mpSpan)
    let currMPInput = document.createElement('input')
    currMPInput.classList.add('points')
    currMPInput.type = 'text'
    currMPInput.value = role.mp;
    currMPInput.id = 'currmp'+row;
    mpSpan.appendChild(currMPInput)
    let mpSlashSpan = document.createElement('span')
    mpSlashSpan.classList.add('slash')
    let mpSlash = document.createTextNode('/')
    mpSlashSpan.appendChild(mpSlash)
    mpSpan.appendChild(mpSlashSpan)
    let maxMPInput = document.createElement('input')
    maxMPInput.classList.add('points2')
    maxMPInput.type = 'text'
    maxMPInput.value = role.mp;
    maxMPInput.id = 'maxmp'+row;
    mpSpan.appendChild(maxMPInput)


    //STATS DIV
    let statsDiv = document.createElement('div')
    statsDiv.classList.add('ent-stats')
    grid.appendChild(statsDiv)

    let atkDiv = document.createElement('div')
    atkDiv.classList.add('atk')
    statsDiv.appendChild(atkDiv)
    let atkName = document.createTextNode('ATK')
    atkDiv.appendChild(atkName)

    let defDiv = document.createElement('div')
    defDiv.classList.add('def')
    statsDiv.appendChild(defDiv)
    let defName = document.createTextNode('DEF')
    defDiv.appendChild(defName)

    let dmgDiv = document.createElement('div')
    dmgDiv.classList.add('dmg')
    statsDiv.appendChild(dmgDiv)
    let dmgName = document.createTextNode('DMG')
    dmgDiv.appendChild(dmgName)

    let sdmgDiv = document.createElement('div')
    sdmgDiv.classList.add('sdmg')
    statsDiv.appendChild(sdmgDiv)
    let sdmgName = document.createTextNode('SDMG')
    sdmgDiv.appendChild(sdmgName)

    let healDiv = document.createElement('div')
    healDiv.classList.add('heal')
    statsDiv.appendChild(healDiv)
    let healName = document.createTextNode('HEAL')
    healDiv.appendChild(healName)

    let recDiv = document.createElement('div')
    recDiv.classList.add('rec')
    statsDiv.appendChild(recDiv)
    let recName = document.createTextNode('REC')
    recDiv.appendChild(recName)

    let atkNumDiv = document.createElement('div')
    atkNumDiv.classList.add('atknum')
    statsDiv.appendChild(atkNumDiv)
    let atkDown = document.createElement('button')
    atkDown.classList.add('magbutton')
    let atkMinus = document.createTextNode('-')
    atkDown.appendChild(atkMinus)
    atkNumDiv.appendChild(atkDown)
    let atkNumName = document.createElement('input')
    atkNumName.classList.add('inputnum')
    atkNumName.type = 'number';
    atkNumName.step = '5';
    atkNumName.value = role.atk;
    atkNumName.id = 'atk'+row;
    atkNumDiv.appendChild(atkNumName)
    let atkUp = document.createElement('button')
    atkUp.classList.add('magbutton')
    let atkPlus = document.createTextNode('+')
    atkUp.appendChild(atkPlus)
    atkNumDiv.appendChild(atkUp)

    let defNumDiv = document.createElement('div')
    defNumDiv.classList.add('defnum')
    statsDiv.appendChild(defNumDiv)
    let defDown = document.createElement('button')
    defDown.classList.add('magbutton')
    let defMinus = document.createTextNode('-')
    defDown.appendChild(defMinus)
    defNumDiv.appendChild(defDown)
    let defNumName = document.createElement('input')
    defNumName.classList.add('inputnum')
    defNumName.type = 'number';
    defNumName.step = '5';
    defNumName.value = role.def;
    defNumName.id = 'def'+row;
    defNumDiv.appendChild(defNumName)
    let defUp = document.createElement('button')
    defUp.classList.add('magbutton')
    let defPlus = document.createTextNode('+')
    defUp.appendChild(defPlus)
    defNumDiv.appendChild(defUp)

    let dmgNumDiv = document.createElement('div')
    dmgNumDiv.classList.add('dmgnum')
    statsDiv.appendChild(dmgNumDiv)
    let dmgNumName = document.createTextNode(role.dmg)
    dmgNumName.id = 'dmg'+row;
    dmgNumDiv.appendChild(dmgNumName)

    let sdmgNumDiv = document.createElement('div')
    sdmgNumDiv.classList.add('sdmgnum')
    statsDiv.appendChild(sdmgNumDiv)
    let sdmgNumName = document.createTextNode(role.sdmg)
    sdmgNumName.id = 'sdmg'+row;
    sdmgNumDiv.appendChild(sdmgNumName)

    let healNumDiv = document.createElement('div')
    healNumDiv.classList.add('healnum')
    statsDiv.appendChild(healNumDiv)
    let healNumName = document.createTextNode(role.heal)
    healNumName.id = 'heal'+row;
    healNumDiv.appendChild(healNumName)

    let recNumDiv = document.createElement('div')
    recNumDiv.classList.add('recnum')
    statsDiv.appendChild(recNumDiv)
    let recNumName = document.createTextNode(role.rec)
    recNumName.id = 'rec'+row;
    recNumDiv.appendChild(recNumName)

    //INIT DIV
    let initDiv = document.createElement('div')
    initDiv.classList.add('ent-init')
    grid.appendChild(initDiv)
    let initSpan = document.createElement('span')
    initSpan.classList.add('init-title')
    initDiv.appendChild(initSpan)
    let initText = document.createTextNode('Init')
    initSpan.appendChild(initText)
    let initInput = document.createElement('input')
    initInput.classList.add('init')
    initInput.type = 'text';
    initInput.id = 'init'+row;
    initDiv.appendChild(initInput)

    //DELETE DIV
    let delDiv = document.createElement('div')
    delDiv.classList.add('ent-delete')
    grid.appendChild(delDiv)
    let delButton = document.createElement('button')
    delButton.classList.add('delbutton')
    delButton.id = 'del'+row;
    let delX = document.createTextNode('x')
    delButton.appendChild(delX)
    delDiv.appendChild(delButton)


    //LIMIT DIV
    let limitDiv = document.createElement('div')
    limitDiv.classList.add('ent-limit')
    grid.appendChild(limitDiv)

    let limitGrid = document.createElement('div')
    limitGrid.classList.add('limit-grid')
    limitDiv.appendChild(limitGrid)

    let limitHead = document.createElement('div')
    limitHead.classList.add('limit-head')
    limitGrid.appendChild(limitHead)
    let lHeadName = document.createTextNode('LIMIT')
    limitHead.appendChild(lHeadName)

    let limitBlank = document.createElement('div')
    limitBlank.classList.add('limit-blank')
    limitGrid.appendChild(limitBlank)

    let limitCell = document.createElement('div')
    limitCell.classList.add('limit-cell')
    limitGrid.appendChild(limitCell)

    let lCheck1 = document.createElement('input')
    lCheck1.type = 'checkbox'
    lCheck1.classList.add('limit-1')
    lCheck1.classList.add('limit-check')
    lCheck1.id = 'limiti'+row;
    limitCell.appendChild(lCheck1)

    let limitSpan1 = document.createElement('span')
    limitSpan1.classList.add('limit-divide')
    limitCell.appendChild(limitSpan1)

    let lCheck2 = document.createElement('input')
    lCheck2.type = 'checkbox'
    lCheck2.classList.add('limit-2')
    lCheck2.classList.add('limit-check')
    lCheck2.id = 'limitii'+row;
    limitCell.appendChild(lCheck2)

    let limitSpan2 = document.createElement('span')
    limitSpan2.classList.add('limit-divide')
    limitCell.appendChild(limitSpan2)

    let lCheck3 = document.createElement('input')
    lCheck3.type = 'checkbox'
    lCheck3.classList.add('limit-3')
    lCheck3.classList.add('limit-check')
    lCheck3.id = 'limitiii'+row;
    limitCell.appendChild(lCheck3)

    let lBar1 = document.createElement('div')
    lBar1.classList.add('limit-bar1')
    lBar1.id = 'bari'+row;
    limitCell.appendChild(lBar1)

    let lBar2 = document.createElement('div')
    lBar2.classList.add('limit-bar2')
    lBar2.id = 'barii'+row;
    limitCell.appendChild(lBar2)

    let lBar3 = document.createElement('div')
    lBar3.classList.add('limit-bar3')
    lBar3.id = 'bariii'+row;
    limitCell.appendChild(lBar3)
}

function writeRowData(row,card) {
    let arrayNum = row;
    set(ref(db, 'rows/'+arrayNum), {
        'row': row,
        'name': card.name,
        'role': card.role,
        'type': card.type,
        'init': card.init,
        'imgURL': card.imgURL,
        'currHP': card.currHP,
        'maxHP': card.maxHP,
        'currMP': card.currMP,
        'maxMP': card.maxMP,
        'atk': card.atk,
        'def': card.def,
        'dmg': card.dmg,
        'sdmg': card.sdmg,
        'heal': card.heal,
        'rec': card.rec,
        'lb1': card.lb1,
        'lb2': card.lb2,
        'lb3': card.lb3,       
    });
}

function changeRowData(card) {
    let row = card.row;
    switch (type) {
      case 'charname':
        update(ref(db, 'rows/'+rowNum), {
          name: value,
      });
      break
      case 'role':
        update(ref(db, 'rows/'+rowNum), {
          role: value,
      });
      break
    }
  }

function deleteRow(element) {
    let row = element.id.slice(3);
    let delRow = document.getElementById('card'+row);
    delRow.remove();
}

function removeRowData(rowNum) {
    let arrayNum = rowNum;
    set(ref(db, 'rows/'+arrayNum), null);
  }

onValue(ref(db, 'rows/'), (snapshot) => {
    let data = snapshot.val();
    if (snapshot.exists()) {
        let rowCount = [0]
        for (let x in data) {
            let a = data[x];
            let rowNum = a.row;
            //Row Count
            rowCount.push(parseInt(rowNum))
            //Update Type
            let cardType = $('#type'+rowNum);
            let hideVal = $('#hidecard'+rowNum)[0];
            console.log(hideVal.value)
            if (hideVal.value != a.type) {
                hideVal.value = a.type;
            }
        }
        num = rowCount.reduce(function(a, b) {
            return Math.max(a, b);
        }, -Infinity)+1;
    } else {
        num = 1;
      console.log('No snapshot')
    }
  });

createButton.addEventListener('click', function() {
    newCard(num,tank);
    writeRowData(num,newCardData);
    console.log(newCardData)
})

$(document).on('click', '.delbutton', function() {
    deleteRow(this)
    removeRowData(this.id.slice(3))
});

$(document).on('change','.limit-check', function() {
    limitBar(this)
})

$(document).on('click','.image-selector', function() {
    let row = this.id.match(/\d+/g)[0];
    let img = $('#img'+row);
    console.log(img[0])
    let imageURL = prompt('Enter image URL:','default');
    if (imageURL == 'default' || imageURL == undefined || imageURL == null) {
        img[0].src = '../img/Blank.png';
        img[0].style.display = 'block';
    } else {
        img[0].src = imageURL;
        img[0].style.display = 'block';
    }
})

$(document).on('click', '.type-selector', function() {
    let row = this.id.slice(4);
    console.log(row)
    let val = this.value;
    let hidden = $('#hidecard'+row);
    console.log(hidden[0])
    hidden[0].value = val;
    update(ref(db, 'rows/'+row), {
        'type': val,
    });
    //writeRowData(row,val)
})

