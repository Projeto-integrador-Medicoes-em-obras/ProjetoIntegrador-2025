import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import {
  criarMedicao,
  listarMedicoes,
  editarMedicao,
  excluirMedicao,
  atualizarStatus
} from '../controllers/medicaoController.js'

const router = Router()

router.get('/', auth, listarMedicoes)
router.post('/', auth, criarMedicao)
router.put('/:id', auth, editarMedicao)
router.delete('/:id', auth, excluirMedicao)
router.patch('/:id/status', auth, atualizarStatus)

export default router