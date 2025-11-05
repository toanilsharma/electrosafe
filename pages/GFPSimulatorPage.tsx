import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const GFPSimulatorPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ground Fault Protection Simulator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #0f172a;
            --panel-bg: rgba(30, 41, 59, 0.9);
            --border-color: rgba(56, 189, 248, 0.3);
            --primary-color: #38bdf8;
            --text-color: #e2e8f0;
            --text-muted: #94a3b8;
            --status-ok: #4ade80;
            --status-warn: #facc15;
            --status-danger: #f87171;
            --hot-color: #f87171;
            --neutral-color: #60a5fa;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: var(--bg-color); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(56, 189, 248, 0.1); display: flex; flex-direction: column; overflow-y: auto; }
        .input-panel { flex: 1; min-width: 300px; max-width: 400px; }
        .analysis-panel { flex: 1; min-width: 300px; max-width: 420px; }
        .panel-title { font-size: 1.4rem; margin-bottom: 20px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .control-group { margin-bottom: 20px; }
        .control-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted); }
        .value-display { font-weight: bold; color: var(--primary-color); }
        .btn-group { display: flex; gap: 10px; }
        .btn-group button { flex: 1; padding: 12px; border: 1px solid var(--border-color); background: transparent; color: var(--text-muted); border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
        .btn-group button.active { background: var(--primary-color); color: var(--bg-color); border-color: var(--primary-color); }
        input[type="range"] { width: 100%; height: 8px; background: rgba(56, 189, 248, 0.2); -webkit-appearance: none; appearance: none; border-radius: 4px; outline: none;}
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: var(--primary-color); border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px var(--primary-color); }
        .action-button { width: 100%; padding: 15px; border-radius: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; border: 2px solid; }
        .action-button.off { background: rgba(74, 222, 128, 0.2); border-color: var(--status-ok); color: var(--status-ok); }
        .action-button.on { background: rgba(248, 113, 113, 0.2); border-color: var(--status-danger); color: var(--status-danger); }
        .action-button.reset { background: rgba(250, 204, 21, 0.2); border-color: var(--status-warn); color: var(--status-warn); }

        .visualization-area { position: relative; flex: 2; min-width: 400px; background: radial-gradient(ellipse at center, #1e293b, var(--bg-color)); border-radius: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border-color); }
        #simCanvas { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .overall-status { text-align: center; padding: 12px; border-radius: 10px; font-size: 1.5rem; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; transition: all 0.3s; }
        .status-normal { background: var(--status-ok); color: #000; box-shadow: 0 0 15px var(--status-ok); }
        .status-fault { background: var(--status-warn); color: #000; box-shadow: 0 0 15px var(--status-warn); }
        .status-tripped { background: var(--status-danger); color: #fff; box-shadow: 0 0 15px var(--status-danger); }

        .analysis-group { margin-bottom: 15px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; }
        .analysis-group h3 { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .analysis-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .analysis-item:last-child { border-bottom: none; margin-bottom: 0; }
        .analysis-item .label { color: #ccc; }
        .analysis-item .value { font-weight: bold; }
        .ok { color: var(--status-ok); }
        .warn { color: var(--status-warn); }
        .danger { color: var(--status-danger); }
        .recommendation { font-size: 0.9rem; line-height: 1.5; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; margin-top: 10px; border-left: 4px solid; }
        
        @media (max-width: 1200px) { body { overflow: auto; } .container { flex-direction: column; } .panel { max-width: 100%; } .visualization-area { min-height: 50vh; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="panel input-panel">
            <h2 class="panel-title">Scenario Controls</h2>
            <div class="control-group">
                <label class="control-label">Device Type</label>
                <div class="btn-group">
                    <button id="btn-gfci" class="active" data-type="gfci">GFCI (5mA)</button>
                    <button id="btn-gfp" data-type="gfp">GFP (30mA)</button>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">System Voltage <span class="value-display" id="voltageValue">120 V</span></label>
                <input type="range" id="voltage" min="120" max="277" value="120" step="1">
            </div>
            <div class="control-group">
                <label class="control-label">Fault Path Resistance <span class="value-display" id="resistanceValue">50.0 kΩ</span></label>
                <input type="range" id="resistance" min="1" max="50" value="50" step="0.1">
            </div>
            <div class="control-group">
                 <button class="action-button off" id="faultButton"><i class="fas fa-power-off"></i> Simulate Ground Fault</button>
            </div>
             <div class="recommendation" style="border-color: var(--primary-color)">
                <strong>How it Works:</strong> A GFCI/GFP measures the difference between current on the hot and neutral wires. If they don't match, current is leaking to ground (a fault) and the device trips to prevent a deadly shock.
            </div>
        </div>
        
        <div class="visualization-area">
            <canvas id="simCanvas"></canvas>
        </div>
        
        <div class="panel analysis-panel">
            <h2 class="panel-title">Circuit Analysis</h2>
            <div class="overall-status status-normal" id="overallStatus">SYSTEM NORMAL</div>
            
            <div class="analysis-group">
                <h3><i class="fas fa-tachometer-alt"></i> Current Monitoring</h3>
                <div class="analysis-item"><span class="label" style="color: var(--hot-color)">Hot Conductor:</span> <span class="value" id="hotCurrent">1.000 A</span></div>
                <div class="analysis-item"><span class="label" style="color: var(--neutral-color)">Neutral Conductor:</span> <span class="value" id="neutralCurrent">1.000 A</span></div>
                <div class="analysis-item"><span class="label" style="color: var(--status-warn)">Imbalance (Fault):</span> <span class="value" id="faultCurrent">0.0 mA</span></div>
            </div>

            <div class="analysis-group">
                <h3><i class="fas fa-shield-halved"></i> Device Status</h3>
                <div class="analysis-item"><span class="label">Trip Threshold:</span> <span class="value" id="tripThreshold">5.0 mA</span></div>
                <div class="analysis-item"><span class="label">Trip Time:</span> <span class="value" id="tripTime">~25 ms</span></div>
                <div class="analysis-item"><span class="label">Status:</span> <span class="value ok" id="deviceStatus">Monitoring</span></div>
            </div>

            <div class="analysis-group">
                <h3><i class="fas fa-heart-pulse"></i> Physiological Effect</h3>
                <div class="analysis-item"><span class="label">Potential Hazard:</span> <span class="value ok" id="effect">None</span></div>
                <div class="recommendation ok" id="recommendation">System operating normally. No shock hazard present.</div>
            </div>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('simCanvas');
        const ctx = canvas.getContext('2d');

        let state = {
            deviceType: 'gfci',
            voltage: 120,
            resistance: 50, // in kOhms
            faultActive: false,
            tripped: false,
            loadCurrent: 1.0, // Amps
            tripThreshold: 5.0,
        };
        let particles = [];
        
        const ui = {
            btnGfci: document.getElementById('btn-gfci'),
            btnGfp: document.getElementById('btn-gfp'),
            voltage: document.getElementById('voltage'),
            resistance: document.getElementById('resistance'),
            faultButton: document.getElementById('faultButton'),
            voltageValue: document.getElementById('voltageValue'),
            resistanceValue: document.getElementById('resistanceValue'),
            overallStatus: document.getElementById('overallStatus'),
            hotCurrent: document.getElementById('hotCurrent'),
            neutralCurrent: document.getElementById('neutralCurrent'),
            faultCurrent: document.getElementById('faultCurrent'),
            tripThreshold: document.getElementById('tripThreshold'),
            deviceStatus: document.getElementById('deviceStatus'),
            effect: document.getElementById('effect'),
            recommendation: document.getElementById('recommendation')
        };
        
        // --- Event Listeners ---
        ui.btnGfci.addEventListener('click', () => { state.deviceType = 'gfci'; update(); });
        ui.btnGfp.addEventListener('click', () => { state.deviceType = 'gfp'; update(); });
        ui.voltage.addEventListener('input', e => { state.voltage = parseInt(e.target.value); update(); });
        ui.resistance.addEventListener('input', e => { state.resistance = parseFloat(e.target.value); update(); });
        ui.faultButton.addEventListener('click', () => { 
            if (state.tripped) { // Reset logic
                state.tripped = false;
                state.faultActive = false;
            } else {
                state.faultActive = !state.faultActive;
            }
            update(true); // pass true to indicate a manual toggle
        });

        // --- Calculation & Update Logic ---
        function calculate() {
            const results = {};
            results.tripThreshold = state.deviceType === 'gfci' ? 5.0 : 30.0;
            state.tripThreshold = results.tripThreshold;
            
            results.faultCurrent = state.faultActive ? (state.voltage / (state.resistance * 1000)) * 1000 : 0; // in mA
            results.hotCurrent = state.loadCurrent + (results.faultCurrent / 1000);
            results.neutralCurrent = state.loadCurrent;
            
            if (state.tripped) {
                results.hotCurrent = 0;
                results.neutralCurrent = 0;
            }
            return results;
        }

        function update(manualToggle = false) {
            const results = calculate();
            
            if (manualToggle && state.faultActive && !state.tripped && results.faultCurrent >= results.tripThreshold) {
                setTimeout(() => {
                    state.tripped = true;
                    const finalResults = calculate();
                    updateUI(finalResults);
                    sendSafetyAlerts(finalResults);
                }, 30); // Simulate trip time
            }
            updateUI(results);
            if(manualToggle) {
                sendSafetyAlerts(results);
            }
        }
        
        function sendSafetyAlerts(results) {
             const payload = { faultCurrent: results.faultCurrent, tripThreshold: results.tripThreshold };
             window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'gfp-simulator', key: 'GFP_TRIP', value: payload }, '*');
             window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'gfp-simulator', key: 'GFP_DANGEROUS_FAULT', value: payload }, '*');
             window.parent.postMessage({ type: 'SAFETY_ALERT', tool: 'gfp-simulator', key: 'GFP_PAINFUL_SHOCK', value: payload }, '*');
        }

        function updateUI(results) {
            // Controls
            ui.btnGfci.classList.toggle('active', state.deviceType === 'gfci');
            ui.btnGfp.classList.toggle('active', state.deviceType === 'gfp');
            ui.voltageValue.textContent = \`\${state.voltage} V\`;
            ui.resistanceValue.textContent = \`\${state.resistance.toFixed(1)} kΩ\`;

            if (state.tripped) {
                ui.faultButton.className = 'action-button reset';
                ui.faultButton.innerHTML = '<i class="fas fa-undo"></i> Reset Device';
            } else {
                ui.faultButton.className = \`action-button \${state.faultActive ? 'on' : 'off'}\`;
                ui.faultButton.innerHTML = state.faultActive ? '<i class="fas fa-exclamation-triangle"></i> Fault Active' : '<i class="fas fa-power-off"></i> Simulate Ground Fault';
            }

            // Analysis
            let overallStatusText, overallStatusClass;
            let deviceStatusText, deviceStatusClass;
            let effectText, effectClass;
            let recText, recClass;

            const faultCurrent = state.faultActive && !state.tripped ? results.faultCurrent : 0;

            if (state.tripped) {
                overallStatusText = 'SYSTEM TRIPPED'; overallStatusClass = 'status-tripped';
                deviceStatusText = 'Tripped'; deviceStatusClass = 'danger';
                effectText = 'Hazard Cleared'; effectClass = 'ok';
                recText = \`Device tripped, preventing a serious injury. Reset the device and find the cause of the fault.\`; recClass = 'ok';
            } else if (state.faultActive) {
                overallStatusText = 'FAULT DETECTED'; overallStatusClass = 'status-fault';
                deviceStatusText = 'Monitoring Fault'; deviceStatusClass = 'warn';
                if (faultCurrent < 1) { effectText = 'Imperceptible'; effectClass = 'ok'; } 
                else if (faultCurrent < 10) { effectText = 'Painful Shock'; effectClass = 'warn'; } 
                else if (faultCurrent < 50) { effectText = 'Let-Go Hazard'; effectClass = 'danger'; }
                else { effectText = 'Fibrillation Risk'; effectClass = 'danger'; }
                
                if (effectClass === 'danger' && results.tripThreshold > 20) {
                     recText = 'DANGER: A lethal shock is occurring! The selected GFP is for equipment protection and WILL NOT protect personnel.'; recClass = 'danger';
                } else {
                     recText = \`A \${effectText.toLowerCase()} is occurring. This is a hazardous situation.\`; recClass = effectClass;
                }
            } else {
                overallStatusText = 'SYSTEM NORMAL'; overallStatusClass = 'status-normal';
                deviceStatusText = 'Monitoring'; deviceStatusClass = 'ok';
                effectText = 'None'; effectClass = 'ok';
                recText = 'System operating normally. No shock hazard present.'; recClass = 'ok';
            }

            ui.overallStatus.textContent = overallStatusText; ui.overallStatus.className = \`overall-status \${overallStatusClass}\`;
            ui.hotCurrent.textContent = \`\${results.hotCurrent.toFixed(3)} A\`;
            ui.neutralCurrent.textContent = \`\${results.neutralCurrent.toFixed(3)} A\`;
            ui.faultCurrent.textContent = \`\${results.faultCurrent.toFixed(1)} mA\`;
            ui.tripThreshold.textContent = \`\${results.tripThreshold.toFixed(1)} mA\`;
            ui.deviceStatus.textContent = deviceStatusText; ui.deviceStatus.className = \`value \${deviceStatusClass}\`;
            ui.effect.textContent = effectText; ui.effect.className = \`value \${effectClass}\`;
            ui.recommendation.textContent = recText; ui.recommendation.className = \`recommendation \${recClass}\`;
        }

        // --- Animation & Drawing ---
        let lastTime = 0;
        function draw(time) {
            const dt = (time - lastTime) || 0;
            lastTime = time;
            
            const w = canvas.width, h = canvas.height;
            const scale = Math.min(w / 1000, h / 500);
            const layout = {
                source: { x: w * 0.1, y: h / 2 },
                gfci: { x: w * 0.3, y: h / 2 },
                load: { x: w * 0.7, y: h / 2 },
                person: { x: w * 0.85, y: h / 2 },
                ground: { x: w * 0.85, y: h * 0.9 },
                hotY: h/2 - 50*scale,
                neutralY: h/2 + 50*scale,
            };
            const componentSize = 80 * scale;

            ctx.clearRect(0,0,w,h);
            
            // Paths
            const hotPath = [{x: layout.source.x, y: layout.hotY}, {x: layout.load.x, y: layout.hotY}];
            const neutralPath = [{x: layout.load.x, y: layout.neutralY}, {x: layout.source.x, y: layout.neutralY}];
            const faultPath = [{x: layout.load.x, y: layout.load.y-componentSize/2}, {x: layout.person.x, y: layout.person.y}, {x: layout.ground.x, y: layout.ground.y}];
            
            // Wires
            ctx.lineWidth = 6 * scale;
            ctx.strokeStyle = '#4b5563';
            ctx.beginPath(); ctx.moveTo(hotPath[0].x, hotPath[0].y); ctx.lineTo(hotPath[1].x, hotPath[1].y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(neutralPath[0].x, neutralPath[0].y); ctx.lineTo(neutralPath[1].x, neutralPath[1].y); ctx.stroke();

            // Components
            drawComponent(layout.source.x, layout.source.y, 'fa-plug', 'Source', componentSize);
            drawGfci(layout.gfci.x, layout.gfci.y, 'GFCI/GFP', componentSize);
            drawComponent(layout.load.x, layout.load.y, 'fa-blender', 'Appliance', componentSize);
            drawPerson(layout.person.x, layout.person.y, componentSize*1.5);
            drawGround(layout.ground.x, layout.ground.y, scale);

            // Animate Particles
            if (!state.tripped) {
                spawnParticles(dt, hotPath, neutralPath, faultPath, scale);
            }
            updateAndDrawParticles(dt, scale);
            
            requestAnimationFrame(draw);
        }

        function drawComponent(x, y, icon, label, size) {
            ctx.fillStyle = '#374151'; ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2;
            ctx.fillRect(x - size/2, y - size/2, size, size); ctx.strokeRect(x - size/2, y - size/2, size, size);
            ctx.font = \`bold \${size * 0.4}px "Font Awesome 6 Free"\`; ctx.fillStyle = '#e5e7eb'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            const iconCode = {'fa-plug': '\\uf1e6', 'fa-blender': '\\uf517'}[icon];
            ctx.fillText(iconCode, x, y);
            ctx.font = \`bold \${size * 0.18}px 'Segoe UI'\`; ctx.fillText(label, x, y + size * 0.7);
        }

        function drawGfci(x, y, label, size) {
            ctx.fillStyle = '#374151'; ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2;
            ctx.fillRect(x - size/2, y - size/2, size, size); ctx.strokeRect(x - size/2, y - size/2, size, size);
            ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x,y,size*0.3, 0, Math.PI*2); ctx.stroke();
            ctx.strokeStyle = state.tripped ? 'var(--status-danger)' : 'var(--status-ok)'; ctx.lineWidth = 5;
            ctx.beginPath();
            if (state.tripped) {
                ctx.moveTo(x, y - size*0.15 - 5); ctx.lineTo(x + 10, y - size*0.15 - 15);
            } else {
                 ctx.moveTo(x - size*0.25, y - size*0.15); ctx.lineTo(x + size*0.25, y - size*0.15);
            }
            ctx.stroke();
            ctx.font = \`bold \${size * 0.18}px 'Segoe UI'\`; ctx.fillStyle = '#e5e7eb'; ctx.textAlign = 'center'; ctx.fillText(label, x, y + size * 0.7);
        }

        function drawPerson(x, y, size) {
             const faulting = state.faultActive && !state.tripped;
             ctx.save();
             if (faulting) {
                ctx.shadowColor = 'var(--status-warn)'; ctx.shadowBlur = 20;
             }
             ctx.fillStyle = faulting ? '#fde047' : '#4b5563';
             ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 2;
             ctx.beginPath(); ctx.arc(x, y - size * 0.3, size * 0.15, 0, Math.PI * 2); ctx.fill(); // Head
             ctx.beginPath(); ctx.moveTo(x, y - size*0.15); ctx.lineTo(x, y + size*0.15); ctx.lineTo(x - size*0.1, y + size*0.4); ctx.moveTo(x, y+size*0.15); ctx.lineTo(x + size*0.1, y + size*0.4); ctx.stroke(); // Body + Legs
             ctx.restore();
        }

        function drawGround(x, y, scale) {
            ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 4 * scale;
            for (let i = 0; i < 3; i++) {
                const width = (30 - i*10) * scale;
                ctx.beginPath(); ctx.moveTo(x - width, y + i*8*scale); ctx.lineTo(x + width, y + i*8*scale); ctx.stroke();
            }
        }
        
        function spawnParticles(dt, hotPath, neutralPath, faultPath, scale) {
            const speed = 150 * scale;
            const faultCurrent = calculate().faultCurrent;
            const spawnRate = dt / 16 * 10;
            // Hot
            if (Math.random() < spawnRate) particles.push({ x: hotPath[0].x, y: hotPath[0].y, type: 'hot', life: 5000, path: hotPath, pathPos: 0, speed });
            // Neutral
            if (!state.faultActive || faultCurrent < state.tripThreshold) { // Only spawn neutral if not faulting or fault is small
                if (Math.random() < spawnRate) particles.push({ x: neutralPath[0].x, y: neutralPath[0].y, type: 'neutral', life: 5000, path: neutralPath, pathPos: 0, speed });
            }
            // Fault
            if (state.faultActive && faultCurrent > 0.1) {
                const faultSpawnRate = (faultCurrent / state.tripThreshold) * spawnRate;
                if (Math.random() < faultSpawnRate) {
                    particles.push({ x: faultPath[0].x, y: faultPath[0].y, type: 'fault', life: 5000, path: faultPath, pathPos: 0, speed });
                }
            }
        }
        
        function updateAndDrawParticles(dt, scale) {
             particles = particles.filter(p => p.pathPos < p.path.length-1 && p.life > 0);
             particles.forEach(p => {
                const target = p.path[p.pathPos + 1];
                const dx = target.x - p.x; const dy = target.y - p.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const move = p.speed * (dt/1000);

                if (dist < move) {
                    p.pathPos++;
                } else {
                    p.x += (dx/dist) * move;
                    p.y += (dy/dist) * move;
                }
                 p.life -= dt;
                 
                 ctx.beginPath();
                 if (p.type === 'hot') ctx.fillStyle = 'var(--hot-color)';
                 else if (p.type === 'neutral') ctx.fillStyle = 'var(--neutral-color)';
                 else ctx.fillStyle = 'var(--status-warn)';
                 ctx.arc(p.x, p.y, 4 * scale, 0, Math.PI*2);
                 ctx.fill();
             });
        }
        
        function init() {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            update();
            requestAnimationFrame(draw);
        }
        
        window.addEventListener('resize', init);
        init();
    </script>
</body>
</html>
  `;
  return (
    <HtmlToolWrapper htmlContent={htmlContent} />
  );
};

export default GFPSimulatorPage;