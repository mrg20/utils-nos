// Add this function to initialize the layout properly on page load
function initializeLayout() {
    // Create the left-side-container if it doesn't exist
    let leftSideContainer = document.getElementById('left-side-container');
    if (!leftSideContainer) {
        // Create a new container
        leftSideContainer = document.createElement('div');
        leftSideContainer.id = 'left-side-container';
        leftSideContainer.className = 'left-side-container';
        
        // Get the left container and the grid container
        const leftContainer = document.querySelector('.left-container');
        const gridContainer = document.querySelector('.grid-container');
        
        if (leftContainer && gridContainer) {
            // Remove grid container from its parent
            gridContainer.parentNode.removeChild(gridContainer);
            
            // Create stats display if it doesn't exist
            let statsDisplay = document.getElementById('stats-display');
            if (!statsDisplay) {
                statsDisplay = document.createElement('div');
                statsDisplay.id = 'stats-display';
                statsDisplay.className = 'stats-display';
                statsDisplay.innerHTML = '<h3>Accumulated Stats</h3><p>No stats accumulated yet</p>';
            }
            
            // Add stats display and grid container to the new container
            leftSideContainer.appendChild(statsDisplay);
            leftSideContainer.appendChild(gridContainer);
            
            // Add the new container to the left container
            leftContainer.appendChild(leftSideContainer);
        }
    }
    
    // Make sure options panel has the correct styles
    const optionsPanel = document.getElementById('options-panel');
    if (optionsPanel) {
        optionsPanel.className = 'options-panel';
    }
    
    // Make sure options grid has the correct styles
    const optionsGrid = document.getElementById('options-grid');
    if (optionsGrid) {
        optionsGrid.className = 'options-grid';
    }
    
    // Add the next button
    createNextButton();
}

// Add a function to create the next button and handle the transition to boss/buff/debuff selection
function createNextButton() {
    // Check if the button already exists
    if (document.getElementById('next-button-container')) {
        return;
    }
    
    // Create container for the next button
    const nextButtonContainer = document.createElement('div');
    nextButtonContainer.id = 'next-button-container';
    nextButtonContainer.className = 'next-button-container';
    
    // Create the next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next: Select Boss & Effects';
    nextButton.className = 'next-button';
    
    // Add click event to show boss/buff/debuff sections
    nextButton.addEventListener('click', function() {
        showBossBuffDebuffSections();
    });
    
    // Add button to container
    nextButtonContainer.appendChild(nextButton);
    
    // Add to the main container
    const leftContainer = document.querySelector('.left-container');
    leftContainer.appendChild(nextButtonContainer);
}

// Function to show boss, buff, and debuff sections
function showBossBuffDebuffSections() {
    // Hide the character selection sections
    const leftSideContainer = document.getElementById('left-side-container');
    if (leftSideContainer) {
        leftSideContainer.style.display = 'none';
    }
    
    // Hide the options panel
    const optionsPanel = document.getElementById('options-panel');
    if (optionsPanel) {
        optionsPanel.style.display = 'none';
    }
    
    // Hide the next button
    const nextButtonContainer = document.getElementById('next-button-container');
    if (nextButtonContainer) {
        nextButtonContainer.style.display = 'none';
    }
    
    // Create or show the boss/buff/debuff container
    let effectsContainer = document.getElementById('effects-container');
    if (!effectsContainer) {
        effectsContainer = document.createElement('div');
        effectsContainer.id = 'effects-container';
        effectsContainer.className = 'effects-container';
        
        // Create sections for boss, buffs, and debuffs
        const sections = [
            { id: 'boss-section', title: 'Boss', imageDir: 'image/boss_img' },
            { id: 'buff-section', title: 'Buffs', imageDir: 'image/buff_img' },
            { id: 'debuff-section', title: 'Debuffs', imageDir: 'image/debuff_img' }
        ];
        
        sections.forEach(section => {
            const sectionElement = createSection(section.id, section.title, section.imageDir);
            effectsContainer.appendChild(sectionElement);
        });
        
        // Add a calculate button
        const calculateButtonContainer = document.createElement('div');
        calculateButtonContainer.className = 'calculate-button-container';
        
        const calculateButton = document.createElement('button');
        calculateButton.textContent = 'Calculate Damage';
        calculateButton.className = 'calculate-button';
        calculateButton.addEventListener('click', calculateDamage);
        
        calculateButtonContainer.appendChild(calculateButton);
        effectsContainer.appendChild(calculateButtonContainer);
        
        // Add a back button
        const backButtonContainer = document.createElement('div');
        backButtonContainer.className = 'back-button-container';
        
        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Character Selection';
        backButton.className = 'back-button';
        backButton.addEventListener('click', function() {
            effectsContainer.style.display = 'none';
            if (leftSideContainer) leftSideContainer.style.display = 'flex';
            if (optionsPanel) optionsPanel.style.display = 'block';
            if (nextButtonContainer) nextButtonContainer.style.display = 'block';
        });
        
        backButtonContainer.appendChild(backButton);
        effectsContainer.appendChild(backButtonContainer);
        
        // Add to the main container
        const leftContainer = document.querySelector('.left-container');
        leftContainer.appendChild(effectsContainer);
    } else {
        effectsContainer.style.display = 'block';
    }
}

// Function to create a section (boss, buff, or debuff)
function createSection(id, title, imageDir) {
    const section = document.createElement('div');
    section.id = id;
    section.className = 'effect-section';
    
    // Add title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    section.appendChild(titleElement);
    
    // Create grid for images
    const grid = document.createElement('div');
    grid.className = 'effect-grid';
    
    // Load images from the directory
    loadImagesForSection(grid, imageDir, id);
    
    section.appendChild(grid);
    return section;
}

// Function to load images for a section
function loadImagesForSection(grid, imageDir, sectionId) {
    // For boss section, use the predefined images from the screenshot
    if (sectionId === 'boss-section') {
        const bossImages = [
            'image/boss_img/dander.png',
            'image/boss_img/poluto.png',
            'image/boss_img/meca.png',
            'image/boss_img/completo.png',
            'image/boss_img/valehir.png',
            'image/boss_img/alzanor.png'
        ];
        
        bossImages.forEach(imagePath => {
            addImageToGrid(grid, imagePath);
        });
    } 
    // For buff section
    else if (sectionId === 'buff-section') {
        const buffImages = [
            'image/buff_img/brillo.png',
            'image/buff_img/forta.png',
            'image/buff_img/holly.png',
            'image/buff_img/lobo.png',
            'image/buff_img/sader.png',
            'image/buff_img/roja.png'
        ];
        
        buffImages.forEach(imagePath => {
            addImageToGrid(grid, imagePath);
        });
    }
    // For debuff section
    else if (sectionId === 'debuff-section') {
        const debuffImages = [
            'image/debuff_img/aliento.png',
            'image/debuff_img/canto.png',
            'image/debuff_img/ele_down_4.png',
            'image/debuff_img/ele_down_5.png',
            'image/debuff_img/gas_ulti.png',
            'image/debuff_img/gas.png',
            'image/debuff_img/last holy.png',
            'image/debuff_img/ruptura.png',
            'image/debuff_img/toxicosis_mejorada.png'
        ];
        
        debuffImages.forEach(imagePath => {
            addImageToGrid(grid, imagePath);
        });
    }
}

// Function to add an image to a grid
function addImageToGrid(grid, imagePath) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'effect-item';
    
    // Set background image
    imageContainer.style.backgroundImage = `url('${imagePath}')`;
    
    // Add click event to select this effect
    imageContainer.addEventListener('click', function() {
        // Remove selected class from all items in this grid
        const siblings = Array.from(this.parentNode.children);
        siblings.forEach(sibling => sibling.classList.remove('selected'));
        
        // Add selected class to this item
        this.classList.add('selected');
    });
    
    grid.appendChild(imageContainer);
}

// Call this function at the beginning of the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the layout first
    initializeLayout();
    
    // Rest of your existing code...
    const gridItems = document.querySelectorAll('.grid-item');
    const optionsPanel = document.getElementById('options-panel');
    const optionsGrid = document.getElementById('options-grid');
    let currentSelectedItem = null;
    
    // Object to store selected items and their properties
    const selectedItems = {};
    // Object to store accumulated stats
    const accumulatedStats = {};
    
    // Initialize the stats display
    createStatsDisplay();
    
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all items
            gridItems.forEach(i => i.classList.remove('selected'));
            
            // Add selected class to clicked item
            this.classList.add('selected');
            currentSelectedItem = this;
            
            // Show options panel
            optionsPanel.style.display = 'block';
            
            // Get the type of the selected item
            const itemType = this.getAttribute('data-type');
            
            // Display options for the selected type
            displayOptions(itemType);
        });
    });
    
    function displayOptions(itemType) {
        // Clear previous options
        optionsGrid.innerHTML = '';
        
        // Remove any existing relative properties panel when changing item types
        const existingPanel = document.getElementById('relative-props-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        const options = Object.entries(item_info)
            .filter(([_, item]) => item.type === itemType)
            .map(([id, item]) => ({
                id: id,
                image: item.path
            }));
        
        if (options.length === 0) {
            optionsGrid.innerHTML = '<div class="no-options">No options available for this item</div>';
            return;
        }
        
        // Create option elements
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            optionElement.setAttribute('data-option-id', option.id);
            optionElement.style.width = '70px';
            optionElement.style.height = '70px';
            
            // Set background image if available
            if (option.image) {
                optionElement.style.backgroundImage = `url('${option.image}')`;
            } else {
                // Fallback display if no image
                optionElement.textContent = option.id;
            }
            
            // Check if this option is currently selected for this item type
            if (selectedItems[itemType] && selectedItems[itemType].id === option.id) {
                optionElement.classList.add('selected');
            }
            
            // Add click event to select this option
            optionElement.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update the selected grid item's background image
                if (currentSelectedItem && option.image) {
                    currentSelectedItem.style.backgroundImage = `url('${option.image}')`;
                }
                
                // Store the selected item
                const optionId = this.getAttribute('data-option-id');
                const itemInfo = item_info[optionId];
                itemInfo.id = optionId;
                
                // Handle item selection
                selectItem(itemType, optionId, itemInfo);
                
                // Display relative properties input fields if any
                displayRelativeProperties(itemInfo);
            });
            
            optionsGrid.appendChild(optionElement);
        });
    }
    
    // Function to handle item selection and stat updates
    function selectItem(itemType, optionId, itemInfo) {
        // Remove previous selection for this item type
        if (selectedItems[itemType]) {
            // Subtract previous item's stats from accumulated stats
            removeItemStats(selectedItems[itemType]);
        }
        
        // Store new selection
        selectedItems[itemType] = {
            id: optionId,
            type: itemType,
            props: JSON.parse(JSON.stringify(itemInfo.props || {})), // Deep copy to avoid reference issues
            contributions: {}, // Track stat contributions from this item
            appliedRelativeProps: {} // Track applied relative properties
        };
        
        // Add new item's stats to accumulated stats
        addItemStats(selectedItems[itemType]);
        
        // Update stats display
        updateStatsDisplay();
    }
    
    function displayRelativeProperties(itemInfo) {
        // Remove any existing relative properties panel
        const existingPanel = document.getElementById('relative-props-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // Check if the item has properties and if any are relative
        if (!itemInfo || !itemInfo.props) return;
        
        const relativeProps = Object.keys(itemInfo.props).filter(key => key.startsWith('relative_'));
        
        if (relativeProps.length === 0) return;
        
        // Create a panel for relative properties
        const relativePanel = document.createElement('div');
        relativePanel.id = 'relative-props-panel';
        relativePanel.className = 'relative-props-panel';
        relativePanel.innerHTML = '<h3>Set Relative Properties</h3>';
        
        // Store the current values for each property
        const currentValues = {};
        
        // Create input fields for each relative property
        relativeProps.forEach(prop => {
            const propName = prop.replace('relative_', '');
            // Format display name by replacing underscores with spaces
            const displayName = propName.replace(/_/g, ' ');
            const defaultValue = itemInfo.props[prop];
            
            // Store the default value
            currentValues[prop] = defaultValue;
            
            const propContainer = document.createElement('div');
            propContainer.className = 'prop-container';
            
            const label = document.createElement('label');
            label.textContent = displayName + ': ';
            
            const input = document.createElement('input');
            input.type = 'number';
            input.value = defaultValue;
            input.setAttribute('data-prop', prop);
            input.setAttribute('data-item-id', itemInfo.id);
            
            // Update the stored value when input changes (but don't update stats yet)
            input.addEventListener('change', function() {
                const propName = this.getAttribute('data-prop');
                currentValues[propName] = parseFloat(this.value);
            });
            
            propContainer.appendChild(label);
            propContainer.appendChild(input);
            relativePanel.appendChild(propContainer);
        });
        
        // Add a confirm button
        const confirmButtonContainer = document.createElement('div');
        confirmButtonContainer.className = 'confirm-button-container';
        
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.className = 'confirm-button';
        
        // Apply the relative properties when the button is clicked
        confirmButton.addEventListener('click', function() {
            const itemType = itemInfo.type;
            const itemId = itemInfo.id;
            
            // Make sure this item is still selected
            if (selectedItems[itemType] && selectedItems[itemType].id === itemId) {
                // Remove any previously applied relative properties for this item type
                removeRelativePropsFromStats(itemType);
                
                // Update the item's properties with the current values
                Object.entries(currentValues).forEach(([prop, value]) => {
                    selectedItems[itemType].props[prop] = value;
                });
                
                // Add the confirmed values to the accumulated stats
                addRelativePropsToStats(selectedItems[itemType]);
                
                // Update the stats display
                updateStatsDisplay();
                
                // Visual feedback
                this.textContent = 'Updated!';
                setTimeout(() => {
                    this.textContent = 'Confirm';
                }, 1000);
            }
        });
        
        confirmButtonContainer.appendChild(confirmButton);
        relativePanel.appendChild(confirmButtonContainer);
        
        // Add the panel to the appropriate location
        addPanelToLayout(relativePanel);
    }
    
    // Helper function to add a panel to the layout
    function addPanelToLayout(panel) {
        // Check if we're using the left-side-container layout
        const leftSideContainer = document.getElementById('left-side-container');
        
        if (leftSideContainer) {
            // If we have the side-by-side layout, append to the left side container
            const gridContainer = leftSideContainer.querySelector('.grid-container');
            if (gridContainer) {
                // Insert after the grid container
                leftSideContainer.insertBefore(panel, gridContainer.nextSibling);
            } else {
                // Fallback - just append to the container
                leftSideContainer.appendChild(panel);
            }
        } else {
            // Original layout - insert after the grid container in the left container
            const leftContainer = document.querySelector('.left-container');
            const gridContainer = leftContainer.querySelector('.grid-container');
            
            if (gridContainer) {
                leftContainer.insertBefore(panel, gridContainer.nextSibling);
            } else {
                // Fallback - just append to the left container
                leftContainer.appendChild(panel);
            }
        }
        
        // No need to set inline styles as they're defined in the CSS
    }
    
    // Completely rewritten SL_overall handling system
    function addItemStats(item) {
        if (!item || !item.props) return;
        
        // Initialize tracking for this item if not exists
        if (!item.contributions) item.contributions = {};
        
        // First pass: Handle regular properties (except SL stats that might be affected by SL_overall)
        Object.entries(item.props).forEach(([key, value]) => {
            // Skip relative properties - they'll be added only when confirmed
            if (key.startsWith('relative_')) return;
            
            // Skip SL stats as they'll be handled in the second pass
            if (key === 'SL_overall' || key === 'SL_damage' || key === 'SL_defense' || 
                key === 'SL_power' || key === 'SL_energy') return;
            
            // Handle different types of values
            if (typeof value === 'string') {
                // For string values, replace instead of add
                accumulatedStats[key] = value;
                // Track this contribution
                item.contributions[key] = value;
            } else {
                // For numeric values, add
                if (!accumulatedStats[key]) {
                    accumulatedStats[key] = 0;
                }
                accumulatedStats[key] += value;
                
                // Track this contribution
                item.contributions[key] = value;
            }
        });
        
        // Second pass: Handle SL stats with SL_overall distribution
        const slStats = ['SL_damage', 'SL_defense', 'SL_power', 'SL_energy'];
        const slOverall = item.props.SL_overall || 0;
        
        // Track SL_overall separately
        if (slOverall !== 0) {
            item.contributions.SL_overall = slOverall;
        }
        
        // Process each SL stat
        slStats.forEach(stat => {
            // Get direct stat value (or 0 if not present)
            const directValue = item.props[stat] || 0;
            
            // Total value is direct value plus SL_overall
            const totalValue = directValue + slOverall;
            
            // Only add if there's a value
            if (totalValue !== 0) {
                // Add to accumulated stats
                if (!accumulatedStats[stat]) {
                    accumulatedStats[stat] = 0;
                }
                accumulatedStats[stat] += totalValue;
                
                // Track contributions separately
                item.contributions[stat] = {
                    direct: directValue,
                    fromOverall: slOverall,
                    total: totalValue
                };
            }
        });
    }
    
    function removeItemStats(item) {
        if (!item || !item.contributions) return;
        
        // Remove all tracked contributions
        Object.entries(item.contributions).forEach(([key, value]) => {
            // Skip SL_overall as it's not directly in accumulated stats
            if (key === 'SL_overall') return;
            
            // Handle SL stats with their complex structure
            if (typeof value === 'object' && value.total !== undefined) {
                if (accumulatedStats[key]) {
                    accumulatedStats[key] -= value.total;
                    if (accumulatedStats[key] === 0) {
                        delete accumulatedStats[key];
                    }
                }
                return;
            }
            
            // Handle regular stats
            if (accumulatedStats[key]) {
                if (typeof value === 'string') {
                    // For string values, remove the property
                    delete accumulatedStats[key];
                } else {
                    // For numeric values, subtract
                    accumulatedStats[key] -= value;
                    if (accumulatedStats[key] === 0) {
                        delete accumulatedStats[key];
                    }
                }
            }
        });
        
        // Remove any applied relative properties
        removeRelativePropsFromStats(item.type);
        
        // Clear the contributions
        item.contributions = {};
    }
    
    // Update the addRelativePropsToStats function to handle relative_SL_overall properly
    function addRelativePropsToStats(item) {
        if (!item || !item.props) return;
        
        // Initialize tracking
        if (!item.appliedRelativeProps) item.appliedRelativeProps = {};
        
        // First handle regular relative properties (except SL stats)
        Object.entries(item.props).forEach(([key, value]) => {
            if (key.startsWith('relative_') && 
                key !== 'relative_SL_overall' && 
                !key.startsWith('relative_SL_')) {
                
                const nonRelativeKey = key.replace('relative_', '');
                if (!accumulatedStats[nonRelativeKey]) {
                    accumulatedStats[nonRelativeKey] = 0;
                }
                accumulatedStats[nonRelativeKey] += value;
                
                // Track this contribution
                item.appliedRelativeProps[nonRelativeKey] = value;
            }
        });
        
        // Then handle SL stats with SL_overall distribution
        const slStats = ['SL_damage', 'SL_defense', 'SL_power', 'SL_energy'];
        const relativeSlOverall = item.props.relative_SL_overall || 0;
        
        // Track relative_SL_overall separately
        if (relativeSlOverall !== 0) {
            item.appliedRelativeProps.relative_SL_overall = relativeSlOverall;
        }
        
        // Process each relative SL stat
        slStats.forEach(stat => {
            const relativeStat = 'relative_' + stat;
            // Get direct relative stat value (or 0 if not present)
            const directValue = item.props[relativeStat] || 0;
            
            // Total value is direct value plus relative_SL_overall
            const totalValue = directValue + relativeSlOverall;
            
            // Only add if there's a value
            if (totalValue !== 0) {
                // Add to accumulated stats
                if (!accumulatedStats[stat]) {
                    accumulatedStats[stat] = 0;
                }
                accumulatedStats[stat] += totalValue;
                
                // Track contributions with details
                item.appliedRelativeProps[stat] = {
                    direct: directValue,
                    fromOverall: relativeSlOverall,
                    total: totalValue
                };
            }
        });
    }
    
    function removeRelativePropsFromStats(itemType) {
        const item = selectedItems[itemType];
        if (!item || !item.appliedRelativeProps) return;
        
        // Remove each previously applied relative property
        Object.entries(item.appliedRelativeProps).forEach(([key, value]) => {
            // Skip the tracking key for relative_SL_overall
            if (key === 'relative_SL_overall') return;
            
            // Handle complex SL stat structure
            if (typeof value === 'object' && value.total !== undefined) {
                if (accumulatedStats[key]) {
                    accumulatedStats[key] -= value.total;
                    if (accumulatedStats[key] === 0) {
                        delete accumulatedStats[key];
                    }
                }
                return;
            }
            
            // Handle regular stats
            if (accumulatedStats[key]) {
                accumulatedStats[key] -= value;
                if (accumulatedStats[key] === 0) {
                    delete accumulatedStats[key];
                }
            }
        });
        
        // Clear the applied properties
        item.appliedRelativeProps = {};
    }
    
    // Create the stats display element
    function createStatsDisplay() {
        // Check if stats display already exists
        let statsDisplay = document.getElementById('stats-display');
        if (statsDisplay) {
            // If it exists, just update its content
            updateStatsDisplay();
            return;
        }
        
        // Create a new stats display if it doesn't exist
        statsDisplay = document.createElement('div');
        statsDisplay.id = 'stats-display';
        statsDisplay.className = 'stats-display';
        
        // Create a container for the left side content
        let leftSideContainer = document.getElementById('left-side-container');
        if (!leftSideContainer) {
            // Create a new container to hold both the stats display and grid container
            leftSideContainer = document.createElement('div');
            leftSideContainer.id = 'left-side-container';
            leftSideContainer.className = 'left-side-container';
            
            // Get the left container and the grid container
            const leftContainer = document.querySelector('.left-container');
            const gridContainer = document.querySelector('.grid-container');
            
            // Remove grid container from its parent
            gridContainer.parentNode.removeChild(gridContainer);
            
            // Add stats display and grid container to the new container
            leftSideContainer.appendChild(statsDisplay);
            leftSideContainer.appendChild(gridContainer);
            
            // Add the new container to the left container
            leftContainer.appendChild(leftSideContainer);
        } else {
            // If the container already exists, just add the stats display to it
            leftSideContainer.insertBefore(statsDisplay, leftSideContainer.firstChild);
        }
        
        // Initialize with empty content
        updateStatsDisplay();
    }
    
    // Update the stats display
    function updateStatsDisplay() {
        let statsDisplay = document.getElementById('stats-display');
        if (!statsDisplay) return;
        
        // Update the content
        let statsHTML = '<h3>Accumulated Stats</h3>';
        
        if (Object.keys(accumulatedStats).length === 0) {
            statsHTML += '<p>No stats accumulated yet</p>';
        } else {
            statsHTML += '<ul>';
            
            // Filter out stats with value of 0 before displaying
            const filteredStats = Object.entries(accumulatedStats).filter(([_, value]) => {
                // Keep the stat if it's not 0 (either as number or string)
                return value !== 0 && value !== '0';
            });
            
            if (filteredStats.length === 0) {
                statsHTML += '<p>No stats accumulated yet</p>';
            } else {
                filteredStats.forEach(([key, value]) => {
                    // Format the display key by replacing underscores with spaces
                    const displayKey = key.replace(/_/g, ' ');
                    
                    // Format the value based on type
                    let displayValue = value;
                    if (typeof value === 'string' && value !== '0') {
                        // For strings, don't append 0
                        displayValue = value;
                    }
                    statsHTML += `<li><strong>${displayKey}:</strong> ${displayValue}</li>`;
                });
            }
            
            statsHTML += '</ul>';
        }
        
        statsDisplay.innerHTML = statsHTML;
    }
});

function calculateDamage() {
    const calculator = new Calculator(attacker, defender);
    calculator.calculateDamage();
}

item_info = {
    "4148": {
        "path": "image/items/alas/4148.png",
        "type": "alas",
        "props": {
            "fairy": 40
        }
    },
    "4880": {
        "path": "image/items/alas/4880.png",
        "type": "alas",
        "props": {
            "fairy": 5
        }
    },
    "588": {
        "path": "image/items/amuleto/588.png",
        "type": "amuleto",
        "props": {
            "enhanced": 250
        }
    },
    "660": {
        "path": "image/items/amuleto/660.png",
        "type": "amuleto",
        "props": {
            "enhanced": 150
        }
    },
    "661": {
        "path": "image/items/amuleto/661.png",
        "type": "amuleto",
        "props": {
            "enhanced": 250
        }
    },
    "4649": {
        "path": "image/items/anillo/4649.png",
        "type": "anillo",
        "props": {
            "enhanced": 30,
            "fairy": 3
        }
    },
    "4974": {
        "path": "image/items/anillo/4974.png",
        "type": "anillo",
        "props": {
            "enhanced": 15,
            "fairy": 2
        }
    },
    "4975": {
        "path": "image/items/anillo/4975.png",
        "type": "anillo",
        "props": {
            "enhanced": 50,
            "fairy": 5,
            "elements": 30
        }
    },
    "296": {
        "path": "image/items/armor/296.png",
        "type": "armor",
        "props": {
            "res": 3
        }
    },
    "4655": {
        "path": "image/items/armor/4655.png",
        "type": "armor"
    },
    "4657": {
        "path": "image/items/armor/4657.png",
        "type": "armor"
    },
    "4659": {
        "path": "image/items/armor/4659.png",
        "type": "armor"
    },
    "4661": {
        "path": "image/items/armor/4661.png",
        "type": "armor"
    },
    "4952": {
        "path": "image/items/armor/4952.png",
        "type": "armor"
    },
    "4953": {
        "path": "image/items/armor/4953.png",
        "type": "armor"
    },
    "4954": {
        "path": "image/items/armor/4954.png",
        "type": "armor"
    },
    "4955": {
        "path": "image/items/armor/4955.png",
        "type": "armor"
    },
    "4956": {
        "path": "image/items/armor/4956.png",
        "type": "armor"
    },
    "4957": {
        "path": "image/items/armor/4957.png",
        "type": "armor"
    },
    "4958": {
        "path": "image/items/armor/4958.png",
        "type": "armor"
    },
    "4959": {
        "path": "image/items/armor/4959.png",
        "type": "armor"
    },
    "4664": {
        "path": "image/items/bota/4664.png",
        "type": "bota",
        "props": {
            "fairy": 5
        }
    },
    "4964": {
        "path": "image/items/bota/4964.png",
        "type": "bota",
        "props": {
            "fairy": 10
        }
    },
    "4650": {
        "path": "image/items/brazalete/4650.png",
        "type": "brazalete",
        "props": {
            "fairy": 3,
            "enhanced": 30
        }
    },
    "4970": {
        "path": "image/items/brazalete/4970.png",
        "type": "brazalete",
        "props": {
            "fairy": 5,
            "enhanced": 50,
            "elements": 30
        }
    },
    "7101": {
        "path": "image/items/brazalete/7101.png",
        "type": "brazalete",
        "props": {
            "fairy": 2,
            "enhanced": 15
        }
    },
    "4644": {
        "path": "image/items/collar/4644.png",
        "type": "collar",
        "props": {
            "fairy": 4,
            "enhanced": 40
        }
    },
    "4978": {
        "path": "image/items/collar/4978.png",
        "type": "collar",
        "props": {
            "fairy": 3,
            "enhanced": 20
        }
    },
    "4979": {
        "path": "image/items/collar/4979.png",
        "type": "collar",
        "props": {
            "fairy": 7,
            "enhanced": 60,
            "elements": 40
        }
    },
    "4869": {
        "path": "image/items/compa/4869.png",
        "type": "compa",
        "props": {
            "fairy": 5,
            "s%": 5,
            "companion_class": "sword"
        }
    },
    "4870": {
        "path": "image/items/compa/4870.png",
        "type": "compa",
        "props": {
            "fairy": 5,
            "crit_dmg": 20,
            "companion_class": "archer"
        }
    },
    "4871": {
        "path": "image/items/compa/4871.png",
        "type": "compa",
        "props": {
            "fairy": 5,
            "companion_class": "mage"
        }
    },
    "4856": {
        "path": "image/items/compa_sp/4856.png",
        "type": "compa_sp",
        "props": {
            "relative_fairy": 10,
            "relative_s%": 20,
            "companion_class": "sword"
        }
    },
    "4912": {
        "path": "image/items/compa_sp/4912.png",
        "type": "compa_sp",
        "props": {
            "relative_s%": 7,
            "companion_class": "archer"
        }
    },
    "7155": {
        "path": "image/items/compa_sp/7155.png",
        "type": "compa_sp",
        "props": {
            "relative_s%": 10,
            "companion_class": "mage"
        }
    },
    "4883": {
        "path": "image/items/disfraz/4883.png",
        "type": "disfraz"
    },
    "4933": {
        "path": "image/items/disfraz/4933.png",
        "type": "disfraz",
        "props": {
            "s%": 7
        }
    },
    "7130": {
        "path": "image/items/disfraz/7130.png",
        "type": "disfraz",
        "props": {
            "s%": 5,
            "high_increase_prob": 10,
            "high_increase": 30
        }
    },
    "4625": {
        "path": "image/items/gorro/4625.png",
        "type": "gorro",
        "props": {
            "s%": 5
        }
    },
    "4960": {
        "path": "image/items/gorro/4960.png",
        "type": "gorro",
        "props": {
            "SL_power": 2,
            "s%": 7
        }
    },
    "4882": {
        "path": "image/items/gorro_disfraz/4882.png",
        "type": "gorro_disfraz",
        "props": {
            "s%": 5,
            "set_s%": 5,
            "set_related": 4880
        }
    },
    "4934": {
        "path": "image/items/gorro_disfraz/4934.png",
        "type": "gorro_disfraz",
        "props": {
            "s%": 5
        }
    },
    "7131": {
        "path": "image/items/gorro_disfraz/7131.png",
        "type": "gorro_disfraz",
        "props": {
            "s%_low": 10,
            "s%": 7
        }
    },
    "4665": {
        "path": "image/items/guante/4665.png",
        "type": "guante",
        "props": {
            "fairy": 5
        }
    },
    "4962": {
        "path": "image/items/guante/4962.png",
        "type": "guante",
        "props": {
            "fairy": 10
        }
    },
    "4980": {
        "path": "image/items/hadas/4980.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "res": 3,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "4981": {
        "path": "image/items/hadas/4981.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "res": 3,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "4983": {
        "path": "image/items/hadas/4983.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "res": 3,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "4984": {
        "path": "image/items/hadas/4984.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "res": 3,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "987": {
        "path": "image/items/hadas/987.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "988": {
        "path": "image/items/hadas/988.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "989": {
        "path": "image/items/hadas/989.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "993": {
        "path": "image/items/hadas/993.png",
        "type": "hadas",
        "props": {
            "relative_fairy": 80,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_fairy_option": 0
        }
    },
    "227": {
        "path": "image/items/mascara/227.png",
        "type": "mascara",
        "props": {
            "elements": 10,
            "enhanced": 13
        }
    },
    "4966": {
        "path": "image/items/mascara/4966.png",
        "type": "mascara",
        "props": {
            "SL_power": 2,
            "s%": 3
        }
    },
    "4145": {
        "path": "image/items/mascota/4145.png",
        "type": "mascota",
        "props": {
            "s%": 10
        }
    },
    "4872": {
        "path": "image/items/mascota/4872.png",
        "type": "mascota",
        "props": {
            "s%": 7
        }
    },
    "4854": {
        "path": "image/items/mascota/4854.png",
        "type": "mascota",
        "props": {
            "s%": 10
        }
    },
    "4930": {
        "path": "image/items/mascota/4930.png",
        "type": "mascota",
        "props": {
            "s%": 15
        }
    },
    "7133": {
        "path": "image/items/mascota/7133.png",
        "type": "mascota",
        "props": {
            "s%": 10
        }
    },
    "7338": {
        "path": "image/items/mascota/7338.png",
        "type": "mascota",
        "props": {
            "s%": 15
        }
    },
    "7156": {
        "path": "image/items/mini_pet/7156.png",
        "type": "mini_pet",
        "props": {
            "s%": 5
        }
    },
    "7328": {
        "path": "image/items/mini_pet/7328.png",
        "type": "mini_pet",
        "props": {
            "s%": 3
        }
    },
    "4627": {
        "path": "image/items/primaria/4627.png",
        "type": "primaria",
        "props": {
            "res": 35,
            "elements": 205,
            "increase_prob": 40,
            "increase": 45,
            "relative_min_dmg": 916,
            "relative_max_dmg": 1015,
            "crit_prob": 27,
            "crit_dmg": 270,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4629": {
        "path": "image/items/primaria/4629.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elements": 210,
            "increase_prob": 40,
            "increase": 45,
            "relative_min_dmg": 952,
            "relative_max_dmg": 1060,
            "crit_prob": 17,
            "crit_dmg": 280,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4631": {
        "path": "image/items/primaria/4631.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elements": 300,
            "increase_prob": 25,
            "increase": 65,
            "relative_min_dmg": 939,
            "relative_max_dmg": 1074,
            "crit_prob": 0,
            "crit_dmg": 0,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4633": {
        "path": "image/items/primaria/4633.png",
        "type": "primaria",
        "props": {
            "res": 35,
            "elements": 190,
            "increase_prob": 30,
            "increase": 60,
            "relative_min_dmg": 834,
            "relative_max_dmg": 1040,
            "crit_prob": 21,
            "crit_dmg": 290,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4944": {
        "path": "image/items/primaria/4944.png",
        "type": "primaria",
        "props": {
            "res": 31,
            "elements": 230,
            "increase_prob": 40,
            "increase": 40,
            "relative_min_dmg": 1043,
            "relative_max_dmg": 1162,
            "crit_prob": 17,
            "crit_dmg": 260,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4945": {
        "path": "image/items/primaria/4945.png",
        "type": "primaria",
        "props": {
            "res": 38,
            "elements": 276,
            "increase_prob": 40,
            "increase": 50,
            "relative_min_dmg": 1252,
            "relative_max_dmg": 1394,
            "crit_prob": 20,
            "crit_dmg": 325,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4946": {
        "path": "image/items/primaria/4946.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elements": 259,
            "increase_prob": 35,
            "increase": 60,
            "relative_min_dmg": 1096,
            "relative_max_dmg": 1368,
            "crit_prob": 26,
            "crit_dmg": 335,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4947": {
        "path": "image/items/primaria/4947.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elements": 216,
            "increase_prob": 35,
            "increase": 55,
            "relative_min_dmg": 913,
            "relative_max_dmg": 1140,
            "crit_prob": 21,
            "crit_dmg": 270,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4948": {
        "path": "image/items/primaria/4948.png",
        "type": "primaria",
        "props": {
            "res": 38,
            "elements": 300,
            "increase_prob": 25,
            "increase": 60,
            "relative_min_dmg": 1028,
            "relative_max_dmg": 1176,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4949": {
        "path": "image/items/primaria/4949.png",
        "type": "primaria",
        "props": {
            "res": 45,
            "elements": 324,
            "increase_prob": 30,
            "increase": 65,
            "relative_min_dmg": 1234,
            "relative_max_dmg": 1411,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4950": {
        "path": "image/items/primaria/4950.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elements": 240,
            "increase_prob": 40,
            "increase": 40,
            "relative_min_dmg": 1053,
            "relative_max_dmg": 1167,
            "crit_prob": 27,
            "crit_dmg": 250,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4951": {
        "path": "image/items/primaria/4951.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elements": 246,
            "increase_prob": 40,
            "increase": 50,
            "relative_min_dmg": 1264,
            "relative_max_dmg": 1400,
            "crit_prob": 31,
            "crit_dmg": 310,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0,
            "relative_rune_s%": 0,
            "relative_rune_crit_prob": 0,
            "relative_rune_crit_dmg": 0,
            "relative_rune_enhanced": 0,
            "relative_rune_SL_power": 0,
            "relative_rune_SL_damage": 0,
            "relative_rune_fairy": 0,
            "relative_rune_monster": 0,
            "relative_rune_dragon": 0
        }
    },
    "4635": {
        "path": "image/items/secundaria/4635.png",
        "type": "secundaria",
        "props": {
            "res": 27,
            "elements": 30,
            "enhanced": 280,
            "increase_prob": 15,
            "increase": 50,
            "relative_min_dmg": 843,
            "relative_max_dmg": 988,
            "crit_prob": 23,
            "crit_dmg": 265,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4637": {
        "path": "image/items/secundaria/4637.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "elements": 20,
            "increase_prob": 6,
            "increase": 80,
            "relative_min_dmg": 679,
            "relative_max_dmg": 757,
            "crit_prob": 25,
            "crit_dmg": 437,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4639": {
        "path": "image/items/secundaria/4639.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "elements": 21,
            "increase_prob": 30,
            "increase": 45,
            "relative_min_dmg": 894,
            "relative_max_dmg": 1004,
            "crit_prob": 22,
            "crit_dmg": 292,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4641": {
        "path": "image/items/secundaria/4641.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "enhanced": 260,
            "increase_prob": 10,
            "increase": 70,
            "relative_min_dmg": 614,
            "relative_max_dmg": 796,
            "crit_prob": 20,
            "crit_dmg": 282,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4936": {
        "path": "image/items/secundaria/4936.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "enhanced": 290,
            "elements": 30,
            "increase_prob": 15,
            "increase": 45,
            "relative_min_dmg": 969,
            "relative_max_dmg": 1136,
            "crit_prob": 23,
            "crit_dmg": 245,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4937": {
        "path": "image/items/secundaria/4937.png",
        "type": "secundaria",
        "props": {
            "res": 32,
            "enhanced": 320,
            "elements": 36,
            "increase_prob": 15,
            "increase": 55,
            "relative_min_dmg": 1163,
            "relative_max_dmg": 1363,
            "crit_prob": 26,
            "crit_dmg": 315,
            "class": "sword",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4938": {
        "path": "image/items/secundaria/4938.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "elements": 20,
            "increase_prob": 6,
            "increase": 75,
            "relative_min_dmg": 830,
            "relative_max_dmg": 925,
            "crit_prob": 25,
            "crit_dmg": 417,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4939": {
        "path": "image/items/secundaria/4939.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "elements": 24,
            "increase_prob": 10,
            "increase": 85,
            "relative_min_dmg": 950,
            "relative_max_dmg": 1110,
            "crit_prob": 30,
            "crit_dmg": 497,
            "class": "archer",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4940": {
        "path": "image/items/secundaria/4940.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "elements": 23,
            "increase_prob": 30,
            "increase": 40,
            "relative_min_dmg": 1028,
            "relative_max_dmg": 1155,
            "crit_prob": 22,
            "crit_dmg": 272,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4941": {
        "path": "image/items/secundaria/4941.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "elements": 25,
            "increase_prob": 30,
            "increase": 55,
            "relative_min_dmg": 1234,
            "relative_max_dmg": 1386,
            "crit_prob": 26,
            "crit_dmg": 322,
            "class": "mage",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4942": {
        "path": "image/items/secundaria/4942.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "enhanced": 270,
            "increase_prob": 10,
            "increase": 65,
            "relative_min_dmg": 706,
            "relative_max_dmg": 915,
            "crit_prob": 20,
            "crit_dmg": 262,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "4943": {
        "path": "image/items/secundaria/4943.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "enhanced": 300,
            "increase_prob": 10,
            "increase": 65,
            "relative_min_dmg": 847,
            "relative_max_dmg": 1098,
            "crit_prob": 24,
            "crit_dmg": 318,
            "class": "artist",
            "relative_SL_damage": 0,
            "relative_SL_power": 0,
            "relative_SL_overall": 0,
            "relative_enhanced": 0,
            "relative_s%": 0,
            "relative_crit_dmg": 0,
            "relative_crit_prob": 0,
            "relative_plant": 0,
            "relative_animal": 0,
            "relative_monster": 0,
            "relative_undead": 0,
            "relative_lower_society_monster": 0
        }
    },
    "2918": {
        "path": "image/items/skin/2918.png",
        "type": "skin",
        "props": {
            "high_increase_prob": 30,
            "high_increase": 10
        }
    },
    "4874": {
        "path": "image/items/skin/4874.png",
        "type": "skin",
        "props": {
            "s%": 3
        }
    },
    "4922": {
        "path": "image/items/skin/4922.png",
        "type": "skin",
        "props": {
            "s%": 4
        }
    },
    "7120": {
        "path": "image/items/skin/7120.png",
        "type": "skin",
        "props": {
            "s%": 3
        }
    },
    "7301": {
        "path": "image/items/skin/7301.png",
        "type": "skin",
        "props": {
            "s%": 7
        }
    },
    "2544": {
        "path": "image/items/SP/2544.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2545": {
        "path": "image/items/SP/2545.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2546": {
        "path": "image/items/SP/2546.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2588": {
        "path": "image/items/SP/2588.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2589": {
        "path": "image/items/SP/2589.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2590": {
        "path": "image/items/SP/2590.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2654": {
        "path": "image/items/SP/2654.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2655": {
        "path": "image/items/SP/2655.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "secondary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2656": {
        "path": "image/items/SP/2656.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2706": {
        "path": "image/items/SP/2706.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2707": {
        "path": "image/items/SP/2707.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "secondary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "2708": {
        "path": "image/items/SP/2708.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4048": {
        "path": "image/items/SP/4048.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4093": {
        "path": "image/items/SP/4093.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4126": {
        "path": "image/items/SP/4126.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4151": {
        "path": "image/items/SP/4151.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4494": {
        "path": "image/items/SP/4494.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4495": {
        "path": "image/items/SP/4495.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4496": {
        "path": "image/items/SP/4496.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4497": {
        "path": "image/items/SP/4497.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4860": {
        "path": "image/items/SP/4860.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4861": {
        "path": "image/items/SP/4861.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4862": {
        "path": "image/items/SP/4862.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "4863": {
        "path": "image/items/SP/4863.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "7138": {
        "path": "image/items/SP/7138.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "7139": {
        "path": "image/items/SP/7139.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "7140": {
        "path": "image/items/SP/7140.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "secondary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "7141": {
        "path": "image/items/SP/7141.png",
        "type": "SP",
        "props": {
            "class": "artist",
            "weapon": "secondary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "901": {
        "path": "image/items/SP/901.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "902": {
        "path": "image/items/SP/902.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "903": {
        "path": "image/items/SP/903.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "904": {
        "path": "image/items/SP/904.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "secondary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "905": {
        "path": "image/items/SP/905.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "906": {
        "path": "image/items/SP/906.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "909": {
        "path": "image/items/SP/909.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "secondary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "910": {
        "path": "image/items/SP/910.png",
        "type": "SP",
        "props": {
            "class": "sword",
            "weapon": "primary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "911": {
        "path": "image/items/SP/911.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "FIRE",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "912": {
        "path": "image/items/SP/912.png",
        "type": "SP",
        "props": {
            "class": "archer",
            "weapon": "primary",
            "element": "LIGHT",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "913": {
        "path": "image/items/SP/913.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "primary",
            "element": "WATER",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    },
    "914": {
        "path": "image/items/SP/914.png",
        "type": "SP",
        "props": {
            "class": "mage",
            "weapon": "secondary",
            "element": "SHADOW",
            "relative_SL_damage": 0,
            "relative_SL_defense": 0,
            "relative_SL_power": 0,
            "relative_SL_energy": 0,
            "relative_pp_damage": 0,
            "relative_pp_defense": 0,
            "relative_pp_power": 0,
            "relative_pp_energy": 0
        }
    }
}