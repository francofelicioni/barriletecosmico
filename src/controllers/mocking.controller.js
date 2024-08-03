import { generateProductMocks } from "../mocks/product.mock.js";

const mockingProducts = async (_req, res) => {
    try {
        const products = await generateProductMocks(100);
        return res.json({ status: 'Mocking Success', payload: products })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Error', message: 'Error generating mock products' })
    }
};

export default { mockingProducts }