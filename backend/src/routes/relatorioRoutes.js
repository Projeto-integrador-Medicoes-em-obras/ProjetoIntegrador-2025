import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'

const router = Router()

// Controller de exemplo (por enquanto retorna um resumo fixo)
function relatorio(req, res) {
  res.json({
    totalClientes: 10,
    totalMedicoes: 5,
    mensagem: "Relatório gerado com sucesso!"
  })
}

// Rota protegida com JWT
router.get('/', auth, relatorio)

export default router

