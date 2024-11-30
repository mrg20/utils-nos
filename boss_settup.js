function loadRaidSetup() {
    const html = `
    <style>
        .section {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
        }
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        .image-option {
            border: 2px solid transparent;
            cursor: pointer;
            padding: 5px;
        }
        .image-option img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .image-option.selected {
            border-color: #2196F3;
        }
        h3 {
            margin-bottom: 10px;
        }
    </style>
    <div class="section">
        <h3>Boss</h3>
        <div class="image-grid" id="boss-grid">
            <div class="image-option" onclick="selectBoss(this)">
                <img src="boss_img/poluto.png" alt="poluto">
            </div>
            <div class="image-option" onclick="selectBoss(this)">
                <img src="boss_img/meca.png" alt="mecanico">
            </div>
            <div class="image-option" onclick="selectBoss(this)">
                <img src="boss_img/completo.png" alt="completo">
            </div>
            <div class="image-option" onclick="selectBoss(this)">
                <img src="boss_img/valehir.png" alt="valehir">
            </div>
            <div class="image-option" onclick="selectBoss(this)">
                <img src="boss_img/alzanor.png" alt="alzanor">
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Buffs</h3>
        <div class="image-grid" id="buffs-grid">
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/brillo.png" alt="brillo">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/holly.png" alt="holly">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/lobo.png" alt="lobo">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/sader.png" alt="sader">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/sol.png" alt="sol">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="buff_img/forta.png" alt="forta">
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Debuffs</h3>
        <div class="image-grid" id="debuffs-grid">
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/aliento.png" alt="aliento">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/canto.png" alt="canto">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/ele_down_4.png" alt="ele_down_4">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/ele_down_5.png" alt="ele_down_5">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/gas_ulti.png" alt="gas_ulti">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/gas.png" alt="gas">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/last holy.png" alt="last holy">
            </div>
            <div class="image-option" onclick="toggleSelection(this)">
                <img src="debuff_img/ruptura.png" alt="ruptura">
            </div>
        </div>
    </div>
    `;
    document.getElementById('bossSettings').innerHTML = html;
}

function selectBoss(element) {
    // Remove selection from other boss images
    document.querySelectorAll('#boss-grid .image-option').forEach(el => {
        el.classList.remove('selected');
    });
    // Select clicked boss
    element.classList.add('selected');
}

function toggleSelection(element) {
    // Toggle selection for buffs and debuffs
    element.classList.toggle('selected');
}

loadRaidSetup();
