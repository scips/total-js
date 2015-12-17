// Toutes les options sont détaillées ici :
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
  appDir: "./",
  baseUrl: "scripts",
  dir: "../rjs-demo-optimized",
  name: "main",
  optimize: 'uglify2', // or 'none'
  optimizeCss: 'standard', // or 'none'
  fileExclusionRegExp: /^(?:\.|app\.build\.js|require\.js|node_modules)/,
  include: 'almond',
  removeCombined: true,
  wrap: true,

  generateSourceMaps: true,
  preserveLicenseComments: false,
  // Bonus 2 : dépendance du module three à jQuery
  // paths: { jquery: 'jquery-1.10.0'},

  onModuleBundleComplete: function(data) {
    var fs = require.nodeRequire('fs');
    var path = '../rjs-demo-optimized/index.html';
    var src = fs.readFileSync(path, { encoding: 'utf-8'});
    src = src.replace('data-main="scripts/main" src="scripts/require.js"', 'src="scripts/main.js"');
    fs.writeFileSync(path, src);
  }
})
