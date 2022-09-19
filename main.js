const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('#calculator__display');
const clear = document.getElementsByClassName('clear');
const buttons = document.querySelectorAll('button')

keys.addEventListener("click", (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    const calculate = (num1, operator, num2) => {
      const firstNum = parseFloat(num1);
      const secondNum = parseFloat(num2);

      if (operator === 'add') { return firstNum + secondNum; }
      if (operator === 'subtract') { return firstNum - secondNum; }
      if (operator === 'multiply') { return firstNum * secondNum; }
      if (operator === 'divide') { return firstNum / secondNum; }
    };

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNum + keyContent;
      }

    calculator.dataset.previousKeyType = 'number'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' 
    ) {
      const firstNum = calculator.dataset.firstNum
      const operator = calculator.dataset.operator
      const secondNum = displayNum;

      if (firstNum && 
          operator && 
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate') {
        const calcValue = calculate(firstNum, operator, secondNum)
        display.textContent = calcValue;
        calculator.dataset.firstNum = calcValue;
      } else {
        calculator.dataset.firstNum = displayNum;
      }

    key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action
    }

    if (action === 'decimal') {
      if (!displayNum.includes('.')) {
        display.textContent = displayNum + '.'
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.';
      }

    calculator.dataset.previousKeyType = 'decimal'
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstNum = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC'
      }

     display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'AC'
    }

    if (action === 'calculate') {
      const firstNum = calculator.dataset.firstNum
      const operator = calculator.dataset.operator
      const secondNum = displayNum;
    
    if (firstNum) {
      if (previousKeyType === 'calculate') {
        firstNum = displayNum;
        secondNum = calculator.dataset.modValue;
        }

    display.textContent = calculate(firstNum, operator, secondNum)
      }

    calculator.dataset.modValue = secondNum
    calculator.dataset.previousKeyType = 'calculate'
    }
  }
});