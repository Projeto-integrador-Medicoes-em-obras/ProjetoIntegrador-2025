import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const [isCadastro, setIsCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await api.post('/empresas/login', { cnpj, senha })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch {
      alert('Erro ao fazer login')
    }
  }

  const handleCadastro = async () => {
    try {
      await api.post('/empresas/register', { nome, email, cnpj, senha })
      alert('Empresa cadastrada com sucesso! Agora faça login.')
      setIsCadastro(false)
    } catch {
      alert('Erro ao cadastrar empresa')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{isCadastro ? 'Cadastro de Empresa' : 'Login da Empresa'}</h2>

      {isCadastro && (
        <>
          <input placeholder="Nome da Empresa" value={nome} onChange={e => setNome(e.target.value)} /><br/>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        </>
      )}

      <input placeholder="CNPJ" value={cnpj} onChange={e => setCnpj(e.target.value)} /><br/>
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} /><br/>

      {isCadastro ? (
        <button onClick={handleCadastro}>Cadastrar</button>
      ) : (
        <button onClick={handleLogin}>Entrar</button>
      )}

      <p>
        {isCadastro ? 'Já tem conta?' : 'Não tem conta?'}{' '}
        <button onClick={() => setIsCadastro(!isCadastro)}>
          {isCadastro ? 'Fazer login' : 'Cadastrar'}
        </button>
      </p>
    </div>
  )
}
