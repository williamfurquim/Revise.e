import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Configs from './pages/Configs.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Review from './pages/Review.tsx'
import './styles/global.css';
import './styles/sidebar.css';
import './styles/form.css';
import './styles/notes.css';
import './styles/auth.css';
import './styles/configs.css';
import './styles/responsive.css';
import './styles/review.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/api/notas' element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path='/api/configuracoes' element={<ProtectedRoute><Configs /></ProtectedRoute>} />
        <Route path='/api/revisao' element={<ProtectedRoute><Review /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
