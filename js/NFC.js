import { information } from "./formValidate";
let scanAction = "read";


if ('NDEFReader' in window) {
    phoneMode()
}
else {
    desktopMode()
}

// Appeler desktopMode lorsque le mode de bureau est détecté
if (window.innerWidth >= 1024) {
    desktopMode();
} else {
    if ('NDEFReader' in window){
        phoneMode();
    } 
}
    
// function desktopMode() {
//     const ndef = new NDEFReader();

//     async function scanTag() {
//         try {
//             await ndef.scan();

//             ndef.onreadingerror = (e) => {
//                 NFCMessage("Oops... Une erreur s'est produite, assurez-vous que votre tag NFC est à proximité.");
//             };

//             ndef.onreading = (e) => {
//                 const record = e.message.records[0];

//                 if (scanAction === "read") {
//                     if (isValidRecord(record)) {
//                         const decoder = new TextDecoder();
//                         const json = JSON.parse(decoder.decode(record.data));

//                         if (json) {
//                             updateView(json);
//                         } else {
//                             NFCMessage("Vous n'avez pas enregistré de NFCmon dans votre tag.");
//                         }
//                     }
//                 } else if (scanAction === "write") {
//                     if (isValidRecord(record)) {
//                         writeTag(
//                             information,
//                             information.Nom + " a été enregistré dans votre tag NFCmon.",
//                             "Oops... Impossible d'écrire votre NFCmon. Veuillez réessayer."
//                         );
//                         setAction("none");
//                     }
//                 } else if (scanAction === "setNFCmon") {
//                     writeTag({}, "Tag NFCmon initialisé.");
//                 } else {
//                     // Autres actions si nécessaire
//                 }
//             };
//         } catch (error) {
//             // Gérer les erreurs liées à la prise en charge de l'API Web NFC sur le bureau
//             console.error("L'API Web NFC n'est pas prise en charge sur ce navigateur ou cet appareil de bureau.");
//             // Afficher un message à l'utilisateur pour l'informer que l'API Web NFC n'est pas prise en charge sur le bureau
//             NFCMessage("La fonction NFC n'est pas prise en charge sur votre ordinateur de bureau.");
//         }
//     }


//     function writeTag(jsonObject, successMessage, failureMessage) {
//         let encoder = new TextEncoder();

//         ndef.write({

//             records: [
//                 {
//                     id: "A7G5UI924G66EP4",
//                     recordType: "mime",
//                     mediaType: "application/json",
//                     data: encoder.encode(JSON.stringify(jsonObject))
//                 }]
//         }).then(() => {
//             NFCMessage(successMessage);
//         }).catch(() => {
//             NFCMessage(failureMessage);
//         });

//     }

//     scanTag()

//     // Le reste du code pour desktopMode...
// }

function phoneMode() {
    // Pour la lecture NFC
    const ndef = new NDEFReader();
    //

    async function scanTag() {
        ndef.scan().then(() => {

            ndef.onreadingerror = (e) => {
                NFCMessage("Oops... Une erreur s'est produite, essaie de garder ton tag plus longtemps devant ton telephone");
            };

            ndef.onreading = (e) => {

                const record = e.message.records[0];

                if (scanAction === "read") {

                    if (isValidRecord(record)) {

                        const decoder = new TextDecoder();

                        json = JSON.parse(decoder.decode(record.data));

                        if (json) {
                            updateView(json);
                        }
                        else {
                            NFCMessage("Tu n'as pas enregistré de NFCmon dans ton tag");
                        }
                    }
                }

                else if (scanAction === "write") {
                    if (isValidRecord(record)) {

                        writeTag(information,
                            information.Nom + " a été enregsitré dans ton tag NFCmon",
                            "Oops... On a pas pu écrire ton NFCmon, réessaie à nouveau");

                        setAction("none");
                    }
                }

                else if (scanAction === "setNFCmon") {
                    writeTag({}, "Tag NFCmon initialisé");
                }
                else {

                }
            }
        });
    }

    function isValidRecord(record) {
        if (record.id = "A7G5UI924G66EP4" && record.recordType === "mime" && record.mediaType === "application/json") {
            return true;
        }
        else {
            NFCMessage("Ton tag NFC n'est pas un tag NFCmon.");
            return false;
        }
    }

    function writeTag(jsonObject, successMessage, failureMessage) {
        let encoder = new TextEncoder();

        ndef.write({

            records: [
                {
                    id: "A7G5UI924G66EP4",
                    recordType: "mime",
                    mediaType: "application/json",
                    data: encoder.encode(JSON.stringify(jsonObject))
                }]
        }).then(() => {
            NFCMessage(successMessage);
        }).catch(() => {
            NFCMessage(failureMessage);
        });

    }

    scanTag()
}

function updateView(jsonObject) {
    console.log(jsonObject)
}

console.log("eren")

function NFCMessage(message, color = "#FF0000") {
    const messageContainer = document.getElementById("nfc-mode-message");
    const paragraph = document.createElement("p");

    paragraph.textContent = message;
    paragraph.style.color = color;
    messageContainer.appendChild(paragraph);
}

export function setAction(action) {
    scanAction = action
}




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