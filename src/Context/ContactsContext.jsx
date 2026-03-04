import { createContext, useState, useEffect } from "react";
import { appData } from "../data/contactData.js";

// Creamos el contexto con valores por defecto para el autocompletado del IDE
export const ContactsContext = createContext({
    chats: [],
    communities: [],
    currentUser: {},
    activeTab: 'chats', // 'chats', 'communities', 'status', 'settings'
    setActiveTab: () => { },
    sendMessage: () => { },
    clearChat: () => { },
    markAsRead: () => { }
});

const ContactsContextProvider = ({ children }) => {
    // 1. Estados Principales
    const [chatsState, setChatsState] = useState(appData.chats);
    const [communitiesState, setCommunitiesState] = useState(appData.communities);
    const [activeTab, setActiveTab] = useState('chats');

    // 2. Funciones de Mensajería
    const sendMessage = (contactId, text) => {
        const newMessage = {
            id: Date.now(),
            text: text,
            send_by_me: true,
            created_at: new Date().toISOString(),
            is_read: false
        };

        setChatsState(prevChats =>
            prevChats.map(chat => {
                if (chat.id === Number(contactId)) {
                    // Ponemos el chat actualizado al principio de la lista
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        last_time_connection: 'en línea'
                    };
                }
                return chat;
            }).sort((a, b) => {
                // Ordenar para que el chat modificado quede arriba
                if (a.id === Number(contactId)) return -1;
                if (b.id === Number(contactId)) return 1;
                return 0;
            })
        );
    };

    // 3. Función para limpiar un chat (Opción del menú de 3 puntitos)
    const clearChat = (contactId) => {
        setChatsState(prevChats =>
            prevChats.map(chat =>
                chat.id === Number(contactId)
                    ? { ...chat, messages: [] }
                    : chat
            )
        );
    };

    // 4. Función para marcar como leído (Quita la burbuja verde de notificaciones)
    const markAsRead = (contactId) => {
        setChatsState(prevChats =>
            prevChats.map(chat =>
                chat.id === Number(contactId)
                    ? { ...chat, unread_count: 0 }
                    : chat
            )
        );
    };

    // Objeto masivo que le pasamos a toda la app
    const contextValue = {
        chats: chatsState,
        communities: communitiesState,
        currentUser: appData.currentUser,
        activeTab,
        setActiveTab,
        sendMessage,
        clearChat,
        markAsRead
    };

    return (
        <ContactsContext.Provider value={contextValue}>
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsContextProvider;