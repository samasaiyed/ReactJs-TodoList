import React, {useState} from 'react'
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import TodoForm from './TodoForm';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    /* State Management : The edit state is used to keep track of the todo item being edited. 
       It stores an object with properties id and value. If id is null, it means no item is currently being edited. */
    const [edit, setEdit] = useState({
        id: null,
        Value: ''
    });

    /* This function (submitUpdate) is called when submitting an update to a todo item. 
        It calls the updateTodo function (presumably passed as a prop) with the id of the todo being updated and the new value. 
        After the update is submitted, it resets the edit state to indicate that no item is being edited. */
    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    /* If an item is being edited (edit.id is not null), 
        the component returns an instance of the TodoForm component with the current editing information (edit object) 
        and the submitUpdate function for handling the update. */
    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos && todos.map((todo, index) => (

        /* The component renders a list of todo items (todos) using the map function. 
            Each todo item is displayed in a div element with a class name determined by whether 
            it is complete ('complete' class) or not. 
            It also includes two icons: one for deleting the todo item and one for editing. 
            Clicking the edit icon sets the edit state, triggering the conditional rendering of TodoForm 
            for updating the selected todo. */
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} 
                 onClick={() => completeTodo(todo.id)}>
                    {todo.text}
            </div>
            <div className='icons'>
                <MdDelete 
                    className='delete-icon' 
                    onClick={() => {removeTodo(todo.id)}}
                />  
                <MdEditSquare 
                    className='edit-icon' 
                    onClick={() => setEdit({id: todo.id, value: todo.text})}
                />
            </div>
        </div>
    ));
}

export default Todo
/* Overall, this component is part of a todo list application and is responsible for rendering a 
    list of todo items with options to complete, delete, and edit each item. 
    The editing functionality is delegated to a separate TodoForm component when an item is being edited. */