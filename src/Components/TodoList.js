import React, {useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

const TodoList = () => {
    /* The todos state is an array that holds the list of todo items. The setTodos function is used to update this state. */
    const [todos,setTodos] = useState([])

    /* This function is responsible for adding a new todo to the list. 
        It checks if the todo text is not empty or contains only whitespace before adding it to the todos state. */
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    }

    /* This function is used to update an existing todo item. 
    It checks if the new value is not empty or contains only whitespace before updating the todos state. 
    It uses the map function to replace the old todo with the updated one. */
    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    /* This function is responsible for removing a todo item from the list. 
        It creates a new array (removeArr) by filtering out the todo with the specified id, 
        and then updates the todos state with the new array. */
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    };
   
    /* This function toggles the completion status (isComplete) of a todo item. 
        It creates a new array of todos by mapping over the existing ones and updating the isComplete 
        property of the todo with the specified id. */
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updatedTodos);
    }

    return (
    /* The component renders a heading, a TodoForm component for adding new todos, 
        and a Todo component for displaying and managing the list of todos. 
        It passes down the necessary functions (completeTodo, removeTodo, and updateTodo) 
        and the current list of todos (todos) to the Todo component. */
        <div>
            <h1> What's the plan for today </h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
/* In summary, this component is the main container for managing a todo list, 
providing functions to add, update, and remove todos, as well as rendering the list and a form for adding new todos. */