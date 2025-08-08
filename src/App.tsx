import React from 'react';
import { ContentProvider } from './contexts/ContentContext';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <ContentProvider>
      <LandingPage />
    </ContentProvider>
  );
}

export default App;