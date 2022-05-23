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
    'imgURL': './img/Blank.png',
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
    'atkbuff': 0,
    'defbuff': 0
};
//
//console.log(del1.id.match(/[a-zA-Z]+/g)[0],del1.id.match(/\d+/g)[0])

function newCard(row,char) {
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
    nameInput.classList.add('name')
    nameInput.type = 'text';
    nameInput.value = char.name;
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
    avImg.src = char.imgURL;
    imageDiv.appendChild(avImg)
    let imageButton = document.createElement('button')
    imageButton.classList.add('image-selector')
    imageButton.id = 'imgbutton'+row;
    imageDiv.appendChild(imageButton)
    let imgSrc = document.createElement('img')
    imgSrc.src = "./img/imgbutton.png";
    imgSrc.height = '10';
    imageButton.appendChild(imgSrc)
    grid.appendChild(imageDiv)

    //ROLE DIV
    let roleDiv = document.createElement('div');
    roleDiv.classList.add('ent-role')
    grid.appendChild(roleDiv)
    let roleSel = document.createElement('select');
    roleSel.classList.add('rolesel')
    roleSel.id = 'role'+row;
    roleSel.value = char.role;
    roleDiv.appendChild(roleSel)
    //Tank
    let roleTank = document.createElement('option');
    roleTank.value = "tank";
    roleTank.selected = 'true'
    let tankName = document.createTextNode('Tank')
    roleTank.appendChild(tankName)
    //LTank
    let roleLTank = document.createElement('option');
    roleLTank.value = "ltank";
    let lTankName = document.createTextNode('Light Tank')
    roleLTank.appendChild(lTankName)
    //MStriker
    let roleMStrike = document.createElement('option');
    roleMStrike.value = "mstr";
    let mStrikeName = document.createTextNode('Melee Striker')
    roleMStrike.appendChild(mStrikeName)
    //RStriker
    let roleRStrike = document.createElement('option');
    roleRStrike.value = "rstr";
    let rStrikeName = document.createTextNode('Ranged Striker')
    roleRStrike.appendChild(rStrikeName)
    //Caster
    let roleCast = document.createElement('option');
    roleCast.value = "cast";
    let castName = document.createTextNode('Caster')
    roleCast.appendChild(castName)
    //Healer
    let roleHeal = document.createElement('option');
    roleHeal.value = "heal";
    let healerName = document.createTextNode('Healer')
    roleHeal.appendChild(healerName)
    //MTank
    let roleMTank = document.createElement('option');
    roleMTank.value = "mtank";
    let mtankName = document.createTextNode('Minion (Tank)')
    roleMTank.appendChild(mtankName)
    //MDps
    let roleMDps = document.createElement('option');
    roleMDps.value = "mdps";
    let mdpsName = document.createTextNode('Minion (DPS)')
    roleMDps.appendChild(mdpsName)
    //MHeal
    let roleMHeal = document.createElement('option');
    roleMHeal.value = "mheal";
    let mhealName = document.createTextNode('Minion (Healer)')
    roleMHeal.appendChild(mhealName)
    //BOSS
    let roleBoss = document.createElement('option');
    roleBoss.value = "boss";
    let bossName = document.createTextNode('Boss')
    roleBoss.appendChild(bossName)



    roleSel.appendChild(roleTank)
    roleSel.appendChild(roleLTank)
    roleSel.appendChild(roleMStrike)
    roleSel.appendChild(roleRStrike)
    roleSel.appendChild(roleCast)
    roleSel.appendChild(roleHeal)
    if (dmView == true) {
        roleSel.appendChild(roleMTank)
        roleSel.appendChild(roleMDps)
        roleSel.appendChild(roleMHeal)
        roleSel.appendChild(roleBoss)
    }

    //TYPE
    let entTypeSel = document.createElement('select');
    entTypeSel.classList.add('type-selector')
    entTypeSel.id = 'type'+row;
    roleDiv.appendChild(entTypeSel)
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
    entTypeSel.value = char.type;

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
    currHPInput.value = char.currHP;
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
    maxHPInput.value = char.maxHP;
    maxHPInput.id = 'maxhp'+row;
    if (playerView == true) {
        maxHPInput.readOnly = true;
    }
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
    currMPInput.value = char.currMP;
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
    maxMPInput.value = char.maxMP;
    maxMPInput.id = 'maxmp'+row;
    if (playerView == true) {
        maxMPInput.readOnly = true;
    }
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
    atkDown.id = 'atkdown'+row;
    let atkMinus = document.createTextNode('-')
    atkDown.appendChild(atkMinus)
    atkNumDiv.appendChild(atkDown)
    let atkNumName = document.createElement('input')
    atkNumName.classList.add('inputnum')
    if (playerView == true) {
        atkNumName.readOnly = true;
    }
    atkNumName.type = 'number';
    atkNumName.step = '5';
    atkNumName.value = char.atk+char.atkbuff;
    atkNumName.id = 'atk'+row;
    atkNumDiv.appendChild(atkNumName)
    let atkUp = document.createElement('button')
    atkUp.classList.add('magbutton')
    atkUp.id = 'atkup'+row;
    let atkPlus = document.createTextNode('+')
    atkUp.appendChild(atkPlus)
    atkNumDiv.appendChild(atkUp)
    let atkReset = document.createElement('button')
    atkReset.classList.add('magreset')
    atkReset.classList.add('magresetbutton')
    atkReset.id = 'atkreset'+row;
    let atkX = document.createTextNode('x')
    atkReset.appendChild(atkX)
    atkNumDiv.appendChild(atkReset)

    let defNumDiv = document.createElement('div')
    defNumDiv.classList.add('defnum')
    statsDiv.appendChild(defNumDiv)
    let defDown = document.createElement('button')
    defDown.classList.add('magbutton')
    defDown.id = 'defdown'+row;
    let defMinus = document.createTextNode('-')
    defDown.appendChild(defMinus)
    defNumDiv.appendChild(defDown)
    let defNumName = document.createElement('input')
    defNumName.classList.add('inputnum')
    if (playerView == true) {
        defNumName.readOnly = true;
    }
    defNumName.type = 'number';
    defNumName.step = '5';
    defNumName.value = char.def+char.defbuff;
    defNumName.id = 'def'+row;
    defNumDiv.appendChild(defNumName)
    let defUp = document.createElement('button')
    defUp.classList.add('magbutton')
    defUp.id = 'defup'+row;
    let defPlus = document.createTextNode('+')
    defUp.appendChild(defPlus)
    defNumDiv.appendChild(defUp)
    let defReset = document.createElement('button')
    defReset.classList.add('magreset2')
    defReset.classList.add('magresetbutton')
    defReset.id = 'defreset'+row;
    let defX = document.createTextNode('x')
    defReset.appendChild(defX)
    defNumDiv.appendChild(defReset)


    let dmgNumDiv = document.createElement('div')
    dmgNumDiv.classList.add('dmgnum')
    dmgNumDiv.id = 'dmg'+row;
    statsDiv.appendChild(dmgNumDiv)
    let dmgNumName = document.createTextNode(char.dmg)
    dmgNumDiv.appendChild(dmgNumName)

    let sdmgNumDiv = document.createElement('div')
    sdmgNumDiv.classList.add('sdmgnum')
    sdmgNumDiv.id = 'sdmg'+row;
    statsDiv.appendChild(sdmgNumDiv)
    let sdmgNumName = document.createTextNode(char.sdmg)
    sdmgNumDiv.appendChild(sdmgNumName)

    let healNumDiv = document.createElement('div')
    healNumDiv.classList.add('healnum')
    healNumDiv.id = 'heal'+row;
    statsDiv.appendChild(healNumDiv)
    let healNumName = document.createTextNode(char.heal)
    healNumDiv.appendChild(healNumName)

    let recNumDiv = document.createElement('div')
    recNumDiv.classList.add('recnum')
    recNumDiv.id = 'rec'+row;
    statsDiv.appendChild(recNumDiv)
    let recNumName = document.createTextNode(char.rec)
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
    initInput.value = char.init;
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
    lCheck1.checked = char.lb1;
    limitCell.appendChild(lCheck1)

    let limitSpan1 = document.createElement('span')
    limitSpan1.classList.add('limit-divide')
    limitCell.appendChild(limitSpan1)

    let lCheck2 = document.createElement('input')
    lCheck2.type = 'checkbox'
    lCheck2.classList.add('limit-2')
    lCheck2.classList.add('limit-check')
    lCheck2.id = 'limitii'+row;
    lCheck2.checked = char.lb2;
    limitCell.appendChild(lCheck2)

    let limitSpan2 = document.createElement('span')
    limitSpan2.classList.add('limit-divide')
    limitCell.appendChild(limitSpan2)

    let lCheck3 = document.createElement('input')
    lCheck3.type = 'checkbox'
    lCheck3.classList.add('limit-3')
    lCheck3.classList.add('limit-check')
    lCheck3.id = 'limitiii'+row;
    lCheck3.checked = char.lb3;
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

    limitBar(lCheck1)
    limitBar(lCheck2)
    limitBar(lCheck3)
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
        'atkbuff': card.atkbuff,
        'defbuff': card.defbuff
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

function limitBar(el) {
    let row = el.id.match(/\d+/g)[0];
    let limit1 = $('#limiti'+row)[0].checked;
    let limit2 = $('#limitii'+row)[0].checked;
    let limit3 = $('#limitiii'+row)[0].checked;
    let bar1 = $('#bari'+row)[0];
    let bar2 = $('#barii'+row)[0];
    let bar3 = $('#bariii'+row)[0];
    if (limit1 == true) {
        bar1.classList.add('limit-fill')
    } else {
        bar1.classList.remove('limit-fill')
    }
    if (limit2 == true) {
        bar2.classList.add('limit-fill')
    } else {
        bar2.classList.remove('limit-fill')
    }
    if (limit3 == true) {
        bar3.classList.add('limit-fill')
    } else {
        bar3.classList.remove('limit-fill')
    }
}

onValue(ref(db, 'rows/'), (snapshot) => {
    let data = snapshot.val();
    let cardArr = [0];
    if (snapshot.exists()) {
        let rowCount = [0]
        for (let x in data) {
            let a = data[x];
            let rowNum = a.row;
            //Row Count
            rowCount.push(parseInt(rowNum))
            //Render Cards
            if ($('#card'+rowNum)[0] == undefined) {
                newCard(rowNum,a)
                console.log('Card#'+rowNum+' created!')
            } else {
                
            }
            //Remove Cards
            let cardEx = $('#card'+rowNum);
            cardEx.each(function(index,el) {
                cardArr.push(el)
            })
            //Update Name
            let cardName = $('#name'+rowNum)[0];
            if (cardName.value != a.name) {
                cardName.value = a.name;
            }
            //Update Image
            let cardImg = $('#img'+rowNum)[0];
            if (cardImg.src != a.imgURL) {
                cardImg.src = a.imgURL;
            }
            //Update Init
            let cardInit = $('#init'+rowNum)[0];
            if (cardInit.value != a.init) {
                cardInit.value = a.init;
            }
            //Update Role
            let cardRole = $('#role'+rowNum)[0];
            if (cardRole.value != a.role) {
                cardRole.value = a.role;
            }
            //Update Curr HP
            let cardCurrHP = $('#currhp'+rowNum)[0];
            if (cardCurrHP.value != a.currHP) {
                cardCurrHP.value = a.currHP;
            }
            //Update Max HP
            let cardMaxHP = $('#maxhp'+rowNum)[0];
            if (cardMaxHP.value != a.maxHP) {
                cardMaxHP.value = a.maxHP;
            }
            //Update Curr MP
            let cardCurrMP = $('#currmp'+rowNum)[0];
            if (cardCurrMP.value != a.currMP) {
                cardCurrMP.value = a.currMP;
            }
            //Update Max HP
            let cardMaxMP = $('#maxmp'+rowNum)[0];
            if (cardMaxMP.value != a.maxMP) {
                cardMaxMP.value = a.maxMP;
            }
            //Update ATK
            let cardAtk = $('#atk'+rowNum)[0];
            let totalAtk = a.atk+a.atkbuff;
            if (cardAtk.value != totalAtk) {
                cardAtk.value = totalAtk;
            }
            //Update DEF
            let cardDef = $('#def'+rowNum)[0];
            let totalDef = a.def+a.defbuff;
            if (cardDef.value != totalDef) {
                cardDef.value = totalDef;
            }
            //Update DMG
            let cardDmg = $('#dmg'+rowNum)[0];
            if (cardDmg.innerHTML != a.dmg) {
                cardDmg.innerHTML = a.dmg;
            }
            //Update SDMG
            let cardSdmg = $('#sdmg'+rowNum)[0];
            if (cardSdmg.innerHTML != a.sdmg) {
                cardSdmg.innerHTML = a.sdmg;
            }
            //Update HEAL
            let cardHeal = $('#heal'+rowNum)[0];
            if (cardHeal.innerHTML != a.heal) {
                cardHeal.innerHTML = a.heal;
            }
            //Update REC
            let cardRec = $('#rec'+rowNum)[0];
            if (cardRec.innerHTML != a.rec) {
                cardRec.innerHTML = a.rec;
            }
            //Update Limit 1
            let cardLimit1 = $('#limiti'+rowNum)[0];
            if (cardLimit1.checked != a.lb1) {
                cardLimit1.checked = a.lb1;
                //limitBar(cardLimit1)
            }
            //Update Limit 2
            let cardLimit2 = $('#limitii'+rowNum)[0];
            if (cardLimit2.checked != a.lb2) {
                cardLimit2.checked = a.lb2;
                //limitBar(cardLimit2)
            }
            //Update Limit 3
            let cardLimit3 = $('#limitiii'+rowNum)[0];
            if (cardLimit3.checked != a.lb3) {
                cardLimit3.checked = a.lb3;
                //limitBar(cardLimit3)
            }
            limitBar(cardLimit1)
            //Update Type
            let hideVal = $('#hidecard'+rowNum)[0];
            let cardVis = $('#card'+rowNum)[0];
            if (hideVal.value != a.type) {
                hideVal.value = a.type;
            }
            if (a.type == 'player') {
                cardVis.classList.add('player')
            } else if (a.type == 'npc') {
                cardVis.classList.remove('player')
            }
        }
        num = rowCount.reduce(function(a, b) {
            return Math.max(a, b);
        }, -Infinity)+1;
    } else {
        num = 1;
      console.log('No snapshot')
    }
    let cardAll = $("div[id^='card']");
    cardAll.each(function(index,el) {
        let exists = cardArr.includes(el);
        if (exists != true) {
            el.remove()
        }
    })
  });

createButton.addEventListener('click', function() {
    writeRowData(num,newCardData);
})

$(document).on('click', '.delbutton', function() {
    deleteRow(this)
    removeRowData(this.id.slice(3))
});
//Limit
$(document).on('change','.limit-check', function() {
    let row = this.id.match(/\d+/g)[0];
    let val = this.checked;
    let limit2 = $('#limitii'+row)[0].checked;
    let limit3 = $('#limitiii'+row)[0].checked;
    console.log(limit2,limit3)
    let limitSlice = this.id.slice(5);
    let limitNum = (limitSlice.match(/i/g)||[]).length;
    switch (limitNum) {
        case 1:
            if (val == true) {
                update(ref(db, 'rows/'+row), {
                    'lb1': true,
                    'lb2': false,
                    'lb3': false,
                });
            } else if (val == false && limit2 == true) {
                update(ref(db, 'rows/'+row), {
                    'lb1': true,
                    'lb2': false,
                    'lb3': false,
                });
            } else if (val == false) {
                update(ref(db, 'rows/'+row), {
                    'lb1': false,
                    'lb2': false,
                    'lb3': false,
                });
            }
            break
        case 2:
            if (val == true) {
                update(ref(db, 'rows/'+row), {
                    'lb1': true,
                    'lb2': true,
                    'lb3': false,
                });
            } else if (val == false && limit3 == true) {
                update(ref(db, 'rows/'+row), {
                    'lb1': true,
                    'lb2': true,
                    'lb3': false,
                });
            } else if (val == false) {
                update(ref(db, 'rows/'+row), {
                    'lb2': false,
                    'lb3': false,
                });
            }
            break
        case 3:
            if (val == true) {
                update(ref(db, 'rows/'+row), {
                    'lb1': true,
                    'lb2': true,
                    'lb3': true,
                });
            } else if (val == false) {
                update(ref(db, 'rows/'+row), {
                    'lb3': false,
                });
            }
            break
    }
})
//Name
$(document).on('change', '.name', function() {
    let row = this.id.match(/\d+/g)[0];
    let val = this.value;
    update(ref(db, 'rows/'+row), {
        'name': val,
    });
})
//Image
$(document).on('click','.image-selector', function() {
    let row = this.id.match(/\d+/g)[0];
    let img = $('#img'+row);
    let imageURL = prompt('Enter image URL:','default');
    if (imageURL == 'default' || imageURL == undefined || imageURL == null) {
        update(ref(db, 'rows/'+row), {
            'imgURL': './img/Blank.png',
        });
    } else {
        update(ref(db, 'rows/'+row), {
            'imgURL': imageURL,
        });
    }
})
//Init
$(document).on('change', '.init', function() {
    let row = this.id.match(/\d+/g)[0];
    let val = this.value;
    update(ref(db, 'rows/'+row), {
        'init': val,
    });
})
//Type
$(document).on('click', '.type-selector', function() {
    let row = this.id.slice(4);
    let val = this.value;
    let hidden = $('#hidecard'+row);
    hidden[0].value = val;
    update(ref(db, 'rows/'+row), {
        'type': val,
    });
    //writeRowData(row,val)
})
//Curr HP&MP
$(document).on('change', '.points', function() {
    let row = this.id.match(/\d+/g)[0];
    let type = this.id.match(/[a-zA-Z]+/g)[0];
    let val = this.value;
    if (type == 'currhp') {
        update(ref(db, 'rows/'+row), {
            'currHP': val,
        });
    } else if (type == 'currmp') {
        update(ref(db, 'rows/'+row), {
            'currMP': val,
        });
    }
})
//Max HP&MP
$(document).on('change', '.points2', function() {
    let row = this.id.match(/\d+/g)[0];
    let type = this.id.match(/[a-zA-Z]+/g)[0];
    let val = this.value;
    if (type == 'maxhp') {
        update(ref(db, 'rows/'+row), {
            'maxHP': val,
        });
    } else if (type == 'maxmp') {
        update(ref(db, 'rows/'+row), {
            'maxMP': val,
        });
    }
})
//Buff and Debuff
$(document).on('click', '.magbutton', function() {
    let row = this.id.match(/\d+/g)[0];
    let type = this.id.match(/[a-zA-Z]+/g)[0];
    let atkBuffNum = 0;
    let defBuffNum = 0;
    get(child(dbRef, 'rows/'+row)).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            atkBuffNum = data.atkbuff;
            defBuffNum = data.defbuff;
            if (type == 'atkup') {
                if (atkBuffNum <=10) {
                    atkBuffNum += 5;
                    update(ref(db, 'rows/'+row), {
                        'atkbuff': atkBuffNum,
                    });
                } else {
                    update(ref(db, 'rows/'+row), {
                        'atkbuff': atkBuffNum,
                    });
                }
            } else if (type == 'atkdown') {
                if (atkBuffNum >=-10) {
                    atkBuffNum -= 5;
                    update(ref(db, 'rows/'+row), {
                        'atkbuff': atkBuffNum,
                    });
                } else {
                    update(ref(db, 'rows/'+row), {
                        'atkbuff': atkBuffNum,
                    });
                }
            } else if (type == 'defup') {
                if (defBuffNum <=10) {
                    defBuffNum += 5;
                    update(ref(db, 'rows/'+row), {
                        'defbuff': defBuffNum,
                    });
                } else {
                    update(ref(db, 'rows/'+row), {
                        'defbuff': defBuffNum,
                    });
                }
            } else if (type == 'defdown') {
                if (defBuffNum >=-10) {
                    defBuffNum -= 5;
                    update(ref(db, 'rows/'+row), {
                        'defbuff': defBuffNum,
                    });
                } else {
                    update(ref(db, 'rows/'+row), {
                        'defbuff': defBuffNum,
                    });
                }
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
    })
})
//Buff+Debuff Reset
$(document).on('click', '.magresetbutton', function() {
    let row = this.id.match(/\d+/g)[0];
    let type = this.id.match(/[a-zA-Z]+/g)[0];
    console.log(type)
    if (type == 'atkreset') {
        update(ref(db, 'rows/'+row), {
            'atkbuff': 0,
        });
    } else if (type == 'defreset') {
        update(ref(db, 'rows/'+row), {
            'defbuff': 0,
        });
    }
})
//Roles
$(document).on('change', '.rolesel', function() {
    let row = this.id.match(/\d+/g)[0];
    let value = this.value;
    let val = eval(value);
    update(ref(db, 'rows/'+row), {
        'role': value,
        'currHP': val.hp,
        'maxHP': val.hp,
        'currMP': val.mp,
        'maxMP': val.mp,
        'atk': val.atk,
        'def': val.def,
        'dmg': val.dmg,
        'sdmg': val.sdmg,
        'heal': val.heal,
        'rec': val.rec
    });
    console.log(row,val)
})