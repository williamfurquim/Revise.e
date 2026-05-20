import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Configs from './pages/Configs.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Review from './pages/Review.tsx'
import TutorialPage from './pages/TutorialPage.tsx'
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notas' element={<ProtectedRoute> <App /> </ProtectedRoute>} />
        <Route path='/configuracoes' element={<ProtectedRoute> <Configs /> </ProtectedRoute>} />
        <Route path='/revisao' element={<ProtectedRoute> <Review /> </ProtectedRoute>}/>
        <Route path='/tutorial' element={<ProtectedRoute> <TutorialPage /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
