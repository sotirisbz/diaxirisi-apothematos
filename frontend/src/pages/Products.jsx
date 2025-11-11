import { useState } from "react";
import { useProducts } from "../hooks/useProducts.js";
import ProductForm from "../components/products/ProductForm.jsx";
import ProductCard from "../components/products/ProductCard.jsx";

const Products = () => {
    const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (formData) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, formData);
            } else {
                await addProduct(formData);
            }
            setShowForm(false);
            setEditingProduct(null);
        } catch (err) {
            console.error('Error submitting form: ', err);
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    }

    const handleDelete = async (id) => {
        if (window.confirm("Είσαι σίγουρος οτι θέλεις να διαγράψεις αυτό το προϊόν;")) {
            try {
                await deleteProduct(id);
            } catch (err) {
                console.error("Error deleting product: ", err);
            }
        }
    }

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Προϊόντα</h1>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <input 
                        type="text" 
                        placeholder="Αναζήτηση προϊόντων..."  
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        {showForm ? "Ακύρωση" : "+ Προσθήκη Προϊόντος"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {editingProduct ? "Τροποποίηση Προϊόντος" : "Προσθήκη Προϊόντος"}
                    </h2>
                    <ProductForm 
                        product={editingProduct}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Φόρτωση προϊόντων...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-lg">Δε βρέθηκα προϊόντα</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default Products;