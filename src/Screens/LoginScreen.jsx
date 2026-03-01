import React, { useState } from 'react';

export default function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() !== '') {
            onLogin(username);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-logo">
                    <svg viewBox="0 0 39 39" width="39" height="39"><path fill="#00a884" d="M19.5 0C8.7 0 0 8.7 0 19.5c0 3.4 1.3 6.7 3.5 9.3L1.2 37.5l8.9-2.3c2.9 1.9 6.2 2.9 9.4 2.9 10.8 0 19.5-8.7 19.5-19.5S30.3 0 19.5 0zm0 35.8c-2.9 0-5.8-1-8.2-2.7l-.6-.4-6.1 1.6 1.6-6-.4-.6c-2-2.5-3-5.6-3-8.8 0-8.9 7.3-16.2 16.2-16.2s16.2 7.3 16.2 16.2-7.3 16.3-16.2 16.3z"></path></svg>
                    <span>WhatsApp Web Clone</span>
                </div>
            </div>
            <div className="login-body">
                <div className="login-card">
                    <h2>Iniciá sesión para chatear</h2>
                    <p>Ingresá tu nombre de desarrollador para continuar.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Tu nombre (Ej: Demian)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <button type="submit">Entrar al Chat</button>
                    </form>
                </div>
            </div>
        </div>
    );
}