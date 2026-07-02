import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import AppRouter from './AppRouter.tsx';
import './styles/global.css';
import './styles/sidebar.css';
import './styles/form.css';
import './styles/notes.css';
import './styles/auth.css';
import './styles/configs.css';
import './styles/responsive.css';
import './styles/review.css';
import './styles/tutorial.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)