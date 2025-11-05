import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a0f1e]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300 mb-8">
            We welcome your questions, feedback, feature requests, and collaboration inquiries.
          </p>
        </div>

        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-[#141a2b] rounded-lg p-8 border border-cyan-500/20 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-gray-400 mb-6">
              For direct inquiries, feedback, or support, please send an email. We aim to respond to all messages within 24-48 hours.
            </p>
            <div className="space-y-4 mt-auto">
              <div className="flex items-center gap-4">
                <i className="fas fa-envelope text-cyan-400 text-xl w-6 text-center"></i>
                <a href="mailto:info.onesharma@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  info.onesharma@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
