
import { Article, RoomGuide, ApplianceGuide, QuizQuestion, HazardImage, TenantIssue, HardwareItem, GlossaryTerm } from './types';
import { Home, BedDouble, Bath, Car, Sofa, Monitor, Sun } from 'lucide-react';
import rustedTerminalsImg from './assets/rusted_terminals.png';
import overloadedStripImg from './assets/overloaded_strip.png';
import scorchedOutletImg from './assets/scorched_outlet.png';
import waterExposureImg from './assets/water_exposure.png';
import brokenSwitchImg from './assets/broken_switch.png';
import damagedCordImg from './assets/damaged_cord.png';
import diyFailImg from './assets/diy_fail.png';
import overheatingPanelImg from './assets/overheating_panel.png';
import rodentDamageImg from './assets/rodent_damage.png';

export const TENANT_ISSUES: TenantIssue[] = [
  {
    id: 'spark',
    label: 'Outlet Sparks when plugging in',
    technicalTerm: 'Arcing Receptacle',
    riskDescription: 'This indicates loose internal contacts which cause arcing temperatures capable of melting the faceplate and igniting surrounding materials.',
    urgency: 'High'
  },
  {
    id: 'hot_switch',
    label: 'Switch/Outlet feels hot',
    technicalTerm: 'Overheating Component (High Resistance)',
    riskDescription: 'Heat indicates active electrical resistance and potential insulation failure. This is a direct precursor to an electrical fire.',
    urgency: 'Emergency'
  },
  {
    id: 'loose',
    label: 'Plug falls out of outlet',
    technicalTerm: 'Worn Receptacle Contacts',
    riskDescription: 'Poor contact pressure increases resistance and heat. It also exposes live pins if the plug hangs halfway out.',
    urgency: 'Medium'
  },
  {
    id: 'flicker',
    label: 'Lights flicker continuously',
    technicalTerm: 'Voltage Fluctuation / Loose Neutral',
    riskDescription: 'This suggests a loose connection in the circuit or panel, which can damage sensitive electronics and pose a fire risk.',
    urgency: 'Medium'
  },
  {
    id: 'trip',
    label: 'Breaker trips frequently',
    technicalTerm: 'Circuit Overload / Short Circuit',
    riskDescription: 'The circuit is being pushed beyond its safe amperage limit. Continued resetting without diagnosis can degrade the breaker.',
    urgency: 'High'
  },
  {
    id: 'shock',
    label: 'Tingle/Shock from appliance',
    technicalTerm: 'Ground Fault / Leakage Current',
    riskDescription: 'This indicates the grounding path is broken or missing. This is a lethal shock hazard if the fault worsens.',
    urgency: 'Emergency'
  },
  {
    id: 'water',
    label: 'Water leaking near electrics',
    technicalTerm: 'Water Ingress Risk',
    riskDescription: 'Water is conductive. Proximity to live electrical components creates an immediate electrocution hazard.',
    urgency: 'Emergency'
  },
  {
    id: 'broken',
    label: 'Cracked faceplate/Cover',
    technicalTerm: 'Exposed Live Parts',
    riskDescription: 'The physical barrier protecting users from live voltage is compromised.',
    urgency: 'Medium'
  }
];

export const HARDWARE_DATA: HardwareItem[] = [
  {
    id: 'mcb',
    name: 'MCB (Miniature Circuit Breaker)',
    aka: 'The Trip Switch',
    description: 'Protects WIRES from melting. It turns off power if you plug in too many things (Overload) or if wires touch (Short Circuit).',
    ratings: ['B-Curve (General)', 'C-Curve (Motors/ACs)', '6A', '10A', '16A', '20A', '32A', '63A'],
    selectionRule: 'Must be lower than the wire\'s capacity. E.g., for 2.5mm wire (20A capacity), use a 16A or 20A MCB.',
    tip: 'Never replace a tripping MCB with a bigger one without upgrading the wire. That causes fires.',
    standards: ['IEC 60898-1', 'IEC 60947-2']
  },
  {
    id: 'rccb',
    name: 'RCCB / ELCB / GFCI',
    aka: 'The Life Saver',
    description: 'Protects HUMANS from shock. It detects current leaking to earth (through a body or water) and cuts power in milliseconds.',
    ratings: ['30mA (Life Safety)', '100mA (Fire Safety)', '2 Pole (Single Phase)', '4 Pole (3-Phase)'],
    selectionRule: 'Use 30mA sensitivity for all home circuits. Rating (e.g., 40A or 63A) depends on total load.',
    tip: 'Test this monthly using the "T" button. If it doesn\'t trip, you have ZERO shock protection.',
    standards: ['IEC 61008-1', 'UL 943', 'IS 12640']
  },
  {
    id: 'wire',
    name: 'Electrical Wire (Cable)',
    aka: 'Conductors',
    description: 'The pipes that carry electricity. Thicker wires carry more current without getting hot.',
    ratings: ['0.75mm', '1.0mm', '1.5mm (Lights)', '2.5mm (Sockets)', '4.0mm (AC/Geyser)', '6.0mm (Main Feed)'],
    selectionRule: 'Lighting: 1.5mm². Power Sockets: 2.5mm². Heavy AC/Geyser: 4.0mm².',
    tip: 'Always use FR (Fire Retardant) or FRLS (Fire Retardant Low Smoke) wires. Cheap wires act like fuses during a fire.',
    standards: ['IEC 60227', 'BS 6004', 'UL 83']
  },
  {
    id: 'socket',
    name: 'Socket Outlet',
    aka: 'Plug Point',
    description: 'The interface for your devices. Quality matters heavily here as loose contacts cause fire.',
    ratings: ['6A/10A (Small)', '16A/20A (Power)', 'Universal', 'Shuttered'],
    selectionRule: 'Use Shuttered sockets (holes close when empty) for child safety.',
    tip: 'If a plug feels loose or falls out, replace the socket immediately. Arcing happens inside loose sockets.',
    standards: ['IEC 60884-1', 'BS 1363']
  },
  {
    id: 'switch',
    name: 'Switch',
    aka: 'Rocker Switch',
    description: 'Controls the flow of power.',
    ratings: ['6A/10A (Lights/Fans)', '16A/20A/32A (Heavy Duty/Double Pole)'],
    selectionRule: 'For Geysers/ACs, use a "Double Pole" (DP) switch that cuts both Live and Neutral.',
    tip: 'A buzzing switch means the internal spring is failing. Replace it.',
    standards: ['IEC 60669-1', 'UL 20']
  }
];

export const STANDARDS_GUIDE = [
  { code: 'IEC 60364', title: 'Low-Voltage Electrical Installations', desc: 'The "Bible" for building wiring logic and safety.' },
  { code: 'IEC 60335', title: 'Household Appliance Safety', desc: 'The standard that ensures your fridge or toaster is safe to use.' },
  { code: 'IEEE 80 / 142', title: 'Grounding Standards', desc: 'Guidelines for proper earthing/grounding systems.' },
];

export const GLOSSARY: GlossaryTerm[] = [
  { term: 'Short Circuit', definition: 'A low-resistance connection between two conductors supplying electrical power to any circuit.', simple: 'Two wires touched that shouldn\'t. The current takes a shortcut and causes a spark.' },
  { term: 'Overload', definition: 'Operation of equipment in excess of normal, full-load rating, or of a conductor in excess of rated ampacity.', simple: 'You plugged in too many things. The pipe is too small for the water.' },
  { term: 'Grounding / Earthing', definition: 'Connecting a circuit to the earth to ensure safety.', simple: 'The safety drain. If electricity leaks, it goes into the dirt instead of you.' },
  { term: 'Tripping', definition: 'The act of a circuit breaker opening the circuit to stop current flow.', simple: 'The safety switch turned off because it sensed danger.' },
  { term: 'Amp (Ampere)', definition: 'The unit of electrical current flow.', simple: 'The volume of electricity flowing. Like gallons per minute.' },
  { term: 'Volt (Voltage)', definition: 'The unit of electrical potential difference.', simple: 'The pressure pushing the electricity. Like water pressure.' },
  { term: 'Watt', definition: 'The unit of electrical power.', simple: 'How much work is being done. Amps x Volts.' },
  { term: 'Phase', definition: 'A distinct line of current.', simple: 'A single power pipe coming from the street.' },
  { term: 'Neutral', definition: 'The return path for current in a circuit.', simple: 'The road back home for the electricity after it does its work.' },
  { term: 'GFCI / RCD', definition: 'Device that breaks the circuit when current balance is lost.', simple: 'A sensor that watches for leaks. If 1 drop leaks out (shock), it cuts power.' },
];

export const LIGHTBULB_GUIDE = [
  { k: 2700, label: 'Warm White', mood: 'Cozy, Relaxing', use: 'Living Room, Bedroom' },
  { k: 3000, label: 'Soft White', mood: 'Friendly, Inviting', use: 'Dining Room' },
  { k: 4000, label: 'Cool White', mood: 'Clean, Focused', use: 'Kitchen, Garage' },
  { k: 6500, label: 'Daylight', mood: 'Alert, Clinical', use: 'Office, Reading' },
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How old is the electrical wiring in your home?",
    whyItMatters: "Insulation on wires degrades over time, becoming brittle and cracking, which exposes live wires. 30+ years is the danger zone.",
    options: [{ label: "Less than 10 years", score: 0 }, { label: "10-25 years", score: 2 }, { label: "Over 30 years", score: 5 }, { label: "I don't know", score: 3 }]
  },
  {
    id: 2,
    question: "Do you have Ground Fault Protection (RCD/GFCI) installed?",
    whyItMatters: "Standard breakers protect the house from fire. GFCI/RCDs protect YOU from fatal shock. Without them, electricity can pass through your body to the ground.",
    options: [{ label: "Yes, on all circuits", score: 0 }, { label: "Only in wet areas", score: 2 }, { label: "No / I don't know", score: 5 }]
  },
  {
    id: 3,
    question: "Do your circuit breakers trip frequently?",
    whyItMatters: "Frequent tripping means the circuit is overloaded (too much heat). Ignoring this leads to wire insulation melting inside the walls.",
    options: [{ label: "Never", score: 0 }, { label: "Occasionally", score: 3 }, { label: "Often", score: 5 }]
  },
  {
    id: 4,
    question: "Is there a burning smell near your electrical panel?",
    whyItMatters: "Fishy or burning smells indicate active melting of plastic components. This is a pre-fire condition.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 5,
    question: "Do you hear buzzing sounds from switches or outlets?",
    whyItMatters: "Buzzing is the sound of electricity jumping a gap (arcing). This arc is thousands of degrees hot and starts fires.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 6,
    question: "Are any wall outlets warm to the touch?",
    whyItMatters: "Resistance creates heat. A warm outlet means the connection inside is loose or corroded.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 7,
    question: "Are your outlet cover plates broken or cracked?",
    whyItMatters: "Cracks expose live bus bars. A curious child or a metal object can easily bridge the connection.",
    options: [{ label: "None", score: 0 }, { label: "A few", score: 3 }, { label: "Many", score: 5 }]
  },
  {
    id: 8,
    question: "Do plugs fit tightly into your wall outlets?",
    whyItMatters: "A loose plug has poor contact area. This increases resistance, causing the plug blades to overheat and melt.",
    options: [{ label: "Yes, very tight", score: 0 }, { label: "Some are loose", score: 3 }, { label: "Most fall out", score: 5 }]
  },
  {
    id: 9,
    question: "Do you see sparks when plugging in devices?",
    whyItMatters: "Small blue sparks can be normal, but large yellow/orange sparks indicate a load mismatch or bad contacts.",
    options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 2 }, { label: "Often", score: 5 }]
  },
  {
    id: 10,
    question: "Are any outlets discolored or showing scorch marks?",
    whyItMatters: "Brown/Black marks are carbon from previous arcing events. Carbon conducts electricity, creating a heating element on your wall.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 11,
    question: "Do your lights flicker when an appliance turns on?",
    whyItMatters: "This means the voltage is dropping significantly across the whole house. It indicates a loose main neutral or undersized service wiring.",
    options: [{ label: "Never", score: 0 }, { label: "Rarely", score: 2 }, { label: "Often", score: 5 }]
  },
  {
    id: 12,
    question: "Do you use extension cords for permanent appliances (Fridge, AC)?",
    whyItMatters: "Extension cords are for temporary use. They are usually thinner than wall wire and overheat under continuous heavy loads.",
    options: [{ label: "Never", score: 0 }, { label: "Sometimes", score: 3 }, { label: "Yes, frequently", score: 5 }]
  },
  {
    id: 13,
    question: "Are power strips daisy-chained (plugged into each other)?",
    whyItMatters: "This funnels the current of multiple strips through the single plug of the first strip, guaranteeing an overload.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 14,
    question: "Have you ever experienced a mild shock when touching an appliance?",
    whyItMatters: "This is a 'leakage current'. It means the chassis of your appliance is live and your grounding is failing.",
    options: [{ label: "Never", score: 0 }, { label: "Once", score: 3 }, { label: "Multiple times", score: 5 }]
  },
  {
    id: 15,
    question: "Do you run cables under rugs or carpets?",
    whyItMatters: "Foot traffic crushes the cable insulation. The carpet traps the heat. This is a classic fire starter.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 16,
    question: "Are there outlets within 1 meter of water sources without covers?",
    whyItMatters: "Water splashes can bridge the Live and Neutral pins, causing a short circuit or electrocution.",
    options: [{ label: "No", score: 0 }, { label: "Yes", score: 5 }]
  },
  {
    id: 17,
    question: "Do you leave portable heaters on while sleeping?",
    whyItMatters: "Heaters are high-wattage. If they tip over or overheat while you sleep, you won't react in time.",
    options: [{ label: "Never", score: 0 }, { label: "Sometimes", score: 5 }]
  },
  {
    id: 18,
    question: "Are electrical cords frayed or taped up?",
    whyItMatters: "Tape dries and falls off. Exposed wires are a direct shock hazard to children and pets.",
    options: [{ label: "None", score: 0 }, { label: "A few", score: 3 }, { label: "Yes, many", score: 5 }]
  },
  {
    id: 19,
    question: "Do you have working smoke detectors in the home?",
    whyItMatters: "Most electrical fires happen at night. Smoke detectors are your only warning system when you are asleep.",
    options: [{ label: "Yes, tested monthly", score: 0 }, { label: "Yes, but unsure if working", score: 2 }, { label: "No", score: 5 }]
  },
  {
    id: 20,
    question: "Is your electrical panel easily accessible (not blocked)?",
    whyItMatters: "In an emergency (fire/shock), you need to cut power in seconds. Moving boxes or furniture takes too long.",
    options: [{ label: "Yes", score: 0 }, { label: "No", score: 3 }]
  },
  {
    id: 21,
    question: "When was your last professional electrical inspection?",
    whyItMatters: "Systems degrade silently. Connections loosen over time due to thermal expansion/contraction.",
    options: [{ label: "Last 5 years", score: 0 }, { label: "Over 10 years ago", score: 3 }, { label: "Never", score: 5 }]
  },
  {
    id: 22,
    question: "Do you rely on adapters for non-fitting plugs?",
    whyItMatters: "Adapters often bypass the ground pin connection, leaving the appliance unsafe.",
    options: [{ label: "Never", score: 0 }, { label: "Sometimes", score: 2 }, { label: "Always", score: 4 }]
  },
  {
    id: 23,
    question: "Do you have surge protection for expensive electronics?",
    whyItMatters: "Voltage spikes from the grid can fry sensitive circuit boards in milliseconds.",
    options: [{ label: "Yes", score: 0 }, { label: "No", score: 2 }]
  },
  {
    id: 24,
    question: "Do you unplug small appliances (toaster, kettle) when not in use?",
    whyItMatters: "Toasters can malfunction and turn on. If plugged in, they are a fire risk even when 'off'.",
    options: [{ label: "Usually", score: 0 }, { label: "Rarely", score: 2 }]
  },
  {
    id: 25,
    question: "Do you know where your main power shut-off switch is?",
    whyItMatters: "Knowing this location is the single most important safety knowledge for any resident.",
    options: [{ label: "Yes", score: 0 }, { label: "No", score: 5 }]
  },
];

export const ROOMS: RoomGuide[] = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: Home,
    hazards: ['Water near outlets', 'High load appliances sharing circuits', 'Grease buildup on wires'],
    dos: ['Keep appliances away from sink', 'Unplug small appliances when not in use', 'Clean vents regularly'],
    donts: ['Use extension cords for refrigerators', 'Overload countertop outlets', 'Touch switches with wet hands'],
    checklist: ['GFCI/RCD protection active', 'Cords not dangling', 'Appliances clean from grease'],
    homeownerFix: ['Replacing cracked cover plates', 'Cleaning exhaust fan filters', 'Organizing cords on countertops'],
    electricianFix: ['Installing new outlets', 'Adding dedicated circuits for ovens/fridges', 'Fixing tripping breakers']
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: Bath,
    hazards: ['High moisture', 'Hairdryers near water', 'Corroded contacts'],
    dos: ['Install waterproof covers', 'Test safety switches monthly', 'Use battery operated devices where possible'],
    donts: ['Charge phones near bath', 'Use heaters without specific IP rating', 'Ignore flickering lights'],
    checklist: ['Ventilation fan working', 'Outlets have covers', 'No exposed wires'],
    homeownerFix: ['Testing the GFCI/RCD test button', 'Replacing light bulbs (if fixture is dry)', 'Cleaning ventilation fans'],
    electricianFix: ['Installing new waterproof outlets', 'Replacing exhaust fans', 'Fixing flickering lights related to wiring']
  },
  {
    id: 'living',
    name: 'Living Room',
    icon: Sofa,
    hazards: ['Overloaded power strips', 'Cords under rugs', 'Damaged lamp cords'],
    dos: ['Use surge protectors', 'Check lamp wattages', 'Keep cords organized'],
    donts: ['Run cords under carpets', 'Daisy-chain power strips', 'Force plugs into loose outlets'],
    checklist: ['Outlets hold plugs firmly', 'Cords in good condition', 'No tripping hazards'],
    homeownerFix: ['Installing child-proof outlet covers', 'Replacing damaged power strips', 'Managing cable clutter'],
    electricianFix: ['Adding more outlets to reduce power strip use', 'Replacing loose wall sockets', 'Installing dimmer switches']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: BedDouble,
    hazards: ['Charging phones under pillows', 'Electric blankets damaged', 'Space heaters near bed'],
    dos: ['Charge devices on hard surfaces', 'Inspect electric blankets', 'Turn off heaters while sleeping'],
    donts: ['Sleep with phone charging in bed', 'Overload bedside outlets', 'Cover heaters'],
    checklist: ['Smoke detector working', 'Cords not pinched', 'Heater clearance maintained'],
    homeownerFix: ['Changing smoke detector batteries', 'Replacing lamps', 'Inspecting electric blankets for wear'],
    electricianFix: ['Installing ceiling fans', 'Adding AFCI protection', 'Rewiring old outlets']
  },
  {
    id: 'garage',
    name: 'Garage',
    icon: Car,
    hazards: ['Damaged tools', 'Exposed wiring', 'Dust accumulation', 'Rodents'],
    dos: ['Use heavy-duty cords', 'Cover outlets', 'Keep panel accessible'],
    donts: ['Use indoor cords outside', 'Ignore rodent damage', 'Overload tool circuits'],
    checklist: ['Lighting adequate', 'GFCI/RCD on all outlets', 'Tools inspected'],
    homeownerFix: ['Cleaning panel door (exterior only)', 'Organizing tool cords', 'Replacing light bulbs'],
    electricianFix: ['Upgrading main service panel', 'Installing high-voltage EV chargers', 'Wiring new workshop circuits']
  },
  {
    id: 'office',
    name: 'Home Office',
    icon: Monitor,
    hazards: ['Cable spaghetti', 'Overloaded UPS', 'Overheating chargers'],
    dos: ['Use cable management', 'Use quality surge protectors', 'Unplug chargers when full'],
    donts: ['Daisy-chain power strips', 'Coil cables tightly while in use', 'Block ventilation of PCs'],
    checklist: ['Cords organized', 'No trip hazards', 'Equipment has airflow'],
    homeownerFix: ['Organizing cables with velcro', 'Replacing old surge protectors', 'Dusting equipment vents'],
    electricianFix: ['Installing dedicated computer circuits', 'Adding whole-room surge protection', 'Hardwiring data cables']
  },
  {
    id: 'outdoor',
    name: 'Balcony / Outdoor',
    icon: Sun,
    hazards: ['Weather damage', 'Using indoor tools outside', 'Puddles near power'],
    dos: ['Use weather-rated (IP) outlets', 'Use outdoor-rated extension cords', 'Install weatherproof covers'],
    donts: ['Use indoor appliances in rain', 'Leave cords exposed to sun/rain permanently', 'Bypass GFCI/RCD'],
    checklist: ['Weather seals intact', 'Outlets covered', 'Cords rated for outdoors'],
    homeownerFix: ['Testing outdoor GFCI buttons', 'Visually checking covers for cracks', 'Storing extension cords indoors'],
    electricianFix: ['Installing weatherproof outlets', 'Running underground wiring', 'Hooking up pool/spa pumps']
  }
];

export const APPLIANCES: ApplianceGuide[] = [
  {
    id: 'ac',
    name: 'Air Conditioner / Heat Pump',
    safeUsage: ['Connect directly to a dedicated circuit', 'Clean filters monthly to prevent motor strain'],
    signsOfOverload: ['Lights dim when compressor starts', 'Breaker trips on hot days'],
    wiringDamage: ['Discolored plug', 'Cord feels hot to touch'],
    outletReqs: 'Dedicated high-amperage outlet (no sharing)',
    whenToUnplug: ['During severe lightning storms', 'If not used for months'],
    whenToReplace: 'If unit vibrates excessively or smells burning',
    warnings: ['Never use an extension cord', 'Keep outdoor unit free of debris'],
    childSafety: 'Ensure controls are out of reach',
    inspectionFreq: 'Annually before peak season'
  },
  {
    id: 'water-heater',
    name: 'Water Heater / Geyser',
    safeUsage: ['Ensure thermostat is not set dangerously high', 'Keep area dry'],
    signsOfOverload: ['Tripping the main breaker frequently'],
    wiringDamage: ['Rust or corrosion on connection points', 'Melted insulation'],
    outletReqs: 'Hardwired with isolation switch preferred',
    whenToUnplug: ['If water leaks are detected'],
    whenToReplace: 'If tank leaks or electrical faults persist',
    warnings: ['High voltage danger - Do not open panel', 'Water + Electricity risk'],
    childSafety: 'Install anti-scald valves',
    inspectionFreq: 'Every 6 months'
  },
  {
    id: 'fridge',
    name: 'Refrigerator',
    safeUsage: ['Allow air circulation behind unit', 'Vacuum coils yearly'],
    signsOfOverload: ['Motor runs continuously and loudly'],
    wiringDamage: ['Frayed cord from being pinched against wall'],
    outletReqs: 'Grounded outlet, preferably dedicated',
    whenToUnplug: ['Only for cleaning or moving'],
    whenToReplace: 'If door seals fail or compressor overheats',
    warnings: ['Do not use power strips', 'Pinch point for cords'],
    childSafety: 'Secure heavy doors',
    inspectionFreq: 'Annually'
  },
  {
    id: 'washer',
    name: 'Washing Machine',
    safeUsage: ['Ensure level installation', 'Use GFCI/RCD protected outlet'],
    signsOfOverload: ['Machine stops mid-cycle'],
    wiringDamage: ['Cord wet or cracked'],
    outletReqs: 'GFCI/RCD protected grounded outlet',
    whenToUnplug: ['When going on vacation', 'If leaking'],
    whenToReplace: 'If spinning mechanism fails or shocks user',
    warnings: ['Water hazard - keep connections dry'],
    childSafety: 'Engage child lock features',
    inspectionFreq: 'Monthly visual check'
  },
  {
    id: 'dryer',
    name: 'Dryer',
    safeUsage: ['Clean lint filter after EVERY load', 'Check vent hose for kinks'],
    signsOfOverload: ['Plug gets hot', 'Breaker trips mid-cycle'],
    wiringDamage: ['Burn marks on outlet'],
    outletReqs: 'Dedicated high-power circuit',
    whenToUnplug: ['If smelling burning lint'],
    whenToReplace: 'If it squeals or smells like burning rubber',
    warnings: ['Major fire hazard from lint buildup', 'Do not leave running when not home'],
    childSafety: 'Keep door closed',
    inspectionFreq: 'Clean vent duct yearly'
  },
  {
    id: 'cooktop',
    name: 'Induction / Cooktop',
    safeUsage: ['Use correct cookware', 'Keep surface clean and dry'],
    signsOfOverload: ['Unit shuts off automatically', 'Control panel flickers'],
    wiringDamage: ['Hardwire connection loose'],
    outletReqs: 'Hardwired dedicated circuit typically required',
    whenToUnplug: ['For repairs only (Isolate at breaker)'],
    whenToReplace: 'Cracked glass surface',
    warnings: ['Surface remains hot after use', 'High magnetic field for pacemakers'],
    childSafety: 'Use child-lock function',
    inspectionFreq: 'Check hardwire connection every 2 years'
  },
  {
    id: 'microwave',
    name: 'Microwave',
    safeUsage: ['Do not block vents', 'Never run empty'],
    signsOfOverload: ['Lights dim when running'],
    wiringDamage: ['Door seal damage', 'Hinge broken'],
    outletReqs: 'Grounded outlet',
    whenToUnplug: ['If it sparks internally'],
    whenToReplace: 'If door does not close tightly or radiation leaks suspected',
    warnings: ['High voltage capacitor inside - do not repair yourself'],
    childSafety: 'Place out of reach of small children',
    inspectionFreq: 'Visual check monthly'
  },
  {
    id: 'pump',
    name: 'Water Pump',
    safeUsage: ['Ensure weather protection', 'Check priming'],
    signsOfOverload: ['Motor hums but does not turn'],
    wiringDamage: ['Corroded terminals from moisture'],
    outletReqs: 'Weatherproof connection with GFCI/RCD',
    whenToUnplug: ['Dry running suspected', 'Winterizing'],
    whenToReplace: 'Leaking seals or rusted casing',
    warnings: ['Electrocution risk in wet pits', 'Grounding is critical'],
    childSafety: 'Secure pump house/cover',
    inspectionFreq: 'Seasonally'
  },
  {
    id: 'ev-charger',
    name: 'EV Charger',
    safeUsage: ['Uncoil cable completely', 'Inspect handle for cracks'],
    signsOfOverload: ['Cable gets too hot to hold'],
    wiringDamage: ['Pins in handle bent or black'],
    outletReqs: 'Dedicated circuit (Level 2)',
    whenToUnplug: ['Not applicable (Hardwired) or when not charging'],
    whenToReplace: 'If cable insulation is cut',
    warnings: ['High continuous load', 'Do not use extension cords'],
    childSafety: 'Cap connector when not in use',
    inspectionFreq: 'Monthly visual'
  },
  {
    id: 'space-heater',
    name: 'Space Heater',
    safeUsage: ['Keep 3ft/1m from combustibles', 'Place on stable, flat surface'],
    signsOfOverload: ['Plug gets hot', 'Breaker trips immediately'],
    wiringDamage: ['Cord stiff or cracked'],
    outletReqs: 'Direct wall outlet ONLY',
    whenToUnplug: ['Whenever leaving the room', 'While sleeping'],
    whenToReplace: 'If tip-over switch fails',
    warnings: ['Leading cause of home electrical fires', 'Never cover the unit'],
    childSafety: 'Use heaters with cool-touch housing',
    inspectionFreq: 'Before every use'
  },
  {
    id: 'strips',
    name: 'Power Strips & Extension Cords',
    safeUsage: ['Use for temporary low-power devices only', 'Uncoil fully'],
    signsOfOverload: ['Plastic housing melting', 'Warm cord'],
    wiringDamage: ['Loose socket contacts'],
    outletReqs: 'Plug directly into wall',
    whenToUnplug: ['When not in use'],
    whenToReplace: 'Every 3-5 years or if surge light dies',
    warnings: ['Never daisy-chain', 'Do not use for heaters/ACs'],
    childSafety: 'Use covers for unused slots',
    inspectionFreq: 'Before every use'
  },
  {
    id: 'ups',
    name: 'UPS / Inverter',
    safeUsage: ['Keep in ventilated area', 'Check battery health'],
    signsOfOverload: ['Continuous beeping', 'Fan noise excessive'],
    wiringDamage: ['Battery terminal corrosion'],
    outletReqs: 'Grounded outlet',
    whenToUnplug: ['If batteries swell or leak'],
    whenToReplace: 'Batteries every 3-4 years',
    warnings: ['Chemical hazard from batteries', 'High voltage output'],
    childSafety: 'Keep batteries inaccessible',
    inspectionFreq: 'Check battery water/status every 6 months'
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: "10 Silent Screams of a Dying Electrical System",
    excerpt: "Your house is talking to you before it burns down. Are you listening? Here are the Red Flags you cannot ignore.",
    category: "Basics",
    readTime: "5 min",
    content: [
      "Electricity is invisible, silent, and odorless—until it isn't. When your electrical system starts making noise or smell, it's not a warning. **It's a scream.**",
      "Here are the 10 undeniable signs that your home is trying to tell you something is wrong:",
      "Fishy Smells:",
      "Does your bedroom smell like rotting fish or urine? No, it's not the cat. It's the chemicals in wire insulation melting. **This is a 911-level emergency.**",
      "The 'Buzz':",
      "Electricity should be silent. If your switch buzzes like a bee, it means electricity is jumping across a gap (arcing). **That gap is a mini-fire.**",
      "The Warm Faceplate:",
      "Put your hand on the wall switch. It should be cool. If it's warm, there is high resistance inside. **Resistance = Fire.**",
      "The Flicker:",
      "Lights don't just 'flicker' for fun. It means a loose connection is vibrating somewhere in the wall. One day, it will disconnect for good—after sparking a flame.",
      "The Trip:",
      "Breakers don't trip because they are 'old'. They trip because they are saving your life from an overload. If you just flip it back without finding the cause, you are playing Russian Roulette.",
      "The Rodent Sign:",
      "Found droppings in the attic? Rats chew wires to sharpen their teeth. Exposed copper in a wooden attic is a ticking time bomb.",
      "The Scorch Mark:",
      "Any brown or black mark on an outlet is carbon. Carbon conducts electricity. The outlet is now a heater."
    ]
  },
  {
    id: '2',
    title: "The Friction Fire: Why Outlets Burn",
    excerpt: "It's not just 'bad luck'. It's physics. Learn why loose connections turn your wall into a toaster.",
    category: "Prevention",
    readTime: "4 min",
    content: [
      "Why do outlets melt? It comes down to one physics equation: **Resistance creates Heat.**",
      "Imagine a garden hose. If you squeeze it, the water sprays harder and faster. In electricity, a 'squeeze' is a loose connection.",
      "The Squeeze Effect:",
      "• **Tiny Contact Point:** When a screw is loose, electricity has to squeeze through a pinpoint.",
      "• **Massive Friction:** This squeeze creates massive electrical friction (Resistance).",
      "• **The Meltdown:** Friction creates Heat. The metal heats up, melting the plastic faceplate.",
      "• **The Arc:** Eventually, the air gets so hot it turns into plasma (Arcing). That's the blue flash you see.",
      "The Fix:",
      "Tighten your connections! If you are DIY-ing, use a screwdriver with torque control. And never, ever 'backstab' wires into the back of an outlet. **Always curl the wire around the screw.**"
    ]
  },
  {
    id: '3',
    title: "The Pocket Bomb: Lithium Fires",
    excerpt: "Your phone battery holds the energy of a hand grenade. Learn why they explode and how to charge safely.",
    category: "Modern Risks",
    readTime: "4 min",
    content: [
      "Lithium-ion batteries are miracles of engineering. They are also chemically unstable bombs if treated wrong.",
      "Why They Explode:",
      "Inside a battery is a thin plastic sheet separating the Positive and Negative sides. If that sheet breaks (from dropping your phone or cheap manufacturing), the two sides touch.",
      "This creates an internal short circuit. The battery heats up to 1000°F in seconds. This is called **Thermal Runaway**.",
      "The Scary Part:",
      "• **Self-Oxygenating:** Lithium fires create their own oxygen. You cannot smother them.",
      "• **Water Makes it Worse:** Water reacts with Lithium to create Hydrogen gas (Explosive).",
      "Safety Rules:",
      "• **Never charge overnight under a pillow.** Heat needs to escape.",
      "• **Throw away swollen batteries.** If your phone case is bulging, it's a ticking time bomb.",
      "• **Don't buy $2 chargers.** They lack the 'Overcharge Protection' chip that stops the current when the battery is full."
    ]
  },
  {
    id: '4',
    title: "The Extension Cord Trap",
    excerpt: "They are meant for temporary use, not permanent solutions. Here is why daisy-chaining kills.",
    category: "Habits",
    readTime: "3 min",
    content: [
      "Extension cords are the #1 cause of electrical fires in rental homes.",
      "The Daisy Chain of Death:",
      "Plugging a power strip into another power strip is called 'Daisy Chaining'. It is dangerous for two reasons:",
      "• **Resistance Multiplier:** Every connection point adds resistance.",
      "• **The Funnel Effect:** You might have 10 appliances running. The first strip's cord has to carry the current for ALL of them. It wasn't built for that.",
      "The Rule:",
      "• **One Wall Outlet = One Strip.**",
      "• **Heaters/ACs/Fridges = Wall Only.** Never plug high-draw appliances into a strip.",
      "• **Touch Test:** If the cord feels warm, it is overloaded. Unplug immediately."
    ]
  },
  {
    id: '5',
    title: "Water + Volts: The Bathroom Myth",
    excerpt: "Pure water doesn't conduct electricity. But your bath water does. Learn the science of shock.",
    category: "Basics",
    readTime: "3 min",
    content: [
      "You learned in school that water conducts electricity. Actually, pure distilled water is an insulator.",
      "So why is it dangerous?",
      "Because tap water isn't pure. It has minerals, salts, and chlorine. **These impurities conduct electricity perfectly.**",
      "The Hairdryer Scenario:",
      "If you drop a hairdryer in the tub:",
      "• The electricity jumps from the live wire into the water.",
      "• It looks for the fastest path to the ground (The drain pipe).",
      "• **You are in the way.** It travels through your body to get to the drain.",
      "The Solution:",
      "**GFCI / RCD Plugs.** These devices sense that the electricity leaked into the water and cut the power in 0.03 seconds. If your bathroom outlets don't have 'Test/Reset' buttons, you are gambling with your life."
    ]
  },
  {
    id: '6',
    title: "The Grounding Myth",
    excerpt: "My appliance works fine without the 3rd pin. Sure. It works fine... until it kills you.",
    category: "Safety Systems",
    readTime: "4 min",
    content: [
      "People break the 3rd pin (Earth/Ground) off plugs to fit them into 2-pin sockets. This is insane.",
      "The Job of the 3rd Pin:",
      "• It is a drain pipe. It does nothing 99% of the time.",
      "• But if a wire comes loose inside your fridge and touches the metal door, the electricity needs a place to go.",
      "• **With Grounding:** It flows down the drain (Ground wire) instantly. The breaker trips. You are safe.",
      "• **Without Grounding:** The electricity waits on the door handle. It turns the whole fridge into a live battery.",
      "• **The Trap:** It waits for YOU to touch it. When you do, YOU become the ground wire.",
      "Impact:",
      "Never use 'Cheater Plugs' (3-to-2 adapters) for metal appliances (Fridges, Microwaves, PCs). You are removing the only thing standing between you and lethal current."
    ]
  },
  {
    id: '7',
    title: "Childproofing 2.0",
    excerpt: "Why those cheap plastic outlet plugs are actually dangerous choking hazards.",
    category: "Family",
    readTime: "3 min",
    content: [
      "For decades, parents bought those plastic caps to shove into outlets. They are better than nothing, but barely.",
      "The Problem:",
      "• **Choking Hazard:** Toddlers are smart. They can pry them off. Once off, it goes straight into the mouth.",
      "• **Forgetting:** Parents take them out to vacuum and forget to put them back.",
      "The Solution: TRR (Tamper Resistant Receptacles)",
      "• Modern codes require TRR outlets.",
      "• They have internal plastic shutters behind the holes.",
      "• **The Secret:** The shutters only open if TWO prongs push at the exact same time. A kid pushing a key into one side hits a wall.",
      "• It is passive safety. You don't have to remember anything."
    ]
  },
  {
    id: '8',
    title: "The 30-Year Itch: Old Wiring",
    excerpt: "Copper doesn't age. But plastic does. Why homes built before 1990 are reaching a tipping point.",
    category: "Maintenance",
    readTime: "5 min",
    content: [
      "Copper is an element. It lasts forever. So why do we rewire houses?",
      "It's about the **Insulation** (The plastic coating).",
      "The Crunch Test:",
      "• Plastic dries out over decades of heating up and cooling down.",
      "• After 30-40 years, it becomes brittle like a dry leaf.",
      "• If you bend an old wire, the insulation might just crack and fall off.",
      "The Result:",
      "• You now have bare copper wires sitting next to dry wood inside your walls.",
      "• A single vibration (slamming a door) can make them touch.",
      "• **Short Circuit -> Spark -> Fire.**",
      "Advice:",
      "If your home is 30+ years old, get an 'Insulation Resistance Test' (Megger Test). It checks the health of the plastic without opening the walls."
    ]
  },
  {
    id: '9',
    title: "Appliance Suicide: Voltage Drop",
    excerpt: "Why your AC motor burned out even though you didn't use it much.",
    category: "Appliances",
    readTime: "4 min",
    content: [
      "Motors (ACs, Fridges, Pumps) are hungry beasts. They need 'fuel' (Voltage) to push them.",
      "What happens if the fuel is low? (Low Voltage):",
      "• You might think the motor just runs slower. **Wrong.**",
      "• To do the same amount of work with less voltage, the motor sucks in **MORE Current (Amps)**.",
      "• More Amps = More Heat.",
      "• The windings inside the motor get hot. Eventually, the insulation melts and the motor burns out.",
      "The Culprit:",
      "• Usually, it's a thin wire. If you run a heavy AC on a thin extension cord, the voltage drops before it reaches the AC.",
      "• You are literally starving your appliance to death."
    ]
  },
  {
    id: '10',
    title: "The Neutral Crime",
    excerpt: "Smart switches are cool. But installing them without a Neutral wire is a fire hazard.",
    category: "Modern Risks",
    readTime: "4 min",
    content: [
      "Smart switches (WiFi) need power 24/7 to listen for your voice command.",
      "Old switches simply cut the line. They have no 'Return Path' (Neutral).",
      "The Hack:",
      "• Some people try to use the 'Ground' wire as a Neutral to power the smart switch.",
      "• **THIS IS ILLEGAL AND DANGEROUS.**",
      "• You are putting current onto the safety wire. Now, the metal casing of your microwave might be live.",
      "The Fix:",
      "• Buy 'No-Neutral' smart switches (They use a capacitor trick).",
      "• Or hire an electrician to pull a new Neutral wire to the box.",
      "• Never cheat with the Ground wire."
    ]
  },
  {
    id: '11',
    title: "Storm Mode: What to Unplug",
    excerpt: "Lightning doesn't care about your surge protector strip. Here is the physics of a strike.",
    category: "Nature",
    readTime: "3 min",
    content: [
      "A lightning bolt travels miles through the sky. Do you think a 1-inch plastic gap in your surge protector will stop it?",
      "**No.**",
      "If lightning hits your power line, it can jump (arc) across switches and protectors.",
      "What to Unplug:",
      "• **Expensive Electronics:** PCs, OLED TVs, Consoles.",
      "• **Modems:** Lightning loves traveling through phone/cable lines too.",
      "What to Ignore:",
      "• Lamps, Toasters, Fridges (They are robust and usually survive).",
      "**Myth:** 'I can just turn off the strip.'",
      "**Fact:** Physical unplugging is the only 100% guarantee. Lightning can jump the 'Off' switch gap."
    ]
  },
  {
    id: '12',
    title: "The DIY Disaster: Tape vs Nuts",
    excerpt: "Electrical tape is for marking wires, not for joining them forever.",
    category: "DIY",
    readTime: "3 min",
    content: [
      "The classic handyman move: Twist two wires together, wrap them in black tape, shove them in the wall.",
      "Why this fails:",
      "• **Glue Fails:** The adhesive on tape dries out in 2 years. The tape unravels.",
      "• **Exposed Wire:** Now you have a bare joint vibrating in the wall.",
      "• **Oxidation:** Air gets in. The copper rusts (oxidizes). Resistance goes up. Heat goes up.",
      "The Pro Way:",
      "• **Wire Nuts (Marrettes):** A mechanical spring grips the wires.",
      "• **Wago Connectors:** A clamp locks them in place.",
      "• Mechanical pressure is key. Sticky tape is not mechanical pressure."
    ]
  },
  {
    id: '13',
    title: "Breaker Psychology",
    excerpt: "A tripping breaker is annoying. But it's saving your life. Don't punish it.",
    category: "Basics",
    readTime: "3 min",
    content: [
      "Scenario: You turn on the heater. *Click*. The breaker trips.",
      "You flip it back. 5 minutes later. *Click*.",
      "You think: 'This breaker is weak. I should replace it with a stronger one.'",
      "**STOP.**",
      "• The breaker is doing its job. It senses the wire is getting too hot.",
      "• If you put a bigger breaker (e.g., replacing 15A with 20A), you remove the limit.",
      "• The wire keeps heating up. The breaker doesn't trip. **The house catches fire.**",
      "Rule:",
      "Never upgrade a breaker without upgrading the wire too. If it trips, reduce the load."
    ]
  },
  {
    id: '14',
    title: "The Rodent War",
    excerpt: "Why rats love electricity. It's not about the taste.",
    category: "Nature",
    readTime: "3 min",
    content: [
      "Rodents have teeth that never stop growing. They need to file them down.",
      "Copper wire is the perfect hardness for a rat dentist.",
      "The Damage:",
      "• They chew off the plastic insulation.",
      "• They leave bare copper wires touching the dry wood of your attic beams.",
      "• One spark is all it takes.",
      "Signs:",
      "• Scratching sounds in walls.",
      "• Lights flickering for no reason.",
      "• Urine smell in the attic.",
      "Solution:",
      "Don't just set traps. Inspect the wiring. Use steel-armored cable (BX cable) in basements and attics."
    ]
  },
  {
    id: '15',
    title: "Wattage Wars: Lamps",
    excerpt: "Putting a 100W bulb in a 60W fixture is the most common fire starter in bedrooms.",
    category: "Habits",
    readTime: "3 min",
    content: [
      "Every light fixture has a sticker: 'Max 60 Watts'.",
      "People ignore it. They want it brighter. They put in a 100W bulb.",
      "The Physics:",
      "• 100W creates nearly double the heat of 60W.",
      "• The fixture's wires are only rated for 60W of heat.",
      "• The socket insulation bakes, cracks, and crumbles.",
      "• Eventually, the live wire touches the metal lamp casing.",
      "The Fix:",
      "**Switch to LED.** A 100W-equivalent LED only uses 14 Watts. You get the brightness without the heat danger."
    ]
  },
  {
    id: '16',
    title: "Inverter Ignorance",
    excerpt: "Lead-acid batteries emit explosive gas. Is your backup system ventilated?",
    category: "Safety Systems",
    readTime: "4 min",
    content: [
      "Home inverters use large lead-acid batteries (like car batteries).",
      "The Chemistry:",
      "• When charging, these batteries boil the electrolyte.",
      "• This releases **Hydrogen Gas**.",
      "• Hydrogen is invisible, odorless, and extremely explosive (think Hindenburg).",
      "The Danger:",
      "• People shove inverters into closed closets to hide them.",
      "• The gas builds up.",
      "• A single spark from the inverter relay ignites the closet.",
      "Rule:",
      "Batteries need airflow. Never put them in a sealed box or cupboard."
    ]
  },
  {
    id: '17',
    title: "Solar Safety: The DC Arc",
    excerpt: "Solar panels create DC electricity. It behaves very differently from wall power.",
    category: "Modern Risks",
    readTime: "4 min",
    content: [
      "AC (Wall power) flickers on and off 60 times a second. This helps extinguish sparks.",
      "DC (Solar power) is a continuous river of fire.",
      "The DC Arc:",
      "• If you unplug a solar panel under load, the spark doesn't go out.",
      "• It stretches. You can pull a 3-inch arc of plasma.",
      "• This arc melts metal and starts roof fires.",
      "Advice:",
      "Never unplug solar cables while the sun is shining unless the system is shut down. Use specialized DC-rated breakers only."
    ]
  },
  {
    id: '18',
    title: "Electric Blanket Burns",
    excerpt: "They feel cozy, but they are grids of heating wire. Don't fold them.",
    category: "Habits",
    readTime: "3 min",
    content: [
      "Inside an electric blanket are tiny, thin heating wires.",
      "The Failure:",
      "• If you fold the blanket or bunch it up, the heat gets trapped.",
      "• Or, the fold snaps the tiny wire inside.",
      "• The broken wire creates a 'Hot Spot' that burns through the fabric.",
      "Rules:",
      "• Never tuck it under the mattress.",
      "• Never pile heavy pillows or pets on top of it.",
      "• Lay it flat. Always."
    ]
  },
  {
    id: '19',
    title: "The Cheap Charger",
    excerpt: "Why a $2 gas station charger can destroy your $1000 iPhone.",
    category: "Modern Risks",
    readTime: "4 min",
    content: [
      "A charger's job is to take 120V/240V AC and turn it into smooth 5V DC.",
      "The Cheap Way:",
      "• Remove the filters. Remove the surge protection. Remove the isolation transformer.",
      "• The result is 'Dirty Power'. Voltage spikes leak through to your phone.",
      "• This confuses the phone's touch screen (Ghost Touch) and fries the battery management chip.",
      "The Risk:",
      "Cheap chargers often lack galvanic isolation. If they fail, they send the full 240V mains power straight into your phone... and your hand."
    ]
  },
  {
    id: '20',
    title: "Holiday Hazards",
    excerpt: "Christmas lights and Diwali lamps are seasonal fire starters.",
    category: "Habits",
    readTime: "3 min",
    content: [
      "We pull them out of a box once a year. They are tangled and old.",
      "The Risks:",
      "• **Dry Trees:** A hot incandescent bulb touching a dry pine needle is instant fire.",
      "• **Overloading:** Plugging 10 strands end-to-end blows the fuse in the plug (if it has one). If not, the wire melts.",
      "• **Outdoor/Indoor:** Using indoor lights outside. Rain gets in, causes shorts.",
      "Checklist:",
      "Throw away any strand with frayed wires. Switch to LED (Cool touch). Unplug when you go to sleep."
    ]
  },
  {
    id: '21',
    title: "The 'Safe' Voltage Myth",
    excerpt: "I'm in the USA, it's only 110V. It can't kill me, right? Wrong.",
    category: "Basics",
    readTime: "4 min",
    content: [
      "People think 230V (Europe/Asia) is deadly and 110V (USA) is just a tickle.",
      "The Truth:",
      "• **It's not the Volts, it's the Amps.**",
      "• It takes only 0.1 Amps to stop a human heart.",
      "• A standard US outlet delivers 15 Amps. That is 150 times the lethal dose.",
      "• In fact, 110V is sometimes more dangerous because it's harder to 'let go'. The muscle contraction locks your hand onto the wire.",
      "Conclusion:",
      "Treat every wire like a gun. Voltage doesn't matter. Current kills."
    ]
  }
];

export const HAZARD_GALLERY: HazardImage[] = [
  {
    id: '1',
    src: overloadedStripImg,
    title: 'Overloaded Power Strip',
    description: 'Multiple high-power adapters plugged into a single low-quality strip.',
    risk: 'High Fire Risk due to overheating of the internal copper strips.',
    prevention: 'Use one strip per wall outlet. Never daisy-chain strips.'
  },
  {
    id: '2',
    src: damagedCordImg,
    title: 'Damaged Cord Insulation',
    description: 'Outer sheath broken, exposing internal colored wires.',
    risk: 'Electrocution and Short Circuit.',
    prevention: 'Inspect cords monthly. Replace, do not tape, damaged cords.'
  },
  {
    id: '3',
    src: scorchedOutletImg,
    title: 'Scorched Outlet',
    description: 'Black marks around the plug holes indicating high heat.',
    risk: 'Internal arcing indicating loose connections.',
    prevention: 'Replace outlet immediately. Check wiring torque.'
  },
  {
    id: '4',
    src: waterExposureImg,
    title: 'Water Exposure',
    description: 'Outlet installed too close to a sink without a cover.',
    risk: 'Fatal Shock Hazard.',
    prevention: 'Install GFCI/RCD protection and weather-proof covers.'
  },
  {
    id: '5',
    src: diyFailImg,
    title: 'DIY Wiring Fail',
    description: 'Wires joined with tape instead of junction boxes/nuts.',
    risk: 'Short circuit and fire.',
    prevention: 'Always use proper junction boxes and connectors.'
  },
  {
    id: '6',
    src: overheatingPanelImg,
    title: 'Overheating Panel',
    description: 'Circuit breakers running hot or showing burn marks.',
    risk: 'Main system failure and fire.',
    prevention: 'Professional maintenance and tightening of connections.'
  },
  {
    id: '7',
    src: brokenSwitchImg,
    title: 'Broken Light Switch',
    description: 'Cracked toggle or housing on a wall switch.',
    risk: 'Shock hazard from exposed live parts inside.',
    prevention: 'Turn off breaker and replace switch immediately.'
  },
  {
    id: '8',
    src: rustedTerminalsImg,
    title: 'Rusted Terminals',
    description: 'Corrosion on battery or connection terminals.',
    risk: 'High resistance causing heat buildup and failure.',
    prevention: 'Clean with wire brush or replace if pitting is deep.'
  },
  {
    id: '9',
    src: rodentDamageImg,
    title: 'Rodent Damage',
    description: 'Chewed wire insulation in an attic or basement.',
    risk: 'Major fire risk from exposed copper arcing against wood.',
    prevention: 'Seal entry points and use steel conduit in accessible areas.'
  }
];
