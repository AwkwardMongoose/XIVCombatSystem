//START Global
//Tank
const tankDamage = 20
const tankHeal = 5
const tankMPCrit = 200
const tankMPMax = 200
const tankCritIncrement = 30
const tankHPThreshold = 70
//Light Tank
const lightTankDamage = 25
const lightTankHeal = 5
const lightTankMPCrit = 250
const lightTankMPMax = 250
const lightTankCritIncrement = 35
const lightTankHPThreshold = 60
//Melee Striker
const mStrikerDamage = 35
const mStrikerHeal = 5
const mStrikerMPCrit = 200
const mStrikerMPMax = 200
const mStrikerCritIncrement = 30
const mStrikerHPThreshold = 50
//Ranged Striker
const rStrikerDamage = 30
const rStrikerHeal = 5
const rStrikerMPCrit = 115
const rStrikerMPMax = 150
const rStrikerCritIncrement = 20
const rStrikerHPThreshold = 45
//Caster
const casterDamage = 45
const casterHeal = 5
const casterMPCrit = 500
const casterMPMax = 500
const casterCritIncrement = 55
const casterHPThreshold = 55
//Healer/Support
const healDamage = 20
const healHeal = 35
const healMPCrit = 500
const healMPMax = 500
const healCritIncrement = 55
const healHPThreshold = 35
//M Tank
const mTankDamage = 10
const mTankHeal = 0
const mTankMPCrit = 50
const mTankMPMax = 50
const mTankCritIncrement = 10
const mTankHPThreshold = 30
//M DPS
const mDPSDamage = 20
const mDPSHeal = 0
const mDPSMPCrit = 50
const mDPSMPMax = 50
const mDPSCritIncrement = 10
const mDPSHPThreshold = 15
//M Heal
const mHealDamage = 0
const mHealHeal = 10
const mHealMPCrit = 50
const mHealMPMax = 50
const mHealCritIncrement = 10
//Boss
const bossDamage = 50
const bossHeal = 30
const bossMPCrit = 500
const bossMPMax = 500
const bossCritIncrement = 55
//LIMIT BREAK
const limitDamage = 100
const limitHeal = 100
const limitMPCrit = 3500
const limitMPMax = 3500
const limitCritIncrement = 255

const roleSelectDetect = document.querySelector('[data-role-select]')

var damageBase;
var healBase;
var mpCritBase;
var mpTotalBase;
var mpCritIncrement;
var hpThreshold;

var e = document.getElementById("roleselect")
var currentRoleText = e.options[e.selectedIndex].text

function roundUp5(x) { return (x%5)?x-x%5+5:x }

//END Global

class AbilityCalculator {
    constructor(selfDamageTextElement, selfDamagePlusButton, currentRoleText, enemyDamageTextElement, enemyDamagePlusButton, selfHealingTextElement, selfHealingPlusButton, enemyHealingTextElement, enemyHealingPlusButton) {
        this.currentRoleText = currentRoleText
        this.selfDamageTextElement = selfDamageTextElement
        this.selfDamagePlusButton = selfDamagePlusButton
        this.enemyDamageTextElement = enemyDamageTextElement
        this.enemyDamagePlusButton = enemyDamagePlusButton
        this.selfHealingTextElement = selfHealingTextElement
        this.selfHealingPlusButton = selfHealingPlusButton
        this.enemyHealingTextElement = enemyHealingTextElement
        this.enemyHealingPlusButton = enemyHealingPlusButton
        this.selfAtkUpTextElement = selfAtkUpTextElement
        this.enemyAtkUpTextElement = enemyAtkUpTextElement
        this.selfAtkDownTextElement = selfAtkDownTextElement
        this.enemyAtkDownTextElement = enemyAtkDownTextElement
        this.selfDefUpTextElement = selfDefUpTextElement
        this.enemyDefUpTextElement = enemyDefUpTextElement
        this.selfDefDownTextElement = selfDefDownTextElement
        this.enemyDefDownTextElement = enemyDefDownTextElement
        this.mpTotalText = mpTotalText
        this.start()
        this.roleSelection()
        this.selfDamageBonusDetect()
        this.enemyDamageBonusDetect()
        this.selfHealingBonusDetect()
        this.enemyHealingBonusDetect()
        this.updateSelfHealing()
        this.updateEnemyHealing()
        this.updateSelfAtkUp()
        this.updateEnemyAtkUp()
        this.updateSelfAtkDown()
        this.updateEnemyAtkDown()
        this.updateSelfDefUp()
        this.updateEnemyDefUp()
        this.updateSelfDefDown()
        this.updateEnemyDefDown()
        this.mpTotalDisplay()
    }

    start() {
        this.role = this.currentRoleText
        this.mpTotalDisplay()
        //Self DMG
        this.selfDamageTotal = ''
        this.selfDamageSubTotal = ''
        this.selfDamageBonus = 1
        this.selfDamageIncrement = -5
        this.selfDamageTextElement.innerText = this.selfDamageTotal
        selfDamageMPCost = 0
        //Enemy DMG
        this.enemyDamageTotal = ''
        this.enemyDamageSubTotal = ''
        this.enemyDamageBonus = 1
        this.enemyDamageIncrement = -5
        this.enemyDamageTextElement.innerText = this.enemyDamageTotal
        enemyDamageMPCost = 0
         //Self HEAL
         this.enemyHealingTotal = ''
         this.enemyHealingSubTotal = ''
         this.enemyHealingBonus = 1
         this.enemyHealingIncrement = -5
         this.enemyHealingTextElement.innerText = this.enemyHealingTotal
         enemyHealingMPCost = 0
          //Enemy HEAL
        this.enemyHealingTotal = ''
        this.enemyHealingSubTotal = ''
        this.enemyHealingBonus = 1
        this.enemyHealingIncrement = -5
        this.enemyHealingTextElement.innerText = this.enemyHealingTotal
        enemyHealingMPCost = 0
        //Self ATK Up
        selfAtkUpCurrentValue = '-'
        //Enemy ATK Up
        enemyAtkUpCurrentValue = '-'
        //Self ATK Down
        selfAtkDownCurrentValue = '-'
        //Enemy ATK Down
        enemyAtkDownCurrentValue = '-'
        //Self DEF Up
        selfDefUpCurrentValue = '-'
        //Enemy DEF Up
        enemyDefUpCurrentValue = '-'
        //Self DEF Down
        selfDefDownCurrentValue = '-'
        //Enemy DEF Down
        enemyDefDownCurrentValue = '-'
        //Checkbox Vals
        selfStunMPCost = 0
        enemyStunMPCost = 0
        selfEsunaMPCost = 0
        enemyEsunaMPCost = 0
        selfReviveMPCost = 0
        enemyReviveMPCost = 0
        selfInvulnMPCost = 0
        enemyInvulnMPCost = 0
        selfPerDamageMPMult = 1
        enemyPerDamageMPMult = 1
        selfPerHealingMPMult = 1
        enemyPerHealingMPMult = 1
        areaMPMult = 1
        summonMPCost = 0
        stealthMPCost = 0
    }

    reset() {
        this.updateSelfDamage()
        this.updateEnemyDamage()
        this.updateSelfHealing()
        this.updateEnemyHealing()
        selfAtkUpCurrentValue = '-'
        enemyAtkUpCurrentValue = '-'
        selfAtkDownCurrentValue = '-'
        enemyAtkDownCurrentValue = '-'
        selfDefUpCurrentValue = '-'
        enemyDefUpCurrentValue = '-'
        selfDefDownCurrentValue = '-'
        enemyDefDownCurrentValue = '-'
        selfTotalHealingText.innerText = '-'
        enemyTotalHealingText.innerText = '-'
        selfTotalDamageText.innerText = '-'
        enemyTotalDamageText.innerText = '-'
    }

    roleSelection() {
        this.currentRoleText = e.options[e.selectedIndex].text
        this.role = this.currentRoleText
        if (this.role == 'Tank') {
            damageBase = tankDamage
            healBase = tankHeal
            mpCritBase = tankMPCrit
            mpTotalBase = tankMPMax
            mpCritIncrement = tankCritIncrement
            hpThreshold = tankHPThreshold
        }
        else if (this.role == 'Light Tank') {
            damageBase = lightTankDamage
            healBase = lightTankHeal
            mpCritBase = lightTankMPCrit
            mpTotalBase = lightTankMPMax
            mpCritIncrement = lightTankCritIncrement
            hpThreshold = lightTankHPThreshold
        }
        else if (this.role == 'Melee Striker') {
            damageBase = mStrikerDamage
            healBase = mStrikerHeal
            mpCritBase = mStrikerMPCrit
            mpTotalBase = mStrikerMPMax
            mpCritIncrement = mStrikerCritIncrement
            hpThreshold = mStrikerHPThreshold
        }
        else if (this.role == 'Ranged Striker') {
            damageBase = rStrikerDamage
            healBase = rStrikerHeal
            mpCritBase = rStrikerMPCrit
            mpTotalBase = rStrikerMPMax
            mpCritIncrement = rStrikerCritIncrement
            hpThreshold = rStrikerHPThreshold
        }
        else if (this.role == 'Caster') {
            damageBase = casterDamage
            healBase = casterHeal
            mpCritBase = casterMPCrit
            mpTotalBase = casterMPMax
            mpCritIncrement = casterCritIncrement
            hpThreshold = casterHPThreshold
        }
        else if (this.role == 'Healer/Support') {
            damageBase = healDamage
            healBase = healHeal
            mpCritBase = healMPCrit
            mpTotalBase = healMPMax
            mpCritIncrement = healCritIncrement
            hpThreshold = healHPThreshold
        }
        else if (this.role == 'Tank Minion') {
            damageBase = mTankDamage
            healBase = mTankHeal
            mpCritBase = mTankMPCrit
            mpTotalBase = mTankMPMax
            mpCritIncrement = mTankCritIncrement
            hpThreshold = mTankHPThreshold
        }
        else if (this.role == 'DPS Minion') {
            damageBase = mDPSDamage
            healBase = mDPSHeal
            mpCritBase = mDPSMPCrit
            mpTotalBase = mDPSMPMax
            mpCritIncrement = mDPSCritIncrement
            hpThreshold = mDPSHPThreshold
        }
        else if (this.role == 'Heal Minion') {
            damageBase = mHealDamage
            healBase = mHealHeal
            mpCritBase = mHealMPCrit
            mpTotalBase = mHealMPMax
            mpCritIncrement = mHealCritIncrement
            hpThreshold = 5000
        }
        else if (this.role == 'Boss') {
            damageBase = bossDamage
            healBase = bossHeal
            mpCritBase = bossMPCrit
            mpTotalBase = bossMPMax
            mpCritIncrement = bossCritIncrement
            hpThreshold = 5000
        }
        else if (this.role == 'LIMIT BREAK') {
            damageBase = limitDamage
            healBase = limitHeal
            mpCritBase = limitMPCrit
            mpTotalBase = limitMPMax
            mpCritIncrement = limitCritIncrement
            hpThreshold = 5000
        }
        else {
            damageBase = 0
            healBase = 0
            mpCritBase = 0
            mpTotalBase = 0
            mpCritIncrement = 0
            hpThreshold = 5000
        }
        if (selfDamageIncrement >= 0) {
            selfDamageIncrement = 0
            selfDamageMPCost = 5
            selfDamageMPIteration = 20
            this.selfDamageBonus = 1
        }
        else if (selfDamageIncrement <= -5) {
            selfDamageIncrement = -5
            selfDamageMPCost = 0
            selfDamageMPIteration = 20
            this.selfDamageBonus = 1
        }
        else {
            selfDamageIncrement = -5
            selfDamageMPCost = 0
            selfDamageMPIteration = 20
            this.selfDamageBonus = 1
        }
        if (enemyDamageIncrement >= 0) {
            enemyDamageIncrement = 0
            enemyDamageMPCost = 5
            enemyDamageMPIteration = 20
            this.enemyDamageBonus = 1
        }
        else if (enemyDamageIncrement <= -5) {
            enemyDamageIncrement = -5
            enemyDamageMPCost = 0
            enemyDamageMPIteration = 20
            this.enemyDamageBonus = 1
        }
        else {
            enemyDamageIncrement = -5
            enemyDamageMPCost = 0
            enemyDamageMPIteration = 20
            this.enemyDamageBonus = 1
        }
        if (selfHealingIncrement >= 0) {
            selfHealingIncrement = 0
            selfHealingMPCost = 5
            selfHealingMPIteration = 20
            this.selfHealingBonus = 1
        }
        else if (selfHealingIncrement <= -5) {
            selfHealingIncrement = -5
            selfHealingMPCost = 0
            selfHealingMPIteration = 20
            this.selfHealingBonus = 1
        }
        else {
            selfHealingIncrement = -5
            selfHealingMPCost = 0
            selfHealingMPIteration = 20
            this.selfHealingBonus = 1
        }
        if (enemyHealingIncrement >= 0) {
            enemyHealingIncrement = 0
            enemyHealingMPCost = 5
            enemyHealingMPIteration = 20
            this.enemyHealingBonus = 1
        }
        else if (enemyHealingIncrement <= -5) {
            enemyHealingIncrement = -5
            enemyHealingMPCost = 0
            enemyHealingMPIteration = 20
            this.enemyHealingBonus = 1
        }
        else {
            enemyHealingIncrement = -5
            enemyHealingMPCost = 0
            enemyHealingMPIteration = 20
            this.enemyHealingBonus = 1
        }
        this.reset()
    }

    mpTotalDisplay() {
        var selfFinalDamageMPCost = roundUp5(selfDamageMPCost * selfPerDamageMPMult)
        var enemyFinalDamageMPCost = roundUp5(enemyDamageMPCost * enemyPerDamageMPMult)
        var selfFinalHealingMPCost = roundUp5(selfHealingMPCost * selfPerHealingMPMult)
        var enemyFinalHealingMPCost = roundUp5(enemyHealingMPCost * enemyPerHealingMPMult)
        var areaChecked = document.getElementById("AoECheckbox");
        var mpNegTotal = selfFinalDamageMPCost + enemyFinalHealingMPCost + enemyAtkUpMPCost + selfAtkDownMPCost + enemyDefUpMPCost + selfDefDownMPCost + selfStunMPCost + enemyEsunaMPCost + enemyReviveMPCost + enemyInvulnMPCost;
        var mpPosTotal = enemyFinalDamageMPCost + selfFinalHealingMPCost + selfAtkUpMPCost + enemyAtkDownMPCost + selfDefUpMPCost + enemyDefDownMPCost + enemyStunMPCost + selfEsunaMPCost + selfReviveMPCost + selfInvulnMPCost + summonMPCost + stealthMPCost;
        var mpEndTotal = mpPosTotal - mpNegTotal
        var mpEndTotal2 = roundUp5(mpEndTotal * areaMPMult)
        if (areaChecked.checked == true && mpEndTotal2 <= 15) {
            this.mpTotalText.innerText = 15
        }
        else {
            this.mpTotalText.innerText = roundUp5(mpEndTotal * areaMPMult)
        }
        if (this.mpTotalText.innerText > mpTotalBase) {
            this.mpTotalText.style.border = "2px solid red";
            this.mpTotalText.style.background = 'rgba(255, 200, 200, .75)'.replace(/[^,]+(?=\))/, '0.5');
            mpError.innerText = "Over Max MP!"
        }
        else if (this.mpTotalText.innerText < 5 && mpNegTotal > 0) {
            this.mpTotalText.style.border = "2px solid red";
            this.mpTotalText.style.background = 'rgba(255, 200, 200, .75)'.replace(/[^,]+(?=\))/, '0.5');
            mpError.innerText = "Cannot be under 5 MP!"
        }
        else if(selfDamageIncrement > hpThreshold) {
            this.mpTotalText.style.border = "2px solid red";
            this.mpTotalText.style.background = 'rgba(255, 200, 200, .75)'.replace(/[^,]+(?=\))/, '0.5');
            mpError.innerText = "Self Damage cannot be over Max HP!"
        }
        else {
            this.mpTotalText.style.border = "1px solid black";
            this.mpTotalText.style.background = 'white';
            mpError.innerText = ''
        }
        this.selfPerDamageCheck()
        this.enemyPerDamageCheck()
        this.selfPerHealingCheck()
        this.enemyPerHealingCheck()
    }

//START Self-Ally Damage functions

    selfDamagePlus() {
        if (selfDamageIncrement == -5) {
            selfDamageMPCost = 5
        }
        else if (selfDamageIncrement >= 0) {
            selfDamageMPCost+= selfDamageMPIteration
                if (selfDamageMPIteration < 75) {
                selfDamageMPIteration+= 5
            }
        }
        else {
            return
        }
        selfDamageIncrement+= 5
        this.updateSelfDamage()
    }

    selfDamageMinus() {
        if (selfDamageIncrement < 0) {
            selfDamageMPCost = 0
        }
        else if (selfDamageIncrement == 0) {
            selfDamageMPCost = 0
        }
        else if (selfDamageIncrement > 0) {
            if (selfDamageIncrement <= 55) {
                selfDamageMPIteration-= 5

                if (selfDamageIncrement == 5) {
                    selfDamageMPCost = 5
                }
                else if (selfDamageIncrement >= 5) {
                    selfDamageMPCost-= selfDamageMPIteration
                }
                else {
                    return
                }
            }
            else {
                if (selfDamageIncrement == 5) {
                    selfDamageMPCost = 5
                }
                else if (selfDamageIncrement >= 5) {
                    selfDamageMPCost-= selfDamageMPIteration
                }
                else {
                    return
                }
            }   
        }
        if (selfDamageIncrement <= -5) {
            return
        }
        else {
        selfDamageIncrement-= 5
        }
        this.updateSelfDamage()
    }

    selfDamageBonusDetect() {
        if (selfDamageIncrement >= mpCritIncrement) {
            this.selfDamageTextElement.style.background = "lightblue";
            selfDamageBonusCalc = selfDamageIncrement - mpCritIncrement
            selfDamageBonusCalcConvert = selfDamageBonusCalc / 5
            selfDamageBonusCalcResult = selfDamageBonusCalcConvert * 0.1
            this.selfDamageBonus = 1.5 + selfDamageBonusCalcResult
        }
        else {
            this.selfDamageBonus = 1
            this.selfDamageTextElement.style.background = "white"
        }
    }

    updateSelfDamage() {
        if (selfDamageIncrement >= 0) {
            this.selfDamageSubTotal = damageBase + selfDamageIncrement
            this.selfDamageTotal = this.selfDamageSubTotal * this.selfDamageBonus
            this.selfDamageTextElement.innerText = roundUp5(this.selfDamageTotal)
        }   
        else if (selfDamageIncrement < 0) {
            this.selfDamageTextElement.innerText = "-"
        } 
        else {
          this.selfDamageTextElement.innerText = 0
        }
        this.selfDamageBonusDetect()
    }

//END Self-Ally Damage functions

//START Enemy Damage functions

enemyDamagePlus() {
    if (enemyDamageIncrement == -5) {
        enemyDamageMPCost = 5
    }
    else if (enemyDamageIncrement >= 0) {
        enemyDamageMPCost+= enemyDamageMPIteration
            if (enemyDamageMPIteration < 75) {
            enemyDamageMPIteration+= 5
        }
    }
    else {
        return
    }
    enemyDamageIncrement+= 5
    this.updateEnemyDamage()
}

enemyDamageMinus() {
    if (enemyDamageIncrement < 0) {
        enemyDamageMPCost = 0
    }
    else if (enemyDamageIncrement == 0) {
        enemyDamageMPCost = 0
    }
    else if (enemyDamageIncrement > 0) {
        if (enemyDamageIncrement <= 55) {
            enemyDamageMPIteration-= 5

            if (enemyDamageIncrement == 5) {
                enemyDamageMPCost = 5
            }
            else if (enemyDamageIncrement >= 5) {
                enemyDamageMPCost-= enemyDamageMPIteration
            }
            else {
                return
            }
        }
        else {
            if (enemyDamageIncrement == 5) {
                enemyDamageMPCost = 5
            }
            else if (enemyDamageIncrement >= 5) {
                enemyDamageMPCost-= enemyDamageMPIteration
            }
            else {
                return
            }
        }   
    }
    if (enemyDamageIncrement <= -5) {
        return
    }
    else {
        enemyDamageIncrement-= 5
    }
    this.updateEnemyDamage()
}

enemyDamageBonusDetect() {
    if (enemyDamageIncrement >= mpCritIncrement) {
        this.enemyDamageTextElement.style.background = "lightblue";
        enemyDamageBonusCalc = enemyDamageIncrement - mpCritIncrement
        enemyDamageBonusCalcConvert = enemyDamageBonusCalc / 5
        enemyDamageBonusCalcResult = enemyDamageBonusCalcConvert * 0.1
        this.enemyDamageBonus = 1.5 + enemyDamageBonusCalcResult
    }
    else {
        this.enemyDamageBonus = 1
        this.enemyDamageTextElement.style.background = "white"
    }
}

updateEnemyDamage() {
    if (enemyDamageIncrement >= 0) {
        this.enemyDamageSubTotal = damageBase + enemyDamageIncrement
        this.enemyDamageTotal = this.enemyDamageSubTotal * this.enemyDamageBonus
        this.enemyDamageTextElement.innerText = roundUp5(this.enemyDamageTotal)
    }   
    else if (enemyDamageIncrement < 0) {
        this.enemyDamageTextElement.innerText = "-"
    } 
    else {
      this.enemyDamageTextElement.innerText = 0
    }
    this.enemyDamageBonusDetect()
}
//END Enemy Damage functions

//START Self-Ally Healing functions

selfHealingPlus() {
    if (selfHealingIncrement == -5) {
        selfHealingMPCost = 5
    }
    else if (selfHealingIncrement >= 0) {
        selfHealingMPCost+= selfHealingMPIteration
            if (selfHealingMPIteration < 75) {
            selfHealingMPIteration+= 5
        }
    }
    else {
        return
    }
    selfHealingIncrement+= 5
    this.updateSelfHealing()
}

selfHealingMinus() {
    if (selfHealingIncrement < 0) {
        selfHealingMPCost = 0
    }
    else if (selfHealingIncrement == 0) {
        selfHealingMPCost = 0
    }
    else if (selfHealingIncrement > 0) {
        if (selfHealingIncrement <= 55) {
            selfHealingMPIteration-= 5

            if (selfHealingIncrement == 5) {
                selfHealingMPCost = 5
            }
            else if (selfHealingIncrement >= 5) {
                selfHealingMPCost-= selfHealingMPIteration
            }
            else {
                return
            }
        }
        else {
            if (selfHealingIncrement == 5) {
                selfHealingMPCost = 5
            }
            else if (selfHealingIncrement >= 5) {
                selfHealingMPCost-= selfHealingMPIteration
            }
            else {
                return
            }
        }   
    }
    if (selfHealingIncrement <= -5) {
        return
    }
    else {
    selfHealingIncrement-= 5
    }
    this.updateSelfHealing()
}

selfHealingBonusDetect() {
    if (selfHealingIncrement >= mpCritIncrement) {
        this.selfHealingTextElement.style.background = "lightblue";
        selfHealingBonusCalc = selfHealingIncrement - mpCritIncrement
        selfHealingBonusCalcConvert = selfHealingBonusCalc / 5
        selfHealingBonusCalcResult = selfHealingBonusCalcConvert * 0.1
        this.selfHealingBonus = 1.5 + selfHealingBonusCalcResult
    }
    else {
        this.selfHealingBonus = 1
        this.selfHealingTextElement.style.background = "white"
    }
}

updateSelfHealing() {
    if (selfHealingIncrement >= 0) {
        this.selfHealingSubTotal = healBase + selfHealingIncrement
        this.selfHealingTotal = this.selfHealingSubTotal * this.selfHealingBonus
        this.selfHealingTextElement.innerText = roundUp5(this.selfHealingTotal)
    }   
    else if (selfHealingIncrement < 0) {
        this.selfHealingTextElement.innerText = "-"
    } 
    else {
      this.selfHealingTextElement.innerText = 0
    }
    this.selfHealingBonusDetect()
}

//END Self-Ally Healing functions

//START Enemy Healing functions

enemyHealingPlus() {
if (enemyHealingIncrement == -5) {
    enemyHealingMPCost = 5
}
else if (enemyHealingIncrement >= 0) {
    enemyHealingMPCost+= enemyHealingMPIteration
        if (enemyHealingMPIteration < 75) {
        enemyHealingMPIteration+= 5
    }
}
else {
    return
}
enemyHealingIncrement+= 5
this.updateEnemyHealing()
}

enemyHealingMinus() {
if (enemyHealingIncrement < 0) {
    enemyHealingMPCost = 0
}
else if (enemyHealingIncrement == 0) {
    enemyHealingMPCost = 0
}
else if (enemyHealingIncrement > 0) {
    if (enemyHealingIncrement <= 55) {
        enemyHealingMPIteration-= 5

        if (enemyHealingIncrement == 5) {
            enemyHealingMPCost = 5
        }
        else if (enemyHealingIncrement >= 5) {
            enemyHealingMPCost-= enemyHealingMPIteration
        }
        else {
            return
        }
    }
    else {
        if (enemyHealingIncrement == 5) {
            enemyHealingMPCost = 5
        }
        else if (enemyHealingIncrement >= 5) {
            enemyHealingMPCost-= enemyHealingMPIteration
        }
        else {
            return
        }
    }   
}
if (enemyHealingIncrement <= -5) {
    return
}
else {
    enemyHealingIncrement-= 5
}
this.updateEnemyHealing()
}

enemyHealingBonusDetect() {
if (enemyHealingIncrement >= mpCritIncrement) {
    this.enemyHealingTextElement.style.background = "lightblue";
    enemyHealingBonusCalc = enemyHealingIncrement - mpCritIncrement
    enemyHealingBonusCalcConvert = enemyHealingBonusCalc / 5
    enemyHealingBonusCalcResult = enemyHealingBonusCalcConvert * 0.1
    this.enemyHealingBonus = 1.5 + enemyHealingBonusCalcResult
}
else {
    this.enemyHealingBonus = 1
    this.enemyHealingTextElement.style.background = "white"
}
}

updateEnemyHealing() {
if (enemyHealingIncrement >= 0) {
    this.enemyHealingSubTotal = healBase + enemyHealingIncrement
    this.enemyHealingTotal = this.enemyHealingSubTotal * this.enemyHealingBonus
    this.enemyHealingTextElement.innerText = roundUp5(this.enemyHealingTotal)
}   
else if (enemyHealingIncrement < 0) {
    this.enemyHealingTextElement.innerText = "-"
} 
else {
  this.enemyHealingTextElement.innerText = 0
}
this.enemyHealingBonusDetect()
}
//END Enemy Healing functions

//START Self Attack Buff

selfAtkUpPlus() {
    switch(selfAtkUpNow) {
        case 0: 
        selfAtkUpNow+= 1
        selfAtkUpCurrentValue = modUp5Value
        selfAtkUpMPCost = 50
        break;
        case 1: 
        selfAtkUpNow+= 1
        selfAtkUpCurrentValue = modUp10Value
        selfAtkUpMPCost = 60
        break;
        case 2: 
        selfAtkUpNow+= 1
        selfAtkUpCurrentValue = modUp15Value
        selfAtkUpMPCost = 70
        break;
        case 3: 
        return
    }
}

selfAtkUpMinus() {
    switch(selfAtkUpNow) {
        case 0: 
        return
        case 1: 
        selfAtkUpNow-= 1
        selfAtkUpCurrentValue = modNullValue
        selfAtkUpMPCost = 0
        break;
        case 2: 
        selfAtkUpNow-= 1
        selfAtkUpCurrentValue = modUp5Value
        selfAtkUpMPCost = 50
        break;
        case 3: 
        selfAtkUpNow-= 1
        selfAtkUpCurrentValue = modUp10Value
        selfAtkUpMPCost = 60
        break;
    }
}

updateSelfAtkUp() {
    this.selfAtkUpTextElement.innerText = selfAtkUpCurrentValue
}

//END Self Attack Buff

//START Enemy Attack Buff

enemyAtkUpPlus() {
    switch(enemyAtkUpNow) {
        case 0: 
        enemyAtkUpNow+= 1
        enemyAtkUpCurrentValue = modUp5Value
        enemyAtkUpMPCost = 50
        break;
        case 1: 
        enemyAtkUpNow+= 1
        enemyAtkUpCurrentValue = modUp10Value
        enemyAtkUpMPCost = 60
        break;
        case 2: 
        enemyAtkUpNow+= 1
        enemyAtkUpCurrentValue = modUp15Value
        enemyAtkUpMPCost = 70
        break;
        case 3: 
        return
    }
}

enemyAtkUpMinus() {
    switch(enemyAtkUpNow) {
        case 0: 
        return
        case 1: 
        enemyAtkUpNow-= 1
        enemyAtkUpCurrentValue = modNullValue
        enemyAtkUpMPCost = 0
        break;
        case 2: 
        enemyAtkUpNow-= 1
        enemyAtkUpCurrentValue = modUp5Value
        enemyAtkUpMPCost = 50
        break;
        case 3: 
        enemyAtkUpNow-= 1
        enemyAtkUpCurrentValue = modUp10Value
        enemyAtkUpMPCost = 60
        break;
    }
}

updateEnemyAtkUp() {
    this.enemyAtkUpTextElement.innerText = enemyAtkUpCurrentValue
}

//END Enemy Attack Buff

//START Self Attack Debuff

selfAtkDownPlus() {
    switch(selfAtkDownNow) {
        case 0: 
        selfAtkDownNow+= 1
        selfAtkDownCurrentValue = modDown5Value
        selfAtkDownMPCost = 50
        break;
        case 1: 
        selfAtkDownNow+= 1
        selfAtkDownCurrentValue = modDown10Value
        selfAtkDownMPCost = 60
        break;
        case 2: 
        selfAtkDownNow+= 1
        selfAtkDownCurrentValue = modDown15Value
        selfAtkDownMPCost = 70
        break;
        case 3: 
        return
    }
}

selfAtkDownMinus() {
    switch(selfAtkDownNow) {
        case 0: 
        return
        case 1: 
        selfAtkDownNow-= 1
        selfAtkDownCurrentValue = modNullValue
        selfAtkDownMPCost = 0
        break;
        case 2: 
        selfAtkDownNow-= 1
        selfAtkDownCurrentValue = modDown5Value
        selfAtkDownMPCost = 50
        break;
        case 3: 
        selfAtkDownNow-= 1
        selfAtkDownCurrentValue = modDown10Value
        selfAtkDownMPCost = 60
        break;
    }
}

updateSelfAtkDown() {
    this.selfAtkDownTextElement.innerText = selfAtkDownCurrentValue
}

//END Self Attack Debuff

//START Enemy Attack Debuff

enemyAtkDownPlus() {
    switch(enemyAtkDownNow) {
        case 0: 
        enemyAtkDownNow+= 1
        enemyAtkDownCurrentValue = modDown5Value
        enemyAtkDownMPCost = 50
        break;
        case 1: 
        enemyAtkDownNow+= 1
        enemyAtkDownCurrentValue = modDown10Value
        enemyAtkDownMPCost = 60
        break;
        case 2: 
        enemyAtkDownNow+= 1
        enemyAtkDownCurrentValue = modDown15Value
        enemyAtkDownMPCost = 70
        break;
        case 3: 
        return
    }
}

enemyAtkDownMinus() {
    switch(enemyAtkDownNow) {
        case 0: 
        return
        case 1: 
        enemyAtkDownNow-= 1
        enemyAtkDownCurrentValue = modNullValue
        enemyAtkDownMPCost = 0
        break;
        case 2: 
        enemyAtkDownNow-= 1
        enemyAtkDownCurrentValue = modDown5Value
        enemyAtkDownMPCost = 50
        break;
        case 3: 
        enemyAtkDownNow-= 1
        enemyAtkDownCurrentValue = modDown10Value
        enemyAtkDownMPCost = 60
        break;
    }
}

updateEnemyAtkDown() {
    this.enemyAtkDownTextElement.innerText = enemyAtkDownCurrentValue
}

//END Enemy Attack Debuff

//START Self Defense Buff

selfDefUpPlus() {
    switch(selfDefUpNow) {
        case 0: 
        selfDefUpNow+= 1
        selfDefUpCurrentValue = modUp5Value
        selfDefUpMPCost = 50
        break;
        case 1: 
        selfDefUpNow+= 1
        selfDefUpCurrentValue = modUp10Value
        selfDefUpMPCost = 60
        break;
        case 2: 
        selfDefUpNow+= 1
        selfDefUpCurrentValue = modUp15Value
        selfDefUpMPCost = 70
        break;
        case 3: 
        return
    }
}

selfDefUpMinus() {
    switch(selfDefUpNow) {
        case 0: 
        return
        case 1: 
        selfDefUpNow-= 1
        selfDefUpCurrentValue = modNullValue
        selfDefUpMPCost = 0
        break;
        case 2: 
        selfDefUpNow-= 1
        selfDefUpCurrentValue = modUp5Value
        selfDefUpMPCost = 50
        break;
        case 3: 
        selfDefUpNow-= 1
        selfDefUpCurrentValue = modUp10Value
        selfDefUpMPCost = 60
        break;
    }
}

updateSelfDefUp() {
    this.selfDefUpTextElement.innerText = selfDefUpCurrentValue
}

//END Self Defense Buff

//START Enemy Defense Buff

enemyDefUpPlus() {
    switch(enemyDefUpNow) {
        case 0: 
        enemyDefUpNow+= 1
        enemyDefUpCurrentValue = modUp5Value
        enemyDefUpMPCost = 50
        break;
        case 1: 
        enemyDefUpNow+= 1
        enemyDefUpCurrentValue = modUp10Value
        enemyDefUpMPCost = 60
        break;
        case 2: 
        enemyDefUpNow+= 1
        enemyDefUpCurrentValue = modUp15Value
        enemyDefUpMPCost = 70
        break;
        case 3: 
        return
    }
}

enemyDefUpMinus() {
    switch(enemyDefUpNow) {
        case 0: 
        return
        case 1: 
        enemyDefUpNow-= 1
        enemyDefUpCurrentValue = modNullValue
        enemyDefUpMPCost = 0
        break;
        case 2: 
        enemyDefUpNow-= 1
        enemyDefUpCurrentValue = modUp5Value
        enemyDefUpMPCost = 50
        break;
        case 3: 
        enemyDefUpNow-= 1
        enemyDefUpCurrentValue = modUp10Value
        enemyDefUpMPCost = 60
        break;
    }
}

updateEnemyDefUp() {
    this.enemyDefUpTextElement.innerText = enemyDefUpCurrentValue
}

//END Enemy Defense Buff

//START Self Defense Debuff

selfDefDownPlus() {
    switch(selfDefDownNow) {
        case 0: 
        selfDefDownNow+= 1
        selfDefDownCurrentValue = modDown5Value
        selfDefDownMPCost = 50
        break;
        case 1: 
        selfDefDownNow+= 1
        selfDefDownCurrentValue = modDown10Value
        selfDefDownMPCost = 60
        break;
        case 2: 
        selfDefDownNow+= 1
        selfDefDownCurrentValue = modDown15Value
        selfDefDownMPCost = 70
        break;
        case 3: 
        return
    }
}

selfDefDownMinus() {
    switch(selfDefDownNow) {
        case 0: 
        return
        case 1: 
        selfDefDownNow-= 1
        selfDefDownCurrentValue = modNullValue
        selfDefDownMPCost = 0
        break;
        case 2: 
        selfDefDownNow-= 1
        selfDefDownCurrentValue = modDown5Value
        selfDefDownMPCost = 50
        break;
        case 3: 
        selfDefDownNow-= 1
        selfDefDownCurrentValue = modDown10Value
        selfDefDownMPCost = 60
        break;
    }
}

updateSelfDefDown() {
    this.selfDefDownTextElement.innerText = selfDefDownCurrentValue
}

//END Self Defense Debuff

//START Enemy Defense Debuff

enemyDefDownPlus() {
    switch(enemyDefDownNow) {
        case 0: 
        enemyDefDownNow+= 1
        enemyDefDownCurrentValue = modDown5Value
        enemyDefDownMPCost = 50
        break;
        case 1: 
        enemyDefDownNow+= 1
        enemyDefDownCurrentValue = modDown10Value
        enemyDefDownMPCost = 60
        break;
        case 2: 
        enemyDefDownNow+= 1
        enemyDefDownCurrentValue = modDown15Value
        enemyDefDownMPCost = 70
        break;
        case 3: 
        return
    }
}

enemyDefDownMinus() {
    switch(enemyDefDownNow) {
        case 0: 
        return
        case 1: 
        enemyDefDownNow-= 1
        enemyDefDownCurrentValue = modNullValue
        enemyDefDownMPCost = 0
        break;
        case 2: 
        enemyDefDownNow-= 1
        enemyDefDownCurrentValue = modDown5Value
        enemyDefDownMPCost = 50
        break;
        case 3: 
        enemyDefDownNow-= 1
        enemyDefDownCurrentValue = modDown10Value
        enemyDefDownMPCost = 60
        break;
    }
}

updateEnemyDefDown() {
    this.enemyDefDownTextElement.innerText = enemyDefDownCurrentValue
}

//END Enemy Defense Debuff

//START Stun Checks

selfStunCheck() {
    var selfStunChecked = document.getElementById("selfStunCheckbox");
    if (selfStunChecked.checked == true) {
        selfStunMPCost = 35;
    }   
    else {
        selfStunMPCost = 0;
    }
}

enemyStunCheck() {
    var enemyStunChecked = document.getElementById("enemyStunCheckbox");
    if (enemyStunChecked.checked == true) {
        enemyStunMPCost = 35;
    }   
    else {
        enemyStunMPCost = 0;
    }
}
//END Stun Checks

//START Esuna Checks

selfEsunaCheck() {
    var selfEsunaChecked = document.getElementById("selfEsunaCheckbox");
    if (selfEsunaChecked.checked == true) {
        selfEsunaMPCost = 75;
    }   
    else {
        selfEsunaMPCost = 0;
    }
}

enemyEsunaCheck() {
    var enemyEsunaChecked = document.getElementById("enemyEsunaCheckbox");
    if (enemyEsunaChecked.checked == true) {
        enemyEsunaMPCost = 75;
    }   
    else {
        enemyEsunaMPCost = 0;
    }
}
//END Esuna Checks

//START Revive Checks

selfReviveCheck() {
    var selfReviveChecked = document.getElementById("selfReviveCheckbox");
    if (selfReviveChecked.checked == true) {
        selfReviveMPCost = 200;
    }   
    else {
        selfReviveMPCost = 0;
    }
}

enemyReviveCheck() {
    var enemyReviveChecked = document.getElementById("enemyReviveCheckbox");
    if (enemyReviveChecked.checked == true) {
        enemyReviveMPCost = 200;
    }   
    else {
        enemyReviveMPCost = 0;
    }
}
//END Revive Checks

//START Invuln Checks

selfInvulnCheck() {
    var selfInvulnChecked = document.getElementById("selfInvulnCheckbox");
    if (selfInvulnChecked.checked == true) {
        selfInvulnMPCost = 200;
    }   
    else {
        selfInvulnMPCost = 0;
    }
}

enemyInvulnCheck() {
    var enemyInvulnChecked = document.getElementById("enemyInvulnCheckbox");
    if (enemyInvulnChecked.checked == true) {
        enemyInvulnMPCost = 200;
    }   
    else {
        enemyInvulnMPCost = 0;
    }
}
//END Invuln Checks

//START PerDamage Checks

selfPerDamageCheck() {
    var selfPerDamageChecked = document.getElementById("selfPerDamageCheckbox");
    if (selfPerDamageChecked.checked == true) {
        selfPerDamageMPMult = 1.5;
        if (selfDamageIncrement >= 0) {
            selfTotalDamageText.innerText = roundUp5(selfDamageTextElement.innerText / 2)
        } 
        else {
            selfTotalDamageText.innerText = '-'
        }
    }   
    else {
        selfPerDamageMPMult = 1;
        selfTotalDamageText.innerText = selfDamageTextElement.innerText
    }
}

enemyPerDamageCheck() {
    var enemyPerDamageChecked = document.getElementById("enemyPerDamageCheckbox");
    if (enemyPerDamageChecked.checked == true) {
        enemyPerDamageMPMult = 1.5;
        if (enemyDamageIncrement >= 0) {
            enemyTotalDamageText.innerText = roundUp5(enemyDamageTextElement.innerText / 2)
        } 
        else {
            enemyTotalDamageText.innerText = '-'
        }
    }   
    else {
        enemyPerDamageMPMult = 1;
        enemyTotalDamageText.innerText = enemyDamageTextElement.innerText
    }
}
//END PerDamage Checks

//START PerHealing Checks

selfPerHealingCheck() {
    var selfPerHealingChecked = document.getElementById("selfPerHealingCheckbox");
    if (selfPerHealingChecked.checked == true) {
        selfPerHealingMPMult = 1.5;
        if (selfHealingIncrement >= 0) {
            selfTotalHealingText.innerText = roundUp5(selfHealingTextElement.innerText / 2)
        } 
        else {
            selfTotalHealingText.innerText = '-'
        }
    }   
    else {
        selfPerHealingMPMult = 1;
        selfTotalHealingText.innerText = selfHealingTextElement.innerText
    }
}

enemyPerHealingCheck() {
    var enemyPerHealingChecked = document.getElementById("enemyPerHealingCheckbox");
    if (enemyPerHealingChecked.checked == true) {
        enemyPerHealingMPMult = 1.5;
        if (enemyHealingIncrement >= 0) {
            enemyTotalHealingText.innerText = roundUp5(enemyHealingTextElement.innerText / 2)
        } 
        else {
            enemyTotalHealingText.innerText = '-'
        }
    }   
    else {
        enemyPerHealingMPMult = 1;
        enemyTotalHealingText.innerText = enemyHealingTextElement.innerText
    }
}
//END PerHealing Checks

//START AoE Check

areaCheck() {
    var areaChecked = document.getElementById("AoECheckbox");
    if (areaChecked.checked == true) {
        areaMPMult = 1.5;
    }   
    else {
        areaMPMult = 1;
    }
}
//END AoE Check

//START Summon Check

summonCheck() {
    var summonChecked = document.getElementById("SummonCheckbox");
    if (summonChecked.checked == true) {
        summonMPCost = 100;
    }   
    else {
        summonMPCost = 0;
    }
}
//END Summon Check

//START Stealth Check

stealthCheck() {
    var stealthChecked = document.getElementById("StealthCheckbox");
    if (stealthChecked.checked == true) {
        stealthMPCost = 100;
    }   
    else {
        stealthMPCost = 0;
    }
}
//END Stealth Check


}

//Global
const mpTotalText = document.querySelector('[data-total-mp-cost]')
const mpError = document.querySelector('[data-mp-error]')

var mpEndTotal = mpPosTotal - mpNegTotal;
var mpNegTotal = selfDamageMPCost + enemyHealingMPCost + enemyAtkUpMPCost;
var mpPosTotal = enemyDamageMPCost + selfHealingMPCost + selfAtkUpMPCost;


//Ally/Self Damage
const selfDamageTextElement = document.querySelector('[data-self-damage]')
const selfDamagePlusButton = document.querySelector('[data-self-damage-plus]')
const selfDamageMinusButton = document.querySelector('[data-self-damage-minus]')
var selfDamageMPIteration = 20;
var selfDamageMPIterationPrev = 15;
var selfDamageMPCost;
var selfDamageTotal;
var selfDamageSubTotal;
var selfDamageIncrement;
var selfDamageBonusCalcConvert;
var selfDamageBonusCalc;
var selfDamageBonusCalcResult;


//Enemy Damage
const enemyDamageTextElement = document.querySelector('[data-enemy-damage]')
const enemyDamagePlusButton = document.querySelector('[data-enemy-damage-plus]')
const enemyDamageMinusButton = document.querySelector('[data-enemy-damage-minus]')
var enemyDamageMPIteration = 20;
var enemyDamageMPIterationPrev = 15;
var enemyDamageMPCost;
var enemyDamageTotal;
var enemyDamageSubTotal;
var enemyDamageIncrement;
var enemyDamageBonusCalcConvert;
var enemyDamageBonusCalc;
var enemyDamageBonusCalcResult;


//Ally/Self Healing
const selfHealingTextElement = document.querySelector('[data-self-healing]')
const selfHealingPlusButton = document.querySelector('[data-self-healing-plus]')
const selfHealingMinusButton = document.querySelector('[data-self-healing-minus]')
var selfHealingMPIteration = 20;
var selfHealingMPIterationPrev = 15;
var selfHealingMPCost;
var selfHealingTotal;
var selfHealingSubTotal;
var selfHealingIncrement;
var selfHealingBonusCalcConvert;
var selfHealingBonusCalc;
var selfHealingBonusCalcResult;


//Enemy Healing
const enemyHealingTextElement = document.querySelector('[data-enemy-healing]')
const enemyHealingPlusButton = document.querySelector('[data-enemy-healing-plus]')
const enemyHealingMinusButton = document.querySelector('[data-enemy-healing-minus]')
var enemyHealingMPIteration = 20;
var enemyHealingMPIterationPrev = 15;
var enemyHealingMPCost;
var enemyHealingTotal;
var enemyHealingSubTotal;
var enemyHealingIncrement;
var enemyHealingBonusCalcConvert;
var enemyHealingBonusCalc;
var enemyHealingBonusCalcResult;

//Buff/Debuff Global

const buff5Cost = 50
const buff10Cost = 60
const buff15Cost = 70
const modNullValue = '-'
const modUp5Value = '+5'
const modUp10Value = '+10'
const modUp15Value = '+15'
const modDown5Value = '-5'
const modDown10Value = '-10'
const modDown15Value = '-15'

//Self ATK Buff

const selfAtkUpTextElement = document.querySelector('[data-self-atkup]')
const selfAtkUpPlusButton = document.querySelector('[data-self-atkup-plus]')
const selfAtkUpMinusButton = document.querySelector('[data-self-atkup-minus]')

var selfAtkUpCurrentValue = '-';
var selfAtkUpNow = 0;
var selfAtkUpMPCost = 0;

//Enemy ATK Buff

const enemyAtkUpTextElement = document.querySelector('[data-enemy-atkup]')
const enemyAtkUpPlusButton = document.querySelector('[data-enemy-atkup-plus]')
const enemyAtkUpMinusButton = document.querySelector('[data-enemy-atkup-minus]')

var enemyAtkUpCurrentValue = '-';
var enemyAtkUpNow = 0;
var enemyAtkUpMPCost = 0;

//Self ATK Debuff

const selfAtkDownTextElement = document.querySelector('[data-self-atkdown]')
const selfAtkDownPlusButton = document.querySelector('[data-self-atkdown-plus]')
const selfAtkDownMinusButton = document.querySelector('[data-self-atkdown-minus]')

var selfAtkDownCurrentValue = '-';
var selfAtkDownNow = 0;
var selfAtkDownMPCost = 0;

//Enemy ATK Debuff

const enemyAtkDownTextElement = document.querySelector('[data-enemy-atkdown]')
const enemyAtkDownPlusButton = document.querySelector('[data-enemy-atkdown-plus]')
const enemyAtkDownMinusButton = document.querySelector('[data-enemy-atkdown-minus]')

var enemyAtkDownCurrentValue = '-';
var enemyAtkDownNow = 0;
var enemyAtkDownMPCost = 0;

//Self DEF Buff

const selfDefUpTextElement = document.querySelector('[data-self-defup]')
const selfDefUpPlusButton = document.querySelector('[data-self-defup-plus]')
const selfDefUpMinusButton = document.querySelector('[data-self-defup-minus]')

var selfDefUpCurrentValue = '-';
var selfDefUpNow = 0;
var selfDefUpMPCost = 0;

//Enemy DEF Buff

const enemyDefUpTextElement = document.querySelector('[data-enemy-defup]')
const enemyDefUpPlusButton = document.querySelector('[data-enemy-defup-plus]')
const enemyDefUpMinusButton = document.querySelector('[data-enemy-defup-minus]')

var enemyDefUpCurrentValue = '-';
var enemyDefUpNow = 0;
var enemyDefUpMPCost = 0;

//Self DEF Debuff

const selfDefDownTextElement = document.querySelector('[data-self-defdown]')
const selfDefDownPlusButton = document.querySelector('[data-self-defdown-plus]')
const selfDefDownMinusButton = document.querySelector('[data-self-defdown-minus]')

var selfDefDownCurrentValue = '-';
var selfDefDownNow = 0;
var selfDefDownMPCost = 0;

//Enemy DEF Debuff

const enemyDefDownTextElement = document.querySelector('[data-enemy-defdown]')
const enemyDefDownPlusButton = document.querySelector('[data-enemy-defdown-plus]')
const enemyDefDownMinusButton = document.querySelector('[data-enemy-defdown-minus]')

var enemyDefDownCurrentValue = '-';
var enemyDefDownNow = 0;
var enemyDefDownMPCost = 0;

//Self Stun Checkbox

const selfStunCheckbox = document.querySelector('[data-self-stun]')

var selfStunMPCost;

//Enemy Stun Checkbox

const enemyStunCheckbox = document.querySelector('[data-enemy-stun]')

var enemyStunMPCost;

//Self Esuna Checkbox

const selfEsunaCheckbox = document.querySelector('[data-self-esuna]')

var selfEsunaMPCost;

//Enemy Esuna Checkbox

const enemyEsunaCheckbox = document.querySelector('[data-enemy-esuna]')

var enemyEsunaMPCost;

//Self Revive Checkbox

const selfReviveCheckbox = document.querySelector('[data-self-revive]')

var selfReviveMPCost;

//Enemy Revive Checkbox

const enemyReviveCheckbox = document.querySelector('[data-enemy-revive]')

var enemyReviveMPCost;

//Self Invuln Checkbox

const selfInvulnCheckbox = document.querySelector('[data-self-invuln]')

var selfInvulnMPCost;

//Enemy Invuln Checkbox

const enemyInvulnCheckbox = document.querySelector('[data-enemy-invuln]')

var enemyInvulnMPCost;

//Self Per Damage Checkbox*** PERCENTAGE INCREASE AND HALF DAMAGE

const selfPerDamageCheckbox = document.querySelector('[data-self-perdamage]')

var selfPerDamageMPMult;

//Enemy Per Damage Checkbox*** PERCENTAGE INCREASE AND HALF DAMAGE

const enemyPerDamageCheckbox = document.querySelector('[data-enemy-perdamage]')

var enemyPerDamageMPMult;

//Self Per Healing Checkbox*** PERCENTAGE INCREASE AND HALF HEALING

const selfPerHealingCheckbox = document.querySelector('[data-self-perhealing]')

var selfPerHealingMPMult;

//Enemy Per Healing Checkbox*** PERCENTAGE INCREASE AND HALF HEALING

const enemyPerHealingCheckbox = document.querySelector('[data-enemy-perhealing]')

var enemyPerHealingMPMult;

//AoE Checkbox

const areaCheckbox = document.querySelector('[data-aoe]')

var areaMPMult;

//Summon Checkbox

const summonCheckbox = document.querySelector('[data-summon]')

var summonMPCost;

//Stealth Checkbox

const stealthCheckbox = document.querySelector('[data-stealth]')

var stealthMPCost;

//Total Damage

const selfTotalDamageText = document.querySelector('[data-self-total-damage]')
const enemyTotalDamageText = document.querySelector('[data-enemy-total-damage]')


//Total Healing

const selfTotalHealingText = document.querySelector('[data-self-total-healing]')
const enemyTotalHealingText = document.querySelector('[data-enemy-total-healing]')



//BUTTONS
const abilitycalculator = new AbilityCalculator(selfDamageTextElement, selfDamagePlusButton, currentRoleText, enemyDamageTextElement, enemyDamagePlusButton, selfHealingTextElement, selfHealingPlusButton, enemyHealingTextElement, enemyHealingPlusButton)

//Global
roleSelectDetect.addEventListener('input', select => {
    abilitycalculator.roleSelection()
    abilitycalculator.updateSelfDamage()
    abilitycalculator.mpTotalDisplay()
})
//SELF DAMAGE
selfDamagePlusButton.addEventListener('click', button => {
    abilitycalculator.selfDamagePlus()
    abilitycalculator.updateSelfDamage()
    abilitycalculator.mpTotalDisplay()
})

selfDamageMinusButton.addEventListener('click', button => {
    abilitycalculator.selfDamageMinus()
    abilitycalculator.updateSelfDamage()
    abilitycalculator.mpTotalDisplay()
})
//ENEMY DAMAGE
enemyDamagePlusButton.addEventListener('click', button => {
    abilitycalculator.enemyDamagePlus()
    abilitycalculator.updateEnemyDamage()
    abilitycalculator.mpTotalDisplay()
})

enemyDamageMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyDamageMinus()
    abilitycalculator.updateEnemyDamage()
    abilitycalculator.mpTotalDisplay()
})
//SELF HEALING
selfHealingPlusButton.addEventListener('click', button => {
    abilitycalculator.selfHealingPlus()
    abilitycalculator.updateSelfHealing()
    abilitycalculator.mpTotalDisplay()
})

selfHealingMinusButton.addEventListener('click', button => {
    abilitycalculator.selfHealingMinus()
    abilitycalculator.updateSelfHealing()
    abilitycalculator.mpTotalDisplay()
})
//ENEMY HEALING
enemyHealingPlusButton.addEventListener('click', button => {
    abilitycalculator.enemyHealingPlus()
    abilitycalculator.updateEnemyHealing()
    abilitycalculator.mpTotalDisplay()
})

enemyHealingMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyHealingMinus()
    abilitycalculator.updateEnemyHealing()
    abilitycalculator.mpTotalDisplay()
})

//SELF ATK UP

selfAtkUpPlusButton.addEventListener('click', button => {
    abilitycalculator.selfAtkUpPlus()
    abilitycalculator.updateSelfAtkUp()
    abilitycalculator.mpTotalDisplay()
})

selfAtkUpMinusButton.addEventListener('click', button => {
    abilitycalculator.selfAtkUpMinus()
    abilitycalculator.updateSelfAtkUp()
    abilitycalculator.mpTotalDisplay()
})

//ENEMY ATK UP

enemyAtkUpPlusButton.addEventListener('click', button => {
    abilitycalculator.enemyAtkUpPlus()
    abilitycalculator.updateEnemyAtkUp()
    abilitycalculator.mpTotalDisplay()
})

enemyAtkUpMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyAtkUpMinus()
    abilitycalculator.updateEnemyAtkUp()
    abilitycalculator.mpTotalDisplay()
})

//SELF ATK DOWN

selfAtkDownPlusButton.addEventListener('click', button => {
    abilitycalculator.selfAtkDownPlus()
    abilitycalculator.updateSelfAtkDown()
    abilitycalculator.mpTotalDisplay()
})

selfAtkDownMinusButton.addEventListener('click', button => {
    abilitycalculator.selfAtkDownMinus()
    abilitycalculator.updateSelfAtkDown()
    abilitycalculator.mpTotalDisplay()
})

//ENEMY ATK DOWN

enemyAtkDownPlusButton.addEventListener('click', button => {
    abilitycalculator.enemyAtkDownPlus()
    abilitycalculator.updateEnemyAtkDown()
    abilitycalculator.mpTotalDisplay()
})

enemyAtkDownMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyAtkDownMinus()
    abilitycalculator.updateEnemyAtkDown()
    abilitycalculator.mpTotalDisplay()
})

//SELF DEF UP

selfDefUpPlusButton.addEventListener('click', button => {
    abilitycalculator.selfDefUpPlus()
    abilitycalculator.updateSelfDefUp()
    abilitycalculator.mpTotalDisplay()
})

selfDefUpMinusButton.addEventListener('click', button => {
    abilitycalculator.selfDefUpMinus()
    abilitycalculator.updateSelfDefUp()
    abilitycalculator.mpTotalDisplay()
})

//ENEMY DEF UP

enemyDefUpPlusButton.addEventListener('click', button => {
    abilitycalculator.enemyDefUpPlus()
    abilitycalculator.updateEnemyDefUp()
    abilitycalculator.mpTotalDisplay()
})

enemyDefUpMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyDefUpMinus()
    abilitycalculator.updateEnemyDefUp()
    abilitycalculator.mpTotalDisplay()
})

//SELF DEF DOWN

selfDefDownPlusButton.addEventListener('click', button => {
    abilitycalculator.selfDefDownPlus()
    abilitycalculator.updateSelfDefDown()
    abilitycalculator.mpTotalDisplay()
})

selfDefDownMinusButton.addEventListener('click', button => {
    abilitycalculator.selfDefDownMinus()
    abilitycalculator.updateSelfDefDown()
    abilitycalculator.mpTotalDisplay()
})

//ENEMY DEF DOWN

enemyDefDownPlusButton.addEventListener('click', button => {
    abilitycalculator.enemyDefDownPlus()
    abilitycalculator.updateEnemyDefDown()
    abilitycalculator.mpTotalDisplay()
})

enemyDefDownMinusButton.addEventListener('click', button => {
    abilitycalculator.enemyDefDownMinus()
    abilitycalculator.updateEnemyDefDown()
    abilitycalculator.mpTotalDisplay()
})

//STUN CHECKS
selfStunCheckbox.addEventListener('input', input => {
    abilitycalculator.selfStunCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyStunCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyStunCheck()
    abilitycalculator.mpTotalDisplay()
})

//ESUNA CHECKS
selfEsunaCheckbox.addEventListener('input', input => {
    abilitycalculator.selfEsunaCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyEsunaCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyEsunaCheck()
    abilitycalculator.mpTotalDisplay()
})

//REVIVE CHECKS
selfReviveCheckbox.addEventListener('input', input => {
    abilitycalculator.selfReviveCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyReviveCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyReviveCheck()
    abilitycalculator.mpTotalDisplay()
})

//INVULN CHECKS
selfInvulnCheckbox.addEventListener('input', input => {
    abilitycalculator.selfInvulnCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyInvulnCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyInvulnCheck()
    abilitycalculator.mpTotalDisplay()
})

//PERDAMAGE CHECKS
selfPerDamageCheckbox.addEventListener('input', input => {
    abilitycalculator.selfPerDamageCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyPerDamageCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyPerDamageCheck()
    abilitycalculator.mpTotalDisplay()
})

//PERHEALING CHECKS
selfPerHealingCheckbox.addEventListener('input', input => {
    abilitycalculator.selfPerHealingCheck()
    abilitycalculator.mpTotalDisplay()
})

enemyPerHealingCheckbox.addEventListener('input', input => {
    abilitycalculator.enemyPerHealingCheck()
    abilitycalculator.mpTotalDisplay()
})

//AOE CHECK
areaCheckbox.addEventListener('input', input => {
    abilitycalculator.areaCheck()
    abilitycalculator.mpTotalDisplay()
})

//SUMMON CHECKS
summonCheckbox.addEventListener('input', input => {
    abilitycalculator.summonCheck()
    abilitycalculator.mpTotalDisplay()
})

//STEALTH CHECKS
stealthCheckbox.addEventListener('input', input => {
    abilitycalculator.stealthCheck()
    abilitycalculator.mpTotalDisplay()
})