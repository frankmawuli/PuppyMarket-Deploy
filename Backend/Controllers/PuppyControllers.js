import express from 'express';
const router = express.Router();
import {Puppy} from '../Models/PuppyModel.js';
import mongoose from 'mongoose';
import PuppyMiddleware from '../Middleware/puppyMiddleware.js';


router.get('/', async (req, res) => {
    try {
        const puppies = await Puppy.find();
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
});


router.post('/', PuppyMiddleware.array('images', 3), async (req, res) => {
    const { name, breed, age, price, description } = req.body;

    // Validate input fields
    if (!name || !breed || !age || !price || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const images = req.files.map(file => ({
        filename: file.originalname,
        path: file.path
    }));

    try {
        const newPuppy = new Puppy({
            name,
            breed,
            age,
            price,
            images,
            description
        });
        await newPuppy.save();
        res.status(201).json({ success: true, message: 'Puppy created successfully', puppyDetails: newPuppy });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ success: false, message: 'Failed to create puppy', error: error.message });
    }
});



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No puppy with that id' });
    }
    try {
        await Puppy.findByIdAndRemove(id);
        res.status(200).json({ success: true, message: 'Puppy deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;

