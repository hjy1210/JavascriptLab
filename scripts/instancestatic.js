//http://abdulapopoola.com/2013/03/30/static-and-instance-methods-in-javascript/
//Constructor
var Person = function (name, age){
    //private properties
    var priv = {};
    
    //Public properties
    this.name = name;
    this.age = age;
    
    //Public methods
    this.sayHi = function(){
        alert('hello');
    }
}
 
// A static method; this method only 
// exists on the class and doesn't exist 
// on child objects
Person.sayName = function() {
    alert("I am a Person object ;)");  
};
 
// An instance method; 
// All Person objects will have this method
Person.prototype.setName = function(nameIn) {
    this.name = nameIn;  
}
 
// Tests
var per = new Person('John Doe', 22);
 
//Shows alert
Person.sayName();
 
 
//Show alert
per.sayHi();
 
//John Doe
per.name;
 
//22
per.age;
 
per.setName('Jane Doe');
 
//Jane Doe
per.name;

//TypeError: Object [object Object] has no method 'sayName'
per.sayName()
