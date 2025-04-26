const nextBtn = document.querySelector("#next");
const previousBtn = document.querySelector("#previous");
const submitBtn = document.querySelector("#submit");
const qnoSpan = document.querySelector("#qno");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".options > div > :nth-child(2)");
const imgElement = document.querySelector(".randomImg");

const card = document.querySelector(".card");
const resultsCard = document.querySelector(".results-card");
const scoreElement = document.querySelector(".score");
const buttonSection = document.querySelector(".buttons-section");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let questionNum = 1;
let selected = false;
let max_question, selectedOption;

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
    question: "What do you call a device that stores electricity?",
    options: ["Generator", "Battery", "Resistor", "Transformer"],
    answer: "Battery",
  },
  {
    question: "Which app is used for short video clips?",
    options: ["TikTok", "WhatsApp", "Zoom", "Spotify"],
    answer: "TikTok",
  },
  {
    question: "What does 'AI' stand for?",
    options: [
      "Automated Internet",
      "Artificial Intelligence",
      "Advanced Interface",
      "Analytical Input",
    ],
    answer: "Artificial Intelligence",
  },
  {
    question: "Which company makes PlayStation?",
    options: ["Microsoft", "Nintendo", "Sony", "Apple"],
    answer: "Sony",
  },
  {
    question: "What do you use to navigate using satellites?",
    options: ["Bluetooth", "Wi-Fi", "GPS", "NFC"],
    answer: "GPS",
  },
  {
    question: "Which social media platform uses 'likes' and 'retweets'?",
    options: ["Instagram", "Twitter/X", "Facebook", "LinkedIn"],
    answer: "Twitter/X",
  },
  {
    question: "What do you call the brain of a computer?",
    options: ["CPU", "Monitor", "Keyboard", "Hard Drive"],
    answer: "CPU",
  },
  {
    question: "Which company created the Android operating system?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    answer: "Google",
  },
  {
    question: "What do you use to take digital photos?",
    options: ["Scanner", "Printer", "Camera", "Microphone"],
    answer: "Camera",
  },
  {
    question: "What's the name of Amazon's voice assistant?",
    options: ["Siri", "Alexa", "Google Assistant", "Cortana"],
    answer: "Alexa",
  },
];
max_question = quizQuestions.length;

function start() {
  score = 0;
  questionNum = 1;
  selected = false;
  selectedOption = null;

  display();
  handleSelection();
  buttonVisibilty();
}

function display() {
  if (questionNum <= max_question) {
    // indexing starts from 0
    let currentQuestion = quizQuestions[questionNum - 1];

    question.textContent = currentQuestion.question;

    options.forEach((div, index) => {
      div.textContent = currentQuestion.options[index];
    });

    selected = false;
    selectedOption = null;

    qnoSpan.textContent = questionNum;

    const randomIndex = Math.floor(Math.random() * images.length);
    imgElement.src = images[randomIndex];
  } else {
    // (remove from layout)
    card.style.display = "none";
    buttonSection.style.display = "none";

    // Update score display
    scoreElement.innerHTML = `  
      <h2> ${score}/${max_question}</h2>
      <p>${((score / max_question) * 100).toFixed(0)}% Correct</p>
    `;

    // Show results card
    resultsCard.classList.add("card", "visible");
    resultsCard.hidden = false;

    restartBtn.addEventListener("click", () => {
      card.style.display = "grid";
      buttonSection.style.display = "flex";

      resultsCard.classList.remove("visible", "card");
      resultsCard.hidden = true;
      start();
    });
  }
}

function handleSelection() {
  options.forEach((option) => {
    option.style.cursor = "pointer";
    option.addEventListener("click", (e) => {
      selected = true;
      selectedOption = e.target.textContent;
    });
  });
}

function validate() {
  // indexing starts from 0
  let currentQuestion = quizQuestions[questionNum - 1];
  if (currentQuestion.answer === selectedOption) {
    score++;
  }

  questionNum++;

  display();
}

function previous() {
  if (questionNum > 1) {
    questionNum--;
  }
  display();
  buttonVisibilty();
}

function next() {
  if (questionNum < max_question) {
    questionNum++;
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
submitBtn.addEventListener("click", function () {
  if (selected) {
    validate();
  } else {
    alert("Please select an option");
  }
  buttonVisibilty();
});

start();
