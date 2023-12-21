const input = document.getElementById("image");

input.onclick = function() { this.value = null; };

input.onchange = function(event) {

    const file = event.target.files[0];
  
    const URL = window.URL.createObjectURL(file);
    let blobURL = new Blob([URL]);

    console.log("original size : " + blobURL.size)

    loadImage(URL).then(img => {

        const canvas = document.createElement('canvas');
        canvas.style.display = "none";
        canvas.width = img.width;
        canvas.height = img.height;

        getShrinkImageBlob(canvas, img)
    });
};


async function getShrinkImageBlob(canvas, image){

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);


    let newBlobURL;
    let stop = false;

    while (!stop){
        newBlobURL = await getCanvasBlob(canvas);
        if (newBlobURL.something) stop = true;
    }

    console.log("blob" + newBlobURL);

    if (newBlobURL.size > 7100){

        canvas.width /= 2;
        canvas.height /= 2;

        getShrinkImageBlob(canvas, image);
    }
    else if (newBlobURL.size < 6500){

        canvas.width *= 1.5;
        canvas.height *= 1.5;

        getShrinkImageBlob(canvas, image);
    }
    else {
        console.log("new size " + newBlobURL.size);
    }
}


const loadImage = src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

async function getCanvasBlob(canvas){

    let newBlob = new Blob([""]);
    let stop = false;

    let promise = new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/webp", 0.5);
    });

    promise.then(blob => {
        newBlob = blob; 
        stop = true;});

    while (!stop){
        let res = await promise;
    }

    return newBlob;
}