const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll("[data-number]");
const clearButton = document.querySelector("[data-action='clear']");
const decimalButton = document.querySelector("[data-action='decimal']");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-action='equals']");
const backspaceButton = document.querySelector("[data-action='backspace']");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resultDisplayed = false;
let lastOperand = null;

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedDigit = button.textContent;
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
  lastOperand = null;
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
    const clickedOperator = button.dataset.operator;

    if (currentInput === "") {
      operator = clickedOperator;
    } else {
      if (previousInput !== null && operator !== null) {
        const result = operate(previousInput, operator, currentInput);

        if (typeof result === "number") {
          currentInput = result;
          display.textContent = currentInput;
        }
      }

      previousInput = currentInput;
      operator = clickedOperator;
      currentInput = "";
    }

    resultDisplayed = false;
  });
});

equalsButton.addEventListener("click", () => {
  if (currentInput === "") {
    display.textContent = "Please select a number to do the operation";
  } else if (!operator) {
    display.textContent = "Please select an operator to do the operation";
  } else {
    if (!resultDisplayed) {
      lastOperand = currentInput;
    }
    const result = resultDisplayed
      ? operate(currentInput, operator, lastOperand)
      : operate(previousInput, operator, currentInput);
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

function roundResult(number) {
  return Math.round(number * 10 ** 10) / 10 ** 10;
}

function operate(firstNumber, operator, secondNumber) {
  let firstNum = Number(firstNumber);
  let secondNum = Number(secondNumber);

  switch (operator) {
    case "+":
      return roundResult(firstNum + secondNum);
    case "-":
      return roundResult(firstNum - secondNum);
    case "*":
      return roundResult(firstNum * secondNum);
    case "/":
      return secondNum === 0
        ? "Cannot divide by zero"
        : roundResult(firstNum / secondNum);
    default:
      return "Please select an operator..";
  }
}

backspaceButton.addEventListener("click", () => {
  currentInput = String(currentInput);
  if (currentInput === "0" || currentInput === "") {
    return;
  }

  currentInput = currentInput.slice(0, -1);

  currentInput === ""
    ? (display.textContent = "0")
    : (display.textContent = currentInput);

  resultDisplayed = false;
});
