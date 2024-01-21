import { DataToJson, information, resetForm } from "/js/formValidate.js";

let scanAction = "read";

function removeH1H2FromDiv(divSelector) {
    const divToModify = document.querySelector(divSelector);

    if (divToModify) {
        const h1Element = divToModify.querySelector("h1");
        const h2Element = divToModify.querySelector("h2");
        const BtninstallApp = divToModify.querySelector("button");

        if (h1Element) {
            h1Element.style.display = "none";
        } else if (h2Element) {
            h2Element.style.display = "none";
        } else if (BtninstallApp) BtninstallApp.style.display = "none";
    } else {
        console.log(
            "La div avec le sélecteur '" + divSelector + "' n'a pas été trouvée."
        );
    }
}

"NDEFReader" in window ? phoneMode() : desktopMode();
// Appeler desktopMode lorsque le mode de bureau est détecté
if (window.innerWidth >= 1024) {
    desktopMode();
} else {
    if ("NDEFReader" in window) {
        phoneMode();
    }
}

function desktopMode() { }

function phoneMode() {
    // Pour la lecture NFC
    const ndef = new NDEFReader();
    //

    async function scanTag() {
        ndef.scan().then(() => {
            ndef.onreadingerror = (e) => {
                NFCMessage(
                    "Oops... Une erreur s'est produite, essaie de garder ton tag plus longtemps devant ton telephone"
                );
            };

            ndef.onreading = (e) => {
                const record = e.message.records[0];

                if (scanAction === "read") {
                    if (isValidRecord(record)) {
                        const decoder = new TextDecoder();

                        let json = JSON.parse(decoder.decode(record.data));

                        if (json) {
                            updateView(json);
                        } else {
                            NFCMessage("Tu n'as pas enregistré de NFCmon dans ton tag");
                        }
                    }
                } else if (scanAction === "write") {
                    if (isValidRecord(record)) {
                        writeTag(
                            information,
                            information.Nom + " a été enregsitré dans ton tag NFCmon",
                            "Oops... On a pas pu écrire ton NFCmon, réessaie à nouveau"
                        );

                        setAction("none");
                    }
                } else if (scanAction === "setNFCmon") {
                    writeTag({}, "Tag NFCmon initialisé");
                } else {
                }
            };
        });
    }

    function isValidRecord(record) {
        if (
            record.id === "A7G5UI924G66EP4" &&
            record.recordType === "mime" &&
            record.mediaType === "application/json"
        ) {
            return true;
        } else {
            NFCMessage("Ton tag NFC n'est pas un tag NFCmon.");
            return false;
        }
    }

    function writeTag(jsonObject, successMessage, failureMessage) {
        let encoder = new TextEncoder();

        const data = encoder.encode(DataToJson(jsonObject));
        let blob = new Blob([data]);
        console.log(blob.size);
        console.log(data);

        ndef
            .write({
                records: [
                    {
                        id: "A7G5UI924G66EP4",
                        recordType: "mime",
                        mediaType: "application/json",
                        data: encoder.encode(DataToJson(jsonObject)),
                    },
                ],
            })
            .then(() => {
                NFCMessage(successMessage);
                resetForm("form");
            })
            .catch(() => {
                NFCMessage(failureMessage);
            });
    }
    scanTag();
}

function updateView(jsonObject) {
    const resultAffichage = document.querySelector(".resultAffichageDeux");
    resultAffichage.innerHTML = "";

    let ImageResult = jsonObject.Image;
    let Nom = jsonObject.Nom;
    let Habitat = jsonObject.Habitat;
    let Description = jsonObject.Description;
    let Type = jsonObject.Type

    document.querySelector(
        ".resultAffichageDeux"
    ).innerHTML = `<img src="${ImageResult}"></img>
                <p>Nom : ${Nom}</p>
                <p> Type : ${Type}</p>
                <p> Habitait : ${Habitat}
                <p> Description : ${Description}</p>

  `;
    //   function getValueString(value) {
    //     console.log(value);
    //     if (typeof value === "object" && value !== null) {
    //       // Capture the results of the .map function in an array
    //       const mappedResults = Object.entries(value).map(
    //         (nestedValue, nestedIndex) => {
    //         }
    //       );

    //       // Join the results for display
    //       return mappedResults.join("");

    //     } else {
    //       return `<img src="${jsonObject.Image} alt=""></img>`;
    //       // For non-object values, just return the string representation of the value
    //     }
    //   }

    //   function isImageUrl(value) {
    //     return (
    //       typeof value === "string" &&
    //       (value.endsWith(".jpg") ||
    //         value.endsWith(".png") ||
    //         value.endsWith(".gif"))
    //     );
    //   }

    removeH1H2FromDiv(".content");
    document.querySelector(".resultAffichageDeux").style.opacity = 1;
}

function NFCMessage(message, color = "#CF4307") {
    const messageContainer = document.getElementById("nfc-mode-message");
    messageContainer.innerHTML = message;
    messageContainer.style.color = color;
    messageContainer.style.textAlign = "center";
    messageContainer.style.whiteSpace = "nowrap";
    messageContainer.style.fontSize = "11px";
}

export const setAction = (action) => {
    scanAction = action;
};

//utiliser la fonction setAction quand il appuie sur le bouton inscription et mettre en parametre string vide
//quand le formulaire est envoyé mettre setAction en parametre right

//ouvrir le form -> setAction("none")
//envoie le form -> setAction("right")
//ferme form -> setAction("read")
//mentions légales -> setAction("setNFCmon")

//click sur mentions legales (setnfcmon)

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById("god").addEventListener("click", () => {
//         setAction("setNFCmon");
//         setTimeout(() => setAction("read"), 4_000)
//     });
// });
