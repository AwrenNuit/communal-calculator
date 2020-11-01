import { createContext, useEffect, useReducer } from "react";
import { db } from "../../firebase";
import CalculationHistory from "../CalculationHistory/CalculationHistory";
import Calculator from "../Calculator/Calculator";
import "./App.css";

export const Context = createContext();

const initialState = {
  calculationHistory: [],
};

// holds global states
const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_HISTORY`:
      return { calculationHistory: [action.payload, ...state.calculationHistory], };
    case `PREP_HISTORY`:
    // remove oldest calculation from state to prepare for incoming one(s)
    const newArray = state.calculationHistory.reverse().slice(1).reverse();
      return { calculationHistory: newArray, };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  // database listener
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
