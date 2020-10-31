import CalculatorButton from "../CalculatorButton/CalculatorButton";
import {buttonList} from '../CalculatorButton/ButtonList';

export default function Calculator() {
  const clearDisplay = () => {
    console.log("in clear");
  };

  const getDecimal = () => {
    console.log("in dec");
  };

  const getNumber = (num) => {
    console.log("in thre:", num);
  };

  const getOperator = (op) => {
    console.log("inthere", op);
  };

  const passClickHandlerAsProps = (type, val) => {
    switch (type) {
      case "operator" || "equal-sign":
        return getOperator(val);
      case "all-clear":
        return clearDisplay();
      case "decimal":
        return getDecimal();
      default:
        return getNumber(val);
    }
  };
  return (
    <div id="calc-container">
      <div id="calc">
        <input
          type="text"
          id="calc-screen"
          value="0"
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
