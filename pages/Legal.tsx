
import React from 'react';
import { Info, Shield } from 'lucide-react';

export const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Legal & Corporate Information</h1>
      </div>

      <div className="space-y-12">
        {/* About Us */}
        <section id="about" className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
          </div>
          <div className="prose text-gray-600">
            <p className="mb-4">
              ElectroSafe.homes is a dedicated independent resource focused exclusively on residential electrical safety. 
              Founded with a mission to reduce household electrical fires and shock incidents globally, we provide free, 
              accessible, and universal tools for homeowners everywhere.
            </p>
            <p>
              Our content is designed to be "voltage neutral"—meaning our safety principles apply whether you live in a 
              110V region (like the USA or Japan) or a 230V region (like Europe, Asia, or Africa). We focus on the physics 
              of electricity and best practices that transcend borders.
            </p>
          </div>
        </section>

        {/* Legal Policies */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 prose prose-blue max-w-none">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">Legal Policies</h2>
          </div>
          
          <h3>Disclaimer</h3>
          <p>
            The information provided on ElectroSafe.homes is for general educational purposes only. 
            It is not a substitute for professional advice from a certified electrician. 
            Electrical systems vary by region and voltage standard. Always comply with your local regulations.
            We do not accept liability for any loss or damage caused by reliance on this information.
          </p>

          <h3>Privacy Policy</h3>
          <p>
            We respect your privacy. This website is static and does not collect personal data, store cookies for tracking, 
            or require user registration. Any data entered into calculators (like load calculations) remains in your 
            browser's local memory and is lost upon refreshing the page. We do not sell or share user data.
          </p>

          <h3>Terms & Conditions</h3>
          <p>
            By using this website, you agree that you are doing so at your own risk. 
            Content is provided "as is" without warranty of any kind. You agree not to use this site for any unlawful purpose.
          </p>
          
          <h3>Cookie Policy</h3>
          <p>
            This site uses no functional or tracking cookies. Local Storage may be used temporarily to improve the user experience 
            of the interactive tools during a single session, but no persistent tracking is employed.
          </p>
        </section>
      </div>
    </div>
  );
};
