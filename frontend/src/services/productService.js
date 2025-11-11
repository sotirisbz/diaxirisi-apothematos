import api from "./api.js";

export const productService = {
    // Get all products
    getAllProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    }, 

    // Get single product
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },
    
    // Update product
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`)
        return response.data;
    },

    // Get low stock products
    getLowStockProducts: async () => {
        const response = await api.get('/products/alerts/low-stock');
        return response.data;
    },

    // Search products
    searchProducts: async (searchTerm) => {
        const response = await api.get(`/products/search=${searchTerm}`);
        return response.data;
    }
}