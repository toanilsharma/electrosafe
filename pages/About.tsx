import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Award, BookOpen, UserCheck, Linkedin, Mail } from 'lucide-react';

export const About = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "name": "Anil Sharma",
            "alternateName": "Electrical Reliability Expert",
            "jobTitle": "Senior Electrical Engineer",
            "description": "Electrical Reliability Expert with 25+ years of experience in industrial electrical maintenance and instrumentation projects.",
            "knowsAbout": ["Industrial Electrical Safety", "Reliability Maintenance", "Instrumentation", "Flash Hazard Prevention"]
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Helmet>
                <title>About Anil Sharma - Electrical Reliability Expert | ElectroSafe</title>
                <meta name="description" content="Meet Anil Sharma, the expert behind ElectroSafe.homes. With 25 years of experience in industrial electrical reliability, maintenance, and instrumentation projects." />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            {/* Hero Section */}
            <div className="text-center mb-16 animate-in slide-in-from-bottom-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Saving Lives Through <span className="text-blue-600">Engineering Truth</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    In a world of bad DIY advice, we provide safety protocols backed by physics and 25 years of field experience.
                </p>
            </div>

            {/* Expert Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16">
                <div className="bg-blue-900 h-32 relative">
                    <div className="absolute -bottom-16 left-8 md:left-12">
                        <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                            {/* Placeholder for real image */}
                            <UserCheck className="w-16 h-16 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-20 px-8 md:px-12 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Anil Sharma</h2>
                            <p className="text-blue-600 font-bold text-lg">Electrical Reliability Expert</p>
                        </div>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:0808miracle@gmail.com" className="p-2 bg-gray-100 rounded-full hover:bg-yellow-50 hover:text-yellow-600 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-lg text-gray-600 leading-relaxed mb-8">
                        <p>
                            Anil Sharma is a veteran Electrical Engineer with over 25 years of experience specializing in
                            <strong> Industrial Electrical Reliability</strong>, <strong>Maintenance</strong>, and <strong>Instrumentation Projects</strong>.
                        </p>
                        <p>
                            Having managed complex electrical systems in heavy industries, Anil founded
                            ElectroSafe.homes with a single mission: <strong>To bring professional-grade reliability and safety protocols to everyday homeowners.</strong>
                        </p>
                        <p>
                            "Most electrical fires are preventable. The problem isn't the electricity; it's the lack of accessible knowledge.
                            My goal is to stop the 'Silent Screams' of your home's wiring before they turn into headlines."
                        </p>
                    </div>

                    {/* Credentials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <Award className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">25+ Years Experience</h3>
                            <p className="text-sm text-gray-600">Deep expertise in industrial electrical projects, maintenance, and reliability engineering.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <ShieldCheck className="w-8 h-8 text-green-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Safety Discipline</h3>
                            <p className="text-sm text-gray-600">Applying rigorous industrial safety protocols to residential electrical systems.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                            <BookOpen className="w-8 h-8 text-purple-600 mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Instrumentation</h3>
                            <p className="text-sm text-gray-600">Specialist in precision instrumentation and control systems maintenance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editorial Standards */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Editorial Promise (E-E-A-T)</h2>
                <div className="space-y-6 text-gray-700">
                    <p>
                        Electrical safety is "Your Money or Your Life" (YMYL) content. We take this responsibility seriously.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span><strong>Engineering Backed:</strong> Every article is reviewed against best practices for electrical safety and reliability.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span><strong>No Fear Mongering:</strong> We explain the specific *physics* of why things happen, rather than just using scare tactics.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span><strong>Unbiased:</strong> We do not accept sponsorship from product manufacturers. Our recommendations are based purely on safety specs.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
