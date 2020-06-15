// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let loss = 0;
let timer;


// If the timer is over, then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log("Game Over");
        displayResult();
    }
    else {
        currentQuestion++;
        loadQuestion();
    }
}



// Start up a 30 second timer for the user to respond or choose the answer for the question.

function timeUp() {
    clearInterval(timer);
    loss++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

// Function to countdown the timer to sync up with the actual timeout
function countDown() {
    counter--;
    $('#time').html('Timer : ' + counter);
    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices in the browser

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);


    const question = quizQuestions[currentQuestion].question; //this will pull the question attributes from the quiz question object
    const choices = quizQuestions[currentQuestion].choices; // pulls the choices attributes
    $('#time').html("Time Left: " + counter);

    $("#game").html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);

}

// Populate the choices from the question object into the page
function loadChoices(choices) {
    let result = '';
    for (let i = 0; i < choices.length; i++) {
        result += `<p class = "choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

//Process the user click on answer and determine whether it was correct or incorrect
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        console.log('Winsss!!!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        loss++;
        console.log("Lost!!!");
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
})

//Display the result of the quiz with a final score
function displayResult() {
    const result = `
    <p>You get ${score} question(s) right!</p>
    <p>You missed ${loss} question(s)</p>
    <p>Total Questions: ${quizQuestions.length}</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $("#game").html(result);
}

//On press of the reset button, relaunch the game and reset the values of the variables
$(document).on('click', '#reset', function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    loss = 0;
    timer = null;

    loadQuestion();
})


//Function to load the next question in sequence
function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;
    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;


};


//Function to select a random image from the images directory depending on win or loss
// function randomImage(images) {
//     const random = Math.floor(Math.random() * images.length);
//     const randomImage = images[random];
//     return randomImage;



//Preload an image based on correct or incorrect user choice
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image">Congratulations, you picked the correct answer</p>
        <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
        `);
    }
    else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost</p>
            `);
    }

}

//Begin the game on first click of Start Game button
$("#start").click(function () {
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});
