import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import HomeScreen from './Screens/HomeScreen.jsx'
import ContactScreen from './Screens/ContactScreen.jsx'
import ErrorNotFoundScreen from './Screens/ErrorNotFoundScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
import ContactSidebar from './Components/ContactSidebar.jsx'
import ContactsContextProvider from './Context/ContactsContext.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (username) => {
    setIsLoading(true) // Activamos pantalla de carga
    setTimeout(() => {
      setIsLoading(false)
      setUser(username)
    }, 1800) // 1.8 segundos de carga falsa
  }

  // Pantalla de Carga Animada estilo WhatsApp Web
  if (isLoading) {
    return (
      <div className="startup-screen">
        <svg viewBox="0 0 39 39" width="60" height="60"><path fill="#d1d7db" d="M19.5 0C8.7 0 0 8.7 0 19.5c0 3.4 1.3 6.7 3.5 9.3L1.2 37.5l8.9-2.3c2.9 1.9 6.2 2.9 9.4 2.9 10.8 0 19.5-8.7 19.5-19.5S30.3 0 19.5 0zm0 35.8c-2.9 0-5.8-1-8.2-2.7l-.6-.4-6.1 1.6 1.6-6-.4-.6c-2-2.5-3-5.6-3-8.8 0-8.9 7.3-16.2 16.2-16.2s16.2 7.3 16.2 16.2-7.3 16.3-16.2 16.3z"></path></svg>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
        <div className="encryption-notice">
          <svg viewBox="0 0 12 15" width="12" height="15"><path fill="#8696a0" d="M6 0C3.79 0 2 1.79 2 4v2H1.5C.67 6 0 6.67 0 7.5v6C0 14.33.67 15 1.5 15h9c.83 0 1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5H10V4c0-2.21-1.79-4-4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5v2h-5V4c0-1.38 1.12-2.5 2.5-2.5z"></path></svg>
          <p>Cifrado de extremo a extremo</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen onLogin={handleLogin} />} />
      </Routes>
    )
  }

  return (
    <ContactsContextProvider>
      <div className="whatsapp-container">
        <div className="sidebar-section">
          <ContactSidebar user={user} />
        </div>
        <div className="chat-section">
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