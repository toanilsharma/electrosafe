import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const ACArcFlashPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AC Arc Flash Hazard Simulator (IEEE 1584-2018)</title>
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
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2000; justify-content: center; align-items: center; }
        .modal-content { background: #1e1e1e; padding: 30px; border-radius: 15px; border: 1px solid rgba(255, 180, 0,0.3); max-width: 600px; width: 90%; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        .modal-content h2 { color: #ffcc00; margin-bottom: 20px; }
        .modal-content p, .modal-content li { margin-bottom: 10px; color: #ddd; line-height: 1.6; }
        .modal-content ul { padding-left: 20px; }
        .modal-close { position: absolute; top: 15px; right: 15px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
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
        <h1><i class="fas fa-explosion"></i> AC Arc Flash Hazard Simulator (IEEE 1584-2018)</h1>
        <div class="subtitle">Professional Electrical Safety Training System</div>
        <div class="standards">
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> IEEE 1584-2018</div>
            <div class="standard-badge"><i class="fas fa-shield-alt"></i> IEC 61584</div>
        </div>
    </header>
    <div class="container">
        <!-- Control Panel -->
        <div class="panel">
            <h2 class="panel-title">System Parameters</h2>
             <div class="control-group">
                <label class="control-label">Select Scenario</label>
                 <select id="scenarioSelector">
                     <option value="custom">Custom Scenario</option>
                     <optgroup label="Low Voltage (< 1000V)">
                        <option value="lv_mcc_480">480V MCC Panel</option>
                        <option value="lv_panel_208">208V Lighting Panel</option>
                        <option value="lv_switchboard">600V Switchboard</option>
                     </optgroup>
                     <optgroup label="Medium Voltage (> 1000V)">
                        <option value="mv_switchgear_5kv">4.16kV Switchgear</option>
                        <option value="mv_switchgear_15kv">13.8kV Switchgear</option>
                     </optgroup>
                 </select>
            </div>
             <div class="control-group">
                <label class="control-label">AC Voltage (V)<span class="value-display" id="voltageValue">480 V</span></label>
                <input type="range" id="voltage" min="208" max="15000" value="480" step="1">
            </div>
             <div class="control-group">
                <label class="control-label">
                    <span>Available Fault Current (kA)</span>
                     <span class="info-icon">
                        <i class="fas fa-info-circle"></i>
                        <span class="tooltip">The maximum current the system can deliver during a fault. Higher fault currents result in more powerful, dangerous arcs.</span>
                    </span>
                    <span class="value-display" id="faultCurrentValue">25 kA</span>
                </label>
                <input type="range" id="faultCurrent" min="1" max="100" value="25" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">
                    <span>Breaker Clearing Time (ms)</span>
                    <span class="info-icon">
                        <i class="fas fa-info-circle"></i>
                        <span class="tooltip">The time it takes for a protective device (breaker/fuse) to open and extinguish the arc. Longer times drastically increase total energy released.</span>
                    </span>
                    <span class="value-display" id="clearingTimeValue">100 ms</span>
                </label>
                <input type="range" id="clearingTime" min="10" max="2000" value="100" step="10">
            </div>
             <div class="control-group">
                <label class="control-label">
                    <span>Conductor Gap (mm)</span>
                     <span class="info-icon">
                        <i class="fas fa-info-circle"></i>
                        <span class="tooltip">The distance between conductors (electrodes). This is a key factor in determining the arcing current.</span>
                    </span>
                     <span class="value-display" id="gapValue">25 mm</span>
                </label>
                <input type="range" id="gap" min="10" max="152" value="25" step="1">
            </div>
             <div class="control-group">
                <label class="control-label">
                    <span>Working Distance (in)</span>
                     <span class="info-icon">
                        <i class="fas fa-info-circle"></i>
                        <span class="tooltip">The distance from the worker's chest to the arc source. Incident energy decreases significantly as distance increases. A typical distance for LV work is 18 inches.</span>
                    </span>
                     <span class="value-display" id="workingDistanceValue">18 in</span>
                </label>
                <input type="range" id="workingDistance" min="6" max="120" value="18" step="1">
            </div>
             <div class="control-group">
                <label class="control-label">Equipment Configuration</label>
                <div class="radio-group" id="equipmentConfig">
                    <label class="radio-option"><input type="radio" name="config" value="vcb" checked><span>VCB (Vertical in Box)</span></label>
                    <label class="radio-option"><input type="radio" name="config" value="hcb"><span>HCB (Horizontal in Box)</span></label>
                    <label class="radio-option"><input type="radio" name="config" value="voa"><span>VOA (Vertical in Open Air)</span></label>
                </div>
            </div>
            <button class="start-button" id="startSimulation"><i class="fas fa-play"></i> Start Simulation</button>
        </div>
        <!-- Visualization Area -->
        <div class="visualization-area">
            <canvas id="humanCanvas"></canvas>
            <!-- Human image removed -->
        </div>
        <!-- Output Panel -->
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
                <h3>Calculation Breakdown (IEEE 1584-2018)</h3>
                <div class="calc-line"><span class="calc-label">Est. Arcing Current (Ia):</span><span class="calc-value" id="calcArcCurrent">0 kA</span></div>
                <div class="calc-line"><span class="calc-label">Incident Energy (E):</span><span class="calc-value" id="calcIncidentEnergy">0 cal/cm²</span></div>
                <div class="calc-line"><span class="calc-label">Arc Flash Boundary (AFB):</span><span class="calc-value" id="calcAFB">0 in</span></div>
                <hr style="border-color: rgba(255, 180, 0,0.2); margin: 5px 0;">
                <div class="calc-formula">Calculations based on the IEEE 1584-2018 model.</div>
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
            ['voltage', 'faultCurrent', 'clearingTime', 'workingDistance', 'gap'].forEach(id => {
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
                lv_mcc_480: { voltage: 480, faultCurrent: 35, clearingTime: 100, workingDistance: 18, gap: 25, config: 'vcb'},
                lv_panel_208: { voltage: 208, faultCurrent: 10, clearingTime: 50, workingDistance: 18, gap: 25, config: 'vcb'},
                lv_switchboard: { voltage: 600, faultCurrent: 50, clearingTime: 150, workingDistance: 24, gap: 32, config: 'vcb'},
                mv_switchgear_5kv: { voltage: 4160, faultCurrent: 25, clearingTime: 120, workingDistance: 36, gap: 152, config: 'vcb'},
                mv_switchgear_15kv: { voltage: 13800, faultCurrent: 20, clearingTime: 100, workingDistance: 48, gap: 152, config: 'vcb'},
            };
            const s = scenarios[scenario];
            if (!s) return;
            document.getElementById('voltage').value = s.voltage;
            document.getElementById('faultCurrent').value = s.faultCurrent;
            document.getElementById('clearingTime').value = s.clearingTime;
            document.getElementById('workingDistance').value = s.workingDistance;
            document.getElementById('gap').value = s.gap;
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
            document.getElementById('gapValue').textContent = document.getElementById('gap').value + ' mm';
        }
        function calculateResults() {
            const V = parseFloat(document.getElementById('voltage').value); 
            const Ibf = parseFloat(document.getElementById('faultCurrent').value); 
            const T = parseFloat(document.getElementById('clearingTime').value); 
            const D = parseFloat(document.getElementById('workingDistance').value);
            const G = parseFloat(document.getElementById('gap').value);
            const config = document.querySelector('input[name="config"]:checked').value;
            let voltageRange = 'low';
            if (V >= 1000 && V <= 5000) {
                voltageRange = 'medium_1kV_to_5kV';
            } else if (V > 5000 && V <= 15000) {
                voltageRange = 'medium_5kV_to_15kV';
            }
            let k1, k2, cf, x, vcf;
            let log_Ia;
            let Ia_kA;
            if (config === 'vcb') {
                if (voltageRange === 'low') { 
                    k1 = -0.156; k2 = -0.058; cf = 1.0; x = 1.354;
                } else if (voltageRange === 'medium_1kV_to_5kV') {
                    k1 = -0.055; k2 = -0.010; cf = 1.0; x = 1.256;
                } else {
                    k1 = -0.018; k2 = 0.015; cf = 1.0; x = 1.127;
                }
                log_Ia = k1 + 0.656 * Math.log10(Ibf) + 0.005 * G + 0.005 * (V/1000) + 0.010 * (V/1000) * Math.log10(Ibf) - 0.005 * G * Math.log10(Ibf);
            } else if (config === 'hcb') {
                if (voltageRange === 'low') {
                    k1 = -0.097; k2 = -0.063; cf = 1.0; x = 1.451;
                } else if (voltageRange === 'medium_1kV_to_5kV') {
                    k1 = -0.025; k2 = 0.008; cf = 1.0; x = 1.323;
                } else {
                    k1 = -0.006; k2 = 0.023; cf = 1.0; x = 1.216;
                }
                log_Ia = k1 + 0.656 * Math.log10(Ibf) + 0.005 * G + 0.005 * (V/1000) + 0.010 * (V/1000) * Math.log10(Ibf) - 0.005 * G * Math.log10(Ibf);
            } else { // VOA
                if (voltageRange === 'low') {
                    k1 = 0.000; k2 = -0.006; cf = 1.0; x = 2.000;
                } else {
                    k1 = 0.000; k2 = 0.000; cf = 1.0; x = 2.000;
                }
                if (voltageRange === 'low') {
                     log_Ia = k2 + 0.983 * Math.log10(Ibf);
                } else {
                     log_Ia = k2 + 0.983 * Math.log10(Ibf);
                }
            }
            Ia_kA = Math.pow(10, log_Ia);
            const Ibf_85 = 0.85 * Ibf;
            if (Ia_kA > Ibf_85) {
                Ia_kA = Ibf_85;
            }
            let k4, k5, k6, k7;
            let log_En;
            const V_kV = V / 1000;
            if (config === 'vcb') {
                if (voltageRange === 'low') {
                    k4 = -0.354; k5 = 0.002; k6 = 0.017; k7 = 0.924;
                } else if (voltageRange === 'medium_1kV_to_5kV') {
                    k4 = -0.284; k5 = 0.000; k6 = 0.015; k7 = 0.911;
                } else {
                    k4 = -0.235; k5 = 0.000; k6 = 0.011; k7 = 0.847;
                }
                 log_En = k4 + k5 * V_kV + k6 * G + k7 * Math.log10(Ia_kA);
            } else if (config === 'hcb') {
                if (voltageRange === 'low') {
                    k4 = -0.208; k5 = 0.003; k6 = 0.005; k7 = 0.955;
                } else if (voltageRange === 'medium_1kV_to_5kV') {
                    k4 = -0.145; k5 = 0.000; k6 = 0.004; k7 = 0.938;
                } else {
                    k4 = -0.101; k5 = 0.000; k6 = 0.003; k7 = 0.922;
                }
                 log_En = k4 + k5 * V_kV + k6 * G + k7 * Math.log10(Ia_kA);
            } else { // VOA
                if (voltageRange === 'low') {
                    k4 = -0.053; k5 = 0.000; k6 = 0.000; k7 = 0.993;
                } else {
                    k4 = -0.035; k5 = 0.000; k6 = 0.000; k7 = 0.996;
                }
                 if (voltageRange === 'low') {
                     log_En = k4 + k7 * Math.log10(Ia_kA);
                 } else {
                     log_En = k4 + k7 * Math.log10(Ia_kA);
                 }
            }
            const En = Math.pow(10, log_En);
            const t_sec = T / 1000.0;
            const K = 4.184;
            const E = K * En * (t_sec / 0.2) * Math.pow(610 / (D * 25.4), x);
            const EB = 1.2;
            let AFB_mm;
            if (voltageRange === 'low') {
                 AFB_mm = Math.pow((K * En * (t_sec / 0.2)) / EB, 1 / x) * 610;
            } else {
                 AFB_mm = Math.pow((K * En * (t_sec / 0.2)) / EB, 1 / x) * 610;
            }
            const AFB_in = AFB_mm / 25.4; // Corrected division
            const arcPower = (Ia_kA * 1000 * V) / 1000000;
            return {
                incidentEnergy: E,
                arcFlashBoundary: AFB_in,
                arcingCurrent: Ia_kA,
                arcPower: arcPower,
                workingDistance: D
            };
        }
        function updateCalculations() {
            const results = calculateResults();
            updateAnalysisDisplays(results);
            arcIntensity = Math.min(results.incidentEnergy / 40, 1);
            if (isSimulating) {
                arcFlash = new ArcFlash(arcIntensity, scale, canvas.width, canvas.height);
                triggerScreenFlash();
                sendSafetyAlerts(results);
            }
        }

        function sendSafetyAlerts(results) {
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'ac-arc-flash', key: 'IE_DANGEROUS', value: results.incidentEnergy }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'ac-arc-flash', key: 'IE_HIGH', value: results.incidentEnergy }, '*');
            window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'ac-arc-flash', key: 'BOUNDARY_INTRUSION', value: { workingDistance: results.workingDistance, arcBoundary: results.arcFlashBoundary.toFixed(1) } }, '*');
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
                if (!isSimulating) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawScene();
                if(arcFlash) {
                    arcFlash.update();
                    arcFlash.draw(ctx);
                    if (!arcFlash.isActive()) {
                        isSimulating = false;
                        toggleSimulation();
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
            const panelWidth = 100 * scale;
            const panelHeight = 150 * scale;
            const panelX = vizWidth / 2 - panelWidth / 2;
            const panelY = vizHeight / 2 - panelHeight / 2;
            ctx.fillStyle = '#444';
            ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            ctx.fillStyle = '#555';
            ctx.fillRect(panelX + 5 * scale, panelY + 5 * scale, panelWidth - 10 * scale, panelHeight - 10 * scale);
            if(arcFlash && arcFlash.isActive()) {
                arcFlash.origin = { x: panelX + panelWidth/2, y: panelY + panelHeight/2 };
            }
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
            constructor(intensity, scale, width, height) {
                this.intensity = intensity;
                this.scale = scale;
                this.origin = { x: width / 2, y: height / 2 };
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
                    this.vy += 2 * intensity; // gravity
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
  return (
    <HtmlToolWrapper htmlContent={htmlContent} />
    );
};

export default ACArcFlashPage;