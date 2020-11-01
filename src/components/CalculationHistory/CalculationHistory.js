import { useContext, useEffect, useState } from "react";
import { Context } from "../App/App";

export default function CalculationHistory() {
  const { state, dispatch } = useContext(Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (state.calculationHistory.length === 10) {
      setHistory([...state.calculationHistory]);
    }
  }, [state]);

  useEffect(() => {
    if (history.length === 10) {
      dispatch({ type: `PREP_HISTORY` });
    }
  }, [history]);

  return (
    <div id="history-container">
      <h3>HISTORY</h3>
      <ul>
        {history.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
