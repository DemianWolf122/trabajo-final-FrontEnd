import React from 'react'
import { Route, Routes } from 'react-router'
import HomeScreen from './Screens/HomeScreen.jsx'
import ContactScreen from './Screens/ContactScreen.jsx'
import ErrorNotFoundScreen from './Screens/ErrorNotFoundScreen.jsx'
import ContactSidebar from './Components/ContactSidebar.jsx' // Asumiendo que es un archivo directo
import ContactsContextProvider from './Context/ContactsContext.jsx'
import './App.css'

function App() {
  return (
    <ContactsContextProvider>
      {/* Contenedor principal estilo WhatsApp Web */}
      <div className="whatsapp-container">

        {/* LADO IZQUIERDO: Fijo, nunca desaparece */}
        <div className="sidebar-section">
          <ContactSidebar />
        </div>

        {/* LADO DERECHO: Cambia dinámicamente según la ruta */}
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