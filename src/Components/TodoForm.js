import React, {useState, useEffect, useRef} from 'react'

const TodoForm = (props) => {
    const [input,setInput] = useState(props.edit ? props.value : ''); // This line uses the useState hook to create a state variable input and a function setInput to update its value. The initial value is set based on the condition: if props.edit is true, it uses props.value, otherwise, it defaults to an empty string.
    const inputRef = useRef(null) // a 'useRef' hook is used to create a reference to an input element (inputRef). This reference will be used to focus on the input element later.

    /* The useEffect hook is used to perform side effects in the component. 
       In this case, it focuses on the input element when the component mounts. 
       The inputRef.current.focus() is used to set the focus on the input element. */
    useEffect(() => {
        inputRef.current.focus()
    })

    /* handleChange is a function that updates the input state whenever the input value changes. */
    const handleChange = e => {
        setInput(e.target.value);
    };

    /* handleSubmit is a function that prevents the default form submission behavior, 
       calls props.onSubmit with a new todo object (with a random id and the current input value), 
       and then resets the input state to an empty string. */
    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        setInput('');
    };
  return (
    /* The component conditionally renders different UI elements based on the props.edit value. 
       If props.edit is true, it renders an input field and a button for updating a todo. 
       Otherwise, it renders an input field and a button for adding a new todo. */
    <form className='todo-form' onSubmit={handleSubmit}>
        {props.edit ? (
            <> 
                <input 
                    type='text' 
                    placeholder='Update Todo' 
                    value={input} 
                    name='text' 
                    className='todo-input edit'
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button className='todo-button edit'> Update </button> 
            </>) :
            (<> 
                <input 
                    type='text' 
                    placeholder='Add A Todo' 
                    value={input} 
                    name='text' 
                    className='todo-input'
                    onChange={handleChange}
                    ref={inputRef}
                />
                <button className='todo-button'> Add Todo </button> 
            </>)
        }
       

    </form>
  )
}

export default TodoForm
