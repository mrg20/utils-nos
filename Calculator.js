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
    "SHADOW>NO_ELEMENT": 0.3,
    "NO_ELEMENT>FIRE": 0.3,
    "NO_ELEMENT>WATER": 0.3,
    "NO_ELEMENT>LIGHT": 0.3,
    "NO_ELEMENT>SHADOW": 0.3,
    "NO_ELEMENT>NO_ELEMENT": 0.3
};


export class Calculator {
    constructor(attacker, defender) {
        this.attacker = attacker;
        this.attacker.critProbDebuff = [];
        this.defender = defender;
        this.damage = {};
        this.increaseAtkBuff = 0;
        this.apply_buff();
        this.apply_debuff();
    }

    apply_buff(){
        if (!this.attacker.buffs)
            return
        const buffEffects = {
            'brillo': () => this.attacker.fairy += 5,
            'holly': () => this.attacker.atkWeaponUp += 1,
            'lobo': () => this.attacker.atkIncrease += 396,
            'sader': () => {
                this.attacker.atkWeaponUp += 1;
                this.attacker.playerLevel += 5;
            },
            'sol': () => this.attacker.atkIncrease += 250,
            'forta': () => this.attacker.fairy += 30
        };

        this.attacker.buffs.forEach(buff => {
            if (buffEffects[buff]) {
                buffEffects[buff]();
            }
        });
    }
    
    apply_debuff(){
        if (!this.defender.debuffs)
            return
        const debuffEffects = {
            'aliento': () => {
                this.attacker.critProbDebuff.push(10);
                this.defender.res -= 10;

            },
            'canto': () => this.defender.armorUp -= 2,
            'ele_down_4': () => {
                this.attacker.critProbDebuff.push(30);
                this.defender.res -= 25;
            },
            'ele_down_5': () => {
                this.defender.res -= 5,
                this.defender.armorUp -= 1,
                this.attacker.critProbDebuff.push(15)
            },
            'gas_ulti': () => this.increaseAtkBuff += 15,
            'gas': () => {
                this.defender.armorUp -= 1;
                this.increaseAtkBuff += 15;
            },
            'toxicosis_mejorada': () => {
                this.attacker.critProbDebuff.push(20);
            },
            'last holy': () => this.defender.res -= 5,
            'ruptura': () => this.defender.armorUp -= 5
        };

        this.defender.debuffs.forEach(debuff => {
            if (debuffEffects[debuff]) {
                debuffEffects[debuff]();
            }
        });
    }

    calculate_damage(){
        this.Cdmg();
        this.Edmg();
        this.Pdmg();
        this.dmg();
        this.combineProbabilities();
        this.calculateWeightedAverage();

        return this.damage;
    }

    Cdmg() {
        this.attacker.dmgIncrease = this.attacker.dmgIncrease / 100;
        this.attacker.mobDamage = this.attacker.mobDamage / 100;
        this.damage.normalCdmgMin = (this.spAttack() + this.attacker.atkBase + (this.attacker.atkEquipMin * this.levelBonus()) + this.attacker.atkSkill + this.attacker.atkIncrease + this.attacker.atkBonus + 15) *
                                    (1 + this.attacker.dmgIncrease + this.attacker.mobDamage);
        this.damage.normalCdmgMax = (this.spAttack() + this.attacker.atkBase + (this.attacker.atkEquipMax * this.levelBonus()) + this.attacker.atkSkill + this.attacker.atkIncrease + this.attacker.atkBonus + 15) *
                                    (1 + this.attacker.dmgIncrease + this.attacker.mobDamage);

        // all possible combinations
        this.damage.softEqCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb / 100);
        this.damage.softEqCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb / 100);
        this.damage.softSkinCostumeCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseSkin / 100 + this.attacker.dmgIncreaseCostume / 100);
        this.damage.softSkinCostumeCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseSkin / 100 + this.attacker.dmgIncreaseCostume / 100);
        this.damage.softCdmgMin = this.damage.normalCdmgMin * (1 + this.attacker.dmgIncreaseEqProb / 100) * (1 + this.attacker.dmgIncreaseSkin / 100 + this.attacker.dmgIncreaseCostume / 100);
        this.damage.softCdmgMax = this.damage.normalCdmgMax * (1 + this.attacker.dmgIncreaseEqProb / 100) * (1 + this.attacker.dmgIncreaseSkin / 100 + this.attacker.dmgIncreaseCostume / 100);
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
            return 1 - equip_up_bonus[this.defender.armorUp-this.attacker.atkWeaponUp];
        }
        let upDiff = this.attacker.atkWeaponUp - this.defender.armorUp;
        return 1 + equip_up_bonus[upDiff];
    }

    Edmg() {
        this.damage.normalEdmgMin = this._Edmg(this.damage.normalCdmgMin);
        this.damage.normalEdmgMax = this._Edmg(this.damage.normalCdmgMax);

        this.damage.softEqEdmgMin = this._Edmg(this.damage.softEqCdmgMin);
        this.damage.softEqEdmgMax = this._Edmg(this.damage.softEqCdmgMax);
        this.damage.softSkinCostumeEdmgMin = this._Edmg(this.damage.softSkinCostumeCdmgMin);
        this.damage.softSkinCostumeEdmgMax = this._Edmg(this.damage.softSkinCostumeCdmgMax);
        this.damage.softEdmgMin = this._Edmg(this.damage.softCdmgMin);
        this.damage.softEdmgMax = this._Edmg(this.damage.softCdmgMax);
    }
    
    _Edmg(Cdmg) {
        return ((this.attacker.fairy / 100 + this.elementalBonus() / 100) * (Cdmg + 100) + this.attacker.elePropIncrease + this.attacker.atkSkillElement) *
               (1 + this.elementalCounter()) *
               this.resistance();
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

    resistance() {
        if(this.defender.res - this.attacker.resReduction >= 100){
            return 0;
        }
        return (100 - (this.defender.res - this.attacker.resReduction)) / 100;
    }

    Pdmg() {
        // Calculate base damage values without crit
        const calculateBaseDamage = (cdmg) => {
            return (cdmg - this.defender.defEquip) * (1 + (this.attacker.atkOil/100)) * (1 + (this.increaseAtkBuff/100)) * (1 - (this.defender.dmgReduction/100));
        };

        // Calculate crit damage values
        const calculateCritDamage = (minDmg, maxDmg, critMultiplier) => {
            const avgBonus = (maxDmg - minDmg) / 1.5;
            return {
                min: this.attacker.attackType === "Magic" ? 0 : (minDmg + avgBonus) * critMultiplier * (1 - (this.defender.dmgReduction/100)),
                max: this.attacker.attackType === "Magic" ? 0 : maxDmg * critMultiplier * (1 - (this.defender.dmgReduction/100))
            };
        };

        // Calculate normal damage
        this.damage.normalPdmgMin = calculateBaseDamage(this.damage.normalCdmgMin);
        this.damage.normalPdmgMax = calculateBaseDamage(this.damage.normalCdmgMax);

        // Calculate soft cap variations
        this.damage.softEqPdmgMin = calculateBaseDamage(this.damage.softEqCdmgMin);
        this.damage.softEqPdmgMax = calculateBaseDamage(this.damage.softEqCdmgMax);
        this.damage.softSkinCostumePdmgMin = calculateBaseDamage(this.damage.softSkinCostumeCdmgMin);
        this.damage.softSkinCostumePdmgMax = calculateBaseDamage(this.damage.softSkinCostumeCdmgMax);
        this.damage.softPdmgMin = calculateBaseDamage(this.damage.softCdmgMin);
        this.damage.softPdmgMax = calculateBaseDamage(this.damage.softCdmgMax);

        // Prepare crit multipliers
        this.attacker.critDmg = this.attacker.critDmg / 100;
        this.defender.critDmgReduction = this.defender.critDmgReduction / 100;
        const critMultiplier = 1 + this.appliedCritDmg();

        // Calculate crit damages
        const normalCrit = calculateCritDamage(this.damage.normalPdmgMin, this.damage.normalPdmgMax, critMultiplier);
        const softEqCrit = calculateCritDamage(this.damage.softEqPdmgMin, this.damage.softEqPdmgMax, critMultiplier);
        const softSkinCostumeCrit = calculateCritDamage(this.damage.softSkinCostumePdmgMin, this.damage.softSkinCostumePdmgMax, critMultiplier);
        const softCrit = calculateCritDamage(this.damage.softPdmgMin, this.damage.softPdmgMax, critMultiplier);

        // Assign crit values
        this.damage.normalPdmgMinCrit = normalCrit.min;
        this.damage.normalPdmgMaxCrit = normalCrit.max;
        this.damage.softEqPdmgMinCrit = softEqCrit.min;
        this.damage.softEqPdmgMaxCrit = softEqCrit.max;
        this.damage.softSkinCostumePdmgMinCrit = softSkinCostumeCrit.min;
        this.damage.softSkinCostumePdmgMaxCrit = softSkinCostumeCrit.max;
        this.damage.softPdmgMinCrit = softCrit.min;
        this.damage.softPdmgMaxCrit = softCrit.max;
    }

    appliedCritDmg() {
        let result = this.attacker.critDmg + this.spCritDmg() - this.defender.critDmgReduction;
        return result < 0 ? 0 : result;
    }

    spCritDmg() {
        if (this.attacker.atkSp < 40) {
            return 0;
        }
        return crit_dmg_sp[this.attacker.atkSp - 1] / 100;
    }

    dmg(){
        let morale = this.attacker.playerLevel / this.defender.mobLevel;
        let Sdmg = ((1 + (this.attacker.atkHat/100)) + (this.attacker.atkTitle/100)
        + (this.attacker.atkPot/100)
        + (this.attacker.atkPet/100) 
        + (this.attacker.atkCostume/100) + (this.attacker.dmgIncreaseRune/100))
        * (1 + (this.attacker.atkFairy/100))
        * (1 + ((this.attacker.atkFamily/100) + (this.attacker.atkSkin/100)) + (this.attacker.dmgIncreaseTattoo/100));

        this.attacker.critDmgTattoo = 1 + (this.attacker.critDmgTattoo / 100);

        this.damage.normalDmgMinNormal = (this.damage.normalPdmgMin + this.damage.normalEdmgMin + morale) * Sdmg;
        this.damage.normalDmgMaxNormal = (this.damage.normalPdmgMax + this.damage.normalEdmgMax + morale) * Sdmg;
        this.damage.normalDmgMinCrit = (this.damage.normalPdmgMinCrit + this.damage.normalEdmgMin + morale) * Sdmg;
        this.damage.normalDmgMaxCrit = (this.damage.normalPdmgMaxCrit + this.damage.normalEdmgMax + morale) * Sdmg;
        this.damage.normalDmgMinNormalCrit = this.damage.normalDmgMinCrit * this.attacker.critDmgTattoo;
        this.damage.normalDmgMaxNormalCrit = this.damage.normalDmgMaxCrit * this.attacker.critDmgTattoo;

        //soft
        this.damage.softEqDmgMinNormal = (this.damage.softEqPdmgMin + this.damage.softEqEdmgMin + morale) * Sdmg;
        this.damage.softEqDmgMaxNormal = (this.damage.softEqPdmgMax + this.damage.softEqEdmgMax + morale) * Sdmg;
        this.damage.softEqDmgMinCrit = (this.damage.softEqPdmgMinCrit + this.damage.softEqEdmgMin + morale) * Sdmg;
        this.damage.softEqDmgMaxCrit = (this.damage.softEqPdmgMaxCrit + this.damage.softEqEdmgMax + morale) * Sdmg;
        this.damage.softEqDmgMinNormalCrit = this.damage.softEqDmgMinCrit * this.attacker.critDmgTattoo;
        this.damage.softEqDmgMaxNormalCrit = this.damage.softEqDmgMaxCrit * this.attacker.critDmgTattoo;

        this.damage.softSkinCostumeDmgMinNormal = (this.damage.softSkinCostumePdmgMin + this.damage.softSkinCostumeEdmgMin + morale) * Sdmg;
        this.damage.softSkinCostumeDmgMaxNormal = (this.damage.softSkinCostumePdmgMax + this.damage.softSkinCostumeEdmgMax + morale) * Sdmg;
        this.damage.softSkinCostumeDmgMinCrit = (this.damage.softSkinCostumePdmgMinCrit + this.damage.softSkinCostumeEdmgMin + morale) * Sdmg;
        this.damage.softSkinCostumeDmgMaxCrit = (this.damage.softSkinCostumePdmgMaxCrit + this.damage.softSkinCostumeEdmgMax + morale) * Sdmg;
        this.damage.softSkinCostumeDmgMinNormalCrit = this.damage.softSkinCostumeDmgMinCrit * this.attacker.critDmgTattoo;
        this.damage.softSkinCostumeDmgMaxNormalCrit = this.damage.softSkinCostumeDmgMaxCrit * this.attacker.critDmgTattoo;

        this.damage.softDmgMinNormal = (this.damage.softPdmgMin + this.damage.softEdmgMin + morale) * Sdmg;
        this.damage.softDmgMaxNormal = (this.damage.softPdmgMax + this.damage.softEdmgMax + morale) * Sdmg;
        this.damage.softDmgMinCrit = (this.damage.softPdmgMinCrit + this.damage.softEdmgMin + morale) * Sdmg;
        this.damage.softDmgMaxCrit = (this.damage.softPdmgMaxCrit + this.damage.softEdmgMax + morale) * Sdmg;
        this.damage.softDmgMinNormalCrit = this.damage.softDmgMinCrit * this.attacker.critDmgTattoo;
        this.damage.softDmgMaxNormalCrit = this.damage.softDmgMaxCrit * this.attacker.critDmgTattoo;
    }

    combineProbabilities() {
        // Combine probabilities for equipment, skin, and costume
        const pEq = this.attacker.probAugmentEq / 100;
        const pSkin = this.attacker.probAugmentSkin / 100;
        const pCostume = this.attacker.probAugmentCostume / 100;
        let pCrit = this.attacker.attackType === "Magic" ? 0 : (this.attacker.critProb + this.spCritProb()) / 100;
        if (this.attacker.critProbDebuff.length > 0){
            this.attacker.critProbDebuff.forEach(debuff => {
                pCrit *= (1 + (debuff / 100));
            });
        }

        // Calculate combined probabilities
        // Crits
        this.damage.probNoneCrit = (1 - pEq) * (1 - pSkin) * (1 - pCostume) * pCrit;
        // probs
        this.damage.probNone = (1 - pEq) * (1 - pSkin) * (1 - pCostume) * (1 - pCrit);
        this.damage.probEq = pEq;
        this.damage.probSkinCostume = pSkin + pCostume;
        this.damage.probAll = pEq * this.damage.probSkinCostume;
        // probs and crits
        this.damage.probEqCrit = pEq * pCrit;
        this.damage.probSkinCostumeCrit = (pSkin + pCostume) * pCrit;
        this.damage.probAllCrit = pEq * (pSkin + pCostume) * pCrit;
    }

    spCritProb() {
        if (this.attacker.atkSp < 20) {
            return 0;
        }
        return crit_sp_bonus[this.attacker.atkSp - 1];
    }

    calculateWeightedAverage() {
        let weightDmg = ((this.damage.normalDmgMinNormal + this.damage.normalDmgMaxNormal)/2 * this.damage.probNone) +
            ((this.damage.normalDmgMinNormalCrit + this.damage.normalDmgMaxNormalCrit)/2 * this.damage.probNoneCrit) +
            ((this.damage.softEqDmgMinNormal + this.damage.softEqDmgMaxNormal)/2 * this.damage.probEq) +
            ((this.damage.softEqDmgMinNormalCrit + this.damage.softEqDmgMaxNormalCrit)/2 * this.damage.probEqCrit) +
            ((this.damage.softSkinCostumeDmgMinNormal + this.damage.softSkinCostumeDmgMaxNormal)/2 * this.damage.probSkinCostume) +
            ((this.damage.softSkinCostumeDmgMinNormalCrit + this.damage.softSkinCostumeDmgMaxNormalCrit)/2 * this.damage.probSkinCostumeCrit) +
            ((this.damage.softDmgMinNormal + this.damage.softDmgMaxNormal)/2 * this.damage.probAll) +
            ((this.damage.softDmgMinNormalCrit + this.damage.softDmgMaxNormalCrit)/2 * this.damage.probAllCrit);

        let weightSum = this.damage.probNone + 
        this.damage.probNoneCrit + 
        this.damage.probEq + 
        this.damage.probEqCrit + 
        this.damage.probSkinCostume + 
        this.damage.probSkinCostumeCrit + 
        this.damage.probAll + 
        this.damage.probAllCrit;
        
        this.damage.averageDmg = weightDmg / weightSum;
    }

}