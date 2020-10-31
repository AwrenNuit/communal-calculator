import CalculatorButton from "../CalculatorButton/CalculatorButton";
import { buttonList } from "../CalculatorButton/ButtonList";
import { useState } from "react";

export default function Calculator() {
  const [currentNumber, setCurrentNumber]             = useState("0");
  const [equation, setEquation]                       = useState(null);
  const [firstNumber, setFirstNumber]                 = useState(null);
  const [operator, setOperator]                       = useState(null);
  const [waitForSecondNumber, setWaitForSecondNumber] = useState(false);

  // clears display & reset variables when AC button is clicked
  const clearDisplay = () => {
    setCurrentNumber("0");
    setEquation(null);
    setFirstNumber(null);
    setOperator(null);
    setWaitForSecondNumber(false);
  };

  // performs calculation, stores equation as string
  const doCalculation = (op, num1, num2) => {
    switch (op) {
      case "+":
        setEquation(`${num1} + ${num2} = ${num1 + num2}`);
        return num1 + num2;
      case "-":
        setEquation(`${num1} - ${num2} = ${num1 - num2}`);
        return num1 - num2;
      case "*":
        setEquation(`${num1} * ${num2} = ${num1 * num2}`);
        return num1 * num2;
      case "/":
        setEquation(`${num1} / ${num2} = ${num1 / num2}`);
        return num1 / num2;
      case "=":
        return num2;
      default:
        break;
    }
  };

  // renders a decimal point when decimal button is clicked
  // add a 0 in front of the decimal if it's the first button clicked
  const getDecimal = () => {
    if (!currentNumber.includes(".")) {
      if (operator && currentNumber.length === 0) {
        setCurrentNumber((currentNumber) => (currentNumber += "0."));
      } else {
        setCurrentNumber((currentNumber) => (currentNumber += "."));
      }
    }
  };

  // triggers when operator button is clicked
  // sets first number or performs calculation and sends equation to database
  const getOperator = (op) => {
    if (firstNumber === null) {
      setFirstNumber(+currentNumber);
      setCurrentNumber("0");
    } else if (operator) {
      const result = doCalculation(operator, firstNumber, +currentNumber);
      setCurrentNumber(String(result));
      setFirstNumber(result);
      // updateDatabase(equation);
    }
    setOperator(op);
    setWaitForSecondNumber(true);
  };

  const getNumber = (num) => {
    if (waitForSecondNumber) {
      updateCurrentNumber(num);
      setWaitForSecondNumber(true);
    } else {
      updateCurrentNumber(num);
    }
  };

  const passClickHandlerAsProps = (type, val) => {
    switch (type) {
      case "operator":
        return getOperator(val);
      case "equal-sign":
        return getOperator(val);
      case "all-clear":
        return clearDisplay();
      case "decimal":
        return getDecimal();
      default:
        return getNumber(val);
    }
  };

  const updateCurrentNumber = (num) => {
    if (currentNumber === "0") {
      setCurrentNumber(num);
    } else {
      setCurrentNumber((currentNumber) => (currentNumber += num));
    }
  };

  return (
    <div id="calc-container">
      <div id="calc">
        <input
          type="text"
          id="calc-screen"
          value={currentNumber}
          placeholder="0"
          disabled
        />
        <div id="calc-keys">
          {buttonList.map((btn, i) => (
            <CalculatorButton
              key={i}
              class={btn.class || null}
              handleClick={() => passClickHandlerAsProps(btn.class, btn.value)}
              value={btn.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
