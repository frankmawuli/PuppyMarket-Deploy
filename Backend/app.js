import express from 'express';
const app = express();
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './Config/db.js'
import cookieParser from 'cookie-parser';

//importing the routes
import messageRoutes from './Routes/MessageRoute.js'
import puppyRouter from './Controllers/PuppyControllers.js';
import authRoutes from './Controllers/authController.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
})

//Creating the Listings Endpoints
app.use('/api/listing', puppyRouter);

//Authentication Routes
app.use('/api/auth', authRoutes);

//creating messages endpoints
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})