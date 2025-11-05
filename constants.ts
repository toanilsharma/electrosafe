import { Tool } from './types';

export const TOOLS_DATA: Tool[] = [
  {
    id: 'ac-arc-flash',
    title: 'AC Arc Flash Simulator',
    description: 'Analyze three-phase AC systems to determine incident energy, boundaries, and PPE requirements based on IEEE 1584-2018.',
    icon: 'fa-solid fa-explosion',
    path: '/ac-arc-flash',
    categories: ['arc-flash', 'ac-systems'],
    status: 'available',
  },
  {
    id: 'ac-shock-hazard',
    title: 'AC Shock Hazard Simulator',
    description: 'Model body impedance and environmental factors to understand physiological AC shock effects based on IEC 60479.',
    icon: 'fa-solid fa-wave-square',
    path: '/ac-shock-hazard',
    categories: ['shock-hazard', 'ac-systems'],
    status: 'available',
  },
  {
    id: 'dc-arc-flash',
    title: 'DC Arc Flash Simulator',
    description: 'Calculate incident energy and boundaries for complex DC systems. Based on NFPA 70E Annex D for maximum power.',
    icon: 'fa-solid fa-car-battery',
    path: '/dc-arc-flash',
    categories: ['arc-flash', 'dc-systems'],
    status: 'available',
  },
  {
    id: 'dc-shock-hazard',
    title: 'DC Shock Hazard Simulator',
    description: 'Explore the dangers of direct current shock under various conditions, including wet environments and PPE usage.',
    icon: 'fa-solid fa-bolt',
    path: '/dc-shock-hazard',
    categories: ['shock-hazard', 'dc-systems'],
    status: 'available',
  },
  {
    id: 'ppe-selector',
    title: 'PPE Category Selector',
    description: 'An interactive tool to help select the correct Personal Protective Equipment based on task and hazard analysis.',
    icon: 'fa-solid fa-helmet-safety',
    path: '/ppe-selector',
    categories: ['compliance', 'arc-flash', 'shock-hazard'],
    status: 'available',
  },
  {
    id: 'approach-boundary-calc',
    title: 'Safe Approach Boundary Calc',
    description: 'Calculate Limited and Restricted Approach Boundaries for shock protection as per NFPA 70E standards.',
    icon: 'fa-solid fa-ruler-combined',
    path: '/approach-boundary-calc',
    categories: ['shock-hazard', 'compliance'],
    status: 'available',
  },
  {
    id: 'arc-flash-label-generator',
    title: 'Arc Flash Label Generator',
    description: 'Generate compliant arc flash hazard warning labels based on your risk assessment data.',
    icon: 'fa-solid fa-tags',
    path: '/arc-flash-label-generator',
    categories: ['arc-flash', 'compliance'],
    status: 'available',
  },
  {
    id: 'gfp-simulator',
    title: 'Ground Fault Protection Simulator',
    description: 'Visualize how Ground Fault Protection (GFP) and GFCI devices operate to prevent deadly electric shocks.',
    icon: 'fa-solid fa-shield-halved',
    path: '/gfp-simulator',
    categories: ['shock-hazard', 'ac-systems'],
    status: 'available',
  },
  {
    id: 'hazardous-location-guide',
    title: 'Hazardous Location Guide',
    description: 'An interactive guide for classifying hazardous locations (Class/Division/Group) to ensure safe equipment selection.',
    icon: 'fa-solid fa-fire-flame-curved',
    path: '/hazardous-location-guide',
    categories: ['compliance'],
    status: 'available',
  },
  {
    id: 'nfpa70e-tables',
    title: 'NFPA 70E Risk Assessment Tables',
    description: 'An interactive version of the NFPA 70E tables to quickly determine arc flash and shock risks for common electrical tasks.',
    icon: 'fa-solid fa-table-list',
    path: '/nfpa70e-tables',
    categories: ['compliance', 'arc-flash', 'shock-hazard'],
    status: 'available',
  }
];

export const COPILOT_MESSAGES: Record<string, Record<string, (value?: any) => string>> = {
  "ac-arc-flash": {
    "WELCOME": () => "Welcome to the AC Arc Flash Simulator. I'll provide real-time safety analysis as you adjust the parameters.",
    "IE_HIGH": (val) => `**Alert:** Incident energy is ${val} cal/cm². This requires at least PPE Category 3. The risk of severe injury is high. Consider reducing clearing time or increasing working distance.`,
    "IE_DANGEROUS": (val) => `**DANGER:** Incident energy at ${val} cal/cm² exceeds 40 cal/cm². Energized work is prohibited under NFPA 70E. The system must be de-energized.`,
    "BOUNDARY_INTRUSION": (val) => `**Warning:** Your working distance (${val.workingDistance} in) is inside the Arc Flash Boundary (${val.arcBoundary} in). You are at risk of a second-degree burn. Increase your working distance.`,
    "LOW_VOLTAGE_HIGH_CURRENT": () => "**Insight:** Notice how even at lower voltages, high fault currents can still produce a significant arc flash hazard. Never underestimate low-voltage systems.",
    "CLEARING_TIME_IMPACT": () => "**Key Concept:** A long clearing time is a major factor in high incident energy. This demonstrates the critical importance of fast-acting protective devices."
  },
  "dc-arc-flash": {
    "WELCOME": () => "Welcome to the DC Arc Flash Simulator. I'll provide safety insights for your DC system configurations.",
    "IE_HIGH": (val) => `**Alert:** Incident energy is ${val} cal/cm². This level requires significant arc-rated PPE. DC arcs are sustained and can be more thermally hazardous than AC arcs.`,
    "IE_DANGEROUS": (val) => `**DANGER:** At ${val} cal/cm², the incident energy is extremely high. Energized work is not safe. Re-engineer the system or perform work de-energized.`,
    "BOUNDARY_INTRUSION": (val) => `**Warning:** Working distance (${val.workingDistance} in) is inside the Arc Flash Boundary (${val.arcBoundary} in). Increase your distance to a safe location.`,
    "HIGH_FAULT_CURRENT": () => "**Insight:** Battery systems and DC power supplies can deliver enormous fault currents. This is a primary driver of the DC arc flash hazard.",
  },
  "ac-shock-hazard": {
    "WELCOME": () => "Welcome to the AC Shock Hazard Simulator. I'll analyze the physiological effects as you change the scenario.",
    "FIBRILLATION_RISK": (val) => `**DANGER:** ${val} mA is flowing through the body. This current level is high enough to cause ventricular fibrillation, which is often fatal. Immediate medical response is critical.`,
    "CANNOT_LET_GO": (val) => `**Warning:** At ${val} mA, the current has reached the 'let-go' threshold. Muscles are in tetanic contraction, meaning a person holding a conductor would be unable to release their grip.`,
    "WET_CONDITIONS": () => "**Critical Alert:** Wet conditions have drastically lowered body impedance, making this voltage level lethal. This is why GFCIs are required in wet locations.",
    "PPE_EFFECTIVE": () => "**Safety Note:** The use of insulated PPE has increased the total impedance to a safe level, reducing the current flow to a non-hazardous value. This demonstrates the life-saving importance of proper PPE.",
  },
  "dc-shock-hazard": {
    "WELCOME": () => "Welcome to the DC Shock Hazard Simulator. Let's explore the unique risks of direct current.",
    "SEVERE_BURN_RISK": (val) => `**DANGER:** ${val} mA of DC current can cause severe burns and tissue damage. While less likely to cause fibrillation than AC, it can still be fatal due to cardiac arrest or internal injuries.`,
    "PAINFUL_SHOCK": (val) => `**Warning:** At ${val} mA, this is a very painful shock that can cause involuntary muscle reactions, leading to secondary injuries like falls.`,
    "WET_CONDITIONS": () => "**Critical Alert:** Wet conditions have dangerously lowered body resistance. Even seemingly low DC voltages can become lethal under these circumstances.",
    "PPE_EFFECTIVE": () => "**Safety Note:** Proper PPE is effective at mitigating DC shock hazards by significantly increasing the total resistance in the circuit path.",
  },
  "gfp-simulator": {
    "WELCOME": () => "Welcome to the Ground Fault Protection Simulator. Adjust the parameters to see how GFCIs and GFPs protect against electric shock.",
    "GFP_TRIP": (val) => `**Device Tripped:** The fault current of ${val.faultCurrent.toFixed(1)} mA exceeded the ${val.tripThreshold.toFixed(1)} mA threshold. The device opened the circuit, preventing a potentially fatal shock. This demonstrates how GFCIs save lives.`,
    "GFP_DANGEROUS_FAULT": (val) => `**DANGER:** A fault current of ${val.faultCurrent.toFixed(1)} mA is flowing. This is enough to cause ventricular fibrillation. The selected device has a ${val.tripThreshold.toFixed(1)} mA threshold and WILL NOT trip, highlighting the difference between equipment protection (GFP) and personnel protection (GFCI).`,
    "GFP_PAINFUL_SHOCK": (val) => `**Warning:** A painful shock of ${val.faultCurrent.toFixed(1)} mA is occurring. The selected device has a ${val.tripThreshold.toFixed(1)} mA threshold and has not tripped.`,
  },
  "default": {
    "WELCOME": (toolTitle) => `Welcome to the ${toolTitle}. The Safety Co-Pilot is active and will provide insights as you use this tool.`
  }
};