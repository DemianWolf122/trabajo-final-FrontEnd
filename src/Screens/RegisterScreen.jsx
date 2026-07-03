import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext.jsx';

export default function RegisterScreen() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [registrado, setRegistrado] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);
        try {
            const usuario = await register(nombre, email, password);
            setRegistrado(usuario);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-logo">
                    <svg viewBox="0 0 39 39" width="39" height="39"><path fill="#00a884" d="M19.5 0C8.7 0 0 8.7 0 19.5c0 3.4 1.3 6.7 3.5 9.3L1.2 37.5l8.9-2.3c2.9 1.9 6.2 2.9 9.4 2.9 10.8 0 19.5-8.7 19.5-19.5S30.3 0 19.5 0zm0 35.8c-2.9 0-5.8-1-8.2-2.7l-.6-.4-6.1 1.6 1.6-6-.4-.6c-2-2.5-3-5.6-3-8.8 0-8.9 7.3-16.2 16.2-16.2s16.2 7.3 16.2 16.2-7.3 16.3-16.2 16.3z"></path></svg>
                    <span>WhatsApp Web Clon</span>
                </div>
            </div>
            <div className="login-body">
                <div className="login-card">
                    {registrado ? (
                        <>
                            <h2>¡Cuenta creada! 🎉</h2>
                            <p className='text-padding'>Verificá tu email para poder iniciar sesión.</p>
                            {registrado.verification_url && (
                                <a href={registrado.verification_url} target="_blank" rel="noreferrer" className="verify-link-btn">
                                    Verificar mi cuenta ahora
                                </a>
                            )}
                            <button type="button" onClick={() => navigate('/')}>Ir a iniciar sesión</button>
                        </>
                    ) : (
                        <>
                            <h2>Creá tu cuenta</h2>
                            <p className='text-padding'>Registrate para empezar a chatear.</p>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                <input type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                {error && <p className="login-error">{error}</p>}
                                <button type="submit" disabled={cargando}>{cargando ? 'Creando...' : 'Registrarme'}</button>
                            </form>
                            <p className="login-switch">¿Ya tenés cuenta? <Link to="/">Iniciá sesión</Link></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
