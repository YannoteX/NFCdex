const inputFile = document.getElementById("image");

let information;

inputFile.onclick = function() { 
    this.value = null;
    print()
};

inputFile.onchange = function(event) {

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

        canvas.remove();
    });
};


function getShrinkImageBlob(canvas, image){

    const context = canvas.getContext("2d");
    let newBlobURL;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);


    getCanvasBlob(canvas).then(blob => {


        if (blob.size > 7100){

            canvas.width /= 2;
            canvas.height /= 2;

            newBlobURL = getShrinkImageBlob(canvas, image);
        }
        else if (blob.size < 6500){

            canvas.width *= 1.5;
            canvas.height *= 1.5;

            newBlobURL = getShrinkImageBlob(canvas, image);
        }
        else {
            information = blob
            console.log(blob.size);
        }

    });
}


const loadImage = src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

const getCanvasBlob = canvas =>
    new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/webp", 0.5);
});

async function print(){
    while (!stop){
        let str = await information.text();
        if (str.something) stop = true;
    }

    let blob2 = new Blob([str]);
    console.log(blob2.size);

}