import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente
} from '../controllers/clienteController.js'

const router = Router()

router.get("/", auth, listarClientes)
router.post("/", auth, criarCliente)
router.put("/:id", auth, atualizarCliente)
router.delete("/:id", auth, deletarCliente)

export default router