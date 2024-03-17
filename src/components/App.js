import './App.css';
import { useState } from "react";
import TodoForm from './TodoForm/TodoForm';
import TaskList from './TaskList/TaskList';

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