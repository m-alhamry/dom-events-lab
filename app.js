/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

// Stores the first number entered
let firstNumber = '';

// Stores the second number entered
let secondNumber = '';

// Stores the selected mathematical operator
let operator = null;

// Tracks whether a result has been displayed
let resultDisplayed = false;

/*------------------------ Cached Element References ------------------------*/

// Selects the calculator container
const calculator = document.querySelector('#calculator');

// Selects the display element and initializes it to '0'
const displayElement = document.querySelector(".display");
displayElement.innerText = '0';

/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener('click', calculatorEventListener);

/*-------------------------------- Functions --------------------------------*/

//Handles button clicks on the calculator.
// Delegates actions based on whether the clicked button is a number, operator, or equals.
function calculatorEventListener(event) {
    if (event.target.classList.contains('button')) {
        if (event.target.classList.contains('number')) {
            handleNumberButton(event)
        } else if (event.target.classList.contains('operator')) {
            handleOperatorButton(event);
        } else if (event.target.classList.contains('equals')) {
            handleEqualButton();
        }
    }
}

// Handles number button clicks.
// Appends the clicked number to `firstNumber` or `secondNumber` based on operator state.
function handleNumberButton(event) {
    if (resultDisplayed) {
        // Reset first number if a result was displayed
        firstNumber = '';
        resultDisplayed = false;
    }
    if (!operator) {
        // Update first number if no operator is selected
        firstNumber += event.target.innerText;
        displayElement.innerText = Number(firstNumber);
    } else {
        // Update second number if an operator is selected
        secondNumber += event.target.innerText;
        displayElement.innerText = Number(secondNumber);
    }
}

// Handles operator button clicks.
// Sets the selected operator and calculates previous operation if applicable.
function handleOperatorButton(event) {
    const selectedOperator = event.target.innerText;
    if (selectedOperator === 'C') {
        // Reset the calculator
        clear();
    } else {
        if (operator && secondNumber) {
            // Calculate the result if an operator and second number exist
            firstNumber = calc(operator, firstNumber, secondNumber);
            displayElement.innerText = firstNumber;
            secondNumber = '';
        }

        // Set the new operator
        operator = selectedOperator;
        resultDisplayed = false;
    }
}

// Handles the equals button click.
// Performs the calculation and displays the result.
function handleEqualButton() {
    if (operator && secondNumber) {
        firstNumber = calc(operator, firstNumber, secondNumber);
        displayElement.innerText = firstNumber;
        resultDisplayed = true; // Mark that a result was displayed
    }
}

// Performs a mathematical operation based on the given operator.
// op: The mathematical operator.
// f: The first number.
// s: The second number.
// returns the calculated result or 'Error' for division by zero.
function calc(op, f, s) {
    const firstValue = Number(f);
    const secondValue = Number(s);
    if (op === "+") {
        return firstValue + secondValue;
    } else if (op === '-') {
        return firstValue - secondValue;
    } else if (op === '*') {
        return firstValue * secondValue;
    } else if (op === '/') {
        return secondValue !== 0 ? firstValue / secondValue : 'Error';
    } else {
        return firstValue;
    }
}

// Clears the calculator, resetting all variables and the display.
function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    resultDisplayed = false;
    displayElement.innerText = '0';
}