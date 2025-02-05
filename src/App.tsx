import React from 'react';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';
import { ContextProvider } from './entities/context.tsx';
import { Routes, Route } from 'react-router';
import PageHome from './pages/home/Home.tsx';
import PageCharacter from './pages/character/Character.tsx';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Header />
      <main className="main">
        <Backdop />
        <Routes>
          <Route path="/" element={<PageHome />}>
            <Route path="character/:id" element={<PageCharacter />} />
          </Route>
        </Routes>
      </main>
    </ContextProvider>
  );
};

export default App;
