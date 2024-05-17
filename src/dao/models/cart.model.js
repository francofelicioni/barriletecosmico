import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    products: {
        type: Array,
        default: [],
    }
})

export const cartModel =  mongoose.model('carts', cartSchema)