import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleToolkitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
        document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer id="footer" className="bg-[#141a2b] text-[#9a9a9a] py-4 px-[5%] border-t border-cyan-500/20 flex-shrink-0">
      <div className="container mx-auto">
        {/* Top section: Logo, Nav, Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-extrabold text-white tracking-tighter">
            <Link to="/">ELECTRO-SAFE</Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="/#toolkit" onClick={handleToolkitClick} className="hover:text-cyan-400 transition-colors">Our Tools</a>
            <Link to="/safety-standards" className="hover:text-cyan-400 transition-colors">Safety Standards</Link>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
            <Link to="/terms-of-service" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          </nav>

          <div className="flex space-x-6 text-xl">
            <a href="https://linkedin.com/in/anilsharma" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors"><i className="fab fa-linkedin"></i></a>
            <a href="https://twitter.com/anilsharma" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cyan-400 transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="mailto:info.onesharma@gmail.com" aria-label="Email" className="hover:text-cyan-400 transition-colors"><i className="fas fa-envelope"></i></a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-cyan-500/10"></div>

        <div className="text-center text-xs text-gray-500 mb-4 px-4">
            <strong>Disclaimer:</strong> For educational use only. Always consult a qualified professional and adhere to safety standards.
        </div>

        {/* Bottom section: Copyright */}
        <div className="flex flex-col sm:flex-row justify-center items-center text-center text-xs gap-2">
          <p>Created by Anil Sharma | &copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;