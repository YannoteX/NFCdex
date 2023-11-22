//recupérer les données du formulaire
const inputsSansSubmit = document.querySelectorAll('input:not([type="submit"])');
const inputSubmit = document.querySelector("input[type=submit]");
const formulaire = document.querySelector("form")

let information = {
    Nom: "",
    Prenom: "",
    Mail: "",
    Description: ""
}

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
        console.log("Veuillez remplir tout les champs")
    } else {
        console.log(information)
    }
}


formulaire.addEventListener("submit", informationSubmit)










