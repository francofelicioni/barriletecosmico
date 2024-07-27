import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_dataTime: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    }
})

ticketSchema.pre('find', function () {
    this.populate('products.product')
})


export const ticketModel = mongoose.model(ticketCollection, ticketSchema);


