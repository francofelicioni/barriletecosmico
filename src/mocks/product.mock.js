import { fakerEN_GB as faker } from "@faker-js/faker";
import { productModel } from "../persistence/mongo/models/product.model.js";

export const generateProductMocks = async (quantity = 100) => {
  const products = [];

  for (let i = 1; i <= quantity; i++) {

    const product = {
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      thumbnail: faker.image.url(),
      code: faker.string.alphanumeric(6),
      stock: faker.number.int({ min: 1, max: 100 }),
      status: faker.datatype.boolean(),
      price: faker.commerce.price(),
      category: faker.commerce.department()
    };

    products.push(product);
  }

  productModel.insertMany(products);
  return products;
}