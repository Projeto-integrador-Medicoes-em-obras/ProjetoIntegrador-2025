import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const criarFuncionario = async (req, res) => {
  const { nome, cpf, email, senha, cargo } = req.body
  const empresaId = req.empresaId  // capturado pelo middleware do token

  if (!nome || !cpf || !email || !senha || !cargo) {
    return res.status(400).json({ erro: "Preencha todos os campos obrigatórios" })
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 8)
    const novoFuncionario = await prisma.funcionario.create({
      data: {
        nome,
        cpf,
        email,
        senha: senhaHash,
        cargo,
        empresaId
      }
    })

    res.status(201).json(novoFuncionario)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Erro ao cadastrar funcionário" })
  }
}

export const editarFuncionario = async (req, res) => {
  const funcionarioId = parseInt(req.params.id)
  const { nome, email, cargo } = req.body

  try {
    const funcionarioAtualizado = await prisma.funcionario.update({
      where: { id: funcionarioId },
      data: { nome, email, cargo }
    })

    res.json(funcionarioAtualizado)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Erro ao atualizar funcionário" })
  }
}

