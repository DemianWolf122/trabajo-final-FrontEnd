import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const guardado = localStorage.getItem('chat_user')
        return guardado ? JSON.parse(guardado) : null
    })

    const guardarSesion = (token, userData) => {
        localStorage.setItem('chat_token', token)
        localStorage.setItem('chat_user', JSON.stringify(userData))
        setUser(userData)
    }

    const login = async (email, password) => {
        const res = await api.login(email, password)
        guardarSesion(res.data.token, res.data.user)
        return res.data.user
    }

    const register = async (nombre, email, password) => {
        const res = await api.register(nombre, email, password)
        return res.data.user
    }

    const logout = () => {
        localStorage.removeItem('chat_token')
        localStorage.removeItem('chat_user')
        setUser(null)
    }

    // Actualiza los datos del usuario en sesión (ej: tras editar el perfil).
    const actualizarUsuario = (userData) => {
        const merged = { ...user, ...userData }
        localStorage.setItem('chat_user', JSON.stringify(merged))
        setUser(merged)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, actualizarUsuario }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
