const word = document.getElementById("word");
const wrongLetters = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "networking", "collaboration", "interface"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters1 = [];

function displayWord() {
  word.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>`
    )
    .join("")}`;

  const innerWord = word.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations... You Won";
    popup.style.display = "flex";
  }
}

function updateWrongLetters() {
  wrongLetters.innerHTML = `
 ${wrongLetters1.length > 0 ? "<p>Wrong</p>" : ""}
 ${wrongLetters1.map((letter) => `<span>${letter}</span>`)}
 `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters1.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters1.length === figureParts.length) {
    finalMessage.innerText = "Alias could not survive";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters1.includes(letter)) {
        wrongLetters1.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

playAgain.addEventListener("click", () => {
  // Empty the arrays
  correctLetters.splice(0);
  wrongLetters1.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  popup.style.display = "none";
  updateWrongLetters();
});

displayWord();
