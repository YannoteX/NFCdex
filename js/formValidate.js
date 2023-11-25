//recupérer les données du formulaire
const inputsSansSubmit = document.querySelectorAll('input:not([type="submit"])');
const inputSubmit = document.querySelector("input[type=submit]");
const formulaire = document.querySelector("form")
const textarea = document.querySelector("textarea")
const error = document.querySelector(".error")
let limiteCaracteres = 50;

textarea.addEventListener("input", function() {
    let longueurTexte = textarea.value.length;

    //si la longueur du text est plus grande que la limite
    if (longueurTexte > limiteCaracteres) {
        textarea.value = textarea.value.substring(0, limiteCaracteres);
        error.textContent = limiteCaracteres + " caractères (limite atteinte)";
        textarea.readOnly = false
    }else{
        error.textContent = ""
    }
});

let information = [{
    Nom: "",
    Prenom: "",
    Mail: "",
    Description: ""
}]

let inputSaisie = false
var formulaireValide = true;


function informationSubmit(e) {
    e.preventDefault();

    inputsSansSubmit.forEach((element, index) => {
        e.preventDefault();
        if (element.value !== "") {
            switch (index) {
                case 0:
                    information.Nom = element.value
                    break;
                case 1:
                    information.Prenom = element.value
                    break;

                default:
                    information.Mail = element.value
            }

            information.Description = document.querySelector("textarea").value
        } else {

        }

    })

    let formulaireValide = Array.from(inputsSansSubmit).every(function (input) {
        return input.value !== ""; // Vérifier que la valeur de chaque champ n'est pas vide
    });

    if (!formulaireValide) {
        error.textContent = "Veuillez remplir tout les champs";
    } else {
        inputsSansSubmit.forEach(element => {
            element.value = ""
        })
        console.log(information)

        document.querySelector("textarea").value = ""
        document.querySelector(".resultForm").classList.add("list")

        return document.querySelector(".resultForm").innerHTML += `
        <div class="resultChild">
            <p>Nom : ${information.Nom}</p>
            <p>Prenom : ${information.Prenom}</p>
            <p> Email : ${information.Mail}</p>
            <p>Description : ${information.Description}</p>
        </div>
            `
    }
}

formulaire.addEventListener("submit", informationSubmit)









