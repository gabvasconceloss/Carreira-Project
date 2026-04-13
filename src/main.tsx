// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App' // Importa o arquivo App.tsx
import './index.css'        // Importa os estilos globais

// Pega a 'div' com id 'root' que fica lá no arquivo index.html e injeta nosso site dentro dela
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)