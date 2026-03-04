// Exportamos un objeto masivo con toda la data de la aplicación
export const appData = {
    currentUser: {
        name: 'Demian',
        status: 'Codeando el próximo unicornio 🦄',
        avatar: 'https://ui-avatars.com/api/?name=Demian&background=00a884&color=fff'
    },
    chats: [
        {
            id: 1,
            name: 'Nate Gentile',
            isGroup: false,
            last_time_connection: 'hace 5 minutos',
            profile_picture: 'https://unavatar.io/youtube/nategentile7',
            unread_count: 1,
            isTyping: false,
            messages: [
                { id: 1, text: 'Che, ¿viste los rumores de las nuevas RTX 5090?', send_by_me: false, created_at: '2024-06-01T12:00:00Z', is_read: true },
                { id: 2, text: '¡Una locura total! Pero hay que vender un riñón y medio para armar ese setup.', send_by_me: true, created_at: '2024-06-01T12:05:00Z', is_read: true },
                { id: 3, text: 'Totalmente. Mañana me llega una de ensamble, sale video con refrigeración custom sí o sí.', send_by_me: false, created_at: '2024-06-01T12:10:00Z', is_read: true },
                { id: 4, text: '¡Avisá cuando lo subas!', send_by_me: true, created_at: '2024-06-01T12:15:00Z', is_read: true },
                { id: 5, text: 'Obvio, le voy a meter tubos rígidos de acrílico.', send_by_me: false, created_at: '2024-06-01T12:16:00Z', is_read: false }
            ]
        },
        {
            id: 2,
            name: 'Suprapixel',
            isGroup: false,
            last_time_connection: 'en línea',
            profile_picture: 'https://unavatar.io/youtube/SupraPixel',
            unread_count: 0,
            isTyping: true,
            messages: [
                { id: 1, text: 'Buenas! ¿Pudiste probar los auriculares Sony que te mandé?', send_by_me: false, created_at: '2024-06-01T10:00:00Z', is_read: true },
                { id: 2, text: 'Sí Nico, el ANC que tienen es increíble, te aísla de todo el ruido del bondi.', send_by_me: true, created_at: '2024-06-01T10:15:00Z', is_read: true }
            ]
        },
        {
            id: 3,
            name: 'Midudev',
            isGroup: false,
            last_time_connection: 'hace 1 hora',
            profile_picture: 'https://unavatar.io/github/midudev',
            unread_count: 0,
            isTyping: false,
            messages: [
                { id: 1, text: '¡Hola Demian! ¿Cómo venís con el curso de React?', send_by_me: false, created_at: '2024-06-01T09:00:00Z', is_read: true },
                { id: 2, text: 'Hola Midu! Remando un poco con las clases, pero armando un clon god.', send_by_me: true, created_at: '2024-06-01T09:30:00Z', is_read: true }
            ]
        },
        {
            id: 4,
            name: 'DevTalles (Fazt)',
            isGroup: true,
            last_time_connection: 'en línea',
            profile_picture: 'https://unavatar.io/youtube/fazttech',
            unread_count: 5,
            isTyping: false,
            messages: [
                { id: 1, text: 'Gente, subí un nuevo video sobre Node.js y Supabase.', send_by_me: false, created_at: '2024-06-01T08:00:00Z', is_read: true, sender_name: 'Fazt' },
                { id: 2, text: '¡Ufff me viene de diez para el backend!', send_by_me: true, created_at: '2024-06-01T08:15:00Z', is_read: true },
                { id: 3, text: '¿Alguien sabe si Supabase soporta triggers de Postgres nativos?', send_by_me: false, created_at: '2024-06-01T08:20:00Z', is_read: false, sender_name: 'UsuarioRandom123' }
            ]
        }
    ],
    communities: [
        {
            id: 101,
            name: 'UTN Programación Web',
            description: 'Comunidad oficial de alumnos de la UTN. Avisos, dudas y proyectos.',
            icon: 'https://ui-avatars.com/api/?name=UTN&background=0055A4&color=fff&rounded=true',
            groups: [
                { id: 201, name: 'Avisos Oficiales', unread: 2 },
                { id: 202, name: 'Dudas Front-End (Martes/Jueves)', unread: 15 },
                { id: 203, name: 'Off-topic / Memes', unread: 0 }
            ]
        },
        {
            id: 102,
            name: 'LOL',
            description: 'League of Legends.',
            icon: 'https://ui-avatars.com/api/?name=LOL&background=25D366&color=fff&rounded=true',
            groups: [
                { id: 204, name: 'General', unread: 0 },
                { id: 205, name: 'Deploy & DevOps', unread: 1 },
                { id: 206, name: 'UI/UX Design', unread: 0 }
            ]
        }
    ]
};

// Mantenemos la compatibilidad con tu código viejo, pero exportamos el objeto completo
export default appData.chats;