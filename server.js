const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cloud Deployment Demo</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
          }
          h1 {
            font-size: 42px;
          }
          p {
            font-size: 20px;
          }
        </style>
      </head>

      <body>
        <h1>Cloud Deployment Successful</h1>
        <p>Node.js + Linux + Nginx + AWS EC2</p>
      </body>
    </html>
  `);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Application running on http://127.0.0.1:${PORT}`);
});