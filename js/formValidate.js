//recupérer les données du formulaire
const inputsSansSubmit = document.querySelectorAll(
    'input:not([type="submit"])'
);

const formulaire = document.querySelector("form");
const textarea = document.querySelector("textarea");
const error = document.querySelector(".error");
const selectTypeNFCmon = document.getElementById("Type");
const selectHabitatNFCmon = document.getElementById("Habitat");
const input = document.querySelector("input");
const inputClose = document.querySelector(".close");

input.addEventListener("click", () => {
    formulaire.classList.add("display");
    document.querySelector(".form-section").classList.add("dark");
});

inputClose.addEventListener("click", () => {
    formulaire.classList.remove("display")
    document.querySelector(".form-section").classList.remove("dark");
})

let parentElementSection = document.querySelector(".form-section");
let enfantElementForm = formulaire;

parentElementSection.addEventListener('click', function () {
    formulaire.classList.remove("display")
    document.querySelector(".form-section").classList.remove("dark");
});

enfantElementForm.addEventListener('click', function (event) {
    event.stopPropagation();
});

let limiteCaracteres = 100;

export let information = {
    Photo: "",
    Nom: "",
    Type: "",
    Habitat: "",
    Description: "",
};

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

function informationSubmit(e) {
    e.preventDefault();

    const formData = new FormData(document.querySelector("form"));

    let PhotoUrl = formData.get("Photo");
    let Nom = formData.get("Nom");
    let TypeValue = formData.get("TypeValue");
    let HabitatValue = formData.get("HabitatValue");
    let Description = selectHabitatNFCmon.value;

    information.Photo = PhotoUrl;
    information.Nom = Nom
    information.Type = TypeValue;
    information.Habitat = HabitatValue;
    information.Description = Description;


    this.reset();

    console.log(information)
}

formulaire.addEventListener("submit", informationSubmit);


