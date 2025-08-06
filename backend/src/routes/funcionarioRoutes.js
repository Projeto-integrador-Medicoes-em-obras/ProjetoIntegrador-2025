
import express from 'express'
import { criarFuncionario, editarFuncionario } from '../controllers/funcionarioController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Criar funcionário (precisa estar autenticado como empresa)
router.post('/', auth, criarFuncionario)

// Editar funcionário
router.put('/:id', auth, editarFuncionario)

export default router
