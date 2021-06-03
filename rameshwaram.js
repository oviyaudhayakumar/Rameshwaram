const questions = [
    {
        question: "__ is a town on Pamban Island, in the southeast Indian state of Tamil Nadu.",
        optionA: "Ramanathapuram",
        optionB: "Rameswaram",
        optionC: "Madurai",
        optionD: "None of the above",
        correctOption: " optionB"
    },

    {
        question: "Ramanathaswamy Temple  is a Hindu temple dedicated to the god ___ located on Rameswaram island in the state of Tamil Nadu, India. It is also one of the twelve Jyotirlinga temples.",
        optionA: "Shiva",
        optionB: "Muruga",
        optionC: "Ganesha",
        optionD: "None of the above",
        correctOption: "optionA"
    },

    {
        question: "The primary deity of the temple is Ramanathaswamy in the form of __",
        optionA: "Light",
        optionB: "God",
        optionC: "Stone",
        optionD: "lingam",
        correctOption: "optionD"
    },

    {
        question: "There are ____Tīrthas (holy water bodies) in and around the island of Rameswaram, Tamil Nadu, India.",
        optionA: "80",
        optionB: "75",
        optionC: "64",
        optionD: "65",
        correctOption: "optionC"
    },

    {
        question: "There are several halls in the temple complex including one known as the ___",
        optionA: "Hall of thousand pillars",
        optionB: "Meenakshi Nayakkar Mandapam",
        optionC: "None of the above",
        optionD: "Both A & B",
        correctOption: "optionD"
    },

    {
        question: "The temple is located in Rameswaram considered a holy pilgrimage site for ____",
        optionA: "Shaivities",
        optionB: "Vaishnavites",
        optionC: "Smarthas",
        optionD: "All the above",
        correctOption: " optionD "
    },

    {
        question 7: "The presiding deity, the Lingam of Ramanathaswamy (Shiva), was established and worshiped by __ before crossing his bridge to Lanka.",
        optionA: "Shiva",
        optionB: "Rama",
        optionC: "Both A & B",
        optionD: "Neither A nor B",
        correctOption: "optionB"
    },

    {
        question: "Bordered by the __on one side and the ___on the other, Dhanushkodi once used to serve as an important port for both traders and pilgrims",
        optionA: "Bay of Bengal , Indian Ocean",
        optionB: "Indian Ocean, Arabian Sea",
        optionC: "Indian Ocean , Pacific Ocean",
        optionD: "Bay of bengal , Arabian sea",
        correctOption: "optionA"
    },

    {
        question: "Dhanushkodi, a place __ km away from the main town of Rameshwaram, is the place where you can see the Ram Setu.",
        optionA: "21 ",
        optionB: "22",
        optionC: "19",
        optionD: "20",
        correctOption: "optionD"
    },

    {
        question: `"The town was destroyed during the year __ Rameswaram cyclone and remains uninhabited in the aftermath."`,
        optionA:"1965",
        optionB: "1966",
        optionC: "1963",
        optionD: "964",
        correctOption: "optionD"
    },


]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
