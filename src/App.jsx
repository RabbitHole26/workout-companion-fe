import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

// hook
import useStateSelectors from './hooks/useStateSelectors'

// layout
import AppLayout from './layout/AppLayout'

// page
import Home from './pages/home-page/Home'
import Signup from './pages/signup-page/Signup'
import Login from './pages/login-page/Login'
import ForgotPassword from './pages/forgot-password-page/ForgotPassword'
import PasswordReset from './pages/password-reset/PasswordReset'
import Settings from './pages/settings-page/Settings'

function App() {
  const {userData} = useStateSelectors()

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path='/'
            element={userData ? <Home /> : <Navigate to='/login'/>}
          />
          <Route
            path='/signup'
            element={!userData ? <Signup /> : <Navigate to='/' />}
          />
          <Route
            path='/login'
            element={!userData ? <Login /> : <Navigate to='/' />}
          />
          <Route 
            path='/forgot-password'
            element={!userData ? <ForgotPassword /> : <Navigate to='/' />}
          />
          <Route 
            path='/password-reset'
            element={!userData ? <PasswordReset /> : <Navigate to='/' />}
          />
          <Route
            path='/settings'
            element={userData ? <Settings /> : <Navigate to='/login' />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
