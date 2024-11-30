function toggleBossSettings() {
    const mobType = document.getElementById('mobType').value;
    const bossSettings = document.getElementById('bossSettings');
    const mobSettings = document.getElementById('mobSettings');
    
    if (mobType === 'boss') {
        bossSettings.style.display = 'block';
        mobSettings.style.display = 'none';
    } else {
        bossSettings.style.display = 'none'; 
        mobSettings.style.display = 'block';
    }
}

function toggleContent() {
    var content = document.getElementById("content");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

function showInfo(str) {
    // Create a new div element for the popup
    var popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '1000';
    popup.style.maxWidth = '90%';
    popup.style.maxHeight = '90%';
    popup.style.overflow = 'auto';

    // Create an image element
    var img = document.createElement('img');
    img.src = 'img/' + str + '.png';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '80vh';

    // Add the image to the popup
    popup.appendChild(img);

    // Create a close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.display = 'block';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = function() {
        document.body.removeChild(popup);
    };

    // Add the close button to the popup
    popup.appendChild(closeButton);

    // Add the popup to the body
    document.body.appendChild(popup);
}

function saveInputToLocalStorage(event) {
    var input = event.target;
    localStorage.setItem(input.id, input.value);
}

function loadInputsFromLocalStorage() {
    var inputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
    inputs.forEach(function(input) {
        var savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadInputsFromLocalStorage();
    var inputs = document.querySelectorAll('input[type="number"], input[type="text"], select');
    inputs.forEach(function(input) {
        input.addEventListener('input', saveInputToLocalStorage);
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
    }
});

function loadProfile(profile) {
    profile = window[profile];
    
    Object.keys(profile).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'SELECT') {
                element.value = profile[key];
            } else {
                element.value = profile[key];
            }
        }
    });
}

function sumInfo(id) {
    // Create popup container
    var popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '1000';
    popup.style.maxWidth = '90%';
    popup.style.maxHeight = '90%';
    popup.style.overflow = 'auto';

    // Create content div
    var content = document.createElement('div');
    content.style.marginBottom = '20px';

    // Add input fields based on id
    var total = 0;    
    content.innerHTML = options[id];

    popup.appendChild(content);

    // Add calculate button
    var calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculate Total';
    calculateButton.onclick = function() {
        var inputs = content.querySelectorAll('input');
        total = Array.from(inputs).reduce((sum, input) => sum + Number(input.value), 0);
        resultText.textContent = 'Total: ' + total;
    };
    popup.appendChild(calculateButton);

    // Add result text
    var resultText = document.createElement('div');
    resultText.style.marginTop = '10px';
    popup.appendChild(resultText);

    // Add close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.display = 'block';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = function() {
        document.body.removeChild(popup);
    };
    popup.appendChild(closeButton);

    document.body.appendChild(popup);
    return total;
}

function selectEnemyType(type) {
    document.getElementById('mobType').value = type;
    document.querySelectorAll('.enemy-type-img').forEach(img => {
        img.classList.remove('selected');
    });
    document.getElementById(type + '-img').classList.add('selected');
    toggleBossSettings();
}

wand_profile = {
    "playerLevel": 99,
    "atkBase": 761,
    "attackType": "Magic",
    "atkSkill": 80,
    "atkSkillElement": 100,
    "dmgIncreaseTattoo": 0,
    "critDmgTattoo": 0,
    "atkHat": 8,
    "atkPet": 13,
    "atkPot": 0,
    "atkOil": 0,
    "atkTitle": 5,
    "atkFamily": 10,
    "atkCostume": 15,
    "atkSkin": 0,
    "fairy": 117,
    "atkFairy": 0,
    "type": "LIGHT",
    "atkEquipMin": 1404,
    "atkEquipMax": 1581,
    "atkWeaponUp": 8,
    "dmgIncrease": 19,
    "dmgIncreaseRune": 7,
    "atkBonus": 20,
    "atkIncrease": 50,
    "critProb": 0,
    "critDmg": 0,
    "elePropIncrease": 349,
    "resReduction": 78,
    "mobDamage": 0,
    "dmgIncreaseEqProb": 120,
    "probAugmentEq": 60,
    "dmgIncreaseSkin": 0,
    "probAugmentSkin": 0,
    "dmgIncreaseCostume": 0,
    "probAugmentCostume": 0,
    "atkSp": 63,
    "defSp": 0,
    "eleSp": 99,
    "eneSp": 0,
    "atkPP": 42,
    "defPP": 32,
    "elePP": 23,
    "enePP": 25,
    "mobLevel": 95,
    "armorUp": 7,
    "defEquip": 636,
    "dmgReduction": 0,
    "critDmgReduction": 0,
    "res": 150,
    "defType": "SHADOW"
}

sword_profile = {
    "playerLevel": 99,
    "atkBase": 1500,
    "attackType": "Melee",
    "atkSkill": 200,
    "atkSkillElement": 150,
    "dmgIncreaseTattoo": 10,
    "critDmgTattoo": 15,
    "atkHat": 5,
    "atkPet": 8,
    "atkPot": 100,
    "atkOil": 50,
    "atkTitle": 12,
    "atkFamily": 7,
    "atkCostume": 6,
    "atkSkin": 4,
    "fairy": 10,
    "atkFairy": 9,
    "type": "FIRE",
    "atkEquipMin": 800,
    "atkEquipMax": 1200,
    "atkWeaponUp": 15,
    "dmgIncrease": 25,
    "dmgIncreaseRune": 15,
    "atkBonus": 300,
    "atkIncrease": 20,
    "critProb": 45,
    "critDmg": 180,
    "elePropIncrease": 30,
    "resReduction": 10,
    "mobDamage": 15,
    "dmgIncreaseEqProb": 12,
    "probAugmentEq": 8,
    "dmgIncreaseSkin": 6,
    "probAugmentSkin": 5,
    "dmgIncreaseCostume": 7,
    "probAugmentCostume": 4,
    "atkSp": 10,
    "defSp": 8,
    "eleSp": 9,
    "eneSp": 7,
    "atkPP": 100,
    "defPP": 80,
    "elePP": 90,
    "enePP": 70,
    "mobLevel": 80,
    "armorUp": 15,
    "defEquip": 1000,
    "dmgReduction": 20,
    "critDmgReduction": 15,
    "res": 25,
    "defType": "WATER"
}

bow_profile = {
    "playerLevel": 99,
    "atkBase": 741,
    "attackType": "Distance",
    "atkSkill": 200,
    "atkSkillElement": 180,
    "dmgIncreaseTattoo": 0,
    "critDmgTattoo": 0,
    "atkHat": 10,
    "atkPet": 28,
    "atkPot": 0,
    "atkOil": 0,
    "atkTitle": 23,
    "atkFamily": 10,
    "atkCostume": 15,
    "atkSkin": 0,
    "fairy": 152,
    "atkFairy": 9,
    "type": "SHADOW",
    "atkEquipMin": 1276,
    "atkEquipMax": 1548,
    "atkWeaponUp": 10,
    "dmgIncrease": 13,
    "dmgIncreaseRune": 7,
    "atkBonus": 293,
    "atkIncrease": 160,
    "critProb": 45,
    "critDmg": 341,
    "elePropIncrease": 383,
    "resReduction": 73,
    "mobDamage": 0,
    "dmgIncreaseEqProb": 145,
    "probAugmentEq": 45,
    "dmgIncreaseSkin": 0,
    "probAugmentSkin": 0,
    "dmgIncreaseCostume": 0,
    "probAugmentCostume": 0,
    "atkSp": 120,
    "defSp": 12,
    "eleSp": 93,
    "eneSp": 32,
    "atkPP": 23,
    "defPP": 29,
    "elePP": 17,
    "enePP": 31,
    "mobLevel": 95,
    "armorUp": 7,
    "defEquip": 669,
    "dmgReduction": 0,
    "critDmgReduction": 0,
    "res": 170,
    "defType": "SHADOW"
}

pistol_profile = {
    "playerLevel": 99,
    "atkBase": 1500,
    "attackType": "Distance",
    "atkSkill": 200,
    "atkSkillElement": 150,
    "dmgIncreaseTattoo": 10,
    "critDmgTattoo": 15,
    "atkHat": 5,
    "atkPet": 8,
    "atkPot": 100,
    "atkOil": 50,
    "atkTitle": 12,
    "atkFamily": 7,
    "atkCostume": 6,
    "atkSkin": 4,
    "fairy": 10,
    "atkFairy": 9,
    "type": "FIRE",
    "atkEquipMin": 800,
    "atkEquipMax": 1200,
    "atkWeaponUp": 15,
    "dmgIncrease": 25,
    "dmgIncreaseRune": 15,
    "atkBonus": 300,
    "atkIncrease": 20,
    "critProb": 45,
    "critDmg": 180,
    "elePropIncrease": 30,
    "resReduction": 10,
    "mobDamage": 15,
    "dmgIncreaseEqProb": 12,
    "probAugmentEq": 8,
    "dmgIncreaseSkin": 6,
    "probAugmentSkin": 5,
    "dmgIncreaseCostume": 7,
    "probAugmentCostume": 4,
    "atkSp": 10,
    "defSp": 8,
    "eleSp": 9,
    "eneSp": 7,
    "atkPP": 100,
    "defPP": 80,
    "elePP": 90,
    "enePP": 70,
    "mobLevel": 80,
    "armorUp": 15,
    "defEquip": 1000,
    "dmgReduction": 20,
    "critDmgReduction": 15,
    "res": 25,
    "defType": "WATER"
}

crossbow_profile = {
    "playerLevel": 99,
    "atkBase": 1500,
    "attackType": "Distance",
    "atkSkill": 200,
    "atkSkillElement": 150,
    "dmgIncreaseTattoo": 10,
    "critDmgTattoo": 15,
    "atkHat": 5,
    "atkPet": 8,
    "atkPot": 100,
    "atkOil": 50,
    "atkTitle": 12,
    "atkFamily": 7,
    "atkCostume": 6,
    "atkSkin": 4,
    "fairy": 10,
    "atkFairy": 9,
    "type": "FIRE",
    "atkEquipMin": 800,
    "atkEquipMax": 1200,
    "atkWeaponUp": 15,
    "dmgIncrease": 25,
    "dmgIncreaseRune": 15,
    "atkBonus": 300,
    "atkIncrease": 20,
    "critProb": 45,
    "critDmg": 180,
    "elePropIncrease": 30,
    "resReduction": 10,
    "mobDamage": 15,
    "dmgIncreaseEqProb": 12,
    "probAugmentEq": 8,
    "dmgIncreaseSkin": 6,
    "probAugmentSkin": 5,
    "dmgIncreaseCostume": 7,
    "probAugmentCostume": 4,
    "atkSp": 10,
    "defSp": 8,
    "eleSp": 9,
    "eneSp": 7,
    "atkPP": 100,
    "defPP": 80,
    "elePP": 90,
    "enePP": 70,
    "mobLevel": 80,
    "armorUp": 15,
    "defEquip": 1000,
    "dmgReduction": 20,
    "critDmgReduction": 15,
    "res": 25,
    "defType": "WATER"
}

dagger_profile = {
    "playerLevel": 99,
    "atkBase": 537,
    "attackType": "Melee",
    "atkSkill": 105,
    "atkSkillElement": 110,
    "dmgIncreaseTattoo": 0,
    "critDmgTattoo": 0,
    "atkHat": 10,
    "atkPet": 0,
    "atkPot": 0,
    "atkOil": 0,
    "atkTitle": 18,
    "atkFamily": 10,
    "atkCostume": 12,
    "atkSkin": 0,
    "fairy": 164,
    "atkFairy": 0,
    "type": "LIGHT",
    "atkEquipMin": 1068,
    "atkEquipMax": 1228,
    "atkWeaponUp": 9,
    "dmgIncrease": 18,
    "dmgIncreaseRune": 13,
    "atkBonus": 91,
    "atkIncrease": 540,
    "critProb": 39,
    "critDmg": 506,
    "elePropIncrease": 343,
    "resReduction": 73,
    "mobDamage": 0,
    "dmgIncreaseEqProb": 145,
    "probAugmentEq": 45,
    "dmgIncreaseSkin": 10,
    "probAugmentSkin": 30,
    "dmgIncreaseCostume": 30,
    "probAugmentCostume": 10,
    "atkSp": 110,
    "defSp": 0,
    "eleSp": 90,
    "eneSp": 0,
    "atkPP": 43,
    "defPP": 40,
    "elePP": 29,
    "enePP": 18,
    "mobLevel": 100,
    "armorUp": 10,
    "defEquip": 1810,
    "dmgReduction": 78,
    "critDmgReduction": 115,
    "res": 150,
    "defType": "NO_ELEMENT"
}

gauntlet_profile = {
    "playerLevel": 99,
    "atkBase": 507,
    "attackType": "Melee",
    "atkSkill": 150,
    "atkSkillElement": 100,
    "dmgIncreaseTattoo": 0,
    "critDmgTattoo": 0,
    "atkHat": 10,
    "atkPet": 25,
    "atkPot": 0,
    "atkOil": 0,
    "atkTitle": 22,
    "atkFamily": 10,
    "atkCostume": 15,
    "atkSkin": 0,
    "fairy": 142,
    "atkFairy": 5,
    "type": "SHADOW",
    "atkEquipMin": 1383,
    "atkEquipMax": 1519,
    "atkWeaponUp": 8,
    "dmgIncrease": 17,
    "dmgIncreaseRune": 13,
    "atkBonus": 444,
    "atkIncrease": 50,
    "critProb": 33,
    "critDmg": 320,
    "elePropIncrease": 246,
    "resReduction": 73,
    "mobDamage": 9,
    "dmgIncreaseEqProb": 120,
    "probAugmentEq": 55,
    "dmgIncreaseSkin": 0,
    "probAugmentSkin": 0,
    "dmgIncreaseCostume": 0,
    "probAugmentCostume": 0,
    "atkSp": 120,
    "defSp": 12,
    "eleSp": 78,
    "eneSp": 11,
    "atkPP": 35,
    "defPP": 29,
    "elePP": 39,
    "enePP": 31,
    "mobLevel": 95,
    "armorUp": 7,
    "defEquip": 548,
    "dmgReduction": 0,
    "critDmgReduction": 0,
    "res": 170,
    "defType": "SHADOW"
}