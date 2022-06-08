const express = require('express');
const app = express();

app.use(express.json());

const cachedResults = {};
const idsRequested = [];

const TIMEOUT_SECONDS = 60;

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

app.post('/client/:id', async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(400);

  if (!idsRequested.includes(id)) sendTo3rdParty(id);

  for (let i = 0; i < TIMEOUT_SECONDS * 10; i++) {
    if (cachedResults[id] !== undefined) return res.json(cachedResults[id]);
    else await sleep(100);
  }

  // Handle Timeout
  res.sendStatus(500);
})

app.post('/webhook/:id', async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(400);
  cachedResults[id] = req.body;
  // I assume the 3rd-party service would like a 200 back to measure latency etc.
  res.sendStatus(200);
})


function sendTo3rdParty(id) {
  idsRequested.push(id);
  // axios.post('/do-something', { id }).catch(...);
}

app.listen(3000);