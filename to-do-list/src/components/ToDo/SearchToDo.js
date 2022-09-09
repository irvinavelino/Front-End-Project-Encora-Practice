import React, { useState } from 'react';
import Card from '../UI/Card'
import classes from './SearchToDo.module.css'
import Button from '../UI/Button';

const SearchToDo=(props) => {
    const [searchedName,setSearchedName]=useState('');
    const [searchedPriority,setSearchedPriority]=useState('');
    const [searchedDone,setSearchedDone]=useState('');
    const nameSearchHandler=(event)=>{
        setSearchedName(event.target.value);
    }
    const prioritySearchHandler=(event)=>{
        setSearchedPriority(event.target.value);
    }
    const doneSearchHandler=(event)=>{
        setSearchedDone(event.target.value);
    }
    const searchToDoHandler=(event)=>{
        event.preventDefault();
        props.data({name:searchedName,priority:searchedPriority,done:searchedDone})
        props.onSearch()
    }
    return(
        <div>
            
            <Card className={classes.input}>
                <form>
                <label htmlFor='name'>Name:</label>
            <input type="text" id='name'onChange={nameSearchHandler}value={searchedName}/>
            <label htmlFor='priority'>Priority:</label>
            <select id='priority' name='priority' onChange={prioritySearchHandler}value={searchedPriority}>
                <option value='' >All, High, Medium, Low</option>
                <option value='HIGH' >High</option>
                <option value='MEDIUM' >Medium</option>
                <option value='LOW' >Low</option>
                
            </select>
            <label htmlFor='state'>State:</label>
            <select id='state' name='state'onChange={doneSearchHandler}value={searchedDone}>
                <option value='' >All, Done, Undone</option>
                <option value='true' >Done</option>
                <option value='false' >Undone</option>
                
            </select>
            <Button type='submit'onClick={searchToDoHandler}>Search</Button>
                </form>
            </Card>
        </div>
    )
};
export default SearchToDo;