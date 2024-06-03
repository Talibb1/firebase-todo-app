import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Badge,
  Divider,
  Snackbar,
  TextField,
} from "@mui/material";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

interface Todo {
  id: string;
  body: string;
}

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, body: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  updateTodo,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setSnackbarMessage("Todo deleted successfully");
    setOpen(true);
  };

  const handleEdit = (id: string, body: string) => {
    setEditingId(id);
    setEditingContent(body);
  };

  const handleUpdate = (id: string) => {
    updateTodo(id, editingContent);
    setEditingId(null);
    setEditingContent("");
    setSnackbarMessage("Todo updated successfully");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!todos.length) {
    return (
      <Badge color="primary" variant="dot">
        <Typography>No Todos</Typography>
      </Badge>
    );
  }

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: {
            xs: "90vw",
            sm: "80vw",
            lg: "50vw",
            xl: "40vw",
          },
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: "8px",
          p: 2,
        }}
      >
        {todos.map((todo) => (
          <div key={todo.id}>
            <ListItem
              secondaryAction={
                editingId === todo.id ? (
                  <IconButton
                    edge="end"
                    aria-label="update"
                    onClick={() => handleUpdate(todo.id)}
                  >
                    <FaCheck />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(todo.id, todo.body)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </>
                )
              }
            >
              {editingId === todo.id ? (
                <TextField
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  fullWidth
                />
              ) : (
                <ListItemText primary={todo.body} />
              )}
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default TodoList;
