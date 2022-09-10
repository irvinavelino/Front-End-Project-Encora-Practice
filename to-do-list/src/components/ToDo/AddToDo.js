import React, { useState } from 'react';
import Button from '../UI/Button';
import classes from './AddToDo.module.css'
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

const AddToDo=(props)=>{
    const [modal,setModal]=useState(false);
    const [enteredName,setEnteredName]=useState('');
    const [enteredPriority,setEnteredPriority]=useState('');
    const [enteredDueDate,setEnteredDueDate]=useState('');
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
            fetch('http://localhost:9090/todos',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name:enteredName, priority:enteredPriority,dueDate:enteredDueDate})
            })
            setEnteredName('')
            setEnteredDueDate('')
            setEnteredPriority('')
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
                <option value='' ></option>
                <option value='HIGH' >High</option>
                <option value='MEDIUM' >Medium</option>
                <option value='LOW' >Low</option>
            </select>
            <label htmlFor='dueDate'>Due Date:</label>
            <input type="date" id='dueDate'onChange={dueDateChangeHandler} value={enteredDueDate}/>
            <Button type='submit'onSubmit={props.onAdd}>Add To Do</Button>
            </form>
            </Card>
        </div>}
        <Button onClick={showModal}>+ New To Do</Button>
   </div>
   );
};

export default AddToDo;