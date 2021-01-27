// var for "begin" button 
var beginBtn = document.querySelector('#begin-button');
// var for "result" button 
var resultBtn = document.querySelector('#result-Btn');
//variable for current brainBuster to be displayed on screen
var brainBusterBox = document.querySelector('#brainBusterBox');
//variabe to display answerChoice on screen
var selection = document.querySelector('#selection');
//variable for correct answer  
var result = document.querySelector('#result');
// variable to keep track of "brainBusters"
// "brainBusters" are brainBusters
var timerDigitEl = document.querySelector('.timer-digits');
var userInput = document.querySelector("#userInput");
var showResults = document.querySelector("#Result");
var removeBlanks = document.querySelector("#blank1");
var removeBlanks2 = document.querySelector("#blank2");
// variables for "back button"
var backBtn = document.querySelector('#backButton');
var scores = document.querySelector('.scores');
var removeH1 = document.querySelector('h1');
var removeH3 = document.querySelector('h3');
var brainBusterdigit = 0;
var score = 0;
var timeLeft = 60;
var timer;



// function to display brainBuster and choices in the order displayed on screen
function currentBuster() {
    var brainBuster = [{
        brainBuster: "What is the correct way to write a JavaScript array?",
        answerChoice: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 'red', 'green', 'blue", "var colors = 1 =('red'), 2 =('green'), 3 =('blue')", "var colors ['red', 'green', 'blue']"],
        correct: "var colors ['red', 'green', 'blue']"
    },

    {
        brainBuster: "How many elements can you apply an 'ID' attribute to?",
        answerChoice: ["As many as you want", "27", "1", "12"],
        correct: "1"
    },

    {
        brainBuster: "Which of these values can a boolean variable contain?",
        answerChoice: ["0 & 1", "False", "Any integer value", "True & False"],
        correct: "True & False"
    },

    {
        brainBuster: "What does DOM stand for?",
        answerChoice: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Oriented Mode"],
        correct: "Document Object Model"
    },

    {
        brainBuster: "Is there a difference between JavaScript and Java?",
        answerChoice: ["No, they are the same thing", "One is coding and the other is coffee", "Yes, they are two different languages", "Yes, they are spelled different"],
        correct: "Yes, they are two different languages"
    },
    {
        brainBuster: "What is used primarily to add styling to a web page?",
        answerChoice: ["HTML", "CSS", "Python", "React.js"],
        correct: "CSS"
    },

    {
        brainBuster: "Inside which HTML element do we put the Javascript?",
        answerChoice: ["<js>", "<scripting>", "<javascript>", "<script>"],
        correct: "<script>"
    },

    {
        brainBuster: "Which of the following function of an array object adds and/or removes elements from an array?",
        answerChoice: ["toSource()", "sort()", "unshift()", "splice()"],
        correct: "splice()"
    },

    {
        brainBuster: "How do you write 'Hello World' in an alert box?",
        answerChoice: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correct: "alert('Hello World');"
    },

    {
        brainBuster: "How does a FOR loop start?",
        answerChoice: ["for i = 1 to 5", "for(i <= 5; i++)", "for(i = 0; i <= 5; i++)", "for(i = 0; i <= 5)"],
        correct: "for(i = 0; i <= 5; i++)"
    },
    ];

    if (brainBusterdigit < brainBuster.length) {
        //displays brainBuster on page
        brainBusterdigit.innerHTML = brainBuster[brainBusterdigit].brainBuster;
        choices.textContent = (",");

        for (i = 0; i < brainBuster[brainBusterdigit].answerChoice.length; i++) {
            //will create buttons for each option in the brainBuster 
            var el = document.createElement("button");
            el.innerText = brainBuster[brainBusterdigit].answerChoice[i];
            // console.log(el)
            el.setAttribute("data-id", i);
            //event listener for option user chooses
            el.addEventListener("click", function (event) {
                //logs just the text content of answer button
                // console.log(this.textContent)
                //checks users answer and gives score
                if (this.textContent === brainBuster[brainBusterdigit].answer) {
                    score += 10;
                    alert("Correct");
                    brainBusterdigit++;
                    currentBuster();
                }
                else {
                    //removes 5 points and 5 seconds off score and time
                    score -= 5;
                    timeLeft = timeLeft - 5;
                    alert("Incorrect");
                    brainBusterdigit++;
                    currentBuster();
                }
                // console.log(score);
            });
            //appends answerChoice to html to be displayed on screen
            choices.append(el);
        }
    }
}

function takerResult() {
    //captures current user's username
    var username = prompt("Game Over! Enter username")
    if (username === "") {
        alert("username cannot be blank!");
        //will return the function so that the user can input username; will not proceed past this step until username have been entered
        return takerResult();
    }
    else {
        //saved scores variable
        var savedResults = JSON.parse(localStorage.getItem("savedResults")) || [];
        var currenttakerResult = {
            name: username,
            score: score
        };
    }
    //pushes current user's score to storage 
    savedResults.push(currenttakerResult);
    localStorage.setItem("savedResults", JSON.stringify(savedResults));
    // console.log(savedResults)
    // console.log(currenttakerResult)
}

//allows scores to be listed next to users username 
function seeResults() {
    //removes h1, h3 and start button from display
    document.querySelector('h1').style.display = "none";
    document.querySelector('h3').style.display = "none";
    document.getElementById("begin-button").style.display = "none";
    brainBusterDisplay.innerHTML = "";
    choices.textContent = ""
    //will only show 'back button' on this page
    backBtn.innerHTML = "Back";
    removeBlanks.innerHTML = "User's username";
    removeBlanks2.innerHTML = "User's Result";
    displayName.innerHTML = "";
    showResults.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedResults")) || [];
    // console.log(highScores)
    for (i = 0; i < highScores.length; i++) {
        var nameList = document.createElement("li");
        var resultList = document.createElement("li");
        nameList.textContent = highScores[i].name;
        resultList.textContent = highScores[i].score;
        displayName.appendChild(nameList);
        showResults.appendChild(resultList)
    }
    // console.log(displayName)
    // console.log(showResults)
}


function quizTimer() {
    //removes h1, h3 and startbutton when start button is clicked
    document.querySelector('h1').style.display = "none";
    document.querySelector('h3').style.display = "none";
    document.getElementById("begin-button").style.display = "none";

    var timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft === 0 || brainBusterdigit === 10 || timeLeft <= 0) {
            clearInterval(timerInterval);
            timerCountEl.textContent = "Game Over!";
            //displays score on screen AFTER user inputs username
            brainBusterDisplay.innerHTML = "You got " + score + " points out of 100 possible points";
            choices.textContent = "";
            //alert ("You got " + score + " points out of 100 possible points" );
            takerResult();
        }
        else {
            timerCountEl.textContent = timeLeft;
        }
    }, 1000)
};

//reloads the page to start quiz
function restartQuiz() {
    window.location.reload();
}

function beginGame() {
    currentBuster();
    quizTimer();
}

beginBtn.addEventListener("click", beginGame);

resultBtn.addEventListener("click", showResults);

backBtn.addEventListener("click", restartQuiz);
