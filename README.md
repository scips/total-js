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

# DAY #3
# DAY #4
