import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import ProductSection from './sections/ProductSection';
import Section6 from './sections/Section6';

import MultiStepRegForm from './components/Registration/MultiStepForm';
import MultiStepLoginForm from './components/Login/MultiStepForm';

import MultiStepForm from './components/Login/MultiStepForm';
import Offers from './components/Login/Offers';

import ShopLoginPage from './pages/ShopJourney/LoginPage';
import ShopPage from './pages/ShopJourney/ShopPage';

import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CallToAction from "./pages/CallToAction";

import UserManagement from './components/UserManagement';
import AdminManagement from './components/AdminManagement';
import OffersManagement from './components/OffersManagement';


function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // You can handle route change here
    console.log("Route changed to:", location.pathname);
  }, [location]);
  
  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <Section4 /> */}
      {/* <Section5 /> */}
      {/* <ProductSection /> */}
      <Section6 />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} /> */}
        <Route path="/register" element={<MultiStepForm />} />
        <Route path="/login" element={<MultiStepForm />} />
        <Route path="/loan-journey" element={<MultiStepForm />} />
        <Route path="/loan-journey/offers" element={<Offers />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/loan-journey" replace />} />
        {/* <Route path="/shop-journey" element={<MultiStepForm />} /> */}
        <Route path="/shop-journey" element={<ShopLoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/call-to-action" element={<CallToAction />} />
        <Route path="/admin/users" element={<AdminManagement />} />
        <Route path="/admin/offers" element={<OffersManagement />} />
      </Routes>
    </Router>
  );
}

export default App;