const contacts = [
    {
        id: 1,
        name: 'Nate Gentile',
        last_time_connection: 'hace 5 minutos',
        profile_picture: 'https://unavatar.io/youtube/nategentile7',
        messages: [
            { id: 1, text: 'Che, ¿viste los rumores de las nuevas RTX 5090?', send_by_me: false, created_at: '2024-06-01T12:00:00Z', is_read: true },
            { id: 2, text: '¡Una locura total! Pero hay que vender un riñón y medio para armar ese setup.', send_by_me: true, created_at: '2024-06-01T12:05:00Z', is_read: true },
            { id: 3, text: 'Totalmente. Mañana me llega una de ensamble, sale video con refrigeración custom sí o sí.', send_by_me: false, created_at: '2024-06-01T12:10:00Z', is_read: true }
        ]
    },
    {
        id: 2,
        name: 'Suprapixel',
        last_time_connection: 'en línea',
        profile_picture: 'https://unavatar.io/youtube/SupraPixel',
        messages: [
            { id: 1, text: 'Buenas! ¿Pudiste probar los auriculares Sony que te mandé?', send_by_me: false, created_at: '2024-06-01T10:00:00Z', is_read: true },
            { id: 2, text: 'Sí Nico, el ANC que tienen es increíble, te aísla de todo el ruido del bondi.', send_by_me: true, created_at: '2024-06-01T10:15:00Z', is_read: true }
        ]
    },
    {
        id: 3,
        name: 'Midudev',
        last_time_connection: 'escribiendo...',
        profile_picture: 'https://unavatar.io/github/midudev',
        messages: [
            { id: 1, text: '¡Hola Demian! ¿Cómo venís con el curso de React?', send_by_me: false, created_at: '2024-06-01T09:00:00Z', is_read: true },
            { id: 2, text: 'Hola Midu! Remando un poco con los Hooks, pero armando un clon re cheto.', send_by_me: true, created_at: '2024-06-01T09:30:00Z', is_read: true }
        ]
    },
    {
        id: 4,
        name: 'Fazt',
        last_time_connection: 'hace 2 horas',
        profile_picture: 'https://unavatar.io/youtube/fazttech',
        messages: [
            { id: 1, text: 'Hey, subí un nuevo video sobre Node.js y Supabase.', send_by_me: false, created_at: '2024-06-01T08:00:00Z', is_read: true },
            { id: 2, text: '¡buenisimo!', send_by_me: true, created_at: '2024-06-01T08:15:00Z', is_read: true }
        ]
    },

]

export default contacts;