//  use this quizData in your app.
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

// Get DOM elements
const questionNumberElement = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const inputElements = document.querySelectorAll("input");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const submitBtn = document.getElementById("submitBtn");

// initialize quiz state
let currentQuestion = 0;
const userAnswers = new Array(quizData.length).fill("");

// function to display current question
function displayQuestion() {
  const data = quizData[currentQuestion];

  // Update question number
  questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;

  // Update question text
  questionElement.textContent = data.question;

  // Set all inputs to unchecked
  inputElements.forEach((input) => (input.checked = false));

  // Update options
  optionA.textContent = data.a;
  optionB.textContent = data.b;
  optionC.textContent = data.c;
  optionD.textContent = data.d;
}

// function to update user answer
function updateUserAnswer() {
  inputElements.forEach((input) => {
    if (input.checked) {
      userAnswers[currentQuestion] = input.value;
    }
  });
}

// function to go to next question
function nextQuestion() {
  updateUserAnswer();
  currentQuestion++;

  // check if there are more questions
  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    // show result
    let score = 0;
    quizData.forEach((question, index) => {
      if (question.correct === userAnswers[index]) {
        score++;
      }
    });

    // display result
    const result = document.getElementById("result");
    result.innerHTML = `
      <h3>You answered ${score}/${quizData.length} questions correctly</h3>
      <button class="reload-btn" onclick="location.reload()">Reload</button>
    `;
  }
}

// add event listener to submit button
submitBtn.addEventListener("click", nextQuestion);

// initiliaze first question
displayQuestion();
