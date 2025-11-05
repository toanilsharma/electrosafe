import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const ElectricalSafetyAuditPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Electrical Safety Audit Checklist</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg: #0c1120;
            --panel-bg: rgba(20, 26, 43, 0.9);
            --border: rgba(76, 127, 219, 0.2);
            --primary: #4c7fdb;
            --text: #e0e0e0;
            --text-muted: #9a9a9a;
            --pass: #28a745;
            --fail: #dc3545;
            --na: #6c757d;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: var(--bg); color: var(--text); }
        .container { display: flex; height: 100%; gap: 15px; width: 100%; padding: 10px; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border); border-radius: 15px; backdrop-filter: blur(10px); display: flex; flex-direction: column; padding: 20px; }
        .main-panel { flex: 1; min-width: 400px; overflow-y: auto; }
        .summary-panel { flex: 0 0 380px; min-width: 350px; }
        .panel-title { font-size: 1.5rem; margin-bottom: 20px; color: var(--primary); text-align: center; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
        
        /* Main Panel */
        .control-group { margin-bottom: 20px; }
        .control-group label { display: block; margin-bottom: 10px; font-size: 1rem; color: var(--text-muted); }
        #section-select {
            width: 100%;
            padding: 12px;
            background: rgba(76, 127, 219, 0.1);
            border: 1px solid var(--border);
            color: var(--text);
            border-radius: 8px;
            font-size: 1rem;
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%239a9a9a' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.9rem center;
            background-size: 8px 10px;
        }

        /* Checklist Items */
        .checklist-item { background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 10px; padding: 15px; margin-bottom: 15px; transition: all 0.3s ease; }
        .checklist-item p { margin: 0; font-size: 1rem; line-height: 1.5; }
        .checklist-item-header { display: flex; justify-content: space-between; align-items: center; }
        .checklist-controls { display: flex; gap: 10px; margin-top: 15px; }
        .checklist-controls button { flex: 1; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-pass { background: rgba(40, 167, 69, 0.2); color: var(--pass); border: 1px solid var(--pass); }
        .btn-fail { background: rgba(220, 53, 69, 0.2); color: var(--fail); border: 1px solid var(--fail); }
        .btn-na { background: rgba(108, 117, 125, 0.2); color: var(--na); border: 1px solid var(--na); }
        .btn-pass.active { background: var(--pass); color: #fff; }
        .btn-fail.active { background: var(--fail); color: #fff; }
        .btn-na.active { background: var(--na); color: #fff; }
        .checklist-item.status-pass { border-left: 5px solid var(--pass); }
        .checklist-item.status-fail { border-left: 5px solid var(--fail); }
        .checklist-item.status-na { border-left: 5px solid var(--na); opacity: 0.7; }
        .item-notes { margin-top: 15px; display: none; }
        .item-notes textarea { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 6px; padding: 10px; color: var(--text); min-height: 80px; }

        /* Summary Panel */
        .summary-score { display: flex; justify-content: center; align-items: center; margin-bottom: 20px; }
        .score-gauge { width: 150px; height: 150px; border-radius: 50%; display: flex; justify-content: center; align-items: center; background: conic-gradient(var(--pass) 0deg, var(--border) 0deg); transition: background 0.5s ease; }
        .score-gauge-inner { width: 120px; height: 120px; border-radius: 50%; background: var(--panel-bg); display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .score-percent { font-size: 2.5rem; font-weight: bold; color: #fff; }
        .score-label { font-size: 0.9rem; color: var(--text-muted); }
        .summary-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center; margin-bottom: 20px; }
        .stat-item .value { font-size: 1.5rem; font-weight: bold; }
        .stat-item .label { font-size: 0.8rem; text-transform: uppercase; }
        #stat-pass .value { color: var(--pass); }
        #stat-fail .value { color: var(--fail); }
        #stat-na .value { color: var(--na); }

        #action-items-container { flex-grow: 1; display: flex; flex-direction: column; min-height: 0; }
        #action-items-list { list-style: none; overflow-y: auto; padding-right: 10px; }
        .action-item { background: rgba(220, 53, 69, 0.1); border-radius: 6px; padding: 10px; margin-bottom: 8px; font-size: 0.9rem; }
        .action-item .section { font-size: 0.8rem; color: var(--text-muted); }
        .action-item .text { color: #fff; }
        #report-button { width: 100%; padding: 15px; background: var(--primary); border: none; color: #fff; font-weight: bold; font-size: 1rem; border-radius: 8px; cursor: pointer; transition: background 0.2s; margin-top: auto; }
        #report-button:hover { background: #6395e4; }

        /* Report Styles */
        @media print {
            body * { visibility: hidden; }
            #report-output, #report-output * { visibility: visible; }
            #report-output { position: absolute; left: 0; top: 0; width: 100%; font-size: 12pt; color: #000; }
        }
        #report-output { display: none; }
        
        @media (max-width: 1200px) {
            .container { flex-direction: column; height: auto; overflow-y: auto; }
            .panel { min-width: unset; }
            .summary-panel { order: -1; } /* Move summary to top on mobile */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="panel main-panel" id="main-panel">
            <h2 class="panel-title">Audit Checklist</h2>
            <div class="control-group">
                <label for="section-select">Select Audit Section</label>
                <select id="section-select"></select>
            </div>
            <div id="checklist-items-container"></div>
        </div>
        <div class="panel summary-panel">
            <h2 class="panel-title">Audit Summary</h2>
            <div class="summary-score">
                <div class="score-gauge" id="score-gauge">
                    <div class="score-gauge-inner">
                        <div class="score-percent" id="score-percent">0%</div>
                        <div class="score-label">Compliance</div>
                    </div>
                </div>
            </div>
            <div class="summary-stats">
                <div class="stat-item" id="stat-pass"><div class="value">0</div><div class="label">Pass</div></div>
                <div class="stat-item" id="stat-fail"><div class="value">0</div><div class="label">Fail</div></div>
                <div class="stat-item" id="stat-na"><div class="value">0</div><div class="label">N/A</div></div>
            </div>
            <div id="action-items-container">
                <h3 style="margin-bottom: 10px; color: var(--fail);">Action Items</h3>
                <ul id="action-items-list">
                    <li id="no-action-items">No issues found yet.</li>
                </ul>
            </div>
            <button id="report-button"><i class="fas fa-file-alt"></i> Generate Report</button>
        </div>
    </div>

    <div id="report-output"></div>

    <script>
        const checklistData = [
            { id: 'env', title: 'Work Environment', items: [
                { id: 'env-1', text: 'Is electrical equipment free from evidence of potential damage (e.g., rust, corrosion, physical damage)?' },
                { id: 'env-2', text: 'Is the area around electrical equipment kept clear, with unobstructed access and working space?' },
                { id: 'env-3', text: 'Are electrical rooms and enclosures free from storage of flammable materials?' },
                { id: 'env-4', text: 'Is there adequate lighting for all electrical equipment and work areas?' },
            ]},
            { id: 'ppe', title: 'Personal Protective Equipment', items: [
                { id: 'ppe-1', text: 'Is appropriate arc-rated and shock protection PPE available for all relevant tasks?' },
                { id: 'ppe-2', text: 'Is all PPE properly stored and maintained in a clean, reliable condition?' },
                { id: 'ppe-3', text: 'Are rubber insulating gloves and other rated equipment within their test date?' },
                { id: 'ppe-4', text: 'Do employees demonstrate correct inspection and use of PPE before starting work?' },
            ]},
            { id: 'labels', title: 'Labeling & Signage', items: [
                { id: 'labels-1', text: 'Is all applicable electrical equipment field-marked with an arc flash hazard warning label?' },
                { id: 'labels-2', text: 'Do arc flash labels include all required information (voltage, boundary, incident energy/PPE category, etc.)?' },
                { id: 'labels-3', text: 'Are disconnects, breakers, and control panels clearly and legibly labeled to identify their purpose?' },
                { id: 'labels-4', text: 'Are safety signs posted to warn unqualified persons of electrical hazards?' },
            ]},
            { id: 'equip', title: 'Equipment Condition', items: [
                { id: 'equip-1', text: 'Are all electrical enclosures, panels, and junction boxes securely closed and covered?' },
                { id: 'equip-2', text: 'Are flexible cords and cables free of damage, fraying, or improper splices?' },
                { id: 'equip-3', text: 'Are all circuit breakers and fuses properly rated for their circuit?' },
                { id: 'equip-4', text: 'Are Ground-Fault Circuit-Interrupters (GFCIs) installed where required and tested regularly?' },
            ]},
            { id: 'loto', title: 'Lockout/Tagout (LOTO)', items: [
                { id: 'loto-1', text: 'Is there a documented LOTO program that is reviewed annually?' },
                { id: 'loto-2', text: 'Are sufficient, standardized LOTO devices (locks, tags) available for all affected employees?' },
                { id: 'loto-3', text: 'Is there documented evidence of LOTO training for all authorized and affected employees?' },
                { id: 'loto-4', text: 'Does the LOTO procedure include steps for verification of de-energization (test before touch)?' },
            ]},
            { id: 'training', title: 'Training & Qualification', items: [
                { id: 'training-1', text: 'Is there a list of employees designated as "Qualified Persons" for electrical work?' },
                { id: 'training-2', text: 'Is there documented proof of electrical safety training for all Qualified Persons?' },
                { id: 'training-3', text: 'Is training provided on the proper use of test instruments and emergency procedures?' },
            ]},
        ];

        let auditState = {};

        function initializeState() {
            checklistData.forEach(section => {
                section.items.forEach(item => {
                    auditState[item.id] = { status: 'pending', notes: '' };
                });
            });
        }

        function populateSectionDropdown() {
            const select = document.getElementById('section-select');
            select.innerHTML = '';
            checklistData.forEach(section => {
                const option = document.createElement('option');
                option.value = section.id;
                option.textContent = section.title;
                select.appendChild(option);
            });
            select.addEventListener('change', (e) => {
                renderChecklistSection(e.target.value);
            });
        }
        
        function renderChecklistSection(sectionId) {
            const section = checklistData.find(s => s.id === sectionId);
            const container = document.getElementById('checklist-items-container');
            container.innerHTML = '';
            section.items.forEach(item => {
                const itemState = auditState[item.id];
                const div = document.createElement('div');
                div.className = \`checklist-item \${itemState.status !== 'pending' ? 'status-' + itemState.status : ''}\`;
                div.id = \`item-\${item.id}\`;
                div.innerHTML = \`
                    <div class="checklist-item-header">
                        <p>\${item.text}</p>
                    </div>
                    <div class="checklist-controls">
                        <button class="btn-pass \${itemState.status === 'pass' ? 'active' : ''}" data-item-id="\${item.id}" data-status="pass"><i class="fas fa-check"></i> Pass</button>
                        <button class="btn-fail \${itemState.status === 'fail' ? 'active' : ''}" data-item-id="\${item.id}" data-status="fail"><i class="fas fa-times"></i> Fail</button>
                        <button class="btn-na \${itemState.status === 'na' ? 'active' : ''}" data-item-id="\${item.id}" data-status="na"><i class="fas fa-minus"></i> N/A</button>
                    </div>
                    <div class="item-notes" style="display: \${itemState.status === 'fail' ? 'block' : 'none'}">
                        <textarea placeholder="Add notes for this finding...">\${itemState.notes}</textarea>
                    </div>
                \`;
                container.appendChild(div);
            });

            // Add event listeners
            document.querySelectorAll('.checklist-controls button').forEach(btn => {
                btn.addEventListener('click', handleItemStatusChange);
            });
            document.querySelectorAll('.item-notes textarea').forEach(area => {
                area.addEventListener('input', (e) => {
                    const itemId = e.target.closest('.checklist-item').id.replace('item-', '');
                    auditState[itemId].notes = e.target.value;
                    updateSummary();
                });
            });
            document.getElementById('main-panel').scrollTop = 0;
        }

        function handleItemStatusChange(e) {
            const button = e.currentTarget;
            const { itemId, status } = button.dataset;
            auditState[itemId].status = status;
            
            const itemEl = document.getElementById(\`item-\${itemId}\`);
            itemEl.className = 'checklist-item'; // Reset classes
            itemEl.classList.add(\`status-\${status}\`);

            button.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const notesEl = itemEl.querySelector('.item-notes');
            notesEl.style.display = status === 'fail' ? 'block' : 'none';

            updateSummary();
        }

        function updateSummary() {
            let pass = 0, fail = 0, na = 0, total = 0;
            for (const id in auditState) {
                total++;
                if (auditState[id].status === 'pass') pass++;
                if (auditState[id].status === 'fail') fail++;
                if (auditState[id].status === 'na') na++;
            }

            const applicableItems = total - na;
            const compliance = applicableItems > 0 ? Math.round((pass / applicableItems) * 100) : 100;

            document.getElementById('stat-pass').querySelector('.value').textContent = pass;
            document.getElementById('stat-fail').querySelector('.value').textContent = fail;
            document.getElementById('stat-na').querySelector('.value').textContent = na;

            document.getElementById('score-percent').textContent = \`\${compliance}%\`;
            document.getElementById('score-gauge').style.background = \`conic-gradient(var(--pass) \${compliance * 3.6}deg, var(--border) 0deg)\`;

            // Update action items
            const actionList = document.getElementById('action-items-list');
            actionList.innerHTML = '';
            let hasFailures = false;
            checklistData.forEach(section => {
                section.items.forEach(item => {
                    if (auditState[item.id].status === 'fail') {
                        hasFailures = true;
                        const li = document.createElement('li');
                        li.className = 'action-item';
                        li.innerHTML = \`<div class="section">\${section.title}</div><div class="text">\${item.text}</div>\`;
                        actionList.appendChild(li);
                    }
                });
            });
            if (!hasFailures) {
                actionList.innerHTML = '<li id="no-action-items">No issues found.</li>';
            }
        }
        
        function generateReport() {
            const { pass, fail, na } = Object.values(auditState).reduce((acc, {status}) => {
                if (status !== 'pending') {
                  acc[status] = (acc[status] || 0) + 1;
                }
                return acc;
            }, {});
            
            const total = (pass || 0) + (fail || 0) + (na || 0);
            const applicableItems = total - (na || 0);
            const compliance = applicableItems > 0 ? Math.round(((pass || 0) / applicableItems) * 100) : 100;
            
            let reportHTML = \`
                <style>
                    body { font-family: sans-serif; } .report-header { text-align: center; } .report-summary-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; text-align: center; padding: 10px; background: #f4f4f4; border-radius: 5px; } .summary-item { border: 1px solid #ddd; padding: 8px; } .summary-item .value { font-size: 1.5em; font-weight: bold; } .report-section { margin-top: 20px; page-break-inside: avoid; } .report-section h2 { border-bottom: 1px solid #ccc; } .report-item { margin: 5px 0; } .report-item-status { font-weight: bold; } .status-pass { color: green; } .status-fail { color: red; } .status-na { color: grey; } .report-notes { margin-left: 20px; font-style: italic; color: #555; }
                </style>
                <div class="report-header"><h1>Electrical Safety Audit Report</h1><p>Date: \${new Date().toLocaleDateString()}</p></div>
                <div class="report-summary-grid">
                    <div class="summary-item"><div class="value" style="color: \${compliance < 70 ? 'red' : 'green'}">\${compliance}%</div><div>Compliance</div></div>
                    <div class="summary-item"><div class="value" style="color: green;">\${pass || 0}</div><div>Pass</div></div>
                    <div class="summary-item"><div class="value" style="color: red;">\${fail || 0}</div><div>Fail</div></div>
                    <div class="summary-item"><div class="value" style="color: grey;">\${na || 0}</div><div>N/A</div></div>
                </div>
            \`;

            checklistData.forEach(section => {
                const sectionItems = section.items.filter(item => auditState[item.id].status !== 'pending');
                if (sectionItems.length > 0) {
                    reportHTML += \`<div class="report-section"><h2>\${section.title}</h2>\`;
                    sectionItems.forEach(item => {
                        const state = auditState[item.id];
                        reportHTML += \`
                            <div class="report-item">
                                <span>\${item.text} - </span>
                                <span class="report-item-status status-\${state.status}">\${state.status.toUpperCase()}</span>
                            </div>
                        \`;
                        if (state.status === 'fail' && state.notes) {
                            reportHTML += \`<div class="report-notes"><strong>Notes:</strong> \${state.notes.replace(/\\n/g, '<br>')}</div>\`;
                        }
                    });
                    reportHTML += \`</div>\`;
                }
            });

            document.getElementById('report-output').innerHTML = reportHTML;
            window.print();
        }

        document.addEventListener('DOMContentLoaded', () => {
            initializeState();
            populateSectionDropdown();
            renderChecklistSection(checklistData[0].id);
            updateSummary();
            document.getElementById('report-button').addEventListener('click', generateReport);
        });
    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default ElectricalSafetyAuditPage;
