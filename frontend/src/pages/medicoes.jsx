import { useState } from 'react'
import api from '../api'

export default function Medicoes() {
  const [clienteId, setClienteId] = useState('')
  const [enderecoId, setEnderecoId] = useState('')
  const [data, setData] = useState('')
  const [idConcluir, setIdConcluir] = useState('')
  const [altura, setAltura] = useState('')
  const [largura, setLargura] = useState('')
  const [observacao, setObservacao] = useState('')

  const agendar = async () => {
    await api.post('/medicoes', { clienteId: Number(clienteId), enderecoId: Number(enderecoId), dataAgendada: data })
    alert('Medição agendada!')
  }

  const concluir = async () => {
    await api.put(`/medicoes/${idConcluir}`, { altura: parseFloat(altura), largura: parseFloat(largura), observacao })
    alert('Medição concluída!')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Agendar Medição</h2>
      <input placeholder="ID Cliente" value={clienteId} onChange={e => setClienteId(e.target.value)} /><br/>
      <input placeholder="ID Endereço" value={enderecoId} onChange={e => setEnderecoId(e.target.value)} /><br/>
      <input type="datetime-local" value={data} onChange={e => setData(e.target.value)} /><br/>
      <button onClick={agendar}>Agendar</button>

      <h2>Concluir Medição</h2>
      <input placeholder="ID Medição" value={idConcluir} onChange={e => setIdConcluir(e.target.value)} /><br/>
      <input placeholder="Altura" value={altura} onChange={e => setAltura(e.target.value)} /><br/>
      <input placeholder="Largura" value={largura} onChange={e => setLargura(e.target.value)} /><br/>
      <input placeholder="Observação" value={observacao} onChange={e => setObservacao(e.target.value)} /><br/>
      <button onClick={concluir}>Concluir</button>
    </div>
  )
}
