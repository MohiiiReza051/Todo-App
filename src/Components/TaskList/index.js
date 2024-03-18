import { useEffect, useState } from "react";
import { setDataIntoLocalStorage } from '../TodoForm';
import ListItem from "./ListItem";
import '../../styles/TaskList.css';

const TaskList = ({ todos, setTodos }) =>
{
  // Initialize with null to indicate no todo is being edited
  const [editingTodoId , setEditingTodoId] = useState(null);

  useEffect(() =>
  {
    // Load todos from local storage when the component mounts
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    localStorageTodos && (setTodos([...localStorageTodos]));
  }, []);

  // Function to handles toggling the completion status of a todo when its checkbox is clicked.
  const handleChangeCheckBox = todoId =>
  {
    // Toggle the 'isComplete' property of the todo with the given ID
    const changedTodo = todos.map(t => t.id === todoId ? { ...t, isComplete: !t.isComplete } : t);

    setTodos(changedTodo);
    setDataIntoLocalStorage(changedTodo);
  }
  
  // Function to remove a todo when the delete button is clicked
  const handleClickDelete = todoId =>
  {
    // Filter out the todo with the given ID
    const filteredTodos = todos.filter(t => t.id !== todoId);

    // Adjust the IDs of todos after deleting one todo
    const todosWithAdjustedIds = filteredTodos.map(ft => ft.id > todoId ? {...ft, id: ft.id - 1} : ft)

    setTodos(todosWithAdjustedIds);
    setDataIntoLocalStorage(todosWithAdjustedIds);

    // Reason for below code: if we put the todo in editing mode and delete it in the same mode, the newly added todo will automatically be in editing mode. (because the IDs will be updated when one of them deleted)
    setEditingTodoId(null);
  }

  // Function to updates the title of a todo being edited.
  const handleEditTodo = (todoId, e) =>
  {
    // Toggle the 'title' and 'isEdited' properties of the todo with the given ID
    const modifiedTodos = todos.map(t => t.id === todoId ? {...t, title: e.target.value, isEdited: true} : t);
    setTodos(modifiedTodos);
    setDataIntoLocalStorage(modifiedTodos);
  }

    return (
        <div className="todos-container">
            <ul className="todo-list">
              {/* Render todos in the DOM */}
              {todos.map(todo =>             
                <ListItem
                  key={todo.id}
                  todo={todo}
                  editingTodoId={editingTodoId}
                  onCheckboxChange={handleChangeCheckBox}
                  onDeleteClick={handleClickDelete}
                  onEditTodo={handleEditTodo}
                  onSetEditingTodoId={setEditingTodoId}
                />
              )}
            </ul>
        </div>
    )

}

export default TaskList;