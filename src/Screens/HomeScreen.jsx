import React from 'react'

export default function HomeScreen() {
    return (
        <div className="home-empty-state">
            <svg className="home-illustration" viewBox="0 0 303 172" width="320" height="182" preserveAspectRatio="xMidYMid meet" fill="none">
                <circle cx="151" cy="86" r="86" fill="#e9f2ef" />
                <rect x="86" y="52" width="131" height="80" rx="10" fill="#ffffff" stroke="#d1d7db" strokeWidth="2" />
                <rect x="96" y="64" width="70" height="8" rx="4" fill="#00a884" opacity="0.6" />
                <rect x="96" y="80" width="111" height="6" rx="3" fill="#d1d7db" />
                <rect x="96" y="93" width="90" height="6" rx="3" fill="#d1d7db" />
                <rect x="96" y="106" width="100" height="6" rx="3" fill="#d1d7db" />
                <circle cx="235" cy="118" r="26" fill="#00a884" />
                <path d="M247 118c0 6.6-5.4 12-12 12-2 0-3.9-.5-5.6-1.4l-6.4 1.7 1.7-6.2c-1-1.8-1.6-3.9-1.6-6.1 0-6.6 5.4-12 12-12s11.9 5.4 11.9 12z" fill="#fff" />
            </svg>
            <h1 className="home-title">WhatsApp Web Clon</h1>
            <p>Seleccioná un chat de la lista para empezar a enviar mensajes.</p>
            <p className="home-encryption">🔒 Tus mensajes están cifrados de extremo a extremo</p>
        </div>
    )
}
