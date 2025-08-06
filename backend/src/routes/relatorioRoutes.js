import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'

const router = Router()

// Controller de exemplo (por enquanto retorna um resumo fixo)
function gerarRelatorio(req, res) {
  res.json({
    totalClientes: 10,
    totalMedicoes: 5,
    mensagem: "Relatório gerado com sucesso!"
  })
}

// Rota protegida com JWT
router.get('/', auth, gerarRelatorio)

export default router

