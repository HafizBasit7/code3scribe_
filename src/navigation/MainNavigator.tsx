import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../components/main/Layout';
import Home from '../pages/Home';
import Subscription from '../pages/Subscription';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Profile from '../pages/Profile';
import { ROUTES } from '../config/routes';


// Import other pages as you create them
// import ProtocolHub from '../pages/ProtocolHub';
// import FindJobs from '../pages/FindJobs';
// import TermsConditions from '../pages/TermsConditions';
// etc.

interface MainNavigatorProps {
  onLogout: () => void;
}

const MainNavigator: React.FC<MainNavigatorProps> = ({ onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={
          <Layout onLogout={onLogout}>
            <Home />
          </Layout>
        } />
        
        <Route path={ROUTES.SUBSCRIPTION} element={
          <Layout onLogout={onLogout}>
            <Subscription />
          </Layout>
        } />
        
        <Route path={ROUTES.LEGAL.PRIVACY_POLICY} element={
          <Layout onLogout={onLogout}>
            <PrivacyPolicy />
          </Layout>
        } />

         {/* Add Profile Route */}
        <Route path={ROUTES.PROFILE} element={
          <Layout onLogout={onLogout}>
            <Profile />
          </Layout>
        } />
        
        {/* Add other routes */}
        <Route path={ROUTES.PROTOCOL_HUB} element={
          <Layout onLogout={onLogout}>
            <div>Protocol Hub Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.FIND_JOBS} element={
          <Layout onLogout={onLogout}>
            <div>Find Jobs Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.FAQ} element={
          <Layout onLogout={onLogout}>
            <div>FAQ Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.LEGAL.TERMS_CONDITIONS} element={
          <Layout onLogout={onLogout}>
            <div>Terms & Conditions Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.LEGAL.HIPAA_DISCLAIMER} element={
          <Layout onLogout={onLogout}>
            <div>HIPAA Disclaimer Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.FEEDBACK.REPORT_PROBLEM} element={
          <Layout onLogout={onLogout}>
            <div>Report a Problem Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.FEEDBACK.APP_FEEDBACK} element={
          <Layout onLogout={onLogout}>
            <div>App Feedback Page</div>
          </Layout>
        } />
        
        <Route path={ROUTES.DELETE_ACCOUNT} element={
          <Layout onLogout={onLogout}>
            <div>Delete Account Page</div>
          </Layout>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={
          <Layout onLogout={onLogout}>
            <div>Page Not Found</div>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;