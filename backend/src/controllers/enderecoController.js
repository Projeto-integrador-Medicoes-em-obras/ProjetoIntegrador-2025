import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const criarEndereco = async (req, res) => {
  const { clienteId, logradouro, bairro, cidade, cep } = req.body

  try {
    const endereco = await prisma.endereco.create({
      data: { clienteId, logradouro, bairro, cidade, cep }
    })
    res.status(201).json(endereco)
  } catch {
    res.status(400).json({ erro: 'Erro ao criar endereço' })
  }
}
