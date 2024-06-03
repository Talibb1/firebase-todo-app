import { useState, useEffect } from "react";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import app from "./components/firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
  push,
} from "firebase/database";

const db = getDatabase(app);

interface Todo {
  id: string;
  body: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosRef = ref(db, "todos");
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });
  }, []);

  const deleteTodo = (id: string) => {
    const todoRef = ref(db, `todos/${id}`);
    remove(todoRef)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error removing todo: ", error);
      });
  };

  const addTodo = (todo: Omit<Todo, "id">) => {
    const newTodoRef = push(ref(db, "todos"));
    const newTodo = { ...todo, id: newTodoRef.key! };
    set(newTodoRef, newTodo)
      .then(() => {
        setTodos([...todos, newTodo]);
      })
      .catch((error) => {
        console.error("Error adding todo: ", error);
      });
  };

  const updateTodo = (id: string, body: string) => {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, { body })
      .then(() => {
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, body } : todo))
        );
      })
      .catch((error) => {
        console.error("Error updating todo: ", error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            color="primary"
          >
            Todo Application
          </Typography>
        </Box>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <AddTodo addTodo={addTodo} />
      </Container>
    </>
  );
};

export default App;
