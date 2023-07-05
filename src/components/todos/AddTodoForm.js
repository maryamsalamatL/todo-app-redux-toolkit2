import styles from "./AddTodoForm.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todos/todosSlice";

const AddTodoForm = ({ setIsShow }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue === "") return setError(true);
    setError(false);
    dispatch(addTodo({ title: inputValue }));
    setInputValue("");
    setIsShow(false);
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={ref}
        />
        <button type="submit" className={styles.addBtn}>
          add
        </button>
      </form>
      {error && <p className={styles.error}>Please enter a title !</p>}
    </div>
  );
};

export default AddTodoForm;
