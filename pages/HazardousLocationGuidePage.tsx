import React from 'react';
import HtmlToolWrapper from '../components/tools/HtmlToolWrapper';

const HazardousLocationGuidePage: React.FC = () => {
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Hazardous Location Guide</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #1a1a1a;
            --panel-bg: #2a2a2a;
            --border-color: rgba(128, 128, 128, 0.3);
            --primary-color: #f59e0b;
            --text-color: #f0f0f0;
            --text-muted: #a0a0a0;

            --class-i-color: #f59e0b; /* Amber */
            --class-ii-color: #ca8a04; /* Yellow-Brown */
            --class-iii-color: #0ea5e9; /* Sky Blue */
            
            --div-1-color: #dc2626; /* Red */
            --div-2-color: #facc15; /* Yellow */
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        html, body { height: 100%; overflow: hidden; background: #000; }
        body { background: var(--bg-color); color: var(--text-color); display: flex; flex-direction: column; padding: 10px; font-size: 14px; }
        .container { display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; }
        .panel { background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 25px; backdrop-filter: blur(10px); display: flex; flex-direction: column; }
        .selection-panel { flex: 2; min-width: 400px; overflow-y: auto; }
        .results-panel { flex: 3; min-width: 500px; overflow-y: auto; }
        .panel-title { font-size: 1.6rem; margin-bottom: 25px; text-align: center; color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); padding-bottom: 15px; border-bottom: 1px solid var(--border-color); }
        
        .step { margin-bottom: 30px; opacity: 0.3; pointer-events: none; transition: all 0.4s ease; border-left: 3px solid var(--border-color); padding-left: 20px; }
        .step.active { opacity: 1; pointer-events: auto; border-left-color: var(--primary-color); }
        .step h3 { font-size: 1.2rem; margin-bottom: 15px; color: var(--text-muted); display: flex; align-items: center; }
        .step h3 .step-number { background: var(--primary-color); color: #000; border-radius: 50%; width: 28px; height: 28px; display: inline-flex; justify-content: center; align-items: center; font-weight: bold; margin-right: 12px; }
        
        .selection-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; }
        .selection-card { background: #3a3a3a; border: 2px solid #4a4a4a; border-radius: 10px; padding: 20px; cursor: pointer; text-align: center; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between; }
        .selection-card:hover { background: #4a4a4a; border-color: var(--primary-color); transform: translateY(-5px); }
        .selection-card.selected { color: #000; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .selection-card.selected .card-icon, .selection-card.selected .card-title, .selection-card.selected .card-desc { color: #000; }
        
        /* Color coding for selections */
        .selection-card.card-class-i.selected { background: var(--class-i-color); border-color: var(--class-i-color); }
        .selection-card.card-class-ii.selected { background: var(--class-ii-color); border-color: var(--class-ii-color); }
        .selection-card.card-class-iii.selected { background: var(--class-iii-color); border-color: var(--class-iii-color); }
        .selection-card.card-division-1.selected { background: var(--div-1-color); border-color: var(--div-1-color); }
        .selection-card.card-division-2.selected { background: var(--div-2-color); border-color: var(--div-2-color); }
        .selection-card.card-zone-0.selected, .selection-card.card-zone-20.selected { background: var(--div-1-color); border-color: var(--div-1-color); }
        .selection-card.card-zone-1.selected, .selection-card.card-zone-21.selected { background: var(--div-2-color); border-color: var(--div-2-color); }


        .card-icon { font-size: 2.5rem; margin-bottom: 10px; color: var(--primary-color); transition: color 0.3s; }
        .card-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 5px; transition: color 0.3s; }
        .card-desc { font-size: 0.85rem; color: var(--text-muted); transition: color 0.3s; }

        .results-placeholder { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: var(--text-muted); }
        .results-placeholder i { font-size: 4rem; margin-bottom: 1rem; color: var(--border-color); }
        .results-content { display: none; animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        #result-title { font-size: 2rem; font-weight: bold; text-align: center; color: var(--primary-color); margin-bottom: 20px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; }
        .result-section { margin-bottom: 25px; }
        .result-section h4 { font-size: 1.3rem; padding-bottom: 8px; border-bottom: 2px solid var(--border-color); margin-bottom: 12px; display: flex; align-items: center; gap: 10px; transition: color 0.3s, border-color 0.3s; }
        
        /* Color coding for results */
        .result-section.theme-class-I h4 { color: var(--class-i-color); border-bottom-color: var(--class-i-color); }
        .result-section.theme-class-II h4 { color: var(--class-ii-color); border-bottom-color: var(--class-ii-color); }
        .result-section.theme-class-III h4 { color: var(--class-iii-color); border-bottom-color: var(--class-iii-color); }
        .result-section.theme-division-1 h4 { color: var(--div-1-color); border-bottom-color: var(--div-1-color); }
        .result-section.theme-division-2 h4 { color: var(--div-2-color); border-bottom-color: var(--div-2-color); }

        .result-section p, .result-section li { line-height: 1.6; font-size: 1rem; }
        .result-section ul { padding-left: 20px; }
        .result-section .highlight { font-weight: bold; }
        .result-section.theme-class-I .highlight { color: var(--class-i-color); }
        .result-section.theme-class-II .highlight { color: var(--class-ii-color); }
        .result-section.theme-class-III .highlight { color: var(--class-iii-color); }
        .result-section.theme-division-1 .highlight { color: var(--div-1-color); }
        .result-section.theme-division-2 .highlight { color: var(--div-2-color); }
        
        .t-code-table { width: 100%; margin-top: 10px; border-collapse: collapse; }
        .t-code-table th, .t-code-table td { border: 1px solid var(--border-color); padding: 8px; text-align: left; }
        .t-code-table th { background-color: #3a3a3a; }

        .disclaimer { font-size: 0.8rem; text-align: center; color: #6b7280; margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-color); }

        @media (max-width: 1024px) {
            body { overflow-y: auto; }
            .container { flex-direction: column; height: auto; }
            .panel { max-width: 100%; overflow-y: visible; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="panel selection-panel">
            <h2 class="panel-title">Location Classifier</h2>

            <div id="step-system" class="step active">
                <h3><span class="step-number">1</span>Select Classification System</h3>
                <div class="selection-grid" id="system-grid"></div>
            </div>

            <div id="steps-class-div" style="display: none;">
                <div id="step-class" class="step">
                    <h3><span class="step-number">2</span>Select the Class of Material</h3>
                    <div class="selection-grid" id="class-grid"></div>
                </div>
                <div id="step-division" class="step">
                    <h3><span class="step-number">3</span>Select the Division (Condition)</h3>
                    <div class="selection-grid" id="division-grid"></div>
                </div>
                <div id="step-group" class="step">
                    <h3><span class="step-number">4</span>Select the Group (Specific Material)</h3>
                    <div class="selection-grid" id="group-grid"></div>
                </div>
            </div>
            
            <div id="steps-zone" style="display: none;">
                 <div id="step-zone-material" class="step">
                    <h3><span class="step-number">2</span>Select Material Type</h3>
                    <div class="selection-grid" id="zone-material-grid"></div>
                </div>
                <div id="step-zone" class="step">
                    <h3><span class="step-number">3</span>Select the Zone (Likelihood of Presence)</h3>
                    <div class="selection-grid" id="zone-grid"></div>
                </div>
                 <div id="step-zone-group" class="step">
                    <h3><span class="step-number">4</span>Select the Gas/Dust Group</h3>
                    <div class="selection-grid" id="zone-group-grid"></div>
                </div>
            </div>

             <div class="disclaimer">
                <i class="fas fa-info-circle"></i> This guide is for educational purposes and is not a substitute for a professional analysis by a qualified person.
            </div>
        </div>
        <div class="panel results-panel">
            <h2 class="panel-title">Classification Details</h2>
            <div id="results-placeholder" class="results-placeholder">
                <i class="fas fa-search-location"></i>
                <p>Follow the steps on the left to determine the hazardous area classification.</p>
            </div>
            <div id="results-content" class="results-content">
                <h3 id="result-title"></h3>
                <div id="result-standards-section"></div>
                <div id="result-class-section"></div>
                <div id="result-division-section"></div>
                <div id="result-group-section"></div>
                <div id="result-protection-section"></div>
                <div id="result-equipment-section"></div>
                <div id="result-temp-section"></div>
            </div>
        </div>
    </div>

    <script>
        const data = {
            systems: [
                { id: 'class-div', title: 'Class/Division System', desc: 'Used primarily in North America (NEC)', icon: 'fa-flag-usa' },
                { id: 'zone', title: 'Zone System', desc: 'Used internationally (IEC) and optionally in the NEC', icon: 'fa-globe' },
            ],
            classes: [
                { id: 'I', title: 'Class I', desc: 'Flammable Gases or Vapors', icon: 'fa-fire-flame-curved' },
                { id: 'II', title: 'Class II', desc: 'Combustible Dust', icon: 'fa-cloud' },
                { id: 'III', title: 'Class III', desc: 'Ignitable Fibers or Flyings', icon: 'fa-fan' }
            ],
            divisions: [
                { id: '1', title: 'Division 1', desc: 'Hazard is normally present', icon: 'fa-circle-exclamation' },
                { id: '2', title: 'Division 2', desc: 'Hazard is abnormally present (e.g., during rupture or failure)', icon: 'fa-triangle-exclamation' }
            ],
            groups: {
                'I': [
                    { id: 'A', title: 'Group A', desc: 'Acetylene' },
                    { id: 'B', title: 'Group B', desc: 'Hydrogen' },
                    { id: 'C', title: 'Group C', desc: 'Ethylene' },
                    { id: 'D', title: 'Group D', desc: 'Gasoline, Propane' }
                ],
                'II': [
                    { id: 'E', title: 'Group E', desc: 'Metal Dusts (e.g., aluminum, magnesium)' },
                    { id: 'F', title: 'Group F', desc: 'Carbonaceous Dusts (e.g., coal, carbon black)' },
                    { id: 'G', title: 'Group G', desc: 'Other Dusts (e.g., flour, grain, wood, plastic)' }
                ],
                'III': [{ id: 'none', title: 'N/A', desc: 'Fibers/Flyings are not subdivided' }]
            },
            zoneMaterial: [
                { id: 'gas', title: 'Gas/Vapor', desc: 'Flammable gases or vapors', icon: 'fa-fire-flame-curved' },
                { id: 'dust', title: 'Dust', desc: 'Combustible dusts', icon: 'fa-cloud' },
            ],
            zones: {
                gas: [
                    {id: '0', title: 'Zone 0', desc: 'Hazard is continuously present', icon: 'fa-infinity'},
                    {id: '1', title: 'Zone 1', desc: 'Hazard is likely present in normal operation', icon: 'fa-circle-exclamation'},
                    {id: '2', title: 'Zone 2', desc: 'Hazard is not likely in normal operation', icon: 'fa-triangle-exclamation'},
                ],
                dust: [
                    {id: '20', title: 'Zone 20', desc: 'Hazard is continuously present', icon: 'fa-infinity'},
                    {id: '21', title: 'Zone 21', desc: 'Hazard is likely present in normal operation', icon: 'fa-circle-exclamation'},
                    {id: '22', title: 'Zone 22', desc: 'Hazard is not likely in normal operation', icon: 'fa-triangle-exclamation'},
                ]
            },
            zoneGroups: {
                gas: [
                     {id: 'IIC', title: 'Group IIC', desc: 'Acetylene, Hydrogen (most hazardous)'},
                     {id: 'IIB', title: 'Group IIB', desc: 'Ethylene'},
                     {id: 'IIA', title: 'Group IIA', desc: 'Propane, Gasoline (least hazardous gas group)'},
                ],
                dust: [
                    {id: 'IIIC', title: 'Group IIIC', desc: 'Conductive Dusts (e.g., metal dusts)'},
                    {id: 'IIIB', title: 'Group IIIB', desc: 'Non-Conductive Dusts (e.g., coal, grain)'},
                    {id: 'IIIA', title: 'Group IIIA', desc: 'Ignitable Fibers/Flyings'},
                ]
            },
            standardsInfo: {
                'class-div': 'This classification is primarily defined by the <strong>NFPA 70®, National Electrical Code® (NEC®)</strong>, specifically Articles 500 through 504. It is the traditional and most widely used system in the United States and other regions following NEC standards.',
                'zone': 'This classification is based on the international standards from the <strong>IEC 60079 series</strong>. It is also recognized as an alternative system within the <strong>NFPA 70®, National Electrical Code® (NEC®)</strong> in Articles 505 and 506. It offers a more granular approach to risk assessment.'
            },
            details: {
                'I': "<strong>Definition:</strong> Locations where flammable gases, vapors, or liquids are present in quantities sufficient to produce explosive or ignitable mixtures.<ul><li><strong>Examples:</strong> Petroleum refineries, gasoline storage areas, spray finishing booths, utility gas plants.</li></ul>",
                'II': "<strong>Definition:</strong> Locations hazardous because of the presence of combustible dust. Finely pulverized dust particles, when suspended in air, can burn rapidly and violently.<ul><li><strong>Examples:</strong> Grain elevators, flour mills, coal preparation plants, producers of plastics, medicines, or fireworks.</li></ul>",
                'III': "<strong>Definition:</strong> Locations with easily ignitable fibers or flyings, but not in quantities that would create an explosive mixture in the air. The hazard comes from potential accumulation on equipment, leading to overheating and fire.<ul><li><strong>Examples:</strong> Textile mills, woodworking plants, cotton gins, flax processing plants.</li></ul>",
                '1': "<strong>Definition:</strong> An area where ignitable concentrations of the hazardous substance can exist under <span class='highlight'>normal operating conditions</span>. This includes situations of frequent maintenance, repair, or leakage.",
                '2': "<strong>Definition:</strong> An area where the hazardous substance is handled or stored in closed containers or systems, and can only escape through <span class='highlight'>accidental rupture, failure of equipment, or other abnormal operation</span>.",
                'gas': "<strong>Definition:</strong> The hazardous material is a substance that is in a gaseous or vaporous state at normal atmospheric temperature and pressure.",
                'dust': "<strong>Definition:</strong> The hazardous material consists of finely divided solid particles that, when suspended in air, can be ignited and cause an explosion.",
                '0': "<strong>Definition:</strong> An area in which an explosive gas atmosphere is present <span class='highlight'>continuously or for long periods of time</span>. This represents the highest level of risk. Requires Equipment Protection Level (EPL) 'Ga'.",
                '1': "<strong>Definition:</strong> An area in which an explosive gas atmosphere is <span class='highlight'>likely to occur in normal operation</span> occasionally. Requires Equipment Protection Level (EPL) 'Gb'.",
                '2': "<strong>Definition:</strong> An area in which an explosive gas atmosphere is <span class='highlight'>not likely to occur in normal operation</span> and, if it does, will persist only for a short period. Requires Equipment Protection Level (EPL) 'Gc'.",
                '20': "<strong>Definition:</strong> An area where a cloud of combustible dust is present <span class='highlight'>continuously or for long periods</span> in normal operation. Requires Equipment Protection Level (EPL) 'Da'.",
                '21': "<strong>Definition:</strong> An area where a cloud of combustible dust is <span class='highlight'>likely to occur</span> in normal operation. Requires Equipment Protection Level (EPL) 'Db'.",
                '22': "<strong>Definition:</strong> An area where a cloud of combustible dust is <span class='highlight'>not likely to occur</span> in normal operation, or persists for only a short period. Requires Equipment Protection Level (EPL) 'Dc'."
            },
            protectionTechniques: {
                 'I-1': [{name: 'Explosionproof', desc: 'Enclosure can withstand an internal explosion and prevent it from igniting the outside atmosphere.'}, {name: 'Intrinsically Safe', desc: 'Limits electrical and thermal energy to a level too low to cause ignition.'}, {name: 'Purged/Pressurized', desc: 'Uses protective gas (e.g., instrument air) to keep hazardous substances out of the enclosure.'}],
                 'I-2': [{name: 'Nonincendive / Energy-Limited', desc: 'Equipment will not produce arcs or heat capable of ignition in normal operation.'}, {name: 'Hermetically Sealed', desc: 'Sealed against vapor entry.'}, {name:'Also any method suitable for Div 1'}],
                 'II-1': [{name: 'Dust-Ignitionproof', desc: 'Enclosure excludes dusts and does not permit arcs or heat to ignite exterior dust accumulations.'}, {name:'Intrinsically Safe'}],
                 'II-2': [{name: 'Dust-Tight', desc: 'Enclosures that prevent dust from entering.'}, {name:'Also any method suitable for Div 1'}],
                 'III-1': [{name:'Equipment designed to minimize dust entry and prevent overheating.'}],
                 'III-2': [{name:'Similar to Division 1, with slightly less stringent requirements.'}],
                 '0': [{name:"Intrinsically Safe ('ia')", desc:"The only method typically permitted."}, {name:"Special protection ('s')", desc:"Other certified methods."}],
                 '1': [{name:"Any method for Zone 0"}, {name:"Explosionproof / Flameproof ('d')", desc:""}, {name:"Increased Safety ('e')", desc:"Prevents sparks and high temps."}, {name:"Pressurization ('p')", desc:""}],
                 '2': [{name:"Any method for Zone 0 or 1"}, {name:"Non-sparking / Spark-proof ('n')", desc:"Designed to be non-incendive in normal operation."}],
                 '20': [{name:"Intrinsically Safe ('iaD')", desc:""}, {name:"Encapsulation ('maD')", desc:"Sealed in resin."}],
                 '21': [{name:"Any method for Zone 20"}, {name:"Protection by Enclosure ('t')", desc:"Dust-ignitionproof."}],
                 '22': [{name:"Any method for Zone 20 or 21"}, {name:"Non-sparking ('nA')", desc:""}],
            },
            equipmentExamples: {
                'I-1': [
                    {name: 'Explosionproof Motors & Lighting', desc: 'Designed to contain an internal explosion.'},
                    {name: 'Intrinsically Safe Sensors', desc: 'Operate on very low energy, incapable of causing ignition.'},
                    {name: 'Purged & Pressurized Panels', desc: 'Use positive air pressure to keep flammable gases out.'}
                ],
                'I-2': [
                    {name: 'Nonincendive Equipment', desc: 'Not capable of igniting a hazard in normal operation.'},
                    {name: 'Hermetically Sealed Relays', desc: 'Gas-tight seals prevent hazardous vapors from entering.'},
                    {name: 'Any equipment rated for Class I, Division 1.'}
                ],
                'II-1': [
                    {name: 'Dust-Ignitionproof Enclosures', desc: 'Keeps dust out and prevents internal heat from igniting dust layers.'},
                    {name: 'Intrinsically Safe Systems', desc: 'Low energy circuits prevent ignition of dust clouds.'}
                ],
                'II-2': [
                    {name: 'Dust-Tight Enclosures', desc: 'Prevents dust ingress but not as robustly as dust-ignitionproof.'},
                    {name: 'Any equipment rated for Class II, Division 1.'}
                ],
                'III-1': [
                    {name: 'Totally Enclosed Non-Ventilated (TENV) Motors', desc: 'Prevents fiber accumulation and overheating.'},
                    {name: 'Dust-Tight Enclosures for switches and contacts.'}
                ],
                'III-2': [
                    {name: 'Same as Division 1', desc: 'Requirements are very similar; equipment must prevent fiber entry and overheating.'}
                ],
                '0': [
                    {name: "Intrinsically Safe Apparatus ('ia')", desc: "The primary and often only suitable method for Zone 0, such as process transmitters."}
                ],
                '1': [
                    {name: "Flameproof Enclosures ('d')", desc: "The Zone system's equivalent of Explosionproof, used for motors and switchgear."},
                    {name: "Increased Safety Motors & Terminals ('e')", desc: "Built to a very high quality to prevent sparks or high temperatures."},
                    {name: "Any equipment rated for Zone 0."}
                ],
                '2': [
                    {name: "Non-Sparking Equipment ('n')", desc: "Designed to be non-ignitive during normal operation, common for lighting and motors."},
                    {name: "Pressurized Enclosures ('p')", desc: "Used for large control cabinets."},
                    {name: "Any equipment rated for Zone 0 or Zone 1."}
                ],
                '20': [
                    {name: "Intrinsically Safe Dust Systems ('iaD')", desc: "Low energy systems specifically for dust atmospheres, like level sensors in silos."},
                    {name: "Encapsulation ('maD')", desc: "Components are potted in resin to prevent dust contact."}
                ],
                '21': [
                    {name: "Protection by Enclosure ('t')", desc: "The Zone system's equivalent of Dust-Ignitionproof, used for motors and junction boxes."},
                    {name: "Any equipment rated for Zone 20."}
                ],
                '22': [
                    {name: "Protection by Enclosure ('t')", desc: "Similar to Zone 21, but may have a lower IP rating."},
                    {name: "Any equipment rated for Zone 20 or 21."}
                ]
            },
            tempCodeInfo: "<strong>Temperature Code (T-Code) is a critical safety requirement.</strong> The maximum surface temperature of any equipment used in the hazardous area must be lower than the autoignition temperature of the specific hazardous material present. The T-Codes define this maximum temperature."
        };

        let state = { system: null, class: null, division: null, group: null, zoneMaterial: null, zone: null, zoneGroup: null };

        document.addEventListener('DOMContentLoaded', () => {
            const systemGrid = document.getElementById('system-grid');
            data.systems.forEach(s => systemGrid.appendChild(createCard(s, 'system')));
            updateUI();
        });

        function createCard(item, type) {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.classList.add(\`card-\${type}-\${item.id}\`);
            card.dataset.type = type;
            card.dataset.id = item.id;
            card.innerHTML = \`<i class="card-icon fas \${item.icon || ''}"></i><div><div class="card-title">\${item.title}</div><div class="card-desc">\${item.desc}</div></div>\`;
            card.addEventListener('click', () => handleSelection(type, item.id));
            return card;
        }

        function handleSelection(type, id) {
            if (state[type] === id) return; // No change

            state[type] = id;
            
            // Reset subsequent selections
            if (type === 'system') {
                ['class', 'division', 'group', 'zoneMaterial', 'zone', 'zoneGroup'].forEach(k => state[k] = null);
            }
            if (type === 'class' || type === 'zoneMaterial') {
                ['division', 'group', 'zone', 'zoneGroup'].forEach(k => state[k] = null);
            }
            if (type === 'division' || type === 'zone') {
                ['group', 'zoneGroup'].forEach(k => state[k] = null);
            }
            
            updateUI();
        }

        function updateUI() {
            // Update selections
            updateSelectionGrid('system', data.systems);
            
            const classDivSteps = document.getElementById('steps-class-div');
            const zoneSteps = document.getElementById('steps-zone');

            classDivSteps.style.display = state.system === 'class-div' ? 'block' : 'none';
            zoneSteps.style.display = state.system === 'zone' ? 'block' : 'none';
            
            if (state.system === 'class-div') updateClassDivUI();
            if (state.system === 'zone') updateZoneUI();

            updateResultsPanel();
        }

        function updateClassDivUI() {
            document.getElementById('step-class').classList.add('active');
            const classGrid = document.getElementById('class-grid');
            if(classGrid.children.length === 0) data.classes.forEach(c => classGrid.appendChild(createCard(c, 'class')));
            updateSelectionGrid('class', data.classes);

            const divStep = document.getElementById('step-division');
            const divGrid = document.getElementById('division-grid');
            if(state.class) {
                divStep.classList.add('active');
                if(divGrid.children.length === 0) data.divisions.forEach(d => divGrid.appendChild(createCard(d, 'division')));
                updateSelectionGrid('division', data.divisions);
            } else {
                divStep.classList.remove('active');
            }
            
            const groupStep = document.getElementById('step-group');
            const groupGrid = document.getElementById('group-grid');
            if(state.division) {
                groupStep.classList.add('active');
                const groupsForClass = data.groups[state.class];
                groupGrid.innerHTML = ''; // Rebuild for different classes
                groupsForClass.forEach(g => groupGrid.appendChild(createCard(g, 'group')));
                updateSelectionGrid('group', groupsForClass);
            } else {
                groupStep.classList.remove('active');
            }
        }
        
        function updateZoneUI() {
            document.getElementById('step-zone-material').classList.add('active');
            const matGrid = document.getElementById('zone-material-grid');
            if(matGrid.children.length === 0) data.zoneMaterial.forEach(m => matGrid.appendChild(createCard(m, 'zoneMaterial')));
            updateSelectionGrid('zoneMaterial', data.zoneMaterial);

            const zoneStep = document.getElementById('step-zone');
            const zoneGrid = document.getElementById('zone-grid');
            if(state.zoneMaterial) {
                zoneStep.classList.add('active');
                const zones = data.zones[state.zoneMaterial];
                zoneGrid.innerHTML = '';
                zones.forEach(z => zoneGrid.appendChild(createCard(z, 'zone')));
                updateSelectionGrid('zone', zones);
            } else {
                zoneStep.classList.remove('active');
            }
            
            const groupStep = document.getElementById('step-zone-group');
            const groupGrid = document.getElementById('zone-group-grid');
            if(state.zone) {
                groupStep.classList.add('active');
                const groups = data.zoneGroups[state.zoneMaterial];
                groupGrid.innerHTML = '';
                groups.forEach(g => groupGrid.appendChild(createCard(g, 'zoneGroup')));
                updateSelectionGrid('zoneGroup', groups);
            } else {
                groupStep.classList.remove('active');
            }
        }

        function updateResultsPanel() {
            const isClassDivComplete = state.system === 'class-div' && state.class && state.division && state.group;
            const isZoneComplete = state.system === 'zone' && state.zoneMaterial && state.zone && state.zoneGroup;

            if (isClassDivComplete || isZoneComplete) {
                document.getElementById('results-placeholder').style.display = 'none';
                document.getElementById('results-content').style.display = 'block';

                let title = '', protectionKey = '';
                
                let standardsHtml = \`<div class="result-section"><h4><i class="fas fa-certificate"></i> Applicable Standards</h4><p>\${data.standardsInfo[state.system]}</p></div>\`;
                let classHtml = '', divHtml = '', groupHtml = '', protectionHtml = '', equipmentHtml = '';
                
                if(isClassDivComplete) {
                    const classTitle = data.classes.find(c => c.id === state.class).title;
                    const divTitle = data.divisions.find(d => d.id === state.division).title;
                    const groupTitle = data.groups[state.class].find(g => g.id === state.group).title;
                    title = \`\${classTitle}, \${divTitle}\` + (groupTitle !== 'N/A' ? \`, \${groupTitle}\` : '');
                    classHtml = \`<div class="result-section theme-class-\${state.class}"><h4><i class="fas fa-cube"></i> \${classTitle} Definition</h4><p>\${data.details[state.class]}</p></div>\`;
                    divHtml = \`<div class="result-section theme-division-\${state.division}"><h4><i class="fas fa-clock"></i> \${divTitle} Definition</h4><p>\${data.details[state.division]}</p></div>\`;
                    if(groupTitle !== 'N/A') groupHtml = \`<div class="result-section"><h4><i class="fas fa-atom"></i> \${groupTitle} Examples</h4><p>Equipment in this group must be safe for use with materials like <span class="highlight">\${data.groups[state.class].find(g => g.id === state.group).desc}</span>.</p></div>\`;
                    protectionKey = \`\${state.class}-\${state.division}\`;
                }

                if(isZoneComplete) {
                    const zoneTitle = data.zones[state.zoneMaterial].find(z => z.id === state.zone).title;
                    const groupTitle = data.zoneGroups[state.zoneMaterial].find(g => g.id === state.zoneGroup).title;
                    title = \`\${zoneTitle}, \${groupTitle}\`;
                    classHtml = \`<div class="result-section"><h4><i class="fas fa-cube"></i> Material Type Definition</h4><p>\${data.details[state.zoneMaterial]}</p></div>\`;
                    divHtml = \`<div class="result-section"><h4><i class="fas fa-clock"></i> \${zoneTitle} Definition</h4><p>\${data.details[state.zone]}</p></div>\`;
                    groupHtml = \`<div class="result-section"><h4><i class="fas fa-atom"></i> \${groupTitle} Examples</h4><p>This group represents gases or dusts with similar ignition properties, such as <span class="highlight">\${data.zoneGroups[state.zoneMaterial].find(g => g.id === state.zoneGroup).desc}</span>.</p></div>\`;
                    protectionKey = state.zone;
                }
                
                document.getElementById('result-title').textContent = title;
                document.getElementById('result-standards-section').innerHTML = standardsHtml;
                document.getElementById('result-class-section').innerHTML = classHtml;
                document.getElementById('result-division-section').innerHTML = divHtml;
                document.getElementById('result-group-section').innerHTML = groupHtml;
                
                const protectionItems = data.protectionTechniques[protectionKey] || [];
                protectionHtml = '<div class="result-section"><h4><i class="fas fa-shield-alt"></i> Suitable Protection Techniques</h4><ul>';
                protectionItems.forEach(p => {
                    protectionHtml += \`<li><strong>\${p.name}:</strong> \${p.desc}</li>\`;
                });
                protectionHtml += '</ul></div>';
                document.getElementById('result-protection-section').innerHTML = protectionHtml;
                
                const equipmentItems = data.equipmentExamples[protectionKey] || [];
                if (equipmentItems.length > 0) {
                    equipmentHtml = '<div class="result-section"><h4><i class="fas fa-cogs"></i> Suitable Equipment Examples</h4><ul>';
                    equipmentItems.forEach(item => {
                        equipmentHtml += \`<li><strong>\${item.name}:</strong> \${item.desc}</li>\`;
                    });
                    equipmentHtml += '</ul></div>';
                }
                document.getElementById('result-equipment-section').innerHTML = equipmentHtml;

                document.getElementById('result-temp-section').innerHTML = \`
                    <div class="result-section">
                        <h4><i class="fas fa-thermometer-half"></i> Temperature Code (T-Code)</h4>
                        <p>\${data.tempCodeInfo}</p>
                        <table class="t-code-table">
                            <tr><th>T-Code</th><th>Max Surface Temp.</th><th>T-Code</th><th>Max Surface Temp.</th></tr>
                            <tr><td>T1</td><td>450°C (842°F)</td><td>T4</td><td>135°C (275°F)</td></tr>
                            <tr><td>T2</td><td>300°C (572°F)</td><td>T5</td><td>100°C (212°F)</td></tr>
                            <tr><td>T3</td><td>200°C (392°F)</td><td>T6</td><td>85°C (185°F)</td></tr>
                        </table>
                    </div>
                \`;

            } else {
                document.getElementById('results-placeholder').style.display = 'flex';
                document.getElementById('results-content').style.display = 'none';
            }
        }

        function updateSelectionGrid(type, items) {
            document.querySelectorAll(\`[data-type="\${type}"]\`).forEach(card => {
                if (card.dataset.id === state[type]) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });
        }
    </script>
</body>
</html>
  `;
  return <HtmlToolWrapper htmlContent={htmlContent} />;
};

export default HazardousLocationGuidePage;
