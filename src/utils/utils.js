import { faker } from '@faker-js/faker';

const products = [];

export const productsFactory = () => {
    for (let i = 1; i <= 50; i++) {
        const product = {
          id: i,
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          thumbnail: faker.image.url(),
          code: faker.string.alphanumeric(6),
          stock: faker.number.int({min: 1, max: 100}),
          category: faker.commerce.department()
        };
      
        products.push(product);
      }
      return products
}

