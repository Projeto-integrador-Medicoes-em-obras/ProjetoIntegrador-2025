import express from 'express'
import publicRoutes from './routes/public.js'
const express = require('express');
const app = express();
app.use('/', publicRoutes)


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.listen(3000, () => console.log("servidor rodando"))

/* 3 rotas 

Públicas 
cadastro de login

Privadas
listas usuarios
*/