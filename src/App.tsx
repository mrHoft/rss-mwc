import React from 'react';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';
import CharactersList from './pages/characterList/Page';
import { ContextProvider } from './entities/context.tsx';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Header />
      <main className="main">
        <Backdop />
        <CharactersList />
      </main>
    </ContextProvider>
  );
};

export default App;
