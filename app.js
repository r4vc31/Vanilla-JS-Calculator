const numbers = document.querySelectorAll(".key.number");
const operators = document.querySelectorAll(".key.operator");
const equal = document.querySelector(".key.equal");
const eraser = document.querySelector(".key.eraser");
const cleaner = document.querySelector(".key.cleaner");

const previousResult = document.querySelector(".previous-result");
const currentResult = document.querySelector(".current-result");

let number1;
let operator;
let number2;
let isCompleted = false;
let result;

numbers.forEach((element) => {
  element.addEventListener(
    "click",
    () => (currentResult.innerHTML += element.innerHTML)
  );
});

operators.forEach((element) => {
  element.addEventListener("click", () => {

    if (!currentResult.innerHTML && !previousResult.innerHTML) {
      alert("First, insert a number");
      return;
    } else {
      if (!number1) {
        number1 = parseInt(currentResult.innerHTML);
      } else {
        number2 = parseInt(currentResult.innerHTML);
      }
    }

    if (number1 && operator && number2) {
      isCompleted = true;
    }

    if (isCompleted) {
      previousResult.innerHTML += currentResult.innerHTML;
      calculateResult();
      if (!number1) {
        number1 = parseInt(currentResult.innerHTML);
      } else {
        number2 = parseInt(currentResult.innerHTML);
      }
    }

    switch (element.innerHTML) {
      case "➕":
        operator = "+";
        break;
      case "➖":
        operator = "-";
        break;
      case "✖️":
        operator = "*";
        break;
      case "➗":
        operator = "/";
        break;
    }

    if (!operator && result === null) {
      alert("First, insert an operator");
      return;
    }

    if (!isCompleted && operator) {
      currentResult.innerHTML += operator;
      if (result !== null) {
        previousResult.innerHTML = "";
      }
    }

    if (result !== null && currentResult.innerHTML != result && operator) {
      previousResult.innerHTML += currentResult.innerHTML;
      currentResult.innerHTML = "";
    }
  });
});

eraser.addEventListener("click", () => {
  if (operator && !currentResult.innerHTML) {
    currentResult.innerHTML = previousResult.innerHTML.slice(0, -1);
    previousResult.innerHTML = "";
  } else {
    currentResult.innerHTML = currentResult.innerHTML.slice(0, -1);
  }
});

cleaner.addEventListener("click", () => {
  previousResult.innerHTML = "";
  currentResult.innerHTML = "";
  resetInfo();
  result = null;
});

equal.addEventListener("click", () => {
  if (isCompleted) {
    calculateResult();
  } else if (previousResult.innerHTML) {
    result = eval(previousResult.innerHTML);
    currentResult.innerHTML = result;
    resetInfo();
  }
});

function resetInfo() {
  number1 = null;
  operator = null;
  number2 = null;
  isCompleted = false;
}

function calculateResult() {
  const operation = number1 + operator + number2;
  result = eval(operation);
  currentResult.innerHTML = result;
  resetInfo();
}
