import express from 'express';
import * as controller from '../controllers/exemploController.js';

const router = express.Router();

router.post('/api/exemplos', controller.criar);
router.get('/api/exemplos', controller.buscarTodos);
router.get('/api/exemplos/:id', controller.buscarPorId);
router.put('/api/exemplos/:id', controller.atualizar);
router.delete('/api/exemplos/:id', controller.deletar);

export default router;