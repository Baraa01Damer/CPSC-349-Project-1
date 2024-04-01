// const startQuizBtn = document.getElementById("start-quiz-btn");

// startQuizBtn.addEventListener("click", () => {
//   // Redirect to the quiz page
//   window.location.href = "quiz.html";
// });

// const signInBtn = document.getElementById("signUpBtn");

// signInBtn.addEventListener("click", () => {
//   // Redirect to the signin page
//   window.location.href = "signin.html";
// });

const quizData = [
  {
    question: "Which CSS property is used to set the font size?",
    options: ["font-size", "text-size", "font-style", "size"],
    correctAnswer: "font-size",
  },
  {
    question: "What is the correct way to write an if statement in JavaScript?",
    options: ["if (i == 5)", "if i = 5 then", "if i = 5", "if i == 5 then"],
    correctAnswer: "if (i == 5)",
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyperlink Text Markup Language", "Hypertext Markup Language", "Hyper Transfer Markup Language", "Hypertext Transfer Markup Language"],
    correctAnswer: "Hypertext Markup Language",
  },
  {
    question:
      "Which event type occurs when the user moves the mouse pointer out of an element?",
    options: ["mouseout", "mouseleave", "mouseup", "mouseover"],
    correctAnswer: "mouseout",
  },
  {
    question: "Which of the following is not a feature of HTML?",
    options: [
      "Platform independence", "Ability to integrate with other languages like CSS and JavaScript", "Support for adding images, videos, and audio to web pages", "Compiled language",
    ],
    correctAnswer:
      "Compiled language",
  },
  {
    question: "Which of the following best describes a derived attribute?",
    options: [
      "An attribute with atomic values that cannot be divided further",
      "An attribute composed of more than one simple attribute",
      "An attribute that does not exist directly in the database, but is derived from other attributes",
      "An attribute containing multiple values such as phone numbers or email addresses",
    ],
    correctAnswer: "An attribute that does not exist directlt in the database, but is derived from other attributes",
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    options: ["font-color", "color", "text-clr", "text-style"],
    correctAnswer: "color",
  },
  {
    question: "How can you scale an element to be twice its original size?",
    options: [
      "transform: scale(2);",
      "scale(2);",
      "scale:2;",
      "transform: scale(2, 2);",
    ],
    correctAnswer: "transform: scale(2);",
  },
  {
    question: "What does cardinality represent in the context of entity relationship diagrams (ERDs)?",
    options: [ "The number of attributes in an entity", "The number of entities in an entity set", "The number of instances of an entity that can be associated with another entity through a relationship", "The range of values that can be assigned to an attribute"],
    correctAnswer: "The number of instances of an entity that can be associated with another entity through a relationship",
  },
  {
    question: "Which of the following is an example of a composite attribute?",
    options: ["Student ID", "Student's age", "Student's complete name (first_name, last_name)", "Student's phone number"],
    correctAnswer: "Student's complete name (first_name, last_name)",
  }
];

let wellcomePage = document.getElementById("wellcomePage");
let quizPage = document.getElementById("quizPage");
let resultPage = document.getElementById("resultPage");

let answers = [];
let currQuestion = 0;
let score = 0;
let isAnswered = false;
const setTime = 60;
let timer = setTime; // in seconds

function startQuiz() {
  wellcomePage.style.display = "none";
  quizPage.style.display = "block";
  getQuestion();
  startTimer();
}

// function takeAnswer(optionBtn, selectedAnswer) {
//   if (!isAnswered) {
//     if (selectedAnswer === quizData[currQuestion].correctAnswer) {
//       score++;
//     }
//     isAnswered = true;
//     if (optionBtn) {
//       optionBtn.classList.add('selected')
//     }
//   }
// }

function takeAnswer(option, answer) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timer);

  let correctAnswer = quizData[currQuestion].correctAnswer;
  if (option && answer === correctAnswer) {
    option.innerHTML += ` <i class="fas fa-check-circle"></i>`;
    option.classList.add("correctAnswer");
    quizPage.innerHTML += `<p class="answerMessage correctAnswer"><i class="fas fa-check-circle"></i> Correct Answer! Well Done!</p>`;
    answers[currQuestion] = answer;
  } else {
    answers[currQuestion] = "";
    quizPage.innerHTML += `<p class="answerMessage wrongAnswer"><i class="fas fa-times-circle"></i> Incorrect Answer! The correct answer was ${correctAnswer}.</p>`;
  }

  setTimeout(() => {
    currQuestion++;
    if (currQuestion < quizData.length) {
      isAnswered = false;
      getQuestion();
      startTimer();
    } else {
      getResult();
    }
  }, 2000);
}

function getResult() {
  let correctAnswers = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (answers[i] === quizData[i].correctAnswer) {
      correctAnswers++;
    }
  }

  let resultMessage = `Congratulations! <br/>You answered
  <span class='correctAnswer'>${correctAnswers}</span> out of
  ${quizData.length} questions correctly.<br/> 
  <button class='startAgain btn btn-warning mt-4'>Start Again</button>`;

  quizPage.style.display = "none";
  resultPage.style.display = "block";
  resultPage.innerHTML = "<h2 class='resultMessage'>" + resultMessage + "</h2>";

  let startAgain = document.querySelector(".startAgain");
    startAgain.addEventListener("click", () => {
    currQuestion = 0;
    answers = [];
    isAnswered = false;
    resultPage.style.display = "none";
    wellcomePage.style.display = "block";
  });
}

function getQuestion() {
  let question = quizData[currQuestion];
  quizPage.innerHTML = `
  <div id="timer" class="mb-3">
  <i class="fas fa-stopwatch"></i> ${formatTime(timer)}
  </div>
  <h3 style='margin-bottom:2rem'>${question.question}</h3>
  <p>Question ${currQuestion + 1} of ${quizData.length}</p>
  `;
  for (let i = 0; i < question.options.length; i++) {
    quizPage.innerHTML += `
      <button class='btn w-75 btn-lg' onclick="takeAnswer(this, '${
        question.options[i]
      }')" ${isAnswered ? "disabled" : ""}>
        ${question.options[i]}
      </button>
      <br><br>
    `;
  }
  if (currQuestion == quizData.length - 1) {
    clearInterval(timer);
  }
}

function startTimer() {
  let timerElement = document.getElementById("timer");
  timerElement.innerHTML = `<i class="fas fa-stopwatch"></i> ${formatTime(
    timer,
  )}`;

  let timeRemaining = setTime;
  thistimer = setInterval(() => {
    timeRemaining--;
    timerElement.innerHTML = `<i class="fas fa-stopwatch"></i> ${formatTime(
      timeRemaining,
    )}`;
    if (timeRemaining <= 0 || currQuestion === quizData.length - 1) {
      clearInterval(thistimer);
      if (timeRemaining <= 0) {
        takeAnswer(null, null);
      }
    }
  }, 1000);
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
