import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function relatorio(req, res) {
  try {
    const totalClientes = await prisma.cliente.count();
    const totalMedicoes = await prisma.medicao.count();
    const concluidas = await prisma.medicao.count({
      where: { status: "Concluída" }
    });
    const pendentes = totalMedicoes - concluidas;

    res.json({
      totalClientes,
      totalMedicoes,
      concluidas,
      pendentes
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório', details: error.message });
  }
}

