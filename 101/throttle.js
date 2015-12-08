Function.prototype.throttle = function(limit) {
  var f = this;
  var lastCall = null;

  return function() {
    var now = Date.now();
    if ( lastCall === null || (now-lastCall) >= limit){
        lastCall = now;
        return f.apply(this, arguments);
    }
    return null;
  };
};

// Protocole de test

function sayHi() { console.log(Date.now(), "Hiiiii…"); }

console.log(Date.now());
hiCoquine = setInterval(sayHi.throttle(1000), 100);

setTimeout(function() { clearInterval(hiCoquine); }, 10000);