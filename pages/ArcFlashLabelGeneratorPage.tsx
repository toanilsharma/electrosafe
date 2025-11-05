import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const ArcFlashLabelGeneratorPage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arc Flash Label Generator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #0f172a;
            --panel-bg: #1e293b;
            --border-color: rgba(251, 146, 60, 0.3);
            --primary-color: #fb923c;
            --text-color: #e2e8f0;
            --text-muted: #94a3b8;
            --warning-header: #f59e0b;
            --warning-text: #000;
            --danger-header: #dc2626;
            --danger-text: #fff;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: var(--bg-color); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; font-size: 14px; }
        .container { display: flex; flex-direction: row; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); display: flex; flex-direction: column; overflow-y: auto; }
        .form-panel { flex: 1; min-width: 320px; max-width: 450px; }
        .preview-panel { flex: 2; min-width: 400px; align-items: center; justify-content: center; background: #334155; }
        .panel-title { font-size: 1.5rem; margin-bottom: 20px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .form-group { display: flex; flex-direction: column; }
        .form-group.full-width { grid-column: 1 / -1; }
        .form-group label { margin-bottom: 6px; color: var(--text-muted); font-weight: 500; }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            border-radius: 6px;
            font-size: 1rem;
        }
        .form-group select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%2394a3b8' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.7rem center; background-size: 8px 10px; }
        .print-button { width: 100%; padding: 12px; margin-top: 20px; background: var(--primary-color); border: none; color: #000; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; border-radius: 6px; }
        .print-button:hover { background: #f97316; }

        /* Label Styles */
        #label-preview {
            width: 4in;
            height: 6in;
            background: #fff;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0.1in;
            display: flex;
            flex-direction: column;
            border: 1px solid #ccc;
            transform: scale(0.9);
            transform-origin: center;
        }
        .label-header {
            text-align: center;
            font-weight: bold;
            font-size: 36pt;
            padding: 0.1in 0;
            border: 4px solid #000;
            text-transform: uppercase;
        }
        .label-header.warning { background: var(--warning-header); color: var(--warning-text); }
        .label-header.danger { background: var(--danger-header); color: var(--danger-text); }
        
        .label-body { flex-grow: 1; border: 4px solid #000; border-top: none; display: flex; flex-direction: column; }
        .equipment-id { text-align: center; font-size: 12pt; font-weight: bold; padding: 0.1in; border-bottom: 2px solid #000; }
        
        .hazard-grid { display: grid; grid-template-columns: 1fr 1fr; flex-grow: 1; }
        .hazard-section { padding: 0.15in; display: flex; flex-direction: column; }
        .hazard-section:first-child { border-right: 2px solid #000; }
        
        .hazard-title { display: flex; align-items: center; font-size: 14pt; font-weight: bold; margin-bottom: 0.2in; }
        .hazard-title i { font-size: 24pt; margin-right: 0.15in; width: 30px; text-align: center;}
        
        .hazard-item { display: grid; grid-template-columns: 1.5in auto; margin-bottom: 0.15in; font-size: 11pt; align-items: center; }
        .hazard-item .label { font-weight: bold; }
        .hazard-item .value { font-weight: normal; }

        .ppe-section { padding: 0.15in; border-top: 2px solid #000; }
        .ppe-section .hazard-title { margin-bottom: 0.1in; }
        .ppe-list { font-size: 10pt; list-style: none; padding: 0; }
        .ppe-list li { margin-bottom: 0.05in; }

        @media print {
            body, .container, .panel {
                visibility: hidden;
                margin: 0;
                padding: 0;
                box-shadow: none;
                background: none;
                border: none;
            }
            .preview-panel {
                 position: absolute;
                 top: 0; left: 0;
                 width: 100%;
                 height: 100%;
                 visibility: visible;
                 background: none;
            }
            #label-preview {
                visibility: visible;
                transform: scale(1);
                margin: 0;
                page-break-after: always;
            }
        }
         @media (max-width: 900px) {
            body { overflow-y: auto; }
            .container { flex-direction: column; height: auto; }
            .panel { max-width: 100%; }
            .preview-panel { min-height: 600px; padding: 20px 0; }
            #label-preview { transform: scale(0.8); }
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="panel form-panel">
            <h2 class="panel-title">Label Data Entry</h2>
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="headerType">Header Type</label>
                    <select id="headerType" data-target="label-header" data-class="true">
                        <option value="warning">Warning (Orange)</option>
                        <option value="danger">Danger (Red)</option>
                    </select>
                </div>
                <div class="form-group full-width">
                    <label for="equipmentId">Equipment Name / ID</label>
                    <input type="text" id="equipmentId" data-target="equipment-id-value" value="MCC-01A">
                </div>
                
                <div class="form-group full-width"><hr style="border-color: var(--border-color)"></div>

                <div class="form-group">
                    <label for="voltage">Nominal Voltage</label>
                    <input type="text" id="voltage" data-target="voltage-value" value="480 VAC">
                </div>
                <div class="form-group">
                    <label for="incidentEnergy">Incident Energy</label>
                    <input type="text" id="incidentEnergy" data-target="incident-energy-value" value="5.2 cal/cm²">
                </div>
                <div class="form-group">
                    <label for="arcBoundary">Arc Flash Boundary</label>
                    <input type="text" id="arcBoundary" data-target="arc-boundary-value" value="36 inches">
                </div>
                <div class="form-group">
                    <label for="workingDistance">Working Distance</label>
                    <input type="text" id="workingDistance" data-target="working-distance-value" value="18 inches">
                </div>
                
                <div class="form-group full-width"><hr style="border-color: var(--border-color)"></div>
                
                <div class="form-group">
                    <label for="limitedBoundary">Limited Approach</label>
                    <input type="text" id="limitedBoundary" data-target="limited-boundary-value" value="42 inches">
                </div>
                <div class="form-group">
                    <label for="restrictedBoundary">Restricted Approach</label>
                    <input type="text" id="restrictedBoundary" data-target="restricted-boundary-value" value="12 inches">
                </div>

                <div class="form-group full-width"><hr style="border-color: var(--border-color)"></div>

                 <div class="form-group full-width">
                    <label for="ppeCategory">PPE Category / List</label>
                    <input type="text" id="ppeCategory" data-target="ppe-list-value" value="CAT 2: AR Shirt & Pants, Balaclava, AR Face Shield, Hard Hat, Insulated Gloves, Leather Footwear">
                </div>
                
                <div class="form-group">
                    <label for="analysisSource">Analysis Source</label>
                    <input type="text" id="analysisSource" data-target="analysis-source-value" value="IEEE 1584-2018">
                </div>
                <div class="form-group">
                    <label for="analysisDate">Analysis Date</label>
                    <input type="date" id="analysisDate" data-target="analysis-date-value">
                </div>

            </div>
            <button class="print-button" id="printButton"><i class="fas fa-print"></i> Print Label</button>
        </div>
        <div class="panel preview-panel">
            <div id="label-preview">
                <div id="label-header" class="label-header warning">Warning</div>
                <div class="label-body">
                    <div class="equipment-id" id="equipment-id-value">MCC-01A</div>
                    <div class="hazard-grid">
                        <div class="hazard-section">
                            <div class="hazard-title"><i class="fas fa-explosion"></i> Arc Flash Hazard</div>
                            <div class="hazard-item">
                                <span class="label">Incident Energy:</span>
                                <span class="value" id="incident-energy-value">5.2 cal/cm²</span>
                            </div>
                            <div class="hazard-item">
                                <span class="label">Working Distance:</span>
                                <span class="value" id="working-distance-value">18 inches</span>
                            </div>
                            <div class="hazard-item">
                                <span class="label">Arc Flash Boundary:</span>
                                <span class="value" id="arc-boundary-value">36 inches</span>
                            </div>
                        </div>
                        <div class="hazard-section">
                            <div class="hazard-title"><i class="fas fa-bolt"></i> Shock Hazard</div>
                             <div class="hazard-item">
                                <span class="label">Voltage:</span>
                                <span class="value" id="voltage-value">480 VAC</span>
                            </div>
                            <div class="hazard-item">
                                <span class="label">Limited Approach:</span>
                                <span class="value" id="limited-boundary-value">42 inches</span>
                            </div>
                            <div class="hazard-item">
                                <span class="label">Restricted Approach:</span>
                                <span class="value" id="restricted-boundary-value">12 inches</span>
                            </div>
                        </div>
                    </div>
                    <div class="ppe-section">
                         <div class="hazard-title"><i class="fas fa-hard-hat"></i> Required PPE</div>
                         <ul class="ppe-list">
                            <li id="ppe-list-value">CAT 2: AR Shirt & Pants, Balaclava, AR Face Shield, Hard Hat, Insulated Gloves, Leather Footwear</li>
                         </ul>
                         <div style="font-size: 8pt; text-align: right; margin-top: 0.1in;">
                            Source: <span id="analysis-source-value">IEEE 1584-2018</span> | 
                            Date: <span id="analysis-date-value"></span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const formInputs = document.querySelectorAll('.form-panel input, .form-panel select');
            const printButton = document.getElementById('printButton');

            function updateLabel() {
                formInputs.forEach(input => {
                    const targetId = input.dataset.target;
                    const targetEl = document.getElementById(targetId);
                    if (!targetEl) return;

                    if (input.dataset.class) {
                        targetEl.className = 'label-header ' + input.value;
                        targetEl.textContent = input.options[input.selectedIndex].text.split(' ')[0];
                    } else {
                        targetEl.textContent = input.value;
                    }
                });
            }

            formInputs.forEach(input => {
                input.addEventListener('input', updateLabel);
            });
            
            printButton.addEventListener('click', () => {
                window.print();
            });

            // Set initial date and update
            const dateInput = document.getElementById('analysisDate');
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            updateLabel();
        });
    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default ArcFlashLabelGeneratorPage;