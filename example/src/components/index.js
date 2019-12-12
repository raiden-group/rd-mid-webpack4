const req = require.context('./', true, /index\.js$/);
req.keys().forEach(function(key) {
  let info = /^\.\/([a-z0-9-]+)\/index\.js$/i.exec(key);
  if (!info) return;
  exports[info[1]] = req(key);
});