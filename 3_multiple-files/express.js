const { acceptDataFromWebhook, retrieveAsyncData } = require('./application');
const { idValidator } = require('./middleware/middleware');
const express = require('express');

const app = express()
app.use(express.json());

app.post('/client/:id', idValidator, async (req, res) => {
  const id = req.params.id;

  try {
    res.json(await retrieveAsyncData(id));
  } catch (error) {
    res.sendStatus(500)
  }
})

app.post('/webhook/:id', idValidator, async (req, res) => {
  acceptDataFromWebhook(req.params.id, req.body);

  // I assume the 3rd-party service would like a 200 back to measure latency etc.
  res.sendStatus(200);
})

// If we had some more routes they would've also been extracted to their own folders and files.

function expressListen() {
  app.listen(3000);
}
module.exports = {
  expressListen,
}