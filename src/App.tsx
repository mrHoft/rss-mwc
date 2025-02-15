import React from 'react';
import { Context } from '~/entities/context';
import { Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './entities/store/store.ts';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';
import PageHome from './pages/home/Home.tsx';
import PageDetails from './pages/details/Details.tsx';
import Page404 from './pages/404/404.tsx';

const App: React.FC = () => {
  const { theme } = React.useContext(Context);

  return (
    <div className={`theme ${theme}`}>
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
    </div>
  );
};

export default App;
