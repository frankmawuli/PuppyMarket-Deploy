import express from 'express';
const router = express.Router();
import Auth from '../Models/authmodel.js';
import { hashPassword, comparePassword } from '../Helpers/authHelper.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Register Route
router.post('/register', async (req, res) => {
    const { name, password, telephone, email, profile, role } = req.body;

    // Input validation
    if (!name || !password || !telephone || !email || !profile) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (telephone.length !== 10) {
        return res.status(400).json({ message: 'Telephone must be 10 characters' });
    }

    try {
        // Check if the email already exists
        const emailExists = await Auth.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password and create the user
        const hashedPassword = await hashPassword(password);
        const user = await Auth.create({
            name,
            password: hashedPassword,
            telephone,
            email,
            profile,
            role: role || 'user', // Assign role, default to 'user'
        });

        res.status(201).json({ message: 'User registered successfully', user });
        console.log(`User ${name} created`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find user by email
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Compare passwords
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Include role in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    return res.status(400).json({ message: 'Error generating token' });
                }
                res.cookie('token', token).status(201).json({ message: 'Logged in successfully', token ,user});
            }
        );

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Get user profile
   router.get('/profile', async (req, res) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if (err) throw err;
                return res.status(400).json({ message: 'Invalid token' });
        
            res.json(user);
        });
    }
    

    
   })










// Middleware to check if user is an admin
const adminMiddleware = (req, res, next) => {
    const { role } = req.user; // Assuming you attach the user object after authentication
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Get all users (Admin only)
router.get('/', adminMiddleware, async (req, res) => {
    try {
        const users = await Auth.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
    try {
        const user = await Auth.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
