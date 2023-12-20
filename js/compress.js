const input = document.getElementById("image");

input.onclick = function() { this.value = null; };

input.onchange = function(event) {
    
    const file = event.target.files[0];
  
    const blobURL = window.URL.createObjectURL(file);

    const img = new Image();
    img.src = file;
  
    console.log(img.width);
    console.log(img.height);

    img.onload = function(event){
        window.URL.revokeObjectURL(blobURL);
        console.log(img.width);
        console.log(img.height)
    }

    const canvas = document.createElement('canvas');

    canvas.style.display = "none";

    //canvas.width = shrinkWidth()
};

function shrinkWidth(){

}

function shrinkHeigth(){

}