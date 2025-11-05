import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const DCShockHazardPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DC Voltage Shock Hazard Simulator</title>
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
            background: linear-gradient(135deg, #1a0a0a, #2e1a1a);
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
            background: linear-gradient(90deg, #ffcc00, #ff8800);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
        }
        
        .subtitle {
            color: #ffccaa;
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
            background: rgba(255, 100, 0, 0.2);
            border: 1px solid rgba(255, 100, 0, 0.3);
            border-radius: 20px;
            padding: 5px 12px;
            font-size: clamp(0.7rem, 1.2vw, 0.8rem);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .panel {
            background: rgba(30, 20, 20, 0.9);
            border: 1px solid rgba(255, 100, 0, 0.3);
            border-radius: 15px;
            padding: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(255, 100, 0, 0.2);
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
            border-bottom: 1px solid rgba(255, 100, 0, 0.2);
        }
        
        .control-group {
            margin-bottom: 15px;
        }
        
        .control-label {
            display: block;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: #ffccaa;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .control-label .info-icon {
            margin-left: 8px;
            cursor: pointer;
            color: #ffccaa;
            position: relative;
        }
        
        select {
            width: 100%;
            padding: 10px;
            background: rgba(255, 100, 0, 0.1);
            border: 1px solid rgba(255, 100, 0, 0.2);
            color: #ffccaa;
            border-radius: 8px;
            font-size: 1rem;
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffccaa' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.7rem center;
            background-size: 8px 10px;
        }

        select option {
            background: #2e1a1a;
            color: #ffccaa;
        }

        select optgroup {
            background-color: #2e1a1a;
            font-weight: bold;
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
            color: #ff8800;
            text-shadow: 0 0 5px rgba(255, 136, 0, 0.5);
        }
        
        input[type="range"] {
            width: 100%; height: 8px; background: rgba(255, 100, 0, 0.2);
            outline: none; border-radius: 4px; -webkit-appearance: none; appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; width: 20px; height: 20px;
            background: #ffcc00; border-radius: 50%; cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 204, 0, 0.8); transition: all 0.3s;
        }
        
        .radio-group { display: flex; flex-direction: column; gap: 8px; }
        .radio-option {
            padding: 8px 12px; background: rgba(255, 100, 0, 0.1);
            border: 1px solid rgba(255, 100, 0, 0.2); border-radius: 8px;
            cursor: pointer; transition: all 0.3s; user-select: none;
        }
        .radio-option:hover { background: rgba(255, 100, 0, 0.2); }
        .radio-option input { display: none; }
        .radio-option input:checked + span { color: #ff8800; font-weight: bold; }
        .radio-option input:checked + span::before { content: '› '; }

        .start-button {
            width: 100%; padding: 12px; margin-top: auto;
            background: linear-gradient(45deg, #ffcc00, #ff8800); border: none;
            border-radius: 30px; color: #000; font-size: 1rem; font-weight: bold;
            cursor: pointer; transition: all 0.3s; text-transform: uppercase;
            box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
        }
        
        .start-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(255, 204, 0, 0.6); }
        
        .visualization-area {
            position: relative; flex: 2; min-width: 300px;
            background: radial-gradient(ellipse at center, rgba(30, 20, 20, 0.8), rgba(0, 0, 0, 0.9));
            border-radius: 15px; display: flex; align-items: center; justify-content: center;
            overflow: hidden; border: 1px solid rgba(255, 100, 0, 0.2);
        }
        
        #humanCanvas { max-width: 100%; max-height: 100%; object-fit: contain; }
        .environment-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: all 0.5s; z-index: 1; }
        .current-display { text-align: center; margin-bottom: 15px; }
        .current-value { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: bold; transition: all 0.3s; margin: 5px 0; }
        .current-unit { font-size: 1.2rem; color: #ffccaa; }
        
        .severity-indicator { padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px; transition: all 0.3s; font-weight: bold; text-transform: uppercase; font-size: 1rem; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); }
        .severity-safe { background: rgba(0, 255, 0, 0.15); border: 2px solid rgba(0, 255, 0, 0.5); color: #00ff00; }
        .severity-tingling { background: rgba(255, 255, 0, 0.15); border: 2px solid rgba(255, 255, 0, 0.5); color: #ffff00; }
        .severity-painful { background: rgba(255, 165, 0, 0.15); border: 2px solid rgba(255, 165, 0, 0.5); color: #ffa500; }
        .severity-dangerous { background: rgba(255, 0, 0, 0.15); border: 2px solid rgba(255, 0, 0, 0.5); color: #ff0000; }
        .severity-fatal { background: rgba(255, 0, 255, 0.2); border: 2px solid rgba(255, 0, 255, 0.8); color: #ff00ff; animation: pulse 0.5s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        
        .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
        .stat-item { background: rgba(255, 100, 0, 0.1); border: 1px solid rgba(255, 100, 0, 0.2); border-radius: 8px; padding: 8px; text-align: center; }
        .stat-label { font-size: 0.8rem; color: #ffccaa; margin-bottom: 4px; }
        .stat-value { font-weight: bold; color: #ff8800; font-size: 1.1rem; }
        
        .calculation-breakdown {
            background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 100, 0, 0.2);
            border-radius: 8px; padding: 12px; margin-top: 15px; font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
        }
        .calculation-breakdown h3 { color: #ffcc00; margin-bottom: 10px; font-size: 1rem; font-family: 'Segoe UI', sans-serif; }
        .calc-line { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .calc-label { color: #ffccaa; }
        .calc-value { color: #fff; font-weight: bold; }
        .calc-formula { color: #aaa; font-style: italic; font-size: 0.8rem; margin-top: 8px; border-top: 1px dashed rgba(255,100,0,0.2); padding-top: 8px;}
        #dynamic-guidance { color: #00ff88; margin-top: 10px; padding-top:10px; border-top: 1px solid rgba(255,100,0,0.2); font-size: 0.85rem; line-height: 1.4; }
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
    <header style="display: none;">
        <h1><i class="fas fa-bolt"></i> DC Voltage Shock Hazard Simulator</h1>
        <div class="subtitle">Professional DC Electrical Safety Training System</div>
        <div class="standards">
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> IEC 60479</div>
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> NFPA 70E</div>
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> OSHA 1910</div>
        </div>
    </header>
    
    <div class="container">
        <!-- Control Panel -->
        <div class="panel">
            <h2 class="panel-title">Control Panel</h2>
            <div class="control-group">
                 <label class="control-label">Select Scenario</label>
                 <select id="scenarioSelector">
                     <option value="custom">Custom Scenario</option>
                     <optgroup label="Industrial & Commercial">
                        <option value="data_center">Data Center PDU (48V)</option>
                        <option value="telecom_wet">Telecomm Power (48V - Wet)</option>
                        <option value="industrial_110">Industrial Control (110V)</option>
                        <option value="industrial_220">Industrial Power (220V)</option>
                        <option value="industrial_440_unsafe">High Voltage DC (440V - Unsafe)</option>
                        <option value="industrial_440_safe">High Voltage DC (440V - Safe)</option>
                     </optgroup>
                     <optgroup label="Renewable Energy & EV">
                        <option value="solar_panel">Solar Panel Maintenance (600V)</option>
                        <option value="ev_battery">EV Battery Handling (400V)</option>
                     </optgroup>
                     <optgroup label="Other">
                        <option value="marine_battery">Marine Battery Bank (24V)</option>
                     </optgroup>
                 </select>
            </div>
            <div class="control-group">
                <label class="control-label">DC Voltage (V)<span class="value-display" id="voltageValue">12 V</span></label>
                <input type="range" id="voltage" min="0" max="1000" value="12" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">
                    <span>Body Resistance (Ω)</span>
                    <span class="info-icon">
                        <i class="fas fa-info-circle"></i>
                        <span class="tooltip">Body resistance varies greatly. A common value for calculations is 1000Ω (hand-to-hand). This changes based on skin moisture, contact area, and current path. Dry skin can be >100,000Ω, while broken skin can be <500Ω.</span>
                    </span>
                    <span class="value-display" id="resistanceValue">1000 Ω</span>
                </label>
                <input type="range" id="resistance" min="300" max="100000" value="1000" step="100">
            </div>
            <div class="control-group">
                <label class="control-label">Skin Condition</label>
                <div class="radio-group" id="skinCondition">
                    <label class="radio-option"><input type="radio" name="skin" value="dry" checked><span>Dry</span></label>
                    <label class="radio-option"><input type="radio" name="skin" value="wet"><span>Wet / Sweaty</span></label>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">PPE Status</label>
                <div class="radio-group" id="ppeStatus">
                    <label class="radio-option"><input type="radio" name="ppe" value="none" checked><span>None</span></label>
                    <label class="radio-option"><input type="radio" name="ppe" value="gloves"><span>Insulated Gloves</span></label>
                    <label class="radio-option"><input type="radio" name="ppe" value="boots"><span>Insulated Boots</span></label>
                </div>
            </div>
             <div class="control-group">
                <label class="control-label">Environment</label>
                <div class="radio-group" id="environment">
                    <label class="radio-option"><input type="radio" name="env" value="dry" checked><span>Dry Surface</span></label>
                    <label class="radio-option"><input type="radio" name="env" value="wet"><span>Wet/Metal Surface</span></label>
                </div>
            </div>
            <button class="start-button" id="startSimulation"><i class="fas fa-play"></i> Start Simulation</button>
        </div>
        
        <!-- Visualization Area -->
        <div class="visualization-area">
            <div class="environment-bg" id="environmentBg"></div>
            <canvas id="humanCanvas"></canvas>
        </div>
        
        <!-- Output Panel -->
        <div class="panel">
            <h2 class="panel-title">Analysis Results</h2>
            <div class="current-display">
                <span class="current-value" id="currentValue">0.0</span>
                <span class="current-unit">mA</span>
            </div>
            <div class="severity-indicator severity-safe" id="severityIndicator">Ready to Simulate</div>
            <div class="stats-container">
                <div class="stat-item">
                    <div class="stat-label">Power</div>
                    <div class="stat-value" id="powerStat">0.0 W</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Energy (1s)</div>
                    <div class="stat-value" id="energyStat">0.0 J</div>
                </div>
            </div>
            <div class="calculation-breakdown">
                <h3>Calculation Breakdown</h3>
                <div class="calc-line"><span class="calc-label">Base Resistance:</span><span class="calc-value" id="calcBaseR">1,000 Ω</span></div>
                <div class="calc-line"><span class="calc-label">Skin Modifier:</span><span class="calc-value" id="calcSkinMod">x1.0</span></div>
                <div class="calc-line"><span class="calc-label">PPE Modifier:</span><span class="calc-value" id="calcPpeMod">+0 Ω</span></div>
                <div class="calc-line"><span class="calc-label">Env. Modifier:</span><span class="calc-value" id="calcEnvMod">x1.0</span></div>
                <hr style="border-color: rgba(255,100,0,0.2); margin: 5px 0;">
                <div class="calc-line"><span class="calc-label">Total Resistance:</span><span class="calc-value" id="calcTotalR">1,000 Ω</span></div>
                <div class="calc-formula">I = V / R = <span id="calcOhm">--</span></div>
                <div class="calc-formula">P = V * I = <span id="calcPower">--</span></div>
                <div id="dynamic-guidance">Adjust controls and press Start.</div>
            </div>
             <div class="disclaimer-box">
                <strong><i class="fas fa-exclamation-triangle"></i> Educational Tool Only:</strong> Not for field use. Results require verification by a qualified person. No liability is assumed for its use.
            </div>
        </div>
    </div>
    <script>
        let canvas, ctx, scale = 1, isSimulating = false, animationId, shockIntensity = 0, bodyGlow = 0, heartbeatAnimation = 0;
        const baseWidth = 600, baseHeight = 700;
        
        const bodyModel = {
            head: { x: 300, y: 100, r: 40 }, torso: { x: 300, y: 230, w: 100, h: 160 },
            leftArm: { x1: 250, y1: 170, x2: 170, y2: 290, hand: { x: 170, y: 290, r: 18 } },
            rightArm: { x1: 350, y1: 170, x2: 430, y2: 290, hand: { x: 430, y: 290, r: 18 } },
            leftLeg: { x1: 270, y1: 310, x2: 250, y2: 530, foot: { x: 250, y: 550, r: 20 } },
            rightLeg: { x1: 330, y1: 310, x2: 350, y2: 530, foot: { x: 350, y: 550, r: 20 } },
            heart: { x: 310, y: 220, r: 20 },
            skeleton: [ [290,140,310,140], [300,140,300,310], [270,310,330,310], [300,170,250,170], [250,170,170,290], [300,170,350,170], [350,170,430,290], [300,310,270,310], [270,310,250,530], [300,310,330,310], [330,310,350,530] ]
        };

        document.addEventListener('DOMContentLoaded', () => {
            canvas = document.getElementById('humanCanvas'); ctx = canvas.getContext('2d');
            setupEventListeners();
            window.addEventListener('resize', resizeCanvas, false);
            resizeCanvas();
            clearAnalysisPanel(); 
            updateInputDisplays();
        });

        function setupEventListeners() {
            ['voltage', 'resistance'].forEach(id => {
                document.getElementById(id).addEventListener('input', e => {
                    document.getElementById('scenarioSelector').value = 'custom';
                    updateInputDisplays();
                     if (isSimulating) updateCalculations(); else clearAnalysisPanel();
                });
            });
            ['skinCondition', 'ppeStatus', 'environment'].forEach(id => {
                document.getElementById(id).addEventListener('change', () => {
                    document.getElementById('scenarioSelector').value = 'custom';
                    updateInputDisplays();
                     if (isSimulating) updateCalculations(); else clearAnalysisPanel();
                });
            });
            document.getElementById('scenarioSelector').addEventListener('change', handleScenarioChange);
            document.getElementById('startSimulation').addEventListener('click', toggleSimulation);
        }

        function handleScenarioChange(e) {
            const scenario = e.target.value;
            const scenarios = {
                custom: null,
                ev_battery: { voltage: 400, resistance: 50000, skin: 'dry', ppe: 'gloves', env: 'dry' },
                solar_panel: { voltage: 600, resistance: 100000, skin: 'dry', ppe: 'gloves', env: 'dry' },
                data_center: { voltage: 48, resistance: 1000, skin: 'dry', ppe: 'none', env: 'dry' },
                telecom_wet: { voltage: 48, resistance: 1000, skin: 'wet', ppe: 'none', env: 'wet' },
                industrial_110: { voltage: 110, resistance: 1500, skin: 'dry', ppe: 'none', env: 'dry' },
                industrial_220: { voltage: 220, resistance: 1000, skin: 'wet', ppe: 'none', env: 'dry' },
                industrial_440_unsafe: { voltage: 440, resistance: 1000, skin: 'dry', ppe: 'none', env: 'dry' },
                industrial_440_safe: { voltage: 440, resistance: 50000, skin: 'dry', ppe: 'gloves', env: 'dry' },
                marine_battery: { voltage: 24, resistance: 5000, skin: 'wet', ppe: 'none', env: 'wet' }
            };
            const s = scenarios[scenario];
            if (!s) return;

            document.getElementById('voltage').value = s.voltage;
            document.getElementById('resistance').value = s.resistance;
            document.querySelector(\`input[name="skin"][value="\${s.skin}"]\`).checked = true;
            document.querySelector(\`input[name="ppe"][value="\${s.ppe}"]\`).checked = true;
            document.querySelector(\`input[name="env"][value="\${s.env}"]\`).checked = true;
            
            updateInputDisplays();
            if (isSimulating) updateCalculations(); else clearAnalysisPanel();
        }

        function resizeCanvas() {
            const vizArea = document.querySelector('.visualization-area');
            const ratio = baseWidth / baseHeight;
            let newWidth = vizArea.clientWidth, newHeight = vizArea.clientHeight;
            if (newWidth / newHeight > ratio) newWidth = newHeight * ratio; else newHeight = newWidth / ratio;
            canvas.width = newWidth - 10; canvas.height = newHeight - 10;
            scale = canvas.width / baseWidth;
            if (!isSimulating) {
                resetVisualization();
            }
        }

        function toggleSimulation() {
            const button = document.getElementById('startSimulation');
            isSimulating = !isSimulating;
            button.innerHTML = isSimulating ? '<i class="fas fa-stop"></i> Stop Simulation' : '<i class="fas fa-play"></i> Start Simulation';
            button.style.background = isSimulating ? 'linear-gradient(45deg, #ff4444, #ff8888)' : 'linear-gradient(45deg, #ffcc00, #ff8800)';
            if (isSimulating) {
                updateCalculations();
                startAnimation();
            } else { 
                cancelAnimationFrame(animationId);
                resetVisualization();
            }
        }
        
        function updateInputDisplays() {
            const voltage = document.getElementById('voltage').value;
            const resistance = document.getElementById('resistance').value;
            document.getElementById('voltageValue').textContent = voltage + ' V';
            document.getElementById('resistanceValue').textContent = parseInt(resistance) >= 1000 ? (resistance / 1000).toFixed(1) + ' kΩ' : resistance + ' Ω';
        }

        function calculateResults() {
            const voltage = parseInt(document.getElementById('voltage').value);
            const baseResistance = parseInt(document.getElementById('resistance').value);
            const isWet = document.querySelector('input[name="skin"]:checked').value === 'wet' || document.querySelector('input[name="env"]:checked').value === 'wet';
            const hasPPE = document.querySelector('input[name="ppe"]:checked').value !== 'none';
            
            const modifiers = { skin: 1.0, ppe: 0, env: 1.0 };
            if (document.querySelector('input[name="skin"]:checked').value === 'wet') { modifiers.skin = 0.15; }
            if (document.querySelector('input[name="ppe"]:checked').value === 'gloves') { modifiers.ppe = 2000000; }
            if (document.querySelector('input[name="ppe"]:checked').value === 'boots') { modifiers.ppe += 1000000; }
            if (document.querySelector('input[name="env"]:checked').value === 'wet') { modifiers.env = 0.5; }

            const totalResistance = (baseResistance * modifiers.skin * modifiers.env) + modifiers.ppe;
            const current = totalResistance > 0 ? (voltage / totalResistance) * 1000 : 0;
            const power = (current / 1000) * voltage;
            
            return { voltage, baseResistance, totalResistance, current, power, modifiers, isWet, hasPPE };
        }
        
        function updateCalculations() {
            const results = calculateResults();
            updateAnalysisDisplays(results);
            shockIntensity = Math.min(results.current / 120, 1);
            if (isSimulating) {
                sendSafetyAlerts(results);
            }
        }
        
        function sendSafetyAlerts(results) {
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-shock-hazard', key: 'SEVERE_BURN_RISK', value: results.current }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-shock-hazard', key: 'PAINFUL_SHOCK', value: results.current }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-shock-hazard', key: 'WET_CONDITIONS', value: results.isWet }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'dc-shock-hazard', key: 'PPE_EFFECTIVE', value: results.hasPPE && results.current < 2.0 }, '*');
        }

        function updateAnalysisDisplays({ voltage, baseResistance, totalResistance, current, power, modifiers }) {
            document.getElementById('currentValue').textContent = current.toFixed(1);
            document.getElementById('powerStat').textContent = power.toFixed(2) + ' W';
            document.getElementById('energyStat').textContent = power.toFixed(2) + ' J';
            
            const display = document.getElementById('currentValue');
            if (current < 2) display.style.color = '#00ff00';
            else if (current < 10) display.style.color = '#ffff00';
            else if (current < 40) display.style.color = '#ffa500';
            else if (current < 100) display.style.color = '#ff4444';
            else display.style.color = '#ff00ff';

            const indicator = document.getElementById('severityIndicator');
            indicator.className = 'severity-indicator';
            if (current < 2) { indicator.className += ' severity-safe'; indicator.textContent = 'SAFE - Imperceptible'; }
            else if (current < 10) { indicator.className += ' severity-tingling'; indicator.textContent = 'Tingling Sensation'; }
            else if (current < 40) { indicator.className += ' severity-painful'; indicator.textContent = 'Painful Shock / Let-Go Difficult'; }
            else if (current < 100) { indicator.className += ' severity-dangerous'; indicator.textContent = 'DANGEROUS - Fibrillation Possible'; }
            else { indicator.className += ' severity-fatal'; indicator.textContent = 'FATAL - Cardiac Arrest Probable'; }
            
            document.getElementById('calcBaseR').textContent = \`\${baseResistance.toLocaleString()} Ω\`;
            document.getElementById('calcSkinMod').textContent = \`x\${modifiers.skin.toFixed(2)}\`;
            document.getElementById('calcPpeMod').textContent = \`+\${modifiers.ppe.toLocaleString()} Ω\`;
            document.getElementById('calcEnvMod').textContent = \`x\${modifiers.env.toFixed(1)}\`;
            document.getElementById('calcTotalR').textContent = \`\${Math.round(totalResistance).toLocaleString()} Ω\`;
            document.getElementById('calcOhm').textContent = \`\${voltage}V / \${Math.round(totalResistance).toLocaleString()}Ω = \${current.toFixed(1)} mA\`;
            document.getElementById('calcPower').textContent = \`\${voltage}V * \${(current / 1000).toFixed(3)}A = \${power.toFixed(2)} W\`;

            let guidance = "";
            if(modifiers.ppe > 0) guidance = "Guidance: PPE is the most critical factor, drastically increasing total resistance and reducing current to a safe level.";
            else if(modifiers.skin < 1.0) guidance = "Guidance: Wet skin dramatically lowers resistance, making even low voltages potentially hazardous. This is a critical risk factor.";
            else if(voltage > 50) guidance = "Guidance: Voltages above 50V DC are considered hazardous. The high voltage is the primary driver of the dangerous current.";
            else guidance = "Guidance: All parameters are currently in a relatively safe state."
            document.getElementById('dynamic-guidance').textContent = guidance;
        }

        function clearAnalysisPanel() {
            const { baseResistance, modifiers } = calculateResults();
            document.getElementById('currentValue').textContent = '0.0';
            document.getElementById('currentValue').style.color = '#fff';
            document.getElementById('powerStat').textContent = '0.0 W';
            document.getElementById('energyStat').textContent = '0.0 J';
            const indicator = document.getElementById('severityIndicator');
            indicator.className = 'severity-indicator severity-safe';
            indicator.textContent = 'Ready to Simulate';
            
            document.getElementById('calcBaseR').textContent = \`\${baseResistance.toLocaleString()} Ω\`;
            document.getElementById('calcSkinMod').textContent = \`x\${modifiers.skin.toFixed(2)}\`;
            document.getElementById('calcPpeMod').textContent = \`+\${modifiers.ppe.toLocaleString()} Ω\`;
            document.getElementById('calcEnvMod').textContent = \`x\${modifiers.env.toFixed(1)}\`;
            document.getElementById('calcTotalR').textContent = \`\${Math.round((baseResistance * modifiers.skin * modifiers.env) + modifiers.ppe).toLocaleString()} Ω\`;
            document.getElementById('calcOhm').textContent = '--';
            document.getElementById('calcPower').textContent = '--';
            document.getElementById('dynamic-guidance').textContent = "Adjust controls and press Start.";
        }

        function startAnimation() {
            function animate() {
                if (!isSimulating) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawHumanBody();
                if (shockIntensity > 0.01) { drawElectricalEffects(); updateBodyEffects(); }
                updateEnvironmentBackground();
                animationId = requestAnimationFrame(animate);
            }
            animate();
        }

        function drawHumanBody() {
            ctx.save();
            if (bodyGlow > 0) { ctx.shadowColor = \`rgba(255, 100, 100, \${bodyGlow})\`; ctx.shadowBlur = 20 * bodyGlow * scale; }
            
            ctx.fillStyle = \`rgba(51, 51, 51, \${1 - shockIntensity * 0.8})\`;
            ctx.fillRect((bodyModel.torso.x - bodyModel.torso.w/2) * scale, (bodyModel.torso.y - bodyModel.torso.h/2) * scale, bodyModel.torso.w * scale, bodyModel.torso.h * scale);
            ctx.strokeStyle = \`rgba(51, 51, 51, \${1 - shockIntensity * 0.8})\`;
            ctx.lineWidth = 25 * scale; ctx.lineCap = 'round';
            ['leftArm', 'rightArm', 'leftLeg', 'rightLeg'].forEach(limb => {
                ctx.beginPath(); ctx.moveTo(bodyModel[limb].x1 * scale, bodyModel[limb].y1 * scale); ctx.lineTo(bodyModel[limb].x2 * scale, bodyModel[limb].y2 * scale); ctx.stroke();
            });
            
            ctx.fillStyle = \`rgba(240, 217, 197, \${1 - shockIntensity * 0.8})\`;
            ctx.beginPath(); ctx.arc(bodyModel.head.x * scale, bodyModel.head.y * scale, bodyModel.head.r * scale, 0, 2*Math.PI); ctx.fill();
            ['leftArm', 'rightArm'].forEach(limb => {
                 ctx.beginPath(); ctx.arc(bodyModel[limb].hand.x * scale, bodyModel[limb].hand.y * scale, bodyModel[limb].hand.r * scale, 0, 2*Math.PI); ctx.fill();
            });
            ctx.fillStyle = \`rgba(68, 68, 68, \${1 - shockIntensity * 0.8})\`;
            ['leftLeg', 'rightLeg'].forEach(limb => {
                 ctx.beginPath(); ctx.arc(bodyModel[limb].foot.x * scale, bodyModel[limb].foot.y * scale, bodyModel[limb].foot.r * scale, 0, 2*Math.PI); ctx.fill();
            });
            
            if (shockIntensity > 0.3) {
                ctx.strokeStyle = \`rgba(255, 255, 204, \${Math.min(1, (shockIntensity - 0.2) * 1.5)})\`;
                ctx.lineWidth = 4 * scale; ctx.lineJoin = 'round';
                ctx.shadowColor = 'rgba(255, 255, 204, 1)';
                ctx.shadowBlur = 15 * shockIntensity * scale;
                ctx.beginPath();
                bodyModel.skeleton.forEach(bone => { ctx.moveTo(bone[0] * scale, bone[1] * scale); ctx.lineTo(bone[2] * scale, bone[3] * scale); });
                ctx.stroke();
            }
            if (shockIntensity > 0.15) drawHeartbeat();
            ctx.restore();
        }

        function drawElectricalEffects() {
            const pathPoints = [bodyModel.rightArm.hand, bodyModel.heart, bodyModel.leftLeg.foot];
            for (let i = 0; i < pathPoints.length - 1; i++) {
                drawLightningBolt(pathPoints[i].x, pathPoints[i].y, pathPoints[i + 1].x, pathPoints[i + 1].y);
            }
            drawSparks(bodyModel.rightArm.hand.x, bodyModel.rightArm.hand.y, shockIntensity);
            drawSparks(bodyModel.leftLeg.foot.x, bodyModel.leftLeg.foot.y, shockIntensity);
        }

        function drawLightningBolt(x1, y1, x2, y2) {
            ctx.save();
            ctx.strokeStyle = \`rgba(255, 204, 0, \${0.4 + (shockIntensity * 0.6)})\`;
            ctx.lineWidth = (1 + shockIntensity * 4) * scale;
            ctx.shadowColor = 'rgba(255, 204, 0, 1)';
            ctx.shadowBlur = (15 + shockIntensity * 25) * scale;
            
            let displacement = shockIntensity * 70;
            let path = createFractalPath(x1, y1, x2, y2, displacement, 4);
            ctx.beginPath(); ctx.moveTo(path[0].x * scale, path[0].y * scale);
            path.slice(1).forEach(p => ctx.lineTo(p.x * scale, p.y * scale));
            ctx.stroke();
            ctx.restore();
        }
        
        function createFractalPath(x1, y1, x2, y2, displacement, depth) {
            if (depth <= 0) return [{x: x1, y: y1}, {x: x2, y: y2}];
            let midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displacement;
            let midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displacement;
            let left = createFractalPath(x1, y1, midX, midY, displacement / 2, depth - 1);
            let right = createFractalPath(midX, midY, x2, y2, displacement / 2, depth - 1);
            return left.slice(0, -1).concat(right);
        }

        function drawSparks(x, y, intensity) {
            for (let i = 0; i < Math.floor(15 * intensity); i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = (10 + Math.random() * 30 * intensity) * scale;
                ctx.fillStyle = \`rgba(255, 224, 100, \${Math.random() * 0.9})\`;
                ctx.beginPath();
                ctx.arc((x * scale) + Math.cos(angle) * distance, (y * scale) + Math.sin(angle) * distance, (1 + Math.random() * 2.5) * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function drawHeartbeat() {
            heartbeatAnimation += 0.1 + shockIntensity * 0.2;
            const isFibrillating = shockIntensity > 0.6;
            const beat = isFibrillating ? Math.random() * 0.8 + 0.2 : Math.abs(Math.sin(heartbeatAnimation)) * 0.8 + 0.2;
            const scaleFactor = 1 + beat * 0.4 * shockIntensity;
            
            ctx.save();
            ctx.translate(bodyModel.heart.x * scale, bodyModel.heart.y * scale);
            ctx.scale(scaleFactor, scaleFactor);
            ctx.fillStyle = \`rgba(255, 0, 0, \${0.6 + beat * 0.4})\`;
            ctx.shadowColor = 'rgba(255, 0, 0, 1)';
            ctx.shadowBlur = 25 * shockIntensity * scale;
            ctx.beginPath();
            ctx.arc(0, 0, bodyModel.heart.r * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        function updateBodyEffects() {
            bodyGlow = shockIntensity * 0.8;
            if (shockIntensity > 0.7) canvas.style.transform = \`translate(\${(Math.random() - 0.5) * 5 * shockIntensity}px, \${(Math.random() - 0.5) * 5 * shockIntensity}px)\`;
            else canvas.style.transform = 'none';
        }
        
        function updateEnvironmentBackground() {
            const bg = document.getElementById('environmentBg');
            const intensity = shockIntensity * 0.5;
            bg.style.background = \`radial-gradient(ellipse at center, rgba(255, 80, 50, \${intensity}), rgba(70, 30, 20, 0.9))\`;
        }

        function resetVisualization() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bodyGlow = 0; shockIntensity = 0; heartbeatAnimation = 0;
            updateEnvironmentBackground(); canvas.style.transform = 'none';
            clearAnalysisPanel();
            drawHumanBody();
        }
    </script>
</body>
</html>
  `];
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default DCShockHazardPage;