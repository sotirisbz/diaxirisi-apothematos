

const ProductCard = ({ product, onEdit, onDelete }) => {
    const isLowStock = product.quantity <= product.reorderLevel;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                </div>
                {isLowStock && (
                    <span 
                        className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded"
                    >
                        Χαμηλό Απόθεμα
                    </span>
                )}
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Κατηγορία:</span>
                    <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Ποσότητα:</span>
                    <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>{product.quantity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Τιμή:</span>
                    <span className="font-medium">{product.price.toFixed(2)}€</span>
                </div>
                {product.supplier && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Προμηθευτής:</span>
                        <span className="font-medium">{product.supplier}:</span>
                    </div>
                )}
                {product.location && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Τοποθεσία:</span>
                        <span className="font-medium">{product.location}:</span>
                    </div>
                )}
            </div>

            {product.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                </p>
            )}

            <div className="flex space-x-2 pt-4 border-t">
                <button 
                    onClick={() => onEdit(product)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Τροποποίηση
                </button>
                <button
                    onClick={() => onDelete(product._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >

                </button>
            </div>
        </div>
    )
}

export default ProductCard;