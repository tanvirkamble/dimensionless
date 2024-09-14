import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function EditToDoDialog({ open, onClose, todo, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize form with todo details if todo is provided
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
    }
  }, [todo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo) {
      onUpdate({ ...todo, title, description });
    }
    onClose();
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="edit-todo-dialog-title"
      open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="edit-todo-dialog-title">
        Edit To-Do
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form id="edit-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="edit-form" autoFocus>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

EditToDoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired, // Expect id as string
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default EditToDoDialog;
