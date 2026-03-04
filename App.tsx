import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SkeletonLoader } from './components/SkeletonLoader';

// Lazy loaded components
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ToolAssessment = React.lazy(() => import('./pages/ToolAssessment').then(module => ({ default: module.ToolAssessment })));
const ToolLoadCalc = React.lazy(() => import('./pages/ToolLoadCalc').then(module => ({ default: module.ToolLoadCalc })));
const GuideProtection = React.lazy(() => import('./pages/GuideProtection').then(module => ({ default: module.GuideProtection })));
const Rooms = React.lazy(() => import('./pages/Rooms').then(module => ({ default: module.Rooms })));
const Appliances = React.lazy(() => import('./pages/Appliances').then(module => ({ default: module.Appliances })));
const Articles = React.lazy(() => import('./pages/Articles').then(module => ({ default: module.Articles })));
const Gallery = React.lazy(() => import('./pages/Gallery').then(module => ({ default: module.Gallery })));
const Downloads = React.lazy(() => import('./pages/Downloads').then(module => ({ default: module.Downloads })));
const RiskPredictor = React.lazy(() => import('./pages/RiskPredictor').then(module => ({ default: module.RiskPredictor })));
const ToolTenantRequest = React.lazy(() => import('./pages/ToolTenantRequest').then(module => ({ default: module.ToolTenantRequest })));
const HardwareGuide = React.lazy(() => import('./pages/HardwareGuide').then(module => ({ default: module.HardwareGuide })));
const NewHomeGuide = React.lazy(() => import('./pages/NewHomeGuide').then(module => ({ default: module.NewHomeGuide })));
const EverydaySafety = React.lazy(() => import('./pages/EverydaySafety').then(module => ({ default: module.EverydaySafety })));
const Legal = React.lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));
const ContactUs = React.lazy(() => import('./pages/ContactUs').then(module => ({ default: module.ContactUs })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Emergency = React.lazy(() => import('./pages/Emergency').then(module => ({ default: module.Emergency })));
const Standards = React.lazy(() => import('./pages/Standards'));
const QuickQuiz = React.lazy(() => import('./pages/QuickQuiz').then(module => ({ default: module.QuickQuiz })));
const EmbeddableBadge = React.lazy(() => import('./pages/EmbeddableBadge').then(module => ({ default: module.EmbeddableBadge })));

// NEW: Virality & Growth Pages
const ScorePage = React.lazy(() => import('./pages/ScorePage').then(module => ({ default: module.ScorePage })));
const ChallengePage = React.lazy(() => import('./pages/ChallengePage').then(module => ({ default: module.ChallengePage })));
const RoomAudit = React.lazy(() => import('./pages/RoomAudit').then(module => ({ default: module.RoomAudit })));
const Glossary = React.lazy(() => import('./pages/Glossary').then(module => ({ default: module.Glossary })));
const IsItSafe = React.lazy(() => import('./pages/IsItSafe').then(module => ({ default: module.IsItSafe })));
const BillDetector = React.lazy(() => import('./pages/BillDetector').then(module => ({ default: module.BillDetector })));
const MyHome = React.lazy(() => import('./pages/MyHome').then(module => ({ default: module.MyHome })));
const Landlords = React.lazy(() => import('./pages/Landlords').then(module => ({ default: module.Landlords })));
const Stories = React.lazy(() => import('./pages/Stories').then(module => ({ default: module.Stories })));
const SafetyCountryIndia = React.lazy(() => import('./pages/SafetyCountryIndia').then(module => ({ default: module.SafetyCountryIndia })));
const SafetyCountryUSA = React.lazy(() => import('./pages/SafetyCountryUSA').then(module => ({ default: module.SafetyCountryUSA })));
const SafetyCountryUK = React.lazy(() => import('./pages/SafetyCountryUK').then(module => ({ default: module.SafetyCountryUK })));

// Phase 2 Viral Features
const HomeBuyerScanner = React.lazy(() => import('./pages/HomeBuyerScanner').then(module => ({ default: module.HomeBuyerScanner })));
const QuoteAnalyzer = React.lazy(() => import('./pages/QuoteAnalyzer').then(module => ({ default: module.QuoteAnalyzer })));
const BreakerMapper = React.lazy(() => import('./pages/BreakerMapper').then(module => ({ default: module.BreakerMapper })));
const DIYPhotoQuiz = React.lazy(() => import('./pages/DIYPhotoQuiz').then(module => ({ default: module.DIYPhotoQuiz })));
const NurserySafety = React.lazy(() => import('./pages/NurserySafety').then(module => ({ default: module.NurserySafety })));
const EVChargerSizer = React.lazy(() => import('./pages/EVChargerSizer').then(module => ({ default: module.EVChargerSizer })));
const AlarmCalendar = React.lazy(() => import('./pages/AlarmCalendar').then(module => ({ default: module.AlarmCalendar })));
const TenantDemand = React.lazy(() => import('./pages/TenantDemand').then(module => ({ default: module.TenantDemand })));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<SkeletonLoader />}>
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
              <Route path="/articles/:slug" element={<Articles />} />
              <Route path="/about" element={<About />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/standards-and-sources" element={<Standards />} />
              <Route path="/quick-quiz" element={<QuickQuiz />} />
              <Route path="/badge" element={<EmbeddableBadge />} />
              {/* Virality & Growth Features */}
              <Route path="/score" element={<ScorePage />} />
              <Route path="/challenge" element={<ChallengePage />} />
              <Route path="/room-audit" element={<RoomAudit />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/is-it-safe" element={<IsItSafe />} />
              <Route path="/bill-detector" element={<BillDetector />} />
              <Route path="/my-home" element={<MyHome />} />
              <Route path="/landlords" element={<Landlords />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/safety/india" element={<SafetyCountryIndia />} />
              <Route path="/safety/usa" element={<SafetyCountryUSA />} />
              <Route path="/safety/uk" element={<SafetyCountryUK />} />
              
              {/* Phase 2 Viral Features */}
              <Route path="/home-buyer-scanner" element={<HomeBuyerScanner />} />
              <Route path="/quote-analyzer" element={<QuoteAnalyzer />} />
              <Route path="/breaker-mapper" element={<BreakerMapper />} />
              <Route path="/diy-quiz" element={<DIYPhotoQuiz />} />
              <Route path="/nursery-safety" element={<NurserySafety />} />
              <Route path="/ev-charger" element={<EVChargerSizer />} />
              <Route path="/alarm-calendar" element={<AlarmCalendar />} />
              <Route path="/tenant-demand" element={<TenantDemand />} />
              
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
