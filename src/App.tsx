import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  OnboardingPage,
  ProjectDetailPage,
  TutorialDetailPage,
  TutorialPage,
} from '@pages';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/project-detail" element={<ProjectDetailPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/tutorial-detail" element={<TutorialDetailPage />} />
          <Route path="/project" element={<ProjectDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
