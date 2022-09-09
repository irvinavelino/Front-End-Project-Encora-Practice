import React, { useState ,useEffect} from 'react';
import Button from '../UI/Button';
import classes from './AddToDo.module.css'
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
const EditToDo=(props) => {
    const [modal,setModal]=useState(false);
    const [enteredName,setEnteredName]=useState(props.data.name);
    const [enteredPriority,setEnteredPriority]=useState(props.data.priority);
    const [enteredDueDate,setEnteredDueDate]=useState(props.data.dueDate);
    const [error,setError]=useState();
    const errorHandler=()=>{
        setError(null);
    }
    const showModal=(event)=>{
        setModal(true);
    }
    const closeModal=(event)=>{
        setModal(false);
    }
    const addToDoHandler=(event)=>{
        event.preventDefault();
        console.log(enteredName,enteredPriority,enteredDueDate)
        if(enteredName.trim().length===0)
        {
            closeModal();
            setError({title:"Name is required",message:"Please enter a name"})
        }else if(enteredPriority.trim().length===0)
        {
            closeModal();
            setError({title:"Priority is required",message:"Please select a priority"})
        }else if(enteredName.length>120)
        {
            closeModal();
            setError({title:"Name to long",message:"Name should be less than 120 characters"})
        }
        else
        {
            closeModal();
            fetch(`http://localhost:9090/todos/${props.data.id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name:enteredName, priority:enteredPriority,dueDate:enteredDueDate})
            })
        }
        
    }
    const nameChangeHandler=(event)=>{
        setEnteredName(event.target.value);
    }
    const priorityChangeHandler=(event)=>{
        setEnteredPriority(event.target.value);
    }
    const dueDateChangeHandler=(event)=>{
        setEnteredDueDate(event.target.value);
    }

    return( 
        <div>
            {error &&<ErrorModal title={error.title} message={error.message}onConfirm={errorHandler}></ErrorModal>}
            {modal===true && <div className={classes.backdrop} >
                 <Card className={classes.modal && classes.input}>
                 <form onSubmit={addToDoHandler}>
                 <label htmlFor='name'>Name:</label>
                 <input type="text" id='name' onChange={nameChangeHandler} value={enteredName}/>
                 <label htmlFor='priority'>Priority:</label>
                 <select id='priority' name='priority'onChange={priorityChangeHandler} value={enteredPriority}>
                     <option value='HIGH' selected>High</option>
                     <option value='MEDIUM' >Medium</option>
                     <option value='LOW' >Low</option>
                 </select>
                 <label htmlFor='dueDate'>Due Date:</label>
                 <input type="date" id='dueDate'onChange={dueDateChangeHandler} value={enteredDueDate}/>
                 <Button type='submit'onSubmit={props.onAdd}>Edit To Do</Button>
                 </form>
                 </Card>
             </div>}
             <Button onClick={showModal}>Edit</Button>
        </div>
        );
};
export default EditToDo;