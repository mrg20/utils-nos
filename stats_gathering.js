document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const optionsPanel = document.getElementById('options-panel');
    const optionsGrid = document.getElementById('options-grid');
    let currentSelectedItem = null;
    
    // Object to store selected items and their properties
    const selectedItems = {};
    // Object to store accumulated stats
    const accumulatedStats = {};
    
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
                
                // Remove previous selection for this item type
                if (selectedItems[itemType]) {
                    // Subtract previous item's stats from accumulated stats
                    subtractItemStats(selectedItems[itemType]);
                }
                
                // Store new selection
                selectedItems[itemType] = {
                    id: optionId,
                    type: itemType,
                    props: itemInfo.props || {}
                };
                
                // Add new item's stats to accumulated stats
                addItemStats(selectedItems[itemType]);
                
                // Display relative properties input fields if any
                displayRelativeProperties(itemInfo);
                
                // Update stats display
                updateStatsDisplay();
            });
            
            optionsGrid.appendChild(optionElement);
        });
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
        
        // Create input fields for each relative property
        relativeProps.forEach(prop => {
            const propName = prop.replace('relative_', '');
            const defaultValue = itemInfo.props[prop];
            
            const propContainer = document.createElement('div');
            propContainer.className = 'prop-container';
            
            const label = document.createElement('label');
            label.textContent = propName + ': ';
            
            const input = document.createElement('input');
            input.type = 'number';
            input.value = defaultValue;
            input.setAttribute('data-prop', prop);
            input.setAttribute('data-item-id', itemInfo.id);
            
            // Update the property value when input changes
            input.addEventListener('change', function() {
                const itemId = this.getAttribute('data-item-id');
                const propName = this.getAttribute('data-prop');
                const itemType = itemInfo.type;
                
                // Update the stored value
                if (selectedItems[itemType] && selectedItems[itemType].id === itemId) {
                    // Subtract old value
                    subtractItemStats(selectedItems[itemType]);
                    
                    // Update value
                    selectedItems[itemType].props[propName] = parseFloat(this.value);
                    
                    // Add new value
                    addItemStats(selectedItems[itemType]);
                    
                    // Update stats display
                    updateStatsDisplay();
                }
            });
            
            propContainer.appendChild(label);
            propContainer.appendChild(input);
            relativePanel.appendChild(propContainer);
        });
        
        // Add the panel after the options grid
        optionsGrid.parentNode.insertBefore(relativePanel, optionsGrid.nextSibling);
    }
    
    function addItemStats(item) {
        if (!item || !item.props) return;
        
        Object.entries(item.props).forEach(([key, value]) => {
            // Skip relative properties as they're handled separately
            if (key.startsWith('relative_')) return;
            
            // Initialize if not exists
            if (!accumulatedStats[key]) {
                accumulatedStats[key] = 0;
            }
            
            // Add the value
            accumulatedStats[key] += value;
        });
    }
    
    function subtractItemStats(item) {
        if (!item || !item.props) return;
        
        Object.entries(item.props).forEach(([key, value]) => {
            // Skip relative properties
            if (key.startsWith('relative_')) return;
            
            // Subtract the value if it exists
            if (accumulatedStats[key]) {
                accumulatedStats[key] -= value;
                
                // Remove property if zero
                if (accumulatedStats[key] === 0) {
                    delete accumulatedStats[key];
                }
            }
        });
    }
    
    function updateStatsDisplay() {
        // Check if stats display exists, create if not
        let statsDisplay = document.getElementById('stats-display');
        if (!statsDisplay) {
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
                leftSideContainer.style.display = 'flex';
                leftSideContainer.style.flexDirection = 'row';
                leftSideContainer.style.gap = '20px';
                
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
        }
        
        // Update the content
        let statsHTML = '<h3>Accumulated Stats</h3>';
        
        if (Object.keys(accumulatedStats).length === 0) {
            statsHTML += '<p>No stats accumulated yet</p>';
        } else {
            statsHTML += '<ul>';
            Object.entries(accumulatedStats).forEach(([key, value]) => {
                // Format the value based on type
                let displayValue = value;
                if (typeof value === 'string' && value !== '0') {
                    // For strings, don't append 0
                    displayValue = value;
                }
                statsHTML += `<li><strong>${key}:</strong> ${displayValue}</li>`;
            });
            statsHTML += '</ul>';
        }
        
        statsDisplay.innerHTML = statsHTML;
    }
});

item_info = {
    "4148": {
        "path": "image/items/alas/4148.png",
        "type": "alas",
        "props": {
            "hada": 40
        }
    },
    "4880": {
        "path": "image/items/alas/4880.png",
        "type": "alas",
        "props": {
            "hada": 5
        }
    },
    "588": {
        "path": "image/items/amuleto/588.png",
        "type": "amuleto",
        "props": {
            "aumentado": 250
        }
    },
    "660": {
        "path": "image/items/amuleto/660.png",
        "type": "amuleto",
        "props": {
            "aumentado": 150
        }
    },
    "661": {
        "path": "image/items/amuleto/661.png",
        "type": "amuleto",
        "props": {
            "aumentado": 250
        }
    },
    "4649": {
        "path": "image/items/anillo/4649.png",
        "type": "anillo",
        "props": {
            "aumentado": 30,
            "hada": 3
        }
    },
    "4974": {
        "path": "image/items/anillo/4974.png",
        "type": "anillo",
        "props": {
            "aumentado": 15,
            "hada": 2
        }
    },
    "4975": {
        "path": "image/items/anillo/4975.png",
        "type": "anillo",
        "props": {
            "aumentado": 50,
            "hada": 5,
            "elementos": 30
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
            "hada": 5
        }
    },
    "4964": {
        "path": "image/items/bota/4964.png",
        "type": "bota",
        "props": {
            "hada": 10
        }
    },
    "4650": {
        "path": "image/items/brazalete/4650.png",
        "type": "brazalete",
        "props": {
            "hada": 3,
            "aumentado": 30
        }
    },
    "4970": {
        "path": "image/items/brazalete/4970.png",
        "type": "brazalete",
        "props": {
            "hada": 5,
            "aumentado": 50,
            "elementos": 30
        }
    },
    "7101": {
        "path": "image/items/brazalete/7101.png",
        "type": "brazalete",
        "props": {
            "hada": 2,
            "aumentado": 15
        }
    },
    "4644": {
        "path": "image/items/collar/4644.png",
        "type": "collar",
        "props": {
            "hada": 4,
            "aumentado": 40
        }
    },
    "4978": {
        "path": "image/items/collar/4978.png",
        "type": "collar",
        "props": {
            "hada": 3,
            "aumentado": 20
        }
    },
    "4979": {
        "path": "image/items/collar/4979.png",
        "type": "collar",
        "props": {
            "hada": 7,
            "aumentado": 60,
            "elementos": 40
        }
    },
    "4869": {
        "path": "image/items/compa/4869.png",
        "type": "compa",
        "props": {
            "hada": 5,
            "s%": 5,
            "clase": "espada"
        }
    },
    "4870": {
        "path": "image/items/compa/4870.png",
        "type": "compa",
        "props": {
            "hada": 5,
            "crit_dmg": 20,
            "clase": "arquero"
        }
    },
    "4871": {
        "path": "image/items/compa/4871.png",
        "type": "compa",
        "props": {
            "hada": 5,
            "clase": "mago"
        }
    },
    "4856": {
        "path": "image/items/compa_sp/4856.png",
        "type": "compa_sp",
        "props": {
            "relative_hada": 10,
            "relative_s%": 20,
            "clase": "espada"
        }
    },
    "4912": {
        "path": "image/items/compa_sp/4912.png",
        "type": "compa_sp",
        "props": {
            "relative_s%": 7,
            "clase": "arquero"
        }
    },
    "7155": {
        "path": "image/items/compa_sp/7155.png",
        "type": "compa_sp",
        "props": {
            "relative_s%": 10,
            "clase": "mago"
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
            "prob_aumento_high": 10,
            "aumento_high": 30
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
            "SL_poder": 2,
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
            "hada": 5
        }
    },
    "4962": {
        "path": "image/items/guante/4962.png",
        "type": "guante",
        "props": {
            "hada": 10
        }
    },
    "4980": {
        "path": "image/items/hadas/4980.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80,
            "res": 3
        }
    },
    "4981": {
        "path": "image/items/hadas/4981.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80,
            "res": 3
        }
    },
    "4983": {
        "path": "image/items/hadas/4983.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80,
            "res": 3
        }
    },
    "4984": {
        "path": "image/items/hadas/4984.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80,
            "res": 3
        }
    },
    "987": {
        "path": "image/items/hadas/987.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80
        }
    },
    "988": {
        "path": "image/items/hadas/988.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80
        }
    },
    "989": {
        "path": "image/items/hadas/989.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80
        }
    },
    "993": {
        "path": "image/items/hadas/993.png",
        "type": "hadas",
        "props": {
            "relative_hada": 80
        }
    },
    "227": {
        "path": "image/items/mascara/227.png",
        "type": "mascara",
        "props": {
            "elementos": 10,
            "aumentado": 13
        }
    },
    "4966": {
        "path": "image/items/mascara/4966.png",
        "type": "mascara",
        "props": {
            "SL_poder": 2,
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
            "elementos": 205,
            "prob_aumento": 40,
            "aumento": 45,
            "relative_min_dmg": 916,
            "relative_max_dmg": 1015,
            "prob_crit": 27,
            "crit_dmg": 270,
            "clase": "artista"
        }
    },
    "4629": {
        "path": "image/items/primaria/4629.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elementos": 210,
            "prob_aumento": 40,
            "aumento": 45,
            "relative_min_dmg": 952,
            "relative_max_dmg": 1060,
            "prob_crit": 17,
            "crit_dmg": 280,
            "clase": "espada"
        }
    },
    "4631": {
        "path": "image/items/primaria/4631.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elementos": 300,
            "prob_aumento": 25,
            "aumento": 65,
            "relative_min_dmg": 939,
            "relative_max_dmg": 1074,
            "prob_crit": 0,
            "crit_dmg": 0,
            "clase": "mago"
        }
    },
    "4633": {
        "path": "image/items/primaria/4633.png",
        "type": "primaria",
        "props": {
            "res": 35,
            "elementos": 190,
            "prob_aumento": 30,
            "aumento": 60,
            "relative_min_dmg": 834,
            "relative_max_dmg": 1040,
            "prob_crit": 21,
            "crit_dmg": 290,
            "clase": "arquero"
        }
    },
    "4944": {
        "path": "image/items/primaria/4944.png",
        "type": "primaria",
        "props": {
            "res": 31,
            "elementos": 230,
            "prob_aumento": 40,
            "aumento": 40,
            "relative_min_dmg": 1043,
            "relative_max_dmg": 1162,
            "prob_crit": 17,
            "crit_dmg": 260,
            "clase": "espada"
        }
    },
    "4945": {
        "path": "image/items/primaria/4945.png",
        "type": "primaria",
        "props": {
            "res": 38,
            "elementos": 276,
            "prob_aumento": 40,
            "aumento": 50,
            "relative_min_dmg": 1252,
            "relative_max_dmg": 1394,
            "prob_crit": 20,
            "crit_dmg": 325,
            "clase": "espada"
        }
    },
    "4946": {
        "path": "image/items/primaria/4946.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elementos": 259,
            "prob_aumento": 35,
            "aumento": 60,
            "relative_min_dmg": 1096,
            "relative_max_dmg": 1368,
            "prob_crit": 26,
            "crit_dmg": 335,
            "clase": "arquero"
        }
    },
    "4947": {
        "path": "image/items/primaria/4947.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elementos": 216,
            "prob_aumento": 35,
            "aumento": 55,
            "relative_min_dmg": 913,
            "relative_max_dmg": 1140,
            "prob_crit": 21,
            "crit_dmg": 270,
            "clase": "arquero"
        }
    },
    "4948": {
        "path": "image/items/primaria/4948.png",
        "type": "primaria",
        "props": {
            "res": 38,
            "elementos": 300,
            "prob_aumento": 25,
            "aumento": 60,
            "relative_min_dmg": 1028,
            "relative_max_dmg": 1176,
            "clase": "mago"
        }
    },
    "4949": {
        "path": "image/items/primaria/4949.png",
        "type": "primaria",
        "props": {
            "res": 45,
            "elementos": 324,
            "prob_aumento": 30,
            "aumento": 65,
            "relative_min_dmg": 1234,
            "relative_max_dmg": 1411,
            "clase": "mago"
        }
    },
    "4950": {
        "path": "image/items/primaria/4950.png",
        "type": "primaria",
        "props": {
            "res": 33,
            "elementos": 240,
            "prob_aumento": 40,
            "aumento": 40,
            "relative_min_dmg": 1053,
            "relative_max_dmg": 1167,
            "prob_crit": 27,
            "crit_dmg": 250,
            "clase": "artista"
        }
    },
    "4951": {
        "path": "image/items/primaria/4951.png",
        "type": "primaria",
        "props": {
            "res": 40,
            "elementos": 246,
            "prob_aumento": 40,
            "aumento": 50,
            "relative_min_dmg": 1264,
            "relative_max_dmg": 1400,
            "prob_crit": 31,
            "crit_dmg": 310,
            "clase": "artista"
        }
    },
    "4635": {
        "path": "image/items/secundaria/4635.png",
        "type": "secundaria",
        "props": {
            "res": 27,
            "elementos": 30,
            "aumentado": 280,            "prob_aumento": 15,
            "aumento": 50,
            "relative_min_dmg": 843,
            "relative_max_dmg": 988,
            "prob_crit": 23,
            "crit_dmg": 265,
            "clase": "espada"
        }
    },
    "4637": {
        "path": "image/items/secundaria/4637.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "elementos": 20,
            "prob_aumento": 6,
            "aumento": 80,
            "relative_min_dmg": 679,
            "relative_max_dmg": 757,
            "prob_crit": 25,
            "crit_dmg": 437,
            "clase": "arquero"
        }
    },
    "4639": {
        "path": "image/items/secundaria/4639.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "elementos": 21,
            "prob_aumento": 30,
            "aumento": 45,
            "relative_min_dmg": 894,
            "relative_max_dmg": 1004,
            "prob_crit": 22,
            "crit_dmg": 292,
            "clase": "mago"
        }
    },
    "4641": {
        "path": "image/items/secundaria/4641.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "aumtado": 260,
            "prob_aumento": 10,
            "aumento": 70,
            "relative_min_dmg": 614,
            "relative_max_dmg": 796,
            "prob_crit": 20,
            "crit_dmg": 282,
            "clase": "artista"
        }
    },
    "4936": {
        "path": "image/items/secundaria/4936.png",
        "type": "secundaria",
        "props": {
            "res": 25,
            "aumentado": 290,
            "elementos": 30,
            "prob_aumento": 15,
            "aumento": 45,
            "relative_min_dmg": 969,
            "relative_max_dmg": 1136,
            "prob_crit": 23,
            "crit_dmg": 245,
            "clase": "espada"
        }
    },
    "4937": {
        "path": "image/items/secundaria/4937.png",
        "type": "secundaria",
        "props": {
            "res": 32,
            "aumentado": 320,
            "elementos": 36,
            "prob_aumento": 15,
            "aumento": 55,
            "relative_min_dmg": 1163,
            "relative_max_dmg": 1363,
            "prob_crit": 26,
            "crit_dmg": 315,
            "clase": "espada"
        }
    },
    "4938": {
        "path": "image/items/secundaria/4938.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "elementos": 20,
            "prob_aumento": 6,
            "aumento": 75,
            "relative_min_dmg": 830,
            "relative_max_dmg": 925,
            "prob_crit": 25,
            "crit_dmg": 417,
            "clase": "arquero"
        }
    },
    "4939": {
        "path": "image/items/secundaria/4939.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "elementos": 24,
            "prob_aumento": 10,
            "aumento": 85,
            "relative_min_dmg": 950,
            "relative_max_dmg": 1110,
            "prob_crit": 30,
            "crit_dmg": 497,
            "clase": "arquero"
        }
    },
    "4940": {
        "path": "image/items/secundaria/4940.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "elementos": 23,
            "prob_aumento": 30,
            "aumento": 40,
            "relative_min_dmg": 1028,
            "relative_max_dmg": 1155,
            "prob_crit": 22,
            "crit_dmg": 272,
            "clase": "mago"
        }
    },
    "4941": {
        "path": "image/items/secundaria/4941.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "elementos": 25,
            "prob_aumento": 30,
            "aumento": 55,
            "relative_min_dmg": 1234,
            "relative_max_dmg": 1386,
            "prob_crit": 26,
            "crit_dmg": 322,
            "clase": "mago"
        }
    },
    "4942": {
        "path": "image/items/secundaria/4942.png",
        "type": "secundaria",
        "props": {
            "res": 23,
            "aumentado": 270,
            "prob_aumento": 10,
            "aumento": 65,
            "relative_min_dmg": 706,
            "relative_max_dmg": 915,
            "prob_crit": 20,
            "crit_dmg": 262,
            "clase": "artista"
        }
    },
    "4943": {
        "path": "image/items/secundaria/4943.png",
        "type": "secundaria",
        "props": {
            "res": 30,
            "aumentado": 300,
            "prob_aumento": 10,
            "aumento": 65,
            "relative_min_dmg": 847,
            "relative_max_dmg": 1098,
            "prob_crit": 24,
            "crit_dmg": 318,
            "clase": "artista"
        }
    },
    "2918": {
        "path": "image/items/skin/2918.png",
        "type": "skin",
        "props": {
            "prob_aumento_high": 30,
            "aumento_high": 10
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
            "clase": "espada",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2545": {
        "path": "image/items/SP/2545.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2546": {
        "path": "image/items/SP/2546.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2588": {
        "path": "image/items/SP/2588.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2589": {
        "path": "image/items/SP/2589.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2590": {
        "path": "image/items/SP/2590.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2654": {
        "path": "image/items/SP/2654.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2655": {
        "path": "image/items/SP/2655.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "secundaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2656": {
        "path": "image/items/SP/2656.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2706": {
        "path": "image/items/SP/2706.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2707": {
        "path": "image/items/SP/2707.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "secundaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "2708": {
        "path": "image/items/SP/2708.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4048": {
        "path": "image/items/SP/4048.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4093": {
        "path": "image/items/SP/4093.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4126": {
        "path": "image/items/SP/4126.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4151": {
        "path": "image/items/SP/4151.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4494": {
        "path": "image/items/SP/4494.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4495": {
        "path": "image/items/SP/4495.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4496": {
        "path": "image/items/SP/4496.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4497": {
        "path": "image/items/SP/4497.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4860": {
        "path": "image/items/SP/4860.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4861": {
        "path": "image/items/SP/4861.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4862": {
        "path": "image/items/SP/4862.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "4863": {
        "path": "image/items/SP/4863.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "7138": {
        "path": "image/items/SP/7138.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "7139": {
        "path": "image/items/SP/7139.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "7140": {
        "path": "image/items/SP/7140.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "secundaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "7141": {
        "path": "image/items/SP/7141.png",
        "type": "SP",
        "props": {
            "clase": "artista",
            "arma": "secundaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "901": {
        "path": "image/items/SP/901.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "902": {
        "path": "image/items/SP/902.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "903": {
        "path": "image/items/SP/903.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "904": {
        "path": "image/items/SP/904.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "secundaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "905": {
        "path": "image/items/SP/905.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "906": {
        "path": "image/items/SP/906.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "909": {
        "path": "image/items/SP/909.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "secundaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "910": {
        "path": "image/items/SP/910.png",
        "type": "SP",
        "props": {
            "clase": "espada",
            "arma": "primaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "911": {
        "path": "image/items/SP/911.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "FIRE",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "912": {
        "path": "image/items/SP/912.png",
        "type": "SP",
        "props": {
            "clase": "arquero",
            "arma": "primaria",
            "element": "LIGHT",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "913": {
        "path": "image/items/SP/913.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "primaria",
            "element": "WATER",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    },
    "914": {
        "path": "image/items/SP/914.png",
        "type": "SP",
        "props": {
            "clase": "mago",
            "arma": "secundaria",
            "element": "SHADOW",
            "relative_SL_daño": 0,
            "relative_SL_defensa": 0,
            "relative_SL_poder": 0,
            "relative_SL_energia": 0,
            "relative_pp_daño": 0,
            "relative_pp_defensa": 0,
            "relative_pp_poder": 0,
            "relative_pp_energia": 0
        }
    }
}