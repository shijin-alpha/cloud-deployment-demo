const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main Home Route - Serves a Beautiful, Clean UI
app.get('/', (req, res) => {
    const isSecure = req.headers['x-forwarded-proto'] === 'https' ? 'Secure (HTTPS)' : 'Insecure (HTTP)';
    const protocolClass = req.headers['x-forwarded-proto'] === 'https' ? 'secure' : 'insecure';

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cloud Deployment Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg-color: #0f172a;
                --primary: #8b5cf6;
                --secondary: #3b82f6;
                --success: #10b981;
                --danger: #ef4444;
                --text-main: #f8fafc;
                --text-muted: #94a3b8;
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: 'Inter', sans-serif;
            }

            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                color: var(--text-main);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                overflow: hidden;
                position: relative;
            }

            /* Animated background elements */
            .blob {
                position: absolute;
                filter: blur(80px);
                z-index: 0;
                opacity: 0.6;
                animation: float 10s ease-in-out infinite alternate;
            }
            .blob-1 {
                width: 300px;
                height: 300px;
                background: var(--primary);
                top: -100px;
                left: -100px;
                border-radius: 50%;
            }
            .blob-2 {
                width: 400px;
                height: 400px;
                background: var(--secondary);
                bottom: -150px;
                right: -100px;
                border-radius: 50%;
                animation-delay: -5s;
            }

            @keyframes float {
                0% { transform: translateY(0) scale(1); }
                100% { transform: translateY(30px) scale(1.1); }
            }

            .container {
                background: rgba(30, 41, 59, 0.4);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 50px 40px;
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                width: 100%;
                max-width: 480px;
                text-align: center;
                z-index: 1;
                transform: translateY(20px);
                opacity: 0;
                animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes slideUp {
                to { transform: translateY(0); opacity: 1; }
            }

            .logo-container {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-radius: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.5);
                transform: rotate(-10deg);
                transition: transform 0.3s ease;
            }

            .container:hover .logo-container {
                transform: rotate(0deg) scale(1.05);
            }

            h1 {
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: 10px;
                background: linear-gradient(to right, #fff, #94a3b8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -1px;
            }

            p.subtitle {
                color: var(--text-muted);
                font-size: 1rem;
                margin-bottom: 35px;
                line-height: 1.5;
            }

            .status-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border-radius: 30px;
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 30px;
                transition: all 0.3s ease;
            }

            .status-badge::before {
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }

            .status-badge.secure {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success);
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            .status-badge.secure::before {
                background: var(--success);
                box-shadow: 0 0 10px var(--success);
            }

            .status-badge.insecure {
                background: rgba(239, 68, 68, 0.1);
                color: var(--danger);
                border: 1px solid rgba(239, 68, 68, 0.2);
            }
            .status-badge.insecure::before {
                background: var(--danger);
                box-shadow: 0 0 10px var(--danger);
            }

            .info-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 16px;
                text-align: left;
                margin-bottom: 40px;
            }

            .info-item {
                background: rgba(15, 23, 42, 0.6);
                padding: 16px 20px;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.05);
                transition: transform 0.2s, background 0.2s;
            }

            .info-item:hover {
                transform: translateY(-2px);
                background: rgba(15, 23, 42, 0.8);
                border-color: rgba(255, 255, 255, 0.1);
            }

            .info-label {
                font-size: 0.75rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 6px;
                font-weight: 600;
            }

            .info-value {
                font-size: 1.05rem;
                font-weight: 500;
                color: var(--text-main);
            }

            .btn-group {
                display: flex;
                gap: 16px;
            }

            .btn {
                flex: 1;
                padding: 14px 20px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 0.95rem;
                text-decoration: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .btn-primary {
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: #fff;
                box-shadow: 0 4px 15px -3px rgba(139, 92, 246, 0.4);
            }

            .btn-primary:hover {
                box-shadow: 0 8px 25px -5px rgba(139, 92, 246, 0.6);
                transform: translateY(-2px);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: var(--text-main);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

        </style>
    </head>
    <body>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="container">
            <div class="logo-container">🚀</div>
            <h1>Cloud Dashboard</h1>
            <p class="subtitle">System operational and ready for deployment.</p>
            
            <div class="status-badge ${protocolClass}">
                ${isSecure}
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Environment</div>
                    <div class="info-value">Ubuntu Server (AWS EC2)</div>
                </div>
                <div class="info-item">
                    <div class="info-label">System Time</div>
                    <div class="info-value">${new Date().toUTCString()}</div>
                </div>
            </div>

            <div class="btn-group">
                <a href="/api/info" class="btn btn-primary">App Info</a>
                <a href="/health" class="btn btn-secondary">Health Check</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// JSON API Endpoints (Kept clean for machine reading)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/api/info', (req, res) => {
    res.status(200).json({
        app: 'cloud-deployment-demo',
        environment: 'production',
        author: 'Ubuntu Server'
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running smoothly at http://127.0.0.1:${PORT}`);
});
