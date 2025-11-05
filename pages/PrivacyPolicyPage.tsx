import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a0f1e] text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg max-w-none bg-[#141a2b] p-8 rounded-lg border border-cyan-500/20">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
            ELECTRO-SAFE ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains our policies and procedures on the collection, use, and disclosure of your information when you use our service.
          </p>

          <h2 className="text-white">1. Information We Do NOT Collect: Simulation Data</h2>
          <p>
            <strong>We do not collect, store, transmit, or share any of the technical data you enter into the simulators.</strong> All calculations and simulations are performed locally within your browser. The values you input for voltage, current, clearing time, etc., are never sent to our servers.
          </p>

          <h2 className="text-white">2. Information We Collect: Contact Information</h2>
          <p>
            If you choose to contact us via our contact form or by direct email, we will collect the information you provide, such as your name, email address, and the content of your message. We use this information solely for the purpose of responding to your inquiries.
          </p>

          <h2 className="text-white">3. How We Use Your Information</h2>
          <p>
            The personal information we collect is used only for the following purposes:
          </p>
          <ul>
            <li>To provide and maintain our Service.</li>
            <li>To respond to your comments, questions, and requests for support.</li>
            <li>To communicate with you about important updates or information regarding the tool suite.</li>
          </ul>

          <h2 className="text-white">4. Cookies and Analytics</h2>
          <p>
            We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. We may use a third-party service such as Google Analytics to monitor and analyze the use of our Service. This is done to understand general user engagement (e.g., which tools are most popular) to help us improve the suite. This data is aggregated and does not personally identify you.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our Service.
          </p>
          
          <h2 className="text-white">5. Security of Your Data</h2>
          <p>
            The security of your data is important to us. While no method of transmission over the Internet or method of electronic storage is 100% secure, we strive to use commercially acceptable means to protect any personal information you provide via our contact methods.
          </p>

          <h2 className="text-white">6. Links to Other Websites</h2>
          <p>
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          
          <h2 className="text-white">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-white">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info.onesharma@gmail.com" className="text-cyan-400">info.onesharma@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;