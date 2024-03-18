const ListItem = ({ todo, editingTodoId, onCheckboxChange, onDeleteClick, onEditTodo, onSetEditingTodoId }) =>
{
    // Check if the todo is currently being edited
    const isEditing = editingTodoId === todo.id;
  
    return (
      <li className="list-item">
        <div className="status-and-title-con">
          {/* Checkbox to mark todo as complete */}
          <div className="checkbox-complete">
            <input
              type="checkbox"
              id={`cb-${todo.id}`}
              onChange={() => onCheckboxChange(todo.id)}
              checked={todo.isComplete}
            />
            <label htmlFor={`cb-${todo.id}`} className="check-box" />
          </div>
          <div className="todo-title">
            {/* Render todo title */}
            {isEditing ? (
              // Input field for editing todo title
              <input
                type="text"
                className="todo-title-field editing-todo"
                value={todo.title}
                onChange={(e) => onEditTodo(todo.id, e)}
                maxLength={100}
              />
            ) : (
              // Display todo title with styling based on completion status
              <p className="show-todo-title" style={{ textDecoration: todo.isComplete ? 'line-through' : 'none', color: todo.isComplete ? '#727272' : '#000000' }}>
                {todo.title}
              </p>
            )}
            {/* Display todo time and date */}
            <p className="time">
                {`${todo.time}, ${todo.date}`}
                {/* Show editing status if the todo is currently being edited, or if it has been edited */}
                {isEditing ? ', editing' : (todo.isEdited && ', edited')}
            </p>
          </div>
        </div>
        {/* Buttons to edit, save changes, and delete todo */}
        <div className="trash-edit-btns">
          {isEditing ? (
            // Button to save changes when editing
            <i className="bx bx-check" onClick={() => onSetEditingTodoId(null)}></i>
          ) : (
            // Button to enter editing mode
            <i className="bx bxs-edit-alt" onClick={() => onSetEditingTodoId(todo.id)}></i>
          )}
          {/* Button to delete todo */}
          <i className="bx bxs-trash-alt" onClick={() => onDeleteClick(todo.id)}></i>
        </div>
      </li>
    )
}

export default ListItem