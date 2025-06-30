import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

// Icons
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import Todo from "./Todo";

// Others
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../Context/TodosContext";
import toast from "react-hot-toast";

function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    toast.success("Added Successfully")
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos || []);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh", overflow:"scroll"}}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h2" style={{ fontWeight: "500" }}>
            Todo List
          </Typography>
          <Divider />
          {/* Filter Buttons */}
          <ToggleButtonGroup
            style={{ marginTop: "30px"}}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="non-completed">Not Completed</ToggleButton>
          </ToggleButtonGroup>
          {/*=== Filter Buttons ===*/}

          {/* All Todods */}
          {todosToBeRendered.map((t) => {
            return <Todo key={t.id} todo={t} />;
          })}

          {/* Input + Add Button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%"}}
                variant="contained"
                onClick={handleAddClick}
                disabled={titleInput.length === 0 ? true : false}
              >
                Add
              </Button>
            </Grid>

            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Title "
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/*=== Input + Add Button ===*/}

          {/*=== All Todods ===*/}
        </CardContent>
      </Card>
    </Container>
  );
}

export default TodoList;
