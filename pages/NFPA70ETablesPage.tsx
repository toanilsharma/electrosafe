import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const NFPA70ETablesPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive NFPA 70E Risk Assessment Tables</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #f59e0b; /* Amber */
            --bg-color: #111827;      /* Dark Gray */
            --panel-bg: rgba(31, 41, 55, 0.9);
            --border-color: rgba(245, 158, 11, 0.3);
            --text-color: #f9fafb;
            --text-muted: #d1d5db;
            --ok-color: #22c55e;
            --warn-color: #facc15;
            --danger-color: #ef4444;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: linear-gradient(135deg, var(--bg-color), #1f2937); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(245, 158, 11, 0.1); display: flex; flex-direction: column; }
        .left-panel { flex: 2; min-width: 400px; }
        .right-panel { flex: 3; min-width: 500px; }
        .panel-title { font-size: 1.5rem; margin-bottom: 20px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .control-group { margin-bottom: 20px; }
        .control-label { display: block; margin-bottom: 10px; font-size: 1rem; color: var(--text-muted); font-weight: 500;}
        select { 
            width: 100%; 
            padding: 12px; 
            background: rgba(245, 158, 11, 0.1); 
            border: 1px solid var(--border-color); 
            color: var(--text-muted); 
            border-radius: 8px; 
            font-size: 1rem;
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23d1d5db' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.7rem center;
            background-size: 8px 10px;
        }
        select option, select optgroup {
            background-color: #1f2937;
            color: var(--text-muted);
        }
        .radio-group { display: flex; gap: 10px; margin-top: 15px; }
        .radio-option { flex: 1; padding: 12px; background: rgba(245, 158, 11, 0.1); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; }
        .radio-option.active { background: var(--primary-color); color: #111827; font-weight: bold; }
        .info-icon { cursor: pointer; color: var(--text-muted); margin-left: 5px; }
        .results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .result-card { background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 10px; padding: 15px; text-align: center; }
        .result-card .label { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px; }
        .result-card .value { font-size: 1.8rem; font-weight: bold; }
        .value.yes { color: var(--danger-color); }
        .value.no { color: var(--ok-color); }
        .value.cat-0 { color: var(--ok-color); }
        .value.cat-1, .value.cat-2 { color: var(--warn-color); }
        .value.cat-3, .value.cat-4 { color: var(--danger-color); }
        .value.analysis-required {
            color: var(--danger-color);
            font-size: 1.2rem;
            white-space: normal;
        }
        .notes-section { margin-top: 20px; background: rgba(0,0,0,0.3); border-radius: 8px; padding: 15px; font-size: 0.9rem; line-height: 1.5; border-left: 4px solid var(--primary-color); }
        .notes-section h3 { color: var(--primary-color); margin-bottom: 10px; }
        .notes-section ul { list-style-position: inside; padding-left: 5px; }
        .notes-section li { margin-bottom: 5px; }
        .placeholder { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: var(--text-muted); text-align: center;}
        .placeholder i { font-size: 3rem; margin-bottom: 1rem; }
        .disclaimer {
            padding: 10px; 
            margin-bottom: 15px; 
            background: rgba(139, 0, 0, 0.3); 
            border: 1px solid var(--danger-color); 
            border-radius: 8px; 
            font-size: 0.85rem; 
            text-align: center;
        }
        @media (max-width: 1024px) {
            .container { flex-direction: column; }
            .panel { max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="panel left-panel">
            <h2 class="panel-title"><i class="fas fa-tasks"></i> Task Selection</h2>
            <div class="control-group">
                <label for="taskSelect" class="control-label">Select a Task</label>
                <select id="taskSelect" class="search-box">
                    <option value="-1" disabled selected>Select a task...</option>
                </select>
            </div>
            <div class="control-group">
                <label class="control-label">
                    Equipment Condition
                    <i class="fas fa-info-circle info-icon" title="Normal Condition means the equipment is properly installed, maintained, used as intended, doors are closed, covers are in place, and there's no evidence of impending failure."></i>
                </label>
                <div class="radio-group">
                    <div id="condNormal" class="radio-option active">Normal</div>
                    <div id="condAbnormal" class="radio-option">Abnormal</div>
                </div>
            </div>
        </div>
        <div class="panel right-panel">
            <h2 class="panel-title"><i class="fas fa-shield-alt"></i> Risk Assessment Results</h2>
            <div id="resultsContent" class="hidden">
                 <div class="disclaimer">
                    <i class="fas fa-exclamation-triangle"></i> <strong>DISCLAIMER:</strong> This tool is an educational reference based on NFPA 70E tables. It is NOT a substitute for a site-specific risk assessment performed by a qualified person. Always verify field conditions.
                 </div>
                 <div class="results-grid">
                    <div class="result-card">
                        <div class="label">Arc Flash Hazard Identified</div>
                        <div class="value yes" id="arcHazard">Yes</div>
                    </div>
                    <div class="result-card">
                        <div class="label">AR Clothing Required</div>
                        <div class="value cat-2" id="ppeCategory">CAT 2</div>
                    </div>
                    <div class="result-card">
                        <div class="label">Limited Approach Boundary</div>
                        <div class="value" id="limitedBoundary">42 in</div>
                    </div>
                    <div class="result-card">
                        <div class="label">Restricted Approach Boundary</div>
                        <div class="value" id="restrictedBoundary">12 in</div>
                    </div>
                </div>
                <div class="notes-section">
                    <h3 id="notesTitle">Associated Conditions & Notes</h3>
                    <ul id="notesList"></ul>
                </div>
            </div>
            <div id="resultsPlaceholder" class="placeholder">
                <i class="fas fa-clipboard-list"></i>
                <p>Select a task from the list on the left to see the required safety assessment and PPE.</p>
            </div>
        </div>
    </div>
    <script>
        const taskData = [
            // Panelboards & Switchboards <= 1000V
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Normal operation of a circuit breaker, switch, contactor, or starter", arcHazard: "No", ppe: "N/A", limited: "42 in", restricted: "12 in", notes: ["Equipment must be in Normal Condition.", "Doors must be closed and secured."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Reading a panel meter while operating a meter switch", arcHazard: "No", ppe: "N/A", limited: "42 in", restricted: "12 in", notes: ["Equipment must be in Normal Condition."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Opening hinged covers (to expose bare energized parts)", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Removal of bolted covers (to expose bare energized parts)", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Work on energized parts, including voltage testing", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Work on energized parts, including voltage testing (higher fault current)", arcHazard: "Yes", ppe: 4, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 65 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },
            { group: "Panelboards & Switchboards (≤ 1000V)", text: "Perform thermography/visual inspections with covers off", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },

            // Motor Control Centers (MCCs) <= 1000V
            { group: "Motor Control Centers (MCCs, ≤ 1000V)", text: "Normal operation of a starter or switch", arcHazard: "No", ppe: "N/A", limited: "42 in", restricted: "12 in", notes: ["Equipment must be in Normal Condition.", "Doors must be closed and secured."] },
            { group: "Motor Control Centers (MCCs, ≤ 1000V)", text: "Insertion/Removal of individual starter 'buckets'", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 65 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },
            { group: "Motor Control Centers (MCCs, ≤ 1000V)", text: "Work on energized parts of a starter 'bucket'", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 65 kA fault current, ≤ 0.03 sec (2 cycles) clearing time.", "If parameters are exceeded, an arc flash study is required."] },

            // Switchgear > 1kV
            { group: "Switchgear (> 1kV)", text: "Normal operation of a breaker (doors closed)", arcHazard: "No", ppe: "N/A", limited: "60 in (5 ft)", restricted: "26 in", notes: ["Equipment must be in Normal Condition."] },
            { group: "Switchgear (> 1kV)", text: "Racking circuit breakers (with door open)", arcHazard: "Yes", ppe: 4, limited: "60 in (5 ft)", restricted: "26 in", notes: ["Must use remote racking or be outside arc flash boundary."] },
            { group: "Switchgear (> 1kV)", text: "Opening hinged covers (to expose bare energized parts)", arcHazard: "Yes", ppe: 4, limited: "60 in (5 ft)", restricted: "26 in", notes: ["This is a high-risk activity."] },
             { group: "Switchgear (> 1kV)", text: "Voltage testing on energized parts", arcHazard: "Yes", ppe: 4, limited: "60 in (5 ft)", restricted: "26 in", notes: ["Specialized high-voltage training and equipment required."] },

            // Other Equipment & Fuses
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Work on control circuits with exposed energized parts (>120V)", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["If fault current is limited to < 2kA, PPE can be CAT 1."] },
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Replacing control circuit fuses", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current, ≤ 0.03 sec (2 cycles) clearing time."] },
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Replacing power fuses on a load-side feeder", arcHazard: "Yes", ppe: 4, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 65 kA fault current."] },
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Insertion/Removal of plug-in devices into busways", arcHazard: "Yes", ppe: 4, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 65 kA fault current."] },
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Work in a junction/pull box", arcHazard: "Yes", ppe: 2, limited: "42 in", restricted: "12 in", notes: ["Parameters: ≤ 25 kA fault current."] },
            { group: "Other Equipment & Fuses (≤ 1000V)", text: "Replacing lighting ballasts (120V-277V)", arcHazard: "Yes", ppe: 1, limited: "42 in", restricted: "12 in", notes: ["Must be single phase."] },

             // Batteries
            { group: "Batteries", text: "Maintenance on stationary batteries (>100 VDC)", arcHazard: "Yes", ppe: 1, limited: "42 in", restricted: "12 in", notes: ["Covers must be removed.", "Parameters: ≤ 7kA available short-circuit current."] },
            { group: "Batteries", text: "Voltage/Current measurements on stationary batteries (>100 VDC)", arcHazard: "Yes", ppe: 1, limited: "42 in", restricted: "12 in", notes: ["Covers must be removed.", "Parameters: ≤ 7kA available short-circuit current."] },
        ];


        const taskSelect = document.getElementById('taskSelect');
        const condNormal = document.getElementById('condNormal');
        const condAbnormal = document.getElementById('condAbnormal');
        const resultsContent = document.getElementById('resultsContent');
        const resultsPlaceholder = document.getElementById('resultsPlaceholder');
        
        let currentCondition = 'Normal';
        
        function populateTaskSelect() {
            const groups = [...new Set(taskData.map(task => task.group))];
            
            groups.forEach(groupName => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = groupName;
                taskData.forEach((task, index) => {
                    if (task.group === groupName) {
                        const option = document.createElement('option');
                        option.value = index;
                        option.textContent = task.text;
                        optgroup.appendChild(option);
                    }
                });
                taskSelect.appendChild(optgroup);
            });
        }

        function updateResults(taskIndex) {
            if (taskIndex < 0) {
                resultsContent.classList.add('hidden');
                resultsPlaceholder.classList.remove('hidden');
                return;
            }

            resultsContent.classList.remove('hidden');
            resultsPlaceholder.classList.add('hidden');

            const task = taskData[taskIndex];
            let arcHazard = task.arcHazard;
            let ppe = task.ppe;
            let customNotes = [];

            if (currentCondition === 'Abnormal') {
                // For tasks that are safe under normal conditions, they become hazardous
                if (task.arcHazard === 'No') {
                    arcHazard = "Yes";
                    ppe = "Analysis Required";
                    customNotes.push("ABNORMAL CONDITION: An arc flash hazard now exists. The table method for PPE selection cannot be used.");
                    customNotes.push("A formal engineering analysis (e.g., IEEE 1584) must be performed by a qualified person.");
                } else { // For tasks that are already hazardous
                    arcHazard = "Yes"; // Stays yes
                    ppe = "Analysis Required";
                    customNotes.push("ABNORMAL CONDITION: The existing arc flash hazard is likely increased. The table method for PPE selection is not valid.");
                    customNotes.push("A formal engineering analysis (e.g., IEEE 1584) must be performed by a qualified person.");
                }
            }

            document.getElementById('arcHazard').textContent = arcHazard;
            document.getElementById('arcHazard').className = \`value \${arcHazard.toLowerCase()}\`;

            const ppeEl = document.getElementById('ppeCategory');
            if(typeof ppe === 'number') {
                ppeEl.textContent = \`CAT \${ppe}\`;
                ppeEl.className = \`value cat-\${ppe}\`;
            } else if (ppe === 'Analysis Required') {
                ppeEl.textContent = ppe;
                ppeEl.className = 'value analysis-required';
            }
            else { // N/A case
                ppeEl.textContent = ppe;
                ppeEl.className = 'value cat-0';
            }

            document.getElementById('limitedBoundary').textContent = task.limited;
            document.getElementById('restrictedBoundary').textContent = task.restricted;
            
            const notesList = document.getElementById('notesList');
            notesList.innerHTML = '';
            
            // Display custom abnormal condition notes first if they exist
            customNotes.forEach(note => {
                 const li = document.createElement('li');
                 li.textContent = note;
                 li.style.fontWeight = "bold";
                 li.style.color = "var(--danger-color)";
                 notesList.appendChild(li);
            });

            // Then display standard task notes
            task.notes.forEach(note => {
                const li = document.createElement('li');
                li.textContent = note;
                notesList.appendChild(li);
            });
        }
        
        taskSelect.addEventListener('change', (e) => {
            updateResults(parseInt(e.target.value));
        });

        condNormal.addEventListener('click', () => {
            currentCondition = 'Normal';
            condNormal.classList.add('active');
            condAbnormal.classList.remove('active');
            updateResults(parseInt(taskSelect.value));
        });

        condAbnormal.addEventListener('click', () => {
            currentCondition = 'Abnormal';
            condAbnormal.classList.add('active');
            condNormal.classList.remove('active');
            updateResults(parseInt(taskSelect.value));
        });

        populateTaskSelect();
    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default NFPA70ETablesPage;