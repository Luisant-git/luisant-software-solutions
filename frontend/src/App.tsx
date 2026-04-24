/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Ecommerce from "./pages/Ecommerce";
import BusinessWebDesign from "./pages/BusinessWebDesign";
import DigitalShowcase from "./pages/DigitalShowcase";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/customer-enquiry-form" element={<Appointment />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/business-design" element={<BusinessWebDesign />} />
            <Route path="/digital-showcase" element={<DigitalShowcase />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions/" element={<TermsAndConditions />} />
            <Route path="/refund-policy/" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:slug" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
