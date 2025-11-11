import { createContext, useState, useEffect } from "react";
import { productService } from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Add product
    const addProduct = async (productData) => {
        try {
            setLoading(true);
            setError(null);
            const newProduct = await productService.createProduct(productData);
            setProducts([newProduct, ...products]);
            return newProduct;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Update product
    const updatedProduct = async (id, productData) => {
        try {
            setLoading(true);
            setError(null);
            const updatedProduct = await productService.updateProduct(id, productData);
            setProducts(products.map(p => p._id === id ? updatedProduct : p));
            return updatedProduct;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product');
            throw err;
        } finally {
            setLoading(false);  
        }
    }

    // Delete product
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await productService.deleteProduct(id);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete product");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Search products
    const searchProducts = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.searchProducts(searchTerm);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to search products");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        products, loading, error, fetchProducts, addProduct, updatedProduct, deleteProduct, searchProducts
    };

    return (
        <ProductContext.Provider value={value} >
            {children}
        </ProductContext.Provider>
    )
}