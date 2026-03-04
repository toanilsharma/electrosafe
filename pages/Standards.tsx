import React from 'react';
import { ShieldCheck, BookOpen, Globe, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

const Standards = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="bg-zinc-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-900/50">
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        Built on <span className="text-blue-500">Global Standards</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Our safety guidance is not based on opinion. It is grounded in the physics and engineering frameworks established by the world's leading safety institutions.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

                {/* Core Methodology Card */}
                <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 dark:border-gray-800 p-8 mb-12">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">Our Methodology</h2>
                            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                                We translate rigorous technical standards (like IEC 60364) into actionable, plain-language advice for homeowners.
                                When we say "don't daisy chain power strips," we aren't just giving a tip; we are reflecting the resistance and thermal limits defined in <strong>NFPA housing codes</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* IEC Standards */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">International Electrotechnical Commission (IEC)</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 overflow-hidden">
                        <div className="p-6">
                            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-4">
                                The IEC sets the global benchmark for electrical safety. Our content aligns with:
                            </p>
                            <ul className="grid gap-4 sm:grid-cols-2">
                                <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 block">IEC 60364</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Electrical Installations for Buildings (Global standard for wiring).</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 block">IEC 61140</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Protection against electric shock (Common aspects).</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 block">IEC 62368</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Safety requirements for consumer electronics (Chargers & PCs).</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <span className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 block">IEC 60884</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Plugs and socket-outlets for household purposes.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* IEEE Standards */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">IEEE Standards</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 p-6">
                        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-4">
                            We reference the Institute of Electrical and Electronics Engineers for power quality and grounding:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300"><strong>IEEE 142 (Green Book):</strong> Grounding of Industrial and Commercial Power Systems.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300"><strong>IEEE 1100 (Emerald Book):</strong> Powering and Grounding Electronic Equipment.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* NFPA & Fire Data */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">Fire & Injury Data (NFPA & WHO)</h2>
                    </div>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3 text-lg border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 pb-2">NFPA (USA)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-4">
                                    We utilize fire statistics from the National Fire Protection Association to prioritize our warnings.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">NFPA 70</span>
                                        <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">National Electrical Code (NEC)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">NFPA 73</span>
                                        <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Residential Electrical Maintenance</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3 text-lg border-b border-gray-100 dark:border-gray-800 dark:border-gray-800 pb-2">WHO (Global)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-4">
                                    Injury metrics are derived from World Health Organization reports on domestic accidents.
                                </p>
                                <div className="p-3 bg-red-50 rounded-lg text-red-800 text-sm font-medium">
                                    Focus: Preventing burn injuries and cardiac arrest from low-voltage shock.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* National Codes Table */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">Regional Code Alignment</h2>
                    <div className="bg-white dark:bg-gray-900 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 dark:border-gray-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
                                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-300">Region / Country</th>
                                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-300">Standard Code</th>
                                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-300">Focus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4 text-gray-900 dark:text-gray-100 dark:text-gray-100 font-medium">United States</td>
                                    <td className="p-4 text-blue-600 font-mono text-sm">NFPA 70 (NEC)</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">Arc Fault & GFCI Protection</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-900 dark:text-gray-100 dark:text-gray-100 font-medium">United Kingdom</td>
                                    <td className="p-4 text-blue-600 font-mono text-sm">BS 7671</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">Ring Circuits & Earthing</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-900 dark:text-gray-100 dark:text-gray-100 font-medium">Australia / NZ</td>
                                    <td className="p-4 text-blue-600 font-mono text-sm">AS/NZS 3000</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">Wiring Rules & Damp Areas</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-900 dark:text-gray-100 dark:text-gray-100 font-medium">India</td>
                                    <td className="p-4 text-blue-600 font-mono text-sm">IS 732</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">Code of Practice for Wiring</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-900 dark:text-gray-100 dark:text-gray-100 font-medium">European Union</td>
                                    <td className="p-4 text-blue-600 font-mono text-sm">HD 60364</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 dark:text-gray-400 text-sm">Harmonized Safety Standards</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 text-amber-900">
                    <p className="font-bold flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5" /> Important Note
                    </p>
                    <p className="text-sm">
                        ElectroSafe.homes provides educational content designed to simplify these standards for general understanding.
                        We are not a governing body. **Always hire a licensed electrician** who knows the specific local amendments to these codes in your jurisdiction.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Standards;
