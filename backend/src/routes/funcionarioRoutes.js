import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import {
  registerFuncionario,
  loginFuncionario,
  listarFuncionarios,
  atualizarFuncionario,
  deletarFuncionario,
  resetSenhaFuncionario
} from '../controllers/funcionarioController.js'

const router = Router()

// Tudo aqui (exceto login) precisa de token de empresa
router.post('/', auth, registerFuncionario)
router.get('/', auth, listarFuncionarios)
router.put('/:id', auth, atualizarFuncionario)
router.delete('/:id', auth, deletarFuncionario)

// login e reset de senha não exigem auth
router.post('/login', loginFuncionario)
router.post('/reset-senha', resetSenhaFuncionario)

export default router