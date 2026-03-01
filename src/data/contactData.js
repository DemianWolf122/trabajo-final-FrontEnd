const contacts = [
    {
        id: 1,
        name: 'Nate Gentile',
        last_time_connection: 'hace 5 minutos',
        profile_picture: 'https://ui-avatars.com/api/?name=Nate+Gentile&background=0D8ABC&color=fff&size=128',
        messages: [
            {
                id: 1,
                text: 'Che, ¿viste los rumores de las nuevas RTX 5090?',
                send_by_me: false,
                created_at: '2024-06-01T12:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: '¡Una locura total! Pero hay que vender un riñón y medio para armar ese setup.',
                send_by_me: true,
                created_at: '2024-06-01T12:05:00Z',
                is_read: true
            },
            {
                id: 3,
                text: 'Totalmente. Mañana me llega una de ensamble, sale video con refrigeración custom sí o sí.',
                send_by_me: false,
                created_at: '2024-06-01T12:10:00Z',
                is_read: false
            }
        ]
    },
    {
        id: 2,
        name: 'Suprapixel',
        last_time_connection: 'en línea',
        profile_picture: 'https://ui-avatars.com/api/?name=Supra+Pixel&background=FF0000&color=fff&size=128',
        messages: [
            {
                id: 1,
                text: 'Buenas! ¿Pudiste probar los auriculares Sony que te mandé?',
                send_by_me: false,
                created_at: '2024-06-01T10:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Sí Nico, el ANC que tienen es increíble, te aísla de todo el ruido del bondi.',
                send_by_me: true,
                created_at: '2024-06-01T10:15:00Z',
                is_read: true
            }
        ]
    },
    {
        id: 3,
        name: 'DotCSV',
        last_time_connection: 'hace 1 hora',
        profile_picture: 'https://ui-avatars.com/api/?name=Dot+CSV&background=111111&color=fff&size=128',
        messages: [
            {
                id: 1,
                text: 'Hola! ¿Pudiste leer el nuevo paper de OpenAI sobre Sora?',
                send_by_me: false,
                created_at: '2024-06-01T09:00:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'No llego a leer todo Carlos, ¡la IA avanza demasiado rápido!',
                send_by_me: true,
                created_at: '2024-06-01T09:30:00Z',
                is_read: true
            }
        ]
    }
]

export default contacts;