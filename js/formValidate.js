//recupérer les données du formulaire
const inputsSansSubmit = document.querySelectorAll('input:not([type="submit"])');
const inputSubmit = document.querySelector("input[type=submit]");
const formulaire = document.querySelector("form")
const textarea = document.querySelector("textarea")
const error = document.querySelector(".error")
let limiteCaracteres = 50;

let information = {
    Nom: "",
    Prenom: "",
    Mail: "",
    Description: ""
}


let inputSaisie = false
var formulaireValide = true;

// Pour la lecture NFC
const ndef = new NDEFReader();


textarea.addEventListener("input", function () {
    let longueurTexte = textarea.value.length;

    //si la longueur du text est plus grande que la limite
    if (longueurTexte > limiteCaracteres) {
        textarea.value = textarea.value.substring(0, limiteCaracteres);
        error.textContent = limiteCaracteres + " caractères (limite atteinte)";
        textarea.readOnly = false
    } else {
        error.textContent = ""
    }
});



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
        }

    })

    let formulaireValide = Array.from(inputsSansSubmit).every(function (input) {
        return input.value !== ""; // Vérifier que la valeur de chaque champ n'est pas vide
    });

    if (!formulaireValide) {
        error.textContent = "Veuillez remplir tout les champs";
    } else {

        scanTag().then(async (validation) => {
            NFCMessage("then");

            if (validation) {

                const encoder = new TextEncoder();
                await ndef.write({
                    records: [
                        {
                            id: "A7G5UI924G66EP4",
                            recordType: "mime",
                            mediaType: "application.json",
                            data: encoder.encode(JSON.stringify(information))
                        }]
                });


            } else {

                NFCMessage("Le Tag NFC n'est pas un NFCmon.");

            }
        });
    }
}


async function scanTag() {
    NFCMessage("Scan Tag");
    await ndef.scan();

    return ndef.onreading = async (e) => {
        NFCMessage("onreading");
        if (isValidRecord(e.message.records)) {
            NFCMessage("true");
            return true;
        }
        else {
            NFCMessage("false");
            return false;
        }
    }
}


function isValidRecord(record) {

    if (record.id = "A7G5UI924G66EP4" && record.recordType === "mime" && record.mediaType === "application/json") {
        return true;
    }
    else {
        return false
    }

    //return true;
}


function NFCMessage(message) {
    console.log(message);
}


formulaire.addEventListener("submit", informationSubmit)