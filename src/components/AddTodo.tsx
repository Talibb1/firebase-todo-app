import { useState } from "react";
import { TextField, Button, Stack, Snackbar } from "@mui/material";
import { nanoid } from "nanoid";

interface Todo {
  id: string;
  body: string;
}

interface AddTodoProps {
  addTodo: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) {
      setSnackbarMessage("No content");
      setOpen(true);
      return;
    }

    const todo: Todo = {
      id: nanoid(),
      body: content,
    };

    addTodo(todo);
    setContent("");
    setSnackbarMessage("Todo added successfully");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          variant="filled"
          placeholder="Learning React"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </form>
  );
};

export default AddTodo;
