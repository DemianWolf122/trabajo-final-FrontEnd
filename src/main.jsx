import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// ¡Acá está la magia que faltaba!
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)