import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  dndToTodos,
  dndToCompleted,
  dndToInProgress,
  getSavedTodos,
} from "../../features/todos/todosSlice";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { BiChevronUp, BiPlus } from "react-icons/bi";
import AddTodoForm from "./AddTodoForm";
import { useDrop } from "react-dnd";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedTodos());
  }, []);

  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>{error}</p>;

  const newTodos = todos.filter((t) => t.status === "todos");
  const inProgressTodos = todos.filter((t) => t.status === "inProgress");
  const completedTodos = todos.filter((t) => t.status === "completed");

  return (
    <div className={styles.mainContainer}>
      <RenderTodos title="Todos" todos={newTodos} id="new-todo-section" />
      {todos.length ? (
        <>
          <RenderTodos
            title="In Progress"
            todos={inProgressTodos}
            id="in-progress-todo-section"
          />

          <RenderTodos
            title="Completed"
            todos={completedTodos}
            id="completed-todo-section"
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TodoList;

const RenderTodos = ({ title, todos, id }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addItemToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addItemToSection = (item) => {
    console.log(title);
    if (id === "completed-todo-section") {
      dispatch(dndToCompleted({ id: item.id }));
    } else if (id === "in-progress-todo-section") {
      dispatch(dndToInProgress({ id: item.id }));
    } else {
      dispatch(dndToTodos({ id: item.id }));
    }
  };

  return (
    <section ref={drop} id={id} className={isOver ? styles.dropping : ""}>
      <div className={styles.topSection}>
        <h3>{title}</h3>
        {id === "new-todo-section" && (
          <button onClick={() => setIsShow(!isShow)}>
            {isShow ? (
              <BiChevronUp className={styles.showBtn} />
            ) : (
              <BiPlus className={styles.showBtn} />
            )}
          </button>
        )}
      </div>
      {isShow && <AddTodoForm setIsShow={setIsShow} />}

      <ul>
        {todos.length === 0 ? (
          <p className="grayText">
            there is no {title.toLowerCase()} {title === "Todos" ? "" : "todos"}
          </p>
        ) : (
          todos.map((todo) => <Todo key={todo.id} {...todo} sectionID={id} />)
        )}
      </ul>
    </section>
  );
};
