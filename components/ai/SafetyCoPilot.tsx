import React, { useState, useEffect, useRef } from 'react';

interface SafetyCoPilotProps {
  messages: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SafetyCoPilot: React.FC<SafetyCoPilotProps> = ({ messages, isOpen, setIsOpen }) => {
  const [displayMessages, setDisplayMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageQueue = useRef<string[]>([]);
  const processing = useRef(false);

  useEffect(() => {
    // When messages prop updates, add new messages to the queue
    const newMessages = messages.slice(displayMessages.length);
    messageQueue.current.push(...newMessages);
    
    const processQueue = () => {
        if (processing.current || messageQueue.current.length === 0) {
            return;
        }
        processing.current = true;
        setIsTyping(true);

        setTimeout(() => {
            const nextMessage = messageQueue.current.shift();
            if (nextMessage) {
                setDisplayMessages(prev => [...prev, nextMessage]);
            }
            setIsTyping(false);
            processing.current = false;
            // Immediately check for more messages
            setTimeout(processQueue, 100); 
        }, 700); // Typing delay
    }

    processQueue();

  }, [messages, displayMessages.length]);

  useEffect(() => {
    // Handles resetting when the tool changes
    if (messages.length === 1 && displayMessages.length > 1) {
        setDisplayMessages([]);
        messageQueue.current = [messages[0]];
    }
  }, [messages, displayMessages]);


  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayMessages, isTyping, isOpen]);

  const parseMessage = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const html = text.replace(boldRegex, '<strong>$1</strong>').replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-[100] ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label="Toggle Safety Co-Pilot"
      >
        <i className="fas fa-brain text-2xl"></i>
      </button>

      <div
        className={`fixed bottom-8 right-8 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-[#141a2b]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col transition-all duration-500 ease-in-out z-[100] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <i className="fas fa-brain text-cyan-400"></i>
            <h3 className="font-bold text-white">Safety Co-Pilot</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto">
          {displayMessages.map((msg, index) => (
            <div key={index} className="mb-4 flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center">
                <i className="fas fa-brain text-cyan-400 text-sm"></i>
              </div>
              <div className="bg-[#0a0f1e]/50 rounded-lg p-3 text-sm text-gray-300 leading-relaxed border border-cyan-500/10" dangerouslySetInnerHTML={parseMessage(msg)} />
            </div>
          ))}

          {isTyping && (
             <div className="mb-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center">
                <i className="fas fa-brain text-cyan-400 text-sm"></i>
              </div>
              <div className="bg-[#0a0f1e]/50 rounded-lg p-3 text-sm text-gray-300 leading-relaxed inline-flex items-center gap-1">
                 <span className="typing-dot"></span>
                 <span className="typing-dot" style={{animationDelay: '0.2s'}}></span>
                 <span className="typing-dot" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.4s ease forwards;
        }
        @keyframes typing-bubble {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-3px); }
        }
        .typing-dot {
            width: 6px; height: 6px; background-color: #67e8f9; border-radius: 50%; display: inline-block;
            animation: typing-bubble 1.2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default SafetyCoPilot;
