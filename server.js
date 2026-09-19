const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample Health Check Route (Great for AWS monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Main Home Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to your Cloud Deployment Demo!',
        secure: req.headers['x-forwarded-proto'] === 'https' ? 'Yes' : 'No'
    });
});

// Simple API Route Example
app.get('/api/info', (req, res) => {
    res.status(200).json({
        app: 'cloud-deployment-demo',
        environment: 'production',
        author: 'Ubuntu Server'
    });
});

// Fallback for 404 - Route Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running smoothly at http://127.0.0.1:${PORT}`);
});
