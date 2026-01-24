
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
    metaDescription: "Learn the 10 critical signs of electrical failure in your home. From fishy smells to buzzing switches, identify the red flags before a fire starts.",
    keywords: ["electrical fire signs", "buzzing switch", "burning smell outlet", "flickering lights", "home electrical safety"],
    standards: ["NFPA 73", "IEC 60364-6"],
    content: [
      "Your electrical system is silent, invisible, and odorless—until it fails. When it starts making noise or smells, it is not a warning; **it is a scream for help.**",
      "Most electrical fires do not occur suddenly. They happen after months or years of your home trying to tell you something is wrong. Listening to these signs can save your life.",
      "**1. Fishy Smells (The Silent Killer)**",
      "If your bedroom smells like rotting fish or urine, and you don't have a cat, **call an electrician immediately.** This specific smell comes from the chemicals in wire insulation (often Urea Formaldehyde in older components) melting. The heat has already reached a critical level inside your walls.",
      "**2. The 'Buzzing' Switch**",
      "Electricity is silent. If you hear a switch buzzing like a bee, it means electricity is jumping across a gap between loose metal contacts. This is called **Arcing**. That 'buzz' is the sound of air expanding and contracting from heat that can reach 3000°F (1600°C).",
      "**3. The Warm Faceplate**",
      "Place your hand on your wall switches or outlets. They should be cool to the touch. If a faceplate feels warm, there is **High Resistance** inside. Resistance creates heat. This usually means the wire connection is loose or the internal metal is corroded.",
      "**4. The Flicker**",
      "Lights don't flicker for fun. A flickering light means a connection somewhere in the circuit is physically vibrating—making and breaking contact. Every 'flicker' is a tiny spark. One day, it will disconnect for good, often after igniting the surrounding insulation.",
      "**5. The Breaker That Keeps Tripping**",
      "Circuit breakers do not trip because they are 'tired' or broken. They trip because they are saving your house from burning down. If you keep flipping it back ON without finding the cause, you are forcing the wires to heat up again. We call this 'Russian Roulette' with your electrical panel.",
      "**6. The Rodent Sign**",
      "Do you hear scratching in the ceiling? Rats and squirrels have teeth that never stop growing. They MUST chew on things to file them down, and electrical wire is the perfect texture. Exposed copper near dry wood in an attic is a flamethrower waiting to happen.",
      "**7. The Scorch Mark**",
      "Any discoloration (brown or black marks) around an outlet is carbon. Carbon is conductive! This means the faceplate itself has become a conductor and a heating element. Stop using it immediately.",
      "**8. The Loose Plug**",
      "When you plug in a vacuum, does it fall out of the wall? This means the metal 'wipers' inside the socket have lost their grip. Loose grip = Poor Contact = High Heat. This is a common cause of melted plugs.",
      "**9. Aluminum Wiring (For older homes)**",
      "If your home was built in the late 60s or early 70s (especially in North America), you might have Aluminum wiring. Aluminum expands and contracts 30% more than copper, which causes screws to loosen themselves over time. It requires special connectors to be safe.",
      "**10. No Ground (2-Prong Outlets)**",
      "If you only have 2 slots in your outlets, you have no 'emergency drain' for electricity. If an appliance malfunctions, the electricity will look for another path to the ground—often through your body."
    ],
    faqs: [
      {
        question: "What should I do if I smell fish near an outlet?",
        answer: "Stop using the outlet immediately. Switch off the circuit breaker for that specific room to cut the power. The 'fishy' smell is a signature chemical reaction of melting electrical plastic (Bakelite or Urea). It indicates active overheating. Call a professional electrician to replace the device."
      },
      {
        question: "Is a buzzing light switch dangerous?",
        answer: "Yes, absolutely. A buzzing sound indicates 'Arcing'. This means electricity is physically jumping through the air between loose contacts. This arc creates intense heat (plasma) and can easily ignite the plastic switch housing or the wooden studs inside the wall."
      },
      {
        question: "Why do my lights flicker when the Air Conditioner starts?",
        answer: "This is called 'Voltage Drop'. Your AC motor draws a massive amount of current (Inrush Current) for a split second to start spinning. If your main house wires are old, thin, or loose, they can't supply enough flow, causing the voltage to drop for the whole house. It can damage sensitive electronics like gaming PCs and smart TVs."
      },
      {
        question: "Is it safe to tape a breaker ON so it stops tripping?",
        answer: "NEVER do this. This is one of the most dangerous actions you can take. The breaker trips to stop the wires from melting. If you force it to stay ON, you are intentionally allowing the wires to overheat, which will almost certainly lead to a fire inside your walls."
      },
      {
        question: "How do I know if the problem is my appliance or the outlet?",
        answer: "Try the 'Swap Test'. Plug the appliance into a different outlet in a different room. If the problem (flickering/tripping) follows the appliance, the appliance is faulty. If the problem stays at the original outlet with a different device, the outlet or wiring is faulty."
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
    content: [
      "**Why do outlets melt? It's simply physics.**",
      "It comes down to one absolute rule: **Resistance creates Heat (P=I²R)**.",
      "Think of electricity like water flowing through a wide pipe. If you suddenly pinch the pipe (a loose connection), the water sprays out with high pressure. In electricity, that 'pressure' at a choke point becomes extreme heat.",
      "**The Mechanism of Failure (How it happens):**",
      "• **Step 1: The Wiggle.** Over years of plugging and unplugging, the screw terminals inside the outlet vibrate loose. Or, the metal contacts lose their springiness.",
      "• **Step 2: The Constriction.** The electricity is forced to funnel through a tiny, microscopic point of contact instead of the whole metal surface.",
      "• **Step 3: The Heat.** High current trying to squeeze through a tiny spot creates heat. This is **Joule Heating**.",
      "• **Step 4: The Oxidation.** The heat causes the copper wire to react with air and turn black (Copper Oxide). This black rust creates even MORE resistance.",
      "• **Step 5: The Runaway Loop.** More resistance = More heat = More oxide. This cycle speeds up until the plastic faceplate literally melts and drips down the wall.",
      "**The 'Backstab' Danger:**",
      "Many home fires start because electricians used the 'push-in' holes (Backstabs) on the back of cheap outlets instead of the screws. These rely on a tiny spring to hold the wire. Over time, the spring weakens, the wire gets loose, and the outlet burns.",
      "**Professional Advice:**",
      "Always wrap the wire around the side screws and tighten them down. If replacing an outlet, spend the extra $2 to buy 'Spec Grade' or 'Commercial Grade' outlets. They have brass clamps that grip the wire like a vice."
    ],
    faqs: [
      {
        question: "How do I know if my outlets are loose?",
        answer: "The easiest test is the 'Plug Feel' test. When you insert a standard plug, it should require firm pressure to push in, and significant effort to pull out. If the plug falls out halfway or wiggles easily, the internal contacts are worn out. The outlet must be replaced."
      },
      {
        question: "Are 'Push-in' connectors always bad?",
        answer: "Old-style 'backstab' push-in holes on outlets are generally considered unsafe by pros. However, modern 'Lever-Nut' connectors (like Wagos) in the junction box are excellent and very safe. The difference is that lever-nuts use a strong active spring clamp, whereas backstabs use a weak passive spring."
      },
      {
        question: "How tight should I tighten the screws?",
        answer: "Professionals use a Torque Screwdriver to hit the manufacturer's spec (usually 1.2 to 2.0 Newton Meters). If you use a regular screwdriver, the rule of thumb is 'Hand tight, plus a quarter turn'. You want the copper wire to slightly flatten under the screw, but not be crushed."
      },
      {
        question: "Can I just tape up a cracked outlet?",
        answer: "No. A crack in the faceplate destroys the 'mechanical barrier'. It exposes the live 'Bus Bars' inside to dust, moisture, and inquisitive children's fingers. Replace it immediately; they cost less than a cup of coffee."
      }
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
    content: [
      "**Why do lithium batteries explode?**",
      "Unlike old alkaline batteries, Lithium-ion batteries pack the energy of a hand grenade into a slim package. They don't just 'burn'; they undergo **Thermal Runaway**—a violent chemical chain reaction that creates its own oxygen.",
      "**The Anatomy of a Disaster:**",
      "Inside your phone battery, there is a micro-thin plastic sheet called a 'Separator' that keeps the Positive and Negative chemicals apart. If that sheet breaks, the two sides touch.",
      "This creates an internal short circuit. The battery dumps 100% of its stored energy into that one spot instantly. The temperature rockets to 1000°F (500°C) in seconds.",
      "**Why Thermal Runaway is Terrifying:**",
      "• **It creates its own Oxygen:** You cannot smother a lithium fire with a blanket. It will burn under water. It will burn in a vacuum.",
      "• **Toxic Gas:** The white smoke isn't just smoke; it contains Hydrogen Fluoride, a gas that can permanently damage your lungs and melt skin.",
      "• **Explosive Force:** The pressure builds up faster than it can vent, often turning the metal casing of e-bikes or scooters into shrapnel.",
      "**Common Causes of Failure:**",
      "1. **Physical Damage:** Dropping your phone or crashing an e-scooter can crush the internal separator.",
      "2. **Cheap Chargers:** A $2 gas station charger lacks the chips to tell the battery to 'stop' when full. It keeps pushing energy until the battery swells.",
      "3. **Heat Traps:** Charging your phone under your pillow is a common cause of fire. The heat generated during charging has nowhere to go.",
      "**Golden Safety Rules:**",
      "• **NEVER** charge e-bikes or scooters in your hallway or exit route. If they catch fire, you are trapped.",
      "• **THROW AWAY** any battery that looks swollen, puffy, or damaged. It is a ticking time bomb.",
      "• **USE OEM CHARGERS.** Your phone and its original charger 'talk' to each other 100 times a second to manage heat. A generic charger is just a dumb power hose."
    ],
    faqs: [
      {
        question: "Can I leave my phone charging overnight?",
        answer: "Technically, yes, modern phones are smart enough to stop intake at 100%. However, keeping the battery at maximum voltage for 8 hours creates chemical stress. The bigger risk is **Heat**. If your phone is under a pillow or blanket, it can overheat and catch fire. Always charge on a hard, cool surface (nightstand), never on a bed."
      },
      {
        question: "How do I put out a lithium battery fire?",
        answer: "You generally can't extinguish the chemical reaction yourself. Water helps COOL the battery to prevent the fire spreading to nearby furniture, but it won't stop the battery itself from burning. The best strategy is: **Evacuate immediately and call the Fire Department.** Do not breathe the smoke."
      },
      {
        question: "Why does my battery look puffy or swollen?",
        answer: "A 'spicy pillow' (swollen battery) means the chemicals inside have degraded and released gas. The casing is holding that gas back like a balloon. **This is critical.** Do not press it. Do not charge it. Carefully put it in a metal bucket or sand and take it to a recycling center immediately."
      },
      {
        question: "Is it safe to charge my e-bike inside the house?",
        answer: "It is risky. E-bike batteries are huge compared to phones. If they fail, the fire is explosive. If you must charge indoors, do it while you are awake, and never block your front door or exit path with the bike."
      }
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
    content: [
      "Extension cords are the **#1 cause of electrical fires** in rental homes. Why? Because we treat them like permanent solution, when they are designed to be a temporary band-aid.",
      "**The 'Daisy Chain' of Death**",
      "Plugging a power strip into another power strip is called 'Daisy Chaining'. It is dangerous for two key reasons:",
      "1. **Resistance Multiplier:** Every connection point adds resistance. Two strips = twice the failure points.",
      "2. **The Funnel Effect:** You might have 10 appliances distributed across 3 strips, but **ALL** that current has to flow through the single, thin wire of the first strip plugged into the wall. It wasn't built for that load, and it will melt.",
      "**The Heater Problem**",
      "Space heaters draw 1500 Watts (a massive continuous load). Most cheap extension cords are made of thin 16-gauge wire rated for lamps (500 Watts). When you plug a heater into a cheap cord, **the cord becomes a heater too.** It turns into a 6-foot long heating element running across your flammable carpet.",
      "**The Golden Rules of Extension Cords:**",
      "• **Temporary Use Only:** The fire code typically limits extension cord use to 30 days. If you need it longer, you need a new wall outlet installed.",
      "• **One Wall, One Strip:** Neverplug a strip into a strip.",
      "• **High Power = Wall ONLY:** Air Conditioners, Space Heaters, Fridges, Microwaves, and Treadmills must go DIRECTLY into the wall. No exceptions.",
      "• **Touch Test:** If a cord feels warm to the touch, it is undersized. Unplug it immediately."
    ],
    faqs: [
      {
        question: "Can I use an extension cord for my refrigerator?",
        answer: "No. Refrigerators need a stable voltage to run their compressor motors. Extension cords cause 'Voltage Drop', which starves the motor, causing it to overheat and fail prematurely. Also, the cord connection behind a fridge can come loose and spark without you seeing it."
      },
      {
        question: "What does the gauge (AWG) number mean?",
        answer: "Think of AWG (American Wire Gauge) like golf scores: **Lower is Better (Thicker).** A 12 AWG cord is Thick and Safe for tools/heaters. A 16 AWG cord is Thin and dangerous for anything other than a lamp. Always check the embossed number on the cord."
      },
      {
        question: "Is it okay to run cords under rugs?",
        answer: "Absolutely NOT. Foot traffic crushes the copper strands inside the cord, creating hot spots. Because the rug traps the heat, you won't know it's melting until the rug catches fire. This is a classic fire investigator scenario."
      },
      {
        question: "My power strip has a switch. Isn't that a breaker?",
        answer: "Not always. Cheap power strips have a simple on/off switch with no overload protection. Look for a separate 'Reset' button or '15A' marking. If it doesn't say 'Circuit Breaker' or 'Protected', it's just a glorified extension cord."
      }
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
    content: [
      "You learned in school that water conducts electricity. Actually, pure distilled water is an insulator. So why is the bathroom so dangerous?",
      "**Because tap water isn't pure.** It contains dissolved minerals, salts, and chlorine (ions). These ions form a high-speed highway for electrons.",
      "**The Hairdryer Scenario (Anatomy of a Shock):**",
      "If you accidentally drop a plugged-in hairdryer into the bathtub:",
      "1. The electricity leaks from the live internal wire into the bathwater.",
      "2. It desperately looks for a way back to the ground (Earth).",
      "3. The metal drain pipe is usually connected to the ground.",
      "4. **YOU are in the middle.** The current travels through your salty, conductive body to get to the drain.",
      "5. This is fatal because it stops the heart's electrical signals (Cardiac Arrest).",
      "**The Solution: GFCI / RCD (The Life Saver)**",
      "A **Ground Fault Circuit Interrupter (GFCI)** or **Residual Current Device (RCD)** is a smart computer inside your outlet or breaker panel.",
      "• It compares the current going OUT on the Live wire vs the current coming BACK on the Neutral.",
      "• If 5.0 Amps goes out, and only 4.9 Amps comes back, it knows 0.1 Amps is leaking (probably through you).",
      "• It cuts the power in **0.03 seconds**.",
      "• You might feel a painful 'zap', but you will live.",
      "**The Rule:** If your bathroom, kitchen, or outdoor outlets don't have 'Test/Reset' buttons or RCD protection, you are gambling with your life every day."
    ],
    faqs: [
      {
        question: "How do I know if my bathroom is safe?",
        answer: "Look for a specific outlet with two buttons: 'TEST' and 'RESET'. Press 'TEST'. The power should cut instantly (hairdryer stops). Press 'RESET' to restore it. If it doesn't click, the safety mechanism has failed. Replace it. In Europe/UK/Asia, check your main panel for a wide switch labeled 'RCD' or 'RCCB' and test that."
      },
      {
        question: "Can I get shocked if I touch a switch with wet hands?",
        answer: "Yes. Water reduces your skin's natural resistance. Dry skin has high resistance (100,000 Ohms), but wet skin drops to 1,000 Ohms. This allows 100x more current to flow through you if the switch is cracked or faulty. Always dry your hands."
      },
      {
        question: "Is it safe to charge my phone while in the bath?",
        answer: "NO. Even though the phone is low voltage, the charger is plugged into high voltage. If the charger (or extension cord) falls in, it is lethal. Never use corded electronics in the tub. Use a battery bank if you must."
      },
      {
        question: "Why do shaver sockets look different?",
        answer: "Shaver sockets (common in hotels) have an 'Isolating Transformer'. This physically separates the power from the main grid, making it much harder to get a shock to ground. They are the only safe socket allowed near a washbasin."
      }
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
    content: [
      "People often break the 3rd pin (Earth/Ground) off plugs to fit them into 2-pin sockets using pliers. This is arguably the **single most dangerous DIY hack in existence.**",
      "**The Invisible Bodyguard:**",
      "The 3rd pin (Ground) does absolutely nothing 99.9% of the time. It is just a drain pipe waiting for a flood.",
      "**The Scenario (Metal Appliances):**",
      "Imagine a wire vibrates loose inside your metallic washing machine or microwave and touches the metal casing.",
      "• **Scenario A (With Grounding):** The casing becomes 'live'. The electricity immediately sees the Ground wire connected to the casing. It rushes down this low-resistance path to the earth. This massive surge trips your breaker instantly. **Pop!** Power is off. You are safe.",
      "• **Scenario B (No Grounding):** The casing becomes 'live'. The electricity has nowhere to go. It sits there, charging the metal skin of the machine to 230 Volts. The breaker does NOT trip because no current is flowing yet.",
      "• **The Trap:** You walk up and touch the washer. **Now YOU are the ground wire.** The electricity flows through your hand, across your chest, and out your feet. This is often fatal.",
      "**The Rule:**",
      "Never use 'Cheater Plugs' (3-to-2 adapters) for metal appliances (Fridges, Microwaves, PCs, Laundry). Plastic appliances (Phone chargers) often don't need ground (Double Insulated), which is why they only have 2 pins."
    ],
    faqs: [
      {
        question: "Why do phone chargers only have 2 pins?",
        answer: "Phone chargers are 'Double Insulated' (Class II). This means they have two layers of non-conductive plastic between the dangerously high voltage and you. Even if the internal wire breaks, it cannot touch anything you can touch. Therefore, one doesn't need a ground wire."
      },
      {
        question: "Can I install a 3-prong outlet on 2-wire cabling?",
        answer: "Only if you protect it with a GFCI/RCD. The Code allows you to replace a 2-prong outlet with a 3-prong GFCI outlet, provided you stick a label on it: 'No Equipment Ground'. The GFCI will simulate the protection of a ground wire by cutting power if it detects a leak to your body."
      },
      {
        question: "My surge protector shows a 'Not Grounded' light. Is it working?",
        answer: "No. Surge protectors need a ground wire to dump the excess voltage during a spike. If the 'Not Grounded' light is on, it is acting as a simple power strip. Your expensive PC is not protected from lightning or surges."
      },
      {
        question: "Is the Neutral wire the same as Ground?",
        answer: "No! They connect to the same place in the main panel, but they have different jobs. Neutral carries the current BACK from the device (Working wire). Ground carries current only in an EMERGENCY (Safety wire). Never connect them together at an outlet (Bootlegging)—it can electrocute the next person to touch the device."
      }
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
    content: [
      "For decades, parents have bought those cheap plastic caps to shove into outlets. They are better than nothing, but they are fundamentally flawed.",
      "**The Problem with Plastic Caps:**",
      "1. **Choking Hazard:** Toddlers are smart. They watch you remove them. A determined 2-year-old can pry them off with their fingernails. Once it's off, it goes straight into their mouth.",
      "2. **The 'Forgot to Replace' Factor:** Parents take them out to vacuum, get distracted, and leave the outlet exposed. This 5-minute window is when accidents happen.",
      "**The Real Solution: TRR (Tamper Resistant Receptacles)**",
      "Since 2008, the Electrical Code requires 'Tamper Resistant' outlets in all new homes. They don't look special, but they have a superpower.",
      "• **Internal Shutters:** Behind the visible slots, there are spring-loaded plastic shutters.",
      "• **The Secret:** The shutters only open if TWO prongs push at the **exact same time** with **equal pressure** (like a real plug).",
      "• If a kid pushes a key, paperclip, or screwdriver into just one side, they hit a hard plastic wall. The shutter doesn't move.",
      "• This provides 24/7 passive safety without you remembering to do anything."
    ],
    faqs: [
      {
        question: "How do I know if I have TRR outlets?",
        answer: "Look closely at the vertical slots. If you see black holes, they are standard. If you see plastic blocking the hole (it looks like the outlet is closed), they are TRR. They also usually have the letters 'TR' stamped faintly on the face of the outlet between the holes."
      },
      {
        question: "I have trouble plugging things into my new outlets. Is this normal?",
        answer: "Yes. TRR outlets require more force to insert a plug, especially when they are new. You must push straight and firm. Wiggling the plug side-to-side often locks the shutters. This difficulty is exactly what keeps children safe!"
      },
      {
        question: "Are sliding plate covers better than plugs?",
        answer: "Yes. Self-closing sliding covers (that snap back when you unplug) are much safer than removable plastic caps because there is nothing to choke on and nothing to forget to replace."
      },
      {
        question: "What if a prong breaks off inside the outlet?",
        answer: "Do NOT try to dig it out with pliers! You will get shocked. Turn off the main circuit breaker for the house. Verify the power is off with a lamp or tester. Only then should you use needle-nose pliers to remove the broken piece. If you are unsure, call a pro."
      }
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
    content: [
      "Copper is an element. It lasts forever. So why do we say wires 'go bad'?",
      "It's about the **Insulation** (The plastic coating).",
      "**The 30-Year Tipping Point:**",
      "Homes built before 1990 often used wire insulation that wasn't designed for 50 years of heat cycles.",
      "• **The Crunch Test:** Plastic dries out over decades of heating up and cooling down (thermal cycling). Ideally, wire insulation should be flexible like a rubber band. In old homes, it becomes brittle like a dry leaf.",
      "• **Hidden Danger:** If a mouse bumps a wire, or you vibration from renovation shakes the wall, the insulation can crack and fall off.",
      "• **The Short:** You now have bare copper wires sitting next to dry wood inside your walls. A single arc can start a fire.",
      "**Knob and Tube (Pre-1950):**",
      "If your home is ancient, you might have 'Knob and Tube' wiring. These wires float in air on ceramic knobs. They were safe in 1940 for lightbulbs. They are **extremely dangerous** today because we bury them under attic insulation, causing them to overheat.",
      "**Advice for Homeowners:**",
      "If your home is 30+ years old and has never been rewired, request an **'Insulation Resistance Test' (Megger Test)**. An electrician sends high voltage down the line to 'stress test' the plastic. It tells you the health of your wires without tearing down walls."
    ],
    faqs: [
      {
        question: "Do I have to tear down all my walls to rewire?",
        answer: "Not necessarily. Skilled electricians can often 'fish' new wires through existing wall cavities using the old wires as pull-cords or by leveraging attic/basement access. While some small patch holes are inevitable, you rarely need to demo the whole house."
      },
      {
        question: "Does insurance cover old wiring?",
        answer: "Many insurers will refuse coverage or charge higher premiums if they know you have Knob & Tube or Aluminum wiring. They may require a 'Pass' certificate from an electrical audit before insuring a new purchase of an old home."
      },
      {
        question: "What is cloth-covered wiring?",
        answer: "Used in the 1950s, this is rubber insulation wrapped in cloth. Over time, the rubber degrades and crumbles, leaving just the cloth. It is considered nearing the end of its life and should be evaluated by a pro."
      },
      {
        question: "Can I just add new outlets to old wiring?",
        answer: "Be careful. Extending old circuits puts more load on brittle insulation. It is better to run a Fresh circuit from the panel to the new outlet, leaving the old wiring alone or slowly decommissioning it."
      }
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
    content: [
      "Motors (in ACs, Fridges, Pumps, Washers) are hungry beasts. They need 'fuel' (Voltage) to push them. If the fuel line is pinched, they starve.",
      "**What happens if the Voltage is Low?**",
      "You might think the motor just runs slower and saves energy. **WRONG.**",
      "• To do the same amount of work (like compressing gas in an AC) with less voltage, the motor physics demands to suck in **MORE Current (Amps)**.",
      "• **More Amps = More Heat.**",
      "• The delicate copper windings inside the motor overheat. The lacquer insulation melts. The motor burns out.",
      "**The #1 Culprit: Extension Cords**",
      "Extension cords are usually made of thin wire. Thin wire has high resistance. Resistance eats voltage.",
      "• **Example:** You plug a window AC into a 50ft orange extension cord.",
      "• The wall gives 120V.",
      "• The cord eats 10V due to resistance.",
      "• The AC gets 110V.",
      "• **Result:** The AC motor runs 20% hotter. It dies in 2 years instead of 10. You just killed your AC with a $15 cord."
    ],
    faqs: [
      {
        question: "How do I check for voltage drop?",
        answer: "You need a multimeter. Measure the voltage at the outlet with nothing plugged in (e.g., 120V). Then, plug in the heavy appliance and turn it on. Measure the voltage again while it's running. If it drops by more than 5% (below 114V), you have a wiring issue or undersized cable."
      },
      {
        question: "Does this affect my TV or Phone charger?",
        answer: "Not really. Modern electronics use 'Switch Mode Power Supplies' (SMPS) that can handle a wide range of voltages (100V-240V) without issue. Voltage drop is primarily a killer of MOTORS (Inductive loads)."
      },
      {
        question: "Can voltage drop cause a fire?",
        answer: "Yes. The 'lost' voltage is turned into heat along the wire or connection points. If a loose connection is causing the drop, that connection is getting extremely hot and can ignite."
      }
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
    content: [
      "Smart switches (WiFi/Zigbee/Alexa) are mini-computers. They need power 24/7 to listen for your voice command or phone app.",
      "**The Problem:**",
      "Old-school light switches simply cut the line. They have a 'Live' wire coming in and a 'Load' wire going out. They do **NOT** have a 'Neutral' (Return path) wire because a mechanical switch doesn't need to consume power.",
      "**The Dangerous Hack:**",
      "When people buy a smart switch and realize they don't have a Neutral wire in the box, they sometimes try a deadly cheat:",
      "• They connect the smart switch's Neutral wire to the **Ground (Green)** wire.",
      "• **THIS IS ILLEGAL AND DANGEROUS.**",
      "• You are now flowing current onto the safety wire. This current energizes the metal casing of every other grounded appliance in your house.",
      "• **Result:** You touch your microwave or fridge, and YOU complete the circuit.",
      "**How to do it properly:**",
      "1. **Buy 'No-Neutral' Switches:** These advanced switches use a capacitor or battery to sip a tiny amount of power without a neutral. They are safe.",
      "2. **Rewire:** Hire an electrician to pull a new Neutral wire to the switch box.",
      "3. **Smart Bulbs:** Use a smart bulb instead of a smart switch. The bulb already has power."
    ],
    faqs: [
      {
        question: "How do I know if I have a Neutral wire?",
        answer: "Turn off the breaker and open the switch box. Look for a bundle of WHITE wires capped together in the back of the box. These are the Neutrals. If you only see black/red wires connected to the switch and no white bundle, you likely don't have a Neutral."
      },
      {
        question: "Why does my No-Neutral smart switch flicker?",
        answer: "No-Neutral switches trickle a tiny current through the lightbulb to stay alive. With LED bulbs, this tiny current can sometimes be enough to make the bulb flash or glow faintly. You may need to install a 'Bypass Capacitor' (often included) at the light fixture to absorb this current."
      },
      {
        question: "Does the code require Neutrals in switch boxes now?",
        answer: "Yes. Modern electrical codes (NEC 2011+) require a Neutral wire at switch locations specifically for this future-proofing reason. But older homes won't have it."
      }
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
    content: [
      "**What should you unplug during a storm?**",
      "You must physically unplug sensitive electronics like PCs, OLED TVs, and Modems. Simply turning off a surge protector strip is **insufficient**.",
      "**The Physics of a Strike:**",
      "A lightning bolt travels miles through the sky, overcoming the massive resistance of air. Do you think a 1/4-inch plastic gap in your surge protector's 'Off' switch will stop it?",
      "No. It will jump (arc) right across that switch like it wasn't even there.",
      "**Surge Protectors vs Lightning:**",
      "Surge protectors are designed for 'Grid Spikes' (slight voltage increases). They can absorb a few thousand joules. A direct lightning strike contains **Billions of Joules**. It will melt the surge protector and everything plugged into it.",
      "**The Modem Killer:**",
      "Lightning loves traveling through copper phone lines and coaxial cable lines. It often enters the house through the internet cable, fries the modem, travels over the Ethernet cable, and kills your PC. **Unplug the internet line too.**",
      "**What to Ignore:**",
      "Lamps, Toasters, and simple motor devices. They are robust and cheaper to repair. Focus on saving the data-heavy, expensive electronics."
    ],
    faqs: [
      {
        question: "What about 'Whole House' surge protectors?",
        answer: "A Whole House Surge Protector (installed at the breaker panel) is excellent. It dumps big surges to the ground BEFORE they enter your home wiring. However, for a direct lightning strike to your house, nothing is 100% guaranteed. The best defense is still an air gap (unplugging)."
      },
      {
        question: "Is it safe to shower during a storm?",
        answer: "No. It is a myth that this is safe. Metal plumbing pipes conduct electricity. If lightning strikes the ground near your house, the electricity can travel up the water pipes and electrocute you in the shower. Wait until the storm passes."
      },
      {
        question: "My surge protector tripped. Can I reuse it?",
        answer: "Maybe not. Surge protectors sacrifice themselves to save your details. Most have an LED light labeled 'Protected'. If that light is dead, the internal MOV (Metal Oxide Varistor) has burned out. The strip still gives power, but it offers ZERO protection. Replace it."
      }
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
    content: [
      "The classic handyman mistake: You twist two wires together, wrap them in black tape, and shove them into the wall. **This is a ticking time bomb.**",
      "**Why 'Tape & Pray' Fails:**",
      "1. **Glue Fails:** The adhesive on electrical tape dries out in about 2 years. The tape unravels, leaving bare wire.",
      "2. **The Vibrating Joint:** Wires vibrate slightly with AC current (60 times a second). Without a mechanical lock, the twisted wires loosen.",
      "3. **Oxidation:** Air gets into the loose joint. The copper rusts (oxidizes). Resistance goes up. Heat goes up. Fire starts.",
      "**The Pro Way (Do it right):**",
      "• **Wire Nuts (Marrettes):** These plastic caps have a metal spring inside that bites into the copper, holding it tight.",
      "• **Wago Connectors:** These are the gold standard. You flip a lever, insert the wire, and flip it down. It clamps the wire with a stainless steel spring that never loosens.",
      "• **Rule:** Electrical tape is for **Marking** (labeling wires). It is NEVER for **Joining** wires permanently."
    ],
    faqs: [
      {
        question: "Can I use tape if I solder the wires first?",
        answer: "Soldering is great for electronics, but bad for house wiring. Solder is brittle. If the wire bends, the solder joint creates a hard spot that can crack. Also, soldering makes the wire stiff, making it hard to fold into the box. Use mechanical connectors (Nuts/Wagos) instead."
      },
      {
        question: "Are 'Push-in' Wago connectors safe?",
        answer: "Yes. Genuine Wago connectors are UL Listed and rated for more current than the wire itself. They are superior to twist nuts because they don't damage the copper strands and allow for visual inspection through the clear shell."
      },
      {
        question: "How do I fix a cut extension cord?",
        answer: "Do not repair it with tape. Cut the cord at the damage point. Install a new heavy-duty 'Male' plug on one side and a 'Female' socket on the other. You now have two safe, shorter extension cords."
      }
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
    content: [
      "**Why is my breaker tripping?**",
      "A circuit breaker trips because it is protecting your wires from melting. It is **saving your life**. Replacing it with a higher-rated breaker without upgrading the wires creates an immediate fire hazard.",
      "**The 'Bigger Breaker' Trap:**",
      "Scenario: You turn on a space heater. *Click*. The breaker trips.",
      "You think: *'This breaker is weak. I'll replace the 15 Amp breaker with a 20 Amp one.'*",
      "**STOP. YOU ARE ABOUT TO START A FIRE.**",
      "• The breaker is matched to the **WIRE thickness**, not your lifestyle.",
      "• Your 14-gauge wire can only handle 15 Amps safely.",
      "• If you put a 20 Amp breaker on it, you allow 19 Amps to flow.",
      "• The wire turns red hot inside the wall. The breaker thinks everything is fine. The house catches fire.",
      "**Correct Action:**",
      "If a breaker trips, move appliances to a different circuit. If it keeps tripping, call a pro to install a NEW circuit."
    ],
    faqs: [
      {
        question: "How do I know if a breaker is bad?",
        answer: "Breakers do wear out, but it's rare. If a breaker trips instantly with NOTHING plugged in, it might be bad (or you have a short circuit). If it trips after 10 minutes of use, it is doing its job correctly (Overload Protection)."
      },
      {
        question: "What is an Arc Fault (AFCI) Breaker?",
        answer: "Standard breakers only detect Overloads (Too much power). AFCI breakers detect Sparking (Arcing). They have a 'Test' button. They are mandatory in bedrooms because they can detect a loose wire sparking behind the wall before it starts a fire."
      },
      {
        question: "Can I replace a breaker myself?",
        answer: "It is legally allowed in many places for homeowners, but dangerous. The 'Bus Bar' inside the panel is ALWAYS LIVE with lethal voltage, even if the main breaker is off (on some panels). It is highly recommended to hire an electrician."
      }
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
    content: [
      "Rodents (Rats, Mice, Squirrels) have teeth that never stop growing. They **MUST** chew on things to file them down.",
      "Electrical wire is the perfect texture for them. It's firm but chewable.",
      "**The Damage:**",
      "• They strip the plastic insulation, leaving bare copper.",
      "• They often do this in hidden places: attics, crawlspaces, inside walls.",
      "• **The Fire:** Eventually, they chew enough effectively to bridge the Hot and Neutral wires. This creates a massive arc flash, often igniting the dry nesting material they brought with them.",
      "**Signs of an Intruder:**",
      "• **Scratching/Scampering:** Sounds in the ceiling at night.",
      "• **Flickering:** Lights in one specific room flicker when you walk nearby.",
      "• **The Smell:** A distinct smell of urine in the attic (Rodents follow scent trails).",
      "• **Tripping:** Breakers tripping for no apparent reason."
    ],
    faqs: [
      {
        question: "Does electrical wire taste good to rats?",
        answer: "Some older wires (pre-2000s) used plant-based plastics that actually smelled like food to rodents. Modern wire is strictly synthetic, but they chew it for the *texture*, not the taste."
      },
      {
        question: "How do I stop them?",
        answer: "Seal every hole larger than a dime with steel wool and expanding foam. Rodents cannot chew through steel wool. If you have exposed wires in an attic, electricians can install steel conduit (pipes) to armor the wires."
      },
      {
        question: "I found a chewed wire. Can I tape it?",
        answer: "No. If the copper is exposed or nicked, the resistance has changed. The wire must be cut and rejoined in a accessible Junction Box. Do not just tape it and bury it in insulation."
      }
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
    content: [
      "Every light fixture has a sticker hidden somewhere: **'Max 60 Watts'**.",
      "**What happens if you put a 100W bulb in?**",
      "You might think: 'It's just brighter, what's the big deal?'",
      "• **The Heat Trap:** The fixture was designed to dissipate the heat of 60W safely. With 100W, it becomes an oven.",
      "• **Baking the Socket:** The socket overheats. The insulation on the wires *inside* the fixture becomes brittle and cracks off.",
      "• **The Short:** Eventually, the bare wires touch the metal casing of the lamp. The next person to touch the lamp switch gets shocked.",
      "**The LED Miracle:**",
      "LEDs have solved this problem forever. A '100W Equivalent' LED bulb uses only **14 Watts**. You can safely put a super-bright LED in almost any old fixture without risking fire."
    ],
    faqs: [
      {
        question: "Can I put a higher wattage LED in an old fixture?",
        answer: "Yes! If the fixture says 'Max 60W', it refers to heat. A 100W *equivalent* LED only generates about 14W of heat. It is perfectly safe. Just don't use a 100W *Incandescent* bulb (the old hot glass ones)."
      },
      {
        question: "Why do my LED bulbs die so fast?",
        answer: "Heat is the killer of LEDs. If you put an LED bulb in a fully enclosed glass fixture ('Boob light'), the heat gets trapped and cooks the electronics in the base of the bulb. Look for LEDs rated for 'Enclosed Fixtures'."
      },
      {
        question: "What is 'Correlated Color Temperature' (CCT)?",
        answer: "This is the color of the light. 2700K is 'Warm White' (Yellow/Relaxing). 5000K is 'Daylight' (Blue/Alert). For living rooms, stick to 2700K-3000K. For garages, use 5000K."
      }
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
    content: [
      "Many homes around the world rely on backup power inverters connected to large, tubular Lead-Acid batteries.",
      "**The Chemistry of Danger:**",
      "• When these batteries charge, the liquid inside boils. This releases **Hydrogen Gas**.",
      "• Hydrogen is colorless, odorless, and **explosive**. (Remember the Hindenburg airship disaster?)",
      "**The Closet Trap:**",
      "People often hide these ugly batteries in a closet or under a wooden staircase. This is a fatal mistake.",
      "• The hydrogen gas gets trapped in the enclosed space.",
      "• When the inverter switches modes, an internal relay clicks (Sparks).",
      "• **Boom.**",
      "**The Fix:**",
      "• **Ventilation:** Always keep lead-acid batteries in a well-ventilated area, ideally with a fan.",
      "• **Upgrade:** Switch to Sealed Lead Acid (SLA) or **Lithium Iron Phosphate (LiFePO4)** batteries. They produce zero gas and are completely safe for indoor use."
    ],
    faqs: [
      {
        question: "How do I check my batteries?",
        answer: "Check the water level monthly. If they are dry, they can overheat. Use only distilled water. Also, check the terminals for white powder (corrosion). Clean it with hot water and apply petroleum jelly."
      },
      {
        question: "Are AGM/Gel batteries safer?",
        answer: "Yes. Absorbed Glass Mat (AGM) and Gel batteries are sealed. They recombine the gases internally and rarely vent. They are much safer for indoor use than 'Flooded' (Wet) batteries."
      },
      {
        question: "Why do batteries smell like rotten eggs?",
        answer: "That is Hydrogen Sulfide. It typically means the battery is being overcharged and boiling dry. This is toxic and flammable. Turn off the charger immediately and ventilate the room."
      }
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
    content: [
      "Solar is great, but it introduces a new beast to your home: **High Voltage DC.**",
      "**AC vs DC: The Difference:**",
      "• **AC (Wall Power):** The electricity vibrates back and forth 60 times a second. It crosses 'Zero' volts constantly. If a spark forms, it naturally extinguishes at the zero crossing.",
      "• **DC (Solar Power):** This is continuous, relentless pressure. It does not stop.",
      "**The DC Arc (The Flamethrower):**",
      "If a DC wire is cut or a connector comes loose, the electricity jumps the gap. Because it never stops pushing, the spark turns into a sustained **Plasma Arc**. It looks and acts like a welding torch.",
      "• It burns at 3000°C.",
      "• It is incredibly hard to extinguish.",
      "**Firefighter Danger:**",
      "Firefighters cannot just spray water on solar panels. As long as the sun is shining, those panels are generating lethal voltage. Even if the main breaker is off, the roof is LIVE.",
      "**Safety Tip:** Ensure your system has 'Rapid Shutdown' (Module Level Electronics). This technology kills the voltage at the panel level instantly when the grid goes down."
    ],
    faqs: [
      {
        question: "Can I hose down my solar panels to clean them?",
        answer: "Only if you are sure there are no cracked panels or exposed wires. Water conducts electricity. If there is a leak in the system, you could create a path from the 400V array to your body through the water stream. Professional cleaners use de-ionized water and specialized poles."
      },
      {
        question: "What is Rapid Shutdown?",
        answer: "It is a code requirement (NEC 690.12). It means that when you flip a switch (or the power goes out), the voltage on the roof drops to a safe level (under 80V) within 30 seconds, protecting firefighters."
      },
      {
        question: "Do solar panels cause roof leaks?",
        answer: "They shouldn't, but they can. Each mount requires drilling a hole in your roof. If the installer didn't use proper flashing and sealants, those 40 holes can become leaks 5 years later."
      }
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
    content: [
      "It sounds nice: A blanket that hugs you with warmth. But inside, it is a grid of fragile heating wires.",
      "**The Folding Risk:**",
      "• The heating wires are insulated, but if you **fold** the blanket, you bring two heating wires right next to each other.",
      "• They share their heat. The temperature spirals out of control (Thermal Stacking).",
      "• The fabric chars, smokes, and ignites. This often happens while you are asleep.",
      "**The Cord Hazard:**",
      "Never run the power cord between the mattress and the box spring. The friction of you getting in and out of bed will strip the insulation off the cord, creating a short circuit right under your bedding.",
      "**The Rule:**",
      "• Lay electric blankets flat. Never bunch them up.",
      "• Turn them OFF before you fall asleep (use a timer).",
      "• If you see brown spots, throw it away. That is evidence of near-ignition."
    ],
    faqs: [
      {
        question: "Can I wash my electric blanket?",
        answer: "Some modern ones say 'Yes', but proceed with caution. The spinning and tumbling can damage the internal wires. I recommend spot cleaning or hand washing only to be safe. Never dry clean (chemicals damage insulation)."
      },
      {
        question: "How long do they last?",
        answer: "Replace them every 10 years. The internal heating element becomes brittle over time and creates hot spots."
      },
      {
        question: "Is it safe for pets?",
        answer: "No. Cats and dogs love the warmth, but they can chew the cord or claw through the fabric to the live wire. Also, pets can overheat easily because they can't sweat."
      }
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
    content: [
      "A charger's job is to convert 120V/230V AC (Wall Danger) to 5V DC (Phone Safe). That implies there is a massive barrier between the two.",
      "**The Gap (Isolation):**",
      "High-quality chargers (Apple/Samsung/Anker) use a physical 'Isolation Transformer' and opto-isolators to ensure the high voltage CANNOT jump to the USB port.",
      "**The Gas Station Special:**",
      "Cheap $2 chargers cut corners.",
      "• They use smaller transformers with thin insulation.",
      "• They bridge the safety gap to save board space.",
      "**The Risk:**",
      "1. **Ghost Touch:** Cheap chargers output 'Dirty Power' (Ripple). This electrical noise confuses your screen, making it click things you didn't touch.",
      "2. **The Killer Leak:** If the cheap transformer insulation melts (which it often does), it sends full 120V wall power straight up the USB cable, into your phone's metal frame, and into your ear.",
      "**Advice:** Never trust a charger that weighs less than a coin. Weight usually implies a decent transformer."
    ],
    faqs: [
      {
        question: "My phone gets hot when charging. Is that bad?",
        answer: "Warm is normal. Hot to the touch is not. If it's too hot to hold, unplug it immediately. This usually means the charger is struggling to provide the current efficiently."
      },
      {
        question: "Does fast charging damage the battery?",
        answer: "Slightly, but not enough to worry about. Heat is the real enemy. Fast charging creates more heat. If you want your battery to last 5 years, use a slow (5W) charger overnight. But for most people, the convenience of fast charging is worth the minor degradation."
      },
      {
        question: "Why does my cable matter?",
        answer: "Cheap cables have thin copper strands. Thin strands cause resistance. Resistance causes voltage drop (slow charging) and heat. Use thick, certified cables (MFi for Apple)."
      }
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
    content: [
      "We stress our electrical system the most during the holidays, adding thousands of watts of lighting to circuits that weren't designed for it.",
      "**The Trinity of Terror:**",
      "1. **The Dry Tree:** A dry pine tree is basically solidified gasoline. A single spark from a cheap bulb can engulf a room in **under 30 seconds**. Water your tree daily!",
      "2. **Daisy Chaining:** People plug 10 strands of lights end-to-end. The tiny fuse in the first plug acts as a safety, but often fails. The thin wire melts.",
      "3. **Indoor Lights Outdoors:** Using indoor-rated lights in the rain is a recipe for disaster. Water gets into the sockets, creates a bridge, and causes short circuits.",
      "**The Fix:**",
      "• **Switch to LED:** They run cool to the touch and use 90% less energy, meaning you can connect way more strands safely.",
      "• **Check the Label:** Look for the UL Red Label (Outdoor) vs Green Label (Indoor Only)."
    ],
    faqs: [
      {
        question: "How many strands can I connect together?",
        answer: "For old incandescent mini-lights: Max 3 strands. For modern LED strings: You can often connect 20-40 strands! Check the box for the specific number."
      },
      {
        question: "My lights went out. Is it a fuse?",
        answer: "Probably. Look at the male plug. There is a tiny sliding door. Inside are two tiny glass fuses. If the wire inside the glass is broken, replace it with the spares provided. Do NOT wrap it in foil."
      },
      {
        question: "Can I run an extension cord through a window?",
        answer: "Only for a few hours. Do not slam the window on the cord. The metal window frame can cut through the insulation and electrify the whole window frame."
      }
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
    content: [
      "There is a dangerous myth that 230V (Europe/Asia) kills, but 110V (USA/Japan) just 'tickles'.",
      "**The Truth:**",
      "• It takes about **30mA (0.03 Amps)** across the heart to cause fibrillation (Death).",
      "• By Ohm's Law (I=V/R), 110V can push roughly **100mA** through a wet human body.",
      "• **100mA is 3x the lethal dose.**",
      "**The Difference (The Grip):**",
      "• **230V:** Hits harder. It causes muscles to clamp shut violently. You often cannot let go ('The Grip').",
      "• **110V:** Still causes muscle contraction, but you have a slightly better chance of pulling away reflexively.",
      "**Conclusion:**",
      "Dead is Dead. Both voltages are easily capable of stopping your heart, especially if you are wet or grounded. Treat 110V with the same terror as 230V."
    ],
    faqs: [
      {
        question: "Why is the US 110V and Europe 230V?",
        answer: "Thomas Edison wanted 110V because it worked well for his bulbs and he thought it was safer. Europe chose 220V because it is more efficient (transmits power with less loss over thin wires)."
      },
      {
        question: "What is 'Amps kill, not Volts'?",
        answer: "It's a half-truth. Current (Amps) does the damage, but Voltage is the 'Pressure' that pushes the Amps through your skin. You need enough Voltage to break through skin resistance. 12 Volts (Car battery) has huge Amps but can't push through skin. 110V has enough pressure to push lethal Amps."
      },
      {
        question: "What should I do if someone is being shocked?",
        answer: "DO NOT TOUCH THEM. You will be shocked too. Kick the plug out of the wall, or shove them away with a wooden chair or broom handle (insulator). Call 911 immediately."
      }
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
