import { useEffect, useState } from 'react';
import { Container, Typography, Button, Card } from '@mui/material';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import { getTodos, addTodo, deleteTodo, updateTodo } from './services/api'; // Ensure updateTodo is imported
import './styles/global.css'; // Import global styles
import { v4 as uuidv4 } from 'uuid';
import CustomizedDialogs from './components/viewDialog'; // Import the updated dialog component
import EditToDoDialog from './components/EditToDoDIalog';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    // Fetch todos on mount
    getTodos().then((response) => {
      setTodos(
        response.data.slice(0, 5).map((todo) => ({
          id: uuidv4(),
          title: todo.title,
          description: 'No description available',
        }))
      );
    }); // Mocking with first tasks
  }, []);

  const handleAddTodo = async ({ title, description }) => {
    const newTodo = await addTodo({
      title,
      description,
    });
    setTodos([...todos, { ...newTodo.data, id: String(newTodo.data.id) }]);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, title, description) => {
    const stringId = String(id); // Convert ID to string
    console.log('Edit task:', stringId, title, description);
    // Implement the rest of your logic here
    const todoToEdit = todos.find((todo) => todo.id === id);
    setSelectedTodo(todoToEdit);
    setEditDialogOpen(true);
  };

  const handleUpdateTodo = async (updatedTodo) => {
    const response = await updateTodo(updatedTodo);
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
    );
    setEditDialogOpen(false);
  };

  const handleViewTodo = (todo) => {
    if (typeof todo === 'object' && todo !== null) {
      setSelectedTodo({
        ...todo,
        id: String(todo.id), // Ensure id is a string
      });
    } else {
      console.error('Invalid todo:', todo);
    }
    // setDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedTodo(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedTodo(null);
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="m">
      <Card className="card">
        <Typography variant="h3" gutterBottom>
          To-Do App
        </Typography>
        <ToDoForm onSubmit={handleAddTodo} />
        <ToDoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          onView={handleViewTodo}
        />
      </Card>
      <Button
        variant="contained"
        color="error"
        onClick={() => setTodos([])} // Delete all tasks
        sx={{ mt: 2, mx: 41.8 }}>
        Delete All Tasks
      </Button>
      {/* Include the dialog components */}
      <CustomizedDialogs
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        todo={selectedTodo}
      />
      <EditToDoDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        todo={selectedTodo}
        onUpdate={handleUpdateTodo}
      />
    </Container>
  );
};

export default App;
