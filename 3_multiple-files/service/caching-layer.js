const cachedResults = {};

async function getData(id) {
  if (id in cachedResults) return cachedResults[id].promise;
}

function hasData(id) {
  return cachedResults[id] !== undefined;
}

function setData(id, data) {
  if (id in cachedResults) cachedResults[id].resolve(data)
  else cachedResults[id] = data;
}

module.exports = {
  getData,
  hasData,
  setData,
};
