import React, { useState, useMemo, useEffect } from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS_DATA } from '../constants';
import { ToolCategory } from '../types';
import { Link } from 'react-router-dom';


// Mini simulator component for the hero section
const HeroMiniSimulator: React.FC = () => {
    const [voltage, setVoltage] = useState(120);
    const [risk, setRisk] = useState({ level: 'Low Risk', color: '#22c55e', description: 'Perceptible, but unlikely to cause injury.' });

    useEffect(() => {
        if (voltage < 50) {
            setRisk({ level: 'Very Low Risk', color: '#0ea5e9', description: 'Generally considered safe from shock.' });
        } else if (voltage <= 240) {
            setRisk({ level: 'Dangerous', color: '#f59e0b', description: 'Painful shock, can cause injury or death.' });
        } else if (voltage <= 600) {
            setRisk({ level: 'High Danger', color: '#ef4444', description: 'High risk of ventricular fibrillation and severe injury.' });
        } else {
             setRisk({ level: 'Extreme Danger', color: '#dc2626', description: 'Lethal shock hazard. Unsurvivable without protection.' });
        }
    }, [voltage]);

    return (
        <div className="mt-12 bg-[#141a2b]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 w-full max-w-lg mx-auto shadow-2xl shadow-cyan-500/10">
            <div className="text-center mb-4">
                <label htmlFor="voltage-slider" className="block text-sm font-medium text-cyan-300 mb-2">Drag to Simulate Shock Hazard</label>
                <div className="text-4xl font-bold text-white transition-colors duration-300" style={{ color: risk.color }}>{voltage}V</div>
            </div>
            <input 
                id="voltage-slider"
                type="range" 
                min="30" 
                max="1000" 
                value={voltage} 
                onChange={(e) => setVoltage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{'--thumb-color': risk.color} as React.CSSProperties}
            />
            <div className="mt-4 text-center p-3 rounded-lg transition-all duration-300" style={{ backgroundColor: `${risk.color}20`, border: `1px solid ${risk.color}80`}}>
                 <div className="font-bold text-lg" style={{ color: risk.color }}>{risk.level}</div>
                 <p className="text-xs text-gray-300 mt-1">{risk.description}</p>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ToolCategory>('all');
  const [animating, setAnimating] = useState(false);

  const filteredTools = useMemo(() => {
    if (activeFilter === 'all') {
      return TOOLS_DATA;
    }
    return TOOLS_DATA.filter(tool => tool.categories.includes(activeFilter));
  }, [activeFilter]);
  
  const handleFilterClick = (filter: ToolCategory) => {
    if (filter === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
        setActiveFilter(filter);
        setAnimating(false);
    }, 200);
  };


  const filters: { label: string; value: ToolCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Arc Flash', value: 'arc-flash' },
    { label: 'Shock Hazard', value: 'shock-hazard' },
    { label: 'Compliance', value: 'compliance' },
    { label: 'DC Systems', value: 'dc-systems' },
    { label: 'AC Systems', value: 'ac-systems' },
  ];

  const handleScrollToToolkit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const toolkitElement = document.getElementById('toolkit');
    if (toolkitElement) {
      toolkitElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const featuredTools = ['ac-arc-flash', 'ac-shock-hazard', 'ppe-selector'];
  const featuredToolsData = TOOLS_DATA.filter(tool => featuredTools.includes(tool.id));

  return (
    <>
      <style>{`
        .hero-bg {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background: radial-gradient(ellipse at 50% 30%, #0a0f1e, #0a0f1e 40%, transparent 80%);
        }
        .hero-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background: 
                linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: pan 20s linear infinite;
            mask-image: radial-gradient(ellipse at center, white 20%, transparent 70%);
        }
        @keyframes pan {
            from { background-position: 0 0; }
            to { background-position: 3rem 3rem; }
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: var(--thumb-color, #0ea5e9);
            cursor: pointer;
            border: 4px solid #1e293b;
            margin-top: -9px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
            box-shadow: 0 0 10px var(--thumb-color, #0ea5e9);
        }
        .toolkit-grid { transition: opacity 0.2s ease-out; }
        .toolkit-grid.animating { opacity: 0; }
        .toolkit-grid .tool-card-wrapper { transition: transform 0.3s ease-out, opacity 0.3s ease-out; }
      `}</style>
      
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="hero-bg"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 text-shadow-lg shadow-cyan-500/50">
            Don't Just Read The Standards.<br />Experience Them.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The definitive suite of interactive simulators for arc flash, shock hazard, and electrical safety compliance. Turn theory into intuition, safely.
          </p>
          <HeroMiniSimulator />
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-[#0a0f1e]">
        <h2 className="text-4xl font-bold text-white mb-4">Why Choose the ELECTRO-SAFE Suite?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          Go beyond static textbooks and passive training. Our interactive simulators provide a dynamic learning environment where you can safely explore the consequences of your decisions, building the critical intuition needed in the field.
        </p>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#141a2b] p-6 rounded-lg border border-cyan-500/20 transform hover:-translate-y-2 transition-transform duration-300">
            <i className="fas fa-drafting-compass text-3xl text-cyan-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Bridge Theory and Practice</h3>
            <p className="text-gray-400 text-sm">Visualize complex formulas from IEEE 1584 and IEC 60479. See how changing voltage, current, or distance directly impacts incident energy and shock severity, turning abstract concepts into tangible understanding.</p>
          </div>
          <div className="bg-[#141a2b] p-6 rounded-lg border border-cyan-500/20 transform hover:-translate-y-2 transition-transform duration-300">
            <i className="fas fa-shield-virus text-3xl text-cyan-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Safe, Risk-Free Learning</h3>
            <p className="text-gray-400 text-sm">Experiment with dangerous scenarios without any real-world risk. Understand the devastating effects of an arc flash or a severe shock in a controlled environment, reinforcing the importance of proper safety procedures.</p>
          </div>
          <div className="bg-[#141a2b] p-6 rounded-lg border border-cyan-500/20 transform hover:-translate-y-2 transition-transform duration-300">
            <i className="fas fa-book-open text-3xl text-cyan-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Enhance Compliance & Training</h3>
            <p className="text-gray-400 text-sm">An invaluable tool for safety meetings, qualified worker training, and reinforcing NFPA 70E compliance. Use the simulators to demonstrate hazards and justify safety protocols to your team and management.</p>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-[#141a2b]">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Simulators</h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-12">Get started with our most essential tools for comprehensive electrical safety analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredToolsData.map(tool => (
                     <Link to={tool.path} key={tool.id} className="block bg-[#0a0f1e] rounded-2xl p-8 text-center border border-cyan-500/20 transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10">
                        <i className={`${tool.icon} text-5xl text-cyan-400 mb-6`}></i>
                        <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                        <p className="text-gray-400 text-sm mb-6">{tool.description}</p>
                        <span className="font-semibold text-cyan-400">Launch Simulator &rarr;</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>


      <section id="toolkit" className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">The Complete Electrical Safety Toolkit</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Select a category to filter our growing library of professional-grade simulation and calculation tools.
        </p>
        
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => handleFilterClick(filter.value)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeFilter === filter.value ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20' : 'bg-[#141a2b] text-gray-300 border border-cyan-500/20 hover:bg-cyan-500/20 hover:text-white'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className={`container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 toolkit-grid ${animating ? 'animating' : ''}`}>
          {filteredTools.map(tool => (
            <div key={tool.id} className="tool-card-wrapper">
                <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0a0f1e] py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Grounded in Established Safety Principles</h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-10">
                Our simulators are developed for educational purposes and are informed by the foundational principles and formulas found within key industry safety standards. This approach helps ensure our content is relevant and aligns with best practices for electrical safety risk assessment.
            </p>
            <div className="flex justify-center items-center flex-wrap gap-x-12 sm:gap-x-16 gap-y-8 text-gray-500">
                <div className="text-4xl font-black tracking-wider">NFPA</div>
                <div className="text-4xl font-black tracking-wider">IEEE</div>
                <div className="text-4xl font-black tracking-wider">OSHA</div>
                <div className="text-4xl font-black tracking-wider">IEC</div>
            </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#141a2b]">
          <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Empowering Professionals at Every Level</h2>
              <p className="text-gray-400 max-w-3xl mx-auto mb-12">
                  Whether you're designing systems, managing safety programs, or working in the field, our tools provide valuable insights to enhance your decision-making process.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="bg-[#0a0f1e] p-8 rounded-lg border border-cyan-500/20">
                      <h3 className="text-2xl font-bold text-cyan-400 mb-3">For Electrical Engineers</h3>
                      <p className="text-gray-400">Quickly run 'what-if' scenarios to understand how system parameter changes affect arc flash and shock hazards during the design phase. A powerful aid for validating protection schemes and performing preliminary risk assessments.</p>
                  </div>
                  <div className="bg-[#0a0f1e] p-8 rounded-lg border border-cyan-500/20">
                      <h3 className="text-2xl font-bold text-cyan-400 mb-3">For Safety Managers</h3>
                      <p className="text-gray-400">Use our visual tools in training sessions to make a lasting impact. Clearly demonstrate the dangers of non-compliance and the life-saving importance of proper PPE and safe work boundaries as mandated by OSHA and NFPA 70E.</p>
                  </div>
                  <div className="bg-[#0a0f1e] p-8 rounded-lg border border-cyan-500/20">
                      <h3 className="text-2xl font-bold text-cyan-400 mb-3">For Field Technicians</h3>
                      <p className="text-gray-400">Sharpen your hazard recognition skills. Before starting a job, run a quick simulation based on the equipment nameplate data to reinforce your understanding of the specific risks you'll face, helping you stay vigilant and safe.</p>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
};

export default HomePage;