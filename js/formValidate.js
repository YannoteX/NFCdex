import { setAction } from "/js/NFC.js";


const limiteCaracteres = 250;
const formulaire = document.querySelector("form");
const textarea = document.querySelector("textarea");
const error = document.querySelector(".error");
const input = document.querySelector("#btnform");
const inputClose = document.querySelector(".close");
const parentElementSection = document.querySelector(".form-section");

let enfantElementForm = formulaire;
let URLBase64;


export let information = {
  Nom: "",
  Type: "",
  Habitat: "",
  Description: "",
  Image: "",
};



function cacherElement() {
  document.querySelector(".form-section").style.display = "none";
}



function apparaitElement() {
  document.querySelector(".form-section").style.display = "block";
}



function isMobile() {
  return window.innerWidth <= 768;
}



input.addEventListener("click", () => {
  formulaire.classList.add("display");
  document.querySelector(".form-section").classList.add("dark");
  isMobile() ? setAction("none") : "";
  setTimeout(apparaitElement);
});



function closeForm() {
  formulaire.classList.remove("display");
  setAction("read");
  document.querySelector(".form-section").classList.remove("dark");
  setTimeout(cacherElement, 1000);
  isMobile() ? setAction("read") : "";
}



inputClose.addEventListener("click", () => {
  closeForm();
});



parentElementSection.addEventListener("click", function () {
  closeForm();
});



enfantElementForm.addEventListener("click", function (event) {
  event.stopPropagation();
});



textarea.addEventListener("input", function () {
  let longueurTexte = textarea.value.length;
  if (longueurTexte > limiteCaracteres) {
    textarea.value = textarea.value.substring(0, limiteCaracteres);
    error.textContent = limiteCaracteres + " caractères (limite atteinte)";
    textarea.readOnly = false;
  } else {
    error.textContent = "";
  }
});



export function DataToJson(Data) {
  return JSON.stringify(Data);
}



document.getElementById("imageInput").addEventListener("change", async function (event) {
  const file = event.target.files[0];
  console.log("change");
  if (file) {
    try {
      const base64String = window.URL.createObjectURL(file);
      URLBase64 = base64String;
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = URLBase64; d
    } catch (error) {
      console.error(error);
    }
  }
  return URLBase64;
});



export function GetImageBase64() {
  return URLBase64;
}



function informationSubmit(e) {
  e.preventDefault();
  isMobile() ? setAction("write") : "";
  const formData = new FormData(document.querySelector("form"));

  // let PhotoUrl = formData.get("Photo");
  let Nom = formData.get("Nom");
  let TypeValue = formData.get("TypeValue");
  let HabitatValue = formData.get("HabitatValue");
  let Description = formData.get("Description");

  // information.Photo = PhotoUrl;
  information.Nom = Nom;
  information.Type = TypeValue;
  information.Habitat = HabitatValue;
  information.Description = Description;

  loadImage(GetImageBase64()).then((img) => {
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    canvas.width = img.width;
    canvas.height = img.height;

    information.Image = shrinkImageBase64(canvas, img);
    canvas.remove();
  });
  showMessage(formulaire)
}



function showMessage(formulaire) {
  let existingMessage = formulaire.querySelector('.alert');
  if (!existingMessage) {
    const elementMessage = document.createElement("span");
    elementMessage.textContent = "Attends que le formulaire se vide pour retirer ta carte NFCmon";
    elementMessage.classList.add("alert");
    formulaire.appendChild(elementMessage);

    setTimeout(() => {
      if (elementMessage) {
        formulaire.removeChild(elementMessage);
      }
    }, 4000);
  }
}



export function resetForm(formId) {
  let form = document.getElementById(formId);

  if (form) {
    form
      .querySelectorAll('input:not([type="submit"]), textarea')
      .forEach((element) => {
        element.value = "";
      });


    document.querySelector(".imgResult").removeAttribute('src')
  } else {
    console.log("Le formulaire avec l'ID '" + formId + "' n'a pas été trouvé.");
  }

}



formulaire.addEventListener("submit", informationSubmit);



document.querySelector(".ML").addEventListener("click", (e) => {
  e.preventDefault();
  isMobile() ? setAction("setNFCmon") : "";
});



function shrinkImageBase64(canvas, image) {
  const base64 = refreshCanvas(canvas, image);
  const blob = new Blob([base64]);

  if (blob.size > 7100) {
    canvas.width /= 2;
    canvas.height /= 2;

    return shrinkImageBase64(canvas, image);
  } else if (blob.size < 6500) {
    canvas.width *= 1.5;
    canvas.height *= 1.5;

    return shrinkImageBase64(canvas, image);
  } else {
    return base64;
  }
}



function refreshCanvas(canvas, image) {
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/webp", 0.5);
}



const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
