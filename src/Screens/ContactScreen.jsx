import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { ContactsContext } from '../Context/ContactsContext.jsx'

export default function ContactScreen() {
    const { contacts, sendMessage } = useContext(ContactsContext)
    const { contact_id } = useParams()
    const [newMessage, setNewMessage] = useState("")

    // Estados para los paneles interactivos
    const [showInfoPanel, setShowInfoPanel] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false)

    const scrollRef = useRef(null)
    const contact_selected = contacts.find(c => Number(c.id) === Number(contact_id))

    // Cierra el panel de info si cambiás de chat
    useEffect(() => {
        setShowInfoPanel(false)
        setShowEmojis(false)
    }, [contact_id])

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [contact_selected?.messages]);

    if (!contact_selected) return <div className="chat-error">Contacto no encontrado</div>

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim() === "") return
        sendMessage(contact_id, newMessage)
        setNewMessage("")
        setShowEmojis(false)
    }

    const addEmoji = (emoji) => {
        setNewMessage(prev => prev + emoji)
    }

    return (
        <div className="chat-layout-wrapper">
            {/* ZONA PRINCIPAL DE CHAT */}
            <div className="chat-main-area">
                <header className="chat-header">
                    {/* Al clickear abre el panel de la derecha */}
                    <div className="chat-header-info-btn" onClick={() => setShowInfoPanel(true)}>
                        <img src={contact_selected.profile_picture} alt="" className="avatar" />
                        <div className="contact-info">
                            <h2>{contact_selected.name}</h2>
                            <span>{contact_selected.last_time_connection}</span>
                        </div>
                    </div>

                    <div className="chat-header-actions">
                        <button className="icon-btn" title="Buscar"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg></button>
                        <button className="icon-btn" title="Menú"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></button>
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
                    <button type="button" className="icon-btn" onClick={() => setShowEmojis(!showEmojis)}>
                        <svg viewBox="0 0 24 24" width="26" height="26"><path fill="#54656f" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                    </button>

                    {/* Panel de emojis re cheto */}
                    {showEmojis && (
                        <div className="emoji-picker">
                            {['😀', '😂', '🔥', '👍', '😎', '💻', '🚀', '💡', '💪', '🤔'].map(emo => (
                                <span key={emo} onClick={() => addEmoji(emo)}>{emo}</span>
                            ))}
                        </div>
                    )}

                    <input
                        type='text'
                        placeholder='Escribe un mensaje'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    {/* Renderizado condicional: Si no hay texto, muestra Mic. Si hay, muestra Enviar */}
                    {newMessage.trim() === "" ? (
                        <button type="button" className="icon-btn">
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>
                        </button>
                    ) : (
                        <button type='submit' className="icon-btn" style={{ color: '#00a884' }}>
                            <svg viewBox="0 0 24 24" height="24" width="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                        </button>
                    )}
                </form>
            </div>

            {/* BARRA LATERAL DERECHA (INFO DE CONTACTO) */}
            {showInfoPanel && (
                <div className="contact-info-panel">
                    <div className="info-panel-header">
                        <button className="icon-btn" onClick={() => setShowInfoPanel(false)}>X</button>
                        <h2>Info. de contacto</h2>
                    </div>
                    <div className="info-panel-body">
                        <img src={contact_selected.profile_picture} alt="Perfil" />
                        <h2>{contact_selected.name}</h2>
                        <p>{contact_selected.last_time_connection}</p>
                    </div>
                </div>
            )}
        </div>
    )
}