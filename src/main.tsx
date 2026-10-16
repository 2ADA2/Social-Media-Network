import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/shared/config/i18n';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
