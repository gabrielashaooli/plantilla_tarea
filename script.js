const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
  }

  if (firstOperand == null) {
      calculator.firstOperand = inputValue;
  } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => secondOperand !== 0 ? firstOperand / secondOperand : 'Error',
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
  '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
      return;
  }

  if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
}

if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
}

inputDigit(target.value);
updateDisplay();
});

function drawGraph(type) {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw the axes
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  
  // Graphing the selected function
  ctx.beginPath();
  ctx.strokeStyle = document.getElementById('lnColorSelector').value;
  
  for (let x = -Math.PI; x < Math.PI; x += 0.01) {
      let y;
      switch (type) {
          case 'sin':
              y = Math.sin(x);
              break;
          case 'cos':
              y = Math.cos(x);
              break;
          case 'tan':
              y = Math.tan(x);
              break;
          case 'cot':
              y = 1 / Math.tan(x);
              break;
          case 'sec':
              y = 1 / Math.cos(x);
              break;
          case 'csc':
              y = 1 / Math.sin(x);
              break;
      }
      
      const canvasX = (x + Math.PI) * (width / (2 * Math.PI));
      const canvasY = height / 2 - y * (height / 4);
      
      if (x === -Math.PI) {
          ctx.moveTo(canvasX, canvasY);
      } else {
          ctx.lineTo(canvasX, canvasY);
      }
  }
  
  ctx.stroke();
}
