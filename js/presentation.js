let connection = null;

if ('NDEFReader' in window){
    connection = 1;
}

else{
    if (navigator.presentation.receiver) {
        console.log("ok");
    }
    connection = 1;
}