import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Configs from './pages/Configs.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace/>}/>
        <Route path='/auth/login' element={<Login />}/>
        <Route path='/api/notas' element={<ProtectedRoute><App /></ProtectedRoute>  }/>
        <Route path='/api/configuracoes' element={<ProtectedRoute><Configs /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
