import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { contacts, sendMessage } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef(null)

    const contact_selected = contacts.find(c => Number(c.id) === Number(contact_id))

    // Auto-scroll al último mensaje cuando cambia la charla
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
        setNewMessage("") // Limpiamos el input
    }

    return (
        <div className="chat-window">
            <header className="chat-header">
                <img src={contact_selected.profile_picture} alt="" className="avatar" />
                <div className="contact-info">
                    <h2>{contact_selected.name}</h2>
                    <span>{contact_selected.last_time_connection}</span>
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