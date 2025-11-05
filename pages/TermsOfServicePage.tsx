import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a0f1e] text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Terms of Service</h1>
        <div className="prose prose-invert prose-lg max-w-none bg-[#141a2b] p-8 rounded-lg border border-cyan-500/20">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-white">1. Agreement to Terms</h2>
          <p>
            By accessing and using the ELECTRO-SAFE Simulator Suite (the "Service"), you accept and agree to be bound by these Terms of Service and our Disclaimer. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 className="text-white">2. Description of Service and Educational Purpose</h2>
          <p>
            The Service provides interactive electrical safety simulators intended for educational, training, and illustrative purposes only. The tools are designed to help users visualize the principles of electrical safety based on established industry standards.
          </p>
          <p>
            <strong>The Service is NOT a substitute for professional engineering analysis, field verification of equipment, a comprehensive site-specific risk assessment, or the judgment of a qualified electrical worker.</strong>
          </p>

          <h2 className="text-white">3. CRITICAL: Disclaimer of Warranties and Limitation of Liability</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Anil Sharma and ELECTRO-SAFE expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of accuracy, merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the results obtained from the use of the Service will be accurate, reliable, or meet your requirements.
          </p>
          <p className="font-bold text-amber-400">
            You expressly understand and agree that the creator, Anil Sharma, shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, personal injury, death, property damage, loss of profits, or other intangible losses resulting from: (i) the use or the inability to use the Service; (ii) any reliance on the data or results produced by the Service; (iii) any action taken or not taken based on the information provided by the Service.
          </p>
           <p>
            The user assumes all risk and sole responsibility for any decisions made, PPE selected, or work procedures implemented based on any information obtained from this Service.
          </p>


          <h2 className="text-white">4. User Conduct and Responsibilities</h2>
          <p>
            You agree to use this Service responsibly and as an educational supplement to, not a replacement for, your professional training, experience, and adherence to applicable safety standards such as NFPA 70E, OSHA regulations, and other local codes.
          </p>
          
          <h2 className="text-white">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, visual design, and functionality are owned by Anil Sharma and are protected by international copyright, trademark, and other intellectual property or proprietary rights laws.
          </p>

          <h2 className="text-white">6. Modification of Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of changes by updating the "Last Updated" date of these Terms. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-white">7. Governing Law</h2>
          <p>
            Any claim relating to the Service shall be governed by the laws of the creator's jurisdiction without regard to its conflict of law provisions.
          </p>

          <h2 className="text-white">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:info.onesharma@gmail.com" className="text-cyan-400">info.onesharma@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;