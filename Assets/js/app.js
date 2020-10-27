// Array of questions for quiz
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

function hideAll() {
    startElements.hide();
    timeElements.hide();
    scoreElements.hide();
    questionElements.hide();
    gameOverElements.hide();
};

let startElements = {
    button: document.getElementById("start-button"),
    container: document.querySelector(".intro-container"),
    init: function() {
        console.log(this);
        this.button.addEventListener("click", this.startGame);
    },
    hide: function () { this.container.style.display = "none"; },
    show: function () { this.container.style.display = "initial"; },
    startGame: function() {
        hideAll();
        timeElements.start();
        timeElements.show(); 
        scoreElements.reset();
        questionElements.resetIndex();
        questionElements.next();
    }
};

// All timer variables grouped in an object
let timeElements = {
    // id is used to set and clear timer interval
    id: 0,
    starting: 120,
    container: document.querySelector(".timer-container"),
    timer: document.getElementById("timer"),
    remaining: 0,
    penalty: 15,
    init: function() {
        this.remaining = this.starting;
    },
    // This function decrements the timer and handles game over if it reaches 0
    timerFunct: function() {
        this.remaining--;
        this.timer.innerHTML = this.remaining;
        if (this.remaining <= 0) {
            gameOverElements.endGame();
        }
    },
    start: function() { 
        this.remaining = this.starting;
        // Checks that timer has been cleared
        if (this.id != 0) { this.stop() };
        this.id = setInterval(() =>  timeElements.timerFunct(), 1000);
        this.timer.innerHTML = this.remaining;
    },
    stop: function() {
        clearInterval(this.id);
    },
    wrongAnswer: function() {
        this.remaining -= this.penalty;
        this.timer.innerHTML = this.remaining;
    },
    // Function to hide timer when not being used
    hide: function () { this.container.style.display = "none"; },
    show: function () { this.container.style.display = "initial"; }
};

let scoreElements = {
    current: 0,
    correctValue: 10,
    highScores: [],
    container: document.querySelector(".score-container"),
    table: document.getElementById("scores-table"),
    finalScoreLabel: document.getElementById("final-score"),
    buttons: {
        viewScores: document.getElementById("view-scores"),
        clearScores: document.getElementById("clear-scores")
    },
    reset: function() {this.current = 0;},
    addScore: function (initials) { 
        this.highScores.push({ initials: initials, score: this.current });
        // Compares the values of the score elements and sorts by highest
        this.highScores.sort((a, b) => b.score - a.score);
    },
    updateFinalScore: function () { this.finalScoreLabel.innerHTML = this.current; },
    viewScores: function() { 
        hideAll();
        this.show();
        this.table.innerHTML = "";
        this.highScores.forEach((score, index) => {
            this.table.innerHTML += ((index + 1) + ". " + score.initials + " - " + score.score + "<br>");
        })
    },
    correctAnswer: function() {
        this.current += this.correctValue;
    },    
    init: function() {
        this.buttons.viewScores.addEventListener("click", this.viewScores);
        this.buttons.clearScores.addEventListener("click", () => {
            // When Clear Scores is clicked, empty highScores array and clear table
            this.highScores = [];
            this.table.innerHTML = "";
        })
    },
    hide: function () { this.container.style.display = "none"; },
    show: function () { this.container.style.display = "initial"; }
};

let questionElements = {
    container: document.querySelector(".question-container"),
    questionText: document.getElementById("question"),
    answerText: [
        document.getElementById("a-1"),
        document.getElementById("a-2"),
        document.getElementById("a-3"),
        document.getElementById("a-4")
    ],
    resultText: document.getElementById("answer-result"),
    currentIndex: 0,
    resetIndex: function () { this.currentIndex = 0; },
    init: function() {
        this.answerText.forEach((element, index) => {
            element.addEventListener("click", () => this.select(index));
        })
    },
    next: function() { 
        let currentQuestion = questions[this.currentIndex];
        this.questionText.innerHTML = currentQuestion.question;
        this.answerText.forEach((answer, index) => {
            answer.innerHTML = currentQuestion.choices[index];
        });
        this.show();
    },
    select: function(answer) {
        let currentQuestion = questions[this.currentIndex];
        if (answer == currentQuestion.answer) {
            this.resultText.innerHTML = "Correct!";
            scoreElements.correctAnswer();
        } else {
            this.resultText.innerHTML = "Wrong!";
            timeElements.wrongAnswer();
            setTimeout(() => this.resultText.innerHTML = "", 2000);
        }
        this.currentIndex++;
        if (this.currentIndex < questions.length) {
            this.next();
        } else {
            gameOverElements.endGame();
        }
    },
    hide: function () { this.container.style.display = "none"; },
    show: function () { this.container.style.display = "initial"; }
};

let gameOverElements = {
    container: document.querySelector(".gameover-container"),
    initialsField: document.getElementById("user-initials"),
    buttons: {
        submit: document.getElementById("submit-score"),
        restart: document.getElementById("restart-quiz")
    },
    init: function() {
        this.buttons.submit.addEventListener("click", () => {
            scoreElements.addScore(this.initialsField.value);
            scoreElements.viewScores();
        });
        this.buttons.restart.addEventListener("click", () => {
            hideAll();
            startElements.show();
        })
    },
    endGame: function() {
        timeElements.stop();
        hideAll();
        timeElements.show();
        scoreElements.updateFinalScore();
        this.show();

    } ,
    hide: function () { this.container.style.display = "none"; },
    show: function() { this.container.style.display = "initial"; }
}

startElements.init();
timeElements.init();
scoreElements.init();
questionElements.init();
gameOverElements.init();