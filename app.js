// Dynamically import 'dotenv' and immediately call its config function
import('dotenv').then((dotenv) => dotenv.config());


// import http from 'http';

// const hostname = '127.0.0.1';
// const port = 3000;

import fetch from 'node-fetch';

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



const shopifyDomain = 'www.agrazyday.com';


const webhookUrl = 'http://127.0.0.1:3000/';

async function createWebhook() {
  const response = await fetch(`https://${shopifyDomain}/admin/api/2024-01/webhooks.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      webhook: {
        topic: 'orders/create',
        address: webhookUrl,
        format: 'json',
      },
    }),
  });

  if (!response.ok) {
    console.error(`Failed to create webhook: ${response.status}`);
    return;
  }

  const data = await response.json();
  console.log('Webhook created:', data, response.status);
}

createWebhook();
