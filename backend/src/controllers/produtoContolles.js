import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function listarProdutos(req, res) {
  const produtos = await prisma.produto.findMany({
    where: { empresaId: req.user.id }
  })
  res.json(produtos)
}

export async function criarProduto(req, res) {
  const { nome, descricao, preco } = req.body
  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        empresaId: req.user.id
      }
    })
    res.status(201).json(produto)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

export async function atualizarProduto(req, res) {
  const { id } = req.params
  const { nome, descricao, preco } = req.body

  try {
    const produto = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco: parseFloat(preco) }
    })
    res.json(produto)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}

export async function deletarProduto(req, res) {
  const { id } = req.params
  try {
    await prisma.produto.delete({ where: { id: parseInt(id) } })
    res.json({ mensagem: 'Produto deletado com sucesso' })
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
}