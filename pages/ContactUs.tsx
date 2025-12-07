
import React from 'react';
import { Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';

export const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We value feedback from our global community. Whether you have a suggestion for a new tool, found a bug, or want to share a safety story, please reach out.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Direct Contact Info */}
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            
            {/* Email */}
            <div className="flex items-start gap-4 mb-8">
               <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                 <Mail className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                 <p className="text-gray-600 text-sm mb-3">For general inquiries, feedback, or partnerships.</p>
                 <a href="mailto:0808miracle@gmail.com" className="text-blue-600 font-bold hover:underline text-xl break-all">
                   0808miracle@gmail.com
                 </a>
               </div>
            </div>
            
            {/* Creator Info */}
            <div className="flex items-start gap-4 pt-8 border-t border-gray-100">
               <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                 <Globe className="w-6 h-6 text-green-600" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 text-lg">About the Creator</h3>
                 <p className="text-gray-600 text-sm">
                   ElectroSafe.homes is an independent safety project created by <strong>Anil Sharma</strong>.
                 </p>
               </div>
            </div>
         </div>

         {/* Feedback / Action Block */}
         <div className="flex flex-col gap-6">
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg flex-grow flex flex-col justify-center">
              <MessageSquare className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Have a Feature Request?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We are constantly improving our tools based on user feedback. If you think a specific calculator or guide is missing, let us know!
              </p>
              <a 
                href="mailto:0808miracle@gmail.com?subject=ElectroSafe Feature Request"
                className="inline-flex items-center font-bold text-blue-400 hover:text-blue-300 transition"
              >
                Send Suggestion <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Report a Bug</h3>
              <p className="text-blue-800 text-sm mb-4">
                Found an error in our calculations or content? Please help us keep this resource accurate.
              </p>
              <a 
                href="mailto:0808miracle@gmail.com?subject=Bug Report"
                className="text-sm font-bold text-blue-700 hover:underline"
              >
                Report Issue &rarr;
              </a>
            </div>
         </div>
      </div>
    </div>
  );
};
