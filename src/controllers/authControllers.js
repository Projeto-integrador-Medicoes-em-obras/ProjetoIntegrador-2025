const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { nome, email, senha, cpf, telefone, cargo } = req.body;
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoFuncionario = await prisma.funcionario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        cpf,
        telefone,
        cargo,
      },
    });
    res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso', funcionario: novoFuncionario });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao registrar funcionário', detalhes: err.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const funcionario = await prisma.funcionario.findUnique({ where: { email } });
    if (!funcionario) return res.status(404).json({ erro: 'Funcionário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: funcionario.id_funcionario }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login', detalhes: err.message });
  }
};

module.exports = { register, login };