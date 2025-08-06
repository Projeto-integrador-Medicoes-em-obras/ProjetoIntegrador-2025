import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Clientes from './pages/clientes.jsx'
import Enderecos from './pages/enderecos.jsx'
import Medicoes from './pages/medicoes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/enderecos" element={<Enderecos />} />
      <Route path="/medicoes" element={<Medicoes />} />
    </Routes>
  </BrowserRouter>
)

