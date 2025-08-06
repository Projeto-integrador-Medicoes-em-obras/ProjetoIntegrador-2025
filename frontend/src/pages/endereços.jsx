import { useState } from 'react'
import api from '../api'

export default function Enderecos() {
  const [clienteId, setClienteId] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCep] = useState('')

  const handleAdd = async () => {
    try {
      await api.post('/enderecos', { clienteId: Number(clienteId), logradouro, bairro, cidade, cep })
      alert('Endereço cadastrado!')
    } catch {
      alert('Erro ao cadastrar endereço')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastrar Endereço</h2>
      <input placeholder="ID do Cliente" value={clienteId} onChange={e => setClienteId(e.target.value)} /><br/>
      <input placeholder="Logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} /><br/>
      <input placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} /><br/>
      <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} /><br/>
      <input placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)} /><br/>
      <button onClick={handleAdd}>Cadastrar</button>
    </div>
  )
}
