import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import App from './App.tsx';
import './styles/global.css';
import { scribe } from './scribe.ts';
import Backdop from './components/backdop/Backdop';

console.log(scribe);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Backdop />
      <main className="main">
        <App />
      </main>
    </ErrorBoundary>
  </React.StrictMode>
);
