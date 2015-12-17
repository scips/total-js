// Toutes les options sont détaillées ici :
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
	appDir: "./",
  baseUrl: "scripts",
  dir: "../rjs-demo-optimized",
  name: "main",
  optimize: 'none', // or 'uglify2'
  optimizeCss: 'none', // or 'standard'
  fileExclusionRegExp: /^(?:\.|app\.build\.js)/, // or /^(?:\.|app\.build\.js|require\.js|node_modules)/
  removeCombined: true,
  wrap: true,

  generateSourceMaps: true,
  preserveLicenseComments: false,

  // exemple d'alias
  // paths: { jquery: 'jquery-1.10.0'},

  // on remplace après coup l'inclusion de require.js (qu'on a dégagé), par main.js (qu'on a généré)
  /*
  onModuleBundleComplete: function(data) {
     var fs = require.nodeRequire('fs');
     var path = '../rjs-demo-optimized/index.html';
     var src = fs.readFileSync(path, { encoding: 'utf-8'});
     src = src.replace('data-main="scripts/main" src="scripts/require.js"', 'src="scripts/main.js"');
     fs.writeFileSync(path, src);
   }
   */
})
