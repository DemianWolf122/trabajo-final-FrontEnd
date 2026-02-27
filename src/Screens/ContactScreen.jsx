import React, { useContext } from 'react'
import { useParams } from 'react-router'
// ¡Acá estaba el error! Cambiamos ../../ por ../
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { contacts } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const contact_selected = contacts.find(contact => Number(contact.id) === Number(contact_id))

    if (!contact_selected) {
        return <h2>El contacto seleccionado no existe</h2>
    }

    return (
        <div className="chat-window">
            {/* HEADER DEL CHAT */}
            <div className="chat-header">
                <img src={contact_selected.profile_picture} alt={contact_selected.name} className="avatar" />
                <div className="contact-info">
                    <h2>{contact_selected.name}</h2>
                    <span>{contact_selected.last_time_connection}</span>
                </div>
            </div>

            {/* ZONA DE MENSAJES */}
            <div className="chat-messages-area">
                {contact_selected.messages.map(message => (
                    <div
                        key={message.id}
                        className={`message-bubble ${message.send_by_me ? 'mine' : 'theirs'}`}
                    >
                        <p>{message.text}</p>
                        <span className="time">12:00</span>
                    </div>
                ))}
            </div>

            {/* ZONA DE INPUT */}
            <form className="chat-input-area">
                <input type='text' placeholder='Escribe un mensaje...' />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}