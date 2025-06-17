let startBtn = document.querySelector(".start-btn"),
  instructionCard = document.querySelector(".instruction"),
  instructionExit = document.querySelectorAll(".instruction button")[0],
  startQuizBtn = document.querySelectorAll(".instruction button")[1],
  wrapper = document.querySelector(".wrapper"),
  nxtBtn = document.querySelector(".btn button"),
  resultCard = document.querySelector(".result-card"),
  time = document.querySelectorAll(".Timer p")[1],
  progressBar = document.querySelector(".inner"),
  questionEl = document.querySelector(".question-container"),
  answerContainer = document.querySelector(".option-container"),
  currentQuestionNum = document.querySelector(".current-question"),
  totalQuestion = document.querySelector(".total-question"),
  totalScore = document.querySelector(".total-score .value"),
  yourScore = document.querySelector(".user-score .value"),
  unattempted = document.querySelector(".unattempted .value"),
  attempted = document.querySelector(".attempted .value"),
  wrong = document.querySelector(".wrong .value"),
  replayQuiz = document.querySelectorAll(".score-btn button")[0];
exitQuiz = document.querySelectorAll(".score-btn button")[1];
let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;

replayQuiz.addEventListener("click", () => {
  resultCard.style.width = "0";
  resultCard.style.transform = "scale(0)";
  wrapper.style.transform = "scale(1)";
  wrapper.style.width = "100%";
  currentQuestion = 0;
  (score = 0),
    (attemptQuestion = 0),
    (unattemptedQuestion = 0),
    (wrongQuestion = 0);
  startQuiz();
});
exitQuiz.addEventListener("click", () => {
  resultCard.style.width = "0";
  resultCard.style.transform = "scale(0)";
  currentQuestion = 0;
  (score = 0),
    (attemptQuestion = 0),
    (unattemptedQuestion = 0),
    (wrongQuestion = 0);
  startBtn.style.transform = "scale(1)";
  startBtn.style.width = "100%";
});

startBtn.addEventListener("click", () => {
  instructionCard.style.transform = "scale(1)";
  instructionCard.style.width = "100%";
  instructionCard.style.opacity = "1";
  startBtn.style.transform = "scale(0)";
  startBtn.style.width = "0";
});

instructionExit.addEventListener("click", () => {
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startBtn.style.transform = "scale(1)";
  startBtn.style.width = "100%";
});

startQuizBtn.addEventListener("click", () => {
  wrapper.style.transform = "scale(1)";
  wrapper.style.width = "100%";
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startQuiz();
});

const questions = [
  {
    question: "Apa yang dimaksud dengan fluida statis?",
    options: [
      "Fluida yang tidak bergerak",
      "Fluida yang bergerak cepat",
      "Fluida yang mendidih",
      "Fluida yang mengalir lambat",
    ],
    answer: "0",
  },
  {
    question: "Apa yang dimaksud dengan tekanan hidrostatik?",
    options: [
      "Tekanan yang dihasilkan oleh gas",
      "Tekanan yang dihasilkan oleh fluida yang bergerak",
      "Tekanan yang dihasilkan oleh fluida diam",
      "Tekanan yang dihasilkan oleh magnet",
    ],
    answer: "2",
  },
  {
    question: "Bagaimana cara menghitung tekanan di dasar kolom air?",
    options: [
      "Menggunakan rumus volume",
      "Menggunakan rumus massa",
      "Menggunakan rumus tekanan hidrostatik",
      "Menggunakan rumus gaya",
    ],
    answer: "2",
  },
  {
    question: "Apa satuan dari tekanan dalam sistem internasional?",
    options: ["Newtont", "Pascal", "watt", "Joule"],
    answer: "1",
  },
  {
    question: "Apa yang dimaksud dengan hukum Archimedes?",
    options: [
      "Sebuah benda akan tenggelam jika lebih berat dari air",
      "Sebuah benda yang dicelupkan ke dalam fluida akan mengalami gaya ke atas sebesar berat fluida yang dipindahkannya",
      "Fluida akan mengalir dari tempat tinggi ke tempat rendah",
      "Fluida akan mengalir dari tempat tinggi ke tempat tinggi",
    ],
    answer: "1",
  },
];

function startQuiz() {
  // Display the first question and its options
  displayQuestion(currentQuestion);

  // Start the timer
  timer = setInterval(updateTimer, 1000);

  // Update the progress bar
  updateProgress();
}

function displayQuestion(questionIndex) {
  updateProgress();
  // Get the question and options from the questions array
  let question = questions[questionIndex].question;
  let options = questions[questionIndex].options;

  // Display the question and options in their respective containers
  questionEl.innerHTML = question;

  for (let i = 0; i < options.length; i++) {
    let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`;

    answerContainer.insertAdjacentHTML("beforeend", option);
  }
}

function checkAnswer(selectedIndex) {
  // Get the selected answer from the user
  attemptQuestion++;
  answerContainer.style.pointerEvents = "none";
  clearInterval(timer);
  let selectedAnswer = questions[currentQuestion].options[selectedIndex];

  // Get the correct answer from the questions array
  let correctAnswer =
    questions[currentQuestion].options[questions[currentQuestion].answer];

  // Compare the selected answer to the correct answer
  if (selectedAnswer === correctAnswer) {
    score++;
    setTimeout(() => {
      document.querySelectorAll("option")[selectedIndex].style.backgroundColor =
        "#37BB1169";
      document.querySelectorAll("option")[selectedIndex].style.color = "#fff";
      document.querySelectorAll("option")[selectedIndex].style.borderColor =
        "green";
    }, 100);

    userAnswers[currentQuestion] = selectedIndex;

    // Display the correct answer and highlight it in green
  } else {
    wrongQuestion++;
    setTimeout(() => {
      document.querySelectorAll("option")[selectedIndex].style.backgroundColor =
        "#B6141469";
      document.querySelectorAll("option")[selectedIndex].style.color = "#fff";
      document.querySelectorAll("option")[selectedIndex].style.borderColor =
        "red";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.backgroundColor = "#37BB1169";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.color = "#fff";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.borderColor = "green";
    }, 100);
  }
}

function nextQuestion() {
  // Check if the user has answered all questions

  answerContainer.style.pointerEvents = "initial";
  time.innerHTML = "15";
  updateProgress();
  timer = setInterval(updateTimer, 1000);
  answerContainer.innerHTML = "";
  if (currentQuestion === questions.length - 1) {
    resultCard.style.width = "300px";
    resultCard.style.transform = "scale(1)";
    totalScore.innerHTML = questions.length;
    yourScore.innerHTML = score;
    attempted.innerHTML = attemptQuestion;
    unattempted.innerHTML = unattemptedQuestion;
    wrong.innerHTML = wrongQuestion;
    wrapper.style.width = "0";
    wrapper.style.transform = "scale(0)";
    endQuiz();
  } else {
    // If there are more questions, update the currentQuestion variable and display the next question and its options
    currentQuestion++;
    currentQuestionNum.innerHTML = currentQuestion + 1;
    displayQuestion(currentQuestion);
  }
}

function updateTimer() {
  // Decrement the timer by 1 second
  let remainingTime = parseInt(time.innerHTML) - 1;

  // Update the timer display
  time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

  // Update the progress bar

  // If the timer reaches 0, end the quiz
  if (remainingTime === 0) {
    unattemptedQuestion++;
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.backgroundColor = "#37BB1169";
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.color = "#fff";
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.borderColor = "green";
    answerContainer.style.pointerEvents = "none";
    endQuiz();
  }
}

function updateProgress() {
  progressBar.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";
}

function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Hide the question and option containers
}

nxtBtn.addEventListener("click", nextQuestion);

totalQuestion.innerHTML = questions.length;
currentQuestionNum.innerHTML = currentQuestion + 1;

// More questions that you can add
/* {
    question: "Which country is known for inventing pizza?",
    options: ["France", "Italy", "Spain", "Greece"],
    answer: "1"
  },
  {
    question: "What is the currency of Mexico?",
    options: ["Euro", "Yen", "Dollar", "Peso"],
    answer: "3"
  },
  {
    question: "Who wrote the novel '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"],
    answer: "0"
  },
  {
    question: "What is the most spoken language in the world?",
    options: ["Mandarin", "English", "Spanish", "French"],
    answer: "1"
  },
  {
  question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: 2
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lungs"],
    answer: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pt", "Cu"],
    answer: 0
  },
  {
    question: "What is the most populated country in the world?",
    options: ["India", "China", "United States", "Russia"],
    answer: 1
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: 1
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount McKinley"],
    answer: 1
  },
  {
    question: "What is the largest country in South America?",
    options: ["Brazil", "Argentina", "Colombia", "Peru"],
    answer: 0
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Vatican City", "San Marino", "Nauru"],
    answer: 1
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H2O2", "H2SO4", "NaCl", "H2O"],
    answer: "3"
  },
  {
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Jupiter", "Saturn", "Mars", "Venus"],
    answer: "2"
  },
  {
    question: "Which country is known for producing the most coffee in the world?",
    options: ["Brazil", "Colombia", "Ethiopia", "Vietnam"],
    answer: "0"
  },
  {
    question: "What is the only continent that lies in all four hemispheres?",
    options: ["North America", "Europe", "Africa", "South America"],
    answer: "2"
  },
  {
    question: "What is the largest animal on land?",
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhino"],
    answer: "0"
  },
  {
    question: "Who is the current Prime Minister of Canada?",
    options: ["Justin Trudeau", "Stephen Harper", "Jean Chrétien", "Brian Mulroney"],
    answer: "0"
  },
  {
    question: "Who directed the movie 'Pulp Fiction'?",
    options: ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Christopher Nolan"],
    answer: "0"
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    answer: "0"
  },
  {
    question: "What is the largest continent in the world?",
    options: ["Europe", "South America", "Asia", "Africa"],
    answer: "2"
  },
  {
    question: "Who is the author of the 'Game of Thrones' book series?",
    options: [ "J.K. Rowling", "Stephen King", "Dan Brown","George R.R. Martin"],
    answer: "3"
  },
  {
    question: "What is the highest waterfall in the world?",
    options: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"],
    answer: "0"
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Antarctic Desert"],
    answer: "3"
  },
  {
    question: "Who wrote the novel 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain"],
    answer: "0"
  },
  {
    question: "What is the chemical symbol for nitrogen?",
    options: ["Na", "N", "Ni", "Ne"],
    answer: "1"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Lion", "Tiger", "Leopard", "Jaguar"],
    answer: "0"
  },
  {
    question: "Who is the current President of the United States?",
    options: ["Barack Obama", "Donald Trump", "Joe Biden", "George W. Bush"],
    answer: "2"
  },
  {
    question: "What is the smallest continent in the world?",
    options: ["Europe", "Antarctica", "Australia", "Africa"],
    answer: "2"
  },
  {
    question: "What is the currency of China?",
    options: ["Yen", "Won", "Rupiah", "Yuan"],
    answer: "0"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Larry Page"],
    answer: "0"
  },
  {
    question: "Who directed the movie 'Jurassic Park'?",
    options: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Quentin Tarantino"],
    answer: "0"
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: "1"
  },
  {
    question: "What is the capital city of Italy?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "3"
  },
  {   
    question: "What is the tallest mammal in the world?",    
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhinoceros"],
    answer: "1"
  },
  {
    question: "What is the name of the device used to measure blood pressure?",
    options: ["Oximeter", "Thermometer", "Sphygmomanometer", "Stethoscope"],
    answer: "2"
  },
  {
    question: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Michael Faraday"],
    answer: "0"
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Ag", "Au", "Pb"],
    answer: "0"
  },
  {
    question: "Who wrote the novel 'To Kill a Mockingbird'?",
    options: [ "J.K. Rowling","Harper Lee", "Stephen King", "John Steinbeck"],
    answer: "1"
  },
  {
    question: "What is the national flower of Japan?",
    options: ["Cherry blossom", "Lily", "Rose", "Sunflower"],
    answer: "0"
  },
  {
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Montreal","Ottawa",  "Vancouver"],
    answer: "2"
  },
  {
    question: "Who wrote the famous novel 'The Great Gatsby'?",
    options: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "Virginia Woolf"],
    answer: "0"
  },
  {
    question: "What is the only continent that is also a country?",
    options: ["North America", "Australia","Europe", "South America"],
    answer: "1"
  },
  {
    question: "What is the name of the scientist who first proposed the theory of relativity?",
    options: [ "Isaac Newton", "Galileo Galilei", "Charles Darwin","Albert Einstein"],
    answer: "3"
  },
  {
    question: "What is the largest country in the world by land area?",
    options: ["Russia", "China", "USA", "Canada"],
    answer: "0"
  },
  {
    question: "What is the capital city of Brazil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    answer: "2"
  },
  {
    question: "What is the name of the first man to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
    answer: "0"
  }*/
