const input = document.getElementById("image");

input.onclick = function() { this.value = null; };

input.onchange = function(event) {
    
    const imgWidth = 0;
    const imgHeight = 0;

    const file = event.target.files[0];
  
    const blobURL = window.URL.createObjectURL(file);

    const img = new Image();

    img.onload = function(event){
        window.URL.revokeObjectURL(blobURL);
        
        imgWidth = img.width;
        imgHeight = img.height;
    }

    img.src = blobURL;

    console.log(imgWidth);
    console.log(imgHeight)

    const canvas = document.createElement('canvas');

    canvas.style.display = "none";

    //canvas.width = shrinkWidth()
};

function shrinkWidth(){

}

function shrinkHeigth(){

}