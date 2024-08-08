import fs from 'fs';
import { productsSeeder } from '../../utils/productSeeder';
import { logger } from '../../utils/logger.js';
class ProductManager {
  constructor() {
    this.products = [];
    this.path = ('./src/data/fs/files/products.json')
    this.init();
  }
  init () {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const productFactory = productsSeeder(20); 
        const stringData = JSON.stringify(productFactory, null, 2);
        fs.writeFileSync(this.path, stringData);
        logger.info('file created!')
      } else {
        logger.info('file connected!')
      }
      
    } catch (error) {
      throw error;
    }
  }

  async getProducts(category) {
    let productsJSON = await fs.promises.readFile(this.path, 'utf-8');
    this.products = JSON.parse(productsJSON) || [];   

    if (category) {
      // Filter products based on the category
      return this.products.filter(p => p.category === category);
    }

    return this.products;
  }

  async addProduct  ({title, description, price, category, code, stock }) {
    await this.getProducts();

    let newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      category,
      code,
      stock,
      status:true,
    };

    (typeof thumbnail !== 'undefined') 
      ? newProduct.thumbnail = thumbnail
      : newProduct.thumbnail = ''
    

    let productExists = this.products.find(p => p.code === code);

    if (productExists) {
      logger.error(`Error, product already exist with code ${code}`)
      return;
    }

    if (Object.values(newProduct).includes(undefined)) {
      logger.error(`Error: All fields must be completed`)
      return;
    } else {
      logger.info(`Product Added!`)
      this.products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
  }
  async getProductById (id) {
    await this.getProducts();
    let productFound = this.products.find(p => p.id === id);

    return productFound;
  }

  async updateProduct (id, newData) {
    await this.getProducts();
    let index = this.products.findIndex(p => p.id === (+id));

    this.products[index] = {
      ...this.products[index],
      ...newData
    }

    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }

  async deleteProduct (id) {
    await this.getProducts();
    const newProductsArray = this.products.filter(p => p.id !== id)

    if (this.products.length === newProductsArray.length) {
      logger.error(`Product with id ${id} not found, couldn't be deleted`)
      return;
    } 

    await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
    logger.info(`Product with id ${id} successfully deleted`)
  }
}


let productManager = new ProductManager();
export default productManager;