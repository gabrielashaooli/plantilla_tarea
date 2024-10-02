function changeBgColor() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = document.getElementById("bgColorSelector").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = (result === 'Error') ? 'Error' : String(result);
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

function drawGraph(funcType) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
        let xVal = (x - canvas.width / 2) / 50;
        let y;

        switch (funcType) {
            case 'sin':
                y = Math.sin(xVal);
                break;
            case 'cos':
                y = Math.cos(xVal);
                break;
            case 'tan':
                y = Math.tan(xVal);
                break;
            case 'cot':
                y = 1 / Math.tan(xVal);
                break;
            case 'sec':
                y = 1 / Math.cos(xVal);
                break;
            case 'csc':
                y = 1 / Math.sin(xVal);
                break;
            default:
                y = 0;
        }

        const yCoord = canvas.height / 2 - y * 50;
        ctx.lineTo(x, yCoord);
    }

    ctx.strokeStyle = document.getElementById("lnColorSelector").value;
    ctx.stroke();
}

/*
document.getElementById('result').textContent = result;
}

function addPointAndDraw() {
    var canvas = document.getElementById("myCanvas");
    
}

let lastX = 0;
let lastY = 0;

function drawLines(canvas, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    
    lastX = x; lastY = y;
    
    ctx.strokeStyle = document.getElementById("lnColorSelector").value;

    // Draw the Path
    ctx.stroke();
    
}

let canvasElem = document.getElementById("myCanvas");

canvasElem.addEventListener("mousemove", function (e) {
    drawLines(canvasElem, e);
});

*/

