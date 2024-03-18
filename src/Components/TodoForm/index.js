import '../../styles/TodoForm.css';


// Function to store todos array information in local storage
const setDataIntoLocalStorage = todoList =>
{
    return localStorage.setItem('todos', JSON.stringify(todoList));
}

const TaskForm = ({ todos, setTodos }) =>
{

    // Prevent the page from reloading when submitting the todo form
    const handleSubmitFrom = e =>
    {
        e.preventDefault();
        handleClickAddTask();
    }

    // Control the width of the input based on its text
    const handleInputBlur = e =>
    {
        let targetElem = e.target;
        let newWidthSize = (targetElem.value.length + 1) * 8 + 100;

        // If the value of newWidthSize is equal to 108, set the input width to its initial value
        newWidthSize === 108 && (targetElem.style.width = `150px`);

        // Limit the input width to a maximum of 700 pixels
        targetElem.value && (targetElem.style.width = `${newWidthSize > 700 ? 700 : newWidthSize}px`);
    }

    // Function to handle adding a new task
    const handleClickAddTask = () =>
    {
        let todoInput = document.querySelector('.todo-input');
        if (todoInput.value.trim()) {
            const date = new Date();

            // Get the current time like: 01:27 PM
            const time = date.toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            // Create a new todo object
            const newTodo = {
                id: todos.length + 1,
                title: todoInput.value,
                isComplete: false,
                time: time,
                date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            }

            // Update the todos state and local storage
            setTodos([...todos, newTodo]);
            setDataIntoLocalStorage([...todos, newTodo]);

            // Clear the input field and remove focus
            clearInput(todoInput);
            todoInput.blur();
        }
    }

    // Function to delete all todos
    const handleDeleteTodos = () => 
    {
        setTodos([]);
        localStorage.clear();
    }

    // Function to clear input field
    const clearInput = todoInput => todoInput.value = '';

    return (
        <div className='container'>
            <form onSubmit={handleSubmitFrom}>
                <input type="text" className='todo-input' placeholder='type todo...'
                onBlur={handleInputBlur}
                onFocus={e => e.target.style.width = '700px'}
                 />
                <div className="btn-con">
                    <input type="button" value="Add Todo" className='add-todo-btn btns' onClick={handleClickAddTask} />
                    <input type="button" value="Delete All" className='remove-todos-btn btns' onClick={handleDeleteTodos} />
                </div>
            </form>
        </div>
    )
}

export { setDataIntoLocalStorage };
export default TaskForm