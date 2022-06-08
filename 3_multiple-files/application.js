const { getData, hasData, setData } = require('./service/caching-layer');
const { forwardId } = require('./service/the-third-party-service');
const { deferredPromise, resolvedDeferredPromise } = require('./util/deferred-promise');

function acceptDataFromWebhook(id, data) {
  if (!hasData(id)) setData(id, resolvedDeferredPromise(data));
  else setData(id, data);
}

// Assumption: If the same ID has already been posted before, re-use the cached result.
async function retrieveAsyncData(id) {
  if (!hasData(id)) {
    setData(id, deferredPromise());
    forwardId(id);
  }

  return getData(id);
}

module.exports = {
  acceptDataFromWebhook,
  retrieveAsyncData,
}
