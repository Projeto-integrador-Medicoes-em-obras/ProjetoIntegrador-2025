import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function listarClientes(req, res) {
  const clientes = await prisma.cliente.findMany({
    where: { empresaId: req.user.id },
    include: { enderecos: true }
  });
  res.json(clientes);
}

export async function criarCliente(req, res) {
  const { nome, telefone, endereco } = req.body;

  if (!nome || !telefone || !endereco) {
    return res.status(400).json({ erro: "Preencha nome, telefone e endereço" });
  }

  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        telefone,
        empresa: { connect: { id: req.user.id } },
        enderecos: {
          create: [ endereco ]
        }
      },
      include: { enderecos: true }
    });
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarCliente(req, res) {
  const { id } = req.params;
  const { nome, telefone, observacao } = req.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nome, telefone, observacao }
    });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function deletarCliente(req, res) {
  const { id } = req.params;
  try {
    await prisma.cliente.delete({ where: { id: Number(id) } });
    res.json({ mensagem: "Cliente deletado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao excluir cliente" });
  }
}
