let information = {
    Nom: "",
    Prenom: "",
    Mail: "",
    Description: ""
}

// Pour la lecture NFC
const ndef = new NDEFReader();

let abortController = new AbortController();

abortController.signal.onabort = event => {
    console.log("Abort NFC Operations")
};

function abortAndReset() {

    abortController.abort();
    abortController = new AbortController();

    abortController.signal.onabort = event => {
        console.log("Abort NFC Operations")
    };
}
//

async function scanTag() {
    ndef.scan({ signal: abortController.signal }).then(() => {

        ndef.onreadingerror = (e) => {
            NFCMessage("Oops... Une erreur s'est produite, essaie de garder ton tag plus longtemps devant ton telephone");
        };

        ndef.onreading = (e) => {

            const record = e.message.records[0];

            if (isValidRecord(record)) {

                const decoder = new TextDecoder();

                information = JSON.parse(decoder.decode(record.data));

                updateView()
            }
        };
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


function updateView() {
    console.log(information)
}

function NFCMessage(message) {
    console.log(message);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("god").addEventListener("click", () => {
        console.log("GodMod");

        abortAndReset();

        ndef.scan({ signal: abortController.signal }).then(() => {

            const encoder = new TextEncoder()

            setTimeout(() => { abortAndReset(); }, 4_000);

            ndef.write({

                records: [
                    {
                        id: "A7G5UI924G66EP4",
                        recordType: "mime",
                        mediaType: "application/json",
                        data: encoder.encode(JSON.stringify({}))
                    }]
            });

            scanTag()
        });
    });
});

scanTag();