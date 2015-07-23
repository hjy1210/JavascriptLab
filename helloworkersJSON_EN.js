function messageHandler(event) {
    // Accessing to the message data sent by the main page
    var messageSent = event.data;

    // Testing the command sent by the main page
    switch (messageSent.cmd) {
        case 'init':
            // You can initialize here some of your models/objects
            // that will be used later on in the worker (but pay attention to the scope!)
            break;
        case 'hello':
            // Preparing the message that we will send back
            var messageReturned = "Hello " + messageSent.parameter + " from a separate thread!";
            // Posting back the message to the main page
            this.postMessage(messageReturned);
            break;
    }
}

// Defining the callback function raised when the main page will call us
this.addEventListener('message', messageHandler, false);


