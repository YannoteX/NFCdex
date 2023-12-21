const input = document.getElementById("image");

input.onclick = function() { this.value = null; };

input.onchange = function(event) {
    
    let imgWidth = 0;
    let imgHeight = 0;

    const file = event.target.files[0];
  
    const blobURL = window.URL.createObjectURL(file);

    loadImage(blobURL).then(img => {
        console.log(img.width);
        console.log(img.height);
    });

    const canvas = document.createElement('canvas');

    canvas.style.display = "none";
};

function shrinkSize(canReduce, canvas, stop){

}

function reduceQuality(canvas){
    
}

const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;