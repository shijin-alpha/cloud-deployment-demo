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
        <style>
            :root {
                --bg: #0f172a;
                --card-bg: #1e293b;
                --text: #f8fafc;
                --text-muted: #94a3b8;
                --primary: #38bdf8;
                --success: #4ade80;
                --danger: #f87171;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--bg);
                color: var(--text);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
            }
            .container {
                background: var(--card-bg);
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
                width: 100%;
                max-width: 550px;
                text-align: center;
            }
            .logo {
                font-size: 3rem;
                margin-bottom: 10px;
            }
            h1 {
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
            }
            p.subtitle {
                color: var(--text-muted);
                font-size: 1rem;
                margin-bottom: 30px;
            }
            .status-badge {
                display: inline-block;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 25px;
            }
            .status-badge.secure {
                background: rgba(74, 222, 128, 0.15);
                color: var(--success);
                border: 1px solid rgba(74, 222, 128, 0.3);
            }
            .status-badge.insecure {
                background: rgba(248, 113, 113, 0.15);
                color: var(--danger);
                border: 1px solid rgba(248, 113, 113, 0.3);
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
                text-align: left;
                margin-bottom: 30px;
            }
            .info-item {
                background: rgba(15, 23, 42, 0.4);
                padding: 14px 18px;
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .info-label {
                font-size: 0.75rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
            }
            .info-value {
                font-size: 1rem;
                font-weight: 500;
            }
            .btn-group {
                display: flex;
                gap: 10px;
            }
            .btn {
                flex: 1;
                display: inline-block;
                padding: 12px;
                background: var(--primary);
                color: #0f172a;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.95rem;
                transition: opacity 0.2s ease;
            }
            .btn:hover { opacity: 0.9; }
            .btn.secondary {
                background: transparent;
                color: var(--text);
                border: 1px solid rgba(255,255,255,0.15);
            }
            .btn.secondary:hover {
                background: rgba(255,255,255,0.05);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🚀</div>
            <h1>Cloud Deployment Demo</h1>
            <p class="subtitle">Your web server is configured and running properly.</p>
            
            <div class="status-badge ${protocolClass}">
                SSL Status: ${isSecure}
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Environment Target</div>
                    <div class="info-value">Ubuntu Server (AWS EC2)</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Server Local Node Time</div>
                    <div class="info-value">${new Date().toUTCString()}</div>
                </div>
            </div>

            <div class="btn-group">
                <a href="/api/info" class="btn">View App Info</a>
                <a href="/health" class="btn secondary">Check Health</a>
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
