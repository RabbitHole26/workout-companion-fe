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
            // element={<Home />}
          />
          <Route
            path='/signup'
            element={!userData ? <Signup /> : <Navigate to='/' />}
            // element={<Signup />}
          />
          <Route
            path='/login'
            element={!userData ? <Login /> : <Navigate to='/' />}
            // element={<Login />}
          />
          <Route
            path='/settings'
            element={userData ? <Settings /> : <Navigate to='/login' />}
            // element={<Settings />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
