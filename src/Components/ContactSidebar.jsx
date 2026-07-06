import React, { useContext, useState } from 'react'
import { ContactsContext } from '../Context/ContactsContext.jsx'
import { Link, useNavigate } from 'react-router'

export default function ContactSidebar({ user, onLogout }) {
    const navigate = useNavigate()
    const { chats, communities, activeTab, setActiveTab, crearContacto, crearComunidad, borrarComunidad } = useContext(ContactsContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [showNewForm, setShowNewForm] = useState(false)
    const [nuevoNombre, setNuevoNombre] = useState('')
    // Comunidades
    const [showNewCom, setShowNewCom] = useState(false)
    const [comNombre, setComNombre] = useState('')
    const [comDesc, setComDesc] = useState('')
    const [comError, setComError] = useState('')

    const term = searchTerm.toLowerCase()
    const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(term))
    const filteredCommunities = communities.filter(comm =>
        comm.name.toLowerCase().includes(term) || comm.description.toLowerCase().includes(term)
    )

    const handleCrearContacto = async (e) => {
        e.preventDefault()
        if (nuevoNombre.trim().length < 2) return
        await crearContacto(nuevoNombre.trim())
        setNuevoNombre('')
        setShowNewForm(false)
    }

    const handleCrearComunidad = async (e) => {
        e.preventDefault()
        setComError('')
        if (comNombre.trim().length < 2) {
            setComError('El nombre debe tener al menos 2 caracteres')
            return
        }
        try {
            await crearComunidad(comNombre.trim(), comDesc.trim())
            setComNombre('')
            setComDesc('')
            setShowNewCom(false)
        } catch (err) {
            setComError(err.message)
        }
    }

    const handleBorrarComunidad = async (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        if (window.confirm('¿Eliminar esta comunidad?')) await borrarComunidad(id)
    }

    return (
        <div className="sidebar-wrapper">
            <header className="sidebar-header">
                <img src={`https://ui-avatars.com/api/?name=${user}&background=00a884&color=fff`} alt="Tú" className="my-avatar" />
                <div className="sidebar-header-icons">
                    {/* Chats: es la sección principal, va primero y con estilo destacado */}
                    <button className={`icon-btn chats-main-btn ${activeTab === 'chats' ? 'active' : ''}`} title="Chats" onClick={() => setActiveTab('chats')}>
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.5 2 2 6 2 11c0 2.2.9 4.2 2.3 5.8L3 22l5.3-1.4c1.1.5 2.4.8 3.7.8 5.5 0 10-4 10-9S17.5 2 12 2zm-4 8h8v1.5H8V10zm0 3h6v1.5H8V13z"></path></svg>
                    </button>
                    <button className={`icon-btn ${activeTab === 'communities' ? 'active-icon' : ''}`} title="Comunidades" onClick={() => setActiveTab('communities')}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <circle cx="12" cy="12" r="9" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <ellipse cx="12" cy="12" rx="4" ry="9" />
                            <path d="M5.2 6.5C7.3 8 9.6 8.7 12 8.7s4.7-.7 6.8-2.2" />
                            <path d="M5.2 17.5C7.3 16 9.6 15.3 12 15.3s4.7.7 6.8 2.2" />
                        </svg>
                    </button>
                    <button className="icon-btn" title="Nuevo contacto" onClick={() => { setShowNewForm(!showNewForm); setActiveTab('chats') }}>
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.81v15.362l4.135-4.134h11.87c1.032 0 1.668-.614 1.668-1.634V4.81c0-1.02-.636-1.635-1.668-1.635zM12 14.075h-1.2v-2.9H7.9v-1.2h2.9V7.075H12v2.9h2.9v1.2H12v2.9z"></path></svg>
                    </button>
                    <div className="menu-container">
                        <button className="icon-btn" onClick={() => setShowMenu(!showMenu)}>
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </button>
                        {showMenu && (
                            <div className="dropdown-menu fade-in">
                                <button onClick={() => { setShowNewForm(true); setActiveTab('chats'); setShowMenu(false) }}>Nuevo contacto</button>
                                <button onClick={() => { setShowNewCom(true); setActiveTab('communities'); setShowMenu(false) }}>Nueva comunidad</button>
                                <button onClick={() => { navigate('/config'); setShowMenu(false) }}>Mi perfil</button>
                                <button onClick={onLogout}>Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {showNewForm && activeTab === 'chats' && (
                <form className="new-contact-form fade-in" onSubmit={handleCrearContacto}>
                    <input autoFocus type="text" placeholder="Nombre del nuevo contacto" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} maxLength={50} />
                    <button type="submit">Agregar</button>
                </form>
            )}

            <div className="sidebar-search">
                <div className="search-bar">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#54656f" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg>
                    <input type="text" placeholder={activeTab === 'chats' ? "Buscar un chat" : "Buscar comunidad"} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <div className="contact-list custom-scrollbar">
                {activeTab === 'chats' && filteredChats.map((chat) => (
                    <Link to={`/contact/${chat.id}`} key={chat.id} className="contact-link slide-in-left">
                        <img src={chat.profile_picture} alt={chat.name} />
                        <div className="contact-item-info">
                            <div className="contact-item-header">
                                <h3>{chat.name}</h3>
                                <span className={chat.unread_count > 0 ? 'unread-time' : 'contact-date'}>{chat.last_time_connection}</span>
                            </div>
                            <div className="contact-item-preview">
                                {chat.isTyping ? (
                                    <span className="typing-text">escribiendo...</span>
                                ) : (
                                    <span>{chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text.substring(0, 30) + '...' : 'Sin mensajes'}</span>
                                )}
                                {chat.unread_count > 0 && <span className="unread-badge">{chat.unread_count}</span>}
                            </div>
                        </div>
                    </Link>
                ))}

                {activeTab === 'chats' && filteredChats.length === 0 && (
                    <p className="empty-list-msg">No hay contactos todavía.<br />Tocá el ícono ✚ para agregar uno.</p>
                )}

                {activeTab === 'communities' && (
                    <>
                        <div className="community-toolbar">
                            <button className="new-community-btn" onClick={() => setShowNewCom(!showNewCom)}>
                                ＋ Nueva comunidad
                            </button>
                        </div>

                        {showNewCom && (
                            <form className="new-community-form fade-in" onSubmit={handleCrearComunidad}>
                                <input autoFocus type="text" placeholder="Nombre de la comunidad" value={comNombre} onChange={(e) => setComNombre(e.target.value)} maxLength={60} />
                                <input type="text" placeholder="Descripción (opcional)" value={comDesc} onChange={(e) => setComDesc(e.target.value)} maxLength={200} />
                                {comError && <p className="form-error">{comError}</p>}
                                <div className="form-actions">
                                    <button type="submit" disabled={comNombre.trim().length < 2}>Crear</button>
                                    <button type="button" className="btn-cancel" onClick={() => setShowNewCom(false)}>Cancelar</button>
                                </div>
                            </form>
                        )}

                        {filteredCommunities.length === 0 && !showNewCom && (
                            <p className="empty-list-msg">No hay comunidades todavía.<br />Creá la primera con “＋ Nueva comunidad”.</p>
                        )}

                        {filteredCommunities.map(comm => (
                            <div key={comm.id} className="community-item slide-in-left">
                                <div className="comm-header">
                                    <div className="comm-icon" aria-label={comm.name}>
                                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                                            <circle cx="12" cy="12" r="9" />
                                            <line x1="3" y1="12" x2="21" y2="12" />
                                            <ellipse cx="12" cy="12" rx="4" ry="9" />
                                            <path d="M5.2 6.5C7.3 8 9.6 8.7 12 8.7s4.7-.7 6.8-2.2" />
                                            <path d="M5.2 17.5C7.3 16 9.6 15.3 12 15.3s4.7.7 6.8 2.2" />
                                        </svg>
                                    </div>
                                    <div className="comm-header-text">
                                        <h3>{comm.name}</h3>
                                        <p>{comm.description}</p>
                                    </div>
                                    <button className="comm-delete-btn" title="Eliminar comunidad" onClick={(e) => handleBorrarComunidad(e, comm.id)}>✕</button>
                                </div>
                                {comm.groups.map(group => (
                                    <div key={group.id} className="comm-group">
                                        <span># {group.name}</span>
                                        {group.unread > 0 && <span className="unread-badge">{group.unread}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
