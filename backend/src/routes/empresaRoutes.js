import { Router } from 'express'
import { registerEmpresa, loginEmpresa, updateEmpresa } from '../controllers/empresaController.js'

const router = Router()

router.post('/register', registerEmpresa)
router.post('/login' , loginEmpresa)
router.put('/', authMiddleware, updateEmpresa)
router.post('/logout', authMiddleware, logoutEmpresa)
export default router
