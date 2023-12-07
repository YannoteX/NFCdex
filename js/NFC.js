let information = {
    Nom: "",
    Prenom: "",
    Mail: "",
    Description: ""
}

let scanAction = "read";

if ('NDEFReader' in window) {
    phoneMode()
}
else {
    desktopMode()
}


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
        var encoder = new TextEncoder();

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


    function updateView(jsonObject) {
        console.log(jsonObject)
    }

    function NFCMessage(message, color = "ffffff") {
        console.log(message);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("god").addEventListener("click", () => {

            setAction("setNFCmon");
            setTimeout(() => setAction("read"), 4_000)
        });
    });

    scanTag()
}


function desktopMode() {

}


function NFCMessage(message, color = "ffffff") {
    console.log(message);
}

function setAction(action) {
    scanAction = action
}