import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Link to="/clientes"><button>Gerenciar Clientes</button></Link>
      <Link to="/enderecos"><button>Gerenciar Endereços</button></Link>
      <Link to="/medicoes"><button>Gerenciar Medições</button></Link>
    </div>
  )
}
