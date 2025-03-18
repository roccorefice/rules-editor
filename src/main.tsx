import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AppContext } from './common/contexts/AppContext.tsx';
import { RulesProvider } from './common/contexts/RulesContext.tsx';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <RulesProvider>
        <App />
      </RulesProvider>
    </AppContext>
  </StrictMode>
)
