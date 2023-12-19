import {setAction} from "/js/NFC.js"

const formulaire = document.querySelector("form");
const textarea = document.querySelector("textarea");
const error = document.querySelector(".error");
const input = document.querySelector("input");
const inputClose = document.querySelector(".close");

export let information = 
  {
    Nom: "",
    Type: "",
    Habitat: "",
    Description: "",
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
