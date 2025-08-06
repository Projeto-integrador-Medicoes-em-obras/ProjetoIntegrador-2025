import { useState } from 'react'
import api from '../api'

export default function Clientes() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')

  const handleAdd = async () => {
    try {
      await api.post('/clientes', { nome, telefone })
      alert('Cliente cadastrado!')
    } catch {
      alert('Erro ao cadastrar cliente')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastrar Cliente</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} /><br/>
      <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} /><br/>
      <button onClick={handleAdd}>Cadastrar</button>
    </div>
  )
}

