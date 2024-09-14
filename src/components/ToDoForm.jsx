import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';

const ToDoForm = ({
  onSubmit,
  initialData = { title: '', description: '' },
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, description });
      setTitle('');
      setDescription(''); // Clear input fields after submission
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ bgcolor: '#ffffff', borderRadius: '8px' }} // Input background color
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ bgcolor: '#ffffff', borderRadius: '8px' }} // Input background color
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ bgcolor: 'green', ':hover': { bgcolor: '#A40016' } }}>
        Add Task
      </Button>
    </Box>
  );
};

ToDoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default ToDoForm;
