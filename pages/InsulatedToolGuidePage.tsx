import React, { useEffect } from 'react';

const InsulatedToolGuidePage: React.FC = () => {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.insulated-tool-guide-wrapper .nav-list a');
    const contentPanel = document.querySelector('.insulated-tool-guide-wrapper .content-panel');

    const handleClick = (e: Event) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement && contentPanel) {
                contentPanel.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            }
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', handleClick);
    });

    return () => {
        navLinks.forEach(link => {
            link.removeEventListener('click', handleClick);
        });
    };
  }, []);

  return (
    <div className="insulated-tool-guide-wrapper">
      <style>{`
        .insulated-tool-guide-wrapper {
            background: linear-gradient(135deg, var(--bg-color), #27272a);
            color: var(--text-color);
            display: flex;
            flex-direction: column;
            padding: 10px;
            height: 100%;
            width: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --primary-color: #f97316; /* Orange */
            --bg-color: #18181b;      /* Zinc 900 */
            --panel-bg: rgba(39, 39, 42, 0.9); /* Zinc 800 */
            --border-color: rgba(249, 115, 22, 0.3);
            --text-color: #f4f4f5; /* Zinc 100 */
            --text-muted: #a1a1aa; /* Zinc 400 */
            --do-color: #22c55e; /* Green 500 */
            --dont-color: #ef4444; /* Red 500 */
        }
        .insulated-tool-guide-wrapper .container { 
            display: flex; flex: 1; gap: 15px; width: 100%; max-width: 1800px; margin: 0 auto; min-height: 0; 
        }
        .insulated-tool-guide-wrapper .nav-panel { 
            flex: 0 0 280px; background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); display: flex; flex-direction: column; 
        }
        .insulated-tool-guide-wrapper .content-panel { 
            flex: 1; background: var(--panel-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 30px; backdrop-filter: blur(10px); overflow-y: auto; 
            scroll-behavior: smooth;
            position: relative;
        }
        .insulated-tool-guide-wrapper .nav-title { font-size: 1.5rem; color: var(--primary-color); text-align: center; margin-bottom: 20px; }
        .insulated-tool-guide-wrapper .nav-list { list-style: none; padding: 0; }
        .insulated-tool-guide-wrapper .nav-item a { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 8px; text-decoration: none; color: var(--text-muted); transition: all 0.3s; margin-bottom: 5px; border-left: 3px solid transparent; }
        .insulated-tool-guide-wrapper .nav-item a:hover { background-color: rgba(249, 115, 22, 0.1); color: var(--primary-color); border-left-color: var(--primary-color); }
        .insulated-tool-guide-wrapper .nav-item a i { width: 20px; text-align: center; }
        .insulated-tool-guide-wrapper .content-section { margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
        .insulated-tool-guide-wrapper .content-section:last-child { border-bottom: none; }
        .insulated-tool-guide-wrapper .content-section h2 { font-size: 2rem; color: var(--primary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 12px; }
        .insulated-tool-guide-wrapper .content-section p, .insulated-tool-guide-wrapper .content-section li { font-size: 1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 10px; }
        .insulated-tool-guide-wrapper .content-section strong { color: var(--text-color); font-weight: 600; }
        .insulated-tool-guide-wrapper .content-section ul { padding-left: 20px; }
        .insulated-tool-guide-wrapper .highlight-box { background: rgba(249, 115, 22, 0.05); border: 1px solid var(--border-color); border-left-width: 4px; border-left-color: var(--primary-color); padding: 15px; border-radius: 8px; margin: 20px 0; }
        .insulated-tool-guide-wrapper .tool-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .insulated-tool-guide-wrapper .tool-card { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; text-align: center; }
        .insulated-tool-guide-wrapper .tool-card i { font-size: 2.5rem; color: var(--primary-color); margin-bottom: 10px; }
        .insulated-tool-guide-wrapper .tool-card h4 { font-size: 1.1rem; color: var(--text-color); }
        .insulated-tool-guide-wrapper .dos-donts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .insulated-tool-guide-wrapper .dos h3 { color: var(--do-color); }
        .insulated-tool-guide-wrapper .donts h3 { color: var(--dont-color); }
        .insulated-tool-guide-wrapper .dos ul li::marker, .insulated-tool-guide-wrapper .donts ul li::marker { font-weight: bold; }
        .insulated-tool-guide-wrapper .dos ul li::marker { color: var(--do-color); }
        .insulated-tool-guide-wrapper .donts ul li::marker { color: var(--dont-color); }
        @media (max-width: 1024px) {
            .insulated-tool-guide-wrapper .container { flex-direction: column; height: auto; }
            .insulated-tool-guide-wrapper .nav-panel { flex: 0 0 auto; }
            .insulated-tool-guide-wrapper .content-panel { overflow-y: visible; }
        }
        @media (max-width: 768px) {
            .insulated-tool-guide-wrapper .dos-donts-grid { grid-template-columns: 1fr; }
            .insulated-tool-guide-wrapper .content-section h2 { font-size: 1.5rem; }
        }
      `}</style>
      <div className="container">
        <div className="nav-panel">
            <h2 className="nav-title">Guide Sections</h2>
            <ul className="nav-list">
                <li className="nav-item"><a href="#introduction"><i className="fas fa-info-circle"></i> Introduction</a></li>
                <li className="nav-item"><a href="#standards"><i className="fas fa-certificate"></i> Key Standards</a></li>
                <li className="nav-item"><a href="#tools"><i className="fas fa-screwdriver-wrench"></i> Tool Types</a></li>
                <li className="nav-item"><a href="#dos"><i className="fas fa-check-circle"></i> Inspection & Care</a></li>
                <li className="nav-item"><a href="#donts"><i className="fas fa-times-circle"></i> Misuse & Damage</a></li>
                <li className="nav-item"><a href="#hazards"><i className="fas fa-triangle-exclamation"></i> Hazards & Risks</a></li>
            </ul>
        </div>
        <div className="content-panel">
            <section id="introduction" className="content-section">
                <h2><i className="fas fa-info-circle"></i> What are Insulated Tools?</h2>
                <p>Insulated tools are hand tools designed to protect workers from electric shock when working on or near live energized circuits. They are a critical component of an electrical safety program and are considered a last line of defense. While de-energizing equipment is always the safest option, there are situations where live work is necessary and permitted.</p>
                <p>These tools feature one or more layers of non-conductive material over the handles and shafts, isolating the user's hands from the conductive parts of the tool. This prevents a dangerous path for electricity to flow through the worker's body in the event of accidental contact with an energized conductor.</p>
            </section>

            <section id="standards" className="content-section">
                <h2><i className="fas fa-certificate"></i> Key Standards: The 1000V Rating</h2>
                <p>The primary standard for insulated hand tools is <strong>ASTM F1505</strong>, which is harmonized with the international standard <strong>IEC 60900</strong>. When you see a tool with the "1000V" and "double-triangle" symbols, it signifies compliance with these rigorous standards.</p>
                <div className="highlight-box">
                    <p><strong>Official Rating:</strong> Tools compliant with these standards are rated for use on live circuits up to <strong>1000V AC</strong> and <strong>1500V DC</strong>.</p>
                    <p><strong>Dielectric Testing:</strong> To earn this rating, every tool design is subjected to a <strong>10,000V AC</strong> test for 3 minutes to ensure its insulating properties are sound. This provides a significant safety margin.</p>
                </div>
                <p>Always look for the double-triangle symbol, the 1000V rating, and the manufacturer's name and part number printed directly on the tool. This confirms it has been tested to meet these critical safety standards.</p>
            </section>

            <section id="tools" className="content-section">
                <h2><i className="fas fa-screwdriver-wrench"></i> Common Tool Types & Applications</h2>
                <p>Insulated tools are required when working inside the <strong>Restricted Approach Boundary</strong> of exposed energized parts. A wide variety of hand tools are available in insulated versions:</p>
                <div className="tool-grid">
                    <div className="tool-card"> <i className="fas fa-screwdriver"></i> <h4>Screwdrivers<br/>(Slotted, Phillips, etc.)</h4> </div>
                    <div className="tool-card"> <i className="fas fa-grip-lines"></i> <h4>Pliers<br/>(Lineman's, Needle-Nose)</h4> </div>
                    <div className="tool-card"> <i className="fas fa-wrench"></i> <h4>Wrenches<br/>(Box, Open-End)</h4> </div>
                    <div className="tool-card"> <i className="fas fa-socket"></i> <h4>Nut Drivers<br/>& Socket Sets</h4> </div>
                    <div className="tool-card"> <i className="fas fa-cut"></i> <h4>Cable & Wire Cutters</h4> </div>
                    <div className="tool-card"> <i className="fas fa-key"></i> <h4>Hex Keys<br/>(Allen Wrenches)</h4> </div>
                </div>
            </section>

            <div className="dos-donts-grid">
                <section id="dos" className="content-section dos">
                    <h2><i className="fas fa-check-circle" style={{color: 'var(--do-color)'}}></i> Do: Inspection & Care</h2>
                    <p>Proper inspection and care are non-negotiable for ensuring tool integrity.</p>
                    <ul>
                        <li><strong>Inspect Before EVERY Use:</strong> Visually check the entire tool for any damage to the insulation.</li>
                        <li><strong>Look for Damage:</strong> Pay close attention to nicks, cuts, cracks, punctures, or signs of chemical contamination.</li>
                        <li><strong>Check Dual-Layer Insulation:</strong> Many tools have a yellow under-layer. If you can see yellow, the tool's insulation is compromised and it <strong>must be removed from service immediately.</strong></li>
                        <li><strong>Keep Clean & Dry:</strong> Wipe tools with a clean, dry cloth after use. Avoid abrasive or conductive cleaners.</li>
                        <li><strong>Store Properly:</strong> Keep insulated tools in a protective case or roll, separate from non-insulated tools to prevent mechanical damage.</li>
                    </ul>
                </section>

                <section id="donts" className="content-section donts">
                    <h2><i className="fas fa-times-circle" style={{color: 'var(--dont-color)'}}></i> Don't: Misuse & Damage</h2>
                    <p>Never compromise the tool's primary safety function.</p>
                    <ul>
                        <li><strong>Don't Use as a Pry Bar or Hammer:</strong> The insulation is not designed for heavy impact or mechanical stress.</li>
                        <li><strong>Don't Expose to Heat:</strong> Keep away from open flames, soldering irons, or other high-temperature sources that could melt the insulation.</li>
                        <li><strong>Don't Touch Uninsulated Parts:</strong> Only hold the tool by its insulated handles. Never touch the metal tip or shank during live work.</li>
                        <li><strong>Don't Use a Damaged Tool:</strong> There are no exceptions. If a tool fails inspection, destroy it to prevent accidental use by others.</li>
                        <li><strong>Don't Alter the Tool:</strong> Never grind, file, or modify an insulated tool in any way.</li>
                    </ul>
                </section>
            </div>

            <section id="hazards" className="content-section">
                <h2><i className="fas fa-triangle-exclamation"></i> Hazards & Risks</h2>
                <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                    <li style={{display: 'flex', alignItems: 'start', gap: '10px'}}>
                        <i className="fas fa-bolt" style={{color: 'var(--dont-color)', marginTop: '5px'}}></i>
                        <div><strong>Electric Shock & Electrocution:</strong> A compromised tool provides a direct path for current through the user's body, which can be fatal.</div>
                    </li>
                    <li style={{display: 'flex', alignItems: 'start', gap: '10px'}}>
                        <i className="fas fa-explosion" style={{color: 'var(--dont-color)', marginTop: '5px'}}></i>
                        <div><strong>Arc Flash Initiation:</strong> A dropped tool or one that slips and bridges two phases or phase-to-ground can initiate a catastrophic arc flash event, causing severe burns and blast injuries.</div>
                    </li>
                    <li style={{display: 'flex', alignItems: 'start', gap: '10px'}}>
                        <i className="fas fa-user-shield" style={{color: 'var(--dont-color)', marginTop: '5px'}}></i>
                        <div><strong>False Sense of Security:</strong> Assuming a tool is safe without proper inspection can lead to complacency and unsafe work practices, which is one of the biggest risks of all.</div>
                    </li>
                </ul>
            </section>
        </div>
      </div>
    </div>
  );
};

export default InsulatedToolGuidePage;