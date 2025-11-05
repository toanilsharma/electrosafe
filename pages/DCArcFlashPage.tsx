import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const DCArcFlashPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DC Arc Flash Hazard Simulator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        html, body {
            height: 100%;
            overflow: hidden;
            background: #000;
        }
        body {
            background: linear-gradient(135deg, #2a1a0a, #2e2e1a);
            color: #fff;
            display: flex;
            flex-direction: column;
            padding: 10px;
        }
        .container {
            display: flex;
            flex: 1;
            gap: 15px;
            width: 100%;
            max-width: 1800px;
            margin: 0 auto;
            min-height: 0;
        }
        header {
            text-align: center;
            padding-bottom: 10px;
            position: relative;
        }
        h1 {
            font-size: clamp(1.5rem, 3vw, 2rem);
            margin-bottom: 5px;
            background: linear-gradient(90deg, #ffcc00, #ffaa00);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
        }
        .subtitle {
            color: #ffddaa;
            font-size: clamp(0.8rem, 1.5vw, 1rem);
            margin-bottom: 10px;
        }
        .standards {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .standard-badge {
            background: rgba(255, 180, 0, 0.2);
            border: 1px solid rgba(255, 180, 0, 0.3);
            border-radius: 20px;
            padding: 5px 12px;
            font-size: clamp(0.7rem, 1.2vw, 0.8rem);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .panel {
            background: rgba(40, 30, 20, 0.9);
            border: 1px solid rgba(255, 180, 0, 0.3);
            border-radius: 15px;
            padding: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(255, 180, 0, 0.2);
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 280px;
            max-width: 380px;
            overflow-y: auto;
        }
        .panel-title {
            font-size: 1.4rem;
            margin-bottom: 15px;
            text-align: center;
            color: #ffcc00;
            text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 180, 0, 0.2);
        }
        .control-group {
            margin-bottom: 15px;
        }
        .control-label {
            display: block;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: #ffddaa;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .control-label .info-icon {
            margin-left: 8px;
            cursor: pointer;
            color: #ffddaa;
            position: relative;
        }
        select {
            width: 100%;
            padding: 10px;
            background: rgba(255, 180, 0, 0.1);
            border: 1px solid rgba(255, 180, 0, 0.2);
            color: #ffddaa;
            border-radius: 8px;
            font-size: 1rem;
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffddaa' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.7rem center;
            background-size: 8px 10px;
        }
        select option, select optgroup {
            background: #281e14;
            color: #ffddaa;
        }
        .tooltip {
            visibility: hidden;
            width: 250px;
            background-color: #333;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 10px;
            position: absolute;
            z-index: 100;
            bottom: 125%;
            left: 50%;
            margin-left: -125px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.85rem;
            line-height: 1.4;
        }
        .tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent;
        }
        .info-icon:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
        .value-display {
            min-width: 70px;
            text-align: right;
            font-weight: bold;
            color: #ffcc00;
            text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
        }
        input[type="range"] {
            width: 100%; height: 8px; background: rgba(255, 180, 0, 0.2);
            outline: none; border-radius: 4px; -webkit-appearance: none; appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; width: 20px; height: 20px;
            background: #ffcc00; border-radius: 50%; cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 204, 0, 0.8); transition: all 0.3s;
        }
        .radio-group { display: flex; flex-direction: column; gap: 8px; }
        .radio-option {
            padding: 8px 12px; background: rgba(255, 180, 0, 0.1);
            border: 1px solid rgba(255, 180, 0, 0.2); border-radius: 8px;
            cursor: pointer; transition: all 0.3s; user-select: none;
        }
        .radio-option:hover { background: rgba(255, 180, 0, 0.2); }
        .radio-option input { display: none; }
        .radio-option input:checked + span { color: #ffcc00; font-weight: bold; }
        .radio-option input:checked + span::before { content: '› '; }
        .start-button {
            width: 100%; padding: 12px; margin-top: auto;
            background: linear-gradient(45deg, #ffcc00, #ffaa00); border: none;
            border-radius: 30px; color: #000; font-size: 1rem; font-weight: bold;
            cursor: pointer; transition: all 0.3s; text-transform: uppercase;
            box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
        }
        .start-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(255, 204, 0, 0.6); }
        .visualization-area {
            position: relative; flex: 2; min-width: 300px;
            background: radial-gradient(ellipse at center, rgba(40, 30, 20, 0.8), rgba(0, 0, 0, 0.9));
            border-radius: 15px; display: flex; align-items: center; justify-content: center;
            overflow: hidden; border: 1px solid rgba(255, 180, 0, 0.2);
        }
        #humanCanvas { position: absolute; top:0; left:0; width: 100%; height: 100%; }
        .analysis-display { text-align: center; margin-bottom: 15px; }
        .analysis-value { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: bold; transition: all 0.3s; margin: 5px 0; }
        .analysis-unit { font-size: 1.2rem; color: #ffddaa; }
        .ppe-category-indicator { padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px; transition: all 0.3s; font-weight: bold; text-transform: uppercase; font-size: 1rem; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); }
        .cat-safe { background: rgba(0, 255, 0, 0.15); border: 2px solid rgba(0, 255, 0, 0.5); color: #00ff00; }
        .cat-1 { background: rgba(0, 200, 255, 0.15); border: 2px solid rgba(0, 200, 255, 0.5); color: #00d4ff; }
        .cat-2 { background: rgba(255, 165, 0, 0.15); border: 2px solid rgba(255, 165, 0, 0.5); color: #ffa500; }
        .cat-3 { background: rgba(255, 100, 0, 0.2); border: 2px solid rgba(255, 100, 0, 0.6); color: #ff6400; }
        .cat-4 { background: rgba(255, 0, 0, 0.2); border: 2px solid rgba(255, 0, 0, 0.7); color: #ff0000; }
        .cat-danger { background: rgba(255, 0, 255, 0.2); border: 2px solid rgba(255, 0, 255, 0.8); color: #ff00ff; animation: pulse 0.5s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
        .stat-item { background: rgba(255, 180, 0, 0.1); border: 1px solid rgba(255, 180, 0, 0.2); border-radius: 8px; padding: 8px; text-align: center; }
        .stat-label { font-size: 0.8rem; color: #ffddaa; margin-bottom: 4px; }
        .stat-value { font-weight: bold; color: #ffcc00; font-size: 1.1rem; }
        .calculation-breakdown {
            background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 180, 0, 0.2);
            border-radius: 8px; padding: 12px; margin-top: 15px; font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
        }
        .calculation-breakdown h3 { color: #ffcc00; margin-bottom: 10px; font-size: 1rem; font-family: 'Segoe UI', sans-serif; }
        .calc-line { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .calc-label { color: #ffddaa; }
        .calc-value { color: #fff; font-weight: bold; }
        .calc-formula { color: #aaa; font-style: italic; font-size: 0.8rem; margin-top: 8px; border-top: 1px dashed rgba(255, 180, 0,0.2); padding-top: 8px;}
        #dynamic-guidance { color: #00ff88; margin-top: 10px; padding-top:10px; border-top: 1px solid rgba(255, 180, 0,0.2); font-size: 0.85rem; line-height: 1.4; }
        #screen-flash { position: fixed; top:0; left:0; width: 100%; height: 100%; background: #fff; z-index: 9999; opacity: 0; pointer-events: none;}
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
        
        @media (max-width: 1200px) {
            body { padding: 5px; overflow: auto; }
            .container { flex-direction: column; height: auto; }
            .panel { max-width: 100%; overflow-y: visible; flex: initial; }
            .visualization-area { min-height: 60vh; flex-grow: 1; }
            header { padding-bottom: 5px; }
        }
        
        @media (max-width: 480px) {
            h1 { font-size: 1.2rem; }
            .subtitle { font-size: 0.75rem; }
            .panel-title { font-size: 1.2rem; }
            .panel { padding: 10px; }
            .control-group { margin-bottom: 12px; }
        }
    </style>
</head>
<body>
    <div id="screen-flash"></div>
    <header style="display: none;">
        <h1><i class="fas fa-bolt"></i> DC Arc Flash Hazard Simulator</h1>
        <div class="subtitle">Professional Electrical Safety Training System for DC Systems</div>
        <div class="standards">
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> NFPA 70E</div>
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> IEC 61584 (DC)</div>
        </div>
    </header>
    <div class="container">
        <div class="panel">
            <h2 class="panel-title">System Parameters</h2>
             <div class="control-group">
                 <label class="control-label">Select Scenario</label>
                  <select id="scenarioSelector">
                      <option value="custom">Custom Scenario</option>
                      <optgroup label="Low Voltage DC (< 1000V)">
                          <option value="lv_batt_pack_48">48V Battery Pack</option>
                          <option value="lv_solar_208">208V Solar Array</option>
                          <option value="lv_dc_panel">600V DC Panel</option>
                      </optgroup>
                      <optgroup label="High Voltage DC (> 1000V)">
                          <option value="hv_dc_1500">1500V Solar Inverter</option>
                      </optgroup>
                  </select>
            </div>
             <div class="control-group">
                 <label class="control-label">DC Voltage (V)<span class="value-display" id="voltageValue">48 V</span></label>
                <input type="range" id="voltage" min="12" max="1500" value="48" step="1">
            </div>
             <div class="control-group">
                 <label class="control-label">
                     <span>Available Fault Current (kA)</span>
                      <span class="info-icon">
                          <i class="fas fa-info-circle"></i>
                          <span class="tooltip">The maximum current the DC system can deliver during a fault. Higher fault currents result in more powerful, dangerous arcs.</span>
                      </span>
                     <span class="value-display" id="faultCurrentValue">10 kA</span>
                 </label>
                <input type="range" id="faultCurrent" min="0.1" max="100" value="10" step="0.1">
            </div>
            <div class="control-group">
                 <label class="control-label">
                     <span>Clearing Time (ms)</span>
                     <span class="info-icon">
                          <i class="fas fa-info-circle"></i>
                          <span class="tooltip">The time it takes for a protective device (fuse/DC breaker) to open and extinguish the arc. DC arcs are harder to extinguish than AC.</span>
                      </span>
                     <span class="value-display" id="clearingTimeValue">200 ms</span>
                 </label>
                <input type="range" id="clearingTime" min="10" max="2000" value="200" step="10">
            </div>
             <div class="control-group">
                 <label class="control-label">
                     <span>Working Distance (in)</span>
                      <span class="info-icon">
                          <i class="fas fa-info-circle"></i>
                          <span class="tooltip">The distance from the worker to the arc source. Incident energy decreases significantly as distance increases.</span>
                      </span>
                      <span class="value-display" id="workingDistanceValue">18 in</span>
                 </label>
                <input type="range" id="workingDistance" min="6" max="120" value="18" step="1">
            </div>
             <div class="control-group">
                <label class="control-label">
                    <span>Electrode Configuration</span>
                    <span class="info-icon">
                      <i class="fas fa-info-circle"></i>
                      <span class="tooltip">'Box' configurations tend to focus the arc energy, potentially increasing the hazard compared to 'Open Air'.</span>
                    </span>
                </label>
                <div class="radio-group" id="equipmentConfig">
                    <label class="radio-option"><input type="radio" name="config" value="box" checked><span>Box (Enclosed)</span></label>
                    <label class="radio-option"><input type="radio" name="config" value="open"><span>Open Air</span></label>
                </div>
            </div>
            <button class="start-button" id="startSimulation"><i class="fas fa-play"></i> Start Simulation</button>
        </div>
        <div class="visualization-area">
            <canvas id="humanCanvas"></canvas>
        </div>
        <div class="panel">
            <h2 class="panel-title">Arc Flash Analysis</h2>
            <div class="analysis-display">
                <div class="stat-label">Incident Energy</div>
                <span class="analysis-value" id="incidentEnergyValue">0.00</span>
                <span class="analysis-unit">cal/cm²</span>
            </div>
            <div class="ppe-category-indicator cat-safe" id="ppeCategoryIndicator">Ready to Simulate</div>
            <div class="stats-container">
                <div class="stat-item">
                    <div class="stat-label">Arc Flash Boundary</div>
                    <div class="stat-value" id="arcBoundaryValue">0 in</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Arc Power</div>
                    <div class="stat-value" id="arcPowerValue">0 MW</div>
                </div>
            </div>
            <div class="calculation-breakdown">
                <h3>Calculation Breakdown (DC Model)</h3>
                <div class="calc-line"><span class="calc-label">Est. Arcing Current (Ia):</span><span class="calc-value" id="calcArcCurrent">0 kA</span></div>
                <div class="calc-line"><span class="calc-label">Incident Energy (E):</span><span class="calc-value" id="calcIncidentEnergy">0 cal/cm²</span></div>
                <div class="calc-line"><span class="calc-label">Arc Flash Boundary (AFB):</span><span class="calc-value" id="calcAFB">0 in</span></div>
                <hr style="border-color: rgba(255, 180, 0,0.2); margin: 5px 0;">
                <div class="calc-formula" id="calc-formula-text">Based on NFPA 70E Annex D (Max Power Method).</div>
                <div id="dynamic-guidance">Adjust parameters and press Start.</div>
            </div>
            <div class="disclaimer-box">
                <strong><i class="fas fa-exclamation-triangle"></i> Educational Tool Only:</strong> Not for field use. Results require verification by a qualified person. No liability is assumed for its use.
            </div>
        </div>
    </div>
    <script>
        let canvas, ctx, scale = 1, isSimulating = false, animationId, arcIntensity = 0;
        let arcFlash = null;
        const baseWidth = 600, baseHeight = 700;
        document.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('humanCanvas');
            ctx = canvas.getContext('2d');
            setupEventListeners();
            window.addEventListener('resize', resizeCanvas, false);
            resizeCanvas();
            clearAnalysisPanel();
            updateInputDisplays();
        });
        function setupEventListeners() {
            ['voltage', 'faultCurrent', 'clearingTime', 'workingDistance'].forEach(id => {
                document.getElementById(id).addEventListener('input', e => {
                    document.getElementById('scenarioSelector').value = 'custom';
                    updateInputDisplays();
                     if (isSimulating) updateCalculations(); else clearAnalysisPanel();
                });
            });
             document.getElementById('equipmentConfig').addEventListener('change', () => {
                 document.getElementById('scenarioSelector').value = 'custom';
                 updateInputDisplays();
                 if (isSimulating) updateCalculations(); else clearAnalysisPanel();
            });
            document.getElementById('scenarioSelector').addEventListener('change', handleScenarioChange);
            document.getElementById('startSimulation').addEventListener('click', toggleSimulation);
        }
        function handleScenarioChange(e) {
            const scenario = e.target.value;
            const scenarios = {
                custom: null,
                lv_batt_pack_48: { voltage: 48, faultCurrent: 20, clearingTime: 150, workingDistance: 18, config: 'box'},
                lv_solar_208: { voltage: 208, faultCurrent: 25, clearingTime: 200, workingDistance: 18, config: 'open'},
                lv_dc_panel: { voltage: 600, faultCurrent: 30, clearingTime: 250, workingDistance: 24, config: 'box'},
                hv_dc_1500: { voltage: 1500, faultCurrent: 50, clearingTime: 300, workingDistance: 36, config: 'open'},
            };
            const s = scenarios[scenario];
            if (!s) return;
            document.getElementById('voltage').value = s.voltage;
            document.getElementById('faultCurrent').value = s.faultCurrent;
            document.getElementById('clearingTime').value = s.clearingTime;
            document.getElementById('workingDistance').value = s.workingDistance;
            document.querySelector(\`input[name="config"][value="\${s.config}"]\`).checked = true;
            updateInputDisplays();
            if (isSimulating) updateCalculations(); else clearAnalysisPanel();
        }
        function resizeCanvas() {
            const vizArea = document.querySelector('.visualization-area');
            canvas.width = vizArea.clientWidth;
            canvas.height = vizArea.clientHeight;
            scale = canvas.width / baseWidth;
            if (!isSimulating) {
                resetVisualization();
            }
        }
        function toggleSimulation() {
            const button = document.getElementById('startSimulation');
            isSimulating = !isSimulating;
            button.innerHTML = isSimulating ? '<i class="fas fa-stop"></i> Stop Simulation' : '<i class="fas fa-play"></i> Start Simulation';
            button.style.background = isSimulating ? 'linear-gradient(45deg, #ff4444, #ff8888)' : 'linear-gradient(45deg, #ffcc00, #ffaa00)';
            if (isSimulating) {
                updateCalculations();
                startAnimation();
            } else {
                cancelAnimationFrame(animationId);
                resetVisualization();
            }
        }
        function updateInputDisplays() {
            document.getElementById('voltageValue').textContent = document.getElementById('voltage').value + ' V';
            document.getElementById('faultCurrentValue').textContent = document.getElementById('faultCurrent').value + ' kA';
            document.getElementById('clearingTimeValue').textContent = document.getElementById('clearingTime').value + ' ms';
            document.getElementById('workingDistanceValue').textContent = document.getElementById('workingDistance').value + ' in';
        }

       function calculateResults() {
            const V = parseFloat(document.getElementById('voltage').value); 
            const Ibf_kA = parseFloat(document.getElementById('faultCurrent').value);
            const T_ms = parseFloat(document.getElementById('clearingTime').value);
            const D_in = parseFloat(document.getElementById('workingDistance').value);
            const config = document.querySelector('input[name="config"]:checked').value;
            const Ia_kA = 0.5 * Ibf_kA;
            const Ia_A = Ia_kA * 1000;
            const T_sec = T_ms / 1000;
            const D_cm = D_in * 2.54;
            const conversionFactor = 0.00239;
            let incidentEnergy = (conversionFactor * V * Ia_A * T_sec) / (D_cm * D_cm);
            let configFactor = (config === 'box') ? 1.5 : 1.0;
            incidentEnergy *= configFactor;
            const EB = 1.2;
            const AFB_cm = Math.sqrt((configFactor * conversionFactor * V * Ia_A * T_sec) / EB);
            const AFB_in = AFB_cm / 2.54;
            const arcPower_MW = (V * Ia_A) / 1000000;

            return {
                incidentEnergy: incidentEnergy,
                arcFlashBoundary: AFB_in,
                arcingCurrent: Ia_kA,
                arcPower: arcPower_MW,
                workingDistance: D_in
            };
        }

        function updateCalculations() {
            const results = calculateResults();
            updateAnalysisDisplays(results);
            arcIntensity = Math.min(results.incidentEnergy / 40, 1);
            if (isSimulating) {
                const vizArea = document.querySelector('.visualization-area');
                const panelWidth = 120 * scale;
                const panelHeight = 100 * scale;
                const panelX = vizArea.clientWidth / 2 - panelWidth / 2;
                const panelY = vizArea.clientHeight / 2 - panelHeight / 2;
                const flashOrigin = { x: panelX + panelWidth / 2, y: panelY + panelHeight / 2 };
                arcFlash = new ArcFlash(arcIntensity, scale, flashOrigin);
                triggerScreenFlash();
                sendSafetyAlerts(results);
            }
        }

        function sendSafetyAlerts(results) {
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-arc-flash', key: 'IE_DANGEROUS', value: results.incidentEnergy }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-arc-flash', key: 'IE_HIGH', value: results.incidentEnergy }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-arc-flash', key: 'BOUNDARY_INTRUSION', value: { workingDistance: results.workingDistance, arcBoundary: results.arcFlashBoundary.toFixed(1) } }, '*');
        }

        function updateAnalysisDisplays({ incidentEnergy, arcFlashBoundary, arcingCurrent, arcPower }) {
            document.getElementById('incidentEnergyValue').textContent = incidentEnergy.toFixed(2);
            document.getElementById('arcBoundaryValue').textContent = arcFlashBoundary.toFixed(1) + ' in';
            document.getElementById('arcPowerValue').textContent = arcPower.toFixed(2) + ' MW';
            const indicator = document.getElementById('ppeCategoryIndicator');
            indicator.className = 'ppe-category-indicator';
            if (incidentEnergy <= 1.2) { indicator.className += ' cat-safe'; indicator.textContent = 'PPE CAT 0 - Low Risk'; }
            else if (incidentEnergy <= 4) { indicator.className += ' cat-1'; indicator.textContent = 'PPE CAT 1 Required'; }
            else if (incidentEnergy <= 8) { indicator.className += ' cat-2'; indicator.textContent = 'PPE CAT 2 Required'; }
            else if (incidentEnergy <= 25) { indicator.className += ' cat-3'; indicator.textContent = 'PPE CAT 3 Required'; }
            else if (incidentEnergy <= 40) { indicator.className += ' cat-4'; indicator.textContent = 'PPE CAT 4 Required'; }
            else { indicator.className += ' cat-danger'; indicator.textContent = 'DANGEROUS - No Safe PPE'; }
            document.getElementById('calcArcCurrent').textContent = \`\${arcingCurrent.toFixed(1)} kA\`;
            document.getElementById('calcIncidentEnergy').textContent = \`\${incidentEnergy.toFixed(2)} cal/cm²\`;
            document.getElementById('calcAFB').textContent = \`\${arcFlashBoundary.toFixed(1)} in\`;
            let guidance = "";
            if (incidentEnergy > 40) guidance = "Guidance: Incident energy exceeds 40 cal/cm². This is an extremely dangerous condition where work is prohibited.";
            else if (arcFlashBoundary > (document.getElementById('workingDistance').value)) guidance = "Guidance: Your working distance is INSIDE the Arc Flash Boundary. You are at risk of a second-degree burn.";
            else if (incidentEnergy > 8) guidance = "Guidance: High incident energy requires extensive PPE and a qualified work plan. The risk of severe injury is high.";
            else guidance = "Guidance: The calculated risk is manageable with appropriate PPE and safety procedures.";
            document.getElementById('dynamic-guidance').textContent = guidance;
        }
        function clearAnalysisPanel() {
            document.getElementById('incidentEnergyValue').textContent = '0.00';
            document.getElementById('arcBoundaryValue').textContent = '0 in';
            document.getElementById('arcPowerValue').textContent = '0 MW';
            const indicator = document.getElementById('ppeCategoryIndicator');
            indicator.className = 'ppe-category-indicator cat-safe';
            indicator.textContent = 'Ready to Simulate';
            document.getElementById('calcArcCurrent').textContent = '0 kA';
            document.getElementById('calcIncidentEnergy').textContent = '0 cal/cm²';
            document.getElementById('calcAFB').textContent = '0 in';
            document.getElementById('dynamic-guidance').textContent = "Adjust parameters and press Start.";
        }
        function startAnimation() {
            function animate() {
                if (!isSimulating && !arcFlash) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawScene();
                if(arcFlash) {
                    arcFlash.update();
                    arcFlash.draw(ctx);
                     if (!arcFlash.isActive()) {
                        arcFlash = null;
                        if (isSimulating) {
                            toggleSimulation();
                        }
                    }
                }
                animationId = requestAnimationFrame(animate);
            }
            animate();
        }
        function drawScene() {
            const vizArea = document.querySelector('.visualization-area');
            const vizWidth = vizArea.clientWidth;
            const vizHeight = vizArea.clientHeight;
            const panelWidth = 120 * scale;
            const panelHeight = 100 * scale;
            const panelX = vizWidth / 2 - panelWidth / 2;
            const panelY = vizHeight / 2 - panelHeight / 2;

            ctx.save();
            ctx.fillStyle = '#333';
            ctx.strokeStyle = 'rgba(255, 180, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.shadowColor = 'rgba(255, 180, 0, 0.5)';
            ctx.shadowBlur = 15;
            ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            ctx.shadowColor = 'transparent';
            
            const cellWidth = (panelWidth - 30 * scale) / 4;
            const cellHeight = (panelHeight - 25 * scale) / 2;
            const cellSpacing = 5 * scale;
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 4; col++) {
                    const cellX = panelX + 10 * scale + col * (cellWidth + cellSpacing);
                    const cellY = panelY + 10 * scale + row * (cellHeight + cellSpacing);
                    ctx.fillStyle = '#4a4a4a';
                    ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
                    ctx.fillStyle = 'rgba(255, 180, 0, 0.7)';
                    ctx.fillRect(cellX + cellWidth / 2 - (5 * scale / 2), cellY - 2 * scale, 5 * scale, 2 * scale);
                }
            }
            ctx.restore();
        }

        function triggerScreenFlash() {
            const flash = document.getElementById('screen-flash');
            flash.style.transition = 'opacity 0.05s ease-in';
            flash.style.opacity = 0.8 * arcIntensity;
            setTimeout(() => {
                flash.style.transition = 'opacity 0.5s ease-out';
                flash.style.opacity = 0;
            }, 50);
        }

        class ArcFlash {
            constructor(intensity, scale, origin) {
                this.intensity = intensity;
                this.scale = scale;
                this.origin = origin;
                this.radius = 0;
                this.maxRadius = (50 + 600 * intensity) * scale;
                this.life = 0;
                this.maxLife = 40 + 30 * intensity;
                this.particles = [];
                this.molten = [];
                for(let i=0; i < 200 * intensity; i++) {
                    this.particles.push(new Particle(this.origin.x, this.origin.y, intensity, 'plasma'));
                }
                for(let i=0; i < 50 * intensity; i++) {
                    this.molten.push(new Particle(this.origin.x, this.origin.y, intensity, 'molten'));
                }
                this.smokeOpacity = 0;
            }
            isActive() { return this.life < this.maxLife + 60; }
            getIntensity() { return this.intensity; }
            update() {
                if(this.life < this.maxLife) {
                    this.life++;
                    this.radius = this.maxRadius * (Math.sin((this.life / this.maxLife) * Math.PI / 2));
                } else {
                    this.smokeOpacity = Math.max(0, this.smokeOpacity - 0.005);
                }
                 this.particles.forEach(p => p.update());
                 this.molten.forEach(p => p.update());
                 if(this.life > this.maxLife / 2) {
                     this.smokeOpacity = Math.min(this.intensity * 0.7, this.smokeOpacity + 0.01);
                 }
            }
            draw(ctx) {
                 if(this.life < this.maxLife) {
                     const grad = ctx.createRadialGradient(this.origin.x, this.origin.y, 0, this.origin.x, this.origin.y, this.radius);
                     const opacity = 1 - (this.life / this.maxLife);
                     grad.addColorStop(0, \`rgba(255, 255, 255, \${opacity * 0.95})\`);
                     grad.addColorStop(0.2, \`rgba(255, 255, 220, \${opacity * 0.9})\`);
                     grad.addColorStop(0.5, \`rgba(255, 210, 100, \${opacity * 0.6})\`);
                     grad.addColorStop(1, \`rgba(255, 150, 0, 0)\`);
                     ctx.fillStyle = grad;
                     ctx.beginPath();
                     ctx.arc(this.origin.x, this.origin.y, this.radius, 0, Math.PI * 2);
                     ctx.fill();
                }
                this.particles.forEach(p => p.draw(ctx));
                this.molten.forEach(p => p.draw(ctx));
                if(this.smokeOpacity > 0) {
                     const smokeGrad = ctx.createRadialGradient(this.origin.x, this.origin.y, 0, this.origin.x, this.origin.y, this.maxRadius * 1.5);
                     smokeGrad.addColorStop(0, \`rgba(50, 50, 50, \${this.smokeOpacity})\`);
                     smokeGrad.addColorStop(1, \`rgba(20, 20, 20, 0)\`);
                     ctx.fillStyle = smokeGrad;
                     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                }
            }
        }
        class Particle {
            constructor(x, y, intensity, type) {
                this.x = x; this.y = y;
                this.type = type;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 25 * intensity;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                if (type === 'molten') {
                    this.life = 30 + Math.random() * 40 * intensity;
                    this.size = 2 + Math.random() * 5 * intensity;
                    this.color = \`rgba(255, 120, 0, \${this.life / 50})\`;
                    this.vy += 2 * intensity; 
                } else {
                    this.life = 20 + Math.random() * 30 * intensity;
                    this.size = 1 + Math.random() * 3 * intensity;
                    this.color = \`rgba(255, 224, 150, \${this.life / 50})\`;
                }
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                 if (this.type === 'molten') {
                     this.vy += 0.1;
                 }
                this.life--;
            }
            draw(ctx) {
                if(this.life > 0) {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        function resetVisualization() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearAnalysisPanel();
            drawScene();
        }
    </script>
</body>
</html>
  `];
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default DCArcFlashPage;