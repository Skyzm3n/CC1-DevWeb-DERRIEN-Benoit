"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
    const nombreMaxi = parseInt($maxUsr.value); // Obtenir la valeur maximale depuis l'input utilisateur

    nbGuesses = 0;
    $output.textContent = `J'ai choisi un nombre entre 1 et ${nombreMaxi}`;

    // Rendre le bouton "guess" actif
    $guessBtn.disabled = false;
    $startBtn.disabled = true;

    // Générer le nombre secret et le nombre maximum de tentatives
    secretNumber = Math.floor(Math.random() * nombreMaxi) + 1;
    maxGuesses = Math.floor(Math.random() * nombreMaxi) + 1;
    console.log(secretNumber, maxGuesses); // Pour débogage

    // Réinitialiser l'affichage précédent
    $output.innerHTML = $output.textContent;

    // Ajouter un handler au bouton "guess-btn"
    $guessBtn.onclick = function () {
        const userGuess = parseInt($numUsr.value);

        if (userGuess === secretNumber) {
            alert("Bonne réponse !");
            $guessBtn.disabled = true;
            $startBtn.disabled = false;
        } else if (nbGuesses + 1 === maxGuesses) {
            alert("Vous avez dépassé le nombre maximum de tentatives. La réponse était " + secretNumber);
            $guessBtn.disabled = true;
            $startBtn.disabled = false;
        } else if (userGuess < secretNumber) {
            $output.innerHTML += `<br>Le nombre secret est plus grand.<br>Vous avez ${maxGuesses - nbGuesses - 1} tentatives restantes.`;
        } else {
            $output.innerHTML += `<br>Le nombre secret est plus petit.<br>Vous avez ${maxGuesses - nbGuesses - 1} tentatives restantes.`;
        }

        nbGuesses++;
        $numUsr.value = "";
    };

    // Ajouter un handler à l'élément <input type="number" id="num-usr"> pour la touche "Enter"
    document.onkeydown = function (event) {
        if (event.key === "Enter" && !$guessBtn.disabled) {
            event.preventDefault();
            $guessBtn.click();
        }
    };
}

$startBtn.addEventListener("click", launchGame);



//Fonction pour ajouter la vache
function addCow(evt) {
    console.debug(evt.x, evt.y);

    const ajoutImg = document.createElement("img");
    ajoutImg.src = `https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg`; //Définition de la provenance de la vache
    ajoutImg.classList.add("cow");
    const rdm = Math.random();

    // Mettre au centre du clic en tenant compte du défilement de la page
    ajoutImg.style.left = `${evt.x + window.scrollX - 25}px`;
    ajoutImg.style.top = `${evt.y + window.scrollY - 25}px`;
    ajoutImg.style.transform = `rotate(${rdm}turn)`;

    // Rajouter l'image de la vache au document
    document.body.appendChild(ajoutImg);
}





function toggleCow(_evt) {
    if (document.onmousedown instanceof Function) {
        document.onmousedown = null;
    } else {
        document.onmousedown = addCow;
    }
}

$cowBtn.addEventListener("click", toggleCow);
