// Dynamically import 'dotenv' and immediately call its config function
import 'dotenv/config'
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';

const app = express();


const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});



const shopifyDomain = process.env.DOMAIN
console.log(shopifyDomain)
const accessToken = process.env.API_KEY

const webhookUrl = 'https://shopify-telegram-bot.vercel.app/';

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
  return data
}

const webhookData = createWebhook();

app.get('/data', (req, res) => {
  const dataToLog = {"test": "test", "webhook" : webhookData};
  res.json(dataToLog);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
