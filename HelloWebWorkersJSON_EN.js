// HelloWebWorkersJSON_EN.js associated to HelloWebWorkersJSON_EN.htm

// Our WorkerMessage object will be automatically
// serialized and de-serialized by the native JSON parser
function WorkerMessage(cmd, parameter) {
    this.cmd = cmd;
    this.parameter = parameter;
}

// Output div where the messages sent back by the worker will be displayed
var _output = document.getElementById("output");

/* Checking if Web Workers are supported by the browser */
if (window.Worker) {
    // Getting references to the 3 other HTML elements
    var _btnSubmit = document.getElementById("btnSubmit");
    var _inputForWorker = document.getElementById("inputForWorker");
    var _killWorker = document.getElementById("killWorker");

    // Instantiating the Worker
    var myHelloWorker = new Worker('helloworkersJSON_EN.js');
    // Getting ready to handle the message sent back
    // by the worker
    myHelloWorker.addEventListener("message", function (event) {
        _output.textContent = event.data;
    }, false);

    // Starting the worker by sending it the 'init' command
    myHelloWorker.postMessage(new WorkerMessage('init', null));

    // Adding the OnClick event to the Submit button
    // which will send some messages to the worker
    _btnSubmit.addEventListener("click", function (event) {
        // We're now sending messages via the 'hello' command 
        myHelloWorker.postMessage(new WorkerMessage('hello', _inputForWorker.value));
    }, false);

    // Adding the OnClick event to the Kill button
    // which will stop the worker. It won't be usable anymore after that.
    _killWorker.addEventListener("click", function (event) {
        // Stopping the worker via the terminate() command
        myHelloWorker.terminate();
        _output.textContent = "The worker has been stopped.";
    }, false);
}
else {
    _output.innerHTML = "Web Workers are not supported by your browser. Try with IE10: <a href=\"http://ie.microsoft.com/testdrive\">download the latest IE10 Platform Preview</a>";
}
