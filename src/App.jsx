import { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TodosContext } from "./Context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "react-hot-toast";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Read Book",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Read Book",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Read Book",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#191b1f",
        minHeight: "100vh",
        width: "100%",
        padding: "1rem",
      }}
    >
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodosContext.Provider>

      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Cairo, sans-serif",
            fontSize: "16px",
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
          },
        }}
        position="bottom-left"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
