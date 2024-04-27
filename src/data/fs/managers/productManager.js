import fs from 'fs';
import { productsFactory } from '../../../utils/utils.js';

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
        const productSeeder = productsFactory(20); 
        const stringData = JSON.stringify(productSeeder, null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log('file created!');
      } else {
        console.log('file connected');
      }
      
    } catch (error) {
      throw error;
    }
  }

  async getProducts(category) {
    let productsJson = await fs.promises.readFile(this.path, 'utf-8');
    this.products = JSON.parse(productsJson) || [];   

    if (category) {
      // Filter products based on the category
      return this.products.filter(p => p.category === category);
    }

    return this.products;
  }

  async addProduct  ({title, description, price, thumbnail, category, code, stock }) {
    await this.getProducts();

    let newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      category,
      thumbnail,
      code,
      stock,
      status:true,
    };

    let productExists = this.products.find(p => p.code === code);

    if (productExists) {
      console.log(`Error, product already exist with code ${code}`)
      return;
    }

    if (Object.values(newProduct).includes(undefined)) {
      console.log("Error: All fields must be completed");
      return;
    } else {
      console.log('Product Added!')
      this.products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
  }
  async getProductById (id) {
    await this.getProducts();
    let productFounded = this.products.find(p => p.id === id);

    return productFounded;
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
      console.log(`Product with id ${id} not founded, couldn't be deleted`);
      return;
    } 

    await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
    console.log(`Product with id ${id} successfully deleted`)
  }
}


let productManager = new ProductManager();
export default productManager;