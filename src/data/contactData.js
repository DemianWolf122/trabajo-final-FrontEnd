const contacts = [
    {
        id: 1,
        name: 'Nate Gentile',
        last_time_connection: 'hace 5 minutos',
        profile_picture: 'https://ui-avatars.com/api/?name=Nate+Gentile&background=0D8ABC&color=fff&size=128',
        messages: [
            { id: 1, text: 'Che, ¿viste los rumores de las nuevas RTX 5090?', send_by_me: false, created_at: '2024-06-01T12:00:00Z', is_read: true },
            { id: 2, text: '¡Una locura total! Pero hay que vender un riñón y medio para armar ese setup.', send_by_me: true, created_at: '2024-06-01T12:05:00Z', is_read: true },
            { id: 3, text: 'Totalmente. Mañana me llega una de ensamble, sale video con refrigeración custom sí o sí. Le voy a meter tubos rígidos.', send_by_me: false, created_at: '2024-06-01T12:10:00Z', is_read: true },
            { id: 4, text: 'Uff, avisá cuando lo subas así dejo mi like. Por cierto, ¿qué fuente le vas a meter a esa bestia?', send_by_me: true, created_at: '2024-06-01T12:15:00Z', is_read: true },
            { id: 5, text: 'Una Corsair de 1200W ATX 3.0 para ir sobrado. Con el nuevo conector de 16 pines, obvio.', send_by_me: false, created_at: '2024-06-01T12:16:00Z', is_read: false }
        ]
    },
    {
        id: 2,
        name: 'Suprapixel',
        last_time_connection: 'en línea',
        profile_picture: 'https://ui-avatars.com/api/?name=Supra+Pixel&background=FF0000&color=fff&size=128',
        messages: [
            { id: 1, text: 'Buenas! ¿Pudiste probar los auriculares Sony que te mandé?', send_by_me: false, created_at: '2024-06-01T10:00:00Z', is_read: true },
            { id: 2, text: 'Sí Nico, el ANC que tienen es increíble, te aísla de todo el ruido del bondi.', send_by_me: true, created_at: '2024-06-01T10:15:00Z', is_read: true },
            { id: 3, text: 'Viste lo que es eso? Y esperá a probar el LDAC con Tidal o Apple Music, la calidad te vuela la cabeza.', send_by_me: false, created_at: '2024-06-01T10:20:00Z', is_read: false }
        ]
    },
    {
        id: 3,
        name: 'Midudev',
        last_time_connection: 'escribiendo...',
        profile_picture: 'https://ui-avatars.com/api/?name=Midu+Dev&background=00A8E8&color=fff&size=128',
        messages: [
            { id: 1, text: '¡Hola Demian! ¿Cómo venís con el curso de React?', send_by_me: false, created_at: '2024-06-01T09:00:00Z', is_read: true },
            { id: 2, text: 'Hola Midu! Remando un poco con los Hooks, pero armando un clon de WhatsApp re cheto para la UTN.', send_by_me: true, created_at: '2024-06-01T09:30:00Z', is_read: true },
            { id: 3, text: '¡Esa es la actitud! Acordate de separar bien los componentes y usar el Context API para los estados globales.', send_by_me: false, created_at: '2024-06-01T09:35:00Z', is_read: true },
            { id: 4, text: 'En eso estoy justo ahora. Le metí login y hasta una pantalla de carga animada.', send_by_me: true, created_at: '2024-06-01T09:40:00Z', is_read: true },
            { id: 5, text: '¡Brutal! Pinta para proyecto de portfolio directo. Cualquier duda pasate por el canal de Discord.', send_by_me: false, created_at: '2024-06-01T09:42:00Z', is_read: false }
        ]
    },
    {
        id: 4,
        name: 'Fazt',
        last_time_connection: 'hace 2 horas',
        profile_picture: 'https://ui-avatars.com/api/?name=Fazt&background=333333&color=fff&size=128',
        messages: [
            { id: 1, text: 'Hey, subí un nuevo video sobre Node.js y Supabase, por si te sirve para el backend de tu app.', send_by_me: false, created_at: '2024-06-01T08:00:00Z', is_read: true },
            { id: 2, text: '¡Uhh me viene al pelo! Justo estaba peleando con la base de datos de Wepairr.', send_by_me: true, created_at: '2024-06-01T08:15:00Z', is_read: true }
        ]
    },
    {
        id: 5,
        name: 'Pelado Nerd',
        last_time_connection: 'hace 10 minutos',
        profile_picture: 'https://ui-avatars.com/api/?name=Pelado+Nerd&background=FF8800&color=fff&size=128',
        messages: [
            { id: 1, text: '¡Aloha! ¿Al final containerizaste la aplicación con Docker como te dije?', send_by_me: false, created_at: '2024-06-01T07:00:00Z', is_read: true },
            { id: 2, text: 'Sí, armé el Dockerfile y el docker-compose.yml. Levantó todo a la primera.', send_by_me: true, created_at: '2024-06-01T07:10:00Z', is_read: true },
            { id: 3, text: '¡Excelente! Eso te va a salvar la vida cuando lo pases a producción en la nube.', send_by_me: false, created_at: '2024-06-01T07:15:00Z', is_read: false }
        ]
    }
]

export default contacts;