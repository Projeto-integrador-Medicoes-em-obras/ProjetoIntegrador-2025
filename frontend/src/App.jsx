import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Altere para a porta do seu backend se não for 8080
    axios.get("http://localhost:8080/usuarios")
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuários Cadastrados</h1>
      {loading ? <p>Carregando...</p> : (
        <ul>
          {usuarios.map(user => (
            <li key={user.id}>{user.nome} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
