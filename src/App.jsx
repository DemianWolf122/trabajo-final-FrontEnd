import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import HomeScreen from './Screens/HomeScreen.jsx'
import ContactScreen from './Screens/ContactScreen.jsx'
import ErrorNotFoundScreen from './Screens/ErrorNotFoundScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen.jsx'
import ContactSidebar from './Components/ContactSidebar.jsx'
import ContactsContextProvider from './Context/ContactsContext.jsx'
import { useAuth } from './Context/AuthContext.jsx'
import './App.css'

function App() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isBooting, setIsBooting] = useState(Boolean(localStorage.getItem('chat_user')))

  const isChatActive = location.pathname.includes('/contact/')

  // Pantalla de carga breve al iniciar sesión o refrescar con sesión activa.
  useEffect(() => {
    if (user) {
      setIsBooting(true)
      const t = setTimeout(() => setIsBooting(false), 1200)
      return () => clearTimeout(t)
    }
  }, [user])

  // Sin sesión: pantallas públicas de login / registro.
  if (!user) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    )
  }

  if (isBooting) {
    return (
      <div className="startup-screen">
        <svg viewBox="0 0 39 39" width="60" height="60"><path fill="#d1d7db" d="M19.5 0C8.7 0 0 8.7 0 19.5c0 3.4 1.3 6.7 3.5 9.3L1.2 37.5l8.9-2.3c2.9 1.9 6.2 2.9 9.4 2.9 10.8 0 19.5-8.7 19.5-19.5S30.3 0 19.5 0zm0 35.8c-2.9 0-5.8-1-8.2-2.7l-.6-.4-6.1 1.6 1.6-6-.4-.6c-2-2.5-3-5.6-3-8.8 0-8.9 7.3-16.2 16.2-16.2s16.2 7.3 16.2 16.2-7.3 16.3-16.2 16.3z"></path></svg>
        <div className="progress-bar-container"><div className="progress-bar"></div></div>
        <div className="encryption-notice"><p>Cifrado de extremo a extremo</p></div>
      </div>
    )
  }

  return (
    <ContactsContextProvider>
      <div className="whatsapp-container">
        <div className={`sidebar-section ${isChatActive ? 'hide-on-mobile' : ''}`}>
          <ContactSidebar user={user.nombre} onLogout={logout} />
        </div>
        <div className={`chat-section ${!isChatActive ? 'hide-on-mobile' : ''}`}>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/contact/:contact_id' element={<ContactScreen />} />
            <Route path='*' element={<ErrorNotFoundScreen />} />
          </Routes>
        </div>
      </div>
    </ContactsContextProvider>
  )
}

export default App
