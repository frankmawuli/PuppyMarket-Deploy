import mongoose from "mongoose";
const Schema = mongoose.Schema;

const puppySchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{
        filename: { type: String, required: true },
        path: { type: String, required: true }
    }],
    description: { type: String, required: true }
}, { timestamps: true });
export const  Puppy = mongoose.model('Puppy', puppySchema);