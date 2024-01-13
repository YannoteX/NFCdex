const inputFile = document.getElementById("image");

let information;

inputFile.onclick = function () {
    this.value = null;
    information.text().then(value => {
        let str = value;
        console.log(str);
        let blob2 = new Blob([str]);
        console.log(blob2.size)
    });
}

inputFile.onchange = function (event) {

    const file = event.target.files[0];

    const URL = window.URL.createObjectURL(file);
    let blobURL = new Blob([URL]);

    console.log("original size : " + blobURL.size)

    loadImage(URL).then(img => {

        const canvas = document.createElement('canvas');
        canvas.style.display = "none";
        canvas.width = img.width;
        canvas.height = img.height;

        shrinkImageBase64(canvas, img)

        canvas.remove();
    });
};


function shrinkImageBase64(canvas, image){

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/webp", 0.5);
    const blob = new Blob([base64])

    console.log("canvas width : " + canvas.width);
    console.log("canvas height : " + canvas.height);
    console.log("base64 size : " + blob.size);


    if (blob.size > 7100){

        canvas.width /= 2;
        canvas.height /= 2;

        shrinkImageBase64(canvas, image);
    }
    else if (blob.size < 6500){

        canvas.width *= 1.5;
        canvas.height *= 1.5;

        shrinkImageBase64(canvas, image);
    }
    else {
        information = canvas
        console.log(blob.size);
    }
}


const loadImage = src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });