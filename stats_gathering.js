
document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const optionsPanel = document.getElementById('options-panel');
    const optionsGrid = document.getElementById('options-grid');
    let currentSelectedItem = null;
    
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
            });
            
            optionsGrid.appendChild(optionElement);
        });
    }
});

item_info = {
    "4148": {
        "path": "image/items/alas/4148.png",
        "type": "alas"
    },
    "4880": {
        "path": "image/items/alas/4880.png",
        "type": "alas"
    },
    "588": {
        "path": "image/items/amuleto/588.png",
        "type": "amuleto"
    },
    "660": {
        "path": "image/items/amuleto/660.png",
        "type": "amuleto"
    },
    "661": {
        "path": "image/items/amuleto/661.png",
        "type": "amuleto"
    },
    "4649": {
        "path": "image/items/anillo/4649.png",
        "type": "anillo"
    },
    "4974": {
        "path": "image/items/anillo/4974.png",
        "type": "anillo"
    },
    "4975": {
        "path": "image/items/anillo/4975.png",
        "type": "anillo"
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
        "type": "bota"
    },
    "4964": {
        "path": "image/items/bota/4964.png",
        "type": "bota"
    },
    "4650": {
        "path": "image/items/brazalete/4650.png",
        "type": "brazalete"
    },
    "4970": {
        "path": "image/items/brazalete/4970.png",
        "type": "brazalete"
    },
    "7101": {
        "path": "image/items/brazalete/7101.png",
        "type": "brazalete"
    },
    "4644": {
        "path": "image/items/collar/4644.png",
        "type": "collar"
    },
    "4978": {
        "path": "image/items/collar/4978.png",
        "type": "collar"
    },
    "4979": {
        "path": "image/items/collar/4979.png",
        "type": "collar"
    },
    "4869": {
        "path": "image/items/compa/4869.png",
        "type": "compa"
    },
    "4870": {
        "path": "image/items/compa/4870.png",
        "type": "compa"
    },
    "4871": {
        "path": "image/items/compa/4871.png",
        "type": "compa"
    },
    "4856": {
        "path": "image/items/compa_sp/4856.png",
        "type": "compa_sp"
    },
    "4912": {
        "path": "image/items/compa_sp/4912.png",
        "type": "compa_sp"
    },
    "7155": {
        "path": "image/items/compa_sp/7155.png",
        "type": "compa_sp"
    },
    "4883": {
        "path": "image/items/disfraz/4883.png",
        "type": "disfraz"
    },
    "4933": {
        "path": "image/items/disfraz/4933.png",
        "type": "disfraz"
    },
    "7130": {
        "path": "image/items/disfraz/7130.png",
        "type": "disfraz"
    },
    "4625": {
        "path": "image/items/gorro/4625.png",
        "type": "gorro"
    },
    "4960": {
        "path": "image/items/gorro/4960.png",
        "type": "gorro"
    },
    "4882": {
        "path": "image/items/gorro_disfraz/4882.png",
        "type": "gorro_disfraz"
    },
    "4934": {
        "path": "image/items/gorro_disfraz/4934.png",
        "type": "gorro_disfraz"
    },
    "7131": {
        "path": "image/items/gorro_disfraz/7131.png",
        "type": "gorro_disfraz"
    },
    "4665": {
        "path": "image/items/guante/4665.png",
        "type": "guante"
    },
    "4962": {
        "path": "image/items/guante/4962.png",
        "type": "guante"
    },
    "4980": {
        "path": "image/items/hadas/4980.png",
        "type": "hadas"
    },
    "4981": {
        "path": "image/items/hadas/4981.png",
        "type": "hadas"
    },
    "4983": {
        "path": "image/items/hadas/4983.png",
        "type": "hadas"
    },
    "4984": {
        "path": "image/items/hadas/4984.png",
        "type": "hadas"
    },
    "987": {
        "path": "image/items/hadas/987.png",
        "type": "hadas"
    },
    "988": {
        "path": "image/items/hadas/988.png",
        "type": "hadas"
    },
    "989": {
        "path": "image/items/hadas/989.png",
        "type": "hadas"
    },
    "993": {
        "path": "image/items/hadas/993.png",
        "type": "hadas"
    },
    "227": {
        "path": "image/items/mascara/227.png",
        "type": "mascara"
    },
    "4966": {
        "path": "image/items/mascara/4966.png",
        "type": "mascara"
    },
    "4145": {
        "path": "image/items/mascota/4145.png",
        "type": "mascota"
    },
    "4872": {
        "path": "image/items/mascota/4872.png",
        "type": "mascota"
    },
    "4854": {
        "path": "image/items/mascota/4854.png",
        "type": "mascota"
    },
    "4930": {
        "path": "image/items/mascota/4930.png",
        "type": "mascota"
    },
    "7133": {
        "path": "image/items/mascota/7133.png",
        "type": "mascota"
    },
    "7338": {
        "path": "image/items/mascota/7338.png",
        "type": "mascota"
    },
    "7156": {
        "path": "image/items/mini_pet/7156.png",
        "type": "mini_pet"
    },
    "7328": {
        "path": "image/items/mini_pet/7328.png",
        "type": "mini_pet"
    },
    "4627": {
        "path": "image/items/primaria/4627.png",
        "type": "primaria"
    },
    "4629": {
        "path": "image/items/primaria/4629.png",
        "type": "primaria"
    },
    "4631": {
        "path": "image/items/primaria/4631.png",
        "type": "primaria"
    },
    "4633": {
        "path": "image/items/primaria/4633.png",
        "type": "primaria"
    },
    "4944": {
        "path": "image/items/primaria/4944.png",
        "type": "primaria"
    },
    "4945": {
        "path": "image/items/primaria/4945.png",
        "type": "primaria"
    },
    "4946": {
        "path": "image/items/primaria/4946.png",
        "type": "primaria"
    },
    "4947": {
        "path": "image/items/primaria/4947.png",
        "type": "primaria"
    },
    "4948": {
        "path": "image/items/primaria/4948.png",
        "type": "primaria"
    },
    "4949": {
        "path": "image/items/primaria/4949.png",
        "type": "primaria"
    },
    "4950": {
        "path": "image/items/primaria/4950.png",
        "type": "primaria"
    },
    "4951": {
        "path": "image/items/primaria/4951.png",
        "type": "primaria"
    },
    "4635": {
        "path": "image/items/secundaria/4635.png",
        "type": "secundaria"
    },
    "4637": {
        "path": "image/items/secundaria/4637.png",
        "type": "secundaria"
    },
    "4639": {
        "path": "image/items/secundaria/4639.png",
        "type": "secundaria"
    },
    "4641": {
        "path": "image/items/secundaria/4641.png",
        "type": "secundaria"
    },
    "4936": {
        "path": "image/items/secundaria/4936.png",
        "type": "secundaria"
    },
    "4937": {
        "path": "image/items/secundaria/4937.png",
        "type": "secundaria"
    },
    "4938": {
        "path": "image/items/secundaria/4938.png",
        "type": "secundaria"
    },
    "4939": {
        "path": "image/items/secundaria/4939.png",
        "type": "secundaria"
    },
    "4940": {
        "path": "image/items/secundaria/4940.png",
        "type": "secundaria"
    },
    "4941": {
        "path": "image/items/secundaria/4941.png",
        "type": "secundaria"
    },
    "4942": {
        "path": "image/items/secundaria/4942.png",
        "type": "secundaria"
    },
    "4943": {
        "path": "image/items/secundaria/4943.png",
        "type": "secundaria"
    },
    "2918": {
        "path": "image/items/skin/2918.png",
        "type": "skin"
    },
    "4874": {
        "path": "image/items/skin/4874.png",
        "type": "skin"
    },
    "4922": {
        "path": "image/items/skin/4922.png",
        "type": "skin"
    },
    "7120": {
        "path": "image/items/skin/7120.png",
        "type": "skin"
    },
    "7301": {
        "path": "image/items/skin/7301.png",
        "type": "skin"
    },
    "2544": {
        "path": "image/items/SP/2544.png",
        "type": "SP"
    },
    "2545": {
        "path": "image/items/SP/2545.png",
        "type": "SP"
    },
    "2546": {
        "path": "image/items/SP/2546.png",
        "type": "SP"
    },
    "2588": {
        "path": "image/items/SP/2588.png",
        "type": "SP"
    },
    "2589": {
        "path": "image/items/SP/2589.png",
        "type": "SP"
    },
    "2590": {
        "path": "image/items/SP/2590.png",
        "type": "SP"
    },
    "2654": {
        "path": "image/items/SP/2654.png",
        "type": "SP"
    },
    "2655": {
        "path": "image/items/SP/2655.png",
        "type": "SP"
    },
    "2656": {
        "path": "image/items/SP/2656.png",
        "type": "SP"
    },
    "2706": {
        "path": "image/items/SP/2706.png",
        "type": "SP"
    },
    "2707": {
        "path": "image/items/SP/2707.png",
        "type": "SP"
    },
    "2708": {
        "path": "image/items/SP/2708.png",
        "type": "SP"
    },
    "4048": {
        "path": "image/items/SP/4048.png",
        "type": "SP"
    },
    "4093": {
        "path": "image/items/SP/4093.png",
        "type": "SP"
    },
    "4126": {
        "path": "image/items/SP/4126.png",
        "type": "SP"
    },
    "4151": {
        "path": "image/items/SP/4151.png",
        "type": "SP"
    },
    "4494": {
        "path": "image/items/SP/4494.png",
        "type": "SP"
    },
    "4495": {
        "path": "image/items/SP/4495.png",
        "type": "SP"
    },
    "4496": {
        "path": "image/items/SP/4496.png",
        "type": "SP"
    },
    "4497": {
        "path": "image/items/SP/4497.png",
        "type": "SP"
    },
    "4860": {
        "path": "image/items/SP/4860.png",
        "type": "SP"
    },
    "4861": {
        "path": "image/items/SP/4861.png",
        "type": "SP"
    },
    "4862": {
        "path": "image/items/SP/4862.png",
        "type": "SP"
    },
    "4863": {
        "path": "image/items/SP/4863.png",
        "type": "SP"
    },
    "7138": {
        "path": "image/items/SP/7138.png",
        "type": "SP"
    },
    "7139": {
        "path": "image/items/SP/7139.png",
        "type": "SP"
    },
    "7140": {
        "path": "image/items/SP/7140.png",
        "type": "SP"
    },
    "7141": {
        "path": "image/items/SP/7141.png",
        "type": "SP"
    },
    "901": {
        "path": "image/items/SP/901.png",
        "type": "SP"
    },
    "902": {
        "path": "image/items/SP/902.png",
        "type": "SP"
    },
    "903": {
        "path": "image/items/SP/903.png",
        "type": "SP"
    },
    "904": {
        "path": "image/items/SP/904.png",
        "type": "SP"
    },
    "905": {
        "path": "image/items/SP/905.png",
        "type": "SP"
    },
    "906": {
        "path": "image/items/SP/906.png",
        "type": "SP"
    },
    "909": {
        "path": "image/items/SP/909.png",
        "type": "SP"
    },
    "910": {
        "path": "image/items/SP/910.png",
        "type": "SP"
    },
    "911": {
        "path": "image/items/SP/911.png",
        "type": "SP"
    },
    "912": {
        "path": "image/items/SP/912.png",
        "type": "SP"
    },
    "913": {
        "path": "image/items/SP/913.png",
        "type": "SP"
    },
    "914": {
        "path": "image/items/SP/914.png",
        "type": "SP"
    }
}