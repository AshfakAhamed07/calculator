const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll("[data-number]");
const clearButton = document.querySelector("[data-action='clear']");
const decimalButton = document.querySelector("[data-action='decimal']");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-action='equals']");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resultDisplayed = false;

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let clickedDigit = event.target.textContent;
    if (resultDisplayed) {
      currentInput = clickedDigit;
      display.textContent = currentInput;
      resultDisplayed = false;
    } else {
      currentInput =
        currentInput === "0" || currentInput === ""
          ? clickedDigit
          : currentInput + clickedDigit;
      display.textContent = currentInput;
    }
  });
});

clearButton.addEventListener("click", () => {
  currentInput = "0";
  previousInput = null;
  operator = null;
  resultDisplayed = false;
  display.textContent = "0";
});

decimalButton.addEventListener("click", () => {
  if (resultDisplayed) {
    currentInput = "0.";
    resultDisplayed = false;
  } else if (currentInput === "") {
    currentInput = "0.";
  } else {
    currentInput = currentInput.includes(".")
      ? currentInput
      : currentInput + ".";
  }

  display.textContent = currentInput;
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let clickedOperator = button.dataset.operator;
    previousInput = currentInput;
    operator = clickedOperator;
    currentInput = "";
    resultDisplayed = false;
  });
});

equalsButton.addEventListener("click", () => {
  if (currentInput === "") {
    display.textContent = "Please select a number to do the operation";
  } else if (!operator) {
    display.textContent = "Please select an operator to do the operation";
  } else {
    const result = calculate(previousInput, operator, currentInput);
    if (typeof result === "number") {
      currentInput = result;
      display.textContent = currentInput;
      resultDisplayed = true;
    } else {
      display.textContent = result;
      previousInput = null;
      operator = null;
      currentInput = "0";
      resultDisplayed = false;
    }
  }
});

function calculate(firstNumber, operator, secondNumber) {
  let firstNum = Number(firstNumber);
  let secondNum = Number(secondNumber);

  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return secondNum === 0 ? "Cannot divide by zero" : firstNum / secondNum;
    default:
      return "Please select an operator..";
  }
}
