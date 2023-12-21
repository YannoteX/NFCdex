const input = document.getElementById("image");

input.onclick = function() { this.value = null; };

input.onchange = function(event) {
    
    let imgWidth = 0;
    let imgHeight = 0;

    const file = event.target.files[0];
  
    const URL = window.URL.createObjectURL(file);
    let blobURL = new Blob([URL]);

    console.log("original size : " + blobURL.size)

    loadImage(blobURL).then(img => {

        const canvas = document.createElement('canvas');
        canvas.style.display = "none";
        canvas.width = img.width;
        canvas.height = img.height;

        const newBlobURL = getShrinkImageBlob(canvas, img)

        console.log("new size " + newBlobURL.size);
    });
};


function getShrinkImageBlob(canvas, image){

    const context = canvas.getContext("2d");
    let newBlobURL;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function (blob) {
        newBlobURL = blob;
    }, "image/webp", 0.4);

    if (newBlobURL.size > 7100){

        canvas.width /= 2;
        canvas.height /= 2;

        return getShrinkImage(canvas, image);
    }
    else if (newBlobURL.size < 6500){

        canvas.width *= 1.5;
        canvas.height *= 1.5;

        return getShrinkImage(canvas, image);
    }
    else {
        return newBlobURL
    }
}


const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;