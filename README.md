# Chat App — Frontend

Frontend del TP integrador (Full-Stack: React + Express): una **app de mensajería tipo WhatsApp Web**. Consume la API del backend de la Chat App.

Hecho con **React + Vite**.

- **App en producción:** https://trabajo-final-front-end-clonwhatsap.vercel.app
- **API (backend):** https://trabajo-final-backend-etnv.onrender.com
- **Repo del backend:** https://github.com/DemianWolf122/trabajo-final-Backend

> Nota: el backend usa el plan gratuito de Render y "se duerme" tras inactividad; la primera carga puede tardar ~50 segundos.

## Stack

- React 19 + Vite
- React Router (ruteo)
- Context API (`AuthContext`, `ContactsContext`)
- Fetch a la API REST del backend (capa en `src/services/api.js`)

## Funcionalidades

- Registro de usuario + verificación de email + login (JWT en `localStorage`).
- Ingreso como **invitado** (usuario demo).
- Lista de contactos (traída de la API).
- Chat: enviar mensajes (persistidos), respuesta automática simulada, vaciar chat.
- **CRUD de contactos**: crear (✚), y en el panel de detalle del contacto: ver info/estadísticas, editar nombre y eliminar (con sus mensajes).
- **Comunidades**: pestaña con CRUD real (crear y borrar comunidades, traídas de la API).
- **Perfil / Configuración**: pantalla para ver los datos de la cuenta y editar el nombre del usuario.
- UI responsiva (mobile / desktop) con menú adaptado, y sesión persistida al refrescar.

## Instalación

1. Instalá dependencias:
   ```
   npm install
   ```
2. Copiá `.env.example` a `.env` y ajustá la URL de la API si hace falta:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```
3. Levantá el frontend:
   ```
   npm run dev
   ```
   Corre en `http://localhost:5173`.

> **Importante:** el backend tiene que estar corriendo (`http://localhost:8080`). Ver el repo `trabajo-final-Backend`.

## Usuario de prueba

- **Email:** `demo@chat.com`
- **Password:** `ChatApp2026`

También podés usar el botón **"Entrar como invitado"**.

## Build de producción

```
npm run build
```
Genera `dist/` listo para desplegar (Vercel / Netlify).
