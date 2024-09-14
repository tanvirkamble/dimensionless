import { List } from '@mui/material';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, onDelete, onEdit, onView }) => (
  <List>
    {todos.map((todo) => (
      <ToDoItem
        key={todo.id} // Use unique ID
        task={todo.title}
        onDelete={() => onDelete(todo.id, todo.task, todo.title)} // Pass function to handle delete
        onEdit={() => onEdit(todo.id, todo.task, todo.title)} // Pass function to handle edit
        onView={() => onView(todo.id, todo.task, todo.title)} // Pass function to handle view
      />
    ))}
  </List>
);

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};
export default ToDoList;
