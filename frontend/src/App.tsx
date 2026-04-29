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
import Blog from "./pages/Blog";
import OurServices from "./pages/OurServices";
import WhatsAppButton from "./components/WhatsAppButton";
import OurProducts from "./pages/OurProducts";

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
            <Route path="/ecommerce-application" element={<Ecommerce />} />
            <Route path="/business-website-designing" element={<BusinessWebDesign />} />
            <Route path="/digital-showcase" element={<DigitalShowcase />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions/" element={<TermsAndConditions />} />
            <Route path="/refund-policy/" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/our-products" element={<OurProducts />} />
            <Route path="/web-design-in-salem" element={<Blog />} />
            <Route path="/web-design-in-namakkal" element={<Blog />} />
            <Route path="/web-design-in-dharmapuri" element={<Blog />} />
            <Route path="/web-design-in-krishnagiri" element={<Blog />} />
            <Route path="/web-design-in-hosur" element={<Blog />} />
            <Route path="/web-design-in-erode" element={<Blog />} />
            <Route path="/web-design-in-tirupur" element={<Blog />} />
            <Route path="/web-design-in-coimbatore" element={<Blog />} />
            <Route path="/product/:slug" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
