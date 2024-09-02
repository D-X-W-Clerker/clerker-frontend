import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/project-detail" element={<ProjectDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
