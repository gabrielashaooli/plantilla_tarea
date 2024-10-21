const calculatorScreen = document.querySelector(".calculator-screen");

let currentInput = "0";
let previousInput = "";
let operator = "";
let isOperatorClicked = false;

function updateScreen(value) {
  calculatorScreen.value = value;
}

const numberButtons = document.querySelectorAll(".btn-light, .decimal");
numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.value;
    if (isOperatorClicked) {
      currentInput = value;
      isOperatorClicked = false;
    } else {
      if (currentInput === "0" && value !== ".") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
    updateScreen(currentInput);
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedOperator = event.target.value;

    if (selectedOperator === "=") {
      if (operator) {
        currentInput = calculate(previousInput, operator, currentInput);
        operator = "";
      }
      updateScreen(currentInput);
    } else if (!isOperatorClicked && previousInput && operator) {
      currentInput = calculate(previousInput, operator, currentInput);
      updateScreen(currentInput);
      operator = selectedOperator;
      previousInput = currentInput;
      isOperatorClicked = true;
    } else {
      operator = selectedOperator;
      previousInput = currentInput;
      isOperatorClicked = true;
    }
  });
});

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  isOperatorClicked = false;
  updateScreen(currentInput);
}

const clearButton = document.querySelector(".all-clear");
clearButton.addEventListener("click", () => {
  clearAll();
});

function calculate(first, operator, second) {
  let result = 0;
  const firstNum = parseFloat(first);
  const secondNum = parseFloat(second);

  switch (operator) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "/":
      result = firstNum / secondNum;
      break;
    case "^":
      result = Math.pow(firstNum, secondNum);
      break;
    case "%":
      result = (firstNum * secondNum) / 100;
      break;
    default:
      return second;
  }

  return result.toString();
}



updateScreen(currentInput);

function drawGraph(type) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Dibuja los ejes
  ctx.beginPath();
  ctx.moveTo(0, height / 2); // Eje horizontal
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  ctx.moveTo(width / 2, 0); // Eje vertical
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = document.getElementById("lnColorSelector").value;

  for (let x = -width / 2; x < width / 2; x += 1) {
    let y;
    switch (type) {
      case "sin":
        y = Math.sin(x / 50); // Ajuste de escala para seno
        break;
      case "cos":
        y = Math.cos(x / 50); // Ajuste de escala para coseno
        break;
      case "tan":
        y = Math.tan(x / 50); // Ajuste de escala para tangente
        break;
      case "cot":
        y = 1 / Math.tan(x / 50); // Ajuste de escala para cotangente
        break;
      case "sec":
        y = 1 / Math.cos(x / 50); // Ajuste de escala para secante
        break;
      case "csc":
        y = 1 / Math.sin(x / 50); // Ajuste de escala para cosecante
        break;
      case "parabola": 
        y = (x / 50) * (x / 50); 
        break;
      default:
        return;
    }

    const canvasX = x + width / 2;
    const canvasY = height / 2 - y * 10; // Ajuste de la escala de Y para que la parábola sea visible

    if (x === -width / 2) {
      ctx.moveTo(canvasX, canvasY);
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  }

  ctx.stroke();
}

