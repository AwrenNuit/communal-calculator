import { createContext, useEffect, useReducer } from "react";
import { db } from "../../firebase";
import CalculationHistory from "../CalculationHistory/CalculationHistory";
import Calculator from "../Calculator/Calculator";
import "./App.css";

export const Context = createContext();

const initialState = {
  calculationHistory: [],
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_HISTORY`:
      return { calculationHistory: [action.payload, ...state.calculationHistory], };
    case `PREP_HISTORY`:
      const newArray = state.calculationHistory.reverse().slice(1).reverse();
      return { calculationHistory: newArray, };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    db.ref("/history")
      .orderByKey()
      .limitToLast(10)
      .on("child_added", (snap) => {
        dispatch({ type: `SET_HISTORY`, payload: snap.val() });
      });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Calculator />
      <CalculationHistory />
    </Context.Provider>
  );
}
