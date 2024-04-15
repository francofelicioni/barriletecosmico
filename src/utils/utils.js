import { faker } from '@faker-js/faker';

const products = [];

export const productsFactory = (q) => {
    for (let i = 1; i <= q; i++) {
        const product = {
          id: i,
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          thumbnail: faker.image.url(),
          category: faker.commerce.department(),
          code: faker.string.alphanumeric(6),
          stock: faker.number.int({min: 1, max: 100})
        };
      
        products.push(product);
      }
      return products
}

