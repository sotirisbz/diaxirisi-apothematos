import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    searchProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/alerts/low-stock', getLowStockProducts);
router.get('/search', searchProducts);

// Standar CRUD routes
router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;