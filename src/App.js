import './styles/App.css';
import { useState } from "react";
import TodoForm from './Components/TodoForm/index';
import TaskList from './Components/TaskList/index';

const App = () =>
{
  const [todos, setTodos] = useState([]);

  return (
    <div className='App'>
      <h1 className='title'>Todo List</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TaskList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;