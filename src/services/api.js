// Capa de comunicación con el backend de la Chat App.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const getToken = () => localStorage.getItem('chat_token')

const request = async (path, { method = 'GET', body, auth = true } = {}) => {
    const headers = { 'Content-Type': 'application/json' }
    if (auth) {
        const token = getToken()
        if (token) headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.message || 'Hubo un error en la petición')
    return data
}

const api = {
    // --- Auth ---
    register: (nombre, email, password) =>
        request('/auth/register', { method: 'POST', auth: false, body: { nombre, email, password } }),
    login: (email, password) =>
        request('/auth/login', { method: 'POST', auth: false, body: { email, password } }),
    guest: () =>
        request('/auth/guest', { method: 'POST', auth: false }),

    // --- Contactos ---
    getContactos: () => request('/contactos'),
    crearContacto: (data) => request('/contactos', { method: 'POST', body: data }),
    editarContacto: (id, data) => request(`/contactos/${id}`, { method: 'PUT', body: data }),
    borrarContacto: (id) => request(`/contactos/${id}`, { method: 'DELETE' }),

    // --- Mensajes ---
    getMensajes: (contactoId) => request(`/mensajes?contactoId=${contactoId}`),
    enviarMensaje: (data) => request('/mensajes', { method: 'POST', body: data }),
    vaciarChat: (contactoId) => request(`/mensajes/vaciar/${contactoId}`, { method: 'DELETE' }),

    // --- Comunidades ---
    getComunidades: () => request('/comunidades'),
    crearComunidad: (data) => request('/comunidades', { method: 'POST', body: data }),
    editarComunidad: (id, data) => request(`/comunidades/${id}`, { method: 'PUT', body: data }),
    borrarComunidad: (id) => request(`/comunidades/${id}`, { method: 'DELETE' }),

    // --- Perfil ---
    getPerfil: () => request('/auth/me'),
    editarPerfil: (data) => request('/auth/me', { method: 'PUT', body: data })
}

export default api
