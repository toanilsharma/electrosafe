import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a0f1e]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About ELECTRO-SAFE</h1>
          <p className="text-lg text-cyan-400 mb-8">Visualizing Risk, Engineering a Safer Tomorrow.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#141a2b] rounded-lg shadow-xl p-8 md:p-12 mt-8 border border-cyan-500/20">
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to empower electrical engineers, safety professionals, and technicians with accessible, high-quality, and interactive tools. We believe that a deeper, intuitive understanding of electrical hazards is the first step toward preventing accidents. The ELECTRO-SAFE Simulator Suite was created to bridge the gap between theoretical knowledge and real-world application, providing a safe environment to explore the dangerous dynamics of arc flash and electric shock.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Creator</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-grow">
                <p className="text-gray-300 leading-relaxed mb-4">
                  ELECTRO-SAFE is a project driven by a passion for electrical safety, created by <strong className="text-cyan-400">Anil Sharma</strong>. With a background in electrical engineering and a profound respect for the power and risks associated with it, Anil developed this suite to serve as a vital educational resource for the industry.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  "My goal was to create something that wasn't just another calculator, but a true simulator—a tool that helps you visualize the invisible dangers and understand the 'why' behind the safety standards. If these tools can help prevent even one injury, then the project is a success."
                </p>
                 <a href="mailto:info.onesharma@gmail.com" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                    Contact Anil <i className="fas fa-envelope fa-xs ml-1"></i>
                </a>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Our Philosophy</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-cyan-400 mt-1 mr-3"></i>
                <span><strong className="text-white">Adherence to Standards:</strong> Our simulators are built upon the foundational principles of leading safety standards like NFPA 70E, IEEE 1584, and IEC 60479.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-cyan-400 mt-1 mr-3"></i>
                <span><strong className="text-white">Interactive Learning:</strong> We believe in learning by doing. Our tools allow users to manipulate variables and see the immediate impact, fostering a more profound and lasting understanding of electrical safety concepts.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-cyan-400 mt-1 mr-3"></i>
                <span><strong className="text-white">Accessibility for All:</strong> Safety knowledge should be widely available. This suite is a free-to-use resource for professionals, students, and anyone looking to enhance their electrical safety awareness.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Future Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              ELECTRO-SAFE is a continuously evolving project. We are committed to expanding the toolkit with new simulators, incorporating the latest updates to safety standards, and enhancing the user experience. Our roadmap includes tools for lockout/tagout procedures, insulated tool management, and more advanced DC system analysis. We believe in constant improvement and welcome feedback from the professional community to make this suite the best it can be.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;