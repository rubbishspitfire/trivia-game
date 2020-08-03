// Variables

const questions = [
    {
        question: "What is the name of the Atlanta Falcons' mascot?",
        choices: [
            "Falco",
            "Freddie Falcon",
            "Frankie Falcon",
            "Ferdinand Falcon"
        ], 
        answer: "Freddie Falcon",
        image: "https://media.giphy.com/media/LfLZ0DEd2uwuI/giphy.gif" 
    },
    {
        question: "How many superbowls have the Falcons played in?", 
        choices: [
            "0",
            "1",
            "2",
            "4"
        ],
        answer: "2",
        image: "https://media.giphy.com/media/cNYPlsYn4DoYzHgoca/giphy.gif"
    }, 
    {
        question: "What jersey number did Jamal Anderson wear?",  
        choices: [
            "32",
            "29",
            "56",
            "8"
        ],
        answer: "32",
        image: "https://media.giphy.com/media/l0MYuW2GF4ZjwMT7i/giphy.gif"
    },
    {
        question: "Where did Brett Favre play college football?",
        choices: [
            "California",
            "Florida State",
            "Southern Miss",
            "Oklahoma"
        ],
        answer: "Southern Miss",
        image: "https://media.giphy.com/media/100x3Wq1pbpnLW/giphy.gif"
    },
    {
        question: "When was the first winning season for the Falcons?",
        choices: [
            "1966",
            "1977",
            "1965",
            "1971"
        ],
        answer: "1971",
        image: "https://media.giphy.com/media/c2pOELjarKcU/giphy.gif"
    }
];

let questionNum = 0;
let choice = "";
let correctCount = 0;
let count = 10;
let intervalId;
let timeoutId;

// Click event handlers

$("#start").on("click", function() {
    displayQuestion(questionNum);
});

$("#buttons").on("click", ".choice", function() {
    choice = $(this).html();
    checkAnswer(choice, questionNum);
});

$("#solution").on("click", function() {
    questionNum = 0;
    correctCount = 0;
    displayQuestion(questionNum);
});

// Functions

const displayQuestion = function(questionNum) {
      $("#image").empty();
    $("#solution").empty();
    $("#buttons").empty();
    $("#question").html(`<h5 class="text-center">${question[questionNum].question}</h5>`);
    for (let j = 0; j < 4; j++) {
        $("#buttons").append(
            $(`<button class="choice d-block mx-auto btn btn-primary m-2" id="choice${j + 1}">`).html(
                questions[questonNum].choice[j]
            )
        );
    }
    timeoutID = setTimeout(outOfTime, 1000);
    $("#timer").html(`<h3 class="text-center">${count} seconds left!`);
    intervalID = setInterval(countDown, 1000);
};

const resetTimers = function () {
    $("#timer").empty();
    showSolution("Sorry!");
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    count = 10;
}

const countDown = function() {
    count--;
    $("#timer").html(`<h3 class="text-center">${count} seconds left!`);
}

const checkGameWin = function () {
    if (questionNum === questions.length) {
        setTimeout(gameOver, 3000);
    }
    else {
        setTimeout(function() {
            displayQuestion(questionNum);
        }, 3000);
    }
}

const outOfTime = function() {
    resetTimers();
    questionNum++;
    checkGameWin();
}

const checkAnswer = function(choice, num) {
    resetTimers();
    if (choice === questions[num].answer) {
        showSolution("Correct!");
        correctCount++;
    } else {
        showSolution("Sorry!");
    }
    questionNum++;
    checkGameWin();
};

const showSolution = function(result) {
    $("#buttons").empty();
    $("#question").html(`<h3 class="text-center">${result}</h3>`);
    $("#solution").html(`<p class="text-center">The answer is ${questions[questionNum].answer}</p>`);
    $("#image").html(`<img class="img-fluid d-block mx-auto" src="${questions[questionNum].image}">`)
    console.log(questions[questionNum].image)
};

const gameOver = function() {
   $("#buttons").empty();
   $("#image").html(`<img class="img-fluid d-block mx-auto" src="https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif">`)
   $("#solution").html(`<h1 class="text-center">Game Over!</h1><p class="text-center">You got ${correctCount} questions right out of ${questions.length}. Click Resrart to play again!`);
   $("#solution").append(`<button id="restart" class="d-block mx-auto btn btn-primary">Restart</button>`);
}