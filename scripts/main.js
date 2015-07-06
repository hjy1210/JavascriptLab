var myHeading = document.querySelector('h1');
myHeading.innerHTML = 'Hello world!';

var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/Penguins.jpg');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

var myButton = document.querySelector('button');
myButton.onclick = function() {
  setUserName();
}

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Mozilla is cool, ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Mozilla is cool, ' + storedName;
}

/**
 * Example 1
 */
console.log(x === undefined); // logs "true"
var x = 3;

/**
 * Example 2
 */
// will return a value of undefined
var myvar = "my value";
 
(function() {
  console.log(myvar); // undefined
  var myvar = "local value";
})();

(function() {
  console.log(myvar); // my value
})();

function myFunction(){
  console.log(myvar);
}

myFunction();

var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" };

console.log(car.manyCars.b); // Jeep, b is a valid identifier
console.log(car.manyCars["b"]); // Jeep
console.log(car[7]); // Mazda

var unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!"
}
console.log(unusualPropertyNames[""]);  // An empty string
//console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
console.log(unusualPropertyNames["!"]); // Bang!, ! is not a legal identifier