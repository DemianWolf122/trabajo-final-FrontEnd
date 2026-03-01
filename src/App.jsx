import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import HomeScreen from './Screens/HomeScreen.jsx'
import ContactScreen from './Screens/ContactScreen.jsx'
import ErrorNotFoundScreen from './Screens/ErrorNotFoundScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
import ContactSidebar from './Components/ContactSidebar.jsx'
import ContactsContextProvider from './Context/ContactsContext.jsx'
import './App.css'

function App() {
  // Estado para controlar si el usuario inició sesión
  const [user, setUser] = useState(null)

  const handleLogin = (username) => {
    setUser(username)
  }

  // Si NO hay usuario, solo mostramos la ruta del Login
  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen onLogin={handleLogin} />} />
      </Routes>
    )
  }

  // Si HAY usuario, renderizamos el clon de WhatsApp
  return (
    <ContactsContextProvider>
      <div className="whatsapp-container">

        <div className="sidebar-section">
          {/* Le pasamos el user al sidebar por si querés mostrarlo arriba */}
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