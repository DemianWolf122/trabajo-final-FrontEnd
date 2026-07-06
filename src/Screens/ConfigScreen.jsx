import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Context/AuthContext.jsx'
import api from '../services/api'

export default function ConfigScreen() {
    const { user, actualizarUsuario } = useAuth()
    const navigate = useNavigate()
    const [perfil, setPerfil] = useState(null)
    const [editando, setEditando] = useState(false)
    const [nombreTemp, setNombreTemp] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState('')
    const [okMsg, setOkMsg] = useState('')

    useEffect(() => {
        let activo = true
        api.getPerfil()
            .then(res => { if (activo) setPerfil(res.data.user) })
            .catch(err => { if (activo) setError(err.message) })
        return () => { activo = false }
    }, [])

    const datos = perfil || user

    const empezarEdicion = () => {
        setNombreTemp(datos.nombre)
        setEditando(true)
        setError('')
        setOkMsg('')
    }

    const guardar = async (e) => {
        e.preventDefault()
        if (nombreTemp.trim().length < 3) { setError('El nombre debe tener al menos 3 caracteres'); return }
        setGuardando(true)
        setError('')
        try {
            const res = await api.editarPerfil({ nombre: nombreTemp.trim() })
            setPerfil(res.data.user)
            actualizarUsuario({ nombre: res.data.user.nombre })
            setEditando(false)
            setOkMsg('¡Perfil actualizado!')
        } catch (err) {
            setError(err.message)
        } finally {
            setGuardando(false)
        }
    }

    const formatearFecha = (iso) => {
        if (!iso) return '—'
        return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    return (
        <div className="config-screen fade-in">
            <header className="config-header">
                <button className="back-btn-mobile" onClick={() => navigate('/')}>←</button>
                <h2>Configuración</h2>
            </header>

            <div className="config-body custom-scrollbar">
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(datos.nombre)}&background=00a884&color=fff&size=160`}
                    alt={datos.nombre}
                    className="config-avatar"
                />

                {okMsg && <p className="config-ok">{okMsg}</p>}
                {error && <p className="config-error">{error}</p>}

                <section className="config-field">
                    <span className="config-label">Tu nombre</span>
                    {editando ? (
                        <form className="config-edit" onSubmit={guardar}>
                            <input
                                autoFocus
                                type="text"
                                value={nombreTemp}
                                onChange={(e) => setNombreTemp(e.target.value)}
                                maxLength={50}
                            />
                            <div className="config-edit-actions">
                                <button type="submit" className="btn-green" disabled={guardando || nombreTemp.trim().length < 3}>
                                    {guardando ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button type="button" className="btn-gray" onClick={() => setEditando(false)}>Cancelar</button>
                            </div>
                        </form>
                    ) : (
                        <div className="config-value">
                            <span>{datos.nombre}</span>
                            <button className="config-edit-btn" onClick={empezarEdicion}>Editar</button>
                        </div>
                    )}
                    <p className="config-hint">Este es el nombre que ven tus contactos.</p>
                </section>

                <section className="config-field">
                    <span className="config-label">Email</span>
                    <div className="config-value">
                        <span>{datos.email}</span>
                        {datos.email_verificado && <span className="config-verified">✓ Verificado</span>}
                    </div>
                </section>

                <section className="config-field">
                    <span className="config-label">Miembro desde</span>
                    <div className="config-value"><span>{formatearFecha(datos.fecha_creacion)}</span></div>
                </section>

                <button className="config-back-link" onClick={() => navigate('/')}>← Volver a los chats</button>
            </div>
        </div>
    )
}
