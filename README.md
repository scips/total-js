# total-js

JS Total - by Jean-pierre Vincent
9h15 - 18h00

Agenda:
* ECMAScript 3 - ECMAScript 5
* Tools
* Dev. SPA
* Test unitaire/Continuous delivecery + Web Mobile

# DAY #1

http://delicious-insights.com/js-total/jst-day1/

Base et conventions: Brunch [https://github.com/brunch/brunch-guide/blob/master/README.md]

Javascript: Syntaxe OO mais phylosophie différente

## JS OO

En JS tout est **object** sauf **null** et **undefined**

en console:

    var obj= {first: 'Robert', last: 'Smith', age: 36}
    undefined

    obj.first
    "Robert"

    obj['first']
    "Robert"

    obj[42] = 42
    42

    obj
    Object {42: 42, first: "Robert", last: "Smith", age: 36}

    obj.42
    VM508:2 Uncaught SyntaxError: Unexpected number(…)InjectedScript._evaluateOn @ VM150:875InjectedScript._evaluateAndWrap @ VM150:808InjectedScript.evaluate @ VM150:664

    obj['42']
    42

### Iterations

#### On an object: for ( var keyName in obj ) { obj[keyName] }

    for( var keyName in obj) {console.log( keyName, obj[keyName])};

/!\ On arrays: for (var i; i<arr.length; i++ ) ou foreach ()

## Strings

### UTF-8 aa localeCompare()

    'déjà' < 'demain' // => false

    'déjà'.localeCompare('demain') // => -1

    ['Stuart', 'Stéphanie', 'Émile'].sort(function(a,b){return a.localeCompare(b);});
    // => ["Émile", "Stéphanie", "Stuart"]

### Intl --> ECMAScript 6

va permetre de créer les dates, les strings... dans chaque langue

### Split

Transforme une chaine en tableau ==>

    'a,b,c'.split(',') // => ['a','b','c']
    'a,b,c'.split(/,/)

### Slice, substr, substring 

Renvoie une portion de la chaine (utiliser **slice** de préférence)

## Arrays

    var names = ["Antoine", "Christophe", "Cédric", "Damien", "Derek", "Mathieu",
  "Michael", "Sébastien", "Thibaut", "Vincent"];
    names.prof = 'JP';

    names // => ["Antoine", "Christophe", "Cédric", "Damien", "Derek", "Mathieu",
  "Michael", "Sébastien", "Thibaut", "Vincent"]

    dir( names ) // => tout l'object complet

### Iterations for, foreach

#### for
    
    // classical
    for(var i=0; i < names.length; i++) {
         // ...
    }

    // perf ++
    for(var i = 0, len = names.length; i < len; i++) {
        // ...
    }


#### forEach

    names.forEach(function(a,b){
        // a: value
        // b: index
    });

### array concat / join / slice
    
join par défaut sépare avec la virgule, join renvoie une nouvelle string

concat renvoie un nouveau tableau concaténé

slice renvoie une partie du tableau (comme pour les strings)

### push, pop, shift, unshift
!!! modifie le tableau

Push: rajoute en fin de tableau et renvoie le nbr d'élément
Unshift: rajoute en début de tableau et renvoie le nbr d'élément
Pop: enlève du dessus et renvoie l'élément
Shift: enlève le premier et renvoie l'élément

### splice
!!! modifie le tableau

Enlève une partie de longueur définie à un endroit choisi et peut remplacer par quelque chose 

## New 

### String, Boolean, Number

Don't use !!! ça vient de java

Boolean, String and Number are object not native types

### Array, Function, RegExp

à la place de **new Array()** --> **[]**

**new Function();** // permet de créer des fonctions dynamaiquement (moteur de templating, besoin d'eval...)

**new RegExp();** // permet de faire des RegExp de manière dynamique

si RegExp prédéfinie: utiliser directement /\W+/ 

### Date

new Date(); // a utiliser

## == ou ===

### Egalité laxiste **==**

Laxiste parce que:
    
    null == undefined // => true
    42 == true // => false
    '0' == false // => true
    '' == false // => true

### Egalité **===**

A utiliser systématiquement

Vérifie le type d'abord!

## Access object with []

Math.sin() --> Math['sin']()

Cf.: jQuery.easing[easingType]

## Object IN et Object DELETE

    var translator = {age:38, lang:['fr','en','pt']};
    if(translator.age) console.log('age est présent'); // age est présent
    translator.age = null;
    if(translator.age) console.log('age est présent'); // null

si on veut tester la présence de la propriété

    if('age' in translator) console.log('age est présent'); // age est présent

si on veut vraiment supprimer la propriété

    delete translator.age

on peut aussi tester la présence d'un index dans le tableau avec in

    if('4' in translator.lang) console.log('langues: 5');

## hasOwnProperty

Définir ce qui est défini par l'objet et ce qui est hérité de son objet parent

## True & False

False = undefined, null, false, 0, '', NaN

Le reste c'est true

## ParseInt

parseInt(value, base);

En ECMAScript 3 toujours préciser la base sinon 08 -> 0, 09 -> 0 ...

## Date

Vient de Java 1.0

date = new Date(2015,1,1); // => 1er Février 2015 !!! les mois commence à 0

date.getYear(); // ==> 115
date.getFullYear(); // ==> 2015

==> Utiliser les libs éventuellement Intl et Intl polyfill

**Libs: [momentjs|http://momentjs.com]**

## Classes et Objets

Vient de Xerox via Smalltalk
En JS il y a des instance et des constructeur ... et du prototypage

ECMAScript 3: pas **extend**, pas **class** mais des équivalents

**__new__ permet de faire un construteur de toute fonction**

Par convention le constructeur appeler via new return this;

Pour déterminer la classe d'un objet:
* roiDeLaClasse instanceof Person
* roiDeLaClasse.constructor.name

Pour tous les objets issu d'une même classe la propriété constructor est un pointeur vers la classe

### Coder proprement

Accès à this ne fonctionne pas si on travail en mode strict ==> **'use strict'**

Vérifier qu'on a un objet de type de la classe: **if(!this instanceof <CLASSNAME>) throw 'RTFM!';**

### Prototype

Est un objet clé valeur

objet.__proto__ === object.constructor.prototype

Le prototype pointe vers la classe elle même ==> pour rajouter des méthodes à la classe il suffit de faire

    classe.prototype.methode = function(){};

qui en peut s'écrire via extend 

    extend(Person.prototype,{fullName: function FullName() {//...}});

#### Prototyping the native objects (Strings, Number, Date, ...)

may lead to a lot of trouble

## Functional Programming

Function de premier ordre (function est une valeur comme une autre) et function d'ordre supérieur (on peut passer une function comme argument ou en sortie)

Exemple: $.ajax().done(function (){});

### Bonne pratique
La fonction anonyme avec un nom!

    var fx = function fx(a,b) {return a*b};

fx (nom de fonction) permet de tracer dans le stack trace (anonymous function error ... difficile à tracer)

function nommée: le parseur fait du hoisting (il les déplace plus haut dans le code source)

==> Pas de problème a déplacer les fonctions vers le bas dans le même scope

## SCOPE

Par défaut toujours global **"le global c'est le mal"**
Il faut **TOUJOURS** utiliser:
* **var**
* **'use strict';** --> Error si on dépose dans global 

### VAR

s'a portée est la function contenante, pas de risque d'écrasement avec les globales

### LET (ECMAScript 6)

n'a de portée que dans le bloc {}

ex: for(let i=0; ...) {} console.log(i); // -> undefined

### GLOBALE

Convention: utiliser window.x ou GLOBAL.x pour explicitement travailler avec les globales

## CLOSURES: fermetures lexicales

Lors de la création d'une fonction (en utilisant return function(){}) tout le scope est embarqué dans le context de la création.

Permet de faire des modules

    var monModule = ( function () {var classWideVariable;} () );
    var monAutreModule=( function () {var classWideVariable;} ) ();

classWideVariable n'existe que dans le scope de la fonction et est partagé par toutes les instances

## arguments

arguments reprend le tableau des arguments (pas vraiment un array (il a length + index))

functionName.length --> le nombre d'argument par défaut

fusion d'arguments avec extend qui copie d'un objet vers l'autre, c'est mieux que les arguments par défaut ==> 

### bonne pratique
Utiliser les hash + extend dès qu'on dépasse les 2 arguments pas fonction

Pour avoir extend: underscorejs, lowdash, jquery ou l'écrire (5 lignes)

## Module pattern

on return ce qui est public
le reste est privé

## THIS

document.onclick = obj.greet

    objY = {'name':'YYYY'}; 
    objY.greet = obj.greet;

le **this** permet d'accéder selon le cas à la propriété de l'objet courant et de partager des fonctionnalité entre objet cousin.

Pour garder le mode classique des classes: 

    var that=this;

## Partage d'implémentation

### CALL

Applique une fonction sur un objet avec des params: fonction.call(objet, param1, param2, param3)

### APPLY

Applique une fonction sur un objet avec des params: fonction.apply(objet, [param1, param2, param3] )

Paramètre en Tableau => argument dynamique

### deprecated ECMAScript 3 only

**bind**

## Heritage prototypal

### call le constructeur parent

Geek enfant de Human

    function Geek(){
        Person.call(this, arguments);
        this.super = Person.prototype;
    }

Proprement en ECMAScript 5 avec Object.create

Geek.prototype = Object.create(Person.prototype, {constructor: {value: Geek}} )

### Faux héritage (cousinage) -> MIXIN

En utilisant extends pour recopier les propriétés et méthodes d'une classe vers l'autre. Ca casse l'héritage prototypal dynamique.

Plus possible de modifier une méthode/propriété de la chaine parent, plus une instance de la classe parent.

## Static 

ClassName.FunctionName est une function statique qui peut être appelée directement sans instanciation de la classe vu que les classe n'existe pas et sont des functions et donc des objets.

Permet de faire le singleton pattern, une liste des instances des objets créé depuis la classe...

# DAY #2

## JSLint deprecated use JSHint

    // Configuration globale au projet de JSHint
    // =========================================
    //
    // (Y compris celui intégré à votre EDI/éditeur, normalement)
    //
    // [Liste complète des options possibles](http://www.jshint.com/docs/options/)

    {
      // Options de restriction
      // ----------------------

      // Exige les accolades pour les blocs de contrôle
      "curly": true,

      // Exige des (in)égalités strictes : `===` et `!==`
      "eqeqeq": true,

      // Exige que les fonctions appelées avec `new` démarrent par une majuscule
      // (ce qui est traditionnellement le cas pour un constructeur).
      "newcap": true,

      // Interdit les hacks basés sur `arguments.caller` et `arguments.callee`
      // (qui sont de toutes façons illégaux en ES5 Strict).
      "noarg": true,

      // Interdit l'emploi de variables non explicitement déclarées (ou fournies
      // via la directive de commentaire `global`).  Permet de détecter rapidement
      // des fautes de frappe dans les identifiants, par exemple, ainsi que des
      // fuites globales par inadvertance.
      "undef": true,

      // Avertit de variables ou paramètres non utilisés.  Très pratique pour nettoyer
      // du code mais aussi pour certains cas de fautes de frappe.
      "unused": true,

      // Interdit le whitespace en fin de ligne (votre éditeur devrait le nettoyer tout
      // seul de toutes façons, comme avec l'option `trim_trailing_white_space_on_save`
      // de Sublime Text par exemple).
      "trailing": true,

      // Interdit plus de 3 niveaux d'imbrication de blocs
      "maxdepth": 3,

      // Options de relâchement
      // ----------------------

      // Ces options assouplissent les restrictions mises en place par JSHint,
      // qu'elles soient là par défaut ou explicitement au travers d'options.

      // Autorise la présence d'expressions `debugger` dans le code.
      "debug": true,

      // Autorise les (in)égalités laxistes (`==`et `!=`) si l'opérande est `null`,
      // afin de gérer d'un coup `null` et `undefined`, ce qui est un cas fréquent.
      "eqnull": true,

      // Autorise les syntaxes ES6 (`let`, `const`, `yield`, `function*`, `module`…)
      "esnext": true,

      // Autorise les fonctions dans les boucles ; une [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
      // dans une boucle est une solution classique aux
      // [soucis de closure asynchrone](http://www.jshint.com/docs/options/#loopfunc).
      "loopfunc": true,

      // Options d’environnement
      // -----------------------

      // Autorise `console`, `alert`, etc.
      "devel": true,

      // Indique un contexte potentiel Node, donc ses objets globaux (`process`,
      // `Buffer`, `global`…) mais aussi le droit à des `'use strict'` globaux aux fichiers
      // (puisque ce sont forcément des modules).
      "node": true,

      // Warnings désactivés
      // -------------------

      // Autoriser les caractères Unicode dans le source
      "-W100": true,

      // Tuning JS Total
      // ---------------
    }

## Chrome: enable experimental developers tools

## Console

dir( object ) // Chrome
console.dir( object ) // Firefox

console.error() // -> stack trace

### Group

    console.group('Module 1');
    console.log('test 1');
    console.log('test 2');
    console.log('test 3');

    console.groupEnd('Module 1');

    console.groupCollapse('Module 1');
    
    console.table(myArray);

    console.time('XHR');
    // wait
    console.timeEnd('XHR');

### Debugging

Select an element with the debugger

use $0 in console to access this element

    debugger; // create break point automatically in code

## Resources

## Preformances

**Queueing**
**Stalled**
**Request sent**
**Time to First Byte (TTFB)** Temps que met le serveur à renvoyer le premier byte
**Content Download**

## Emulation

**Device**: listes des devices
**Media**: Test media print, display
**Sensors**: Touch, accelerometer, Geoloc

## Debugging mobile

**Weinre**: serveur node qui rajoute un script dans la page + App HTML5
**Browser Sync 2**: [Open source et gratuit|http://www.browsersync.io]
**Flo**: utilisé par Facebook
**Valence**: Remote debugging, via WIFI, usb... 
**Chrome Inspect**: Remote debugging via usb [chrome://inspect/#devices]
**Safari**: Remote debugging via usb
**iOS Webkit debug proxy**: lien entre chrome developper tools + iOS

Idéalement faire un serveur wi-fi via proxy avec une latence fixe de 100ms et un débit constant de 10 Mb

## Pre processeurs

**LESS** puis **SASS** (mixin plus lisible en SASS) très interessant depuis SCSS (support des CSS et du SASS mixé)
**Compass** librairie de mixin assez lourd
**Bourbon** librairie de mixin plus légère
**Stylus** souple (supporte le CSS), les mixin ressemble a une fonction, comprends arguments, supporte du coffee script, il y a des libs: **nib**
**CoffeeScript** Splat (...), Fat arrows (=>)

**Source Maps** permet de mapper un fichier (concaténé, minifié, transpilé) avec d'autres fichiers sources originaux.

## Check supports
* [canIuse|http://www.caniuse.com]: check against analytics
* [html5please|http://html5please.com]: check features support and go for use or/and use polyfill or not
* [html5test|http://www.html5test.com]: check browser support (new devices)
* [modernizr|https://modernizr.com/]: permet de rajouter des classes CSS et d'offrir les infos de support via JS, les tests sont complet (vérifie les fakes tests)

### Utiliser 
Si on utilise modernizr, block le rendering, redéfini des css sur le body => repaint

Modernizr à un coup pour les tests, on peut les déclencher nous même le plus tard possible

## Modules

* Permet de ranger dans des unités logiques. 
* Règle les dépendances.
* Se débarasser du global.

### CommonJS

Introduit par Node, chauqe fichier physique est un module => module = nom du fichier.
Les variables dans le module à un scope local.
On utilise exports pour exporter des éléments du module.

__pathspec.js__
    exports.key = 'value';

__main.js__
    mod = require('pathspec');

Ok pour les scripts parce que c'est **synchrone**!

### AMD

**Asynchronous** Module Définition, conçu pour les browsers.

__pathspec.js__
    function(){return {'myobject':obj}};

__main.js__
    define(['pathspec']function(PS){PS.myobject});

Fonctionne bien avec quelques fichiers mais si bcp de fichiers ==> il faut maintenir les dépendences, lourd, le js s'éxécute très tard.

Mais solution avec Almondify. Compilation via node.

### Harmony (ES6)

Proche de common js (synchrone), mais utilise une notation python.

SystemJS capable de prendre du AMD, commonJS, ES6 et faire en sorte que ça marche.

**import**, **from**, **export**

### Frameworks

MVC pas toujours nécessaire, parfois jquery suffit.
Mais Single Page Application ==> Plusieurs modules, routing, state full.

#### Backbone

Naturellement utilisé par la majorité des gens (2x que angular et sans google evangelist)

Gère HTML5 history api, pas grand chose pour les vues => utiliser un moteur de template à part.
Pas contraignant.
Bcp de plugins, facile à customiser.

#### Autres

**Ember.js**: + lourd que backbone, contraignant
**Marionette**: Rajoute des convention de vue/routage à backbone
**Chaplin**
**Thorax**

#### AngularJS

Poussé par les evangelists Google, pas fair-play (pas de contrib externe, pas de pull request acceptée), c'est une solution pour éviter le javascript. Ne fonctionne bien qu'avec chrome (pas IE). Lourd. Même idée que DART, GWT, ...

### CommonJS compilé en 1! fichier

## Make

### Brunch.io

* sass -> css -> css minified + move
* coffee -> JS -> minified + move

Très rapide, peu de config si l'on suit les conventions.

Bcp de plugins. Même phylosophie que gulp.
**template**, **image**, **minify**, **syntax check**, ...

#### Template support

**handlebarsjs**: templating avec du text
**jade**

#### Config

exports.config =

  files:
    javascripts: # --> all plugins that reports to handle javscript

# DAY #3

## Backbone Collection

Dans une collection backbone on peut l'associer à un Model par défaut, il créera automatiquement un objet d'après le Model avec les arguments de l'appel comme propriétés

## REST + JSON

*Verbs*: GET, POST, PUT, DELETE
*Code*: 200, 3xx, ..., 4xx, ...

Par défaut supporté par Backbone

## setTimeout 0

Execute qqch la prochaine fois que tu es libre
setTimeout empile des functions a éxécuter dès que le navigateur rend la main.

1. Navigateur execute le javascript et bloque le rendering
2. Le Navigateur modifie le rendu
3. Le Navigateur check la pile de function a éxécuter (déposer via setTiemout par exemple et les exécute)

# DAY #4

## Convention sans promise

Async: ordre des params: callback(**error**, **data**)

### DEFER

Comme chaque execution javascript est bloquante et synchrone, lors d'appel à des méthode asynchrone, si l'on réutilise les données en retour, il est important de laisser le temps au moteur JS de terminer d'éxécuter la pile de code courante.

On utilise donc setTimeout(function(){},0); pour mettre sur une autre pile qui sera éxécutée plus tard.

_.defer() rend tout ça plus élégant.

## Cache Manifest

A rajouter dans 
    <html manifest='appcache.appcache'>

File: ***appcache/appcache***

    CACHE MANIFEST

    CACHE:
    /offline/fallback

    FALLBACK:
    / /offline/fallback

    NETWORK:
    *

Le cache est très agressif, il faut changer le fichier manifest pour qu'il remette à jour. En cas de remise à jour (c'est fait en asynchrone) un event est envoyé au navigateur.

Il faut donc le prévoir au sein de l'application.

### CACHE

Liste des fichiers à cacher

### FALLBACK

Liste des urls et de leur fallback (qui doivent être caché)

### NETWORK

Liste les requêtes pour lesquelles le réseau est toujours appelé.

## Service Worker

Proxy Javascript, ne fonctionnant qu'en HTTPS. Nécessite une autorisation du client.
Cache les requêtes et permet de les modifier et de modifier le contenu.
Capable de recevoir du push du serveur. (Même si le tab est fermé).

## Gérer la cache

addEventListener sur **'updateready'**

pour checker la validité de la cache: appeler window.applicationCache.update(window)

## TESTS

Pourquoi faire des tests: pour la tranquilité du développeur!

### Mocha

**assertion**: micro test

**BDD**: Behavior Driven Development

Mocha permet de faire des **assertion** en **BDD**.

Les tests sont organisé en suite de test via **describe**.

Chaque test écrit en **BDD** commence par **it** ....

Ex.:

    describe('testgroup1', function (){
        it('should accept character with accent', function(){
            assert.equals(true,myFunction());
        });
    });

Mocha est capable d'éxécuter les tests pour node et aussi sur une page web.

#### Supporte l'asynchrone.

Ex.:

    describe('testgroup1', function (){
        it('should accept character with accent', function(done){
            assert.equals(true,myFunction());
            // execute le callback
            done();
        });
    });

#### Reporting

* TAP --> Pour Jenkins par exemple
* JSON --> apps
* HTML --> en ligne

### Chai

Couche qui étend tous les objects avec 3 type de syntaxes: **assert**, **expect**, **should** au choix.

### Sinon

Permet de mocker et d'espionner

#### Spy

Permet de vérifier si les calls/params on bien été utilisées.

#### Stubs

Permet de mocker le retour d'une fonction

#### Fake XMLHttpRequest

Permet de mocker complètement les requête utilisant xmlHTTPRequest

#### Fake Server

Mock un server complet (avec XMLHttpRequet entre autre)

#### Fake time

Permet de tester des événements lié au temps (throttling, timeouts ...)

## Browser testing

### Selenium

Lance de vrai navigateur

### PhantomJS / SlimerJS / TrifleJS

Navigateur head less avec webkit, gecko et IE9

### CasperJS / Polterfeist (ruby)

Pilote PhantomJS/SlimerJS ... avec une API plus haut niveau

### Cloud testing

* Browserstack: Access real devices in the cloud
* Saucelab: Infrastructure selenium dans le cloud

## Documentation

### JSDOC 3

Ressemble à javadoc, format tradiotionnel

### Docco / Gorc

Basé sur le fait que le code est documenté en format markdown (MD)

Possible d'avoir un watcher.

## Performance

[introduction à la webperf|http://www.slideshare.net/jpvincent/introduction-a-la-webperf]

Le taux de conversion chute en dessous de 3 secondes de chargement.

C'est particulièrement vrai pour les sites qui ont une concurence haute (voyage, vidéo, ...).

Pour la perf: tu test! C'est empirique mais ça marche!

### Loading

#### webpagetest

Navigateurs ouvre plusieurs canaux http [tester sur webpagetest|http://www.webpagetest.org]

Possibilité de scripting (à la selenium): click.

Pour les SPOF: utiliser des dns qui timeout: blackhole.webpagetest.org ou block domain.

On peut voir les petites bar oranges: inital connection socket tcp, 

Attention bcp de nom de domaine ==> Saturation de l'OS.

#### dom monster

Tool qui montre de manière simple 

### Recos

* Charger les variantes de graisse (bold, italique) des fonts en asynchrones
* Repasser sur 1! domaine pour les statics (voir tout sur www.rtbF.be)
* Les CSS sont probablement trop compliquée (130 ms pour recalculer le style)
* Le HTML est trop compliqué : 240 ms pour l'évaluer
* Utiliser la Font API à la place du polyfill fontfaceobserver
* Au delà de 14Kb (header compris) tout vient dans la première requête.
* Image plus petites en mobile (le total des images téléchargées sur le mobile est supérieur au desktop)
* fasterize.com: CDN + automated 
* Concatenate + Uglify (Brunch, Browserify, r.js)
* CSS inline en head
* JS critique en bas du body
* prefetch on mouseover
* Spriting avec Glue, Font Awesome + app Icomoon
* Uglification (UglifyJS, Clean-CSS, ImageOptim)
* Compression image: MozJpeg via cjpeg-dssim degrade l'image de manière automatique voir adept jpeg compressor

