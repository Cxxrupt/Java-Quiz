// Define questions and answers
const questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: ["<scripting>", "<js>", "<script>", "<javascript>",],
      correctAnswer: "<script>",
    },
    {
      question: "JavaScript is a ___ -side programming language?",
      answers: ["Client", "Server", "Both", "None",],
      correctAnswer: "Both",
    },
    {
      question: "What is the tallest mountain in the world?",
      answers: ["Everest", "Kilimanjaro", "Denali", "Aconcagua"],
      correctAnswer: "Everest",
    },
  ];
  
  // Define the game settings
  const timePerQuestion = 10; // in seconds
  const penaltyTime = 5; // in seconds
  const highScoresKey = "high-scores"; // key for local storage
  
  // Get DOM elements
  const startButton = document.getElementById("start-button");
  const timerDisplay = document.getElementById("timer");
  const questionDisplay = document.getElementById("question");
  const answersDisplay = document.getElementById("answers");
  const resultDisplay = document.getElementById("result");
  const highScoresDisplay = document.getElementById("high-scores");
  
  // Define game state variables
  let currentQuestionIndex = 0;
  let timeLeft = 0;
  let timerIntervalId = null;
  
  // Define event listener for the start button
  startButton.addEventListener("click", startGame);
  
  // Define the startGame function
  function startGame() {
    // Reset game state variables
    currentQuestionIndex = 0;
    timeLeft = questions.length * timePerQuestion;
    clearInterval(timerIntervalId);
  
    // Display the first question
    displayQuestion();
  
    // Start the timer
    updateTimerDisplay();
    timerIntervalId = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }
  
  // Define the displayQuestion function
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionDisplay.textContent = question.question;
  
    // Clear the answers display
    answersDisplay.innerHTML = "";
  
    // Display the possible answers
    for (const answer of question.answers) {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => {
        checkAnswer(answer);
      });
      answersDisplay.appendChild(button);
    }
  }
  
  // Define the checkAnswer function
  function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
  
    // Check if the answer is correct
    if (answer === question.correctAnswer) {
      resultDisplay.textContent = "Correct!";
    } else {
      resultDisplay.textContent = "Incorrect!";
      timeLeft -= penaltyTime;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      updateTimerDisplay();
    }
  
    // Go to the next question or end the game
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {    displayQuestion();
    } else {
      endGame();
    }
  }
  
  // Define the updateTimerDisplay function
  function updateTimerDisplay() {
    const seconds = timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60);
    timerDisplay.textContent = `Time: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  
  // Define the endGame function
  function endGame() {
    clearInterval(timerIntervalId);
  
    // Display the final score
    const finalScore = timeLeft;
    questionDisplay.textContent = `Final score: ${finalScore}`;
  
    // Ask for initials and save the score
    const initials = prompt("Enter your initials:");
    if (initials) {
      const highScores = getHighScores();
      highScores.push({ initials, score: finalScore });
      highScores.sort((a, b) => b.score - a.score);
      highScores.splice(10);
      localStorage.setItem(highScoresKey, JSON.stringify(highScores));
      displayHighScores();
    }
  }
  
  // Define the displayHighScores function
  function displayHighScores() {
    const highScores = getHighScores();
    highScoresDisplay.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = "High Scores";
    highScoresDisplay.appendChild(title);
    const list = document.createElement("ol");
    for (const score of highScores) {
      const item = document.createElement("li");
      item.textContent = `${score.initials}: ${score.score}`;
      list.appendChild(item);
    }
    highScoresDisplay.appendChild(list);
  }
  
  // Define the getHighScores function
  function getHighScores() {
    const highScoresJson = localStorage.getItem(highScoresKey);
    if (highScoresJson) {
      return JSON.parse(highScoresJson);
    } else {
      return [];
    }
}
