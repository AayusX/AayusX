import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MemoryIntroProvider } from '../features/memory-intro/MemoryIntro';
import { MascotProvider } from '../features/mascot/MascotContext';
import { AppRoutes } from './routes';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MascotProvider>
          <MemoryIntroProvider>
            <AppRoutes />
          </MemoryIntroProvider>
        </MascotProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
