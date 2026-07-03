import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext.jsx';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const { login, loginInvitado } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    const handleInvitado = async () => {
        setError('');
        setCargando(true);
        try {
            await loginInvitado();
            navigate('/');
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
                    <h2>Iniciá sesión para chatear</h2>
                    <p className='text-padding'>Ingresá con tu email y contraseña.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit" disabled={cargando}>{cargando ? 'Ingresando...' : 'Entrar al Chat'}</button>
                    </form>
                    <button type="button" className="login-guest-btn" onClick={handleInvitado} disabled={cargando}>
                        Entrar como invitado
                    </button>
                    <p className="login-switch">¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
                </div>
            </div>
        </div>
    );
}
