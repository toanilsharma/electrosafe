import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import SafetyCoPilot from '../ai/SafetyCoPilot';
import { COPILOT_MESSAGES, TOOLS_DATA } from '../../constants';

interface ToolPageLayoutProps {
  children: React.ReactNode;
  toolId: string;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ children, toolId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isCoPilotOpen, setIsCoPilotOpen] = useState(false);
  const [activeAlertKeys, setActiveAlertKeys] = useState<Set<string>>(new Set());

  const getCannedResponse = useCallback((key: string, value?: any) => {
    const toolMessages = COPILOT_MESSAGES[toolId] || {};
    if (toolMessages[key]) {
      return toolMessages[key](value);
    }
    return null;
  }, [toolId]);

  const addMessage = useCallback((newMessage: string) => {
    setMessages(prev => [...prev, newMessage]);
    if (!isCoPilotOpen) {
      setIsCoPilotOpen(true);
    }
  }, [isCoPilotOpen]);
  
  const manageAlert = useCallback((key: string, condition: boolean, value?: any) => {
    if (condition && !activeAlertKeys.has(key)) {
      const message = getCannedResponse(key, value);
      if (message) {
        addMessage(message);
        setActiveAlertKeys(prev => new Set(prev).add(key));
      }
    } else if (!condition && activeAlertKeys.has(key)) {
      setActiveAlertKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  }, [activeAlertKeys, addMessage, getCannedResponse]);

  useEffect(() => {
    const tool = TOOLS_DATA.find(t => t.id === toolId);
    const toolTitle = tool ? tool.title : "Tool";
    const welcomeMessage = COPILOT_MESSAGES[toolId]?.WELCOME?.() || COPILOT_MESSAGES.default.WELCOME(toolTitle);
    setMessages([welcomeMessage]);
    setActiveAlertKeys(new Set());
    setIsCoPilotOpen(false);
  }, [toolId]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, tool, key, value } = event.data;
      if (type !== 'SAFETY_ALERT' || tool !== toolId) {
        return;
      }
      
      // Use a switch for more complex, stateful logic
      switch (key) {
        case 'IE_DANGEROUS':
          manageAlert(key, value > 40, value.toFixed(1));
          break;
        case 'IE_HIGH':
          manageAlert(key, value > 8 && value <= 40, value.toFixed(1));
          break;
        case 'BOUNDARY_INTRUSION':
          manageAlert(key, value.workingDistance < value.arcBoundary, value);
          break;
        case 'FIBRILLATION_RISK':
          manageAlert(key, value >= 50, value.toFixed(1));
          break;
        case 'CANNOT_LET_GO':
          manageAlert(key, value >= 10 && value < 50, value.toFixed(1));
          break;
        case 'WET_CONDITIONS':
          manageAlert(key, value === true);
          break;
        case 'PPE_EFFECTIVE':
            manageAlert(key, value === true);
            break;
        case 'SEVERE_BURN_RISK':
            manageAlert(key, value >= 50, value.toFixed(1));
            break;
        case 'PAINFUL_SHOCK':
            manageAlert(key, value >= 10 && value < 50, value.toFixed(1));
            break;
        case 'GFP_TRIP':
            manageAlert(key, value.faultCurrent >= value.tripThreshold, value);
            break;
        case 'GFP_DANGEROUS_FAULT':
            manageAlert(key, value.faultCurrent >= 50 && value.faultCurrent < value.tripThreshold, value);
            break;
        case 'GFP_PAINFUL_SHOCK':
            manageAlert(key, value.faultCurrent >= 10 && value.faultCurrent < 50 && value.faultCurrent < value.tripThreshold, value);
            break;
        default:
          const message = getCannedResponse(key, value);
          if (message) addMessage(message);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [toolId, getCannedResponse, addMessage, manageAlert]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col pt-16">
      <Header />
      <main className="flex-grow h-0">
        {children}
      </main>
      <SafetyCoPilot 
        messages={messages}
        isOpen={isCoPilotOpen}
        setIsOpen={setIsCoPilotOpen}
      />
      <Footer />
    </div>
  );
};

export default ToolPageLayout;