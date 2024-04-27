import fs from 'fs'

class CartManager {
    constructor() {
        this.carts = [];
        this.path = ('./src/data/fs/files/carts.json')
        this.init();
    }
    init() {
        try {
            const exists = fs.existsSync(this.path);

            if (!exists) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log('carts file created!');
            } else {
                console.log('carts file connected');
            }

        } catch (error) {
            throw error;
        }
    }

    async getCarts() {
        let cartsJSON = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(cartsJSON) || [];
        return this.carts;
    }

    async getCartById(id) {
        await this.getCarts();
        let cartFounded = this.carts.find(p => p.id === id);

        return cartFounded;
    }

    async addCart(cid, pid) {
        await this.getCarts();
        const cartIndex = this.carts.findIndex(c => c.id === (+cid));
        if (cartIndex === -1) return `Not founded for id ${cid}`

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


    // async addQuantity(cid, pid) {

    //     await this.getCarts()
    //     const index = this.carts.find(c => c.id === (+cid))

    //     if (index === -1) {
    //       return 'Cart not founded'  
    //     } 

    //     this.carts(index).push({
    //         id: pid,
    //         quantity: 1
    //     })

    //     let newCart = {
    //         id: this.carts.length + 1,
    //         products: []
    //     }

    //     this.carts.push(newCart)

    //     await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
    // }
}

let cartManager = new CartManager()
export default cartManager;