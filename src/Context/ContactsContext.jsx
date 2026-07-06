import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

export const ContactsContext = createContext();

// Adaptamos una comunidad de la API a la forma que usa el sidebar.
const mapComunidad = (c) => ({
    id: c._id,
    name: c.nombre,
    description: c.descripcion || '',
    icon: c.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.nombre)}&background=0055A4&color=fff&rounded=true`,
    groups: (c.groups || []).map(g => ({ id: g._id, name: g.nombre, unread: g.unread || 0 }))
});

const AUTO_REPLIES = [
    '¡Genial! 🙌', 'Jaja tal cual', 'Dale, lo vemos 👀', 'Buenísimo, gracias por avisar',
    'Mmm interesante 🤔', 'Ahí lo reviso y te digo', '¡De una! 🚀', 'Perfecto, quedamos así 👍'
];

// Adaptamos la forma de la API a la forma que ya usan los componentes.
const mapMensaje = (m) => ({
    id: m._id,
    text: m.texto,
    send_by_me: m.send_by_me,
    created_at: m.fecha,
    is_read: m.leido,
    sender_name: undefined
});

const buildChat = (contacto, mensajes) => ({
    id: contacto._id,
    name: contacto.nombre,
    isGroup: contacto.isGroup || false,
    profile_picture: contacto.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(contacto.nombre)}&background=00a884&color=fff`,
    last_time_connection: 'en línea',
    fecha_creacion: contacto.fecha_creacion,
    unread_count: mensajes.filter(m => !m.send_by_me && !m.leido).length,
    isTyping: false,
    messages: mensajes.map(mapMensaje)
});

const ContactsContextProvider = ({ children }) => {
    const { user } = useAuth();
    const [chatsState, setChatsState] = useState([]);
    const [communitiesState, setCommunitiesState] = useState([]);
    const [activeTab, setActiveTab] = useState('chats');
    const [cargando, setCargando] = useState(false);

    const refrescar = async () => {
        if (!localStorage.getItem('chat_token')) return;
        setCargando(true);
        try {
            const [resContactos, resComunidades] = await Promise.all([
                api.getContactos(),
                api.getComunidades()
            ]);
            const contactos = resContactos.data.contactos;
            const chats = await Promise.all(contactos.map(async (c) => {
                const mres = await api.getMensajes(c._id);
                return buildChat(c, mres.data.mensajes);
            }));
            setChatsState(chats);
            setCommunitiesState(resComunidades.data.comunidades.map(mapComunidad));
        } catch (error) {
            console.error('Error cargando datos:', error.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (user) refrescar();
        else { setChatsState([]); setCommunitiesState([]); }
    }, [user]);

    const sendMessage = async (contactId, text) => {
        try {
            // 1. Enviar mi mensaje (se persiste en la base)
            const res = await api.enviarMensaje({ texto: text, contactoId: contactId });
            const nuevo = mapMensaje(res.data.mensaje);
            setChatsState(prev => prev.map(chat =>
                chat.id === contactId
                    ? { ...chat, messages: [...chat.messages, nuevo], last_time_connection: 'en línea' }
                    : chat
            ).sort((a, b) => (a.id === contactId ? -1 : b.id === contactId ? 1 : 0)));

            // 2. El contacto "ve" el mensaje y empieza a escribir
            setTimeout(() => {
                setChatsState(prev => prev.map(chat =>
                    chat.id === contactId
                        ? { ...chat, isTyping: true, messages: chat.messages.map(m => m.send_by_me ? { ...m, is_read: true } : m) }
                        : chat
                ));
            }, 800);

            // 3. Responde automáticamente (también se persiste)
            setTimeout(async () => {
                try {
                    const replyText = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
                    const rres = await api.enviarMensaje({ texto: replyText, contactoId: contactId, send_by_me: false, leido: true });
                    const reply = mapMensaje(rres.data.mensaje);
                    setChatsState(prev => prev.map(chat =>
                        chat.id === contactId
                            ? { ...chat, isTyping: false, messages: [...chat.messages, reply] }
                            : chat
                    ));
                } catch (e) {
                    setChatsState(prev => prev.map(chat => chat.id === contactId ? { ...chat, isTyping: false } : chat));
                }
            }, 2600);
        } catch (error) {
            console.error('Error enviando mensaje:', error.message);
        }
    };

    const clearChat = async (contactId) => {
        try {
            await api.vaciarChat(contactId);
            setChatsState(prev => prev.map(chat => chat.id === contactId ? { ...chat, messages: [] } : chat));
        } catch (error) {
            console.error('Error vaciando chat:', error.message);
        }
    };

    const markAsRead = (contactId) => {
        setChatsState(prev => prev.map(chat => chat.id === contactId ? { ...chat, unread_count: 0 } : chat));
    };

    const crearContacto = async (nombre, profile_picture) => {
        const res = await api.crearContacto({ nombre, profile_picture: profile_picture || '' });
        setChatsState(prev => [...prev, buildChat(res.data.contacto, [])]);
        return res.data.contacto;
    };

    const editarContacto = async (contactId, nombre) => {
        const res = await api.editarContacto(contactId, { nombre });
        setChatsState(prev => prev.map(chat =>
            chat.id === contactId ? { ...chat, name: res.data.contacto.nombre } : chat
        ));
    };

    const borrarContacto = async (contactId) => {
        await api.borrarContacto(contactId);
        setChatsState(prev => prev.filter(chat => chat.id !== contactId));
    };

    const crearComunidad = async (nombre, descripcion) => {
        const res = await api.crearComunidad({ nombre, descripcion: descripcion || '' });
        setCommunitiesState(prev => [...prev, mapComunidad(res.data.comunidad)]);
        return res.data.comunidad;
    };

    const borrarComunidad = async (comunidadId) => {
        await api.borrarComunidad(comunidadId);
        setCommunitiesState(prev => prev.filter(c => c.id !== comunidadId));
    };

    const contextValue = {
        chats: chatsState,
        communities: communitiesState,
        currentUser: user,
        activeTab,
        setActiveTab,
        cargando,
        refrescar,
        sendMessage,
        clearChat,
        markAsRead,
        crearContacto,
        editarContacto,
        borrarContacto,
        crearComunidad,
        borrarComunidad
    };

    return (
        <ContactsContext.Provider value={contextValue}>
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsContextProvider;
