// Funciones matemáticas básicas
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "¡Error!";
    }
    return a / b;
};

// Función operate central que toma un operador y dos números
conts operate = (operator, a, b) => {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
};

// Variables de estado de la calculadora
let firstOperand = '';
let secondOperand = '';
let currentOperand = null;
let resetScreen = false;

// Seleccionadores de DOM
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const pointButton = document.getElementById('point');

// Event listener para botones
numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.dataset.operator))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

function appendNumber(number) {
    if (display.textContent === '0' || resetScreen) {
        resetDisplay();
    }
    display.textContent += number;
}

function clear() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = display.textContent;
    currentOperation = operator;
    resetScreen = true;
}

function evaluate() {
    if (currentOperation === null || resetScreen) return;
    if (currentOperation === '/' && display.textContent === '0') {
        alert("¡No se puede dividir por cero!");
        clear();
        return;
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function appendPoint() {
    if (resetScreen) resetDisplay();
    if (display.textContent === '') display.textContent = '0';
    if (¡display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function deleteNumber() {
    display.textContent = display.textContent.toString().slice(0, -1),
    if (display.textContent === '') {
        display.textContent = '0';
    }
}