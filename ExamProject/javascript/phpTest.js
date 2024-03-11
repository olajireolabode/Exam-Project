$(document).ready(function() {

  $("#phpResult").hide();

    var questions = [];
    var currentPage = 1;
    var questionsPerPage = 10;
    var startingIndex = 46;
    var totalQuestions = 22;
    var userAnswers = [];
    var grade = 0;
    var numberOfQuestions = 0;
    var percentageGrade = 0;
  
    $(document).ready(function() {
      displayQuestions(currentPage);
    });
  
    function displayQuestions(page) {
      var url = "../questions.json";
      $.get(url, function(data) {
        questions = data;
        var startIndex = startingIndex + (page - 1) * questionsPerPage;
        var endIndex = Math.min(startIndex + questionsPerPage, startingIndex + totalQuestions);
  
        $("#php-questions-container").empty();
  
        for (var i = startIndex; i < endIndex; i++) {
          if (i >= questions.length) {
            break;
          }
          var question = questions[i];
          displayQuestionElement(i, question);
        }
  
        updatePagination(page);
      }, "json");
    }
  
    function displayQuestionElement(index, question) {
      var questionElement = $("<div>").addClass("question");
      var questionNumber = $("<span>").addClass("question-number").text("Question " + (index - startingIndex + 1) + ": ");
      var questionText = $("<span>").addClass("question-text").text(question.question);
  
      questionElement.append(questionNumber, questionText);
      $("#php-questions-container").append(questionElement);
  
      if (question.type === "true-false") {
        var trueLabel = $("<label>").text("True");
        var trueRadioBtn = $("<input>").attr({ type: "radio", name: "question" + index, value: "true" });
  
        var falseLabel = $("<label>").text("False");
        var falseRadioBtn = $("<input>").attr({ type: "radio", name: "question" + index, value: "false" });
  
        var lineBreak = $("<br>");
        var lineBreak2 = $("<br>");
  
        trueRadioBtn.change(createChangeHandler(index));
        falseRadioBtn.change(createChangeHandler(index));
  
        $("#php-questions-container").append(trueLabel, trueRadioBtn, falseLabel, falseRadioBtn, lineBreak, lineBreak2);
      }
    }
  
    function createChangeHandler(questionIndex) {
      return function() {
        var answer = $(this).val();
        setSelectedAnswer(questionIndex, answer);
      };
    }
  
    function updatePagination(currentPage) {
      var totalButtons = Math.ceil(totalQuestions / questionsPerPage);
      $("#php-pagination-container").empty();
  
      for (var i = 1; i <= totalButtons; i++) {
        createPaginationButton(i, currentPage);
      }
    }
  
    function createPaginationButton(page, currentPage) {
      var button = $("<button>").text(page);
      if (page === currentPage) {
        button.addClass("active");
      }
      button.click(function() {
        displayQuestions(page);
      });
      $("#php-pagination-container").append(button);
    }
  
    function setSelectedAnswer(questionIndex, answer) {
      userAnswers[questionIndex] = answer;
      if (userAnswers[questionIndex] == "true") {
        userAnswers[questionIndex] = "1";
      } else {
        userAnswers[questionIndex] = "2";
      }
    }
  
    function calculateGrade() {
      grade = 0;
      numberOfQuestions = 0;
  
      for (var i = 46; i < questions.length; i++) {
        var question = questions[i];
        var selectedAnswer = userAnswers[i];
  
        console.log(question.answerId);
        console.log(selectedAnswer);
        numberOfQuestions++;
  
        if (selectedAnswer !== undefined && selectedAnswer == question.answerId) {
          grade++;
        }
      }
  
      console.log(numberOfQuestions);
  
      percentageGrade = (grade / numberOfQuestions) * 100;
  
      console.log(grade + "/" + numberOfQuestions);
      console.log("Grade: " + percentageGrade.toFixed(2) + "%");
    }

    function handleSubmitButtonClick() {
      $("#php-questions-container").empty();
      $("#php-pagination-container").empty();
      $("#php-submit-btn").remove();
    
      calculateGrade();
      
      $("#phpResult").show();

      localStorage.setItem("grade", grade);
      localStorage.setItem("numberOfQuestions", numberOfQuestions);
      localStorage.setItem("percentage", percentageGrade.toFixed(2));
    
      var gradeText = grade + "/" + numberOfQuestions;
      var percentageText = percentageGrade.toFixed(2) + "%";

      console.log(gradeText + ", " + percentageText);
      $("#gradeLabel").text("Grade: ");
      $("#grade").text(gradeText);
      $("#percentageLabel").text("Percentage: ");
      $("#percentage").text(percentageText);

      if (percentageGrade<60) {
        $("#feedback").text("You failed, do better next Time...");
      }
      else{
        $("#feedback").text("Congratulations! You passed, Keep it Up!");
      }
    }        
  
    $("#php-submit-btn").click(handleSubmitButtonClick);
  });
  