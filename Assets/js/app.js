// Variables
// Array of Questions and setting index
const questions = [
    {
        question: "What is the difference between `let` and `const` variables?",
        choices: [
            "A `const` variable can not contain vowels",
            "A `let` variable does not allow non-alphabetical characters",
            "A `const` variable cannot be changed after it is declared",
            "There is no difference in the two as we now call everything `var`"
        ],
        answer: 2
    },
    {
        question: "Which data type is returned when using the `confirm()` function?",
        choices: [
            "Number",
            "String",
            "Undefined",
            "Boolean"
        ],
        answer: 3
    },
    {
        question: "What is the name for a variable that can hold more than one value at a time?",
        choices: [
            "Operator",
            "Arithmetic",
            "String concatenation",
            "Array"
        ],
        answer: 3
    },
    {
        question: "Which data value can contain letters, numbers, symbols, punctuation, and even emoji?",
        choices: [
            "Concatenations",
            "Strings",
            "Functions",
            "Literals"
        ],
        answer: 1
    },
    {
        question: "Which HTML property can JavaScript manipulate to change the aesthetic of specific elements?",
        choices: [
            "ID",
            "Alt",
            "Style",
            "Syntax"
        ],
        answer: 2
    },
    {
        question: "Which of the following operators are not used for making comparisons?",
        choices: [
            "==",
            ">",
            "!=",
            "+"
        ],
        answer: 3
    },
    {
        question: "Question 7",
        choices: [
            "Choice 1",
            "Choice 2",
            "Choice 3",
            "Choice 4"
        ],
        answer: 0
    },
    {
        question: "Question 8",
        choices: [
            "Choice 1",
            "Choice 2",
            "Choice 3",
            "Choice 4"
        ],
        answer: 0
    },
    {
        question: "Question 9",
        choices: [
            "Choice 1",
            "Choice 2",
            "Choice 3",
            "Choice 4"
        ],
        answer: 0
    },
    {
        question: "Question 10",
        choices: [
            "Choice 1",
            "Choice 2",
            "Choice 3",
            "Choice 4"
        ],
        answer: 0},
];
let currentQuestionIndex = 0;

// All timer variables
const startTime = 120;
let timerId = 0;
let timerContainer = document.querySelector(".timer-container")
let timerEl = document.getElementById("timer");
let timeLeft = startTime;
const penalty = 15;

// Handles display of time left and calls gameOver when 0
function timer() { 
    // gets called every 1000 milliseconds
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 0) {
        gameOver();
    }
}

// All elements/variables relating to score
let score = 0;
const correct = 10;
let highScoreArr = [];
let scoreContainer = document.querySelector(".score-container");
let scoresTable = document.getElementById("scores-table");
let viewScoreBtn = document.getElementById("view-scores");
viewScoreBtn.addEventListener("click", () => {
    introContainer.style.display = "none";
    questionContainer.style.display = "none";
    gameOverContainer.style.display = "none";
    timerContainer.style.display = "none";
    clearInterval(timerId);
    viewHighScores();
});

// Application Variables
let startButton = document.getElementById("start-button");
let introContainer = document.querySelector(".intro-container");
let questionContainer = document.querySelector(".question-container");
let questionText = document.getElementById("question");
let answerOne = document.getElementById("a-1");
answerOne.addEventListener("click", () => selectAnswer(0));
let answerTwo = document.getElementById("a-2");
answerTwo.addEventListener("click", () => selectAnswer(1));
let answerThree = document.getElementById("a-3");
answerThree.addEventListener("click", () => selectAnswer(2));
let answerFour = document.getElementById("a-4");
answerFour.addEventListener("click", () => selectAnswer(3));
let resultText = document.getElementById("answer-result");
let gameOverContainer = document.querySelector(".gameover-container");
let finalScore = document.getElementById("final-score");
let submitButton = document.getElementById("submit-score");
let userInitials = document.getElementById("user-initials");
let restartBtn = document.getElementById("restart-quiz");
restartBtn.addEventListener("click", () => {
    scoreContainer.style.display = "none";
    introContainer.style.display = "initial";
});
let clearScoresBtn = document.getElementById("clear-scores");
clearScoresBtn.addEventListener("click", () => {
    highScoreArr = [];
    scoresTable.innerHTML = "";
});
// -------------------------------------------

// WHEN I click the start button
startButton.addEventListener("click", startGame);

submitButton.addEventListener("click", () => {
    addHighScore(userInitials.value, score);
    viewHighScores();
    console.log("Submit clicked");
    });

function startGame() {
    timeLeft = startTime;
    score = 0;
    currentQuestionIndex = 0;
    introContainer.style.display = "none";
    timerContainer.style.display = "initial";
    timerEl.innerHTML = timeLeft;
    // THEN a timer starts
    timerId = setInterval(timer, 1000);
    // and I am presented with a question
    nextQuestion(currentQuestionIndex);
    // if no more questions: gameOver();
}

// WHEN I answer a question
function selectAnswer(answer) { 
    let currentQuestion = questions[currentQuestionIndex];
    if (answer == currentQuestion.answer) {
        resultText.innerHTML = "Correct!";
        score += correct;
    } else {
        resultText.innerHTML = "Wrong!";
        timeLeft -= penalty;
        timerEl.innerHTML = timeLeft;
    }
    setTimeout(() => resultText.innerHTML = "", 2000);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}
// THEN I am presented with another question
function nextQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
    answerOne.innerHTML = currentQuestion.choices[0];
    answerTwo.innerHTML = currentQuestion.choices[1];
    answerThree.innerHTML = currentQuestion.choices[2];
    answerFour.innerHTML = currentQuestion.choices[3];
    // when called, value will be current index of Questions array
    // update question container with currentQuestion values
    // set display to visible
    questionContainer.style.display = "initial";
    console.log("Question: " + question);
}

function gameOver() {
    console.log("Game Over!");
    clearInterval(timerId);
    questionContainer.style.display = "none";
    finalScore.innerHTML = score;
    gameOverContainer.style.display = "initial";
}

function viewHighScores() { 
    gameOverContainer.style.display = "none";
    timerContainer.style.display = "none";
    scoreContainer.style.display = "initial";
    scoresTable.innerHTML = "";
    highScoreArr.forEach((highScore, index) => {
        scoresTable.innerHTML += ((index + 1) + ". " + highScore.initials + " - " + highScore.score + "<br>");
    })
}

function addHighScore(initials, finalScore) {
    highScoreArr.push({ initials: initials, score: finalScore });
    console.log(highScoreArr);
}