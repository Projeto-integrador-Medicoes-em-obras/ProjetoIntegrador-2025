const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
