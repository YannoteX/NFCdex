const input = document.getElementById("image");

input.onClick((event) => { this.value = null; });

input.onChange((event) => {

    console.log(this.value)
    
    const file = event.target.files[0];

    console.log(file)
  
    const blobURL = window.URL.createObjectURL(file);

    console.log(blobURL);

    const img = new Image();
    img.src = blobURL;
  
    console.log(img.width);
    console.log(img.height);

    img.onload = function(event){
        window.URL.revokeObjectURL(blobURL);
    }

    const canvas = document.createElement('canvas');

    canvas.setAttribute('type', 'hidden');

    //canvas.width = shrinkWidth()
});

function shrinkWidth(){

}

function shrinkHeigth(){

}