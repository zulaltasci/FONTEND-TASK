
let currentQuestionIndex = 0;
let timer;
const answers = [];
let questions = []; 

async function fetchData() {
 try {
   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
   const data = await response.json();
   console.log("Data fetched:", data);
   return data;
 } catch (error) {
   console.error("Error fetching data:", error);
   return null;
 }
}
async function printTitles() {
    try {
      const data = await fetchData();
      if (data) {
        for (let i = 0; i < 10; i++) {
          const question = data[i].title;
          const body = data[i].body;
          const parsedAnswers = body.split("\n").map((answer, index) => {
            return `${String.fromCharCode(65 + index)}) ${answer}`;
          });
          questions.push({
            question: ` ${i + 1}) ${question} ?`,
            choices: parsedAnswers,
            correctAnswer: "A",
          });
        }
        displayQuestion();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  

printTitles();

let canAnswer = false; 



function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const timerElement = document.getElementById("timer");

  if (currentQuestionIndex < questions.length) {
    const { question, choices } = questions[currentQuestionIndex];
    questionElement.textContent = question;
    choicesElement.innerHTML = "";

    choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add(
        "bg-pink-400",
        "hover:bg-pink-900",
        "text-white",
        "font-bold",
        "py-5",
        "px-4",
        "rounded",
        "flex",
        "justify-start",
        "items-start",
        "capitalize",
      );

   
      button.disabled = true

      button.addEventListener("click", () => {
        answerQuestion(choice);
      });
      
      choicesElement.appendChild(button);
    });

    timerElement.textContent = "30";
    startTimer();
    canAnswer = false; 
  } else {
    showResult();
  }
}

function startTimer() {
  let timeLeft = 30;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft === 0) {
      answerQuestion("");
    }
  }, 1000);

  setTimeout(() => {
    canAnswer = true;
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }, 10000);
}

function answerQuestion(answer) {
  clearInterval(timer);
  answers.push({ question: questions[currentQuestionIndex].question, answer });
  currentQuestionIndex++;
  displayQuestion();
}

 function showResult() {
   document.getElementById("quiz-container").classList.add("hidden");
   document.getElementById("result-container").classList.remove("hidden");
   const resultTable = document.getElementById("result-table");
   answers.forEach((entry, index) => {
     const row = document.createElement("tr");
     const questionCell = document.createElement("td");
     const answerCell = document.createElement("td");
     questionCell.textContent = entry.question;
     answerCell.textContent = entry.answer;
     row.appendChild(questionCell);
     row.appendChild(answerCell);
     resultTable.appendChild(row);
   });
 }

 document.getElementById("quiz-container").classList.remove("hidden");
