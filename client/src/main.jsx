import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom';
import './index.css'
import App from './App';
import Options from './pages/options';
import { MiContextoProvider } from './context/contextoUsuario';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MiContextoProvider>
    <App></App>
  </MiContextoProvider>
)
