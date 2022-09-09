import React, { useState ,useEffect} from 'react';
import Button from '../UI/Button';
import classes from './AddToDo.module.css'
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
const deleteToDo=(props)=>{
    const deleteToDoHandler=(event)=>{
        event.preventDefault();
        fetch(`http://localhost:9090/todos/${props.data}/delete`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            })
    }
    return(
        <form onSubmit={deleteToDoHandler}>
            <Button type='submit'onSubmit={props.onAdd}>Delete</Button>
        </form>
        
    )
}

export default deleteToDo;