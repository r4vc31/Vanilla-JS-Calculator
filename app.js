const previousResult = document.querySelector(".previous-result");
const currentResult = document.querySelector(".current-result");
let number1;
let operator;
let number2;
let isCompleted = false;
let result;

document.querySelectorAll(".key.number").forEach((element) => {
  element.addEventListener(
    "click",
    () => (currentResult.innerHTML += element.innerHTML)
  );
});

document.querySelectorAll(".key.operator").forEach((element) => {
  element.addEventListener("click", () => {
    if (!currentResult.innerHTML) {
      alert("First, insert a number");
      return;
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
    if (!operator) {
      alert("First, insert an operator");
      return;
    }

    if(!number1){
      number1 = parseInt(currentResult.innerHTML);
    }else{
      number2 = parseInt(currentResult.innerHTML); 
    }

    if (number1 && operator && number2) {
      isCompleted = true;
    }

    if(!isCompleted){
      currentResult.innerHTML += operator;
      if(result){
        previousResult.innerHTML = '';
      }
    }

    previousResult.innerHTML += currentResult.innerHTML;
    currentResult.innerHTML = "";
  });
});

const eraser = document.querySelector(".key.eraser");
eraser.addEventListener("click", () => {
  if (operator) {
    currentResult.innerHTML = previousResult.innerHTML.slice(0, -1);
    previousResult.innerHTML = "";
  } else {
    currentResult.innerHTML = currentResult.innerHTML.slice(0, -1);
  }
});

document.querySelector(".key.cleaner").addEventListener("click", () => {
  previousResult.innerHTML = "";
  currentResult.innerHTML = "";
  resetInfo();
  result = null;
});

const equal = document.querySelector(".key.equal");
equal.addEventListener("click", () => {
  if(isCompleted) {
    const operation = number1+operator+number2;
    console.log(operation);
    result = eval(operation);
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