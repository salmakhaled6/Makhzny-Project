import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import RentNow from './Pages/RentNow';
import { AuthProvider } from './Contexts/AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

import Signature from './Pages/Signature';
import TransferRequest from './Pages/Transfer/TransferRequest';
import Form from './Pages/Transfer/Form';
import TransferOrder from './Pages/Transfer/TransferOrder';
import ApplicationForm from './Pages/Employment/ApplicationForm';
import RequestQuote from './Pages/RequestQuote/RequestQuote';
import HowItWorks from './Pages/HowItWorks';
import FAQ from './Pages/FAQ';
import BecomePartner from './Pages/BecomePartner';
import GetInTouch from './Pages/GetInTouch';
import TermsConditions from './Pages/TermsConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TransferPage from './Pages/Transfer/TransferPage';
import AccountLayout from './Pages/AccountLayout';
import MyUnits from './Components/MyUnits';
import Invoices from './Components/Invoices';
import Documents from './Components/Document';
import OurLocations from './Pages/OurLocations';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>
      import { FaEnvelope, FaLink, FaWhatsapp, FaPhone } from "react-icons/fa";

function App() {
  return (
    <AuthProvider> 
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RentNow" element={<RentNow />} />
        <Route path="/Signature" element={<Signature />} />
        <Route path="/TransferRequest" element={<TransferRequest />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/RequestQuote" element={<RequestQuote />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/HowitWorks" element={<HowItWorks />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/BecomePartner" element={<BecomePartner />} />
        <Route path="/ourlocations" element={<OurLocations />} />

        <Route path="/GetinTouch" element={<GetInTouch />} />
        <Route path="/TermsConditions" element={<TermsConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TransferOrder" element={<TransferPage />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="units" element={<MyUnits />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>

<div className="sticky-buttons">
  <a href="mailto:hello@makhzny.com" className="sticky-button" title="Email">
    <FaEnvelope />
  </a>

    <a href="https://makhzny.com/RequestQuote" className="sticky-button" title="Request a Quote">
  <FontAwesomeIcon icon={faCommentsDollar} />

  </a>
  <a href="https://api.whatsapp.com/send/?phone=%2B966920024021&amp;text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%0A%D8%A7%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A8%D8%AD%D8%AC%D8%B2%20%D9%85%D8%AE%D8%B2%D9%86&amp;type=phone_number" className="sticky-button" title="Whatsapp" target="_blank">
    <FaWhatsapp />
  </a>
  <a href="tel:+966920024021" className="sticky-button" title="Call" target="_blank">
    <FaPhone />
  </a>
 

</div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
