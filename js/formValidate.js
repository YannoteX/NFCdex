const formulaire = document.querySelector("form");
const textarea = document.querySelector("textarea");
const error = document.querySelector(".error");
const input = document.querySelector("input");
const inputClose = document.querySelector(".close");

function cacherElement() {
  document.querySelector(".form-section").style.display = "none";
}

function apparaitElement() {
  document.querySelector(".form-section").style.display = "block";
}

input.addEventListener("click", () => {
  formulaire.classList.add("display");
  document.querySelector(".form-section").classList.add("dark");
  setTimeout(apparaitElement);
});

inputClose.addEventListener("click", () => {
  formulaire.classList.remove("display");
  document.querySelector(".form-section").classList.remove("dark");
  setTimeout(cacherElement, 1000);
});

let parentElementSection = document.querySelector(".form-section");
let enfantElementForm = formulaire;

parentElementSection.addEventListener("click", function () {
  formulaire.classList.remove("display");
  document.querySelector(".form-section").classList.remove("dark");
  setTimeout(cacherElement, 1000);
});

enfantElementForm.addEventListener("click", function (event) {
  event.stopPropagation();
});

let limiteCaracteres = 100;

export let information = [
  {
    Photo: "",
    Nom: "",
    Type: "",
    Habitat: "",
    Description: "",
  },
];

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
  resultArray.shift();
  const resultAffichage = document.querySelector(".resultAffichageForm");

  let filteredElementsPhoto = resultArray[0].map((elementPhoto, index) => {
    return index === 1 ? elementPhoto.name : "";
  });

  resultAffichage.innerHTML = `Photo : ${filteredElementsPhoto.join("")}`;
  resultAffichage.innerHTML += resultArray
    .map(([key, element], index) => {
      if (index !== 0) {
        return `
            <p>${key} : ${element}</p>
            `;
      }
    })
    .join("");
}

document.getElementById("imageInput").addEventListener("change", () => {
  const imagePreview = document.getElementById("imagePreview");
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});

function informationSubmit(e) {
  e.preventDefault();

  const formData = new FormData(document.querySelector("form"));

  let PhotoUrl = formData.get("Photo");
  let Nom = formData.get("Nom");
  let TypeValue = formData.get("TypeValue");
  let HabitatValue = formData.get("HabitatValue");
  let Description = formData.get("Description");

  information.Photo = PhotoUrl;
  information.Nom = Nom;
  information.Type = TypeValue;
  information.Habitat = HabitatValue;
  information.Description = Description;

  resultJsonForm(information);

  this.reset();
}

formulaire.addEventListener("submit", informationSubmit);
