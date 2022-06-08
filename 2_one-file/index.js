const express = require('express')
const app = express()

app.use(express.json());

const cachedResults = {};

app.post('/client/:id', async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(400)

  // If the same ID has already been posted before, re-use the cached result.
  if (cachedResults[id] === undefined) addClientToWaitingList(id);

  try {
    res.json(await cachedResults[id].promise);
  } catch (error) {
    res.sendStatus(500)
  }
})

app.post('/webhook/:id', async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(400)

  acceptDataFromWebhook(id, req.body);

  // I assume the 3rd-party service would like a 200 back to measure latency etc.
  res.sendStatus(200);
})

function addClientToWaitingList(id) {
  cachedResults[id] = deferredPromise();
  sendTo3rdParty(id);
}

function sendTo3rdParty(/* id */) {
  // axios.post('/do-something', { id }).catch(...);
}

function acceptDataFromWebhook(id, data) {
  if (cachedResults[id] === undefined) cachedResults[id] = { promise: data };
  else cachedResults[id].resolve(data);
}

function deferredPromise () {
  const wrapper = {};
  wrapper.promise = new Promise(function (resolve, reject) {
    wrapper.resolve = resolve
    wrapper.reject = reject
  });
  return wrapper;
}

app.listen(3000);
