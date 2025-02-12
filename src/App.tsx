import React from 'react';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';
import { ContextProvider } from './entities/context.tsx';
import { Routes, Route } from 'react-router';
import PageHome from './pages/home/Home.tsx';
import PageDetails from './pages/details/Details.tsx';
import Page404 from './pages/404/404.tsx';

import { Provider } from 'react-redux';
import { store } from './entities/store/store.ts';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Header />
      <main className="main">
        <Backdop />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<PageHome />}>
              <Route path="details/:id" element={<PageDetails />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Provider>
      </main>
    </ContextProvider>
  );
};

export default App;
