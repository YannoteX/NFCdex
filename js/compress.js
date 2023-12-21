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

        const newBlobURL = getShrinkImageBlob(canvas, img)

        console.log("new size " + newBlobURL.size);
    });
};


async function getShrinkImageBlob(canvas, image){

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);


    let newBlobURL = getCanvasBlob(canvas);
    let stop = false;


    while (!stop){
        let res = await getCanvasBlob(canvas);
        if (res.something) stopped = true;
    }


    if (newBlobURL.size > 7100){

        canvas.width /= 2;
        canvas.height /= 2;

        return getShrinkImageBlob(canvas, image);
    }
    else if (newBlobURL.size < 6500){

        canvas.width *= 1.5;
        canvas.height *= 1.5;

        return getShrinkImageBlob(canvas, image);
    }
    else {
        return newBlobURL;
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

    console.log(newBlob.size)

    return newBlob;
}