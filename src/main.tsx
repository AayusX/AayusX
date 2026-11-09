import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { initI18n } from './i18n';
import { bootstrapLanguage } from './i18n/bootstrap';
import './styles/index.css';

const language = bootstrapLanguage();
document.documentElement.lang = language;

async function start() {
  await initI18n(language);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

void start();
