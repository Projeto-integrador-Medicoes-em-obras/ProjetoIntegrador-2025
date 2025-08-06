import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// 1) Registrar funcionário (depende de token de empresa)
export async function registerFuncionario(req, res) {
  const { nome, cpf, email, senha, cargo } = req.body
  if (!nome || !cpf || !email || !senha || !cargo) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
  }

  const hash = await bcrypt.hash(senha, 8)
  try {
    const funcionario = await prisma.funcionario.create({
      data: {
        nome,
        cpf,
        email,
        senha: hash,
        cargo,
        empresaId: req.user.id    // vem do authMiddleware
      }
    })
    res.status(201).json(funcionario)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

// 2) Login de funcionário
export async function loginFuncionario(req, res) {
  const { email, senha } = req.body
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
  }

  const func = await prisma.funcionario.findUnique({ where: { email } })
  if (!func) return res.status(401).json({ erro: 'Credenciais inválidas' })

  const ok = await bcrypt.compare(senha, func.senha)
  if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas' })

  const token = jwt.sign(
    { type: 'funcionario', id: func.id, empresaId: func.empresaId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
  res.json({ token })
}

// 3) Listar funcionários da empresa
export async function listarFuncionarios(req, res) {
  const list = await prisma.funcionario.findMany({
    where: { empresaId: req.user.empresaId },
    select: { id: true, nome: true, cpf: true, email: true, cargo: true }
  })
  res.json(list)
}

// 4) Atualizar funcionário
export async function atualizarFuncionario(req, res) {
  const { id } = req.params
  const { nome, cargo, email } = req.body

  try {
    const upd = await prisma.funcionario.update({
      where: { id: Number(id) },
      data: { nome, cargo, email }
    })
    res.json(upd)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

// 5) Deletar funcionário
export async function deletarFuncionario(req, res) {
  const { id } = req.params
  try {
    await prisma.funcionario.delete({ where: { id: Number(id) } })
    res.json({ mensagem: 'Funcionário removido' })
  } catch {
    res.status(400).json({ erro: 'Não foi possível remover' })
  }
}

// 6) Reset de senha (gera e retorna nova senha temporária)
export async function resetSenhaFuncionario(req, res) {
  const { email } = req.body
  if (!email) return res.status(400).json({ erro: 'Email obrigatório' })

  const func = await prisma.funcionario.findUnique({ where: { email } })
  if (!func) return res.status(404).json({ erro: 'Funcionário não encontrado' })

  const nova = Math.random().toString(36).slice(-8)
  const hash = await bcrypt.hash(nova, 8)
  await prisma.funcionario.update({
    where: { email },
    data: { senha: hash }
  })

  // aqui você mandaria um e-mail. Para demo, devolvemos direto:
  res.json({ mensagem: 'Senha redefinida', novaSenha: nova })
}