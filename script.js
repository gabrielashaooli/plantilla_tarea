@ -87,7 +87,7 @@ function calculate(first, operator, second) {
      result = Math.pow(firstNum, secondNum);
      break;
    case "%":
      result = firstNum % secondNum;
      result = (firstNum * secondNum) / 100;
      break;
    default:
      return second;
@ -96,6 +96,8 @@ function calculate(first, operator, second) {
  return result.toString();
}



updateScreen(currentInput);

function drawGraph(type) {
