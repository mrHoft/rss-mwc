import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/error/ErrorBoundary.tsx';
import App from './App.tsx';
import './styles/global.css';
import { scribe } from './scribe.ts';
import Header from './components/header/Header.tsx';
import Backdop from './components/backdop/Backdop';

console.log(scribe);

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Header />
        <main className="main">
          <Backdop />
          <App />
        </main>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
