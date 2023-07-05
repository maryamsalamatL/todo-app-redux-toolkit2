import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//we are not using async actions in this case anymore
//there is diffrences between async and sync actions because adding dnd and changin logic
export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      //2 entry=> 1:payload , 2:meta
      // return rejectWithValue([], error);
      //or
      return rejectWithValue(error);
    }
  }
);
export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async ({ title }, { rejectWithValue }) => {
    try {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        important: false,
      };
      const response = await axios.post("http://localhost:3001/todos", newTodo);
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const toggleAsyncCompleted = createAsyncThunk(
  "todos/toggleAsyncCompleted",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        completed,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const toggleAsyncImportant = createAsyncThunk(
  "todos/toggleAsyncImportant",
  async ({ id, important }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        important,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //reducer is for sync actions
    getSavedTodos: (state) => {
      const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      state.todos = savedTodos;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        status: "todos",
        isCompleted: false,
        isInProgress: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      //didn't work for me!
      // const filteredTodos = state.todos.filter(
      //   (item) => item.id !== action.payload.id
      // );
      // state.todos = filteredTodos;

      const index = state.todos.findIndex(
        (item) => item.id === Number(action.payload.id)
      );
      state.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    dndToTodos: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.status = "todos";
      item.isCompleted = false;
      item.isInProgress = false;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    dndToInProgress: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.status = "inProgress";
      item.isInProgress = true;
      item.isCompleted = false;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    dndToCompleted: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.status = "completed";
      item.isCompleted = true;
      item.isInProgress = false;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodoCompleted: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.isCompleted = !item.isCompleted;
      item.isCompleted
        ? (item.status = "completed") && (item.isInProgress = false)
        : (item.status = "todos");
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodoInProgress: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.isInProgress
        ? (item.status = "completed") && (item.isCompleted = true)
        : (item.status = "inProgress") && (item.isCompleted = false);
      item.isInProgress = !item.isInProgress;

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  //for async actions
  extraReducers: {
    [getAsyncTodos.pending]: (state, action) => {
      return { ...state, todos: [], loading: true, error: null };
    },
    [getAsyncTodos.fulfilled]: (state, action) => {
      return { ...state, todos: action.payload, loading: false, error: null };
    },
    [getAsyncTodos.rejected]: (state, action) => {
      return {
        ...state,
        todos: [],
        loading: false,
        error: action.payload.message,
      };
    },
    [addAsyncTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [deleteAsyncTodo.fulfilled]: (state, action) => {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    },
    [toggleAsyncCompleted.fulfilled]: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.completed = action.payload.completed;
    },
    [toggleAsyncImportant.fulfilled]: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.important = action.payload.important;
    },
  },
});
export const {
  getSavedTodos,
  addTodo,
  deleteTodo,
  toggleTodoCompleted,
  toggleTodoInProgress,
  dndToTodos,
  dndToCompleted,
  dndToInProgress,
} = todosSlice.actions;
export default todosSlice.reducer;
