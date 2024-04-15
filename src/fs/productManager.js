import fs from 'fs';

class ProductManager {
  constructor() {
    this.products = [];
    this.path = ('./src/fs/files/products.json')
  }
  init () {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log('file created!');
      } else {
        console.log('file connected');
      }
      
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    let productsJson = await fs.promises.readFile(this.path, 'utf-8');
    this.products = productsJson || [];
    return this.products;
  }

  async addProduct  (title, desc, price, thumbnail, code, stock) {

    await this.getProducts();

    let newProduct = {
      id: this.products.length + 1,
      title: title,
      desc: desc,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
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

    if (!productFounded) {
      console.log(`Product with id ${id} was not founded.`)
    } else {
      console.log(`Product Founded!
        -Title: ${productFounded.title}
        -Stock: ${productFounded.stock}
        `)
    }
  }

  async updateProduct (id, newdata) {

    await this.getProducts();

    let index = this.products.findIndex(p => p.id === id);

    this.products[index] = {
      ...this.products[index],
      ...newdata
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