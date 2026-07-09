# Chat App — Frontend

Frontend del TP integrador (React + Express): una app de mensajería tipo WhatsApp Web. Consume la API del backend.

Hecho con **React + Vite**.

- **App:** https://trabajo-final-front-end-clonwhatsap.vercel.app
- **API (backend):** https://trabajo-final-backend-etnv.onrender.com
- **Repo backend:** https://github.com/DemianWolf122/trabajo-final-Backend

> El backend usa el plan gratis de Render y se duerme tras inactividad; la primera carga puede tardar ~50 segundos.

## Stack

React + Vite · React Router · Context API · fetch a la API (en `src/services/api.js`).

## Funcionalidades

- Registro + verificación por email + login (JWT en `localStorage`).
- Lista de contactos y chat: enviar mensajes, respuesta automática, vaciar chat.
- CRUD de contactos (crear, y desde el panel de detalle: editar nombre y eliminar).
- Comunidades: crear y borrar.
- Perfil: ver la cuenta y editar el nombre.
- UI responsiva (mobile / desktop) y sesión que se mantiene al refrescar.

## Instalación

1. `npm install`
2. Copiá `.env.example` a `.env` y ajustá la URL de la API si hace falta (`VITE_API_URL=http://localhost:8080/api`).
3. `npm run dev` (corre en `http://localhost:5173`).

> El backend tiene que estar corriendo. Ver el repo `trabajo-final-Backend`.

## Usuario de prueba

- **Email:** `demianfredes@gmail.com`
- **Password:** `demianfredes1234`
