import { useEffect } from "react";
import { setDataIntoLocalStorage } from '../TodoForm';
import '../../styles/TaskList.css';

const TaskList = ({ todos, setTodos }) =>
{

  useEffect(() =>
  {
    // Load todos from local storage when the component mounts
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    localStorageTodos && (setTodos([...localStorageTodos]));
  }, []);

  // Change todo status using unique ID
  const handleChangeCheckBox = todoId =>
  {
    // Toggle the 'isComplete' property of the todo with the given ID
    const changedTodo = todos.map(t => t.id === todoId ? { ...t, isComplete: !t.isComplete } : t);
    setTodos(changedTodo);

    // Update local storage with the modified todos array
    setDataIntoLocalStorage(changedTodo);
  }
  
  // Delete the todo that the user clicked on by using the unique ID
  const handleClickDelete = todoId =>
  {
    // Filter out the todo with the given ID
    const filteredTodos = todos.filter(t => t.id !== todoId);
    setTodos(filteredTodos);
    setDataIntoLocalStorage(filteredTodos);
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
                      {/* Display todo title with styling based on completion status */}
                      <p style={
                        {
                          textDecoration: todo.isComplete ? 'line-through' : 'none',
                          color: todo.isComplete ? '#727272' : '#000000'
                        }
                        }>
                          {todo.title}
                      </p>
                      {/* Display todo time and date */}
                      <p className='time'>{todo.time + ', ' + todo.date}</p>
                    </div>
                  </div>
                   {/* Button to delete todo */}
                  <div className="trash-btn">
                    <i className='bx bxs-trash-alt' onClick={() => handleClickDelete(todo.id)}></i>
                  </div>
                </li>
              )}
            </ul>
        </div>
    )

}

export default TaskList;