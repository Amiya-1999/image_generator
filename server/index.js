import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import express from 'express';
import PostRouter from './routes/Posts.js';
import GenerateImageRouter from './routes/GenerateAIImage.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.use('/api/post', PostRouter);
app.use('/api/generateImage', GenerateImageRouter);

// Default Get
app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello MERN Developer'
    });
});

// Function to Connect to Mongodb
const connectDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Conntected'))
    .catch((error) => {
        console.log('Failed to connect to DB');
        console.log(error);
    });
};

// Function to Start the Server 
const startServer = async () => {
    try {
        connectDB();
        app.listen(8000, () => console.log('Server started on port 8000'));
    } catch(error) {
        console.log(error);
    }
};

startServer();