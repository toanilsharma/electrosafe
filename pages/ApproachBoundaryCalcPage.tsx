import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const ApproachBoundaryCalcPage: React.FC = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safe Approach Boundary Calculator (NFPA 70E)</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #3b82f6; /* Blue */
            --bg-color: #1e1b4b;      
            --panel-bg: rgba(30, 27, 75, 0.9);
            --border-color: rgba(59, 130, 246, 0.3);
            --text-color: #f9fafb;
            --text-muted: #93c5fd;
            --limited-color: #f59e0b; /* Amber */
            --restricted-color: #ef4444; /* Red */
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: linear-gradient(135deg, var(--bg-color), #312e81); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2); display: flex; flex-direction: column; }
        .left-panel { flex: 1; min-width: 300px; max-width: 350px; }
        .right-panel { flex: 1.5; min-width: 320px; }
        .panel-title { font-size: 1.5rem; margin-bottom: 20px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .control-group { margin-bottom: 25px; }
        .control-label { display: block; margin-bottom: 10px; font-size: 1rem; color: var(--text-muted); font-weight: 500;}
        .voltage-display { text-align: center; font-size: 2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 15px; }
        input[type="range"] { width: 100%; height: 8px; background: rgba(59, 130, 246, 0.2); -webkit-appearance: none; appearance: none; border-radius: 4px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; background: var(--primary-color); border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); }
        .radio-group { display: flex; gap: 10px; }
        .radio-option { flex: 1; padding: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; }
        .radio-option.active { background: var(--primary-color); color: #fff; font-weight: bold; }
        
        .visualization-area { position: relative; flex: 2; min-width: 350px; border-radius: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border-color); background: radial-gradient(ellipse at center, #1e294b, var(--bg-color));}
        #boundaryCanvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

        .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .result-card { border-radius: 10px; padding: 15px; text-align: center; }
        .result-card.limited { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.4); }
        .result-card.restricted { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); }
        .result-card .label { font-size: 1.1rem; margin-bottom: 8px; }
        .result-card .value { font-size: 2.2rem; font-weight: bold; }
        .result-card .sub-value { font-size: 1rem; color: var(--text-muted); }
        .result-card.limited .label { color: var(--limited-color); }
        .result-card.restricted .label { color: var(--restricted-color); }
        
        .explanation-section { font-size: 0.9rem; line-height: 1.6; }
        .explanation-section h3 { font-size: 1.1rem; margin-bottom: 10px; padding-bottom: 5px; display: flex; align-items: center; gap: 8px; }
        .explanation-section p { color: var(--text-muted); }
        .explanation-section .limited h3 { color: var(--limited-color); border-bottom: 1px solid rgba(245, 158, 11, 0.3); }
        .explanation-section .restricted h3 { color: var(--restricted-color); border-bottom: 1px solid rgba(239, 68, 68, 0.3); }
        .disclaimer { font-size: 0.8rem; text-align: center; color: #6b7280; margin-top: 20px; }
        
        @media (max-width: 1024px) {
            .container { flex-direction: column; }
            .panel { max-width: 100%; }
            .visualization-area { min-height: 50vh; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="panel left-panel">
            <h2 class="panel-title"><i class="fas fa-sliders-h"></i> System Parameters</h2>
            <div class="control-group">
                <label class="control-label">System Type</label>
                <div class="radio-group">
                    <div id="typeAC" class="radio-option active">AC System</div>
                    <div id="typeDC" class="radio-option">DC System</div>
                </div>
            </div>
            <div class="control-group">
                <label for="voltage" class="control-label">System Voltage (Phase-to-Phase for AC)</label>
                <div class="voltage-display" id="voltageDisplay">750 V</div>
                <input type="range" id="voltage" min="50" max="72500" value="750" step="1">
            </div>
             <div class="disclaimer">
                <i class="fas fa-info-circle"></i> Based on NFPA 70E-2024 Table 130.4(E)(a) for AC and Table 130.4(E)(b) for DC.
            </div>
        </div>
        <div class="visualization-area">
             <canvas id="boundaryCanvas"></canvas>
        </div>
        <div class="panel right-panel">
            <h2 class="panel-title"><i class="fas fa-ruler-combined"></i> Calculated Boundaries</h2>
            <div class="results-grid">
                <div class="result-card limited">
                    <div class="label">Limited Approach</div>
                    <div class="value" id="limitedValue">42 in</div>
                    <div class="sub-value" id="limitedFtValue">3 ft 6 in</div>
                </div>
                <div class="result-card restricted">
                    <div class="label">Restricted Approach</div>
                    <div class="value" id="restrictedValue">Avoid Contact</div>
                    <div class="sub-value" id="restrictedFtValue">&nbsp;</div>
                </div>
            </div>
            <div class="explanation-section">
                <div class="limited">
                    <h3><i class="fas fa-user-friends"></i> Limited Approach Boundary</h3>
                    <p id="limitedExplanation">An approach limit for Unqualified Persons. No unqualified person may approach any closer to the energized conductor than this boundary.</p>
                </div>
                <br>
                <div class="restricted">
                    <h3><i class="fas fa-user-shield"></i> Restricted Approach Boundary</h3>
                    <p id="restrictedExplanation">An approach limit for Qualified Persons. Crossing this boundary means entering the 'hot zone'. An energized work permit and appropriate PPE are required.</p>
                </div>
            </div>
        </div>
    </div>
    <script>
        const acBoundaryData = [
            { maxV: 50, lab: 0, rab: 0 },
            { maxV: 750, lab: 42, rab: 1 }, // 1 = Avoid Contact
            { maxV: 15000, lab: 60, rab: 26 },
            { maxV: 36000, lab: 72, rab: 31 },
            { maxV: 46000, lab: 80, rab: 34 },
            { maxV: 72500, lab: 97, rab: 40 },
        ];

        const dcBoundaryData = [
            { maxV: 100, lab: 0, rab: 0 },
            { maxV: 300, lab: 42, rab: 1 },
            { maxV: 1000, lab: 42, rab: 12 },
            { maxV: 5000, lab: 60, rab: 24 },
            { maxV: 15000, lab: 72, rab: 36 },
            { maxV: 30000, lab: 96, rab: 48 },
        ];

        let state = {
            type: 'AC',
            voltage: 750
        };
        
        let animState = {
            currentLab: 0,
            currentRab: 0,
            targetLab: 0,
            targetRab: 0,
        };

        const canvas = document.getElementById('boundaryCanvas');
        const ctx = canvas.getContext('2d');
        
        function calculateBoundaries() {
            const data = state.type === 'AC' ? acBoundaryData : dcBoundaryData;
            const boundaries = data.find(row => state.voltage <= row.maxV) || data[data.length-1];
            return boundaries;
        }

        function formatInches(inches) {
            if (inches === 0) return 'N/A';
            if (inches === 1) return 'Avoid Contact';
            const feet = Math.floor(inches / 12);
            const remainingInches = inches % 12;
            return \`\${feet} ft \${remainingInches} in\`;
        }

        function updateUI() {
            // Update controls
            document.getElementById('voltageDisplay').textContent = \`\${state.voltage.toLocaleString()} V\`;
            document.getElementById('typeAC').classList.toggle('active', state.type === 'AC');
            document.getElementById('typeDC').classList.toggle('active', state.type === 'DC');
            
            // Calculate and set animation targets
            const { lab, rab } = calculateBoundaries();
            animState.targetLab = lab;
            animState.targetRab = rab;

            // Update result text panels immediately
            const limitedValueEl = document.getElementById('limitedValue');
            const limitedFtValueEl = document.getElementById('limitedFtValue');
            if (lab > 0) {
                limitedValueEl.textContent = \`\${lab} in\`;
                limitedFtValueEl.textContent = formatInches(lab);
            } else {
                limitedValueEl.textContent = 'N/A';
                limitedFtValueEl.textContent = '';
            }
            
            const restrictedValueEl = document.getElementById('restrictedValue');
            const restrictedFtValueEl = document.getElementById('restrictedFtValue');
             if (rab > 1) {
                restrictedValueEl.textContent = \`\${rab} in\`;
                restrictedFtValueEl.textContent = formatInches(rab);
            } else if (rab === 1) {
                restrictedValueEl.textContent = 'Avoid Contact';
                restrictedFtValueEl.textContent = '';
            } else {
                restrictedValueEl.textContent = 'N/A';
                restrictedFtValueEl.textContent = '';
            }
        }
        
        function drawBoundaryLabel(ctx, centerX, centerY, radius, angle, text, color, scale) {
            if (radius < 1) return;

            const leaderStartOffset = 5 * scale;
            const leaderLength = 25 * scale;
            const textPadding = 12 * scale;

            const startX = centerX + Math.cos(angle) * radius;
            const startY = centerY + Math.sin(angle) * radius;
            const midX = centerX + Math.cos(angle) * (radius + leaderStartOffset);
            const midY = centerY + Math.sin(angle) * (radius + leaderStartOffset);
            const endX = centerX + Math.cos(angle) * (radius + leaderStartOffset + leaderLength);
            const endY = centerY + Math.sin(angle) * (radius + leaderStartOffset + leaderLength);

            // Leader line
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5 * scale;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(midX, midY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Text box
            ctx.font = \`bold \${36 * scale}px 'Segoe UI'\`;
            const textMetrics = ctx.measureText(text);
            const textWidth = textMetrics.width;
            const textHeight = 50 * scale;
            
            const isRightSide = Math.cos(angle) > 0;
            let rectX = endX + (isRightSide ? 5 * scale : -textWidth - 5 * scale - 2 * textPadding);
            let rectY = endY - textHeight / 2;
            
            ctx.fillStyle = 'rgba(10, 15, 30, 0.85)';
            ctx.strokeStyle = color;
            ctx.lineWidth = 1 * scale;

            ctx.beginPath();
            ctx.rect(rectX, rectY, textWidth + 2 * textPadding, textHeight);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, rectX + textPadding, endY);
        }

        function drawVisualization() {
            const w = canvas.width;
            const h = canvas.height;
            const centerX = w / 2;
            const centerY = h / 2;
            const maxDimension = Math.min(w,h) * 0.9;
            const scale = maxDimension / 800;
            
            // Animate current values towards target
            const easing = 0.08;
            animState.currentLab += (animState.targetLab - animState.currentLab) * easing;
            animState.currentRab += (animState.targetRab - animState.currentRab) * easing;

            const maxVoltage = 72500;
            const maxBoundary = Math.max(...acBoundaryData.map(d=>d.lab), ...dcBoundaryData.map(d=>d.lab));
            const opacityFactor = 0.15 + 0.3 * (state.voltage / maxVoltage);
            
            ctx.clearRect(0,0,w,h);
            
            const labRadius = (animState.currentLab / maxBoundary) * (maxDimension * 0.4);
            const rabRadius = (animState.currentRab / maxBoundary) * (maxDimension * 0.4);

            // Draw boundaries with dynamic color fills
            if(animState.currentLab > 0) {
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
                ctx.fillStyle = \`rgba(245, 158, 11, \${opacityFactor})\`;
                ctx.lineWidth = 2 * scale;
                ctx.beginPath();
                ctx.arc(centerX, centerY, labRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
            }

            if(animState.currentRab > 1.5) { // Threshold to avoid drawing "Avoid Contact"
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
                ctx.fillStyle = \`rgba(239, 68, 68, \${opacityFactor})\`;
                ctx.lineWidth = 2 * scale;
                ctx.setLineDash([5 * scale, 5* scale]);
                ctx.beginPath();
                ctx.arc(centerX, centerY, rabRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
                ctx.setLineDash([]);
            }

            // Draw labels
            drawBoundaryLabel(ctx, centerX, centerY, rabRadius, -Math.PI / 4, \`\${Math.round(animState.targetRab)} in\`, '#ef4444', scale);
            drawBoundaryLabel(ctx, centerX, centerY, labRadius, Math.PI / 4, \`\${Math.round(animState.targetLab)} in\`, '#f59e0b', scale);

            // Draw center hazard
            const glow = 15 + 5 * Math.sin(Date.now() * 0.002);
            ctx.fillStyle = '#fef08a';
            ctx.font = \`\${30 * scale}px "Font Awesome 6 Free"\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#fef08a';
            ctx.shadowBlur = glow * scale;
            ctx.fillText('\\uf0e7', centerX, centerY); // bolt icon
            ctx.shadowBlur = 0;

            requestAnimationFrame(drawVisualization);
        }

        function setupEventListeners() {
            document.getElementById('typeAC').addEventListener('click', () => { if(state.type !== 'AC') { state.type = 'AC'; updateUI(); } });
            document.getElementById('typeDC').addEventListener('click', () => { if(state.type !== 'DC') { state.type = 'DC'; updateUI(); } });
            document.getElementById('voltage').addEventListener('input', (e) => { state.voltage = parseInt(e.target.value); updateUI(); });
        }

        function init() {
            const vizArea = canvas.parentElement;
            canvas.width = vizArea.clientWidth;
            canvas.height = vizArea.clientHeight;
            setupEventListeners();
            updateUI();
            // Set initial state without animation
            animState.currentLab = animState.targetLab;
            animState.currentRab = animState.targetRab;
            drawVisualization();
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

export default ApproachBoundaryCalcPage;