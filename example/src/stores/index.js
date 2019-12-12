const req = require.context('./', true, /.js/);
req.keys().forEach(function(key) {
    if(/index.js/.test(key)) return; 
  let info = /^\.\/([a-z0-9-]+)\.js$/i.exec(key);
  exports[`${info[1]}Store`] = req(key).default || req(key);
});