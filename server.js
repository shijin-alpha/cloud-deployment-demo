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
        <title>Cloud Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg: #000000;
                --fg: #ffffff;
                --muted: #888888;
                --border: #333333;
                --card-bg: #0a0a0a;
                --accent: #0070f3;
                --success: #00f5d4;
                --danger: #ff003c;
            }

            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

            body {
                background-color: var(--bg);
                color: var(--fg);
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-image: 
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                background-size: 30px 30px;
                background-position: center center;
            }

            .dashboard {
                width: 100%;
                max-width: 800px;
                padding: 40px;
                animation: fadeIn 0.8s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .header {
                margin-bottom: 32px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }

            .header h1 {
                font-size: 24px;
                font-weight: 600;
                letter-spacing: -0.5px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .header h1::before {
                content: '';
                display: block;
                width: 16px;
                height: 16px;
                background: var(--fg);
                border-radius: 4px;
            }

            .status-dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: var(--success);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--success);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0, 245, 212, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(0, 245, 212, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 245, 212, 0); }
            }

            .bento-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }

            .card {
                background: var(--card-bg);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 24px;
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .card:hover {
                border-color: #555;
                transform: translateY(-2px);
            }

            .card::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
            
            .card:hover::after { opacity: 1; }

            .card.span-2 { grid-column: span 2; }
            .card.span-3 { grid-column: span 3; }

            .card-label {
                font-size: 12px;
                color: var(--muted);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }

            .card-value {
                font-size: 20px;
                font-weight: 500;
            }

            .mono { font-family: monospace; font-size: 14px; color: var(--muted); }

            .actions {
                display: flex;
                gap: 12px;
                margin-top: 16px;
            }

            .btn {
                background: var(--fg);
                color: var(--bg);
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                transition: opacity 0.2s;
            }

            .btn:hover { opacity: 0.8; }

            .btn-outline {
                background: transparent;
                color: var(--fg);
                border: 1px solid var(--border);
            }
            .btn-outline:hover { background: rgba(255,255,255,0.05); }

            @media (max-width: 600px) {
                .bento-grid { grid-template-columns: 1fr; }
                .card.span-2, .card.span-3 { grid-column: span 1; }
                .card.span-3 { flex-direction: column; align-items: flex-start !important; gap: 16px; }
            }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <div class="header">
                <h1>Cloud Deployment</h1>
                <div class="mono"><span class="status-dot"></span> Operational</div>
            </div>
            
            <div class="bento-grid">
                <div class="card span-2">
                    <div class="card-label">Protocol Status</div>
                    <div class="card-value">${isSecure}</div>
                    <div class="mono" style="margin-top: 8px;">Network: Edge Network</div>
                </div>
                
                <div class="card">
                    <div class="card-label">Region</div>
                    <div class="card-value">us-east-1</div>
                    <div class="mono" style="margin-top: 8px;">AWS EC2</div>
                </div>

                <div class="card span-3" style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="card-label">System Time</div>
                        <div class="card-value">${new Date().toUTCString()}</div>
                    </div>
                    <div class="actions">
                        <a href="/api/info" class="btn">View Info</a>
                        <a href="/health" class="btn btn-outline">Check Health</a>
                    </div>
                </div>
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
