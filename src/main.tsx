import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/error/ErrorBoundary.tsx';
import App from './App.tsx';
import './styles/global.css';
import { scribe } from './scribe.ts';

console.log(scribe);

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
