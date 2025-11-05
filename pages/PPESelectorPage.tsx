import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const PPESelectorPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive PPE Selector</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --arc-primary: #f59e0b;
            --arc-bg: #1f2937;
            --arc-panel-bg: rgba(31, 41, 55, 0.9);
            --arc-border: rgba(245, 158, 11, 0.3);
            --arc-text-muted: #fbbf24;
            --shock-primary: #3b82f6;
            --shock-bg: #1e1b4b;
            --shock-panel-bg: rgba(30, 27, 75, 0.9);
            --shock-border: rgba(59, 130, 246, 0.3);
            --shock-text-muted: #93c5fd;
            --text-color: #f9fafb;
            --bg-color: #030712;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; transition: background-color 0.5s, color 0.5s, border-color 0.5s; }
        html, body { height: 100%; overflow: hidden; background: var(--bg-color); }
        body { color: var(--text-color); display: flex; flex-direction: column; padding: 10px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); display: flex; flex-direction: column; overflow-y: auto; }
        .left-panel { flex: 1; min-width: 300px; max-width: 400px; }
        .right-panel { flex: 1; min-width: 300px; max-width: 420px; }
        .panel-title { font-size: 1.5rem; margin-bottom: 20px; text-align: center; text-shadow: 0 0 10px; padding-bottom: 10px; border-bottom: 1px solid; }
        .mode-switcher { display: flex; border: 1px solid; border-radius: 10px; margin-bottom: 20px; }
        .mode-switcher button { flex: 1; background: transparent; border: none; padding: 12px; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .mode-switcher button:first-child { border-radius: 9px 0 0 9px; }
        .mode-switcher button:last-child { border-radius: 0 9px 9px 0; }
        .mode-switcher button.active { color: #030712; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
        .control-group { margin-bottom: 20px; }
        .control-label { display: block; margin-bottom: 10px; font-size: 1rem; font-weight: 500; }
        
        /* --- Dropdown Styling --- */
        select { 
            width: 100%; 
            padding: 12px; 
            border: 1px solid;
            border-radius: 8px; 
            font-size: 1rem; 
            -webkit-appearance: none; 
            appearance: none; 
            background-repeat: no-repeat; 
            background-position: right 0.7rem center; 
            background-size: 8px 10px;
            color: var(--text-color);
        }
        select option { color: var(--text-color); }
        select optgroup { font-weight: bold; font-style: italic; }
        
        .visualization-area { position: relative; flex: 2; min-width: 400px; border-radius: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid; }
        #ppeSvg { width: 100%; height: 100%; max-width: 400px; }
        #ppeSvg .figure { fill: #4b5563; stroke: #6b7280; stroke-width: 2; }
        #ppeSvg .ppe-item { opacity: 0; transform-origin: center; transform: scale(0.8); transition: opacity 0.4s ease, transform 0.4s ease; }
        #ppeSvg .ppe-item.equipped { opacity: 1; transform: scale(1); }

        /* --- Arc Flash Mode --- */
        .arc-mode { background: var(--arc-bg); }
        .arc-mode .panel { background: var(--arc-panel-bg); border-color: var(--arc-border); }
        .arc-mode .panel-title { color: var(--arc-primary); text-shadow-color: var(--arc-primary); border-color: var(--arc-border); }
        .arc-mode .mode-switcher { border-color: var(--arc-border); }
        .arc-mode .mode-switcher button { color: var(--arc-text-muted); }
        .arc-mode .mode-switcher button.active { background: var(--arc-primary); }
        .arc-mode .control-label { color: var(--arc-text-muted); }
        .arc-mode select { background-color: var(--arc-bg); border-color: var(--arc-border); background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23fbbf24' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e"); }
        .arc-mode select option, .arc-mode select optgroup { background-color: var(--arc-bg); }
        .arc-mode select optgroup { color: var(--arc-primary); }
        .arc-mode .visualization-area { background: radial-gradient(ellipse at center, #373027, var(--bg-color)); border-color: var(--arc-border); }
        .arc-mode #info-rating span { color: var(--arc-primary); }
        .arc-mode .info-list-item { border-left-color: var(--arc-primary); background: rgba(245,158,11,0.08); }
        .arc-mode .info-list-item i { color: var(--arc-primary); }
        .arc-mode .key-considerations { border-left-color: var(--arc-primary); }

        /* --- Shock Mode --- */
        .shock-mode { background: var(--shock-bg); }
        .shock-mode .panel { background: var(--shock-panel-bg); border-color: var(--shock-border); }
        .shock-mode .panel-title { color: var(--shock-primary); text-shadow-color: var(--shock-primary); border-color: var(--shock-border); }
        .shock-mode .mode-switcher { border-color: var(--shock-border); }
        .shock-mode .mode-switcher button { color: var(--shock-text-muted); }
        .shock-mode .mode-switcher button.active { background: var(--shock-primary); }
        .shock-mode .control-label { color: var(--shock-text-muted); }
        .shock-mode select { background-color: var(--shock-bg); border-color: var(--shock-border); background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%2393c5fd' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e"); }
        .shock-mode select option, .shock-mode select optgroup { background-color: var(--shock-bg); }
        .shock-mode select optgroup { color: var(--shock-primary); }
        .shock-mode .visualization-area { background: radial-gradient(ellipse at center, #1e294b, var(--bg-color)); border-color: var(--shock-border); }
        .shock-mode #info-rating span { color: var(--shock-primary); }
        .shock-mode .info-list-item { border-left-color: var(--shock-primary); background: rgba(59,130,246,0.08); }
        .shock-mode .info-list-item i { color: var(--shock-primary); }
        .shock-mode .key-considerations { border-left-color: var(--shock-primary); }
        
        #info-content { flex-grow: 1; display: flex; flex-direction: column; }
        #info-rating { text-align: center; font-size: 1.1rem; font-weight: bold; padding: 10px; border-radius: 8px; margin-bottom: 15px; }
        #info-rating span { font-size: 1.3rem; }
        #info-list-container { flex-grow: 1; }
        #info-list-container h3 { font-size: 1.2rem; margin-bottom: 10px; }
        #info-list { list-style: none; padding-left: 0; }
        .info-list-item { margin-bottom: 8px; padding: 10px; border-radius: 0 8px 8px 0; display: flex; align-items: center; gap: 12px; border-left: 4px solid; }
        .info-list-item i { width: 24px; text-align: center; font-size: 1.1rem; }
        .key-considerations { margin-top: 15px; padding: 12px; padding-top: 15px; border-left: 4px solid; font-size: 0.85rem; line-height: 1.5; border-radius: 0 8px 8px 0; }
        .key-considerations h4 { font-size: 1rem; margin-bottom: 8px; }
        .key-considerations ul { list-style-position: inside; padding-left: 5px; }
        .key-considerations li { margin-bottom: 5px; }
        .disclaimer-box {
            padding: 12px; 
            margin-top: 15px;
            background: rgba(127, 29, 29, 0.2); 
            border-top: 2px solid #ef4444; 
            font-size: 0.85rem; 
            line-height: 1.4;
            color: #fca5a5;
            text-align: center;
        }
        .disclaimer-box strong { color: #f87171; }
        @media (max-width: 1024px) {
            body { padding: 5px; overflow: auto; }
            .container { flex-direction: column; height: auto; }
            .panel { max-width: 100%; }
            .visualization-area { min-height: 60vh; }
        }
        @media (max-width: 768px) {
            .mode-switcher { flex-direction: column; }
        }
    </style>
</head>
<body class="arc-mode" data-mode="arc">
    <div class="container">
        <!-- Left Panel: Controls -->
        <div class="panel left-panel">
            <h2 class="panel-title">PPE Selector</h2>
            <div class="mode-switcher">
                <button id="mode-arc" class="active"><i class="fas fa-explosion"></i> Arc Flash</button>
                <button id="mode-shock"><i class="fas fa-bolt"></i> Shock</button>
            </div>

            <!-- Arc Flash Controls -->
            <div id="arc-controls">
                <div class="control-group">
                    <label for="arc-category-select" class="control-label">Select Arc Flash PPE Category</label>
                    <select id="arc-category-select">
                        <option value="cat1">CAT 1 (≥ 4 cal/cm²)</option>
                        <option value="cat2" selected>CAT 2 (≥ 8 cal/cm²)</option>
                        <option value="cat3">CAT 3 (≥ 25 cal/cm²)</option>
                        <option value="cat4">CAT 4 (≥ 40 cal/cm²)</option>
                    </select>
                </div>
            </div>

            <!-- Shock Protection Controls -->
            <div id="shock-controls" style="display: none;">
                <div class="control-group">
                    <label for="shock-voltage-select" class="control-label">Select Voltage Class</label>
                    <select id="shock-voltage-select">
                        <option value="v_low">Low Voltage (&lt;1000V)</option>
                        <option value="v_high">High Voltage (≥1000V)</option>
                    </select>
                </div>
                 <div class="control-group">
                    <label for="shock-gloves-select" class="control-label">Select Glove Class</label>
                    <select id="shock-gloves-select">
                        <option value="g00">Class 00 (500V AC)</option>
                        <option value="g0" selected>Class 0 (1,000V AC)</option>
                        <option value="g1">Class 1 (7,500V AC)</option>
                        <option value="g2">Class 2 (17,000V AC)</option>
                        <option value="g3">Class 3 (26,500V AC)</option>
                        <option value="g4">Class 4 (36,000V AC)</option>
                    </select>
                </div>
            </div>
             <div class="disclaimer-box">
                <strong><i class="fas fa-exclamation-triangle"></i> For Educational Use Only:</strong> This guide simplifies PPE selection. Always perform a detailed hazard analysis and consult NFPA 70E.
            </div>
        </div>

        <!-- Middle Panel: Visualization -->
        <div class="visualization-area">
            <svg id="ppeSvg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                <!-- Base Figure -->
                <g class="figure">
                    <rect x="150" y="100" width="100" height="120" rx="10"/> <circle cx="200" cy="70" r="30"/>
                    <rect x="160" y="220" width="80" height="150"/> <rect x="160" y="370" width="30" height="150"/> <rect x="210" y="370" width="30" height="150"/>
                </g>
                <!-- PPE Items -->
                <g id="ppe-helmet" class="ppe-item"><path d="M160 30 Q200 10 240 30 L230 60 H170 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/></g>
                <g id="ppe-faceshield" class="ppe-item"><rect x="150" y="50" width="100" height="80" rx="10" fill="rgba(147, 197, 253, 0.6)" stroke="#3b82f6" stroke-width="2"/></g>
                <g id="ppe-balaclava" class="ppe-item"><rect x="165" y="45" width="70" height="65" rx="20" fill="#6b7280" stroke="#4b5563" stroke-width="2"/><circle cx="200" cy="70" r="25" fill="#1f2937"/></g>
                <g id="ppe-shirt" class="ppe-item"><path d="M120 120 L160 100 L160 220 L120 240 Z M280 120 L240 100 L240 220 L280 240 Z M160 100 H240 L230 130 H170 Z M160 220 H240 V300 H160Z" fill="#d97706" stroke="#b45309" stroke-width="2"/></g>
                <g id="ppe-bibs" class="ppe-item"><path d="M160 280 H240 V370 H210 V300 H190 V370 H160Z M160 370 H180 L170 520 H150 Z M240 370 H220 L230 520 H250Z" fill="#d97706" stroke="#b45309" stroke-width="2"/></g>
                <g id="ppe-suit" class="ppe-item"><path d="M120 120 L160 100 H240 L280 120 L280 240 L240 220 V520 H220 V380 H180 V520 H160 V220 L120 240Z" fill="#9a3412" stroke="#7c2d12" stroke-width="2"/></g>
                <g id="ppe-gloves" class="ppe-item"><path d="M100 230 L120 240 L160 220 V320 L100 330Z M300 230 L280 240 L240 220 V320 L300 330Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/></g>
                <g id="ppe-boots" class="ppe-item"><path d="M150 510 H180 L170 550 H140Z M250 510 H220 L230 550 H260Z" fill="#444" stroke="#222" stroke-width="2"/></g>
            </svg>
        </div>

        <!-- Right Panel: Information -->
        <div class="panel right-panel">
            <h2 class="panel-title">Required Equipment</h2>
            <div id="info-content">
                <div id="info-rating"><span></span></div>
                <div id="info-list-container">
                    <h3>Minimum PPE Items:</h3>
                    <ul id="info-list"></ul>
                </div>
                <div id="key-considerations" class="key-considerations"></div>
            </div>
        </div>
    </div>

    <script>
        const ppeData = {
            arc: {
                cat1: { rating: "CAT 1 (≥ 4 cal/cm²)", ppe: ['helmet', 'faceshield', 'shirt'], considerations: "FR Shirt and pants or FR coverall." },
                cat2: { rating: "CAT 2 (≥ 8 cal/cm²)", ppe: ['helmet', 'balaclava', 'faceshield', 'shirt', 'bibs'], considerations: "AR Balaclava, AR shirt & pants, or AR coverall." },
                cat3: { rating: "CAT 3 (≥ 25 cal/cm²)", ppe: ['helmet', 'balaclava', 'suit', 'gloves'], considerations: "AR flash suit jacket and pants, or AR flash suit coverall." },
                cat4: { rating: "CAT 4 (≥ 40 cal/cm²)", ppe: ['helmet', 'balaclava', 'suit', 'gloves'], considerations: "AR flash suit jacket and pants, or AR flash suit coverall. May require double-layer flash suit." }
            },
            shock: {
                v_low: { rating: "Low Voltage (&lt;1000V)", ppe: ['gloves', 'boots'], considerations: "Insulated gloves must be rated for the voltage. Leather protectors must be worn over rubber gloves." },
                v_high: { rating: "High Voltage (≥1000V)", ppe: ['helmet', 'faceshield', 'gloves', 'boots'], considerations: "Insulated gloves and leather protectors are critical. Use of insulated tools and equipment is required." }
            }
        };

        const ppeItems = {
            helmet: { icon: "fa-hard-hat", text: "Hard Hat (Non-conductive)" },
            faceshield: { icon: "fa-mask-face", text: "AR Face Shield" },
            balaclava: { icon: "fa-head-side-mask", text: "AR Balaclava / Hood" },
            shirt: { icon: "fa-shirt", text: "AR Shirt & Pants or Coverall" },
            bibs: { icon: "fa-person-digging", text: "AR Bib Overalls" },
            suit: { icon: "fa-user-astronaut", text: "AR Flash Suit (Jacket & Pants)" },
            gloves: { icon: "fa-hand-sparkles", text: "Insulated Gloves & Protectors" },
            boots: { icon: "fa-shoe-prints", text: "Dielectric Footwear" }
        };

        function switchMode(mode) {
            document.body.dataset.mode = mode;
            document.body.className = mode + '-mode';
            document.getElementById('mode-arc').classList.toggle('active', mode === 'arc');
            document.getElementById('mode-shock').classList.toggle('active', mode === 'shock');
            document.getElementById('arc-controls').style.display = mode === 'arc' ? 'block' : 'none';
            document.getElementById('shock-controls').style.display = mode === 'shock' ? 'block' : 'none';
            updatePPE();
        }

        function updatePPE() {
            const mode = document.body.dataset.mode;
            let data, rating, keyConsiderations;
            let requiredItems = [];

            if (mode === 'arc') {
                const cat = document.getElementById('arc-category-select').value;
                data = ppeData.arc[cat];
                rating = data.rating;
                keyConsiderations = \`<h4>Key Considerations:</h4><ul><li>\${data.considerations}</li><li>Safety glasses and hearing protection are always required.</li></ul>\`;
                requiredItems = data.ppe;
            } else { // shock
                const voltage = document.getElementById('shock-voltage-select').value;
                const gloveClass = document.getElementById('shock-gloves-select').value;
                data = ppeData.shock[voltage];
                rating = data.rating;
                keyConsiderations = \`<h4>Key Considerations:</h4><ul><li>\${data.considerations}</li><li>Selected Glove: <strong>\${gloveClass.substring(1)}</strong>. Ensure it's rated higher than the work voltage.</li><li>Gloves must be visually inspected and air-tested before each use.</li></ul>\`;
                requiredItems = data.ppe;
            }

            document.getElementById('info-rating').innerHTML = \`Selected: <span>\${rating}</span>\`;
            document.getElementById('key-considerations').innerHTML = keyConsiderations;
            
            const listEl = document.getElementById('info-list');
            listEl.innerHTML = '';
            requiredItems.forEach(itemKey => {
                const item = ppeItems[itemKey];
                listEl.innerHTML += \`<li class="info-list-item"><i class="fas \${item.icon}"></i> <span>\${item.text}</span></li>\`;
            });
             if (!requiredItems.includes('boots')) {
                listEl.innerHTML += \`<li class="info-list-item"><i class="fas fa-shoe-prints"></i> <span>Leather Footwear</span></li>\`;
             }

            // Update SVG
            Object.keys(ppeItems).forEach(itemKey => {
                const svgEl = document.getElementById('ppe-' + itemKey);
                if (svgEl) {
                    svgEl.classList.toggle('equipped', requiredItems.includes(itemKey));
                }
            });
        }
        
        document.getElementById('mode-arc').addEventListener('click', () => switchMode('arc'));
        document.getElementById('mode-shock').addEventListener('click', () => switchMode('shock'));
        document.getElementById('arc-category-select').addEventListener('change', updatePPE);
        document.getElementById('shock-voltage-select').addEventListener('change', updatePPE);
        document.getElementById('shock-gloves-select').addEventListener('change', updatePPE);
        
        // Initial setup
        switchMode('arc');
    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default PPESelectorPage;