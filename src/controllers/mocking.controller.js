import { generateProductMocks } from "../mocks/product.mock.js";
import { productModel } from "../persistence/mongo/models/product.model.js";

const mockingProducts = async (_req, res) => {
    try {
        const products = await generateProductMocks(100);
        productModel.insertMany(products);
        return res.json({ status: 'Mocking Success', payload: products })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Error', message: 'Error generating mock products' })
    }
};

export default { mockingProducts }