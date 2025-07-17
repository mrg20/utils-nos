// Parses damage text and returns structured data similar to the updated Python version
function parseDamageText(text, probCritInput) {
  const keyPattern = /((?:\d{1,3}(?: \d{3})+)) ~ ((?:\d{1,3}(?: \d{3})+))/g;
  let matches = [...text.matchAll(keyPattern)];
  let entries = {};
  let skin_prob = "", weapon_prob = "", reduc_prob = "";

  for (let i = 0; i < matches.length; i++) {
    let minVal = matches[i][1].trim().replace(/ /g, "");
    let maxVal = matches[i][2].trim().replace(/ /g, "");
    let key = `${minVal} ~ ${maxVal}`;
    let start = matches[i].index + matches[i][0].length;
    let end = (i + 1 < matches.length) ? matches[i + 1].index : text.length;
    let content = text.slice(start, end);
    let weapon_prob_matches = [...content.matchAll(/una probabilidad del (\d{1,3}) ?% de aumentar el poder de ataque/g)];
    let skin_prob_matches = [...content.matchAll(/una probabilidad de un (\d{1,3}) ?% de que el daño aumente/g)];
    let reducMatch = content.match(/disminuye en \d{1,3}% con una probabilidad del (\d{1,3})%/);
    let weapon_prob_val = weapon_prob_matches.length > 0 ? weapon_prob_matches[weapon_prob_matches.length - 1][1] : "";
    let skin_prob_val = skin_prob_matches.length > 0 ? skin_prob_matches[skin_prob_matches.length - 1][1] : "";
    let reduc_val = reducMatch ? reducMatch[1] : "";
    if (weapon_prob_val) weapon_prob = weapon_prob_val;
    if (skin_prob_val) skin_prob = skin_prob_val;
    if (reduc_val) reduc_prob = reduc_val;
    entries[key] = {
      min: minVal,
      max: maxVal,
      mean: (parseFloat(minVal) + parseFloat(maxVal)) / 2,
      weapon_prob: weapon_prob_val,
      skin_prob: skin_prob_val,
      reduc: reduc_val,
      crit: content.includes("Crítico")
    };
  }

  let probCrit = (typeof probCritInput === 'string' ? parseFloat(probCritInput) : probCritInput) / 100;
  let probSkinCostume = skin_prob ? parseFloat(skin_prob) / 100 : 0;
  let probEq = weapon_prob ? parseFloat(weapon_prob) / 100 : 0;
  let probReduc = reduc_prob ? parseFloat(reduc_prob) / 100 : 0;

  // All probability combinations
  let probAll = probEq * probSkinCostume * probReduc;
  let probAllCrit = probAll * probCrit;
  let probNone = (1 - probEq) * (1 - probSkinCostume) * (1 - probReduc) * (1 - probCrit);
  let probNoneCrit = (1 - probEq) * (1 - probSkinCostume) * (1 - probReduc) * probCrit;
  let probEqCrit = probEq * probCrit * (1 - probSkinCostume) * (1 - probReduc);
  let probSkinCostumeCrit = probSkinCostume * probCrit * (1 - probEq) * (1 - probReduc);
  let probReducCrit = probReduc * probCrit * (1 - probEq) * (1 - probSkinCostume);
  let probEqReduc = probEq * probReduc * (1 - probSkinCostume) * (1 - probCrit);
  let probEqReducCrit = probEq * probReduc * probCrit * (1 - probSkinCostume);
  let probSkinReduc = probSkinCostume * probReduc * (1 - probEq) * (1 - probCrit);
  let probSkinReducCrit = probSkinCostume * probReduc * probCrit * (1 - probEq);
  let probEqSkinReduc = probEq * probSkinCostume * probReduc * (1 - probCrit);
  let probEqSkinReducCrit = probEq * probSkinCostume * probReduc * probCrit;
  let probEqSkin = probEq * probSkinCostume * (1 - probReduc) * (1 - probCrit);
  let probEqSkinCrit = probEq * probSkinCostume * probCrit * (1 - probReduc);

  let weightSum = probNone +
    probNoneCrit +
    probEqCrit +
    probSkinCostumeCrit +
    probReducCrit +
    probEqReduc +
    probEqReducCrit +
    probSkinReduc +
    probSkinReducCrit +
    probEqSkinReduc +
    probEqSkinReducCrit +
    probEqSkin +
    probEqSkinCrit;

  // Weighted average calculation
  let weightDmg = 0;
  for (const key in entries) {
    const e = entries[key];
    const mean = e.mean;
    const hasWeapon = e.weapon_prob !== "";
    const hasSkin = e.skin_prob !== "";
    const hasReduc = e.reduc !== "";
    const isCrit = !!e.crit;
    // Determine which probability applies
    if (!hasWeapon && !hasSkin && !hasReduc && !isCrit) weightDmg += mean * probNone;
    else if (!hasWeapon && !hasSkin && !hasReduc && isCrit) weightDmg += mean * probNoneCrit;
    else if (hasWeapon && !hasSkin && !hasReduc && !isCrit) weightDmg += mean * probEq;
    else if (hasWeapon && !hasSkin && !hasReduc && isCrit) weightDmg += mean * probEqCrit;
    else if (hasWeapon && hasSkin && !hasReduc && !isCrit) weightDmg += mean * probEqSkin;
    else if (hasWeapon && hasSkin && !hasReduc && isCrit) weightDmg += mean * probEqSkinCrit;
    else if (hasWeapon && !hasSkin && hasReduc && !isCrit) weightDmg += mean * probEqReduc;
    else if (hasWeapon && !hasSkin && hasReduc && isCrit) weightDmg += mean * probEqReducCrit;
    else if (hasWeapon && hasSkin && hasReduc && !isCrit) weightDmg += mean * probEqSkinReduc;
    else if (hasWeapon && hasSkin && hasReduc && isCrit) weightDmg += mean * probEqSkinReducCrit;
    else if (!hasWeapon && hasSkin && !hasReduc && !isCrit) weightDmg += mean * probSkinCostume;
    else if (!hasWeapon && hasSkin && !hasReduc && isCrit) weightDmg += mean * probSkinCostumeCrit;
    else if (!hasWeapon && hasSkin && hasReduc && !isCrit) weightDmg += mean * probSkinReduc;
    else if (!hasWeapon && hasSkin && hasReduc && isCrit) weightDmg += mean * probSkinReducCrit;
    else if (!hasWeapon && !hasSkin && hasReduc && !isCrit) weightDmg += mean * probReduc;
    else if (!hasWeapon && !hasSkin && hasReduc && isCrit) weightDmg += mean * probReducCrit;
  }
  let weightedAverage = weightSum > 0 ? weightDmg / weightSum : 0;
  return weightedAverage;
}

window.parseDamageText = parseDamageText;
