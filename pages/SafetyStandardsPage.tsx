import React from 'react';

const standards = [
  {
    name: 'NFPA 70E®',
    title: 'Standard for Electrical Safety in the Workplace®',
    description: 'This is the cornerstone standard for electrical safety in the United States. It addresses worker safety by providing guidelines for hazard identification, risk assessment, safe work practices, and the selection of appropriate Personal Protective Equipment (PPE). Our tools heavily reference its arc flash and shock risk assessment procedures.',
    link: 'https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70E'
  },
  {
    name: 'IEEE 1584™',
    title: 'Guide for Performing Arc-Flash Hazard Calculations',
    description: 'This guide provides the detailed mathematical models required to calculate arc flash incident energy and boundaries. Our AC Arc Flash Simulator is based on the complex formulas presented in the 2018 edition of this standard, which is the industry-accepted method for accurate arc flash analysis.',
    link: 'https://standards.ieee.org/ieee/1584/7264/'
  },
  {
    name: 'OSHA 1910 Subpart S',
    title: 'Occupational Safety and Health Administration - Electrical',
    description: 'This is a US federal law that mandates a safe workplace. While NFPA 70E explains the "how," OSHA provides the legal requirement for employers to protect workers from electrical hazards like shock, electrocution, and arc flash. Compliance with NFPA 70E is often cited as the method for achieving OSHA compliance.',
    link: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333'
  },
  {
    name: 'IEC 60479',
    title: 'Effects of current on human beings and livestock',
    description: 'This international standard provides data on the effects of AC and DC electric shock on the human body. It details the impedance of the body and defines zones of physiological effects for different current magnitudes and durations. Our Shock Hazard Simulators use the principles from this standard to estimate the severity of an electric shock.',
    link: 'https://webstore.iec.ch/publication/25292'
  }
];

const SafetyStandardsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a0f1e]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Guiding Safety Standards</h1>
          <p className="text-lg text-gray-300 mb-8">
            Our tools are built on the foundational principles established by leading global safety organizations. Understanding these standards is key to a comprehensive safety program.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-6">
          {standards.map((standard) => (
            <div key={standard.name} className="bg-[#141a2b] rounded-lg shadow-lg p-6 border border-cyan-500/20 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">{standard.name}</h2>
              <h3 className="text-lg font-semibold text-white mb-3">{standard.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {standard.description}
              </p>
              <a 
                href={standard.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Learn More <i className="fas fa-external-link-alt fa-xs ml-1"></i>
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 bg-[#141a2b] rounded-lg p-6 border border-amber-500/20">
            <h2 className="text-2xl font-bold text-amber-400 mb-3">Our Commitment to Compliance</h2>
            <p className="text-gray-300 leading-relaxed">
              The ELECTRO-SAFE Simulator Suite is designed to demystify the complex calculations and concepts within these standards. By allowing you to visualize the outcomes of different scenarios, we aim to provide a powerful learning aid that reinforces the critical importance of adhering to these life-saving guidelines.
            </p>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 text-center text-gray-500 border-t border-gray-700 pt-6">
            <p><i className="fas fa-info-circle mr-2"></i>The information provided here is for summary purposes only. Always refer to the latest official publication of each standard for detailed requirements and compliance.</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyStandardsPage;