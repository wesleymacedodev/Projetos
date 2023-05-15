const contentElement = document.querySelector(".content");
const sizeElements = document.querySelector(".size");
const optionsElements = document.querySelector(".options");
const nextElement = document.querySelector(".next");

import questions from "./questions.js";

let index = 0;
let score = 0;
let selected = false;

function loadQuestion(index) {
  let question = document.createElement("h2");
  question.setAttribute("class", "question");
  question.textContent = questions[index].question;
  contentElement.appendChild(question);
  questions[index].options.forEach((item, order) => {
    let option = document.createElement("span");
    option.className = "option";
    option.textContent = item;
    option.setAttribute("choice", order);
    option.addEventListener("click", checkChoice);
    optionsElements.appendChild(option);
  });
  sizeElements.textContent = `${index + 1}/${questions.length}`;
  selected = false;
}

function removeInteraction() {
  let optionListElements = document.querySelectorAll(".option");
  optionListElements.forEach((item) =>
    item.removeEventListener("click", checkChoice)
  );
}

function removeElements() {
  let optionListElements = document.querySelectorAll(".option");
  let questionElement = document.querySelector(".question");
  questionElement == null ? [] : questionElement.remove();
  optionListElements.forEach((item) => (item == null ? [] : item.remove()));
}

function showCorrect() {
  let optionListElements = document.querySelectorAll(".option");
  optionListElements.forEach((item, order) => {
    if (order == questions[index].correct) {
      item.style = "background-color: green;";
    }
  });
}

function checkChoice(option) {
  if (option.target.getAttribute("choice") == questions[index].correct) {
    option.target.style = "background-color: green;";
    score++;
    removeInteraction();
    selected = true;
  } else {
    option.target.removeEventListener("click", checkChoice);
    option.target.style = "background-color: red;";
    showCorrect();
    removeInteraction();
    selected = true;
  }
}

function showScore() {
  removeElements();
  let scoreElement = document.createElement("span");
  scoreElement.className = "score";
  scoreElement.textContent = `Pontuação : ${score} / ${questions.length}`;
  contentElement.appendChild(scoreElement);
  nextElement.remove();
}

nextElement.addEventListener("click", () => {
  if (index < questions.length - 1) {
    if (selected) {
      removeElements();
      index += 1;
      loadQuestion(index);
    } else {
      alert("Selecione uma alternativa!");
    }
  } else {
    if (selected) {
      showScore();
    } else {
      alert("Selecione uma alternativa!");
    }
  }
});

loadQuestion(index);
