import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import TodoList from "./components/todos/TodoList";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const options = {
  enableMouseEvents: true,
};

function App() {
  return (
    <DndProvider backend={TouchBackend} options={options}>
      <Provider store={store}>
        <div className="App">
          <header>
            <div className="title">
              <h2>TO DO APP</h2>
              <span>{new Date().toLocaleDateString("en-CA")}</span>
            </div>
            <div className="nav">
              <a href="#new-todo-section">Todos</a>
              <a href="#important-todo-section">Important</a>
              <a href="#completed-todo-section">Completed</a>
            </div>
          </header>
          <TodoList />
        </div>
      </Provider>
    </DndProvider>
  );
}

export default App;
