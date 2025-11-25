import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../components/main/Layout';
import Home from '../pages/Home';
import Subscription from '../pages/Subscription';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Profile from '../pages/Profile';
import TermsAndConditions from '../pages/TermsAndConditions';
import HIPAADisclaimer from '../pages/HIPAADisclaimer';
import FAQPage from '../pages/FAQPage';
import QuestionnaireChat from '../pages/QuestionnaireChat';
import VoiceRecording from '../pages/VoiceRecording.tsx';
import VoiceChat from '../pages/VoiceChat';
import { ROUTES } from '../config/routes';




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

        <Route path={ROUTES.QUESTIONNAIRE_CHAT} element={
          <Layout onLogout={onLogout}>
            <QuestionnaireChat />
          </Layout>
        } />

        <Route path={ROUTES.VOICE_RECORDING} element={
  <Layout onLogout={onLogout}>
    <VoiceRecording />
  </Layout>
} />
        
        <Route path={ROUTES.VOICE_CHAT} element={
  <Layout onLogout={onLogout}>
    <VoiceChat />
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
            <FAQPage />
          </Layout>
        } />
        
        <Route path={ROUTES.LEGAL.TERMS_CONDITIONS} element={
          <Layout onLogout={onLogout}>
            <TermsAndConditions />
          </Layout>
        } />
        
        <Route path={ROUTES.LEGAL.HIPAA_DISCLAIMER} element={
          <Layout onLogout={onLogout}>
            <HIPAADisclaimer />
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