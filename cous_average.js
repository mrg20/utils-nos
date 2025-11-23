document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const dataInput = document.getElementById('data-input');
    const critChanceInput = document.getElementById('crit-chance');
    const resultCard = document.getElementById('result-card');
    const resultValue = document.getElementById('result-value');
    const errorMessage = document.getElementById('error-message');

    calculateBtn.addEventListener('click', calculateAverage);

    // Modal Logic
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeHelp = document.getElementById('close-help');
    const helpImgThumb = document.getElementById('help-img-thumb');
    const imgModal = document.getElementById('img-modal');
    const closeImgModal = document.getElementById('close-img-modal');

    if (helpBtn && helpModal && closeHelp) {
        helpBtn.addEventListener('click', () => {
            helpModal.classList.remove('hidden');
        });

        closeHelp.addEventListener('click', () => {
            helpModal.classList.add('hidden');
        });

        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.classList.add('hidden');
            }
        });
    }

    if (helpImgThumb && imgModal && closeImgModal) {
        // Use parent element (image-container) for click
        helpImgThumb.parentElement.addEventListener('click', () => {
            imgModal.classList.remove('hidden');
        });

        closeImgModal.addEventListener('click', () => {
            imgModal.classList.add('hidden');
        });

        imgModal.addEventListener('click', (e) => {
            if (e.target === imgModal || e.target.classList.contains('modal-image')) {
                imgModal.classList.add('hidden');
            }
        });
    }

    function calculateAverage() {
        // Reset UI
        resultCard.classList.add('hidden');
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        const text = dataInput.value.trim();
        if (!text) {
            showError('Please paste the data string first.');
            return;
        }

        try {
            const blocks = parseBlocks(text);
            if (blocks.length === 0) {
                showError('No valid data blocks found. Please check the input format.');
                return;
            }

            const userCritChance = critChanceInput.value === '' ? 0 : parseFloat(critChanceInput.value);
            if (isNaN(userCritChance) || userCritChance < 0 || userCritChance > 100) {
                showError('Please enter a valid Critical Hit Probability (0-100).');
                return;
            }

            const average = computeWeightedAverage(blocks, userCritChance);

            // Display result formatted nicely
            resultValue.textContent = formatNumber(average);
            resultCard.classList.remove('hidden');

        } catch (e) {
            console.error(e);
            showError('An error occurred during calculation: ' + e.message);
        }
    }

    function parseBlocks(text) {
        const lines = text.split(/\r?\n/);
        const blocks = [];
        let currentBlock = null;

        // Regex for damage range: "1 234 ~ 5 678"
        // Allow spaces inside numbers, but ensure it looks like N ~ M
        const damageRegex = /^[\d\s]+~[\d\s]+$/;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (damageRegex.test(line)) {
                // Start new block
                if (currentBlock) {
                    blocks.push(currentBlock);
                }

                const parts = line.split('~');
                const min = parseFloat(parts[0].replace(/\s/g, ''));
                const max = parseFloat(parts[1].replace(/\s/g, ''));

                currentBlock = {
                    min: min,
                    max: max,
                    avg: (min + max) / 2,
                    effects: []
                };
            } else if (currentBlock) {
                // Add description line if it looks like an effect
                // Ignore "-"
                if (line === '-') continue;

                // Heuristic: Effect lines usually contain "%"
                // But let's be permissive and include any non-header looking line.
                // The examples show effects always have "%".
                if (line.includes('%')) {
                    currentBlock.effects.push(line);
                }
            }
        }

        if (currentBlock) {
            blocks.push(currentBlock);
        }

        return blocks;
    }

    function computeWeightedAverage(blocks, userCritChance) {
        // 1. Identify all unique effects and extract their probabilities
        const uniqueEffects = new Map(); // EffectText -> Probability (0-1)
        const CRIT_MARKER = 'CRITICAL_HIT_MARKER';

        // Regex to identify Crit line: "34% probabilidad 385% Crítico"
        // It seems consistent: "probabilidad" AND "Crítico"
        const critLineRegex = /probabilidad.*?Crítico/i;

        // Regex to extract probability: "probabilidad del 45 %" or "34% probabilidad"
        // We look for the number preceding "%" that is associated with "probabilidad"
        // Pattern A: "(\d+)\s*%\s*probabilidad"
        // Pattern B: "probabilidad.*?\s(\d+)\s*%"
        const probRegexA = /(\d+)\s*%\s*probabilidad/i;
        const probRegexB = /probabilidad.*?(\d+)\s*%/i;

        // First pass: Collect all unique standard effects
        for (const block of blocks) {
            for (const line of block.effects) {
                if (critLineRegex.test(line)) {
                    // This is a crit line. We don't store it in uniqueEffects map 
                    // because its probability is determined by user input globally.
                    continue;
                }

                // Standard effect
                if (!uniqueEffects.has(line)) {
                    let prob = 0;
                    let match = line.match(probRegexA);
                    if (match) {
                        prob = parseFloat(match[1]);
                    } else {
                        match = line.match(probRegexB);
                        if (match) {
                            prob = parseFloat(match[1]);
                        }
                    }

                    // If we couldn't parse probability, warn or assume 0? 
                    // Let's assume the text is well-formed as per examples.
                    if (!isNaN(prob)) {
                        uniqueEffects.set(line, prob / 100);
                    } else {
                        console.warn('Could not extract probability from line:', line);
                    }
                }
            }
        }

        let totalWeightedDamage = 0;
        let totalWeight = 0;

        // 2. Calculate weight for each block
        for (const block of blocks) {
            let blockProb = 1.0;

            // Check for Crit
            const hasCrit = block.effects.some(line => critLineRegex.test(line));
            const pCrit = userCritChance / 100;

            if (hasCrit) {
                blockProb *= pCrit;
            } else {
                blockProb *= (1 - pCrit);
            }

            // Check for other effects
            // We must iterate over ALL unique effects found in the entire dataset
            for (const [effectText, pEffect] of uniqueEffects) {
                const hasEffect = block.effects.includes(effectText);

                if (hasEffect) {
                    blockProb *= pEffect;
                } else {
                    blockProb *= (1 - pEffect);
                }
            }

            totalWeightedDamage += block.avg * blockProb;
            totalWeight += blockProb;
        }

        if (totalWeight === 0) return 0;

        // Normalize? 
        // If the sum of probabilities is not 1 (due to rounding or missing cases), 
        // we should divide by totalWeight to get the true expected value relative to the provided cases?
        // The problem says "The calculator should always average the probabilities".
        // Usually, the sum of probabilities of all mutually exclusive and exhaustive outcomes is 1.
        // But here we are constructing the probabilities from independent events.
        // The blocks represent the *outcomes*.
        // If the provided blocks cover ALL combinations, totalWeight should be ~1.
        // If not, dividing by totalWeight normalizes it.

        return totalWeightedDamage / totalWeight;
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(num);
    }
});
