const nextBtn = document.querySelector("#next");
const previousBtn = document.querySelector("#previous");
const submitBtn = document.querySelector("#submit");
const qnoSpan = document.querySelector("#qno");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".options > div > :nth-child(2)");
const imgElement = document.querySelector(".randomImg");

let score = 0;
let questionNum = 1;
let max_question;

const images = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
  "images/image5.jpg",
  "images/image6.jpg",
];
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"],
    answer: "Harper Lee",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Iron"],
    answer: "Oxygen",
  },
];

function start() {
  questionNum = 1;
  display();
  buttonVisibilty();
}

function display() {
  // indexing starts from 0
  let currentQuestion = quizQuestions[questionNum - 1];

  question.textContent = currentQuestion.question;

  options.forEach((div, index) => {
    div.textContent = currentQuestion.options[index];
  });
  qnoSpan.textContent = questionNum;

  const randomIndex = Math.floor(Math.random() * images.length);
  imgElement.src = images[randomIndex];
}

document.addEventListener("DOMContentLoaded", () => {
  options.forEach((option) => console.log(option));
});

function validate() {
  let currentQuestion = quizQuestions[questionNum - 1];
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (currentQuestion.answer === e.target.textContent) {
        score++;
        questionNum++;
        display();
      } else {
        console.log("Wrong!!");
      }
    });
  });
}

max_question = quizQuestions.length;

function next() {
  if (questionNum < max_question) {
    questionNum++;
  }
  display();
  buttonVisibilty();
}
function previous() {
  if (questionNum > 1) {
    questionNum--;
  }
  display();
  buttonVisibilty();
}

function buttonVisibilty() {
  previousBtn.hidden = questionNum <= 1;
  nextBtn.hidden = questionNum >= max_question;
}

nextBtn.addEventListener("click", next);
previousBtn.addEventListener("click", previous);
submitBtn.addEventListener("click", validate);

start();
