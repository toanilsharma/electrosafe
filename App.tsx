import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './components/layout/MainLayout';
import ACArcFlashPage from './pages/ACArcFlashPage';
import DCShockHazardPage from './pages/DCShockHazardPage';
import DCArcFlashPage from './pages/DCArcFlashPage';
import ACShockHazardPage from './pages/ACShockHazardPage';
import ToolPageLayout from './components/layout/ToolPageLayout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SafetyStandardsPage from './pages/SafetyStandardsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PPESelectorPage from './pages/PPESelectorPage';
import GFPSimulatorPage from './pages/GFPSimulatorPage';
import NFPA70ETablesPage from './pages/NFPA70ETablesPage';
import ApproachBoundaryCalcPage from './pages/ApproachBoundaryCalcPage';
import ArcFlashLabelGeneratorPage from './pages/ArcFlashLabelGeneratorPage';
import HazardousLocationGuidePage from './pages/HazardousLocationGuidePage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/safety-standards" element={<MainLayout><SafetyStandardsPage /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
        <Route path="/terms-of-service" element={<MainLayout><TermsOfServicePage /></MainLayout>} />
        
        <Route 
          path="/ac-arc-flash" 
          element={
            <ToolPageLayout toolId="ac-arc-flash">
              <ACArcFlashPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/ac-shock-hazard" 
          element={
            <ToolPageLayout toolId="ac-shock-hazard">
              <ACShockHazardPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/dc-arc-flash" 
          element={
            <ToolPageLayout toolId="dc-arc-flash">
              <DCArcFlashPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/dc-shock-hazard" 
          element={
            <ToolPageLayout toolId="dc-shock-hazard">
              <DCShockHazardPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/ppe-selector" 
          element={
            <ToolPageLayout toolId="ppe-selector">
              <PPESelectorPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/gfp-simulator" 
          element={
            <ToolPageLayout toolId="gfp-simulator">
              <GFPSimulatorPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/nfpa70e-tables" 
          element={
            <ToolPageLayout toolId="nfpa70e-tables">
              <NFPA70ETablesPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/approach-boundary-calc" 
          element={
            <ToolPageLayout toolId="approach-boundary-calc">
              <ApproachBoundaryCalcPage />
            </ToolPageLayout>
          } 
        />
         <Route 
          path="/arc-flash-label-generator" 
          element={
            <ToolPageLayout toolId="arc-flash-label-generator">
              <ArcFlashLabelGeneratorPage />
            </ToolPageLayout>
          } 
        />
        <Route 
          path="/hazardous-location-guide" 
          element={
            <ToolPageLayout toolId="hazardous-location-guide">
              <HazardousLocationGuidePage />
            </ToolPageLayout>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;