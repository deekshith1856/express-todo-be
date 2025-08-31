import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectToDatabase } from './db/connection.js';
import todoRoutes from './routes/todoRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
// Load environment variables
config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Mount routes
app.use('/api/todos', todoRoutes);
// Handle 404 errors for routes that don't exist
app.use(notFound);
// Handle all errors
app.use(errorHandler);
// Connect to MongoDB
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map