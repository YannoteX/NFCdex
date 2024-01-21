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
    }
    if (h2Element) {
      h2Element.style.display = "none";
    }
    if (BtninstallApp) BtninstallApp.style.display = "none";
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

function desktopMode() {}

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
          console.log(record);

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

  function createParagraph(key, value) {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${key}: ${getValueString(value)}`;
    return paragraph;
  }

  function getValueString(value) {
    if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value);
      const mappedResults = entries.map(([nestedKey, nestedValue]) => {
        if (isImageUrl(nestedValue)) {
          const image = document.createElement("img");
          image.src = nestedValue;
          image.alt = nestedKey;
          return image.outerHTML; // Returns the HTML string for the image
        } else {
          return `${nestedKey}: ${getValueString(nestedValue)}`;
        }
      });

      // Access the last key-value pair
      const lastEntry = entries[entries.length - 1];
      console.log("Last Key:", lastEntry[0], "Last Value:", lastEntry[1]);

      return mappedResults.join("");
    } else {
      return String(value);
    }

    function isImageUrl(value) {
      return (
        typeof value === "string" &&
        (value.endsWith(".jpg") ||
          value.endsWith(".png") ||
          value.endsWith(".gif"))
      );
    }
  }

  for (const key in jsonObject) {
    if (Object.hasOwnProperty.call(jsonObject, key)) {
      const value = jsonObject[key];
      const paragraph = createParagraph(key, value);
      resultAffichage.appendChild(paragraph);
    }
  }

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
