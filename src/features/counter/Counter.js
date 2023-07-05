import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incByValue } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
  const [inputValue, setInputValue] = useState("");
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <p>counter componentm -{counter.value}</p>
      <button onClick={() => dispatch(increment())}>inc</button>
      <button onClick={() => dispatch(decrement())}>dec</button>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => dispatch(incByValue(Number(inputValue)))}>
        incByValue
      </button>
    </div>
  );
};

export default Counter;
