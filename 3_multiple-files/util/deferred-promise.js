function deferredPromise () {
  const wrapper = {};
  wrapper.promise = new Promise((resolve, reject) => {
    wrapper.resolve = resolve
    wrapper.reject = reject
  });
  return wrapper;
}

function resolvedDeferredPromise(data) {
  const p = deferredPromise();
  p.resolve(data)
  return p;
}

module.exports = {
  deferredPromise,
  resolvedDeferredPromise,
};
