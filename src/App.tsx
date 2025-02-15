import React from 'react';
import { Context } from '~/entities/context';
import { Routes, Route, Outlet } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './entities/store/store.ts';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';
import PageDetails from './pages/details/Details.tsx';
import Page404 from './pages/404/404.tsx';
import CharactersList from './pages/list/List.tsx';
import Message from './components/message/message.tsx';

const Layout = () => {
  const { theme } = React.useContext(Context);

  return (
    <div className={`theme ${theme}`}>
      <Header />
      <main className="main">
        <Backdop />
        <Provider store={store}>
          <CharactersList />
          <Outlet />
        </Provider>
      </main>
      <Message />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="details/:id" element={<PageDetails />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
