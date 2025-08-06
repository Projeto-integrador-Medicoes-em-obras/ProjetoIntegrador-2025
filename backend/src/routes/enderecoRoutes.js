import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import { criarEndereco } from '../controllers/enderecoController.js'
const router = Router()

router.post('/', auth, criarEndereco)

export default router
