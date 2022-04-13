//Role Constants

//Tank
const tankHP = 200
const tankMP = 200
const tankATK = "+10"
const tankDEF = 80
const tankDMG = 20
const tankSDMG = 25
const tankHEAL = 5
const tankREC = 35

//Light Tank
const lightTankHP = 170
const lightTankMP = 250
const lightTankATK = "+15"
const lightTankDEF = 75
const lightTankDMG = 25
const lightTankSDMG = 25
const lightTankHEAL = 5
const lightTankREC = 35

//Melee Striker
const mStrikerHP = 150
const mStrikerMP = 200
const mStrikerATK = "+30"
const mStrikerDEF = 65
const mStrikerDMG = 35
const mStrikerSDMG = 35
const mStrikerHEAL = 5
const mStrikerREC = 35

//Ranged Striker
const rStrikerHP = 140
const rStrikerMP = 150
const rStrikerATK = "+30"
const rStrikerDEF = 60
const rStrikerDMG = 30
const rStrikerSDMG = 30
const rStrikerHEAL = 5
const rStrikerREC = 35

//Caster
const casterHP = 120
const casterMP = 500
const casterATK = "+20"
const casterDEF = 50
const casterDMG = 10
const casterSDMG = 45
const casterHEAL = 5
const casterREC = 50

//Healer/Support
const healHP = 100
const healMP = 500
const healATK = "+0"
const healDEF = 45
const healDMG = 10
const healSDMG = 20
const healHEAL = 35
const healREC = 75

//M Tank
const mTankHP = 75
const mTankMP = 100
const mTankATK = "+10"
const mTankDEF = 60
const mTankDMG = 10
const mTankSDMG = 10
const mTankHEAL = "-"
const mTankREC = 15

//M DPS
const mDPSHP = 50
const mDPSMP = 100
const mDPSATK = "+20"
const mDPSDEF = 40
const mDPSDMG = 20
const mDPSSDMG = 20
const mDPSHEAL = "-"
const mDPSREC = 15

//M Heal
const mHealHP = 30
const mHealMP = 100
const mHealATK = "-"
const mHealDEF = 20
const mHealDMG = "-"
const mHealSDMG = "-"
const mHealHEAL = 10
const mHealREC = 25

//Boss
const bossHP = "???"
const bossMP = 500
const bossATK = "+25"
const bossDEF = 60
const bossDMG = 40
const bossSDMG = 50
const bossHEAL = 30
const bossREC = 50


//Constructor
class CombatTracker {
  constructor() {
    this.addNewRow()
  }

  addNewRow() {

    //Table Row
    var tableRowNumber = textRowNumber + 1
    const bottomRow = document.getElementById('bottom-row')
    const table = document.getElementById('sortable')
    var newRow = table.insertRow()
    newRow.id = "row" + idRowNumber
    newRow.className = "rowclass"


    //row number INPUT
    const numberDiv = document.createElement("input")
    numberDiv.className = "numberinput"
    numberDiv.id = "number" + idRowNumber;
    const numberDivText = document.createTextNode(textRowNumber)
    numberDiv.value = textRowNumber
    const addRowButtonPos = document.getElementById("add-row-button");
    var numberCell = newRow.insertCell()
    numberCell.appendChild(numberDiv)
    numberCell.className = "numbercell"


    //name input

    const nameInput = document.createElement("input")
    nameInput.id = "name" + idRowNumber;
    var nameCell = newRow.insertCell()
    nameCell.appendChild(nameInput)
    nameCell.className = "namecell"


   //role select

    const roleSelect = document.createElement("select")
    roleSelect.id = "select" + idRowNumber;

    var tankOpt = document.createElement("option")
    tankOpt.text = "Tank";
    tankOpt.value = "tank"
    roleSelect.add(tankOpt)
    var lightTankOpt = document.createElement("option")
    lightTankOpt.text = "Light Tank";
    lightTankOpt.value = "lighttank"
    roleSelect.add(lightTankOpt)
    var mStrikerOpt = document.createElement("option")
    mStrikerOpt.text = "Melee Striker";
    mStrikerOpt.value = "mstriker"
    roleSelect.add(mStrikerOpt)
    var rStrikerOpt = document.createElement("option")
    rStrikerOpt.text = "Ranged Striker";
    rStrikerOpt.value = "rstriker"
    roleSelect.add(rStrikerOpt)
    var casterOpt = document.createElement("option")
    casterOpt.text = "Caster";
    casterOpt.value = "caster"
    roleSelect.add(casterOpt)
    var healOpt = document.createElement("option")
    healOpt.text = "Healer/Support";
    healOpt.value = "healer"
    roleSelect.add(healOpt)
    var mTankOpt = document.createElement("option")
    mTankOpt.text = "Minion (Tank)";
    mTankOpt.value = "mtank"
    roleSelect.add(mTankOpt)
    var mDPSOpt = document.createElement("option")
    mDPSOpt.text = "Minion (DPS)";
    mDPSOpt.value = "mdps"
    roleSelect.add(mDPSOpt)
    var mHealOpt = document.createElement("option")
    mHealOpt.text = "Minion (Heal)";
    mHealOpt.value = "mheal"
    roleSelect.add(mHealOpt)
    var bossOpt = document.createElement("option")
    bossOpt.text = "Boss";
    bossOpt.value = "boss"
    roleSelect.add(bossOpt)

    var roleCell = newRow.insertCell()
    roleCell.appendChild(roleSelect)
    roleCell.className = "rolecell"


    //Current HP Input

    const hpInput = document.createElement("input")
    hpInput.id = "currenthp" + idRowNumber;
    hpInput.value = tankHP
    hpInput.className = "hpmpcell"
    var hpInputCell = newRow.insertCell()
    hpInputCell.appendChild(hpInput)
    hpInputCell.className = "hpmpcell"


    //slash div

    const hpSlashDiv = document.createElement("div")
    hpSlashDiv.className = "slash"
    hpSlashDiv.id = "hpSlash" + idRowNumber;
    const hpSlashDivText = document.createTextNode("/")
    hpSlashDiv.appendChild(hpSlashDivText);
    var hpSlashCell = newRow.insertCell()
    hpSlashCell.appendChild(hpSlashDiv)
    hpSlashCell.className = "slashcell"


    //total HP div

    const hpTotalDiv = document.createElement("div")
    hpTotalDiv.className = "static"
    hpTotalDiv.id = "hpTotal" + idRowNumber;
    const hpTotalDivText = document.createTextNode(tankHP)
    hpTotalDiv.appendChild(hpTotalDivText);
    var hpTotalCell = newRow.insertCell()
    hpTotalCell.appendChild(hpTotalDiv)
    hpTotalCell.className = "staticcell"


    //current MP input

    const mpInput = document.createElement("input")
    mpInput.id = "currentmp" + idRowNumber;
    mpInput.value = tankMP
    mpInput.className = "hpmpcell"
    var mpInputCell = newRow.insertCell()
    mpInputCell.appendChild(mpInput)
    mpInputCell.className = "hpmpcell"

    //MP slash div

    const mpSlashDiv = document.createElement("div")
    mpSlashDiv.className = "slash"
    mpSlashDiv.id = "mpSlash" + idRowNumber;
    const mpSlashDivText = document.createTextNode("/")
    mpSlashDiv.appendChild(mpSlashDivText);
    var mpSlashCell = newRow.insertCell()
    mpSlashCell.appendChild(mpSlashDiv)
    mpSlashCell.className = "slashcell"

    //total MP div

    const mpTotalDiv = document.createElement("div")
    mpTotalDiv.className = "static"
    mpTotalDiv.id = "mpTotal" + idRowNumber;
    const mpTotalDivText = document.createTextNode(tankMP)
    mpTotalDiv.appendChild(mpTotalDivText);
    var mpTotalCell = newRow.insertCell()
    mpTotalCell.appendChild(mpTotalDiv)
    mpTotalCell.className = "staticcell"

    //atk div

    const atkDiv = document.createElement("div")
    atkDiv.className = "static"
    atkDiv.id = "atk" + idRowNumber;
    const atkDivText = document.createTextNode(tankATK)
    atkDiv.appendChild(atkDivText);
    var atkCell = newRow.insertCell()
    atkCell.appendChild(atkDiv)
    atkCell.className = "staticcell"

    //def div

    const defDiv = document.createElement("div")
    defDiv.className = "static"
    defDiv.id = "def" + idRowNumber;
    const defDivText = document.createTextNode(tankDEF)
    defDiv.appendChild(defDivText);
    var defCell = newRow.insertCell()
    defCell.appendChild(defDiv)
    defCell.className = "staticcell"

    //dmg div

    const dmgDiv = document.createElement("div")
    dmgDiv.className = "static"
    dmgDiv.id = "dmg" + idRowNumber;
    const dmgDivText = document.createTextNode(tankDMG)
    dmgDiv.appendChild(dmgDivText);
    var dmgCell = newRow.insertCell()
    dmgCell.appendChild(dmgDiv)
    dmgCell.className = "staticcell"

    //sdmg div

    const sdmgDiv = document.createElement("div")
    sdmgDiv.className = "static"
    sdmgDiv.id = "sdmg" + idRowNumber;
    const sdmgDivText = document.createTextNode(tankSDMG)
    sdmgDiv.appendChild(sdmgDivText);
    var sdmgCell = newRow.insertCell()
    sdmgCell.appendChild(sdmgDiv)
    sdmgCell.className = "staticcell"

    //heal div

    const healDiv = document.createElement("div")
    healDiv.className = "static"
    healDiv.id = "heal" + idRowNumber;
    const healDivText = document.createTextNode(tankHEAL)
    healDiv.appendChild(healDivText);
    var healCell = newRow.insertCell()
    healCell.appendChild(healDiv)
    healCell.className = "staticcell"

    //rec div

    const recDiv = document.createElement("div")
    recDiv.className = "static"
    recDiv.id = "rec" + idRowNumber;
    const recDivText = document.createTextNode(tankREC)
    recDiv.appendChild(recDivText);
    var recCell = newRow.insertCell()
    recCell.appendChild(recDiv)
    recCell.className = "staticcell"

    //delete button

    const deleteDiv = document.createElement("div")
    deleteDiv.className = "buttoncell"
    deleteDiv.id = "delete-div" + idRowNumber;
    const deleteButton = document.createElement("button")
    deleteButton.id = "delete-button" + idRowNumber;
    deleteButton.class = "delete"
    const deleteButtonX = document.createTextNode("x")
    deleteDiv.appendChild(deleteButton);
    deleteButton.appendChild(deleteButtonX)
    var deleteCell = newRow.insertCell()
    deleteCell.appendChild(deleteDiv)
    deleteCell.className = "deletecell"

    ++idRowNumber
    ++textRowNumber
  }



  removeRow(id) {
    var idNumber = id.slice(-2)
    $("tr[id$='" + idNumber + "']").remove();
  }

  selectRole(id) {
    var roleBox = document.getElementById(id)
    var roleChoice = roleBox.value;
    var rowNumber = id.slice(-2)
    var getHPCurrent = document.getElementById("currenthp" + rowNumber)
    var getHPTotal = document.getElementById("hpTotal" + rowNumber)

    var getMPCurrent = document.getElementById("currentmp" + rowNumber)
    var getMPTotal = document.getElementById("mpTotal" + rowNumber)

    var getAtk = document.getElementById("atk" + rowNumber)

    var getDef = document.getElementById("def" + rowNumber)

    var getDMG = document.getElementById("dmg" + rowNumber)

    var getSDMG = document.getElementById("sdmg" + rowNumber)

    var getHeal = document.getElementById("heal" + rowNumber)

    var getRec = document.getElementById("rec" + rowNumber)
    
    
    
    switch(roleChoice) {
      case "tank":
        getHPCurrent.value = tankHP
        getHPTotal.innerText = tankHP
        
        getMPCurrent.value = tankMP
        getMPTotal.innerText = tankMP

        getAtk.innerText = tankATK
        getDef.innerText = tankDEF
        getDMG.innerText = tankDMG
        getSDMG.innerText = tankSDMG
        getHeal.innerText = tankHEAL
        getRec.innerText = tankREC

      break;
      case "lighttank":
        getHPCurrent.value = lightTankHP
        getHPTotal.innerText = lightTankHP
        
        getMPCurrent.value = lightTankMP
        getMPTotal.innerText = lightTankMP

        getAtk.innerText = lightTankATK
        getDef.innerText = lightTankDEF
        getDMG.innerText = lightTankDMG
        getSDMG.innerText = lightTankSDMG
        getHeal.innerText = lightTankHEAL
        getRec.innerText = lightTankREC
      break;
      case "mstriker":
        getHPCurrent.value = mStrikerHP
        getHPTotal.innerText = mStrikerHP
        
        getMPCurrent.value = mStrikerMP
        getMPTotal.innerText = mStrikerMP

        getAtk.innerText = mStrikerATK
        getDef.innerText = mStrikerDEF
        getDMG.innerText = mStrikerDMG
        getSDMG.innerText = mStrikerSDMG
        getHeal.innerText = mStrikerHEAL
        getRec.innerText = mStrikerREC
      break;
      case "rstriker":
        getHPCurrent.value = rStrikerHP
        getHPTotal.innerText = rStrikerHP
        
        getMPCurrent.value = rStrikerMP
        getMPTotal.innerText = rStrikerMP

        getAtk.innerText = rStrikerATK
        getDef.innerText = rStrikerDEF
        getDMG.innerText = rStrikerDMG
        getSDMG.innerText = rStrikerSDMG
        getHeal.innerText = rStrikerHEAL
        getRec.innerText = rStrikerREC
      break;
      case "caster":
        getHPCurrent.value = casterHP
        getHPTotal.innerText = casterHP
        
        getMPCurrent.value = casterMP
        getMPTotal.innerText = casterMP

        getAtk.innerText = casterATK
        getDef.innerText = casterDEF
        getDMG.innerText = casterDMG
        getSDMG.innerText = casterSDMG
        getHeal.innerText = casterHEAL
        getRec.innerText = casterREC
      break;
      case "healer":
        getHPCurrent.value = healHP
        getHPTotal.innerText = healHP
        
        getMPCurrent.value = healMP
        getMPTotal.innerText = healMP

        getAtk.innerText = healATK
        getDef.innerText = healDEF
        getDMG.innerText = healDMG
        getSDMG.innerText = healSDMG
        getHeal.innerText = healHEAL
        getRec.innerText = healREC
      break;
      case "mtank":
        getHPCurrent.value = mTankHP
        getHPTotal.innerText = mTankHP
        
        getMPCurrent.value = mTankMP
        getMPTotal.innerText = mTankMP

        getAtk.innerText = mTankATK
        getDef.innerText = mTankDEF
        getDMG.innerText = mTankDMG
        getSDMG.innerText = mTankSDMG
        getHeal.innerText = mTankHEAL
        getRec.innerText = mTankREC
      break;
      case "mdps":
        getHPCurrent.value = mDPSHP
        getHPTotal.innerText = mDPSHP
        
        getMPCurrent.value = mDPSMP
        getMPTotal.innerText = mDPSMP

        getAtk.innerText = mDPSATK
        getDef.innerText = mDPSDEF
        getDMG.innerText = mDPSDMG
        getSDMG.innerText = mDPSSDMG
        getHeal.innerText = mDPSHEAL
        getRec.innerText = mDPSREC
      break;
      case "mheal":
        getHPCurrent.value = mHealHP
        getHPTotal.innerText = mHealHP
        
        getMPCurrent.value = mHealMP
        getMPTotal.innerText = mHealMP

        getAtk.innerText = mHealATK
        getDef.innerText = mHealDEF
        getDMG.innerText = mHealDMG
        getSDMG.innerText = mHealSDMG
        getHeal.innerText = mHealHEAL
        getRec.innerText = mHealREC
      break;
      case "boss":
        const bossHPMaxInput = document.createElement("input")
        getHPTotal.innerText = ''
        getHPTotal.appendChild(bossHPMaxInput) 
        bossHPMaxInput.value = 1800
        getHPCurrent.value = 1800
        
        getMPCurrent.value = bossMP
        getMPTotal.innerText = bossMP

        getAtk.innerText = bossATK
        getDef.innerText = bossDEF
        getDMG.innerText = bossDMG
        getSDMG.innerText = bossSDMG
        getHeal.innerText = bossHEAL
        getRec.innerText = bossREC
      break;
      default:
        getHPCurrent.value = "???"
        getHPTotal.innerText = "???"
        
        getMPCurrent.value = "???"
        getMPTotal.innerText = "???"

        getAtk.innerText = "???"
        getDef.innerText = "???"
        getDMG.innerText = "???"
        getSDMG.innerText = "???"
        getHeal.innerText = "???"
        getRec.innerText = "???"
      break;
    }
      
    
    
    
    console.log(rowNumber)
  }

  sortRows() {
    console.log("Sort Test")
    var arrayChoices = document.getElementsByClassName("rowclass")
    var sortArrayTest = $.makeArray(arrayChoices)
    var sortId = sortArrayTest[0]


    $.each(sortArrayTest, function(val, x){
      var arrayChildren = this.childNodes;
      var childrenArray = $.makeArray(arrayChildren)
      var arrayVal = childrenArray[0]
      var cellInputArray = arrayVal.childNodes;
      var cellInput = cellInputArray[0]
      var cellInputVal = cellInput.value
      console.log(cellInputVal)
    })
    //console.log($(sortId).attr('id'))
  }

}

//Constants and Variables

const addRowButton = document.querySelector('[data-add-row]')
//const sortButton = document.querySelector('[data-sort-button]')

var idRowNumber = 10;
var textRowNumber = 0;



//EventListeners
const combattracker = new CombatTracker()

addRowButton.addEventListener('click', button => {
  combattracker.addNewRow()
})

$(document).on('input', "select", () => {
  combattracker.selectRole(this.event.target.id)
})

$(document).on('click', "button", () => {
  combattracker.removeRow(this.event.target.id)
})

/*sortButton.addEventListener('click', button => {
  combattracker.sortRows()
})*/