import {setAction} from "/js/NFC.js"

const formulaire = document.querySelector("form");
const textarea = document.querySelector("textarea");
const error = document.querySelector(".error");
const input = document.querySelector("input");
const inputClose = document.querySelector(".close");
const inputFile = document.getElementById("imageInput");

export let information = 
  {
    Nom: "",
    Type: "",
    Habitat: "",
    Description: "",
    Image: ""
  }

function cacherElement() {
  document.querySelector(".form-section").style.display = "none";
}

function apparaitElement() {
  document.querySelector(".form-section").style.display = "block";
}

function isMobile() {
  return window.innerWidth <= 768;
}

input.addEventListener("click", () => {
  formulaire.classList.add("display");
  document.querySelector(".form-section").classList.add("dark");
  isMobile() ? setAction("none") : ""
  setTimeout(apparaitElement);

});


inputClose.addEventListener("click", () => {
  formulaire.classList.remove("display");
  document.querySelector(".form-section").classList.remove("dark");
  setTimeout(cacherElement, 1000);
  isMobile() ? setAction("read") : ""
});


let parentElementSection = document.querySelector(".form-section");
let enfantElementForm = formulaire;

parentElementSection.addEventListener("click", function () {
  formulaire.classList.remove("display");
  document.querySelector(".form-section").classList.remove("dark");
  setTimeout(cacherElement, 1000);
  isMobile() ? setAction("read") : ""
});


enfantElementForm.addEventListener("click", function (event) {
  event.stopPropagation();
});

let limiteCaracteres = 100;



textarea.addEventListener("input", function () {
  let longueurTexte = textarea.value.length;

  //si la longueur du text est plus grande que la limite
  if (longueurTexte > limiteCaracteres) {
    textarea.value = textarea.value.substring(0, limiteCaracteres);
    error.textContent = limiteCaracteres + " caractères (limite atteinte)";
    textarea.readOnly = false;
  } else {
    error.textContent = "";
  }
});


function resultJsonForm(objectJson) {
  const resultArray = Object.entries(objectJson);
  return resultArray.shift();
  // const resultAffichage = document.querySelector(".resultAffichageForm");

  // // let filteredElementsPhoto = resultArray[0].map((elementPhoto, index) => {
  // //   return index === 1 ? elementPhoto.name : "";
  // // });

  // // resultAffichage.innerHTML = `<img class="resultImg" src=${imagePreview.src} alt="Logo">`;
  // resultAffichage.innerHTML = resultArray
  //   .map(([key, element], index) => {
  //     if (index !== 0) {
  //       return `
  //           <p>${key} : ${element}</p>
  //           `;
  //     }
  //   })
  //   .join("");
}

export function DataToJson (Data){
  return JSON.stringify(Data);
}

// document.getElementById("imageInput").addEventListener("change", (e) => {
//   const imagePreview = document.getElementById("imagePreview");
//   const file = e.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       imagePreview.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// });


function informationSubmit(e) {
  e.preventDefault();
  isMobile() ? setAction("write") : ""
  const formData = new FormData(document.querySelector("form"));


  // let PhotoUrl = formData.get("Photo");
  let Nom = formData.get("Nom");
  let TypeValue = formData.get("TypeValue");
  let HabitatValue = formData.get("HabitatValue");
  let Description = formData.get("Description");

  // information.Photo = PhotoUrl;
  information.Nom = Nom;
  information.Type = TypeValue;
  information.Habitat = HabitatValue;
  information.Description = Description;

  DataToJson(information);
  resultJsonForm(information)

}

//prend en parametre l'id du formulaire dans le html donc form 
export function resetForm(formId) {
  let form = document.getElementById(formId);

  if (form) {
    form.querySelectorAll('input:not([type="submit"]), textarea').forEach((element) => {
      element.value = "";
    });
  } else {
    console.log("Le formulaire avec l'ID '" + formId + "' n'a pas été trouvé.");
  }
}




// Exemple d'utilisation : resetForm("monFormulaire");



formulaire.addEventListener("submit", informationSubmit);


document.querySelector(".ML").addEventListener("click", (e) => {
  e.preventDefault();
  isMobile() ? setAction("setNFCmon") : ""
})



inputFile.onclick = function() { this.value = null; };

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
            console.log(blob.size)
            str = blob.text()
            blob2 = new Blob([str])
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