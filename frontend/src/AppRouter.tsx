import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Configs from './pages/Configs.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Review from './pages/Review.tsx';
import TutorialPage from './pages/TutorialPage.tsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notas' element={<ProtectedRoute> <App /> </ProtectedRoute>} />
          <Route path='/configuracoes' element={<ProtectedRoute> <Configs /> </ProtectedRoute>} />
          <Route path='/revisao' element={<ProtectedRoute> <Review /> </ProtectedRoute>} />
          <Route path='/tutorial' element={<ProtectedRoute> <TutorialPage /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default AppRouter;