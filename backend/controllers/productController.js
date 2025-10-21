import Product from "../models/Products.js";

// @desc        Get all products
// @route       GET /api/products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc        Get singe product
// @route       GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id, res);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc        Create new product
// @route       POST /api/products
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "SKU already exists"});
        }
        res.status(400).json({message: error.message})
    }
}

// @desc        Update product
// @route       PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.json(product);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: "SKU already exists"});
        }
        res.status(400).json({message: error.message});
    }
}

// @desc        Delete product
// @route       DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.json({ message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc        Get low stock products
// @route       GET /api/products/alerts/low-stock
export const getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({
            $expr: { $lte: ['$quantity', '$reorderLevel'] }
        }).sort({ quantity: 1});
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// @desc        Search products
// @route       GET /api/products/search?q=searchterm
export const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.q;

        if (!searchTerm) {
            return res.status(400).json({message: 'Search term is required'});
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { sku: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ]
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}