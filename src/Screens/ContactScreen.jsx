import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { chats, sendMessage, clearChat, markAsRead, editarContacto, borrarContacto, cargando } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const navigate = useNavigate()
    const [newMessage, setNewMessage] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [editando, setEditando] = useState(false)
    const [nombreTemp, setNombreTemp] = useState("")
    const [confirmandoEliminar, setConfirmandoEliminar] = useState(false)
    const scrollRef = useRef(null)

    const contact_selected = chats.find(c => String(c.id) === String(contact_id))

    // Marcar como leído al entrar
    useEffect(() => {
        if (contact_selected && contact_selected.unread_count > 0) {
            markAsRead(contact_id)
        }
    }, [contact_id, contact_selected])

    // Al cambiar de chat, cerramos panel y estados de edición
    useEffect(() => {
        setShowInfo(false)
        setEditando(false)
        setConfirmandoEliminar(false)
        setShowMenu(false)
    }, [contact_id])

    // Scroll automático
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [contact_selected?.messages])

    if (!contact_selected) {
        return <div className="chat-error">{cargando ? 'Cargando chat...' : 'Contacto no encontrado.'}</div>
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim() === "") return
        sendMessage(contact_id, newMessage)
        setNewMessage("")
    }

    const abrirPanel = (modoEdicion = false) => {
        setShowMenu(false)
        setShowInfo(true)
        setConfirmandoEliminar(false)
        setEditando(modoEdicion)
        setNombreTemp(contact_selected.name)
    }

    const guardarNombre = async (e) => {
        e.preventDefault()
        const nombre = nombreTemp.trim()
        if (nombre.length < 2) return
        await editarContacto(contact_id, nombre)
        setEditando(false)
    }

    const eliminarContacto = async () => {
        await borrarContacto(contact_id)
        navigate('/')
    }

    const formatearFecha = (iso) => {
        if (!iso) return '—'
        return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    const totalMensajes = contact_selected.messages.length
    const enviados = contact_selected.messages.filter(m => m.send_by_me).length

    return (
        <div className="chat-layout-wrapper fade-in">
            <div className="chat-main-area">
                <header className="chat-header">
                    <div className="chat-header-info-btn" onClick={() => abrirPanel(false)} title="Ver info del contacto">
                        <button className="back-btn-mobile" onClick={(e) => { e.stopPropagation(); navigate('/') }}>←</button>
                        <img src={contact_selected.profile_picture} alt="" className="avatar" />
                        <div className="contact-info">
                            <h2>{contact_selected.name}</h2>
                            <span className={contact_selected.isTyping ? 'typing-text' : ''}>
                                {contact_selected.isTyping ? 'escribiendo...' : contact_selected.last_time_connection}
                            </span>
                        </div>
                    </div>

                    <div className="chat-header-actions menu-container">
                        <button className="icon-btn" onClick={() => setShowMenu(!showMenu)}>
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </button>
                        {showMenu && (
                            <div className="dropdown-menu slide-down">
                                <button onClick={() => abrirPanel(false)}>Info del contacto</button>
                                <button onClick={() => abrirPanel(true)}>Editar nombre</button>
                                <button onClick={() => { clearChat(contact_id); setShowMenu(false) }}>Vaciar mensajes</button>
                                <button className="danger-text" onClick={() => { abrirPanel(false); setConfirmandoEliminar(true) }}>Eliminar contacto</button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="chat-messages-area custom-scrollbar" ref={scrollRef}>
                    {contact_selected.messages.map((msg, index) => (
                        <div key={msg.id} className={`message-bubble pop-in ${msg.send_by_me ? 'mine' : 'theirs'}`} style={{ animationDelay: `${index * 0.05}s` }}>
                            {msg.sender_name && <span className="sender-name">{msg.sender_name}</span>}
                            <p>{msg.text}</p>
                            <span className="time">
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {msg.send_by_me && (
                                    <svg width="16" height="11" viewBox="0 0 16 11" className={`read-ticks ${msg.is_read ? 'read' : ''}`}>
                                        <path d="M11.8 1L10.4 2.4 14 6 15.4 4.6zM4.6 11L0 6.4 1.4 5 4.6 8.2 13.6 0 15 1.4z" />
                                    </svg>
                                )}
                            </span>
                        </div>
                    ))}
                    {contact_selected.isTyping && (
                        <div className="message-bubble theirs typing-indicator pop-in">
                            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                        </div>
                    )}
                </div>

                <form className="chat-input-area" onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        placeholder='Escribe un mensaje...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="animated-input"
                    />
                    <button type='submit' className={`icon-btn send-btn ${newMessage.trim() ? 'show' : ''}`} disabled={!newMessage.trim()}>
                        <svg viewBox="0 0 24 24" height="24" width="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                    </button>
                </form>
            </div>

            {/* ===== Panel de detalle del contacto ===== */}
            {showInfo && (
                <aside className="contact-detail-panel slide-in-right">
                    <header className="detail-header">
                        <button className="icon-btn" onClick={() => setShowInfo(false)} title="Cerrar">
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"></path></svg>
                        </button>
                        <h3>Info del contacto</h3>
                    </header>

                    <div className="detail-body custom-scrollbar">
                        <img src={contact_selected.profile_picture} alt={contact_selected.name} className="detail-avatar" />

                        {editando ? (
                            <form className="detail-edit-form" onSubmit={guardarNombre}>
                                <input
                                    autoFocus
                                    type="text"
                                    value={nombreTemp}
                                    onChange={(e) => setNombreTemp(e.target.value)}
                                    maxLength={50}
                                    placeholder="Nombre del contacto"
                                />
                                <div className="detail-edit-actions">
                                    <button type="submit" className="btn-green" disabled={nombreTemp.trim().length < 2}>Guardar</button>
                                    <button type="button" className="btn-gray" onClick={() => setEditando(false)}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <h2 className="detail-name">
                                {contact_selected.name}
                                <button className="icon-btn" title="Editar nombre" onClick={() => { setEditando(true); setNombreTemp(contact_selected.name) }}>
                                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm16.1-9.3c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.7 1.7 3.4 3.4 1.7-1.7z"></path></svg>
                                </button>
                            </h2>
                        )}

                        <p className="detail-status">{contact_selected.isGroup ? 'Grupo' : 'Contacto'} · {contact_selected.last_time_connection}</p>

                        <div className="detail-stats">
                            <div className="detail-stat">
                                <strong>{totalMensajes}</strong>
                                <span>Mensajes</span>
                            </div>
                            <div className="detail-stat">
                                <strong>{enviados}</strong>
                                <span>Enviados</span>
                            </div>
                            <div className="detail-stat">
                                <strong>{totalMensajes - enviados}</strong>
                                <span>Recibidos</span>
                            </div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Agregado el</span>
                            <span>{formatearFecha(contact_selected.fecha_creacion)}</span>
                        </div>

                        <div className="detail-actions">
                            <button className="detail-action-btn" onClick={() => clearChat(contact_id)}>
                                🧹 Vaciar mensajes
                            </button>

                            {confirmandoEliminar ? (
                                <div className="detail-confirm fade-in">
                                    <p>¿Eliminar a <strong>{contact_selected.name}</strong> y todos sus mensajes? Esta acción no se puede deshacer.</p>
                                    <div className="detail-edit-actions">
                                        <button className="btn-danger" onClick={eliminarContacto}>Sí, eliminar</button>
                                        <button className="btn-gray" onClick={() => setConfirmandoEliminar(false)}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <button className="detail-action-btn danger-text" onClick={() => setConfirmandoEliminar(true)}>
                                    🗑️ Eliminar contacto
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
            )}
        </div>
    )
}
