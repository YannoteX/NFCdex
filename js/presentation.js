let connection = null;

if ('NDEFReader' in window){
    if (navigator.presentation.receiver) {
        console.log("receiver");
    }

    if(navigator.presentation.defaultRequest) {
        console.log("presentation");
    }
    connection = 1;
}

else{
    if (navigator.presentation.receiver) {
        console.log("receiver");
    }

    if(navigator.presentation.defaultRequest) {
        console.log("presentation");
    }
    connection = 1;
}