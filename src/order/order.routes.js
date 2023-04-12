import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from './order.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /order/:id
router.get('/:id', getOrderById);

// Endpoint GET /order
router.get('/', getOrders);

// Endpoint POST /order
router.post('/', createOrder);

// Endpoint PATCH /order/:id
router.patch('/:id', updateOrder);

// Endpoint DELETE /order/:id
router.delete('/:id', deleteOrder);

export default router;
