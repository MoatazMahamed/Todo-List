import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// Dialog Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useContext, useState } from "react";
import { TodosContext } from "../Context/TodosContext";
import toast from "react-hot-toast";

function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTitledTodo, setUpdatedTitledTodo] = useState("");

  // Event Handler
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    toast.success("Edited Successfully")
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
    setUpdatedTitledTodo(todo.title);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    toast.success("Deleted Successfully")
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTitledTodo };
      } else {
        return t;
      }
    });

    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    toast.success("Updated Successfully")
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you you sure you want to delete this task
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once the deletion process is complete, there is no way to recover
            what was deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{background:"#1212e5bc", color:"#fff"}} onClick={handleDeleteDialogClose}>Close</Button>
          <Button sx={{background:"#cd3115", color:"#fff"}} autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Delete Dialog ===*/}

      {/* Update Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        PaperProps={{
          style: {
            minWidth: "400px",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Title"
            fullWidth
            variant="standard"
            value={updatedTitledTodo}
            onChange={(e) => {
              setUpdatedTitledTodo(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Close</Button>
          <Button sx={{background:"#1212e5bc", color:"#fff"}} autoFocus onClick={handleUpdateConfirm}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Update Dialog ===*/}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "#fff",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* Actions Buttons Left */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "#fff",
                  border: "3px solid #b23c17",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "#fff",
                  border: "3px solid #1769aa",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "#fff" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "#fff",
                  border: "3px solid #8bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
            {/* Actions Buttons Left */}

            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  mt: 1,
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
