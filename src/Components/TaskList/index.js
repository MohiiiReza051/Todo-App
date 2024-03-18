import { useEffect, useState } from "react";
import { setDataIntoLocalStorage } from '../TodoForm';
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
                <li className="list-item" key={todo.id}>
                  <div className='status-and-title-con'>
                    <div className="checkbox-complete">
                      {/* Checkbox to mark todo as complete */}
                      <input type="checkbox" id={'cb-' + todo.id} onChange={() => handleChangeCheckBox(todo.id)} checked={todo.isComplete && true} />
                      <label htmlFor={'cb-' + todo.id} className="check-box" />
                    </div>
                    <div className='todo-title'>

                      {
                        editingTodoId === todo.id ?
                         <input
                         type="text" 
                         className="todo-title-field editing-todo"
                         value={todo.title}
                         onChange={e => handleEditTodo(todo.id, e)}
                         maxLength={100}
                        />:
                        <p className="show-todo-title"
                        // Display todo title with styling based on completion status
                        style={
                        {
                          textDecoration: todo.isComplete ? 'line-through' : 'none',
                          color: todo.isComplete ? '#727272' : '#000000'
                        }
                        }>
                          {todo.title}
                        </p>
                      }

                      {/* Display todo time and date */}
                      <p className='time'>{todo.time + ', ' + todo.date}{editingTodoId === todo.id ? ', editing' : (todo.isEdited && ', edited')}</p>
                    </div>
                  </div>
                   {/* Button to delete todo */}
                  <div className="trash-edit-btns">

                   {/* Buttons to edit todo and set that changes */}
                    {
                    editingTodoId === todo.id ?
                    <i className='bx bx-check' onClick={() => setEditingTodoId(null)}></i> :
                    <i className='bx bxs-edit-alt' onClick={() => setEditingTodoId(todo.id)}></i>
                    }

                    <i className='bx bxs-trash-alt' onClick={() => handleClickDelete(todo.id)}></i>
                  </div>
                </li>
              )}
            </ul>
        </div>
    )

}

export default TaskList;