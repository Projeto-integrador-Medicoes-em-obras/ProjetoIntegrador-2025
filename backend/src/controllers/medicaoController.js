import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar medição
export async function criarMedicao(req, res) {
  try {
    const { clienteId, enderecoId, status, dataAgendada } = req.body;

    // Converter a data recebida para um objeto Date
    const dataFormatada = dataAgendada ? new Date(dataAgendada) : null;

    const medicao = await prisma.medicao.create({
      data: {
        clienteId: Number(clienteId),
        enderecoId: Number(enderecoId),
        status: status || 'pendente',
        dataAgendada: dataFormatada
      }
    });

    res.status(201).json(medicao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar medição' });
  }
}

// Listar medições
export async function listarMedicoes(req, res) {
  try {
    const medicoes = await prisma.medicao.findMany({
      include: { cliente: true, endereco: true }
    });
    res.json(medicoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar medições' });
  }
}

// Atualizar status
export async function atualizarStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const medicao = await prisma.medicao.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(medicao);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao atualizar status da medição' });
  }
}

// Concluir medição (atualizar medidas e observação)
export async function concluirMedicao(req, res) {
  const { id } = req.params;
  const { altura, largura, observacao } = req.body;

  try {
    const medicao = await prisma.medicao.update({
      where: { id: Number(id) },
      data: {
        altura: altura ? Number(altura) : null,
        largura: largura ? Number(largura) : null,
        observacao,
        status: 'concluido'
      }
    });
    res.json(medicao);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao concluir medição' });
  }
}

// Excluir medição
export async function excluirMedicao(req, res) {
  const { id } = req.params;

  try {
    await prisma.medicao.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Medição removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao excluir medição' });
  }
}
  
  

  
