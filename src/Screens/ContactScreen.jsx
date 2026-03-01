import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { contacts, sendMessage } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef(null)

    const contact_selected = contacts.find(c => Number(c.id) === Number(contact_id))

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [contact_selected?.messages]);

    if (!contact_selected) return <div className="chat-error">Contacto no encontrado</div>

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim() === "") return
        sendMessage(contact_id, newMessage)
        setNewMessage("")
    }

    return (
        <div className="chat-window">
            <header className="chat-header">
                {/* Info clickeable estilo WP */}
                <div className="chat-header-info-btn" onClick={() => alert(`Ver info de ${contact_selected.name}`)}>
                    <img src={contact_selected.profile_picture} alt="" className="avatar" />
                    <div className="contact-info">
                        <h2>{contact_selected.name}</h2>
                        <span>{contact_selected.last_time_connection}</span>
                    </div>
                </div>

                {/* Botonera derecha del chat */}
                <div className="chat-header-actions">
                    <button className="icon-btn" title="Buscar">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg>
                    </button>
                    <button className="icon-btn" title="Menú" onClick={() => alert('Acciones: Vaciar chat, Reportar, Bloquear')}>
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                    </button>
                </div>
            </header>

            <div className="chat-messages-area" ref={scrollRef}>
                {contact_selected.messages.map(msg => (
                    <div key={msg.id} className={`message-bubble ${msg.send_by_me ? 'mine' : 'theirs'}`}>
                        <p>{msg.text}</p>
                        <span className="time">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
            </div>

            <form className="chat-input-area" onSubmit={handleFormSubmit}>
                <button type="button" className="icon-btn">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path fill="#54656f" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </button>
                <input
                    type='text'
                    placeholder='Escribe un mensaje'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit' disabled={!newMessage.trim()}>
                    <svg viewBox="0 0 24 24" height="24" width="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                </button>
            </form>
        </div>
    )
}