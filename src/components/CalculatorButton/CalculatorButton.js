export default function CalculatorButton(props) {
  return (
    <button
      className={props.class}
      onClick={props.handleClick}
      type="button"
      value={props.value}
    >
      {props.value}
    </button>
  );
}
