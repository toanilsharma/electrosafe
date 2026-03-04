
import { Article, RoomGuide, ApplianceGuide, QuizQuestion, HazardImage, TenantIssue, HardwareItem, GlossaryTerm } from './types';
import { Home, BedDouble, Bath, Car, Sofa, Monitor, Sun } from 'lucide-react';
import rustedTerminalsImg from './assets/rusted_terminals.png';
import overloadedStripImg from './assets/overloaded_strip.png';
// import scorchedOutletImg from './assets/scorched_outlet.png';
const scorchedOutletImg = '/scorched_outlet.png';
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
    slug: '10-signs-electrical-problems',
    seoTitle: "10 Signs of Electrical Problems: Burning Smells & Buzzing Switches",
    title: "10 Silent Screams of a Dying Electrical System",
    excerpt: "Your house is talking to you before it burns down. Are you listening? Here are the Red Flags you cannot ignore.",
    category: "Basics",
    readTime: "8 min",
    heroColor: 'from-red-600 to-orange-600',
    metaDescription: "Learn the 10 critical signs of electrical failure in your home. From fishy smells to buzzing switches, identify the red flags before a fire starts.",
    keywords: ["electrical fire signs", "buzzing switch", "burning smell outlet", "flickering lights", "home electrical safety"],
    standards: ["NFPA 73", "IEC 60364-6"],
    relatedArticles: ['outlet-fire-physics', 'old-wiring-dangers', 'circuit-breaker-tripping'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check if your home has these red flags right now' },
      { name: 'Risk Predictor', path: '/risk-predictor', why: 'Describe your symptom — get a diagnosis' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Let me be honest with you. I have been inside hundreds of homes as an industrial electrical engineer, and the scariest ones were always the ones where the homeowner said *\"Everything seems fine.\"*" },
      { type: 'paragraph', text: "Because here is the thing — your electrical system doesn't just suddenly burst into flames. It whispers. It nudges. It gives you signs for **months**, sometimes **years**, before something goes wrong. The problem? Most of us don't speak its language." },
      { type: 'paragraph', text: "Let me teach you those 10 signals today. Think of this as learning to read your home's body language." },
      { type: 'stats-row', stats: [
        { value: '47,000+', label: 'Home electrical fires per year (USA)', color: 'text-red-600' },
        { value: '3,000°F', label: 'Temperature of an electrical arc', color: 'text-orange-600' },
        { value: '65%', label: 'Caused by faulty wiring, not appliances', color: 'text-amber-600' },
        { value: '8 min', label: 'Time to spread to entire room', color: 'text-red-500' },
      ]},

      { type: 'heading', text: '1. The Fishy Smell (The Silent Killer)' },
      { type: 'paragraph', text: "If your bedroom suddenly smells like rotting fish or cat urine — and you definitely don't have a cat — **stop everything and call an electrician.** I am not exaggerating." },
      { type: 'paragraph', text: "That specific smell comes from Urea Formaldehyde, a chemical used in older wire insulation materials. When this plastic overheats, it releases a sickly sweet, fishy odor. By the time you can smell it, the wire inside your wall is already dangerously hot." },
      { type: 'callout', variant: 'danger', title: 'Immediate Action Required', text: 'If you smell something fishy near a switchboard and it is not coming from the kitchen — switch off that room\'s breaker immediately and call a licensed electrician. Do not ignore this.' },

      { type: 'heading', text: '2. The Buzzing Switch' },
      { type: 'paragraph', text: "Electricity, when flowing properly, is completely silent. Dead silent. So if your light switch sounds like an angry bee trapped inside the wall, something is seriously wrong." },
      { type: 'paragraph', text: "That buzzing sound? It is called **Arcing** — electricity literally jumping through the air across a gap between two loose metal contacts. Each tiny jump creates a plasma arc that reaches temperatures hotter than the surface of the sun." },
      { type: 'math', formula: 'Arc Temperature ≈ 3,000°F (1,600°C)', label: 'The Hidden Furnace', description: 'For reference, wood ignites at just 572°F (300°C). That arc is 5x hotter than what is needed to set your wall on fire.' },

      { type: 'heading', text: '3. The Warm Faceplate' },
      { type: 'paragraph', text: "Here is a simple test anyone can do right now. Walk around your house and place your palm flat on each switch plate and outlet cover. They should all feel cool — the same temperature as the wall." },
      { type: 'paragraph', text: "If any faceplate feels warm or hot to the touch, you have **High Resistance** behind it. And resistance, as we know from physics, creates heat." },
      { type: 'math', formula: 'P = I² × R', label: 'Joule\'s Law of Heating', description: 'Power (heat) equals Current squared times Resistance. Even a small increase in resistance creates a LOT of extra heat because the current is squared.' },

      { type: 'heading', text: '4. The Flicker' },
      { type: 'paragraph', text: "Lights don't flicker for fun. Every flicker is a tiny disconnect — the wire physically making and breaking contact, probably 30 to 60 times per second. And every disconnect is a microscopic spark. Hundreds of sparks per minute, inside your wall, near dry wood and insulation." },
      { type: 'callout', variant: 'warning', title: 'Don\'t Blame the Bulb', text: 'If the flicker follows the light bulb when you move it to another room, the bulb is losing connection. If the flicker stays in that room with any bulb, the **wiring** is the problem. This is much more serious.' },

      { type: 'heading', text: '5. The Breaker That Keeps Tripping' },
      { type: 'paragraph', text: "I have seen homeowners tape their breaker in the ON position because they were \"tired of it tripping.\" Please, please never do this. That breaker is not being dramatic — it is literally saving your house from catching fire." },
      { type: 'comparison', bad: { title: 'What People Do (Dangerous)', items: ['Flip the breaker back ON repeatedly', 'Replace 15A breaker with 20A breaker', 'Tape the breaker so it cannot trip', 'Ignore it and \"deal with it later\"'] }, good: { title: 'What You Should Do (Safe)', items: ['Unplug devices on that circuit one by one', 'Find which device causes the trip', 'Move heavy loads to different circuits', 'Call a pro if it trips with nothing plugged in'] } },
      { type: 'tool-link', tool: 'Risk Predictor Tool', path: '/risk-predictor', description: 'Tell us your symptom (\"breaker keeps tripping\") and we will diagnose it for you — free.', icon: 'activity' },

      { type: 'heading', text: '6. Scratching Sounds (The Rodent Sign)' },
      { type: 'paragraph', text: "If you hear tiny feet scampering in your ceiling at night, you might have a much bigger problem than a mouse. Rodents — rats, mice, squirrels — have teeth that never stop growing. They **must** chew constantly to keep them filed down. And electrical wire? It is the perfect chew toy." },
      { type: 'paragraph', text: "Exposed copper sitting next to dry wood and nesting material in your attic is essentially a time bomb. One good bite that bridges the hot and neutral wires, and you have a 3,000°F arc flash in an enclosed space full of flammable material." },

      { type: 'heading', text: '7. Brown or Black Scorch Marks' },
      { type: 'paragraph', text: "Any discoloration around an outlet or switch — brown, black, or yellowish marks — is carbon. And here is the scary part: **carbon is a conductor.** So now the faceplate itself has become part of the circuit. It is literally turning into a heating element on your wall." },
      { type: 'callout', variant: 'danger', title: 'Stop Using It', text: 'If you see any scorch marks, stop using that outlet immediately. Turn off the breaker for that circuit and call a professional. This is not a \"next weekend\" project.' },

      { type: 'heading', text: '8. The Loose Plug' },
      { type: 'paragraph', text: "When you plug in a vacuum cleaner or phone charger and it falls out of the wall on its own, that is not just annoying — it is dangerous. The metal \"wipers\" inside the socket have lost their grip after years of use." },
      { type: 'paragraph', text: "**Loose grip = Poor contact = High resistance = High heat.** You know the formula by now. This is one of the most common causes of melted plugs and burned outlets." },

      { type: 'heading', text: '9. Aluminum Wiring (Older Homes)' },
      { type: 'paragraph', text: "If your home was built between 1965 and 1975 (especially in North America), there is a chance your home uses aluminum wiring instead of copper. Aluminum is cheaper, but it expands and contracts **30% more** than copper when it heats up and cools down." },
      { type: 'stat', value: '55x', label: 'Higher fire risk in homes with aluminum wiring vs copper', color: 'text-red-600' },
      { type: 'paragraph', text: "Over years of thermal cycling, those expansion-contraction cycles slowly loosen every screw terminal in your home. The fix is not rewiring — it is installing special \"COPALUM\" or \"AlumiConn\" connectors at every junction point. Ask your electrician." },

      { type: 'heading', text: '10. Two-Prong Outlets (No Ground)' },
      { type: 'paragraph', text: "If your outlets only have two slots (no round hole for the third pin), your home has no ground wire. This means if an appliance like your metal-body washing machine or microwave develops an internal fault, there is no \"escape path\" for the stray electricity." },
      { type: 'paragraph', text: "The electricity sits on the metal body of that machine, invisible and patient. The moment you touch it, **you become the ground wire.** The current flows through your chest to get to the floor. It can stop your heart." },
      { type: 'callout', variant: 'tip', title: 'The Quick Fix (If Full Rewiring is Too Expensive)', text: 'You can replace 2-prong outlets with GFCI outlets even without a ground wire. The GFCI will detect current leaking through your body and cut the power in 0.03 seconds. It is not as good as a proper ground, but it can save your life. [[/assessment|→ Check your home\'s safety score now]]' },

      { type: 'tool-link', tool: 'Free 25-Point Safety Assessment', path: '/assessment', description: 'Walk through every room in your house with our guided checklist. Takes 5 minutes. Could save your family.', icon: 'clipboard' },
    ],
    faqs: [
      {
        question: "What should I do if I smell fish near an outlet?",
        answer: "Stop using the outlet immediately. Switch off the circuit breaker for that specific room. The 'fishy' smell is melting insulation (Urea or Bakelite) — it means the wire is actively overheating. Call an electrician the same day. This is not something that can wait until next week."
      },
      {
        question: "Is a buzzing light switch dangerous?",
        answer: "Yes, very much so. A buzzing sound means electricity is arcing — jumping through the air between loose contacts. This arc creates plasma hotter than 3,000°F, easily hot enough to ignite the plastic switch body or the wood stud inside your wall. Replace the switch as soon as possible."
      },
      {
        question: "Why do my lights flicker when the Air Conditioner starts?",
        answer: "This is Voltage Drop. Your AC motor draws a huge burst of current (called Inrush Current) for a split second when it kicks on. If your wiring is old, thin, or has a loose connection, it can't supply that burst — so the voltage drops across your entire house. It is annoying, but the real danger is that the low voltage makes the AC motor run hotter, shortening its life. Use our [[/load-calc|Load Calculator]] to check if your circuits are overloaded."
      },
      {
        question: "Is it safe to tape a breaker in the ON position?",
        answer: "Absolutely NOT. This is one of the most dangerous things you can do. The breaker trips to prevent your wires from melting. Forcing it ON means you are overriding the safety system — the wires will overheat, the insulation will melt, and eventually the wall catches fire. Find the cause of the trip first."
      },
      {
        question: "How do I know if the problem is my appliance or the outlet?",
        answer: "Use the 'Swap Test'. Plug the suspicious appliance into a different outlet in another room. If the problem follows the appliance, the appliance is faulty — replace it. If the problem stays at the original outlet with any device, the wiring or outlet is faulty — call an electrician."
      }
    ]
  },
  {
    id: '2',
    slug: 'outlet-fire-physics',
    seoTitle: "Why Electrical Outlets Burn: Loose Connections & Friction Fire Risks",
    title: "The Friction Fire: Why Outlets Burn",
    excerpt: "It's not just 'bad luck'. It's physics. Learn why loose connections turn your wall into a toaster.",
    category: "Prevention",
    readTime: "6 min",
    metaDescription: "Understand the physics behind electrical fires. How loose connections create resistance and heat (Joule Heating) leading to outlet failure.",
    keywords: ["outlet fire", "loose connection", "electrical resistance", "joule heating", "melted outlet"],
    standards: ["IEC 60884-1", "UL 498"],
    relatedArticles: ['10-signs-electrical-problems', 'electrical-tape-danger', 'old-wiring-dangers'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check all your outlets in our guided walkthrough' },
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right spec-grade outlet for your home' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "I get this question a lot: *\"Why did my outlet just... melt? I wasn't even using it for anything heavy.\"*" },
      { type: 'paragraph', text: "And the answer is always the same — it was never about how much power you were using. It was about the **quality of the connection** inside the outlet. A single loose screw terminal can destroy your outlet, your wall, and potentially your home. Let me walk you through the physics." },
      { type: 'math', formula: 'P = I² × R', label: 'The Only Formula You Need', description: 'Power (heat generated) equals Current squared times Resistance. A tiny increase in resistance at a loose connection creates enormous heat because the current term is SQUARED.' },

      { type: 'heading', text: 'The 5-Step Mechanism of Outlet Failure' },
      { type: 'paragraph', text: "Outlets don't just catch fire randomly. There is a very specific chain of events that takes months or years to unfold. Understanding it means you can catch it early." },
      { type: 'steps', title: 'How a Good Outlet Slowly Becomes a Fire Hazard', steps: [
        { title: 'The Wiggle', text: 'Over years of plugging and unplugging, screw terminals inside the outlet vibrate loose. Or the spring-metal contacts lose their tension from heat cycling.' },
        { title: 'The Constriction', text: 'Electricity is forced to funnel through a tiny point of contact instead of the full metal surface. Think of squeezing a garden hose — same water, much higher pressure.' },
        { title: 'The Heat', text: 'High current squeezing through a tiny spot creates tremendous heat. This is **Joule Heating** — the same principle used in your toaster to brown bread.' },
        { title: 'The Oxidation', text: 'Heat causes the copper to react with air, forming Copper Oxide (that black crust). Here is the nasty part — oxide is a **worse conductor**, which means even MORE resistance.' },
        { title: 'The Runaway Loop', text: 'More resistance → more heat → more oxide → more resistance. This feedback loop accelerates until the plastic melts, drips down the wall, and ignites.' },
      ]},

      { type: 'stat', value: '30 sec', label: 'Time from plastic ignition to full flame in a standard outlet box', color: 'text-red-600' },

      { type: 'heading', text: 'The "Backstab" Danger' },
      { type: 'paragraph', text: "Here is something that frustrates me as a professional. Many house fires start because the electrician used the lazy shortcut — the \"push-in\" holes (called backstabs) on the back of cheap outlets instead of properly wrapping the wire around the screw terminals." },
      { type: 'comparison', bad: { title: 'Backstab (Push-In) Connection', items: ['Wire held by a **weak spring clip**', 'Spring weakens from heat over 2-3 years', 'Wire can work itself loose invisibly', 'Responsible for thousands of house fires'] }, good: { title: 'Screw Terminal Connection', items: ['Wire wrapped 270° around screw', 'Screw clamp only gets tighter with heat', 'Physically impossible for wire to slip out', 'Used by every professional electrician'] } },

      { type: 'callout', variant: 'tip', title: 'The $2 Upgrade That Saves Lives', text: 'When replacing outlets, spend the extra $2 for **Spec Grade** or **Commercial Grade** outlets. They have brass clamps that grip the wire like a vice. The cheap 50-cent builder-grade outlets use thin stamped metal that wears out quickly. [[/hardware|→ See the Hardware Guide for more details]]' },

      { type: 'tool-link', tool: 'Hardware Encyclopedia', path: '/hardware', description: 'Find the right wire, breaker, and outlet specs for every room in your home.', icon: 'settings' },
    ],
    faqs: [
      { question: "How do I know if my outlets are loose?", answer: "Do the 'Plug Feel Test'. Insert a standard plug — it should need firm pressure to push in and real effort to pull out. If it slides in easily or falls out on its own, the internal contacts are worn. Replace the outlet." },
      { question: "Are 'Push-in' connectors always bad?", answer: "Old backstab holes on outlets? Generally yes — avoid them. But modern Lever-Nut connectors (like Wagos) in junction boxes are excellent. The difference: Wagos use a strong active spring clamp, while backstabs use a weak passive spring." },
      { question: "How tight should I tighten the screws?", answer: "The pro rule is 'Hand tight, plus a quarter turn'. You want the copper to slightly flatten under the screw, but not be crushed. If you have a torque screwdriver, aim for 1.2 to 2.0 Newton Meters." },
      { question: "Can I just tape up a cracked outlet?", answer: "No. The crack exposes the live parts to dust, moisture, and fingers. New outlets cost less than a cup of coffee. Replace it." }
    ]
  },
  {
    id: '3',
    slug: 'lithium-battery-fire-safety',
    seoTitle: "Lithium Battery Safety: Why Phones Explode & Prevention Tips",
    title: "The Pocket Bomb: Lithium Fires",
    excerpt: "Your phone battery holds the energy of a hand grenade. Learn why they explode and how to charge safely.",
    category: "Modern Risks",
    readTime: "5 min",
    metaDescription: "Lithium-ion battery safety guide. Why thermal runaway happens, how to prevent phone explosions, and why you should never charge under a pillow.",
    keywords: ["lithium fire", "thermal runaway", "phone battery explosion", "safe charging", "e-bike fire"],
    standards: ["UL 1642", "IEC 62133"],
    relatedArticles: ['lightning-surge-protection', 'extension-cord-dangers'],
    relatedTools: [
      { name: 'Risk Predictor', path: '/risk-predictor', why: 'Check if your charging habits are creating a fire risk' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Let me put this into perspective for you. The lithium-ion battery in your phone stores roughly the same energy density as a small firework. The one in an electric scooter? That is closer to a **pipe bomb.**" },
      { type: 'paragraph', text: "I know that sounds dramatic. But as someone who has investigated electrical incidents professionally, lithium battery fires are the fastest-growing category of home fires worldwide. And unlike normal fires, you **cannot** put them out with a blanket or a bucket of water. Here is why." },

      { type: 'heading', text: 'What is Thermal Runaway?' },
      { type: 'paragraph', text: "Inside every lithium battery, there is an incredibly thin plastic membrane called a **Separator** — thinner than a human hair. Its only job is to keep the positive and negative chemical layers apart." },
      { type: 'paragraph', text: "If that separator tears, gets punctured, or melts from heat — the two sides touch. And when they touch, the battery dumps **100% of its stored energy** into that one spot in an instant." },
      { type: 'stats-row', stats: [
        { value: '1,000°F', label: 'Peak temperature of thermal runaway', color: 'text-red-600' },
        { value: '< 3 sec', label: 'Time from internal short to fire', color: 'text-orange-600' },
        { value: '∞', label: 'Creates its own oxygen — burns in water', color: 'text-purple-600' },
        { value: 'HF Gas', label: 'Emits Hydrogen Fluoride (melts skin)', color: 'text-red-500' },
      ]},

      { type: 'heading', text: 'Why It Is So Hard to Fight' },
      { type: 'callout', variant: 'danger', title: 'You Cannot Smother a Lithium Fire', text: 'A lithium battery in thermal runaway creates its own oxygen through chemical decomposition. You cannot suffocate it. It will burn under a blanket. It will burn underwater. It will burn in a sealed box. The ONLY strategy is: **Evacuate and call the fire department.**' },

      { type: 'heading', text: 'The 3 Most Common Triggers' },
      { type: 'steps', steps: [
        { title: 'Physical Damage', text: 'Dropping your phone from a height or crashing an e-scooter can crush that gossamer-thin separator membrane. The battery looks fine outside but is fatally damaged inside.' },
        { title: 'Cheap Chargers', text: 'A $2 gas station charger has no intelligence — it cannot communicate with your phone to regulate voltage. It just pushes power blindly until the battery swells like a balloon.' },
        { title: 'Heat Traps', text: 'Charging your phone under your pillow, in a bedsheet, or in direct sunlight traps the heat with nowhere to escape. The battery gets hotter, charges faster (dangerously), and the runaway begins.' },
      ]},

      { type: 'comparison', bad: { title: 'Dangerous Habits', items: ['Charging phone under pillow or on bed', 'Using cheap generic chargers', 'Charging e-bike inside your front hallway', 'Ignoring puffy/swollen battery', 'Leaving old batteries in junk drawers'] }, good: { title: 'Safe Habits', items: ['Charge on hard, cool surfaces (nightstand)', 'Use OEM or certified chargers only', 'Charge e-bikes in garage on concrete', 'Dispose of swollen batteries at recycling centers', 'Store spare batteries in fireproof bags'] } },

      { type: 'callout', variant: 'warning', title: 'The "Spicy Pillow" Warning', text: 'If your phone case seems tight, your laptop trackpad is popping up, or any battery looks puffy — it is full of gas and ready to ignite. Do NOT press on it. Do NOT charge it. Put it in a metal container on a non-flammable surface and take it to a battery recycling center immediately.' },
    ],
    faqs: [
      { question: "Can I leave my phone charging overnight?", answer: "Modern phones are smart enough to stop at 100%. But the real risk is heat. If your phone is under a pillow or blanket, it can overheat while 'trickle charging.' Always charge on a hard surface like a nightstand." },
      { question: "How do I put out a lithium battery fire?", answer: "Honestly? You generally can't. Water can cool surrounding materials but won't stop the chemical reaction. Your best strategy: Evacuate everyone, close the door, and call the fire department immediately. Do NOT breathe the smoke — it contains Hydrogen Fluoride." },
      { question: "Why does my battery look puffy or swollen?", answer: "A swollen battery means the internal chemicals have degraded and released gas. The casing is holding it back like a balloon. This is critical — it is one puncture away from thermal runaway. Stop using it, don't charge it, and recycle it properly." },
      { question: "Is it safe to charge my e-bike inside the house?", answer: "It is risky. E-bike batteries have huge energy capacity. If they fail, the fire is explosive and blocks your exit. Charge in a garage on concrete — never blocking your front door." }
    ]
  },
  {
    id: '4',
    slug: 'extension-cord-dangers',
    seoTitle: "Extension Cord Safety: Risks of Daisy Chaining & Overloading",
    title: "The Extension Cord Trap",
    excerpt: "They are meant for temporary use, not permanent solutions. Here is why daisy-chaining kills.",
    category: "Habits",
    readTime: "4 min",
    metaDescription: "Why extension cords are the #1 cause of electrical fires. Daisy chaining risks, voltage drop, and safe usage guidelines.",
    keywords: ["daisy chaining", "extension cord fire", "power strip safety", "electrical overload"],
    standards: ["NFPA 70 Art 400", "UL 817"],
    relatedArticles: ['appliance-voltage-drop', 'outlet-fire-physics', '10-signs-electrical-problems'],
    relatedTools: [
      { name: 'Load Calculator', path: '/load-calc', why: 'See if your circuit can handle the total load' },
      { name: 'Safety Assessment', path: '/assessment', why: 'Check if you are making extension cord mistakes' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "If I had to guess the single most common fire hazard I have seen in people's homes, it would not be old wiring or a faulty breaker. It would be this: **an extension cord plugged into another extension cord, permanently stapled behind a sofa, powering a space heater.**" },
      { type: 'paragraph', text: "Extension cords are supposed to be temporary. Like, \"I need to vacuum the hallway\" temporary. But we treat them like permanent wiring, and that is where the trouble starts." },
      { type: 'stat', value: '#1', label: 'Cause of electrical fires in rental homes', color: 'text-red-600' },

      { type: 'heading', text: 'The Daisy Chain of Death' },
      { type: 'paragraph', text: "Plugging a power strip into another power strip is called **Daisy Chaining**. I have seen homes with three strips chained together carrying a TV, a gaming console, speakers, a lamp, and a phone charger. Seems fine, right? Here is why it isn't." },
      { type: 'steps', steps: [
        { title: 'The Funnel Effect', text: 'You might have 8 devices across 3 strips, but ALL that current has to squeeze through the single, thin cord of the first strip. That cord was rated for maybe 2 devices, not 8.' },
        { title: 'Resistance Multiplier', text: 'Every plug-to-socket connection point adds a tiny amount of resistance. Three strips = 6 extra connection points = 6 extra heat sources hiding behind your furniture.' },
        { title: 'The Invisible Overload', text: 'The first strip\'s internal fuse (if it even has one) is only protecting itself. It has no idea how many strips are chained after it. No one is watching the total load.' },
      ]},

      { type: 'heading', text: 'The Heater Problem' },
      { type: 'paragraph', text: "Space heaters, man. I have strong feelings about space heaters and extension cords. A heater draws **1,500 Watts** continuously. Most cheap extension cords use thin 16-gauge wire rated for maybe 500 Watts." },
      { type: 'math', formula: '1,500W ÷ 120V = 12.5 Amps', label: 'Heater Current Draw', description: 'A standard space heater draws 12.5 Amps constantly. Most extension cords are rated for 7-10 Amps. You are running at 125% to 180% of the cord\'s safe capacity.' },
      { type: 'paragraph', text: "When you plug a heater into a cheap cord, **the cord itself becomes a heater.** A 6-foot long heating element running across your flammable carpet or tucked behind your curtains. I have personally seen the aftermath." },

      { type: 'heading', text: 'The Golden Rules' },
      { type: 'comparison', bad: { title: 'Never Do This', items: ['Plug a strip into another strip (daisy chain)', 'Use extension cords for fridges, ACs, or heaters', 'Run cords under rugs or carpets', 'Use a cord that feels warm to the touch', 'Treat extension cords as permanent wiring'] }, good: { title: 'Always Do This', items: ['One wall socket → one strip → light-duty devices only', 'Heavy appliances go DIRECTLY into the wall', 'Replace extension cords with new wall outlets if needed permanently', 'Choose the right gauge: 12 AWG for tools, 14 AWG for general, 16 AWG for lamps only', 'The \"Touch Test\" — if the cord feels warm, unplug immediately'] } },

      { type: 'tool-link', tool: 'Load Calculator', path: '/load-calc', description: 'Add up all devices on a single circuit to see if you are overloading it — with real-time wattage math.', icon: 'calculator' },
    ],
    faqs: [
      { question: "Can I use an extension cord for my refrigerator?", answer: "No. Refrigerators need stable voltage for their compressor motors. Extension cords cause Voltage Drop, which starves the motor and makes it overheat. Also, the cord behind a fridge can loosen and spark without you noticing. Use our [[/load-calc|Load Calculator]] to check your circuit capacity." },
      { question: "What does the gauge (AWG) number mean?", answer: "Think of AWG like golf scores: **lower = better (thicker)**. 12 AWG is thick and safe for tools. 16 AWG is thin and only safe for lamps. Always check the embossed number on the cord itself." },
      { question: "Is it okay to run cords under rugs?", answer: "Absolutely not. Foot traffic crushes the copper strands, creating hot spots. The rug traps the heat. You won't know it's melting until the rug catches fire. This is a classic fire investigator scenario." },
      { question: "My power strip has a switch. Isn't that a breaker?", answer: "Not always. Most cheap strips have a simple on/off toggle with no overload protection. Look for a separate 'Reset' button or '15A Circuit Breaker' marking. Without that, it's just a glorified extension cord." }
    ]
  },
  {
    id: '5',
    slug: 'bathroom-shock-myth',
    seoTitle: "Why Water Conducts Electricity: Bathroom Shock Hazards & GFCI Safety",
    title: "Water + Volts: The Bathroom Myth",
    excerpt: "Pure water doesn't conduct electricity. But your bath water does. Learn the science of shock.",
    category: "Basics",
    readTime: "4 min",
    metaDescription: "The science of electric shock in bathrooms. Why tap water conducts electricity and why GFCI/RCDs are mandatory in wet areas.",
    keywords: ["water electricity", "bathroom shock", "GFCI", "RCD", "electrocution"],
    standards: ["IEC 60364-7-701"],
    relatedArticles: ['grounding-myth-safety', '10-signs-electrical-problems'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check if your bathroom has GFCI/RCD protection' },
      { name: 'Room Guides', path: '/rooms', why: 'Bathroom-specific safety checklist' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Remember science class? *\"Water conducts electricity.\"* Your teacher was actually wrong. Well, partially wrong." },
      { type: 'paragraph', text: "**Pure distilled water is actually an insulator.** You could dunk a live wire in perfectly pure H₂O and nothing would happen. So why is the bathroom the single most dangerous room in your house for electrocution?" },
      { type: 'paragraph', text: "Because your tap water is far from pure. It is loaded with dissolved minerals, salts, chlorine, and ions. And those ions? They create a superhighway for electrons." },

      { type: 'stats-row', stats: [
        { value: '100kΩ', label: 'Dry skin resistance', color: 'text-green-600' },
        { value: '1kΩ', label: 'Wet skin resistance', color: 'text-red-600' },
        { value: '100×', label: 'More current through wet body', color: 'text-orange-600' },
        { value: '0.03s', label: 'GFCI trip time (life saver)', color: 'text-blue-600' },
      ]},

      { type: 'heading', text: 'The Hairdryer Scenario' },
      { type: 'paragraph', text: "Let me walk you through what actually happens if a plugged-in hairdryer falls into the bathtub. I know this sounds morbid, but understanding the physics could genuinely save your life or the life of someone you love." },
      { type: 'steps', steps: [
        { title: 'The Leak', text: 'Electricity escapes from the live wire inside the hairdryer into the mineral-rich, highly conductive bathwater.' },
        { title: 'The Hunt', text: 'Electricity desperately searches for a path back to the ground (Earth). It is drawn toward anything connected to the ground — like metal drain pipes.' },
        { title: 'The Body Path', text: '**You** are sitting in the middle, between the energized water and the grounded drain. Current takes the shortest path — through your body.' },
        { title: 'The Heart', text: 'The current crosses your chest cavity. It disrupts your heart\'s own electrical signals. The result is Cardiac Arrest — not a burn, but heart failure.' },
      ]},

      { type: 'heading', text: 'The Life Saver: GFCI / RCD' },
      { type: 'paragraph', text: "A **Ground Fault Circuit Interrupter (GFCI)** or **Residual Current Device (RCD)** is basically a tiny, incredibly fast computer that monitors your circuit in real time." },
      { type: 'math', formula: 'If I<sub>out</sub> − I<sub>return</sub> ≥ 5mA → CUT POWER in 0.03s', label: 'How GFCI/RCD Works', description: 'It compares current going OUT on the Live wire vs coming BACK on the Neutral. If even 5 milliamps is missing (leaking through your body), it kills the power in 30 milliseconds — faster than a heartbeat.' },
      { type: 'paragraph', text: "You might feel a painful zap. Your arm might tingle. But you will be alive. Without GFCI/RCD protection, that same scenario is often fatal." },

      { type: 'callout', variant: 'danger', title: 'The One Rule', text: 'If your bathroom, kitchen, or outdoor outlets do not have GFCI/RCD protection (look for \"Test\" and \"Reset\" buttons on the outlet or your breaker panel), you are gambling with your family\'s life every single day. This costs $15 to fix. Do it today.' },

      { type: 'tool-link', tool: 'Room-by-Room Safety Guide', path: '/rooms', description: 'Walk through your Bathroom, Kitchen, and every room with our interactive checklist.', icon: 'map' },
    ],
    faqs: [
      { question: "How do I know if my bathroom is safe?", answer: "Look for an outlet with 'TEST' and 'RESET' buttons. Press TEST — the power should cut instantly. Press RESET to restore. If it doesn't click, the safety device has failed. Replace it. In Europe/Asia, check your main panel for a wide switch labeled 'RCD' or 'RCCB'." },
      { question: "Can I get shocked touching a switch with wet hands?", answer: "Yes. Wet skin drops your body's resistance from 100,000 Ohms to just 1,000 Ohms — that allows 100x more current to flow through you if the switch has a fault. Always dry your hands first." },
      { question: "Is it safe to charge my phone while in the bath?", answer: "NO. Even though the phone is low voltage, the charger is plugged into mains voltage. If the charger or cord falls into the water, it is lethal. Use a battery power bank if you must." },
      { question: "Why do shaver sockets look different?", answer: "Shaver sockets have an 'Isolating Transformer' — it physically separates the power from the main grid, making electric shock nearly impossible. They are the only safe socket type allowed near a washbasin." }
    ]
  },
  {
    id: '6',
    slug: 'grounding-myth-safety',
    seoTitle: "What is Electrical Grounding? Why You Need a 3rd Pin for Safety",
    title: "The Grounding Myth",
    excerpt: "My appliance works fine without the 3rd pin. Sure. It works fine... until it kills you.",
    category: "Safety Systems",
    readTime: "5 min",
    metaDescription: "Why grounding is essential for metal appliances. The dangers of 'cheater plugs' and how the earth wire saves lives.",
    keywords: ["grounding", "earthing", "3rd pin", "cheater plug", "electric shock prevention"],
    standards: ["IEEE 142", "IEC 60364-5-54"],
    relatedArticles: ['bathroom-shock-myth', '10-signs-electrical-problems', 'smart-switch-neutral-wire'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check if your home has proper grounding' },
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right grounding components' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "I want to tell you about the most dangerous DIY hack I have ever seen. A homeowner took a pair of pliers, snapped off the third pin (the round ground prong) from his washing machine plug, and forced it into a two-pin socket. *\"It works fine,\"* he said." },
      { type: 'paragraph', text: "And he was right — it did work fine. For 11 months. Until a wire vibrated loose inside the machine and touched the metal drum. And then his wife touched the machine while standing on a wet floor." },
      { type: 'callout', variant: 'danger', title: 'The Invisible Bodyguard', text: 'The ground wire does NOTHING 99.9% of the time. It just sits there. But in that 0.1% moment when something goes wrong inside an appliance, it is the difference between a tripped breaker and a funeral.' },

      { type: 'heading', text: 'Two Scenarios, Two Outcomes' },
      { type: 'paragraph', text: "Let me paint you two pictures. Same washing machine. Same loose wire inside. But one home has grounding, and one doesn't." },
      { type: 'comparison', good: { title: 'With Grounding (Safe)', items: ['Wire touches metal casing → casing is now \"live\"', 'Ground wire gives electricity an instant escape path', 'Massive current rushes to earth in milliseconds', 'Breaker trips immediately — **POP!** Power is cut', 'You walk up, notice it is off, call an electrician', '**Result: Nobody gets hurt**'] }, bad: { title: 'Without Grounding (Fatal)', items: ['Wire touches metal casing → casing is now \"live\"', 'No escape path — electricity sits on the metal skin', 'Casing charges to full 120V or 230V silently', 'Breaker does NOT trip (no current is flowing yet)', 'You touch the machine — **YOU become the path to ground**', '**Result: Current flows through your chest**'] } },

      { type: 'heading', text: 'Why Some Plugs Only Have 2 Pins' },
      { type: 'paragraph', text: "You might notice that your phone charger only has two prongs. So does your laptop charger. Are they unsafe? No — they are **Double Insulated** (Class II). They have two separate layers of non-conductive plastic between the dangerous voltage and anything you can touch. Even if the internal wire breaks, it physically cannot reach the outside. That is why they are marked with a small ☐ inside ☐ symbol." },
      { type: 'callout', variant: 'tip', title: 'The Simple Rule', text: '**Metal body** appliance (fridge, washer, microwave, PC) = **MUST** have ground (3-pin). **Plastic body** appliance (charger, hair dryer, double-insulated tools) = 2-pin is safe by design.' },

      { type: 'tool-link', tool: 'Safety Assessment', path: '/assessment', description: 'Check every room for proper grounding in our guided 25-point walkthrough.', icon: 'clipboard' },
    ],
    faqs: [
      { question: "Why do phone chargers only have 2 pins?", answer: "They are 'Double Insulated' (Class II) — two layers of plastic barrier between dangerous voltage and you. Even if the internal wire breaks, it cannot reach the outside. No ground needed." },
      { question: "Can I install a 3-prong outlet on 2-wire cabling?", answer: "Yes, but ONLY with GFCI/RCD protection. The code allows a 3-prong GFCI outlet on 2-wire, labeled 'No Equipment Ground'. The GFCI detects leaks to your body and cuts power." },
      { question: "My surge protector shows 'Not Grounded'. Is it protecting me?", answer: "No. Surge protectors dump excess voltage to the ground wire. Without ground, it is just a power strip — your PC has zero surge protection. Fix the grounding first." },
      { question: "Is Neutral the same as Ground?", answer: "No! Neutral carries current BACK from devices (it's a working wire). Ground only carries current in emergencies (safety wire). Connecting them together at an outlet ('Bootlegging') can electrocute the next person who touches the device." }
    ]
  },
  {
    id: '7',
    slug: 'childproofing-outlets-hazard',
    seoTitle: "Best Outlet Covers for Babies: TRR vs Plastic Caps Safety",
    title: "Childproofing 2.0",
    excerpt: "Why those cheap plastic outlet plugs are actually dangerous choking hazards.",
    category: "Family",
    readTime: "3 min",
    metaDescription: "The truth about plastic outlet caps. Why TRR (Tamper Resistant Receptacles) are superior and safer for children.",
    keywords: ["childproofing outlets", "plastic outlet caps", "TRR", "tamper resistant receptacle", "baby safety"],
    standards: ["NEC 406.12"],
    relatedArticles: ['grounding-myth-safety', '10-signs-electrical-problems'],
    relatedTools: [
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right TRR outlets for your home' },
      { name: 'Room Guides', path: '/rooms', why: 'Childproof each room step by step' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "If you are a parent, you have probably bought those little plastic caps that plug into empty outlets. Every baby store sells them. They seem like the obvious solution. And look, they are better than nothing." },
      { type: 'paragraph', text: "But here is what most parents don't realize — **those caps are actually a choking hazard themselves.** And they rely entirely on you remembering to put them back in every single time." },

      { type: 'heading', text: 'The Problem with Plastic Caps' },
      { type: 'steps', steps: [
        { title: 'Kids are Smarter Than You Think', text: 'A determined 2-year-old watches you pull the cap out. They learn the motion in days. Small fingernails can pry these caps out surprisingly easily.' },
        { title: 'Choking Hazard', text: 'Once the cap is out, it goes straight into their mouth. These caps are exactly the size that lodges in a toddler\'s throat.' },
        { title: 'The \"Forgot to Replace\" Problem', text: 'You take the cap out to vacuum, get distracted by a phone call, and the outlet stays open. That 5-minute window is exactly when accidents happen.' },
      ]},

      { type: 'heading', text: 'The Real Solution: TRR Outlets' },
      { type: 'paragraph', text: "Since 2008, the National Electrical Code requires **Tamper Resistant Receptacles (TRR)** in all new homes. They look like normal outlets, but they have a hidden superpower." },
      { type: 'comparison', bad: { title: 'Plastic Caps (Old Way)', items: ['Must be manually removed and replaced constantly', 'Child can learn to remove them', 'Choking hazard once removed', 'You forget to put them back 100% of the time', 'No protection when you are not watching'] }, good: { title: 'TRR Outlets (Modern Way)', items: ['Internal spring-loaded shutters', 'Require two prongs pushing **simultaneously** to open', 'A single key, paperclip, or fork hits a wall', '24/7 passive protection — no action needed from you', 'Look and work just like normal outlets for adults'] } },
      { type: 'callout', variant: 'tip', title: 'How to Check', text: 'Look at the outlet slots closely. If you see solid plastic blocking the holes (looks \"closed\"), it is TRR. Also look for the letters **TR** stamped faintly between the slots. Replacing standard outlets with TRR costs about $3 per outlet.' },

      { type: 'tool-link', tool: 'Hardware Guide', path: '/hardware', description: 'Find TRR outlets, sliding covers, and other child safety products with proper specifications.', icon: 'settings' },
    ],
    faqs: [
      { question: "How do I know if I have TRR outlets?", answer: "Look at the slots — if you see plastic blocking them (like the outlet is 'closed'), they are TRR. Also look for 'TR' stamped faintly on the face between the slots." },
      { question: "TRR outlets are hard to plug into. Is that normal?", answer: "Yes, especially new ones. Push the plug straight and firm — don't wiggle. The stiffness is exactly the mechanism that keeps kids safe. It loosens slightly with use." },
      { question: "Are sliding plate covers better than caps?", answer: "Yes — self-closing sliding covers snap back when you unplug. Nothing to choke on, nothing to forget to replace." },
      { question: "Broken prong stuck in the outlet?", answer: "Do NOT dig it out! Turn off the main breaker, verify power is off with a lamp, then use insulated needle-nose pliers. When in doubt, call a pro." }
    ]
  },
  {
    id: '8',
    slug: 'old-wiring-dangers',
    seoTitle: "Old House Wiring Dangers: When to Rewire & Insulation Risks",
    title: "The 30-Year Itch: Old Wiring",
    excerpt: "Copper doesn't age. But plastic does. Why homes built before 1990 are reaching a tipping point.",
    category: "Maintenance",
    readTime: "5 min",
    metaDescription: "Dangers of old wiring. How deteriorating insulation leads to short circuits and fires in homes older than 30 years.",
    keywords: ["old wiring", "knob and tube", "brittle insulation", "rewiring house", "electrical inspection"],
    standards: ["IEC 60227"],
    relatedArticles: ['10-signs-electrical-problems', 'outlet-fire-physics', 'rodents-chewing-wires'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check your home\'s age-related risk factors' },
      { name: 'Risk Predictor', path: '/risk-predictor', why: 'Describe your symptoms and get a diagnosis' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Here is something that surprises most people: the copper wire inside your walls will last essentially forever. Copper is an element — it does not degrade. A Roman copper wire from 2,000 years ago still conducts electricity perfectly." },
      { type: 'paragraph', text: "So why do we say old wiring is dangerous? Because it was never about the copper. **It is about the plastic jacket wrapped around it.**" },

      { type: 'heading', text: 'The 30-Year Tipping Point' },
      { type: 'paragraph', text: "The insulation on electrical wire is basically a thin layer of PVC or rubber. It was designed to be flexible and tough. But after 25 to 35 years of heating up every morning (when your AC or heater kicks on) and cooling down every night (thermal cycling), that plastic slowly transforms." },
      { type: 'steps', steps: [
        { title: 'Year 1-15: Healthy', text: 'Insulation is flexible, pliable. You can bend the wire and the jacket moves with it. No issues.' },
        { title: 'Year 15-25: Aging', text: 'Plastic starts losing its plasticizers (the chemicals that keep it soft). It becomes stiffer. Still functional, but not as resilient.' },
        { title: 'Year 25-35: Critical', text: 'Insulation becomes **brittle like a dry leaf**. If anything touches it — a mouse, a renovation vibration, a screw from a picture frame — it cracks and falls off.' },
        { title: 'After Crack: Exposed', text: 'Bare copper wires now sit next to dry wood studs inside your wall. A single arc can start a fire that burns for hours behind the drywall before you even see smoke.' },
      ]},
      { type: 'stat', value: '30 years', label: 'Average lifespan of standard residential wire insulation', color: 'text-amber-600' },

      { type: 'heading', text: 'Knob and Tube (Pre-1950 Homes)' },
      { type: 'paragraph', text: "If your home is really old, you might have **Knob and Tube** wiring — wires floating in air on ceramic knobs nailed to the joists. In 1940, this was perfectly safe for a few light bulbs. But today? We bury those wires under puffy attic insulation, trap the heat, and try to run modern loads through them. It is a recipe for disaster." },
      { type: 'callout', variant: 'warning', title: 'Insurance Alert', text: 'Many home insurers will refuse coverage or charge 2-3x premiums if they discover Knob and Tube or Aluminum wiring. They may require an electrical inspection certificate before insuring the home.' },

      { type: 'heading', text: 'The Non-Destructive Test' },
      { type: 'paragraph', text: "Good news — you do not need to tear down your walls to check your wiring. Ask an electrician for an **Insulation Resistance Test (Megger Test)**. They send a controlled high-voltage pulse down each circuit and measure how much leaks through the plastic. It tells you the health of every wire in your home without touching a single wall." },

      { type: 'tool-link', tool: 'Risk Predictor', path: '/risk-predictor', description: 'Tell us your home\'s age and symptoms — we will diagnose the most likely wiring issues.', icon: 'activity' },
    ],
    faqs: [
      { question: "Do I have to tear down walls to rewire?", answer: "Not usually. Skilled electricians 'fish' new wires through existing cavities using the old wires as guides, plus attic and basement access. Small patch holes may be needed, but full demolition is rare." },
      { question: "Does insurance cover old wiring?", answer: "Many insurers refuse coverage or charge higher premiums for Knob & Tube or Aluminum wiring. They may require an audit certificate before insuring." },
      { question: "What is cloth-covered wiring?", answer: "Common in 1950s homes — rubber insulation wrapped in cloth. The rubber crumbles over time, leaving only cloth as 'protection'. It should be evaluated by a professional." },
      { question: "Can I add new outlets to old wiring?", answer: "Be cautious. Adding load to brittle insulation increases risk. Better to run a fresh circuit from the panel for new outlets, leaving old circuits undisturbed." }
    ]
  },
  {
    id: '9',
    slug: 'appliance-voltage-drop',
    seoTitle: "What Causes Voltage Drop? How Low Voltage Damages Motors & Appliances",
    title: "Appliance Suicide: Voltage Drop",
    excerpt: "Why your AC motor burned out even though you didn't use it much.",
    category: "Appliances",
    readTime: "4 min",
    metaDescription: "How voltage drop destroys motors. Why using long extension cords ruins air conditioners and fridges.",
    keywords: ["voltage drop", "motor burnout", "AC failure", "extension cord damage"],
    standards: ["IEC 60364-5-52"],
    relatedArticles: ['extension-cord-dangers', 'outlet-fire-physics', 'circuit-breaker-tripping'],
    relatedTools: [
      { name: 'Load Calculator', path: '/load-calc', why: 'Calculate total load and check for voltage drop' },
      { name: 'Bill Detector', path: '/bill-detector', why: 'See if voltage drop is costing you money' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "A friend called me last summer. *\"My AC is only two years old and the compressor just died. The repair guy wants $800. What went wrong?\"*" },
      { type: 'paragraph', text: "I asked one question: *\"Is it plugged into the wall directly, or through an extension cord?\"*" },
      { type: 'paragraph', text: "Silence. Then: *\"...A long orange cord from the garage outlet.\"*" },
      { type: 'paragraph', text: "That $15 extension cord killed his $800 compressor. Here is why." },

      { type: 'heading', text: 'The Counter-Intuitive Physics' },
      { type: 'paragraph', text: "You would think that if the voltage is low, the motor just runs slower and uses less energy. Like a car running on fumes. **That is completely wrong.** Motors do not work like that." },
      { type: 'math', formula: 'P = V × I → If V goes ↓, I must go ↑', label: 'The Motor Death Equation', description: 'A motor needs a fixed amount of power to do its job (compress gas, spin a drum). If voltage drops, it compensates by drawing MORE current. More current = more heat in the windings.' },
      { type: 'paragraph', text: "Here is what actually happens: the delicate copper windings inside the motor overheat. The thin lacquer insulation on those windings bakes and melts. The windings short-circuit internally. The motor dies — permanently." },

      { type: 'heading', text: 'The Extension Cord Killer' },
      { type: 'steps', steps: [
        { title: 'The Setup', text: 'You plug a window AC unit into a 50-foot orange extension cord from the hardware store.' },
        { title: 'The Voltage Theft', text: 'The thin wire in the cord has resistance. That resistance \"steals\" 10-15 Volts before the power even reaches the AC.' },
        { title: 'The Starvation', text: 'Instead of getting 120V, your AC gets 105V. It compensates by drawing 20-30% more current.' },
        { title: 'The Death Spiral', text: 'More current = more heat in the motor windings. The motor runs 20% hotter every minute of every day. It dies in 1-2 years instead of 10.' },
      ]},
      { type: 'stat', value: '-10V', label: 'Typical voltage loss through a 50ft 16AWG extension cord at 12A load', color: 'text-red-600' },

      { type: 'callout', variant: 'tip', title: 'The Free Test', text: 'Get a simple **multimeter** ($15 at any hardware store). Measure the voltage at the outlet with nothing plugged in. Then plug in your AC and measure again while it is running. If the voltage drops more than 5% (below 114V on a 120V system), you have a problem. [[/load-calc|→ Use our Load Calculator to check your circuits]]' },

      { type: 'tool-link', tool: 'Load Calculator', path: '/load-calc', description: 'Add up all your appliances on a circuit. See instantly if you are overloading and causing voltage drop.', icon: 'calculator' },
    ],
    faqs: [
      { question: "How do I check for voltage drop?", answer: "Use a multimeter. Measure voltage with nothing plugged in (should be ~120V or ~230V). Then measure WITH the heavy appliance running. If it drops more than 5%, you have undersized wiring or a loose connection." },
      { question: "Does this affect TVs and phone chargers?", answer: "Rarely. Modern electronics use Switch Mode Power Supplies (SMPS) that handle 100V-240V gracefully. Voltage drop primarily kills MOTORS — ACs, refrigerators, pumps, and washing machines." },
      { question: "Can voltage drop cause a fire?", answer: "Yes. The 'lost' voltage converts to heat along the wire and at connection points. A loose connection causing voltage drop is actively generating extreme heat and can ignite." }
    ]
  },
  {
    id: '10',
    slug: 'smart-switch-neutral-wire',
    seoTitle: "Smart Switch Wiring: Why You Need a Neutral Wire (Not Ground)",
    title: "The Neutral Crime",
    excerpt: "Smart switches are cool. But installing them without a Neutral wire is a fire hazard.",
    category: "Modern Risks",
    readTime: "4 min",
    metaDescription: "Smart switch installation dangers. Why you need a neutral wire and why using the ground wire is illegal and unsafe.",
    keywords: ["smart switch", "neutral wire", "no neutral switch", "electrical safety"],
    standards: ["NEC 404.2"],
    relatedArticles: ['grounding-myth-safety', '10-signs-electrical-problems', 'light-bulb-wattage'],
    relatedTools: [
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right smart switch for your wiring setup' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Smart switches are amazing. Walk into your house and say *\"Hey Google, turn on the lights\"* — and it just works. I am a huge fan. But I am also an electrician first, and I need to warn you about a very common, very dangerous installation mistake." },
      { type: 'paragraph', text: "See, smart switches are tiny computers. Unlike a dumb mechanical switch that just connects and disconnects a wire, a smart switch needs to be powered **24/7** — even when the light is \"off\" — to listen for your voice commands or Wi-Fi signals." },

      { type: 'heading', text: 'The Problem: Old Homes Don\'t Have Neutral' },
      { type: 'paragraph', text: "Traditional light switches have only two wires: a **Live (Hot)** coming in and a **Load** going out to the bulb. They do not have a **Neutral (Return)** wire because a mechanical switch does not need its own power source." },
      { type: 'paragraph', text: "But a smart switch needs that Neutral to complete its own tiny circuit. When DIYers open the switch box and realize there is no Neutral wire, some attempt a **deadly shortcut.**" },

      { type: 'callout', variant: 'danger', title: 'The Deadly Hack: Ground as Neutral', text: 'Some people connect the smart switch\'s Neutral wire to the Green/Yellow **Ground wire**. THIS IS ILLEGAL AND LETHAL. You are now running operating current through the safety wire — energizing the metal body of every grounded appliance in your house. Touch your fridge? You complete the circuit.' },

      { type: 'heading', text: '3 Safe Alternatives' },
      { type: 'steps', steps: [
        { title: 'Buy No-Neutral Smart Switches', text: 'Brands like Lutron Caseta and some Inovelli switches use a clever capacitor or battery to sip tiny amounts of power from the Live wire without needing a Neutral. They are specifically designed for old homes.' },
        { title: 'Have an Electrician Pull a Neutral', text: 'If you want full compatibility, a pro can fish a Neutral wire from the nearest junction box to your switch box. It is a few hours of work but solves the problem permanently.' },
        { title: 'Use Smart Bulbs Instead', text: 'Smart bulbs (like Philips Hue) already have power at the socket — they don\'t need the switch to be smart. Leave the dumb switch ON and control everything through the app. Problem solved.' },
      ]},

      { type: 'callout', variant: 'info', title: 'Future-Proofing Note', text: 'Since NEC 2011+, the code **requires** Neutral wires at switch boxes specifically for this smart-switch future. If your home was built or rewired after 2011, you should have Neutrals available.' },
    ],
    faqs: [
      { question: "How do I know if I have a Neutral wire?", answer: "Turn off the breaker, remove the switch plate. Look for a bundle of WHITE wires capped together in the back of the box. That is your Neutral bundle. If you only see black/red wires on the switch and no white bundle, you don't have Neutral." },
      { question: "Why does my smart switch flicker the LED bulb?", answer: "No-Neutral switches trickle tiny current through the bulb to stay alive. With sensitive LEDs, this can cause ghostly flickering. Install a 'Bypass Capacitor' at the light fixture to absorb that current." },
      { question: "Does code require Neutrals in switch boxes now?", answer: "Yes! Since NEC 2011, Neutral is required in all switch locations specifically for smart switches. But older homes won't have it unless rewired." }
    ]
  },
  {
    id: '11',
    slug: 'lightning-surge-protection',
    seoTitle: "Lightning Protection for Home Electronics: Surge Protectors vs Unplugging",
    title: "Storm Mode: What to Unplug",
    excerpt: "Lightning doesn't care about your surge protector strip. Here is the physics of a strike.",
    category: "Nature",
    readTime: "3 min",
    metaDescription: "How to protect electronics from lightning. Why power strips fail against direct strikes and what to unplug.",
    keywords: ["lightning protection", "surge protector", "storm safety", "unplugging devices"],
    standards: ["IEEE C62.41"],
    relatedArticles: ['lithium-battery-fire-safety', 'extension-cord-dangers'],
    relatedTools: [
      { name: 'Risk Predictor', path: '/risk-predictor', why: 'Check your home\'s surge risk level' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Here is a scenario I hear constantly: *\"I had a surge protector. Lightning hit, and my TV, gaming PC, and router all died anyway. What is the point?\"*" },
      { type: 'paragraph', text: "The point is this: **surge protectors are not lightning protectors.** They are designed for small grid spikes — like when your utility company switches a transformer. They were never built to stop the raw force of nature. Let me put the numbers in perspective." },
      { type: 'stats-row', stats: [
        { value: '1 Billion', label: 'Volts in a lightning bolt', color: 'text-yellow-500' },
        { value: '200,000', label: 'Amps (peak current)', color: 'text-orange-600' },
        { value: '50,000°F', label: 'Temperature of the channel', color: 'text-red-600' },
        { value: '2,000 J', label: 'Max absorption of a good surge strip', color: 'text-blue-600' },
      ]},

      { type: 'heading', text: 'The Air Gap Defense' },
      { type: 'paragraph', text: "A lightning bolt just traveled through **miles** of air — one of the best insulators on the planet — to reach your house. Do you really think the quarter-inch plastic gap inside your surge protector's \"Off\" switch is going to stop it?" },
      { type: 'paragraph', text: "No. It will arc across that switch like it is not even there. The **only defense** against a direct lightning strike is an air gap — physically unplugging the cord from the wall." },

      { type: 'heading', text: 'The Modem Killer Path' },
      { type: 'paragraph', text: "Here is something most people do not think about. Lightning loves copper. Your internet often comes into the house through a copper coax or phone line. Lightning rides down that line, fries your modem, then travels over the Ethernet cable and kills your PC. Even if you unplugged the power, **the data cable was still connected.**" },
      { type: 'callout', variant: 'warning', title: 'Unplug BOTH Power AND Data', text: 'During a thunderstorm, unplug three things from your PC/TV/Gaming setup: (1) the power cord, (2) the Ethernet cable, and (3) the coax cable (if applicable). All three are lightning entry points.' },

      { type: 'heading', text: 'What to Save vs What to Ignore' },
      { type: 'comparison', good: { title: 'Unplug These (Expensive/Data)', items: ['Gaming PC / Desktop Computer', 'OLED / Smart TV', 'Modem and Router', 'NAS / Network Storage', 'Audio/Video equipment'] }, bad: { title: 'These Can Handle It (Robust)', items: ['Lamps and ceiling lights', 'Toaster / Coffee maker', 'Refrigerator (has compressor protector)', 'Simple motor appliances', 'Battery-powered devices'] } },

      { type: 'callout', variant: 'tip', title: 'The Best Investment: Whole-House Surge Protector', text: 'For about $200-$300, an electrician can install a **Whole House Surge Protector** at your breaker panel. It dumps big surges to ground BEFORE they enter your home wiring. It won\'t stop a direct hit, but it handles 99% of surge events automatically.' },
    ],
    faqs: [
      { question: "What about whole-house surge protectors?", answer: "Excellent investment. Installed at the breaker panel, they dump surges to ground before entering your home wiring. They handle 99% of events. But for a direct lightning hit, nothing is guaranteed — unplugging is still the ultimate defense." },
      { question: "Is it safe to shower during a storm?", answer: "No! Metal plumbing conducts electricity. If lightning strikes near your house, it can travel up the water pipes. Wait until the storm passes." },
      { question: "My surge strip 'Protected' LED is off. Is it still working?", answer: "The strip still gives power, but the protection is DEAD. The internal MOV (Metal Oxide Varistor) sacrificed itself during a previous surge. Your devices have zero protection. Replace it immediately." }
    ]
  },
  {
    id: '12',
    slug: 'electrical-tape-danger',
    seoTitle: "Wire Nuts vs Electrical Tape: Safe Wire Splicing Methods",
    title: "The DIY Disaster: Tape vs Nuts",
    excerpt: "Electrical tape is for marking wires, not for joining them forever.",
    category: "DIY",
    readTime: "3 min",
    metaDescription: "Why electrical tape is unsafe for wire joints. Use wire nuts or Wago connectors instead to prevent fires.",
    keywords: ["electrical tape", "wire nuts", "wago connectors", "wire splicing"],
    standards: ["UL 486C"],
    relatedArticles: ['outlet-fire-physics', '10-signs-electrical-problems'],
    relatedTools: [
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right connectors and wire nuts' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "I call this the \"Tape and Pray\" method. You twist two wires together, wrap them in black electrical tape, shove them into the wall, and hope for the best. I have pulled hundreds of these out of walls during renovations. **They are ticking time bombs.**" },

      { type: 'heading', text: 'Why Tape Fails (Every Time)' },
      { type: 'steps', steps: [
        { title: 'The Glue Dies', text: 'Electrical tape adhesive dries out in about 2 years. Heat accelerates this. The tape slowly unravels inside your wall, exposing bare copper.' },
        { title: 'The Vibration', text: 'AC current makes wires vibrate 50 or 60 times per second (depending on your country). Without a mechanical lock, the twisted wires gradually loosen from this constant micro-shaking.' },
        { title: 'The Oxidation', text: 'Air gets into the loose joint. Copper oxidizes. Resistance increases. Heat increases. The cycle you know by now begins.' },
      ]},

      { type: 'heading', text: 'The Right Way: Mechanical Connectors' },
      { type: 'comparison', bad: { title: 'Tape & Pray (Dangerous)', items: ['Glue fails in 2 years', 'No mechanical grip on the wire', 'Wires loosen from vibration', 'Cannot be inspected once sealed', 'Violates electrical code'] }, good: { title: 'Wire Nuts / Wago (Safe)', items: ['Metal spring bites into copper permanently', 'Mechanical lock — physically cannot loosen', 'Rated for the full lifespan of the wire', 'Wago\'s clear shell allows visual inspection', 'Code-compliant and UL Listed'] } },

      { type: 'callout', variant: 'tip', title: 'What Tape IS Good For', text: 'Electrical tape is made for **marking** — wrapping it around a white wire to indicate it is being used as a hot (black) wire for a switch leg. It is a label, not a structural joint. Never use it as the primary connection method.' },

      { type: 'tool-link', tool: 'Hardware Guide', path: '/hardware', description: 'Find wire nuts, Wago connectors, and junction boxes — with specs for every wire gauge.', icon: 'settings' },
    ],
    faqs: [
      { question: "Can I use tape if I solder the wires first?", answer: "Soldering is great for electronics but bad for house wiring. Solder is brittle — if the wire bends, the joint cracks. It also makes the wire stiff and hard to fold into boxes. Use mechanical connectors instead." },
      { question: "Are Wago connectors safe?", answer: "Yes — genuine Wagos are UL Listed and rated for more current than the wire itself. The clear shell lets you visually confirm the connection. They are the gold standard." },
      { question: "How do I fix a cut extension cord?", answer: "Don't tape it. Cut at the damage point, install a new male plug on one end and a female socket on the other. You now have two shorter, safe cords." }
    ]
  },
  {
    id: '13',
    slug: 'circuit-breaker-tripping',
    seoTitle: "Circuit Breaker Tripping? Why Upgrading the Breaker is Dangerous",
    title: "Breaker Psychology",
    excerpt: "A tripping breaker is annoying. But it's saving your life. Don't punish it.",
    category: "Basics",
    readTime: "3 min",
    metaDescription: "Why circuit breakers trip. The dangers of upgrading a breaker without upgrading the wire.",
    keywords: ["breaker tripping", "overloaded circuit", "replace circuit breaker", "electrical safety"],
    standards: ["UL 489"],
    relatedArticles: ['10-signs-electrical-problems', 'extension-cord-dangers', 'appliance-voltage-drop'],
    relatedTools: [
      { name: 'Load Calculator', path: '/load-calc', why: 'Check if your circuit is overloaded' },
      { name: 'Risk Predictor', path: '/risk-predictor', why: 'Diagnose why your breaker keeps tripping' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "I need to say something that might feel backwards: **a tripping breaker is not a problem. It is the solution.**" },
      { type: 'paragraph', text: "Every time that breaker clicks off, it is absorbing a bullet for you. It is saying: *\"The wire behind this wall is getting dangerously hot. I am cutting the power before your house catches fire.\"*" },
      { type: 'paragraph', text: "So naturally, what do most people do? They punish the hero." },

      { type: 'heading', text: 'The \"Bigger Breaker\" Trap' },
      { type: 'paragraph', text: "This is one of the most common and most dangerous mistakes in home electrical work. And it seems so logical on the surface." },
      { type: 'steps', steps: [
        { title: 'The Annoyance', text: 'You plug in a space heater. *Click.* The 15A breaker trips. Again.' },
        { title: 'The \"Logic\"', text: 'You think: \"This breaker is too weak. I will swap it for a 20 Amp breaker.\"' },
        { title: 'The Disaster', text: 'Now 19 Amps can flow through wire rated for only 15 Amps. The breaker is happy. The wire is **melting inside your wall**, and nobody knows.' },
      ]},
      { type: 'math', formula: '15A breaker → 14 AWG wire (rated 15A max)', label: 'The Breaker-Wire Marriage', description: 'Breakers are matched to WIRE THICKNESS, not your lifestyle. A 15A breaker protects 14-gauge wire. A 20A breaker protects 12-gauge wire. Mismatch = fire.' },

      { type: 'callout', variant: 'danger', title: 'Never Upsize a Breaker Without Upsizing the Wire', text: 'If you put a 20A breaker on 14-gauge wire, you are telling the safety system that the wire can handle more than it physically can. The wire will overheat and melt its insulation. The breaker will NOT trip because it thinks everything is fine. This is how walls catch fire.' },

      { type: 'heading', text: 'What to Do Instead' },
      { type: 'comparison', bad: { title: 'Wrong Response', items: ['Replace breaker with higher amperage', 'Tape breaker in ON position', 'Reset and ignore repeatedly'] }, good: { title: 'Right Response', items: ['Unplug devices on that circuit one by one — find the culprit', 'Move heavy loads to different circuits', 'If trips with nothing plugged in — call an electrician (possible short)', 'Add a new dedicated circuit for heavy appliances'] } },

      { type: 'tool-link', tool: 'Load Calculator', path: '/load-calc', description: 'Add up all devices on a circuit to see exactly how many amps you are drawing — is it over the limit?', icon: 'calculator' },
    ],
    faqs: [
      { question: "How do I know if the breaker itself is bad?", answer: "If the breaker trips instantly with NOTHING plugged in, it may be worn out or you have a short circuit. If it trips after 10 minutes of use, it is doing its job — the circuit is overloaded." },
      { question: "What is an AFCI breaker?", answer: "Standard breakers detect overloads (too much power). AFCI breakers detect sparking (arcing). They are mandatory in bedrooms and can detect a loose wire sparking behind the wall before it starts a fire." },
      { question: "Can I replace a breaker myself?", answer: "Legally allowed in many places, but dangerous. The bus bar inside the panel is ALWAYS LIVE even with the main breaker off in some panels. Strongly recommend hiring a professional." }
    ]
  },
  {
    id: '14',
    slug: 'rodents-chewing-wires',
    seoTitle: "Rodent Damage to Wiring: Signs of Rats Chewing Wires in Attic",
    title: "The Rodent War",
    excerpt: "Why rats love electricity. It's not about the taste.",
    category: "Nature",
    readTime: "4 min",
    metaDescription: "Why rats chew electrical wires. Signs of rodent damage and how to prevent electrical fires caused by pests.",
    keywords: ["rats chewing wires", "rodent damage", "electrical fire pests", "attic wiring"],
    standards: [],
    relatedArticles: ['old-wiring-dangers', '10-signs-electrical-problems', 'circuit-breaker-tripping'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check for rodent-related electrical risks' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Fun fact that is not fun at all: A rat's front teeth grow about **5 inches per year**. If they do not constantly grind them down, the teeth literally grow into their skull. So they chew. On everything. Non-stop." },
      { type: 'paragraph', text: "And guess what has the perfect texture for tooth-filing? Your electrical wiring. Firm enough to provide resistance, soft enough to bite through. For a rat, your Romex cable is basically a chew toy." },

      { type: 'heading', text: 'The Fire Mechanism' },
      { type: 'steps', steps: [
        { title: 'The Move-In', text: 'Rodents enter through gaps as small as a dime. They set up nests in attics, crawlspaces, and wall cavities — surrounded by dry wood, insulation, and nesting material.' },
        { title: 'The Chewing', text: 'They strip the plastic insulation, exposing bare copper. They do this in hidden areas you will never see without opening a wall.' },
        { title: 'The Bridge', text: 'Eventually, a deep enough bite bridges the Hot and Neutral wires. This creates a massive short-circuit arc flash — at 3,000°F.' },
        { title: 'The Ignition', text: 'That arc ignites the dry nesting material the rodent brought with it. Fire starts inside the wall, burning for hours before you see smoke.' },
      ]},

      { type: 'heading', text: 'How to Know You Have a Problem' },
      { type: 'stats-row', stats: [
        { value: '🐀', label: 'Scratching / scampering at night', color: 'text-amber-600' },
        { value: '💡', label: 'Lights flicker when you walk nearby', color: 'text-yellow-600' },
        { value: '👃', label: 'Distinct urine smell in attic', color: 'text-orange-600' },
        { value: '⚡', label: 'Breakers trip for no reason', color: 'text-red-600' },
      ]},
      { type: 'paragraph', text: "If you notice any combination of these signs, especially the flickering-when-walking (your footsteps vibrate the compromised wire), get an electrician and a pest control professional simultaneously." },

      { type: 'callout', variant: 'tip', title: 'The Steel Wool + Conduit Defense', text: 'Seal every opening larger than a dime with **steel wool** stuffed into expanding foam — rats cannot chew through steel. For exposed wires in attics, ask an electrician to install **steel conduit** (metal pipes) to armor the cables against teeth.' },
    ],
    faqs: [
      { question: "Does wire taste good to rats?", answer: "Some older wires (pre-2000s) used plant-based plastics that actually smelled like food! Modern wire is synthetic, but rats chew it for the texture, not the taste." },
      { question: "How do I stop them?", answer: "Seal every hole larger than a dime with steel wool and expanding foam. Trim trees away from the roof. If wires are exposed in attics, install steel conduit armor." },
      { question: "Found a chewed wire — can I tape it?", answer: "No. Exposed or nicked copper changes the wire's resistance. Cut the wire and rejoin it properly inside an accessible junction box with wire nuts or Wago connectors." }
    ]
  },
  {
    id: '15',
    slug: 'light-bulb-wattage',
    seoTitle: "Light Fixture Wattage Limit: Dangers of Overlamping & Fire Risk",
    title: "Wattage Wars: Lamps",
    excerpt: "Putting a 100W bulb in a 60W fixture is the most common fire starter in bedrooms.",
    category: "Habits",
    readTime: "3 min",
    metaDescription: "Danger of exceeding lamp wattage rating. Overlamping risks and how to check fixture limits.",
    keywords: ["light bulb wattage", "overlamping", "fixture rating", "fire hazard"],
    standards: ["UL 1598"],
    relatedArticles: ['10-signs-electrical-problems', 'smart-switch-neutral-wire', 'extension-cord-dangers'],
    relatedTools: [
      { name: 'Hardware Guide', path: '/hardware', why: 'Find the right LED bulb for your fixture' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Almost every light fixture in your home has a tiny sticker hidden somewhere inside it. It says something like **\"Maximum 60 Watts.\"** Most people either never see it or completely ignore it." },
      { type: 'paragraph', text: "And then they screw in a 100-Watt incandescent bulb because they want more light. It works. The room is brighter. And slowly, invisibly, the fixture starts cooking itself from the inside." },

      { type: 'heading', text: 'The Overlamping Chain Reaction' },
      { type: 'steps', steps: [
        { title: 'Extra Heat', text: 'A 100W bulb generates almost **double** the heat of a 60W bulb. The fixture was designed to dissipate 60W safely — not 100W. It becomes a tiny oven.' },
        { title: 'Baking the Socket', text: 'The excess heat slowly cooks the socket and the wire insulation inside the fixture. Over weeks, the plastic becomes brown, then brittle.' },
        { title: 'Insulation Failure', text: 'The cracked insulation exposes bare wires. They touch the metal fixture body. Now the entire lamp is energized.' },
        { title: 'Shock or Fire', text: 'The next person who touches the lamp switch gets a shock. Or the overheated socket melts completely and ignites.' },
      ]},

      { type: 'heading', text: 'The LED Miracle' },
      { type: 'paragraph', text: "Here is the beautiful thing — LEDs have basically eliminated this problem forever." },
      { type: 'comparison', bad: { title: 'Old Incandescent 100W Bulb', items: ['Uses 100 Watts (all heat + light)', '**90% becomes heat**, only 10% light', 'Exceeds 60W fixture limit → fire risk', 'Lasts ~1,000 hours', 'Burns your fingers if you touch it'] }, good: { title: 'Modern LED \"100W Equivalent\"', items: ['Uses only **14 Watts** of actual power', 'Very little heat generated', 'Safe in ANY fixture (well under any limit)', 'Lasts **25,000+ hours**', 'Cool to the touch even after hours of use'] } },
      { type: 'stat', value: '14W', label: 'Actual power used by a \"100W equivalent\" LED', color: 'text-green-600' },
      { type: 'paragraph', text: "So you can put a super-bright LED in your grandma's antique 60W lamp and get more light than ever before, with zero fire risk. The future is now." },

      { type: 'callout', variant: 'warning', title: 'One LED Exception: Enclosed Fixtures', text: 'If your fixture has a closed glass globe (no ventilation), LEDs can still overheat. The electronics in the LED base cook themselves. Look for LEDs rated for **\"Enclosed Fixtures\"** — they are designed to handle the trapped heat.' },
    ],
    faqs: [
      { question: "Can I put a higher wattage LED in an old fixture?", answer: "Yes! The '60W Max' label refers to heat, not brightness. A 100W-equivalent LED only uses 14W of actual power, generating minimal heat. Perfectly safe." },
      { question: "Why do my LED bulbs die so fast?", answer: "Probably heat. LEDs in enclosed fixtures (glass globes) get cooked. Look for LEDs rated for 'Enclosed Fixtures' or switch to open fixtures with ventilation." },
      { question: "What is CCT (Color Temperature)?", answer: "It is the 'color' of light. 2700K = Warm White (yellow, cozy). 5000K+ = Daylight (blue, alert). For living rooms use 2700-3000K. For garages and workshops use 5000K." }
    ]
  },
  {
    id: '16',
    slug: 'inverter-battery-gas',
    seoTitle: "Lead Acid Battery Safety: Hydrogen Gas Ventilation for Inverters",
    title: "Inverter Ignorance",
    excerpt: "Lead-acid batteries emit explosive gas. Is your backup system ventilated?",
    category: "Safety Systems",
    readTime: "4 min",
    metaDescription: "Dangers of lead-acid batteries indoors. Hydrogen gas explosion risk and ventilation requirements.",
    keywords: ["lead acid battery", "hydrogen gas", "inverter safety", "battery ventilation"],
    standards: ["IEEE 484"],
    relatedArticles: ['lithium-battery-fire-safety', 'lightning-surge-protection'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check if your inverter setup is safe' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "If you live in a region with frequent power cuts — India, South Africa, Nigeria, parts of Southeast Asia — you probably have a big inverter with one or two lead-acid batteries sitting in a corner of your house. Maybe in a closet. Maybe under the staircase." },
      { type: 'paragraph', text: "I need you to understand something about those batteries. **They are producing explosive gas right now.**" },

      { type: 'heading', text: 'The Chemistry You Need to Know' },
      { type: 'paragraph', text: "When lead-acid batteries charge, the liquid sulfuric acid inside boils gently. This process releases **Hydrogen gas** — the same gas that caused the Hindenburg disaster. Hydrogen is colorless, odorless, lighter than air, and incredibly explosive." },
      { type: 'stats-row', stats: [
        { value: 'H₂', label: 'Hydrogen gas — invisible, odorless', color: 'text-blue-600' },
        { value: '4%', label: 'Concentration needed for explosion', color: 'text-red-600' },
        { value: '1 spark', label: 'All it takes to ignite', color: 'text-orange-600' },
        { value: '💥', label: 'Explodes, spraying sulfuric acid', color: 'text-red-500' },
      ]},

      { type: 'heading', text: 'The Closet Trap' },
      { type: 'paragraph', text: "People hide those ugly batteries in closets, under wooden staircases, or in small unventilated rooms. Here is what happens:" },
      { type: 'steps', steps: [
        { title: 'Hydrogen Accumulates', text: 'The gas has nowhere to go in an enclosed space. It collects near the ceiling (lighter than air).' },
        { title: 'The Spark', text: 'When the inverter switches between mains and battery mode, internal relays click. Each click is a tiny spark.' },
        { title: 'The Explosion', text: 'If hydrogen concentration exceeds 4%, that spark ignites it. The battery case shatters, spraying sulfuric acid across the room.' },
      ]},

      { type: 'callout', variant: 'danger', title: 'The Rotten Egg Smell', text: 'If you smell rotten eggs near your battery, that is **Hydrogen Sulfide** — it means the battery is being overcharged and boiling dry. This gas is toxic AND flammable. Turn off the charger immediately and ventilate the room. Do not flip any switches (sparks).' },

      { type: 'heading', text: 'The Safe Setup' },
      { type: 'comparison', bad: { title: 'Dangerous Setup', items: ['Battery in a sealed closet', 'No ventilation (window or fan)', 'Wooden shelf under the battery', 'Never checking water levels', 'Old, swollen batteries still in service'] }, good: { title: 'Safe Setup', items: ['Battery in a ventilated room or near a window', 'Small exhaust fan running during charging', 'Battery on a plastic or metal acid-proof tray', 'Monthly water level checks with distilled water', 'Upgrade to Sealed (AGM/Gel) or LiFePO4 batteries'] } },

      { type: 'callout', variant: 'tip', title: 'The Modern Upgrade', text: 'If you can afford it, switch to **Lithium Iron Phosphate (LiFePO4)** batteries. They produce zero gas, require zero maintenance, last 5x longer, and are completely safe for indoor use. The upfront cost is higher, but the lifetime cost is actually lower.' },
    ],
    faqs: [
      { question: "How do I check my batteries?", answer: "Check water level monthly — if the plates are exposed, add distilled water (never tap water). Check terminals for white powder (corrosion) — clean with hot water and apply petroleum jelly." },
      { question: "Are AGM/Gel batteries safer?", answer: "Yes — they are sealed and recombine gases internally. Much safer for indoor use than 'flooded' (wet) batteries. No water maintenance needed." },
      { question: "Why does my battery smell like rotten eggs?", answer: "That is Hydrogen Sulfide — the battery is overcharging and boiling dry. This gas is toxic and flammable. Turn off the charger immediately and ventilate." }
    ]
  },
  {
    id: '17',
    slug: 'solar-dc-arc-fault',
    seoTitle: "Solar Panel Fire Safety: DC Arc Faults & Firefighting Risks",
    title: "Solar Safety: The DC Arc",
    excerpt: "Solar panels create DC electricity. It behaves very differently from wall power.",
    category: "Modern Risks",
    readTime: "4 min",
    metaDescription: "Solar panel safety risks. Understanding DC arc faults and why solar firefighting is different.",
    keywords: ["solar panel fire", "DC arc", "photovoltaic safety", "solar isolation"],
    standards: ["UL 1699B", "IEC 60364-7-712"],
    relatedArticles: ['lightning-surge-protection', 'grounding-myth-safety'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check your solar installation safety' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Solar panels are wonderful. I am genuinely excited about them as an energy source. But in my professional life, I have seen something concerning: people install solar systems without understanding that they have just introduced a fundamentally different — and in some ways more dangerous — type of electricity to their roof." },
      { type: 'paragraph', text: "Your wall outlets deliver **AC** (Alternating Current). Solar panels generate **DC** (Direct Current). And DC does not play by the same rules." },

      { type: 'heading', text: 'AC vs DC: Why It Matters' },
      { type: 'comparison', good: { title: 'AC (Wall Power) — Self-Correcting', items: ['Current reverses direction 50-60 times/second', 'Crosses through zero volts constantly', 'If a spark forms, it naturally extinguishes at zero crossing', 'Circuit breakers can easily interrupt it', 'Relatively predictable and \"forgiving\"'] }, bad: { title: 'DC (Solar Power) — Relentless', items: ['Current pushes in ONE direction, continuously', 'Never crosses zero — never stops pushing', 'If a spark forms, it becomes a **sustained plasma arc**', 'Much harder for breakers to interrupt', 'Acts like a welding torch at failure points'] } },

      { type: 'heading', text: 'The DC Arc — A Welding Torch on Your Roof' },
      { type: 'paragraph', text: "If a DC connector on your roof comes loose, or a wire gets cut by a branch, the electricity jumps across the gap. Because DC never stops pushing, that spark does not go out. It turns into a sustained **plasma arc** — a 3,000°C fire that can burn through metal." },
      { type: 'stat', value: '3,000°C', label: 'Temperature of a sustained DC arc fault', color: 'text-red-600' },

      { type: 'heading', text: 'Why Firefighters Fear Solar Roofs' },
      { type: 'paragraph', text: "Here is the part most homeowners do not think about. Your solar panels generate lethal voltage **as long as the sun is shining.** There is no switch to turn off the sun. Even if the main breaker is off, even if the inverter is disconnected — the rooftop wiring is LIVE." },
      { type: 'callout', variant: 'danger', title: 'Firefighter Safety', text: 'Firefighters cannot safely spray water on a live solar installation. Water conducts DC perfectly. Any cut DC wire on a roof during a fire is a lethal hazard for emergency responders.' },

      { type: 'heading', text: 'The Fix: Rapid Shutdown' },
      { type: 'paragraph', text: "Modern electrical codes require a feature called **Rapid Shutdown** (NEC 690.12). When the system detects a problem (or you flip a switch), special electronics at each panel reduce the voltage on the roof to below 80 Volts within 30 seconds — making it safe for firefighters." },
      { type: 'callout', variant: 'tip', title: 'Ask Your Installer', text: 'If your solar system was installed before 2017, it may not have Rapid Shutdown. Ask your installer to verify. It is a critical safety feature that can be retrofitted with Module Level Power Electronics (MLPEs) like microinverters or DC optimizers.' },
    ],
    faqs: [
      { question: "Can I hose down my solar panels to clean them?", answer: "Only if you are sure there are no cracked panels or exposed wires. Professional cleaners use de-ionized water and specialized tools to avoid creating a conductive path." },
      { question: "What is Rapid Shutdown?", answer: "Required by NEC 690.12 — when triggered, voltage on the roof drops below 80V within 30 seconds. Protects firefighters and maintenance workers." },
      { question: "Do solar panels cause roof leaks?", answer: "They shouldn't, but each mount requires drilling into the roof. If the installer didn't use proper flashing and sealant, those holes can leak years later. Get installations inspected." }
    ]
  },
  {
    id: '18',
    slug: 'electric-blanket-burns',
    seoTitle: "Electric Blanket Safety: Fire Risks from Folding & Overheating",
    title: "Electric Blanket Burns",
    excerpt: "They feel cozy, but they are grids of heating wire. Don't fold them.",
    category: "Habits",
    readTime: "3 min",
    metaDescription: "Safety tips for electric blankets. Why folding causes fires and when to replace them.",
    keywords: ["electric blanket fire", "heating pad safety", "folded blanket risk"],
    standards: ["UL 964"],
    relatedArticles: ['extension-cord-dangers', '10-signs-electrical-problems'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check your bedroom safety habits' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "An electric blanket feels like a warm hug. But inside that soft fabric is a grid of fragile heating wires — wires that you are sleeping on top of for 8 hours straight. And the way most people use them is honestly terrifying to me." },

      { type: 'heading', text: 'The Folding Problem (Thermal Stacking)' },
      { type: 'paragraph', text: "Here is the one rule that matters more than anything else: **never fold an electric blanket while it is on.** Here is why." },
      { type: 'steps', steps: [
        { title: 'The Double-Up', text: 'When you fold the blanket, you bring two heating wires directly on top of each other.' },
        { title: 'Thermal Stacking', text: 'Each wire is generating heat. But now they share their heat with each other. The temperature at the fold point doubles.' },
        { title: 'No Escape', text: 'The fabric and blanket layers trap the heat. There is no airflow to dissipate it. Temperature spirals upward.' },
        { title: 'Ignition', text: 'The fabric chars, then smokes, then ignites. This often happens slowly while you are asleep.' },
      ]},
      { type: 'callout', variant: 'danger', title: 'Brown Spots = Near-Ignition', text: 'If you ever see brown or scorched spots on your electric blanket, throw it away immediately. Those are evidence that the fabric reached near-ignition temperatures. The internal wire at that point is probably damaged and will fail again.' },

      { type: 'heading', text: 'The Cord Trap' },
      { type: 'paragraph', text: "Never run the power cord between the mattress and the box spring. Every time you sit on the bed or roll over, you are putting your body weight on a live power cord. Over weeks, this crushes and strips the internal insulation, creating a short circuit literally underneath your sleeping body." },

      { type: 'heading', text: 'The Golden Rules' },
      { type: 'comparison', bad: { title: 'Dangerous Habits', items: ['Fold or bunch up the blanket while on', 'Fall asleep with it still heating', 'Run the cord under the mattress', 'Use a blanket that is 10+ years old', 'Let pets sleep on it (chewing, clawing)'] }, good: { title: 'Safe Habits', items: ['Lay flat — never fold, bunch, or crumple', 'Use a sleep timer — preheat the bed, then turn off', 'Power cord hangs free off the side of the bed', 'Replace every 10 years (heating wire becomes brittle)', 'Keep pets off heated blankets (they can overheat)'] } },
    ],
    faqs: [
      { question: "Can I wash my electric blanket?", answer: "Some modern ones allow it, but proceed with caution. Machine washing can damage internal wires. I recommend spot cleaning or gentle hand washing. Never dry clean (chemicals damage wire insulation)." },
      { question: "How long do they last?", answer: "Replace every 10 years. The internal heating element becomes brittle with age and creates hot spots." },
      { question: "Is it safe for pets?", answer: "Not ideal. Pets can chew cords or claw through fabric to the live wire. They also can't regulate temperature like humans — they can't sweat. Use pet-specific heated pads instead." }
    ]
  },
  {
    id: '19',
    slug: 'cheap-charger-damage',
    seoTitle: "Are Cheap Phone Chargers Safe? Electrocution Risk & Device Damage",
    title: "The Cheap Charger",
    excerpt: "Why a $2 gas station charger can destroy your $1000 iPhone.",
    category: "Modern Risks",
    readTime: "4 min",
    metaDescription: "Why cheap chargers damage phones. Voltage ripple, lack of isolation, and electric shock risk.",
    keywords: ["fake charger", "iphone damage", "voltage ripple", "cheap usb charger"],
    standards: ["IEC 62368-1"],
    relatedArticles: ['lithium-battery-fire-safety', 'extension-cord-dangers'],
    relatedTools: [
      { name: 'Hardware Guide', path: '/hardware', why: 'Find certified, safe chargers and cables' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "A charger looks simple. It is a small white box. How different can they really be? A $2 one from the gas station looks almost identical to the $20 one from Apple. Same USB port. Same shape." },
      { type: 'paragraph', text: "But inside, they are **completely different machines.** One has a precision isolation transformer, safety capacitors, and feedback circuits. The other has... not much. And that difference can kill your phone — or worse, hurt you." },

      { type: 'heading', text: 'What a Charger Actually Does' },
      { type: 'paragraph', text: "A charger converts **120V/230V AC** (the lethal voltage from your wall) down to **5V DC** (the safe voltage for your phone). That means there must be an absolute **barrier** between those two worlds inside the charger. In engineering, we call it **Galvanic Isolation.**" },
      { type: 'comparison', good: { title: 'Quality Charger ($20+)', items: ['Thick isolation transformer with proper clearance', 'Opto-isolator feedback (light-based communication)', 'Smooth, clean 5V output (low ripple)', 'Certified: UL, CE, MFi markings', 'Communication chip \"talks\" to your phone 100x/sec'] }, bad: { title: 'Gas Station Charger ($2)', items: ['Tiny transformer with minimal insulation', 'No optical isolation — direct feedback', 'Dirty \"ripple\" output (voltage wobbles)', 'No certifications or fake markings', 'Dumb power hose — pushes power blindly'] } },

      { type: 'heading', text: 'The Two Dangers' },
      { type: 'steps', steps: [
        { title: 'Ghost Touch (The Annoying One)', text: 'Cheap chargers output \"dirty\" power — the voltage wobbles up and down (called Ripple). This electrical noise confuses your phone\'s touch screen, making it tap things you did not touch. If your screen goes crazy while charging, the charger is the problem.' },
        { title: 'The Killer Leak (The Scary One)', text: 'If the cheap transformer\'s thin insulation melts (which happens with heat and age), **full 120V/230V wall power shoots up the USB cable** into your phone\'s metal frame and into your ear while you are on a call. There are documented deaths from this.' },
      ]},

      { type: 'callout', variant: 'warning', title: 'The Weight Test', text: 'Here is a quick and dirty test: **weigh the charger**. A good charger has a heavy transformer inside. If it weighs less than a coin, it probably skipped the transformer entirely. Avoid it.' },

      { type: 'stat', value: '$2 → $1,000', label: 'A $2 charger can brick a $1,000 phone (or worse)', color: 'text-red-600' },
    ],
    faqs: [
      { question: "My phone gets hot when charging. Is that bad?", answer: "Warm is normal. Hot to the touch is NOT. Unplug immediately. Usually means the charger is struggling to deliver power efficiently." },
      { question: "Does fast charging damage the battery?", answer: "Slightly — fast charging generates more heat, which ages the battery marginally faster. For longevity, slow charge overnight. But for most people, the convenience is worth the trade-off." },
      { question: "Why does the cable matter?", answer: "Cheap cables have thin copper strands = high resistance = voltage drop = slow charging and heat. Use thick, certified cables (MFi for Apple, USB-IF certified for others)." }
    ]
  },
  {
    id: '20',
    slug: 'holiday-lights-hazard',
    seoTitle: "Christmas Light Safety: Preventing Dry Tree Fires & Overloads",
    title: "Holiday Hazards",
    excerpt: "Christmas lights and Diwali lamps are seasonal fire starters.",
    category: "Habits",
    readTime: "3 min",
    metaDescription: "Holiday decoration safety. Christmas lights, Diwali lamps, and extension cord overload risks.",
    keywords: ["christmas light fire", "holiday safety", "dry christmas tree", "decoration overload"],
    standards: [],
    relatedArticles: ['extension-cord-dangers', 'light-bulb-wattage'],
    relatedTools: [
      { name: 'Load Calculator', path: '/load-calc', why: 'Check if your holiday lights are overloading the circuit' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "Every December, we do something kind of insane if you think about it. We bring a dead tree into the living room, wrap it in electrical wires, and leave it plugged in while we sleep. And then we act surprised when it catches fire." },
      { type: 'paragraph', text: "I know that sounds harsh. I love holiday decorations too. But the numbers speak for themselves." },

      { type: 'heading', text: 'The Trinity of Terror' },
      { type: 'stats-row', stats: [
        { value: '< 30 sec', label: 'Time for a dry tree to engulf a room', color: 'text-red-600' },
        { value: '800+', label: 'Home fires from holiday decorations/year', color: 'text-orange-600' },
        { value: '90%', label: 'Energy savings from LED vs incandescent lights', color: 'text-green-600' },
      ]},
      { type: 'steps', steps: [
        { title: 'The Dry Tree (Napalm in a Pot)', text: 'A fresh pine tree is about 50% water. After 2 weeks without watering, it is basically solidified gasoline. A single spark from a faulty bulb or frayed wire will engulf the entire tree — and the room — in **under 30 seconds**. Water your tree daily!' },
        { title: 'Daisy Chaining Lights', text: 'People plug 10 strands end-to-end. The tiny fuse in the first plug was designed for 3 strands max. The thin wire overheats and melts. Use our [[/load-calc|Load Calculator]] to check.' },
        { title: 'Indoor Lights Outside', text: 'Using indoor-rated lights in the rain is a short circuit waiting to happen. Water gets into the sockets and creates a conductive bridge. Look for the **UL Red Label** (outdoor-rated) vs Green Label (indoor only).' },
      ]},

      { type: 'heading', text: 'The LED Fix' },
      { type: 'paragraph', text: "Switching from old incandescent mini-lights to LEDs is the single best safety upgrade for holiday lighting. LEDs run **cool to the touch** and use 90% less power. You can connect 20-40 strands of LEDs into one outlet safely, compared to 3 strands of incandescent." },
      { type: 'callout', variant: 'tip', title: 'The Fuse Check', text: 'Look at the male plug of your light strand. See that tiny sliding door? Inside are two glass fuses. If your lights went out, the fuse probably blew. Replace with the spares included in the box. **Never wrap a blown fuse in aluminum foil** — that bypasses the safety completely.' },
    ],
    faqs: [
      { question: "How many strands can I connect together?", answer: "Incandescent mini-lights: max 3 strands. Modern LEDs: often 20-40 strands. Check the box for the specific number." },
      { question: "My lights went out. Is it a fuse?", answer: "Probably. Check the male plug for a tiny sliding door with glass fuses inside. If the wire inside the glass is broken, replace it with the spares provided." },
      { question: "Can I run a cord through a window?", answer: "Only temporarily. Don't slam the window on the cord — the metal frame can cut through insulation and electrify the entire window." }
    ]
  },
  {
    id: '21',
    slug: '110v-vs-230v-danger',
    seoTitle: "Is 110V Lethal? 110V vs 220V Shock Danger Explained",
    title: "The 'Safe' Voltage Myth",
    excerpt: "I'm in the USA, it's only 110V. It can't kill me, right? Wrong.",
    category: "Basics",
    readTime: "4 min",
    metaDescription: "Is 110V safe? The difference between 110V and 230V shock risks. Why current (Amps) kills, not just voltage.",
    keywords: ["110V vs 220V", "electric shock limit", "is 110V lethal", "amperage kills"],
    standards: ["IEC 60479"],
    relatedArticles: ['bathroom-shock-myth', 'grounding-myth-safety'],
    relatedTools: [
      { name: 'Safety Assessment', path: '/assessment', why: 'Check your home\'s shock protection' },
    ],
    content: [],
    richContent: [
      { type: 'paragraph', text: "I hear this all the time in the US: *\"Relax, it's only 110 Volts. It can't kill you. That's why we chose 110V instead of Europe's 230V — it's safer.\"*" },
      { type: 'paragraph', text: "Let me be very clear about this: **110 Volts absolutely can kill you.** And the idea that it is \"safe\" has led to more people taking dangerous risks with electricity than I can count." },

      { type: 'heading', text: 'The Math That Kills' },
      { type: 'paragraph', text: "The human heart can be thrown into fatal fibrillation by as little as **30 milliamps** (0.03 Amps) of current flowing across the chest. That is thirty thousandths of an Amp. A barely measurable trickle." },
      { type: 'math', formula: 'I = V / R → 110V / 1000Ω = 110mA', label: 'Ohm\'s Law Applied to Your Body', description: 'With wet skin (1,000 Ohms), 110V can push 110 milliamps through your body. That is nearly 4x the lethal dose. 230V pushes 230mA — 8x lethal. Both kill.' },
      { type: 'stat', value: '30 mA', label: 'Current needed to stop a human heart', color: 'text-red-600' },

      { type: 'heading', text: 'The (Small) Difference' },
      { type: 'comparison', good: { title: '110V (Slightly Less Dangerous)', items: ['Lower initial \"punch\"', 'Your muscles MAY be able to let go', 'Slightly more survivable for dry skin', 'Still pushes **3-4x lethal current** through wet body'] }, bad: { title: '230V (More Aggressive)', items: ['Hits harder and faster', 'Causes violent muscle contraction — \"The Grip\"', 'You literally cannot let go of the wire', 'Pushes **8x lethal current** through wet body'] } },
      { type: 'paragraph', text: "So yes, 110V gives you *slightly* better odds of survival compared to 230V. But \"slightly better odds of survival\" is not the same as \"safe.\" Dead is dead. The only truly safe voltage is zero." },

      { type: 'heading', text: 'What to Do if Someone Is Being Shocked' },
      { type: 'callout', variant: 'danger', title: 'DO NOT TOUCH THEM', text: 'If you touch someone who is being electrocuted, the current flows through them into YOU. Instead: (1) Kick the plug out of the wall, or (2) use a wooden broom handle or chair to shove them away from the source. Then call emergency services immediately and begin CPR if they are unresponsive.' },

      { type: 'callout', variant: 'tip', title: 'The Real Safety Lesson', text: 'Voltage is what pushes current through your body. Current is what damages your heart. You need enough voltage to overcome your skin\'s resistance. A 12V car battery has massive amperage but cannot push through dry skin, so it is safe to touch. 110V and 230V both have enough voltage to push lethal current. Respect them equally.' },
    ],
    faqs: [
      { question: "Why is the US 110V and Europe 230V?", answer: "Historical reasons. Edison chose 110V for his early bulbs, thinking it was safer. Europe chose 220V because it transmits power more efficiently over longer distances with less copper. Both are now standard." },
      { question: "What does 'Amps kill, not Volts' mean?", answer: "It's a half-truth. Current does the damage, but voltage is the pressure that pushes current through your skin. A 12V car battery has huge amps but can't push through skin. 110V+ has enough pressure to push lethal current through you." },
      { question: "What should I do if someone is being shocked?", answer: "DO NOT touch them! Kick the plug out or shove them away with a wooden object (broom, chair). Call emergency services. Begin CPR if unresponsive. Every second counts." }
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
