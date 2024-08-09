import customErrors from "../errors/customErrors.js";
import { generateProductMocks } from "../mocks/product.mock.js";
import { logger } from "../utils/logger.js";

const mockingProducts = async (_req, res) => {
    try {
        const products = await generateProductMocks(100);
        return res.json({ status: 'Mocking Success', payload: products })
    } catch (error) {
        logger.error(error)
        throw customErrors.serverError(`Error generating mock products!`)   
    }
};

export default { mockingProducts }