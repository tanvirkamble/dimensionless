import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const ToDoItem = ({ task, onDelete, onEdit, onView }) => {
  return (
    <Card
      sx={{
        mb: 2,
      }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#fdf6f6' /* Card body background color */,
          borderRadius: '8px' /* Border radius */,
        }}>
        <Typography variant="body1" sx={{ color: '#002C54' }}>
          {task}
        </Typography>
        <Box>
          <IconButton onClick={() => onView(task)}>
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => onEdit(task)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => onDelete(task)}>
            <DeleteIcon sx={{ color: '#F96167' }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

ToDoItem.propTypes = {
  task: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default ToDoItem;
