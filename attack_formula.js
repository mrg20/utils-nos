
const equip_up_bonus = [0, 0.1, 0.15, 0.22, 0.32, 0.43, 0.54, 0.65, 0.9, 1.2, 2];
const sp_up_bonus = [0, 5, 10, 15, 20, 28, 36, 46, 56, 68, 80, 95, 110, 128, 148, 173];

const ele_sp_bonus = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 204];
const res_red_sp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25];

const atk_sp_bonus = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 61, 67, 73, 79, 85, 91, 97, 103, 109, 115, 122, 129, 136, 143, 150, 157, 164, 171, 178, 190, 198, 206, 214, 222, 230, 238, 246, 254, 262, 270, 279, 288, 297, 306, 315, 324, 333, 342, 351, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 471, 482, 493, 504, 515, 526, 537, 548, 559, 575, 588, 601, 614, 627, 640, 653, 666, 679, 692, 705, 719, 733, 747, 761, 775, 789, 803, 817, 831, 845, 860, 875, 890, 905, 921, 938, 955, 975, 995, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1180, 1200, 1220, 1240, 1260, 1280, 1300, 1320, 1340, 1360, 1390];
const crit_sp_bonus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 10];
const crit_dmg_sp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 90];

const en_sp_bonus = [0, 0, 0, 0, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 40, 40, 40, 40, 40, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 70, 70, 70, 70, 70, 80, 80, 80, 80, 80, 90, 90, 90, 90, 90, 100, 100, 100, 100, 100, 115, 115, 115, 115, 115, 130, 130, 130, 130, 130, 145, 145, 145, 145, 145, 160, 160, 160, 160, 160, 180, 180, 180, 180, 180, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230];

const type_matchups = {
    "FIRE>WATER": 1,
    "WATER>FIRE": 1,
    "LIGHT>SHADOW": 2,
    "SHADOW>LIGHT": 2,
    "FIRE>SHADOW": 0.5,
    "SHADOW>WATER": 0.5,
    "WATER>LIGHT": 0.5,
    "LIGHT>FIRE": 0.5,
    "FIRE>NO_ELEMENT": 0.3,
    "WATER>NO_ELEMENT": 0.3,
    "LIGHT>NO_ELEMENT": 0.3,
    "SHADOW>NO_ELEMENT": 0.3
};


class Calculator {
    constructor(attacker, defender, defendersList = []) {
        this.attacker = attacker;
        this.defender = defender;
        this.damage = {};
    }

    calculate_damage(){
        this.Cdmg();
        this.Edmg();
        this.Pdmg();
        this.dmg();

        return this.damage;
    }

    Cdmg() {
        this.damage.normalCdmgMin = (this.spAttack() + this.attacker.atkBase + (this.attacker.atkEquipMin * this.levelBonus()) + this.attacker.atkSkill + this.attacker.atkIncrease + this.attacker.atkBonus + 15) *
                                    (1 + this.attacker.dmgIncrease + this.attacker.mobDamage);
        this.damage.normalCdmgMax = (this.spAttack() + this.attacker.atkBase + (this.attacker.atkEquipMax * this.levelBonus()) + this.attacker.atkSkill + this.attacker.atkIncrease + this.attacker.atkBonus + 15) *
                                    (1 + this.attacker.dmgIncrease + this.attacker.mobDamage);

        // all possible combinations
        this.damage.softEqCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb);
        this.damage.softEqCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb);
        this.damage.softSkinCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseSkin);
        this.damage.softSkinCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseSkin);
        this.damage.softCostumeCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseCostume);
        this.damage.softCostumeCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseCostume);
        this.damage.softEqSkinCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseSkin);
        this.damage.softEqSkinCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseSkin);
        this.damage.softEqCostumeCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseCostume);
        this.damage.softEqCostumeCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseCostume);
        this.damage.softSkinCostumeCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseSkin + this.attacker.dmgIncreaseCostume);
        this.damage.softSkinCostumeCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseSkin + this.attacker.dmgIncreaseCostume);
        this.damage.softCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseSkin + this.attacker.dmgIncreaseCostume);
        this.damage.softCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb + this.attacker.dmgIncreaseSkin + this.attacker.dmgIncreaseCostume);
    }

    spAttack() {
        let atkSpBonus = 0;
        let eneSpBonus = 0;

        if (this.attacker.atkSp > 0) {
            atkSpBonus = atk_sp_bonus[this.attacker.atkSp - 1];
        }

        if (this.attacker.eneSp > 0) {
            eneSpBonus = en_sp_bonus[this.attacker.eneSp - 1];
        }

        return atkSpBonus + eneSpBonus + this.attacker.atkPP * 10;
    }

    levelBonus() {
        if (this.attacker.atkWeaponUp <= this.defender.armorUp) {
            return 1;
        }
        let upDiff = this.attacker.atkWeaponUp - this.defender.armorUp;
        return 1 + equip_up_bonus[upDiff-1];
    }

    Edmg() {
        this.damage.normalEdmgMin = this._Edmg(this.damage.normalCdmgMin);
        this.damage.normalEdmgMax = this._Edmg(this.damage.normalCdmgMax);

        this.damage.softEqEdmgMin = this._Edmg(this.damage.softEqCdmgMin);
        this.damage.softEqEdmgMax = this._Edmg(this.damage.softEqCdmgMax);
        this.damage.softSkinEdmgMin = this._Edmg(this.damage.softSkinCdmgMin);
        this.damage.softSkinEdmgMax = this._Edmg(this.damage.softSkinCdmgMax);
        this.damage.softCostumeEdmgMin = this._Edmg(this.damage.softCostumeCdmgMin);
        this.damage.softCostumeEdmgMax = this._Edmg(this.damage.softCostumeCdmgMax);
        this.damage.softEqSkinEdmgMin = this._Edmg(this.damage.softEqSkinCdmgMin);
        this.damage.softEqSkinEdmgMax = this._Edmg(this.damage.softEqSkinCdmgMax);
        this.damage.softEqCostumeEdmgMin = this._Edmg(this.damage.softEqCostumeCdmgMin);
        this.damage.softEqCostumeEdmgMax = this._Edmg(this.damage.softEqCostumeCdmgMax);
        this.damage.softSkinCostumeEdmgMin = this._Edmg(this.damage.softSkinCostumeCdmgMin);
        this.damage.softSkinCostumeEdmgMax = this._Edmg(this.damage.softSkinCostumeCdmgMax);
        this.damage.softEdmgMin = this._Edmg(this.damage.softCdmgMin);
        this.damage.softEdmgMax = this._Edmg(this.damage.softCdmgMax);
    }
    
    _Edmg(Cdmg) {
        console.log(Cdmg);
        return ((this.attacker.fairy + this.elementalBonus()) * (Cdmg + 100) + this.attacker.elePropIncrease + this.attacker.atkSkillElement) *
               (1 + this.elementalCounter()) *
               (100 - this.defender.res - this.attacker.resReduction);
    }

    elementalBonus() {
        if (this.attacker.eleSp == 0) {
            return 0;
        }
        return ele_sp_bonus[this.attacker.eleSp - 1] + this.attacker.elePP;
    }

    elementalCounter() {
        if ((this.attacker.type + ">" + this.defender.defType) in type_matchups) {
            return type_matchups[this.attacker.type + ">" + this.defender.defType];
        }
        return 0;
    }

    Pdmg() {
        //without crit
        this.damage.normalPdmgMin = this.damage.normalCdmgMin - this.defender.defEquip;
        this.damage.normalPdmgMax = this.damage.normalCdmgMax - this.defender.defEquip;

        this.damage.softEqPdmgMin = this.damage.softEqCdmgMin - this.defender.defEquip;
        this.damage.softEqPdmgMax = this.damage.softEqCdmgMax - this.defender.defEquip;
        this.damage.softSkinPdmgMin = this.damage.softSkinCdmgMin - this.defender.defEquip;
        this.damage.softSkinPdmgMax = this.damage.softSkinCdmgMax - this.defender.defEquip;
        this.damage.softCostumePdmgMin = this.damage.softCostumeCdmgMin - this.defender.defEquip;
        this.damage.softCostumePdmgMax = this.damage.softCostumeCdmgMax - this.defender.defEquip;
        this.damage.softEqSkinPdmgMin = this.damage.softEqSkinCdmgMin - this.defender.defEquip;
        this.damage.softEqSkinPdmgMax = this.damage.softEqSkinCdmgMax - this.defender.defEquip;
        this.damage.softEqCostumePdmgMin = this.damage.softEqCostumeCdmgMin - this.defender.defEquip;
        this.damage.softEqCostumePdmgMax = this.damage.softEqCostumeCdmgMax - this.defender.defEquip;
        this.damage.softSkinCostumePdmgMin = this.damage.softSkinCostumeCdmgMin - this.defender.defEquip;
        this.damage.softSkinCostumePdmgMax = this.damage.softSkinCostumeCdmgMax - this.defender.defEquip;
        this.damage.softPdmgMin = this.damage.softCdmgMin - this.defender.defEquip;
        this.damage.softPdmgMax = this.damage.softCdmgMax - this.defender.defEquip;

        //with crit
        this.damage.normalPdmgMinCrit = this.damage.normalPdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.normalPdmgMaxCrit = this.damage.normalPdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);

        this.damage.softEqPdmgMinCrit = this.damage.softEqPdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softEqPdmgMaxCrit = this.damage.softEqPdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softSkinPdmgMinCrit = this.damage.softSkinPdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softSkinPdmgMaxCrit = this.damage.softSkinPdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softCostumePdmgMinCrit = this.damage.softCostumePdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softCostumePdmgMaxCrit = this.damage.softCostumePdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softEqSkinPdmgMinCrit = this.damage.softEqSkinPdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softEqSkinPdmgMaxCrit = this.damage.softEqSkinPdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softEqCostumePdmgMinCrit = this.damage.softEqCostumePdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softEqCostumePdmgMaxCrit = this.damage.softEqCostumePdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softSkinCostumePdmgMinCrit = this.damage.softSkinCostumePdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softSkinCostumePdmgMaxCrit = this.damage.softSkinCostumePdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softPdmgMinCrit = this.damage.softPdmgMin * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
        this.damage.softPdmgMaxCrit = this.damage.softPdmgMax * (1 + this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction);
    }

    spCritDmg() {
        return crit_dmg_sp[this.attacker.atkSp - 1];
    }

    dmg(){
        let Sdmg = (1 + this.attacker.atkHat + this.attacker.atkFairy + this.attacker.atkTitle + this.attacker.atkOil + this.attacker.atkPot 
            + this.attacker.atkPet + this.attacker.dmgIncreaseTattoo + this.attacker.dmgIncreaseRune + this.attacker.atkCostume)

        this.damage.normalDmgMinNormal = (this.damage.normalPdmgMin + this.damage.normalEdmgMin) * Sdmg;
        this.damage.normalDmgMaxNormal = (this.damage.normalPdmgMax + this.damage.normalEdmgMax) * Sdmg;
        this.damage.normalDmgMinNormalCrit = this.damage.normalDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.normalDmgMaxNormalCrit = this.damage.normalDmgMaxNormal * this.attacker.critDmgTattoo;

        //soft
        this.damage.softEqDmgMinNormal = (this.damage.softEqPdmgMin + this.damage.softEqEdmgMin) * Sdmg;
        this.damage.softEqDmgMaxNormal = (this.damage.softEqPdmgMax + this.damage.softEqEdmgMax) * Sdmg;
        this.damage.softEqDmgMinNormalCrit = this.damage.softEqDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softEqDmgMaxNormalCrit = this.damage.softEqDmgMaxNormal * this.attacker.critDmgTattoo;

        this.damage.softSkinDmgMinNormal = (this.damage.softSkinPdmgMin + this.damage.softSkinEdmgMin) * Sdmg;
        this.damage.softSkinDmgMaxNormal = (this.damage.softSkinPdmgMax + this.damage.softSkinEdmgMax) * Sdmg;
        this.damage.softSkinDmgMinNormalCrit = this.damage.softSkinDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softSkinDmgMaxNormalCrit = this.damage.softSkinDmgMaxNormal * this.attacker.critDmgTattoo;
        
        this.damage.softCostumeDmgMinNormal = (this.damage.softCostumePdmgMin + this.damage.softCostumeEdmgMin) * Sdmg;
        this.damage.softCostumeDmgMaxNormal = (this.damage.softCostumePdmgMax + this.damage.softCostumeEdmgMax) * Sdmg;
        this.damage.softCostumeDmgMinNormalCrit = this.damage.softCostumeDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softCostumeDmgMaxNormalCrit = this.damage.softCostumeDmgMaxNormal * this.attacker.critDmgTattoo;

        this.damage.softEqSkinDmgMinNormal = (this.damage.softEqSkinPdmgMin + this.damage.softEqSkinEdmgMin) * Sdmg;
        this.damage.softEqSkinDmgMaxNormal = (this.damage.softEqSkinPdmgMax + this.damage.softEqSkinEdmgMax) * Sdmg;
        this.damage.softEqSkinDmgMinNormalCrit = this.damage.softEqSkinDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softEqSkinDmgMaxNormalCrit = this.damage.softEqSkinDmgMaxNormal * this.attacker.critDmgTattoo;

        this.damage.softEqCostumeDmgMinNormal = (this.damage.softEqCostumePdmgMin + this.damage.softEqCostumeEdmgMin) * Sdmg;
        this.damage.softEqCostumeDmgMaxNormal = (this.damage.softEqCostumePdmgMax + this.damage.softEqCostumeEdmgMax) * Sdmg;
        this.damage.softEqCostumeDmgMinNormalCrit = this.damage.softEqCostumeDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softEqCostumeDmgMaxNormalCrit = this.damage.softEqCostumeDmgMaxNormal * this.attacker.critDmgTattoo;

        this.damage.softSkinCostumeDmgMinNormal = (this.damage.softSkinCostumePdmgMin + this.damage.softSkinCostumeEdmgMin) * Sdmg;
        this.damage.softSkinCostumeDmgMaxNormal = (this.damage.softSkinCostumePdmgMax + this.damage.softSkinCostumeEdmgMax) * Sdmg;
        this.damage.softSkinCostumeDmgMinNormalCrit = this.damage.softSkinCostumeDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softSkinCostumeDmgMaxNormalCrit = this.damage.softSkinCostumeDmgMaxNormal * this.attacker.critDmgTattoo;

        this.damage.softDmgMinNormal = (this.damage.softPdmgMin + this.damage.softEdmgMin) * Sdmg;
        this.damage.softDmgMaxNormal = (this.damage.softPdmgMax + this.damage.softEdmgMax) * Sdmg;
        this.damage.softDmgMinNormalCrit = this.damage.softDmgMinNormal * this.attacker.critDmgTattoo;
        this.damage.softDmgMaxNormalCrit = this.damage.softDmgMaxNormal * this.attacker.critDmgTattoo;
    }

}




function calculateDamage() {
    const attacker = {};
    const box1Elements = document.querySelector('.box1').querySelectorAll('input, select');
    const box2Elements = document.querySelector('.box2').querySelectorAll('input, select');
    const box3Elements = document.querySelector('.box3').querySelectorAll('input, select');

    [box1Elements, box2Elements, box3Elements].forEach(boxElements => {
        boxElements.forEach(element => {
            const id = element.id;
            let value;
            
            if (element.type === 'checkbox') {
                value = element.checked;
            } else if (element.type === 'number' || element.tagName === 'SELECT') {
                value = parseFloat(element.value);
                if (isNaN(value)) {
                    value = element.value; // Keep as string if not a valid number
                }
            } else {
                value = element.value;
            }
            
            attacker[id] = value;
        });
    });


    const defender = {};
    const box4Elements = document.querySelector('.box4').querySelectorAll('input, select');
    
    box4Elements.forEach(element => {
        const id = element.id;
        let value;
        
        if (element.type === 'checkbox') {
            value = element.checked;
        } else if (element.type === 'number' || element.tagName === 'SELECT') {
            value = parseFloat(element.value);
            if (isNaN(value)) {
                value = element.value; // Keep as string if not a valid number
            }
        } else {
            value = element.value;
        }
        
        defender[id] = value;
    });
    console.log(attacker);
    console.log(defender);
    // Instantiate the Calculator
    const calc = new Calculator(attacker, defender);

    // Calculate damage using the class method
    const damage = calc.calculate_damage();
    console.log(damage);
    // Display the result
    document.getElementById('result').innerHTML = `Damage Min without crits: ${damage.normalDmgMinNormal} <br>
                                                   Damage Max without crits: ${damage.normalDmgMaxNormal} <br>
                                                   Possible Max Soft Crit: ${damage.softDmgMaxNormalCrit} <br>
                                                   <br>
                                                   Other possible damage combinations: <br>
                                                   Normal Crit Damage Min: ${damage.normalDmgMinNormalCrit} <br>
                                                   Normal Crit Damage Max: ${damage.normalDmgMaxNormalCrit} <br>
                                                   Soft EQ Damage Min: ${damage.softEqDmgMinNormal} <br>
                                                   Soft EQ Damage Max: ${damage.softEqDmgMaxNormal} <br>
                                                   Soft EQ Crit Damage Min: ${damage.softEqDmgMinNormalCrit} <br>
                                                   Soft EQ Crit Damage Max: ${damage.softEqDmgMaxNormalCrit} <br>
                                                   Soft Skin Damage Min: ${damage.softSkinDmgMinNormal} <br>
                                                   Soft Skin Damage Max: ${damage.softSkinDmgMaxNormal} <br>
                                                   Soft Skin Crit Damage Min: ${damage.softSkinDmgMinNormalCrit} <br>
                                                   Soft Skin Crit Damage Max: ${damage.softSkinDmgMaxNormalCrit} <br>
                                                   Soft Costume Damage Min: ${damage.softCostumeDmgMinNormal} <br>
                                                   Soft Costume Damage Max: ${damage.softCostumeDmgMaxNormal} <br>
                                                   Soft Costume Crit Damage Min: ${damage.softCostumeDmgMinNormalCrit} <br>
                                                   Soft Costume Crit Damage Max: ${damage.softCostumeDmgMaxNormalCrit} <br>
                                                   Soft EQ+Skin Damage Min: ${damage.softEqSkinDmgMinNormal} <br>
                                                   Soft EQ+Skin Damage Max: ${damage.softEqSkinDmgMaxNormal} <br>
                                                   Soft EQ+Skin Crit Damage Min: ${damage.softEqSkinDmgMinNormalCrit} <br>
                                                   Soft EQ+Skin Crit Damage Max: ${damage.softEqSkinDmgMaxNormalCrit} <br>
                                                   Soft EQ+Costume Damage Min: ${damage.softEqCostumeDmgMinNormal} <br>
                                                   Soft EQ+Costume Damage Max: ${damage.softEqCostumeDmgMaxNormal} <br>
                                                   Soft EQ+Costume Crit Damage Min: ${damage.softEqCostumeDmgMinNormalCrit} <br>
                                                   Soft EQ+Costume Crit Damage Max: ${damage.softEqCostumeDmgMaxNormalCrit} <br>
                                                   Soft Skin+Costume Damage Min: ${damage.softSkinCostumeDmgMinNormal} <br>
                                                   Soft Skin+Costume Damage Max: ${damage.softSkinCostumeDmgMaxNormal} <br>
                                                   Soft Skin+Costume Crit Damage Min: ${damage.softSkinCostumeDmgMinNormalCrit} <br>
                                                   Soft Skin+Costume Crit Damage Max: ${damage.softSkinCostumeDmgMaxNormalCrit} <br>
                                                   Soft All Damage Min: ${damage.softDmgMinNormal} <br>
                                                   Soft All Damage Max: ${damage.softDmgMaxNormal} <br>
                                                   Soft All Crit Damage Min: ${damage.softDmgMinNormalCrit} <br>
                                                   Soft All Crit Damage Max: ${damage.softDmgMaxNormalCrit} <br>
                                                   `;
}