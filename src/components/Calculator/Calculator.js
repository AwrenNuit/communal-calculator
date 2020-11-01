import CalculatorButton from "../CalculatorButton/CalculatorButton";
import { buttonList } from "../CalculatorButton/ButtonList";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function Calculator() {
  const [calculationResult, setCalculationResult]     = useState("");
  const [currentNumber, setCurrentNumber]             = useState("0");
  const [equation, setEquation]                       = useState(null);
  const [firstNumber, setFirstNumber]                 = useState(null);
  const [operator, setOperator]                       = useState(null);
  const [showResult, setShowResult]                   = useState(false);
  const [waitForSecondNumber, setWaitForSecondNumber] = useState(false);

  // renders calculation result or current number to DOM
  useEffect(() => {
    if (calculationResult) return setShowResult(true);
    if (!calculationResult) return setShowResult(false);
  }, [calculationResult]);

  // POSTs calculation to database when equation changes
  useEffect(() => {
    if (equation) updateDatabase(equation);
  }, [equation]);

  // clears display & reset variables when AC button is clicked
  const clearDisplay = () => {
    setCalculationResult("");
    setCurrentNumber("0");
    setEquation(null);
    setFirstNumber(null);
    setOperator(null);
    setShowResult(false);
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
      setCalculationResult(String(result));
      setFirstNumber(result);
      setCurrentNumber("0");
    }
    setOperator(op);
    setWaitForSecondNumber(true);
  };

  // triggers when number button is clicked
  const getNumber = (num) => {
    if (waitForSecondNumber) {
      updateCurrentNumber(num);
      setWaitForSecondNumber(true);
    } else {
      updateCurrentNumber(num);
    }
    setCalculationResult("");
  };

  // passes click handler function to the button component based on class name
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

  // updates current number and display
  const updateCurrentNumber = (num) => {
    if (currentNumber === "0") {
      setCurrentNumber(num);
    } else {
      setCurrentNumber((currentNumber) => (currentNumber += num));
    }
  };

  // POSTs incoming entry to database with timestamp as key
  const updateDatabase = (incomingEntry) => {
    const timestamp = Date.now();
    db.ref("/history").update({
      [timestamp]: incomingEntry,
    });
  };

  return (
    <div id="calc-container">
      <div id="calc">
        <input
          type="text"
          id="calc-screen"
          value={showResult ? calculationResult : currentNumber}
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
