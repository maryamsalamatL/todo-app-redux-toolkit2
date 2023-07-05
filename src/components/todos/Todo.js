import styles from "./Todo.module.css";
import { useDispatch } from "react-redux";
import {
  toggleTodoCompleted,
  toggleTodoInProgress,
  deleteTodo,
} from "../../features/todos/todosSlice";
import { BiTrash } from "react-icons/bi";
import { useDrag } from "react-dnd";
import {
  FcNeutralTrading,
  FcPositiveDynamic,
  FcApproval,
} from "react-icons/fc";

const Todo = ({ id, title, status, sectionID, isCompleted, isInProgress }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dispatch = useDispatch();
  return (
    <li
      ref={drag}
      className={`${
        sectionID === "new-todo-section"
          ? styles.yellowBorder
          : sectionID === "in-progress-todo-section"
          ? styles.pinkBorder
          : sectionID === "completed-todo-section"
          ? styles.greenBorder
          : ""
      } ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.titleBox}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => dispatch(toggleTodoCompleted({ id }))}
        />
        <p>{title}</p>
      </div>
      <div className={styles.btnBox}>
        <button
          className={styles.inProgressBtn}
          onClick={() => dispatch(toggleTodoInProgress({ id }))}
        >
          {status === "inProgress" ? (
            <FcPositiveDynamic />
          ) : status === "completed" ? (
            <FcApproval />
          ) : (
            <FcNeutralTrading />
          )}
        </button>
        <button
          className={styles.removeBtn}
          onClick={() => dispatch(deleteTodo({ id }))}
        >
          <BiTrash />
        </button>
      </div>
    </li>
  );
};

export default Todo;
