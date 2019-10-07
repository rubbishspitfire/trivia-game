// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// If the timer is over, then go to the next question
function nextQuestion() {
  const isQuestionOver = (quizQuestions.length - 1 ) === currentQuestion;
  if (isQuestionOver) {

    console.log('Game Over!!!!!');
    displayResult();
  } else {
    currentQuestion++;
    loadQuestion;
  }
}

//  Timer for 30 seconds 

function timeUp() {
  clearInterval(timer);

   lost++;

  preloadImage('lost');
  setTimeout(nextQuestion, 3 * 1000);
}

function countdown() {
  counter++;

  $('#time').html('Timer: ' + counter);
  if (counter === 0) {
    timeUp();
  }
}

// Display the question and the choices to the browser

function loadQuestion() {
  counter = 30;
  timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
       <h4>${question}</h4>
       ${loadChoices(choices)}
       ${loadRemainingQuestions()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
      result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;   
    }

    return result;
}

//Correct/wrong choice selected, then go to the next question
$(document).on('click' , '.choice' , function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    
    if (correctAnswer === selectedAnswer) {
    score++;
    console.log('Wins!!!!');
    preloadImage('win');
    setTimeout(nextQuestion, 3 * 1000);
   } else {
    lost++;
    console.log('Lost!!!');
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
   }

   console.log('!!!!!!!!!!!!!!!, selectedAnswer');

});

   function displayResult() {
     const result = `
     <p> You get ${score} question(s) right</p>
     <p> You get ${lost} question(s)</p>
     <p> Total questions ${quizQuestions.length}</p>
     <button class = "btn btn-primary" id="reset"> Reset Game</button>        
     `;

     $('#game').html(result);
   }


   $(document).on('click', '#reset', function() {
     counter = 30;
     currentQuestion = 0;
     score = 0;
     lost = 0;
     timer = null;

     loadQuestion();
  });


   function loadRemainingQuestion() {
     const loadRemainingQuestion = quizQuestions.length - (currentQuestion + 1);
     const totalQuestion = quizQuestionaire.length;

     return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
   }

   function randomImage(images) {
     const random = Math.floor(Math.random() * images.length);
     const randomImage = images[random];
     return randomImage;

     
   }


  //Display for gipghy for correct and wrong answers
  function randomImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
      $('#game').html(`
      <p class="preload-image">Yayyy, You've won!!</p>
      <p class="preload-image">The correct answer is...<b>${correctAnswer}<b></p>
      <img src=${randomImage(funImages)}" />
      `);
    } else {
      $('#game').html(`
      <p class="preload-image">Sorry, You've lost!!<b>${correctAnswer}<b></p>
      <p class="preload-image"></p>
      <img src="${randomImage(sadImages)}" />
      `);
  }
}
 $('#start').click(function() {
   $('#start').remove();
   $('#time').html(counter);
   loadQuestion();
 });