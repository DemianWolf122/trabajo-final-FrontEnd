import React, { useContext, useState } from 'react'
import { ContactsContext } from '../Context/ContactsContext.jsx'
import { Link } from 'react-router'

export default function ContactSidebar({ user, onLogout }) {
    const { contacts } = useContext(ContactsContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [showMenu, setShowMenu] = useState(false)

    // MAGIA: Filtramos la lista según lo que escribe
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="sidebar-wrapper">
            <header className="sidebar-header">
                <img src={`https://ui-avatars.com/api/?name=${user}&background=00a884&color=fff`} alt="Tú" className="my-avatar" />
                <div className="sidebar-header-icons">
                    <button className="icon-btn" title="Comunidades">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-6 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3.46 19.88A6.98 6.98 0 0 1 12 16a6.98 6.98 0 0 1 8.54 3.88A9.96 9.96 0 0 0 12 2a9.96 9.96 0 0 0-8.54 17.88z"></path></svg>
                    </button>
                    <button className="icon-btn" title="Nuevo chat">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.81v15.362l4.135-4.134h11.87c1.032 0 1.668-.614 1.668-1.634V4.81c0-1.02-.636-1.635-1.668-1.635zM10.74 12.015l-3.327-3.327h2.247V5.592h2.184v3.096h2.246l-3.35 3.327z"></path></svg>
                    </button>

                    {/* Botón de MENÚ con desplegable */}
                    <div className="menu-container">
                        <button className="icon-btn" title="Menú" onClick={() => setShowMenu(!showMenu)}>
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </button>
                        {showMenu && (
                            <div className="dropdown-menu">
                                <button onClick={onLogout}>Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="sidebar-search">
                <div className="search-bar">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#54656f" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg>
                    {/* Input conectado al estado */}
                    <input
                        type="text"
                        placeholder="Buscar o empezar un nuevo chat"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="contact-list">
                {/* Iteramos sobre los contactos FILTRADOS */}
                {filteredContacts.map((contact) => (
                    <Link to={`/contact/${contact.id}`} key={contact.id} className="contact-link">
                        <img src={contact.profile_picture} alt={contact.name} />
                        <div className="contact-item-info">
                            <div className="contact-item-header">
                                <h3>{contact.name}</h3>
                            </div>
                            <div className="contact-item-preview">
                                <span>{contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].text.substring(0, 35) + '...' : ''}</span>
                            </div>
                        </div>
                    </Link>
                ))}
                {filteredContacts.length === 0 && <p className="no-results">No hay chats, contactos ni mensajes.</p>}
            </div>
        </div>
    )
}