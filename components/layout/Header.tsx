import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOOLS_DATA } from '../../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsToolsMenuOpen(false);
        }
    };

    if (isToolsMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToolsMenuOpen]);
  
  const handleToolkitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsToolsMenuOpen(false); // Close menu on click
    navigate('/');
    setTimeout(() => {
        document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLinkClick = () => {
    setIsToolsMenuOpen(false); // Close menu on link click
  };

  return (
    <header className={`fixed top-0 left-0 w-full px-[5%] py-3 flex justify-between items-center z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1e]/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'}`}>
      <Link to="/" className="text-2xl font-extrabold text-white tracking-tighter">ELECTRO-SAFE</Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm text-white">
        <Link to="/" className="font-medium hover:text-cyan-400 transition-colors">Home</Link>
        <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="font-medium hover:text-cyan-400 transition-colors flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={isToolsMenuOpen}
            >
                Our Tools <i className={`fas fa-chevron-down fa-xs transition-transform duration-200 ${isToolsMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-[#141a2b] border border-cyan-500/20 rounded-lg shadow-lg transition-all duration-300 max-h-[70vh] overflow-y-auto ${isToolsMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <a href="/#toolkit" onClick={handleToolkitClick} className="block px-4 py-2 text-sm hover:bg-cyan-500/20 font-bold">
                    <i className="fas fa-th-large fa-fw mr-2 text-cyan-400"></i>
                    View All Tools on Page
                </a>
                <div className="h-px bg-cyan-500/20 my-1"></div>
                {TOOLS_DATA.filter(tool => tool.status === 'available').map(tool => (
                    <Link key={tool.id} to={tool.path} onClick={handleLinkClick} className="block px-4 py-2 text-sm hover:bg-cyan-500/20">
                        <i className={`${tool.icon} fa-fw mr-2 text-cyan-400`}></i>
                        {tool.title}
                    </Link>
                ))}
            </div>
        </div>
        <Link to="/safety-standards" className="font-medium hover:text-cyan-400 transition-colors">Safety Standards</Link>
        <Link to="/about" className="font-medium hover:text-cyan-400 transition-colors">About</Link>
        <Link to="/contact" className="font-medium hover:text-cyan-400 transition-colors">Contact</Link>
        <Link to="/terms-of-service" className="font-medium hover:text-cyan-400 transition-colors">Terms</Link>
        <Link to="/privacy-policy" className="font-medium hover:text-cyan-400 transition-colors">Privacy</Link>
      </nav>
    </header>
  );
};

export default Header;