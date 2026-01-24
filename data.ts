
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
      "Electricity is invisible, silent, and odorless—until it isn't. When your electrical system starts making noise or smell, it's not a warning. **It's a scream.**",
      "Most electrical fires don't happen 'suddenly'. They happen after months or years of the system begging for attention. Here are the 10 undeniable signs that your home is trying to tell you something is wrong:",
      "1. Fishy Smells:",
      "Does your bedroom smell like rotting fish or urine? No, it's not the cat. It's the chemicals in wire insulation (often Urea Formaldehyde in older components) melting. **This is a 911-level emergency.** The heat has already reached a critical level.",
      "2. The 'Buzz':",
      "Electricity should be silent. If your switch buzzes like a bee, it means electricity is jumping across a gap (arcing). **That gap is a mini-fire.** The sound is literally the air expanding and contracting from heat.",
      "3. The Warm Faceplate:",
      "Put your hand on the wall switch. It should be cool. If it's warm, there is high resistance inside. **Resistance = Heat.** It means the wire is loose or the switch is corroded.",
      "4. The Flicker:",
      "Lights don't just 'flicker' for fun. It means a loose connection is vibrating somewhere in the wall, making and breaking contact. One day, it will disconnect for good—often after sparking a flame.",
      "5. The Trip:",
      "Breakers don't trip because they are 'tired' or 'old'. They trip because they are saving your life from an overload. If you just flip it back without finding the cause, you are playing Russian Roulette with your wires.",
      "6. The Rodent Sign:",
      "Found droppings in the attic? Rats love to chew wire insulation to sharpen their teeth. Exposed copper in a wooden attic is a ticking time bomb.",
      "7. The Scorch Mark:",
      "Any brown or black mark on an outlet is carbon. Carbon conducts electricity. The outlet has essentially become a heating element. Replace it immediately.",
      "8. The Loose Plug:",
      "Does the plug fall out of the wall? This means the metal 'wipers' inside have lost tension. Poor contact pressure creates heat (Joule Heating).",
      "9. Aluminium Wiring (Pre-1972):",
      "If you live in North America and your house was built in the late 60s, you might have Aluminium wiring. It expands/contracts 30% more than copper, loosening its own screws over time.",
      "10. No Ground:",
      "If you have 2-prong outlets, you have no safety drain for leakage current. Your body becomes the backup plan."
    ],
    faqs: [
      {
        question: "What should I do if my outlet smells like fish?",
        answer: "Stop using it immediately. Turn off the circuit breaker for that room. The smell indicates that the plastic insulation or the device body is actively melting due to high heat. Call an electrician."
      },
      {
        question: "Is a buzzing light switch dangerous?",
        answer: "Yes. Buzzing indicates 'Arcing'—electricity jumping a gap between loose contacts. This arc can reach temperatures of several thousand degrees and ignite surrounding wood or dust."
      },
      {
        question: "Why do my lights flicker when the AC turns on?",
        answer: "This is voltage drop. The AC draws a huge current on start-up. If your main service wires are too thin or loose, the voltage drops for the whole house. It can damage sensitive electronics like PCs."
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
      "**Why do outlets melt?** It comes down to one physics equation: **Resistance creates Heat (P=I²R)**. When connections are loose, electricity is forced through a tiny contact point, creating massive friction and heat.",
      "Specifically, the formula is **P = I²R**. Power (Heat) equals Current squared times Resistance.",
      "Imagine a garden hose. If you squeeze it, the water sprays harder. In electricity, a 'squeeze' is a loose connection. But instead of water spraying, you get Heat.",
      "The Mechanism of Failure:",
      "• **Step 1: The Looseness.** A screw vibrates loose over years, or the metal contacts inside the socket spread apart from use.",
      "• **Step 2: The Constriction.** The electricity, which usually flows through a wide metal surface, is forced to flow through a microscopic point of contact.",
      "• **Step 3: The Heat.** High current through a small point creates massive resistance. The metal heats up.",
      "• **Step 4: The Oxidation.** Hot copper reacts with air to form Copper Oxide. Copper Oxide is a poor conductor. This adds MORE resistance.",
      "• **Step 5: The Runaway.** More resistance = More heat = More oxidation. It's a loop until the plastic melts.",
      "The 'Backstab' Danger:",
      "Many lazy electricians use the 'push-in' holes on the back of cheaper outlets. This relies on a tiny spring to hold the wire. It is the #1 failure point in home wiring. **Always use the screw terminals.**",
      "Fix it Yourself:",
      "If you are replacing an outlet, buy 'Commercial Grade' or 'Spec Grade'. They cost $3 instead of $0.50, but they have brass clamps that grip the wire harder than consumer-grade ones."
    ],
    faqs: [
      {
        question: "How tight should electrical screws be?",
        answer: "They should be torqued to manufacturer specs (usually 1.2 to 2.0 Nm). If you don't have a torque screwdriver, 'hand tight plus a quarter turn' is a common rule, but professional torque tools are safer."
      },
      {
        question: "Are push-in connectors safe?",
        answer: "Wago-style lever connectors are very safe. However, the 'backstab' push-in holes found on cheap receptacles are notorious for failing over time and are banned in some jurisdictions for certain loads."
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
      "**Why do lithium batteries explode?** Lithium-ion batteries fail due to **Thermal Runaway**—a chemical chain reaction where the battery creates its own heat and oxygen, making it impossible to smother.",
      "**The Anatomy of a Disaster:**",
      "Inside a battery is a very thin plastic sheet (Separator) keeping the Positive and Negative chemicals apart. If that sheet breaks, the two sides touch.",
      "This creates an internal short circuit. The battery dumps all its energy into that one spot instantly. The temperature hits 1000°F in seconds. This is called **Thermal Runaway**.",
      "Why is it so dangerous?",
      "• **Self-Oxygenating:** Lithium fires create their own oxygen as they burn. You cannot smother them with a blanket. They will burn underwater.",
      "• **Toxic Gas:** The smoke contains Hydrogen Fluoride, which can melt your lungs.",
      "• **Explosive Force:** The pressure buildup often causes the metal casing to explode like shrapnel.",
      "Common Causes:",
      "1. **Physical Damage:** Dropping your phone or crushing an e-bike battery.",
      "2. **Overcharging:** Using a cheap $2 charger that lacks the 'safety cut-off' chip.",
      "3. **Heat:** Charging a phone under a pillow. The heat can't escape, degrading the separator.",
      "Safety Rules:",
      "• **Never** charge e-bikes or scooters in the hallway (your escape route).",
      "• **Throw away** any battery that is swollen or 'puffy'.",
      "• **Use OEM chargers.** Apple engineers designed the charger to talk to the phone. A gas station charger is just a dumb power hose."
    ],
    faqs: [
      {
        question: "Can I leave my phone charging overnight?",
        answer: "Modern smartphones have smart chips to stop charging at 100%. However, it keeps the battery at high tension. It's safe-ish, but never put it under your pillow or on a bed where heat puts stress on the cells."
      },
      {
        question: "How do I put out a lithium fire?",
        answer: "Standard extinguishers don't work well. Water helps cool it down (preventing spread), but won't extinguish the chemical reaction easily. The best strategy is to evacuate and call the fire department."
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
      "Extension cords are the #1 cause of electrical fires in rental homes. Why? Because people treat them like permanent wiring.",
      "The 'Daisy Chain' of Death:",
      "Plugging a power strip into another power strip is called 'Daisy Chaining'. It is dangerous for two reasons:",
      "• **Resistance Multiplier:** Every connection point adds resistance. Two strips = double the failure points.",
      "• **The Funnel Effect:** You might have 10 appliances running across 3 strips. But ALL that current has to flow through the single, thin wire of the first strip plugged into the wall. It wasn't built for that load.",
      "The Heater Problem:",
      "Space heaters draw 1500 Watts. Most cheap extension cords are rated for less. When you plug a heater into a cheap cord, the cord becomes a heater too. It creates a line of fire across your carpet.",
      "The Golden Rules:",
      "• **Temporary Only:** If a cord is used for more than 30 days, you need a new wall outlet installed.",
      "• **One Wall, One Strip:** Never plug a strip into a strip.",
      "• **High Power = Wall:** Air Conditioners, Heaters, Fridges, and Microwaves must go DIRECTLY into the wall. No exceptions."
    ],
    faqs: [
      {
        question: "Can I use an extension cord for my fridge?",
        answer: "No. Fridges need a constant voltage. Extension cords cause voltage drop, which can burn out the fridge's compressor motor. Plus, the fire risk behind a fridge is undetectable until it's too late."
      },
      {
        question: "What does the gauge (AWG) mean?",
        answer: "Lower number = Thicker wire. A 12 AWG cord is thick and safe for tools. A 16 AWG cord is thin and only for lamps. Never use a 16 AWG cord for a heater."
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
      "You learned in school that water conducts electricity. Actually, pure distilled water is an insulator. So why is it dangerous?",
      "Because tap water isn't pure. It has minerals, salts, and chlorine (ions). **These ions form a highway for electrons.**",
      "The Hairdryer Scenario:",
      "If you drop a hairdryer in the tub:",
      "• The electricity leaks from the live wire into the water.",
      "• It looks for the path of least resistance to the ground (usually the metal drain pipe).",
      "• **You are in the way.** The current travels through your salty, conductive body to get to the drain.",
      "• It stops your heart (Cardiac Arrest) in seconds.",
      "The Solution: GFCI / RCD:",
      "A Ground Fault Circuit Interrupter (GFCI) or Residual Current Device (RCD) is a life-saving calculator. It measures the current going OUT on the live wire and coming BACK on the neutral.",
      "• If 5.0 Amps goes out, and only 4.9 Amps comes back, it knows 0.1 Amps is leaking (probably through you).",
      "• It cuts the power in 0.03 seconds. You might feel a 'bite', but you will live.",
      "• If your bathroom outlets don't have 'Test/Reset' buttons (or aren't protected by an RCD breaker), you are gambling with your life every morning."
    ],
    faqs: [
      {
        question: "How do I know if my bathroom is safe?",
        answer: "Look for a button on the outlet that says 'TEST'. Press it. The power should cut immediately. If it doesn't, replace the outlet. In Europe/Asia, check your main panel for a wide switch marked 'RCD' or 'RCCB'."
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
      "People often break the 3rd pin (Earth/Ground) off plugs to fit them into 2-pin sockets. This is arguably the most dangerous DIY hack in existence.",
      "The Job of the 3rd Pin:",
      "• It is a drain pipe. It does absolutely nothing 99.9% of the time.",
      "• But imagine a wire comes loose inside your metal washing machine. It touches the metal casing.",
      "• **With Grounding:** The casing becomes 'live'. But because the Earth wire is connected to the casing, the electricity creates a massive short circuit to the ground. This instantly trips the breaker. You are safe.",
      "• **Without Grounding:** The casing becomes 'live'. The electricity has nowhere to go. It sits there, waiting.",
      "• **The Trap:** You touch the washer. Now YOU are the ground wire. 230 Volts flows through your chest.",
      "Impact:",
      "Never use 'Cheater Plugs' (3-to-2 adapters) for metal appliances (Fridges, Microwaves, PCs, Laundry). Plastic appliances (Phone chargers) often don't need ground (Double Insulated), which is why they only have 2 pins."
    ],
    faqs: [
      {
        question: "Why do some plugs only have 2 pins?",
        answer: "These appliances are 'Double Insulated' (Class II). They usually have plastic casings so you can't touch any metal part that could become live. They are safe without a ground."
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
      "For decades, parents bought those plastic caps to shove into outlets. They are better than nothing, but barely.",
      "The Problem:",
      "• **Choking Hazard:** Toddlers are smart and determined. They can pry them off. Once off, it's a small plastic object that goes straight into the mouth.",
      "• **Forgetting:** Parents take them out to vacuum, get distracted, and leave the outlet exposed.",
      "The Solution: TRR (Tamper Resistant Receptacles)",
      "• Since 2008, the US Electrical Code (NEC) requires TRR outlets in all homes.",
      "• They have internal plastic shutters behind the holes.",
      "• **The Secret:** The shutters only open if TWO prongs push at the exact same time with equal pressure (like a real plug).",
      "• A kid pushing a key or paperclip into one side hits a hard plastic wall. No shock.",
      "• It is passive safety. It works 24/7 without you remembering to put the cap back."
    ],
    faqs: [
      {
        question: "How do I know if I have TRR outlets?",
        answer: "Look closely at the vertical slots. If you see plastic filling the holes instead of darkness/contacts, they are TRR. They might also have 'TR' stamped on the face."
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
      "Copper is an element. It lasts forever. So why do we need to rewire houses?",
      "It's about the **Insulation** (The plastic coating).",
      "The Crunch Test:",
      "• Plastic dries out over decades of heating up and cooling down (thermal cycling).",
      "• After 30-40 years, the plasticizers evaporate. The insulation becomes brittle like a dry leaf.",
      "• If you bend an old wire, the insulation might just crack and fall off.",
      "The Result:",
      "• You now have bare copper wires sitting next to dry wood inside your walls.",
      "• A single vibration (slamming a door, walking heavily) can make them touch.",
      "• **Short Circuit -> Spark -> Fire.**",
      "Advice:",
      "If your home is 30+ years old, get an 'Insulation Resistance Test' (Megger Test). An electrician sends high voltage down the line to test the plastic's strength without opening the walls."
    ],
    faqs: [
      {
        question: "Do I have to tear down my walls to rewire?",
        answer: "Not distinctively. Skilled electricians can 'fish' new wires through existing cavities using the old wires as pull-cords, minimizing damage to drywall."
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
      "Motors (ACs, Fridges, Pumps) are hungry beasts. They need 'fuel' (Voltage) to push them.",
      "What happens if the fuel is low? (Low Voltage):",
      "• You might think the motor just runs slower. **Wrong.**",
      "• To do the same amount of work (maintain speed) with less voltage, the motor automatically sucks in **MORE Current (Amps)**.",
      "• **More Amps = More Heat.**",
      "• The windings inside the motor get hot. Eventually, the lacquer insulation melts and the motor burns out.",
      "The Culprit:",
      "• Usually, it's a thin wire. If you run a heavy AC on a thin, long extension cord, the resistance of the cord 'eats' some voltage.",
      "• Example: 120V at the wall -> Cord eats 10V -> AC gets 110V.",
      "• That 10% drop can cause a 20% increase in heat. You are literally starving your appliance to death."
    ],
    faqs: []
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
      "Smart switches (WiFi/Zigbee) need power 24/7 to listen for your voice command or phone app.",
      "Old switches simply cut the line. They have no 'Return Path' (Neutral).",
      "The Hack:",
      "• Some people try to use the 'Ground' wire as a Neutral to power the smart switch.",
      "• **THIS IS ILLEGAL AND DANGEROUS.**",
      "• You are putting current onto the safety wire. Current that is supposed to ensure safety is now being used for function.",
      "• Result: The metal casing of other appliances on that ground loop might become live.",
      "The Fix:",
      "1. Buy 'No-Neutral' smart switches (They use a capacitor trick to trickle power).",
      "2. Hire an electrician to pull a new Neutral wire to the box.",
      "3. Never cheat with the Ground wire."
    ],
    faqs: []
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
      "**What should you unplug during a storm?** You must physically unplug sensitive electronics like PCs, OLED TVs, and Modems. Turning off a surge protector strip is **insufficient** because lightning can easily jump (arc) across the small switch gap.",
      "A lightning bolt travels miles through the sky, overcoming the massive resistance of air. Do you think a 1-inch plastic gap in your surge protector toggle switch will stop it?",
      "If lightning hits your power line, it can jump (arc) across switches and protectors. It's millions of volts.",
      "What to Unplug:",
      "• **Expensive Electronics:** PCs, OLED TVs, Consoles.",
      "• **Modems:** Lightning loves traveling through phone/cable/fiber lines too.",
      "What to Ignore:",
      "• Lamps, Toasters, Fridges (They are robust simple machines and usually survive or are cheaper to repair).",
      "**Myth:** 'I can just turn off the strip.'",
      "**Fact:** Physical unplugging is the only 100% guarantee. Lightning can jump the 'Off' switch gap easily."
    ],
    faqs: []
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
      "The classic handyman move: Twist two wires together, wrap them in black tape, shove them in the wall.",
      "Why this fails:",
      "• **Glue Fails:** The adhesive on tape dries out in 2 years. The tape unravels.",
      "• **Exposed Wire:** Now you have a bare joint vibrating in the wall.",
      "• **Oxidation:** Air gets in. The copper rusts (oxidizes). Resistance goes up. Heat goes up.",
      "The Pro Way:",
      "• **Wire Nuts (Marrettes):** A mechanical spring grips the wires.",
      "• **Wago Connectors:** A lever clamp locks them in place. This is the gold standard in Europe.",
      "• **Pressure vs Sticky:** Mechanical pressure ensures a gas-tight seal. Sticky tape does not."
    ],
    faqs: []
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
      "**Why is my breaker tripping?** A circuit breaker trips because it is protecting your wires from overheating. It is **saving your life**. Replacing it with a higher-rated breaker without upgrading the wires creates an immediate fire hazard.",
      "Scenario: You turn on the heater. *Click*. The breaker trips.",
      "You think: 'This breaker is weak. I should replace it with a stronger one.'",
      "**STOP.**",
      "• The breaker is matched to the **WIRE**, not your lifestyle.",
      "• If you have a 1.5mm wire, it can handle 15 Amps. The breaker is 15 Amps.",
      "• If you put a 20 Amp breaker, you remove the limit.",
      "• Now, you can pull 19 Amps. The wire heats up red hot. The breaker doesn't trip. **The house catches fire.**",
      "Rule:",
      "Never upgrade a breaker rating. If it trips, reduce the load or install a new circuit."
    ],
    faqs: []
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
      "Rodents (Rats, Mice, Squirrels) have teeth that never stop growing. They MUST chew on things to file them down.",
      "Electrical wire is the perfect texture. Not too hard, not too soft.",
      "The Damage:",
      "• They strip the insulation, leaving bare copper.",
      "• They often do this in hidden places: attics, crawlspaces, inside walls.",
      "• They bridge the Hot and Neutral wires, causing a massive arc.",
      "Signs:",
      "• Scratching sounds in the ceiling.",
      "• Flickering lights in one specific room.",
      "• Breakers tripping for no reason.",
      "• **Smell of Urine:** Rodents follow urine trails. If your attic smells, check the wires."
    ],
    faqs: []
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
      "Every light fixture has a sticker: 'Max 60 Watts'.",
      "What happens if you put a 100W bulb in?",
      "• **Heat Trap:** The fixture was designed to dissipate the heat of 60W.",
      "• With 100W, the heat builds up. It bakes the socket.",
      "• The insulation on the wires *inside* the fixture becomes brittle and cracks.",
      "• Eventually, the wires short out inside the metal casing.",
      "Note:",
      "LEDs have solved this. A '100W Equivalent' LED uses only 14 Watts. You can safely put a bright LED in almost any old fixture."
    ],
    faqs: []
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
      "Many homes have backup power inverters with large tubular lead-acid batteries.",
      "The Chemistry:",
      "• When these batteries charge, they boil the electrolyte.",
      "• This releases **Hydrogen Gas**.",
      "• Hydrogen is extremely explosive (Remember the Hindenburg?).",
      "The Danger:",
      "• People often put these batteries in a closet or under stairs to hide them.",
      "• The gas accumulates in the enclosed space.",
      "• A single spark from the inverter relay switching can ignite the room.",
      "The Fix:",
      "• Always keep lead-acid batteries in a well-ventilated area.",
      "• Or switch to Sealed Lead Acid (SLA) or Lithium/LiFePO4 batteries which produce no gas."
    ],
    faqs: []
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
      "Wall power (AC) flickers on and off 60 times a second (0 crossing). This makes it easy to extinguish a spark.",
      "Solar power (DC) is continuous pressure. It does not stop.",
      "The Arc:",
      "• If a DC wire is cut or loose, the continuous current creates a sustained flame thrower (Plasma Arc).",
      "• It is very hard to stop.",
      "• Firefighters cannot just spray water on solar panels because the sun is still powering them—they are always LIVE during the day.",
      "Safety:",
      "• Ensure your installer used 'Rapid Shutdown' devices (Microinverters/Optimizers).",
      "• Never try to disconnect solar wires yourself while the sun is shining."
    ],
    faqs: []
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
      "Inside the fabric are thin heating wires.",
      "The Folding Risk:",
      "• If you fold the blanket, you bring two heating wires close together.",
      "• They share heat, creating a hotspot.",
      "• Eventually, the fabric chars and ignites.",
      "• Never run the cord between the mattress and box spring—the friction will strip the cord.",
      "Check:",
      "Look for brown spots on the blanket. That is where it has already overheated. Throw it away."
    ],
    faqs: []
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
      "A charger converts 120V/230V AC (Wall Danger) to 5V DC (Phone Safe).",
      "The Gap:",
      "• High quality chargers have a physical 'isolation gap' and quality transformers to keep the high voltage away from your phone.",
      "• Cheap chargers bridge this gap with cheap components to save money.",
      "Risks:",
      "1. **Dirty Power:** Unstable voltage (ripple) confuses the phone's touch screen (Ghost Touch) and overheats the charging chip.",
      "2. **Lethal Leakage:** If the cheap transformer fails, it can send full wall voltage straight into the phone chassis. Users have been electrocuted answering phones plugged into cheap chargers."
    ],
    faqs: []
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
      "We stress our electrical system the most during holidays.",
      "The Risks:",
      "• **Dry Trees:** A dry pine tree is explosive. One spark from a cheap light string acts like napalm.",
      "• **Daisy Chaining:** People plug 10 strands of lights end-to-end. This melts the wire of the first strand.",
      "• **Outdoor/Indoor:** Using indoor lights outside. Rain gets into the sockets and causes shorts.",
      "Rule:",
      "• Use LED lights (they run cool).",
      "• Water the tree daily.",
      "• Don't connect more than 3 strands together."
    ],
    faqs: []
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
      "There is a myth that 230V (Europe/Asia) kills, but 110V (USA) just tickles.",
      "The Truth:",
      "• It takes about **30mA (0.03 Amps)** across the heart to cause fibrillation (death).",
      "• By Ohm's Law (I=V/R), 110V can push WAY more than 30mA through your body (which has a resistance of about 1000-2000 Ohms when wet).",
      "• 110V / 1000 Ohms = 110mA. **This is 3x the lethal dose.**",
      "Difference:",
      "• 230V contracts muscles harder, making it impossible to let go ('The Grip').",
      "• 110V is *slightly* more survivable, but still easily lethal, especially in wet conditions or if the path crosses the heart."
    ],
    faqs: []
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
