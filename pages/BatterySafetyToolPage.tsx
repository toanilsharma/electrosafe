import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const BatterySafetyToolPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Battery System Safety Tool</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #22c55e;
            --warn-color: #facc15;
            --danger-color: #ef4444;
            --bg-color: #0a1a1a;
            --panel-bg: rgba(20, 40, 30, 0.9);
            --border-color: rgba(34, 197, 94, 0.3);
            --text-color: #fff;
            --text-muted: #a3e635;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: linear-gradient(135deg, var(--bg-color), #1a2e1a); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 15px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2); display: flex; flex-direction: column; overflow-y: auto; }
        .input-panel { flex: 1; min-width: 300px; max-width: 400px; }
        .analysis-panel { flex: 1; min-width: 300px; max-width: 420px; }
        .panel-title { font-size: 1.4rem; margin-bottom: 15px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px rgba(34, 197, 94, 0.5); padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .control-group { margin-bottom: 12px; }
        .control-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted); }
        .value-display { font-weight: bold; color: var(--primary-color); }
        select, input[type="range"] { width: 100%; }
        select { padding: 8px; background: rgba(34, 197, 94, 0.1); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 8px; font-size: 0.9rem; }
        select option { background: #14281e; color: var(--text-muted); }
        input[type="range"] { height: 6px; background: rgba(34, 197, 94, 0.2); -webkit-appearance: none; appearance: none; border-radius: 3px; outline: none;}
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--primary-color); border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(34, 197, 94, 0.8); }
        .visualization-area { position: relative; flex: 2; min-width: 400px; background: radial-gradient(ellipse at center, rgba(20, 40, 30, 0.8), rgba(0, 0, 0, 0.9)); border-radius: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border-color); }
        #simCanvas { max-width: 100%; max-height: 100%; object-fit: contain; }
        .overall-risk { text-align: center; padding: 12px; border-radius: 10px; font-size: 1.5rem; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; transition: all 0.3s; }
        .risk-safe { background: var(--primary-color); color: #000; }
        .risk-caution { background: var(--warn-color); color: #000; }
        .risk-danger { background: var(--danger-color); color: #fff; animation: pulse-danger 1s infinite; }
        @keyframes pulse-danger { 0%, 100% { box-shadow: 0 0 20px var(--danger-color); } 50% { box-shadow: 0 0 0px var(--danger-color); } }
        .analysis-group { margin-bottom: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; }
        .analysis-group h3 { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .analysis-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; margin-bottom: 5px; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .analysis-item:last-child { border-bottom: none; }
        .analysis-item .label { color: #ccc; }
        .analysis-item .value { font-weight: bold; }
        .status-ok { color: var(--primary-color); }
        .status-warn { color: var(--warn-color); }
        .status-danger { color: var(--danger-color); }
        .recommendation { font-size: 0.85rem; line-height: 1.4; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; margin-top: 8px; border-left: 3px solid; }
        .rec-ok { border-color: var(--primary-color); color: #a7f3d0; }
        .rec-warn { border-color: var(--warn-color); color: #fde68a; }
        .rec-danger { border-color: var(--danger-color); color: #fecaca; }
        @media (max-width: 1200px) {
            body { overflow-y: auto; }
            .container { flex-direction: column; }
            .panel { max-width: 100%; }
            .visualization-area { min-height: 50vh; }
        }
        @media (max-width: 480px) {
            .analysis-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
            .panel-title {
                font-size: 1.2rem;
            }
            .overall-risk {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Input Panel -->
        <div class="panel input-panel">
            <h2 class="panel-title">BESS Parameters</h2>
            <div class="control-group">
                <label for="batteryChemistry" class="control-label">Battery Chemistry</label>
                <select id="batteryChemistry">
                    <option value="nmc">Lithium-Ion (NMC)</option>
                    <option value="lfp">Lithium-Ion (LFP)</option>
                    <option value="lead_acid">Lead-Acid (Flooded)</option>
                </select>
            </div>
            <div class="control-group">
                <label class="control-label">System Voltage (VDC) <span class="value-display" id="voltageValue">400 V</span></label>
                <input type="range" id="voltage" min="50" max="1500" value="400" step="10">
            </div>
            <div class="control-group">
                <label class="control-label">Total Capacity (kWh) <span class="value-display" id="capacityValue">200 kWh</span></label>
                <input type="range" id="capacity" min="10" max="2000" value="200" step="10">
            </div>
            <div class="control-group">
                <label class="control-label">Max Discharge (A) <span class="value-display" id="dischargeValue">500 A</span></label>
                <input type="range" id="discharge" min="100" max="5000" value="500" step="50">
            </div>
             <div class="control-group">
                <label class="control-label">Short Circuit (kA) <span class="value-display" id="shortCircuitValue">20 kA</span></label>
                <input type="range" id="shortCircuit" min="5" max="100" value="20" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">Enclosure Volume (m³) <span class="value-display" id="volumeValue">50 m³</span></label>
                <input type="range" id="volume" min="1" max="500" value="50" step="1">
            </div>
             <div class="control-group">
                <label class="control-label">Ventilation (ACH) <span class="value-display" id="ventilationValue">6 ACH</span></label>
                <input type="range" id="ventilation" min="0" max="12" value="6" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">Fuse/Breaker Rating (A) <span class="value-display" id="fuseRatingValue">600 A</span></label>
                <input type="range" id="fuseRating" min="100" max="5000" value="600" step="50">
            </div>
            <div class="control-group">
                <label class="control-label">Clearing Time (ms) <span class="value-display" id="clearingTimeValue">20 ms</span></label>
                <input type="range" id="clearingTime" min="5" max="100" value="20" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">Working Distance (in) <span class="value-display" id="workingDistanceValue">24 in</span></label>
                <input type="range" id="workingDistance" min="18" max="60" value="24" step="1">
            </div>
        </div>
        
        <!-- Visualization Area -->
        <div class="visualization-area">
            <canvas id="simCanvas"></canvas>
        </div>
        
        <!-- Analysis Panel -->
        <div class="panel analysis-panel">
            <h2 class="panel-title">Safety Analysis</h2>
            <div class="overall-risk risk-safe" id="overallRisk">SYSTEM SAFE</div>
            
            <div class="analysis-group">
                <h3><i class="fas fa-bolt"></i>Overcurrent Protection</h3>
                <div class="analysis-item"><span class="label">Required Rating:</span> <span class="value" id="reqFuse">625 A</span></div>
                <div class="analysis-item"><span class="label">Your Selection:</span> <span class="value" id="selFuse">600 A</span></div>
                <div class="analysis-item"><span class="label">Status:</span> <span class="value status-warn" id="fuseStatus">UNDERSIZED</span></div>
                <div class="recommendation rec-warn" id="fuseRec">Fuse is undersized. Risk of nuisance tripping under max load.</div>
            </div>

            <div class="analysis-group">
                <h3><i class="fas fa-explosion"></i>Arc Flash Hazard</h3>
                <div class="analysis-item"><span class="label">Incident Energy:</span> <span class="value" id="incidentEnergy">0.00 cal/cm²</span></div>
                <div class="analysis-item"><span class="label">Arc Flash Boundary:</span> <span class="value" id="afb">0 in</span></div>
                <div class="analysis-item"><span class="label">PPE Requirement:</span> <span class="value status-ok" id="ppeCat">CAT 0</span></div>
                <div class="recommendation rec-ok" id="arcRec">Low arc flash risk. Standard PPE is sufficient.</div>
            </div>

            <div class="analysis-group">
                <h3><i class="fas fa-wind"></i>Ventilation & Off-Gassing</h3>
                <div class="analysis-item"><span class="label">Required Airflow:</span> <span class="value" id="reqVent">N/A</span></div>
                <div class="analysis-item"><span class="label">Actual Airflow:</span> <span class="value" id="actVent">0 CFM</span></div>
                <div class="analysis-item"><span class="label">Status:</span> <span class="value status-ok" id="ventStatus">ADEQUATE</span></div>
                <div class="recommendation rec-ok" id="ventRec">Ventilation is adequate for thermal management.</div>
            </div>

            <div class="analysis-group">
                <h3><i class="fas fa-temperature-three-quarters"></i>Thermal Runaway Risk</h3>
                 <div class="analysis-item"><span class="label">Risk Level:</span> <span class="value status-ok" id="thermalRisk">LOW</span></div>
                <div class="recommendation rec-ok" id="thermalRec">Low risk. Ensure BMS is active and module spacing is maintained.</div>
            </div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('simCanvas');
        const ctx = canvas.getContext('2d');
        let scale = 1;
        let results = {};
        
        const inputs = {
            chem: document.getElementById('batteryChemistry'),
            volt: document.getElementById('voltage'),
            cap: document.getElementById('capacity'),
            disc: document.getElementById('discharge'),
            sc: document.getElementById('shortCircuit'),
            vol: document.getElementById('volume'),
            vent: document.getElementById('ventilation'),
            fuse: document.getElementById('fuseRating'),
            time: document.getElementById('clearingTime'),
            dist: document.getElementById('workingDistance')
        };

        function calculate() {
            const V = parseFloat(inputs.volt.value);
            const maxDischarge = parseFloat(inputs.disc.value);
            const Isc_kA = parseFloat(inputs.sc.value);
            const T_ms = parseFloat(inputs.time.value);
            const D_in = parseFloat(inputs.dist.value);
            const userFuse = parseFloat(inputs.fuse.value);
            const chem = inputs.chem.value;
            const roomVolume_m3 = parseFloat(inputs.vol.value);
            const ach = parseFloat(inputs.vent.value);

            // 1. Overcurrent Protection
            const reqFuse = maxDischarge * 1.25;
            let fuseStatus = 'OK';
            if (userFuse < reqFuse) fuseStatus = 'UNDERSIZED';
            if (userFuse > reqFuse * 1.5) fuseStatus = 'OVERSIZED';

            // 2. Arc Flash
            const Ia_kA = 0.5 * Isc_kA;
            const Ia_A = Ia_kA * 1000;
            const T_sec = T_ms / 1000;
            const D_cm = D_in * 2.54;
            const incidentEnergy = (0.00239 * V * Ia_A * T_sec) / (D_cm * D_cm);
            const EB = 1.2;
            const afb_cm = Math.sqrt((0.00239 * V * Ia_A * T_sec) / EB);
            const afb = afb_cm / 2.54;
            let ppeCat = 'CAT 0';
            if (incidentEnergy > 1.2) ppeCat = 'CAT 1';
            if (incidentEnergy > 4) ppeCat = 'CAT 2';
            if (incidentEnergy > 8) ppeCat = 'CAT 3';
            if (incidentEnergy > 25) ppeCat = 'CAT 4';
            if (incidentEnergy > 40) ppeCat = 'DANGEROUS';

            // 3. Ventilation
            let reqVent, ventStatus, actVent;
            const actVentCFM = (roomVolume_m3 * 35.3147 * ach) / 60;
            if (chem === 'lead_acid') {
                const capacity_Ah = (parseFloat(inputs.cap.value) * 1000) / V;
                reqVent = 0.0026 * capacity_Ah; // Simplified CFM requirement
                ventStatus = actVentCFM >= reqVent ? 'ADEQUATE' : 'INADEQUATE';
            } else {
                reqVent = 6; // ACH for Li-ion
                ventStatus = ach >= reqVent ? 'ADEQUATE' : 'INADEQUATE';
            }

            // 4. Thermal Runaway
            let thermalScore = 0;
            if (chem === 'nmc') thermalScore += 3;
            if (chem === 'lfp') thermalScore += 1;
            if (ventStatus === 'INADEQUATE') thermalScore += 2;
            if (fuseStatus === 'OVERSIZED') thermalScore += 2;
            if (Isc_kA > 50) thermalScore += 1;
            let thermalRisk = 'LOW';
            if (thermalScore >= 3) thermalRisk = 'MODERATE';
            if (thermalScore >= 5) thermalRisk = 'HIGH';

            // Overall Risk
            let overallRisk = 'SAFE';
            if (fuseStatus !== 'OK' || ppeCat === 'CAT 3' || ppeCat === 'CAT 4' || ventStatus === 'INADEQUATE' || thermalRisk === 'MODERATE') {
                overallRisk = 'CAUTION';
            }
            if (fuseStatus === 'OVERSIZED' || ppeCat === 'DANGEROUS' || (chem === 'lead_acid' && ventStatus === 'INADEQUATE') || thermalRisk === 'HIGH') {
                overallRisk = 'DANGER';
            }

            results = {
                fuse: { req: reqFuse, status: fuseStatus },
                arc: { ie: incidentEnergy, afb: afb, ppe: ppeCat },
                vent: { req: reqVent, status: ventStatus, act: actVentCFM, chem: chem },
                thermal: { risk: thermalRisk },
                overall: overallRisk
            };
        }

        function updateUI() {
            // Update value displays
            document.getElementById('voltageValue').textContent = inputs.volt.value + ' V';
            document.getElementById('capacityValue').textContent = inputs.cap.value + ' kWh';
            document.getElementById('dischargeValue').textContent = inputs.disc.value + ' A';
            document.getElementById('shortCircuitValue').textContent = inputs.sc.value + ' kA';
            document.getElementById('volumeValue').textContent = inputs.vol.value + ' m³';
            document.getElementById('ventilationValue').textContent = inputs.vent.value + ' ACH';
            document.getElementById('fuseRatingValue').textContent = inputs.fuse.value + ' A';
            document.getElementById('clearingTimeValue').textContent = inputs.time.value + ' ms';
            document.getElementById('workingDistanceValue').textContent = inputs.dist.value + ' in';

            // Update analysis panel
            const overallEl = document.getElementById('overallRisk');
            overallEl.textContent = \`SYSTEM \${results.overall}\`;
            overallEl.className = \`overall-risk risk-\${results.overall.toLowerCase()}\`;

            // Fuse
            document.getElementById('reqFuse').textContent = \`\${results.fuse.req.toFixed(0)} A\`;
            document.getElementById('selFuse').textContent = \`\${inputs.fuse.value} A\`;
            const fuseStatusEl = document.getElementById('fuseStatus');
            fuseStatusEl.textContent = results.fuse.status;
            const fuseRecEl = document.getElementById('fuseRec');
            if (results.fuse.status === 'OK') {
                fuseStatusEl.className = 'value status-ok';
                fuseRecEl.className = 'recommendation rec-ok';
                fuseRecEl.textContent = 'Protection is correctly sized for the system\\'s max discharge current.';
            } else if (results.fuse.status === 'UNDERSIZED') {
                fuseStatusEl.className = 'value status-warn';
                fuseRecEl.className = 'recommendation rec-warn';
                fuseRecEl.textContent = 'Risk of nuisance tripping under max load. Consider a higher rated device.';
            } else {
                fuseStatusEl.className = 'value status-danger';
                fuseRecEl.className = 'recommendation rec-danger';
                fuseRecEl.textContent = 'DANGER: Protection is oversized and may not protect wiring, creating a fire hazard.';
            }

            // Arc Flash
            document.getElementById('incidentEnergy').textContent = \`\${results.arc.ie.toFixed(2)} cal/cm²\`;
            document.getElementById('afb').textContent = \`\${results.arc.afb.toFixed(1)} in\`;
            const ppeEl = document.getElementById('ppeCat');
            const arcRecEl = document.getElementById('arcRec');
            ppeEl.textContent = results.arc.ppe;
            if (results.arc.ppe === 'DANGEROUS') {
                ppeEl.className = 'value status-danger';
                arcRecEl.className = 'recommendation rec-danger';
                arcRecEl.textContent = 'EXTREME HAZARD: No safe PPE exists. De-energize before working.';
            } else if (['CAT 3', 'CAT 4'].includes(results.arc.ppe)) {
                 ppeEl.className = 'value status-warn';
                 arcRecEl.className = 'recommendation rec-warn';
                 arcRecEl.textContent = \`High arc flash risk. \${results.arc.ppe} is required for work within \${results.arc.afb.toFixed(1)} inches.\`;
            } else {
                 ppeEl.className = 'value status-ok';
                 arcRecEl.className = 'recommendation rec-ok';
                 arcRecEl.textContent = 'Low arc flash risk. Standard PPE and adherence to the boundary is sufficient.';
            }

            // Ventilation
            const ventStatusEl = document.getElementById('ventStatus');
            const ventRecEl = document.getElementById('ventRec');
            ventStatusEl.textContent = results.vent.status;
            document.getElementById('actVent').textContent = \`\${results.vent.act.toFixed(0)} CFM\`;
            if (results.vent.chem === 'lead_acid') {
                document.getElementById('reqVent').textContent = \`\${results.vent.req.toFixed(0)} CFM\`;
                 if(results.vent.status === 'ADEQUATE') {
                    ventStatusEl.className = 'value status-ok';
                    ventRecEl.className = 'recommendation rec-ok';
                    ventRecEl.textContent = 'Ventilation is adequate to prevent hydrogen accumulation.';
                 } else {
                    ventStatusEl.className = 'value status-danger';
                    ventRecEl.className = 'recommendation rec-danger';
                    ventRecEl.textContent = 'DANGER: Risk of explosive hydrogen gas accumulation. Increase ACH immediately.';
                 }
            } else {
                document.getElementById('reqVent').textContent = \`\${results.vent.req} ACH\`;
                 if(results.vent.status === 'ADEQUATE') {
                    ventStatusEl.className = 'value status-ok';
                    ventRecEl.className = 'recommendation rec-ok';
                    ventRecEl.textContent = 'Ventilation is adequate for thermal management.';
                 } else {
                    ventStatusEl.className = 'value status-warn';
                    ventRecEl.className = 'recommendation rec-warn';
                    ventRecEl.textContent = 'Inadequate thermal management. Increases risk of thermal runaway.';
                 }
            }

            // Thermal Runaway
            const thermalRiskEl = document.getElementById('thermalRisk');
            const thermalRecEl = document.getElementById('thermalRec');
            thermalRiskEl.textContent = results.thermal.risk;
            if(results.thermal.risk === 'LOW') {
                thermalRiskEl.className = 'value status-ok';
                thermalRecEl.className = 'recommendation rec-ok';
                thermalRecEl.textContent = 'Low risk. Ensure BMS is active and module spacing is maintained.';
            } else if (results.thermal.risk === 'MODERATE') {
                thermalRiskEl.className = 'value status-warn';
                thermalRecEl.className = 'recommendation rec-warn';
                thermalRecEl.textContent = 'Moderate risk. Improve ventilation and verify overcurrent protection.';
            } else {
                thermalRiskEl.className = 'value status-danger';
                thermalRecEl.className = 'recommendation rec-danger';
                thermalRecEl.textContent = 'DANGER: High risk of thermal runaway. Cease operation and re-evaluate system design.';
            }
        }

        function draw() {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0,0,w,h);
            scale = Math.min(w / 800, h / 600);
            
            // Enclosure
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2 * scale;
            ctx.strokeRect(w*0.1, h*0.1, w*0.8, h*0.8);

            // Battery Racks
            const rackWidth = w * 0.5;
            const rackHeight = h * 0.6;
            const rackX = w/2 - rackWidth/2;
            const rackY = h/2 - rackHeight/2;
            for(let i=0; i<4; i++) {
                ctx.fillStyle = '#374151';
                ctx.fillRect(rackX, rackY + i * (rackHeight/4 + 5*scale), rackWidth, rackHeight/4);
            }

            // Fuse
            const fuseX = w*0.8;
            const fuseY = h*0.3;
            ctx.fillStyle = '#4b5563';
            ctx.fillRect(fuseX - 20*scale, fuseY - 40*scale, 40*scale, 80*scale);
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 4*scale;
            ctx.beginPath(); ctx.moveTo(fuseX, fuseY - 20*scale); ctx.lineTo(fuseX, fuseY + 20*scale); ctx.stroke();
            
            // Hazard Icons
            if (results.fuse && results.fuse.status !== 'OK') {
                drawIcon(fuseX, fuseY - 50*scale, 'fa-triangle-exclamation', results.fuse.status === 'UNDERSIZED' ? 'warn' : 'danger');
            }
            if (results.arc && results.arc.ppe !== 'CAT 0') {
                drawIcon(rackX, rackY, 'fa-explosion', ['CAT 1', 'CAT 2'].includes(results.arc.ppe) ? 'warn' : 'danger');
            }
            if(results.vent && results.vent.status === 'INADEQUATE') {
                drawIcon(w*0.2, h*0.2, results.vent.chem === 'lead_acid' ? 'fa-biohazard' : 'fa-temperature-high', results.vent.chem === 'lead_acid' ? 'danger' : 'warn');
            }
            if(results.thermal && results.thermal.risk !== 'LOW') {
                drawIcon(w*0.5, h*0.5, 'fa-fire', results.thermal.risk === 'MODERATE' ? 'warn' : 'danger');
            }

            requestAnimationFrame(draw);
        }
        
        function drawIcon(x, y, icon, type) {
            const size = 30 * scale;
            ctx.font = \`\${size}px "Font Awesome 6 Free"\`;
            ctx.fillStyle = \`var(--\${type}-color)\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const iconCode = {
                'fa-triangle-exclamation': '\\uf071',
                'fa-explosion': '\\uf1e2',
                'fa-biohazard': '\\uf780',
                'fa-temperature-high': '\\uf769',
                'fa-fire': '\\uf06d'
            }[icon];
            ctx.fillText(iconCode, x, y);
        }

        function handleInput() {
            calculate();
            updateUI();
        }

        Object.values(inputs).forEach(input => {
            input.addEventListener('input', handleInput);
        });

        function init() {
            const vizArea = canvas.parentElement;
            canvas.width = vizArea.clientWidth;
            canvas.height = vizArea.clientHeight;
            handleInput();
            draw();
        }
        
        window.addEventListener('resize', init);
        
        init();

    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default BatterySafetyToolPage;