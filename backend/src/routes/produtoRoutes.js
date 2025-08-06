import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtoController.js'

const router = Router()

router.get('/', auth, listarProdutos)
router.post('/', auth, criarProduto)
router.put('/:id', auth, atualizarProduto)
router.delete('/:id', auth, deletarProduto)

export default router