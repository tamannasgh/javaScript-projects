class Calculator {
    constructor(previousOperationsElement, currentOperationsElement){
        this.previousOperationsElement = previousOperationsElement
        this.currentOperationsElement = currentOperationsElement
        this.clear()
    }
    
    clear(){
        this.currentOperations = ''
        this.previousOperations = ''
        this.operation = undefined
    }
    
    delete(){
        this.currentOperations = this.currentOperations.toString().slice(0, -1)
    }
    
    appendNumber(number){
        if (number === '.' && this.currentOperations.includes('.')) return 
        this.currentOperations = this.currentOperations.toString() + number.toString()
    }

    chooseOperations(operation){
        if (this.currentOperations === '') return 
        if (this.previousOperations !== '') {
            this.getAnswer()
        }
        this.operation = operation
        this.previousOperations = this.currentOperations
        this.currentOperations = ''
    }

    getAnswer(){
        let calculation
        const prev = parseFloat(this.previousOperations)
        const current = parseFloat(this.currentOperations)
        if (isNaN(prev) || isNaN(current)) return 
        switch(this.operation){
            case '+' : 
            calculation = prev + current
            break
            case '-':
                calculation = prev - current
                break
            case 'x':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return
        }
        this.currentOperations = calculation
        this.operation = undefined
        this.previousOperations = ''
    }
                
                
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
                
                
    updateOutput(){
        this.currentOperationsElement.innerText = 
            this.getDisplayNumber(this.currentOperations)
        if (this.operation != null){
            this.previousOperationsElement.innerText = 
                `${this.getDisplayNumber(this.previousOperations)} ${this.operation}`
        } else{
            this.previousOperationsElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const answerButton = document.querySelector('[data-answer]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-delete]')
const previousOperationsElement = document.querySelector('[data-previous-operations]')
const currentOperationsElement = document.querySelector('[data-current-operations]')

const calculator = new Calculator(previousOperationsElement, currentOperationsElement) 


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateOutput()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperations(button.innerText)
        calculator.updateOutput()
    })
})


answerButton.addEventListener('click', button => {
    calculator.getAnswer()
    calculator.updateOutput()
})


allClearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateOutput()
})


deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateOutput()
})


document.addEventListener('keydown', function(e){
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (e.key.match(patternForNumbers)){
        e.preventDefault();
        calculator.appendNumber(e.key)
        calculator.updateOutput()
    }
    if (e.key === '.'){
        e.preventDefault();
        calculator.appendNumber(e.key)
        calculator.updateOutput()
    }
    if (e.key.match(patternForOperators)){
        e.preventDefault();
        calculator.chooseOperation(e.key)
        calculator.updateOutput()
    }
    if (e.key === 'Enter' || e.key === '='){
        e.preventDefault();
        calculator.getAnswer()
        calculator.updateOutput()
    }
    if (e.key === 'Backspace'){
        e.preventDefault();
        calculator.delete()
        calculator.updateOutput()
    }
    if (e.key === 'Delete'){
        e.preventDefault();
        calculator.clear()
        calculator.updateOutput()
    }
})