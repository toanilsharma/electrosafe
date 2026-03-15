import React, { useState } from 'react';
import { Mail, MessageSquare, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactUs = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We value feedback from our global community. Whether you have a suggestion, found a bug, or want to share a safety story, please reach out.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-2 space-y-8 animate-slide-up">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-blue-500/10 h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Get in Touch
              </h2>
              
              <div className="space-y-10">
                {/* Email */}
                <div className="flex items-start gap-5 group">
                   <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 dark:text-white text-lg">Email Us</h3>
                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">For general inquiries and feedback.</p>
                     <a href="mailto:0808miracle@gmail.com" className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg break-all">
                       0808miracle@gmail.com
                     </a>
                   </div>
                </div>
                
                {/* Creator Info */}
                <div className="flex items-start gap-5 group pt-8 border-t border-gray-100 dark:border-gray-700">
                   <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                     <Globe className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white" />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 dark:text-white text-lg">About the Creator</h3>
                     <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                       ElectroSafe.homes is an independent safety project created by <strong className="text-gray-900 dark:text-white">Anil Sharma</strong> to promote global electrical safety awareness.
                     </p>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-3 animate-slide-up delay-100">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            
            {status === 'success' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center animate-zoom-in-95">
                <div className="bg-green-100 dark:bg-green-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Message Sent!</h3>
                <p className="text-green-800 dark:text-green-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Netlify Hidden Fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all ${
                    status === 'submitting' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-blue-500/25 -translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
