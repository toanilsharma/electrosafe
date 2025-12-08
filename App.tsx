
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ToolAssessment } from './pages/ToolAssessment';
import { ToolLoadCalc } from './pages/ToolLoadCalc';
import { GuideProtection } from './pages/GuideProtection';
import { Rooms } from './pages/Rooms';
import { Appliances } from './pages/Appliances';
import { Articles } from './pages/Articles';
import { Gallery } from './pages/Gallery';
import { Downloads } from './pages/Downloads';
import { RiskPredictor } from './pages/RiskPredictor';
import { ToolTenantRequest } from './pages/ToolTenantRequest';
import { HardwareGuide } from './pages/HardwareGuide';
import { NewHomeGuide } from './pages/NewHomeGuide';
import { EverydaySafety } from './pages/EverydaySafety';
import { Legal } from './pages/Legal';
import { ContactUs } from './pages/ContactUs';
import { Emergency } from './pages/Emergency';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<ToolAssessment />} />
            <Route path="/load-calc" element={<ToolLoadCalc />} />
            <Route path="/risk-predictor" element={<RiskPredictor />} />
            <Route path="/tenant-request" element={<ToolTenantRequest />} />
            <Route path="/protection-guide" element={<GuideProtection />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/hardware" element={<HardwareGuide />} />
            <Route path="/new-home" element={<NewHomeGuide />} />
            <Route path="/everyday-safety" element={<EverydaySafety />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
