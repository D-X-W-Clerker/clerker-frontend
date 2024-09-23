import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OnboardingPage, ProjectDetailPage, MeetSummaryPage } from '@pages';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/project" element={<ProjectDetailPage />} />
          <Route path="/summary" element={<MeetSummaryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
