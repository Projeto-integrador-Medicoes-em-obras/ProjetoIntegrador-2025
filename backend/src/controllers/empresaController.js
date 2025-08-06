import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const registerEmpresa = async (req, res) => {
  const { nome, cnpj, telefone, email, senha } = req.body
  if (!nome || !cnpj || !telefone || !email || !senha) return res.status(400).json({ erro: "CNPJ e senha são obrigatórios" })

  const senhaHash = await bcrypt.hash(senha, 8)
  try {
    const empresa = await prisma.empresa.create({
      data: {nome, cnpj, telefone, email, senha: senhaHash }
    })
    res.status(201).json(empresa)
  } catch (error) {
    console.error("erro ao cadastrar empresa", error)
    res.status(400).json({erro: error.message})
  }
}
export async function updateEmpresa(req, res) {
  const { nome, telefone, email } = req.body

  try {
    const emp = await prisma.empresa.update({
      where: { id: req.user.id },
      data: { nome, telefone, email }
    })
    res.json(emp)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

export const loginEmpresa = async (req, res) => {
  const dados = req.body;
  console.log('Corpo recebido:', dados);

  const cnpj = dados.cnpj;
  const senha = dados.senha;

  console.log("req.body:", req.body);
  console.log("campos disponiveis", Object.keys(req.body));

  if (!cnpj || !senha) {
    return res.status(400).json({ erro: 'CNPJ e senha são obrigatórios' });
  }

  const empresa = await prisma.empresa.findUnique({ where: { cnpj } });

  if (!empresa || !empresa.senha) {
    return res.status(401).json({ erro: 'CNPJ ou senha inválidos' });
  }

  const senhaConfere = await bcrypt.compare(senha, empresa.senha);

  if (!senhaConfere) {
    return res.status(401).json({ erro: 'CNPJ ou senha inválidos' });
  }

  const token = jwt.sign({ id: empresa.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
  
}
export function logoutEmpresa(req, res) {
  res.json({ mensagem: 'Logout realizado. Apague o token no client.' })
};