const scoreDisplay = document.getElementById("score-display")
const questionDisplay = document.getElementById("question-display")

const questions = [
    {
        quiz: ['value', 'estimate', 'evaluate'],
        options: ['jury', 'assess'],
        correct: 2
    },

    {
        quiz: ['close', 'near', 'next'],
        options: ['trace', 'adjacent'],
        correct: 2
    },

    {
        quiz: ['foreign', 'national', 'ethnic'],
        options: ['mad', 'exotic'],
        correct: 2
    },

    {
        quiz: ['assume', 'insight', 'weather'],
        options: ['forecast', 'sustainable'],
        correct: 1
    },

    {
        quiz: ['fast', 'quick', 'prompt'],
        options: ['charity', 'rapid'],
        correct: 2
    }
]

let clicked = []

let score = 0

scoreDisplay.textContent = 0

function populateQuestion() {

    questions.forEach((question) => {
        const questionBox = document.createElement('div')
        questionBox.classList.add('question-box')

        const logoDisplay = document.createElement('h1')
        logoDisplay.textContent = "✒️"
        questionBox.append(logoDisplay)


        question.quiz.forEach((tip) => {
            const tipText = document.createElement('p')
            tipText.textContent = tip
            questionBox.append(tipText)
        })

        const questionButtons = document.createElement('div')
        questionButtons.classList.add('questions-buttons')
        questionBox.append(questionButtons)

        question.options.forEach((options, optionIndex) => {
            const questionButton = document.createElement('button')
            questionButton.classList.add('question-button')
            questionButton.textContent = options

            questionButton.addEventListener('click', () => {
                checkAnswer(options, optionIndex + 1, question.correct, questionButton, questionBox)
            })

            questionButtons.append(questionButton)
        })

        const answerDisplay = document.createElement('div')
        answerDisplay.classList.add('answer-display')
        questionBox.append(answerDisplay)

        questionDisplay.append(questionBox)
    })

}
populateQuestion()

function checkAnswer(options, optionIndex, correct, questionButton, questionBox) {
    if (optionIndex === correct) {
        score++
        scoreDisplay.textContent = score
        addResult(questionBox, "Correct")
    }
    else {
        score--
        scoreDisplay.textContent = score
        addResult(questionBox, "Wrong")
    }
    clicked.push(options)
    questionButton.disabled = clicked.includes(options)
}

function addResult(questionBox, answer) {
    const answerDisplay = questionBox.querySelector('.answer-display')
    answerDisplay.textContent = answer
}