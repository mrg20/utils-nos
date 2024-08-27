
const equip_up_bonus = [0, 0.1, 0.15, 0.22, 0.32, 0.43, 0.54, 0.65, 0.9, 1.2, 2];
const sp_up_bonus = [0, 5, 10, 15, 20, 28, 36, 46, 56, 68, 80, 95, 110, 128, 148, 173];

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

function elemental_bonus(matchup) {
    return type_matchups[matchup] || 0;
}

const Element = {
    NO_ELEMENT: 0,
    LIGHT: 1,
    SHADOW: 2,
    WATER: 3,
    FIRE: 4
};

const DamageType = {
    ALL: 0,
    NORMAL: 1,
    SOFT: 2,
    CRIT: 3,
    SOFTCRIT: 4
};

const MobType = {
    NONE: 0,
    LOW_SOCIETY: 1,
    EVIL: 2,
    UNDEAD: 3,
    PLANT: 4,
    LARGE: 5,
    ANIMAL: 6
};



class Calculator {
    constructor(attacker, defender, defendersList = []) {
        this.attacker = attacker;
        this.defender = defender;
        this.defendersList = defendersList;
    }

    _atk_tot(atk_eq, soft = false) {
        const up = Math.min(Math.max(this.attacker.weapon_up - this.defender.armor_up, 0), 10);
        
        const atk_char = (
            (atk_eq * (1 + equip_up_bonus[up])
            + this.attacker.atk_base
            + this.attacker.atk_effects
            + this.attacker.atk_sp()
            + this.attacker.dmg_enhanced)
        );

        let mob_type_dmg = 0;

        switch (this.defender.mob_type) {
            case 'LOW_SOCIETY':
                mob_type_dmg = this.attacker.dmg_increase_low_society;
                break;
            case 'EVIL':
                mob_type_dmg = this.attacker.dmg_increase_evil;
                break;
            case 'UNDEAD':
                mob_type_dmg = this.attacker.dmg_increase_undead;
                break;
            case 'PLANT':
                mob_type_dmg = this.attacker.dmg_increase_plant;
                break;
            case 'LARGE':
                mob_type_dmg = this.attacker.dmg_increase_large;
                break;
            case 'ANIMAL':
                mob_type_dmg = this.attacker.dmg_increase_animal;
                break;
            default:
                mob_type_dmg = 0;
        }
        

        return (
            (atk_char + this.attacker.atk_skill + 15)
            * (1 + (this.attacker.dmg_increase_s + mob_type_dmg) / 100)
            * (1 + this.attacker.dmg_increase_eq / 100 * (soft ? 1 : 0))
        );
    }


    _def_tot() {
        const up = Math.min(Math.max(this.defender.armor_up - this.attacker.weapon_up, 0), 10);

        const def_char = (
            (this.defender.def_equip * (1 + equip_up_bonus[up]))
            + this.defender.def_enhanced
        );
        
        return (
            (def_char + this.defender.def_skill)
        );
    }

    _atk_ele_tot(atk_eq, soft = false) {
        const atk_ele = (
            (this._atk_tot(atk_eq, soft) + 100)
            * (this.attacker.fairy + this.attacker.ele_sp) / 100
        );

        return (
            atk_ele
            + this.attacker.ele_skill
            + this.attacker.ele_effects
            + this.attacker.ele_prop_increase
        );
    }

    _physical_damage(atk_eq, crit = false, soft = false) {
        let dmg = (
            (this._atk_tot(atk_eq, soft) - this._def_tot())
            * (1 + (this.attacker.atk_oil ? 0.05 : 0))
        );
        
        if (crit) {
            dmg *= (
                1 + this.attacker.crit_dmg / 100
                - this.defender.crit_dmg_reduction / 100
            );
        }

        return dmg;
    }

    _elemental_damage(atk_eq, soft = false) {

        const attacker_type = this.attacker.type; // Assuming type is a string, like "FIRE"
        const defender_type = this.defender.type; // Assuming type is a string, like "WATER"
        const matchup = `${Element[attacker_type]}>${Element[defender_type]}`;

        const res = (
            this.defender.res
            - this.attacker.res_reduction
        );

        return (
            this._atk_ele_tot(atk_eq, soft)
            * (1 + elemental_bonus(matchup))
            * (1 - res / 100)
        );
    }


    _final_damage(atk_eq, crit = false, soft = false, no_ele = false, is_min = false, max_crit_dmg = 0) {
        const morale = this.attacker.morale - this.defender.morale;

        const elemental_damage = no_ele ? 0 : this._elemental_damage(atk_eq, soft);
        let physical_damage = this._physical_damage(atk_eq, crit, soft);
        
        if (crit && is_min) {
            physical_damage = (physical_damage + max_crit_dmg) / 2;
        }

        let dmg = (
            morale
            + physical_damage
            + elemental_damage
            + this.attacker.mob_damage
        );

        dmg *= (
            (1 - this.defender.magic_dmg_reduction / 100)
            * (1 + (this.attacker.atk_hat
                + this.attacker.atk_pet
                + (this.attacker.atk_pot ? 20 : 0)) / 100)
        );

        return dmg;
    }

    damage(crit = false, soft = false, no_ele = false, average = false) {
        if (this.attacker.type === Element.NO_ELEMENT) {
            no_ele = true;
        }

        let dmg_max = this._final_damage(
            this.attacker.atk_equip_max,
            crit,
            soft,
            no_ele
        );
        
        let max_crit_dmg = 0;
        if (crit) {
            max_crit_dmg = this._physical_damage(
                this.attacker.atk_equip_max,
                crit,
                soft
            );
        }

        let dmg_min = this._final_damage(
            this.attacker.atk_equip_min,
            crit,
            soft,
            no_ele,
            true,
            max_crit_dmg
        );
        
        dmg_min = Math.max(dmg_min, 1);
        dmg_max = Math.max(dmg_max, 5);

        if (average) {
            return (dmg_min + dmg_max) / 2;
        }
        return [Math.floor(dmg_min), Math.floor(dmg_max)];
    }


    average_damage() {
        const soft = this.attacker.dmg_increase_eq_prob / 100;
        const crit = this.attacker.crit_prob() / 100;
        const soft_crit = (soft * crit) / 100;
        const normal = 1 - soft - crit - soft_crit;

        return Math.floor(
            this.damage(true) * normal +
            this.damage(true, true) * soft +
            this.damage(true, false, true) * crit +
            this.damage(true, true, true) * soft_crit
        );
    }

    swap_attacker_defender() {
        const tmp = this.attacker;
        this.attacker = this.defender;
        this.defender = tmp;
    }

    damage_multiple_defenders(defendersList = null) {
        if (defendersList) {
            this.defendersList = defendersList;
        }

        if (this.defendersList.length === 0) {
            this.defendersList.push(this.defender);
        }

        const tmp = this.defender;
        const dmg = this.defendersList.map(defender => {
            this.defender = defender;
            return this.average_damage();
        });

        this.defender = tmp;
        return dmg.reduce((a, b) => a + b, 0) / dmg.length;
    }
}




function calculateDamage() {
    const attacker = {
        weapon_up: parseInt(document.getElementById('atkWeaponUp').value),
        atk_base: parseFloat(document.getElementById('atkBase').value),
        atk_effects: parseFloat(document.getElementById('atkEffects').value),
        atk_sp: function() { return parseFloat(document.getElementById('atkSp').value); },
        dmg_enhanced: parseFloat(document.getElementById('dmgEnhanced').value),
        dmg_increase_low_society: parseFloat(document.getElementById('dmgIncreaseLowSociety').value),
        dmg_increase_evil: parseFloat(document.getElementById('dmgIncreaseEvil').value),
        dmg_increase_undead: parseFloat(document.getElementById('dmgIncreaseUndead').value),
        dmg_increase_plant: parseFloat(document.getElementById('dmgIncreasePlant').value),
        dmg_increase_large: parseFloat(document.getElementById('dmgIncreaseLarge').value),
        dmg_increase_animal: parseFloat(document.getElementById('dmgIncreaseAnimal').value),
        atk_skill: parseFloat(document.getElementById('atkSkill').value),
        dmg_increase_s: parseFloat(document.getElementById('dmgIncreaseS').value),
        dmg_increase_eq: parseFloat(document.getElementById('dmgIncreaseEq').value),
        fairy: parseFloat(document.getElementById('fairy').value),
        ele_sp: parseFloat(document.getElementById('eleSp').value),
        ele_skill: parseFloat(document.getElementById('eleSkill').value),
        ele_effects: parseFloat(document.getElementById('eleEffects').value),
        ele_prop_increase: parseFloat(document.getElementById('elePropIncrease').value),
        atk_oil: document.getElementById('atkOil').checked,
        crit_dmg: document.getElementById('critDmg').value,
        res_reduction: parseFloat(document.getElementById('resReduction').value),
        morale: document.getElementById('atkLevel').value,
        mob_damage: document.getElementById('mobDamage').value,
        atk_hat: parseFloat(document.getElementById('atkHat').value),
        atk_pet: parseFloat(document.getElementById('atkPet').value),
        atk_pot: document.getElementById('atkPot').checked,
        atk_equip_max: parseFloat(document.getElementById('atkEquipMax').value),
        atk_equip_min: parseFloat(document.getElementById('atkEquipMin').value),
        type: document.getElementById('type').value,
    };


    const defender = {
        armor_up: parseInt(document.getElementById('armorUp').value),
        def_equip: parseFloat(document.getElementById('defEquip').value),
        def_base: parseFloat(document.getElementById('defBase').value),
        def_effects: parseFloat(document.getElementById('defEffects').value),
        def_sp: parseFloat(document.getElementById('defSp').value),
        def_enhanced: parseFloat(document.getElementById('defEnhanced').value),
        def_increase_s: parseFloat(document.getElementById('defIncreaseS').value),
        def_skill: parseFloat(document.getElementById('defSkill').value),
        def_pot: document.getElementById('defPot').checked,
        def_oil: document.getElementById('defOil').checked,
        def_costume: parseFloat(document.getElementById('defCostume').value),
        def_pet: parseFloat(document.getElementById('defPet').value),
        res: parseFloat(document.getElementById('res').value),
        crit_dmg_reduction: parseFloat(document.getElementById('critDmgReduction').value),
        magic_dmg_reduction: parseFloat(document.getElementById('magicDmgReduction').value),
        morale: parseFloat(document.getElementById('mobLevel').value),
        mob_type: parseInt(document.getElementById('mobType').value),
        type: document.getElementById('defType').value
    };

    // Instantiate the Calculator
    const calc = new Calculator(attacker, defender);

    // Calculate damage using the class method
    const [damage_min, damage_max] = calc.damage(crit = true, soft = true);
    
    // Display the result
    document.getElementById('result').innerHTML = `Damage Min: ${damage_min}, Damage Max: ${damage_max}`;
}