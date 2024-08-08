import fs from 'fs'
import { logger } from '../../utils/logger.js';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = ('./src/data/fs/files/carts.json')
        this.init();
    }
    init () {
        try {
          const exists = fs.existsSync(this.path);
    
          if (!exists) {
            fs.writeFileSync(this.path, '[]');
            logger.info('file created!')
        } else {
            logger.info('file connected!')
          }
          
        } catch (error) {
          throw error;
        }
    }

    async getCarts() {
        let cartsJSON = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(cartsJSON);
        return this.carts;
    }

    async getCartById(id) {
        await this.getCarts();
        let cartFound = this.carts.find(p => p.id === id);

        return cartFound;
    }

    async addCart() {
        await this.getCarts();

        const newCart = {
            id: this.carts.length + 1,
            products: [],
        };

        this.carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        return this.carts;
    }

    async updateCart(cid, pid) {
        await this.getCarts();
        const cartIndex = this.carts.findIndex(c => c.id === (+cid));
        if (cartIndex === -1) return `Not found for id ${cid}`

        const cart = this.carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex === -1) {
            cart.products.push({
                product: pid,
                quantity: 1,
            });
        } else {
            cart.products[productIndex].quantity++;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

        return cart;
    }
}

let cartManager = new CartManager()
export default cartManager;