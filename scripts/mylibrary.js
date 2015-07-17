(function(window){
    //I recommend this
    'use strict';
    function define_library(){
        var Library = {};
        var name = "Timmy";
        Library.greet = function(){
            return "Hello from the " + name + " library.";
        }
        Library.setName=function(firstname){
            name=firstname;
        }
        return Library;
    }
    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window.Library = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);