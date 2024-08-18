// app.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator button');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let result = null;

    function calculatePercentage(value, percentage) {
        return (value * percentage) / 100;
    }

    function calculateSquareRoot(value) {
        return Math.sqrt(value);
    }

    function toggleSign(value) {
        return -value;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                // Clear
                display.textContent = '0';
                currentInput = '';
                operator = '';
                operand1 = '';
                operand2 = '';
                result = null;
            } else if (value === '=') {
                // Calculate result
                operand2 = currentInput;
                if (operator && operand1 && operand2) {
                    switch (operator) {
                        case '+':
                            result = parseFloat(operand1) + parseFloat(operand2);
                            break;
                        case '-':
                            result = parseFloat(operand1) - parseFloat(operand2);
                            break;
                        case '*':
                            result = parseFloat(operand1) * parseFloat(operand2);
                            break;
                        case '/':
                            if (parseFloat(operand2) === 0) {
                                result = "Nolga bo'linish mumkin emas";
                            } else {
                                result = parseFloat(operand1) / parseFloat(operand2);
                            }
                            break;
                    }
                    display.textContent = result;
                    currentInput = result;
                    operator = '';
                    operand1 = '';
                    operand2 = '';
                }
            } else if (value === '%') {
                // Percentage
                if (operand1 && operator) {
                    currentInput = calculatePercentage(parseFloat(operand1), parseFloat(currentInput)).toString();
                    display.textContent = currentInput;
                }
            } else if (value === '√') {
                // Square Root
                currentInput = calculateSquareRoot(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
            } else if (value === '±') {
                // Toggle Sign
                currentInput = toggleSign(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Operator
                operand1 = currentInput;
                operator = value;
                currentInput = '';
            } else {
                // Number
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
});

