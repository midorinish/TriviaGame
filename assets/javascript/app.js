$(document).ready(function() {
  $("#remaining-time").hide();
  $("#start").on("click", trivia.startGame);
  $(document).on("click", ".option", trivia.guessChecker);
});

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",

  questions: {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: ""
  },

  options: {
    q1: [""],
    q2: [""],
    q3: [""],
    q4: [""],
    q5: [""],
    q6: [""],
    q7: [""],
    q8: [""]
  },

  answers: {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: ""
  },

  startGame: function() {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $("#game").show();

    $("#results").html("");

    $("#timer").text(trivia.timer);

    $("#start").hide();

    $("#remaining-time").show();

    trivia.nextQuestion();
  },

  nextQuestion: function() {
    trivia.timer = 10;
    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(questionOptions, function(index, key) {
      $("#options").append(
        $('<button  class="btn btn-info btn-lg">' + key + "</button>")
      );
    });
  },

  timerRunning: function() {
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.questions).length
    ) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }
    } else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      $("#results").html(
        "<h3>Thank you for playing!</h3>" +
          "<p>Correct: " +
          trivia.correct +
          "</p>" +
          "<p>Incorrect: " +
          trivia.incorrect +
          "</p>" +
          "<p>Unanswered: " +
          trivia.unanswered +
          "</p>" +
          "<p> Please Play Again!</p>"
      );

      $("#game").hide();

      $("#start").show();
    }
  },

  guessChecker: function() {
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").hml("<h3> Correct Answer!</h3>");
    } else {
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Try Again!" + currentAnswer + "</h3>");
    }
  },

  guessResult: function() {
    trivia.currentSet++;

    $(".option").remove();
    $("#results h3").remove();

    trivia.nextQuestion();
  }
};
