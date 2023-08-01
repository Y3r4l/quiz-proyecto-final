const quizData = {
  junior: [
    {
      question: "¿Cuál de los siguientes es un método válido para declarar una variable en JavaScript?",
      options: ["let variableName;", "variable variableName;", "const variableName;"],
      correctAnswer: 0
    },
    {
      question: "¿Qué valor devuelve el método Array.isArray([])?",
      options: ["true", "false", "TypeError"],
      correctAnswer: 0
    },
    {
      question: "¿Cuál es la forma correcta de comentar una línea en JavaScript?",
      options: ["// Este es un comentario", "<!-- Este es un comentario -->", "/* Este es un comentario */"],
      correctAnswer: 0
    },
    // ... más preguntas Junior aquí ...
  ],
  semiSenior: [
    {
      question: "¿Cuál de las siguientes afirmaciones sobre las funciones en JavaScript es correcta?",
      options: [
        "Todas las funciones deben tener una declaración de retorno.",
        "Las funciones pueden tener múltiples valores de retorno.",
        "Las funciones pueden ser pasadas como argumentos a otras funciones."
      ],
      correctAnswer: 2
    },
    {
      question: "¿Cuál de los siguientes métodos elimina el último elemento de un array en JavaScript?",
      options: [".shift()", ".pop()", ".splice()", ".slice()"],
      correctAnswer: 1
    },
    // ... más preguntas Semi-Senior aquí ...
  ],
  senior: [
    {
      question: "¿Cuál de las siguientes opciones es verdadera acerca de las promesas en JavaScript?",
      options: [
        "Las promesas son utilizadas para manejar operaciones asíncronas.",
        "Las promesas pueden estar en uno de los siguientes estados: pendiente, resuelta, rechazada.",
        "Ambas son correctas."
      ],
      correctAnswer: 2
    },
    {
      question: "¿Cuál es el resultado de '2' + 2 en JavaScript?",
      options: ["4", "'22'", "NaN", "Error"],
      correctAnswer: 1
    },
    {
      question: "¿Qué método se utiliza para detener la propagación de eventos en JavaScript?",
      options: ["stopPropagation()", "preventDefault()", "stopImmediatePropagation()", "No existe tal método"],
      correctAnswer: 0
    },
    {
      question: "¿Cómo puedes verificar si una variable es un array en JavaScript?",
      options: ["typeof variable === 'array'", "variable instanceof Array", "Array.isArray(variable)", "Todas las anteriores"],
      correctAnswer: 2
    },
    {
      question: "¿Cuál de las siguientes no es una forma válida de declarar una función en JavaScript?",
      options: ["function name() {}", "const name = function() {}", "const name = () => {}", "let name() = function() {}"],
      correctAnswer: 3
    },
    {
      question: "¿Qué concepto de JavaScript permite llamar una función con un contexto de objeto específico?",
      options: ["apply()", "bind()", "call()", "Todos los anteriores"],
      correctAnswer: 3
    },
    {
      question: "¿Qué es 'this' en JavaScript?",
      options: ["Es el objeto global", "Es el objeto actual", "Depende del contexto", "Ninguno de los anteriores"],
      correctAnswer: 2
    },
    {
      question: "¿Qué significa 'hoisting' en JavaScript?",
      options: ["Es una forma de manejar excepciones", "Es un tipo de bucle", "Es el comportamiento de mover las declaraciones al inicio del scope", "Es una característica de ES6"],
      correctAnswer: 2
    },
    {
      question: "¿Qué es un closure en JavaScript?",
      options: ["Es una función dentro de otra función", "Es una función que tiene acceso al scope de su función exterior", "Es una característica de ES6", "Es una forma de manejar errores"],
      correctAnswer: 1
    },
    {
      question: "¿Cómo puedes crear un objeto en JavaScript?",
      options: ["const obj = {}", "const obj = Object.create()", "const obj = new Object()", "Todas las anteriores"],
      correctAnswer: 3
    },
  ]  
};

// Esta función baraja los elementos de un array (Fisher-Yates shuffle)
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Ahora se barajan las preguntas de cada nivel antes de iniciar el quiz
quizData.junior = shuffle(quizData.junior);
quizData.semiSenior = shuffle(quizData.semiSenior);
quizData.senior = shuffle(quizData.senior);

let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let currentLevel = 'junior';

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const welcomeText = document.getElementById("welcome-text");
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-button");
const scoreText = document.getElementById("score");
const resultText = document.getElementById("result");
const scoreButton = document.getElementById("score-button");

scoreButton.addEventListener("click", () => {
  let storedScores = [];
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let playerData;
      try {
          playerData = JSON.parse(localStorage.getItem(key));
      } catch (e) {
          console.log(`Error parsing data for key ${key}: ${e}`);
          continue; // Si ocurre un error al analizar el objeto JSON, simplemente pasa a la siguiente entrada
      }
      storedScores.push(`${playerData.name}: ${playerData.score}`);
  }
  alert(storedScores.join("\n"));
});

startButton.addEventListener("click", () => {
    playerName = playerNameInput.value;
    welcomeText.innerText = `¡Bienvenido al Quiz de JavaScript, ${playerName}!`;
    playerNameInput.style.display = 'none';
    startButton.style.display = 'none';
    scoreButton.style.display = 'none';
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    nextButton.style.display = 'block';
    scoreText.style.display = 'block';
    currentLevel = 'junior';
    loadQuiz();
});

const correctAnswerEl = document.getElementById("correct-answer");
const resetButton = document.getElementById("reset-button");
const scoresDisplay = document.getElementById("scores-display");

scoreButton.addEventListener("click", () => {
  let storedScores = [];
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let playerData;
      try {
          playerData = JSON.parse(localStorage.getItem(key));
      } catch (e) {
          console.log(`Error parsing data for key ${key}: ${e}`);
          continue; 
      }
      storedScores.push(`${playerData.name}: ${playerData.score}`);
  }
  scoresDisplay.innerText = storedScores.join("\n");
});

resetButton.addEventListener("click", () => {
    // Restablecer las variables de estado del quiz
    currentQuestionIndex = 0;
    score = 0;
    currentLevel = 'junior';

    // Reiniciar las preguntas
    quizData.junior = shuffle(quizData.junior);
    quizData.semiSenior = shuffle(quizData.semiSenior);
    quizData.senior = shuffle(quizData.senior);

    // Ocultar / mostrar los elementos del DOM adecuados
    resetButton.style.display = 'none';
    playerNameInput.style.display = 'block';
    startButton.style.display = 'block';
    scoreButton.style.display = 'block';
    resultText.style.display = 'none';
    welcomeText.innerText = `¡Bienvenido al Quiz de JavaScript!`;
    scoreText.innerText = '';
});

nextButton.addEventListener("click", () => {
    const levelData = quizData[currentLevel];
    const selectedOption = document.querySelector("input[name='option']:checked");
    correctAnswerEl.style.display = 'none'; // Oculta la respuesta correcta al inicio de cada pregunta.
    if (selectedOption) {
        const answer = selectedOption.value;
        if (levelData[currentQuestionIndex].correctAnswer == answer) {
            score++;
        } else {
            correctAnswerEl.innerText = `La respuesta correcta era: ${levelData[currentQuestionIndex].options[levelData[currentQuestionIndex].correctAnswer]}`;
            correctAnswerEl.style.display = 'block';
        }
        currentQuestionIndex++;
        selectedOption.checked = false;
        if (currentQuestionIndex < levelData.length) {
            loadQuiz();
        } else {
            switch (currentLevel) {
                case 'junior':
                    currentLevel = 'semiSenior';
                    break;
                case 'semiSenior':
                    currentLevel = 'senior';
                    break;
                case 'senior':
                    localStorage.setItem(playerName, JSON.stringify({ name: playerName, score: score }));
                    questionEl.style.display = 'none';
                    optionsEl.style.display = 'none';
                    nextButton.style.display = 'none';
                    scoreText.style.display = 'none';
                    resultText.innerText = `¡Felicidades, ${playerName}! Tu puntuación final es ${score}.`;
                    resultText.style.display = 'block';
                    resetButton.style.display = 'block'; // Mostrar botón de reinicio
                    return;
            }
            currentQuestionIndex = 0;  // Reseteamos el índice de la pregunta para el próximo nivel
            loadQuiz();
        }
        scoreText.innerText = `Puntuación actual: ${score}`;
    }
});

function loadQuiz() {
    const levelData = quizData[currentLevel];
    const questionData = levelData[currentQuestionIndex];
    questionEl.innerText = questionData.question;
    const options = questionData.options;
    optionsEl.innerHTML = '';
    options.forEach((option, i) => {
        optionsEl.innerHTML += `
        <label>
            <input type="radio" name="option" value="${i}">
            ${option}
        </label>
        `;
    });
}