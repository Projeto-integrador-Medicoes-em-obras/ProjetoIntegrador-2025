import { Router } from 'express'
import { registerEmpresa, loginEmpresa } from '../controllers/empresaController.js'

const router = Router()

router.post('/register', registerEmpresa)
router.post('/login' , loginEmpresa)

export default router
