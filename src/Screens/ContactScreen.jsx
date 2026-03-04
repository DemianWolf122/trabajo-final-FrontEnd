import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { chats, sendMessage, clearChat, markAsRead } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const navigate = useNavigate()
    const [newMessage, setNewMessage] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const scrollRef = useRef(null)

    const contact_selected = chats.find(c => Number(c.id) === Number(contact_id))

    // Marcar como leído al entrar
    useEffect(() => {
        if (contact_selected && contact_selected.unread_count > 0) {
            markAsRead(contact_id)
        }
    }, [contact_id])

    // Scroll automático súper suave
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [contact_selected?.messages])

    if (!contact_selected) return <div className="chat-error">Cargando chat...</div>

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim() === "") return
        sendMessage(contact_id, newMessage)
        setNewMessage("")
    }

    return (
        <div className="chat-layout-wrapper fade-in">
            <div className="chat-main-area">
                <header className="chat-header">
                    <div className="chat-header-info-btn">
                        <button className="back-btn-mobile" onClick={() => navigate('/')}>←</button>
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
                                <button onClick={() => { clearChat(contact_id); setShowMenu(false) }}>Vaciar mensajes</button>
                                <button onClick={() => alert('Reportar usuario')}>Reportar</button>
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
        </div>
    )
}