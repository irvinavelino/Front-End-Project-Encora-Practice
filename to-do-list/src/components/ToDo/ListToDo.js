import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import AddToDo from './AddToDo';
import SearchToDo from './SearchToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';
const ListToDo=(props) => {
    const [toDo,setToDo]=useState([]);
    const [state,setState]=useState({});
    const[filter,setFilter]=useState({name:null,priority:null,done:null});
    const filteredToDo=toDo.filter(data=>{
        if(filter.name==null && filter.priority==null && filter.done==null)
        {
            return toDo;
        }
        return data.name.includes(filter.name) && data.priority.includes(filter.priority)&& data.done.toString().includes(filter.done)
    })
    const dataFromChild=data=>{
        setFilter(data);
    }
    const fetchdata = ()=>{
        fetch('http://localhost:9090/todos').then((response) =>{
        return response.json();
    }).then((data)=> {setToDo(data)})
    }
    const changeState = (e) =>{
        if(e.target.checked)
        {
            console.log('change to done')
            fetch(`http://localhost:9090/todos/${e.target.id}/done`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            })
            fetchdata()
        }
        else
        {
            console.log('change to undone')
            fetch(`http://localhost:9090/todos/${e.target.id}/undone`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            })
        }
    }
    useEffect(fetchdata);
    return(
            <div>
            <SearchToDo data={dataFromChild}onSearch={fetchdata}></SearchToDo>
            <AddToDo onAdd={fetchdata}></AddToDo>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                {filteredToDo.map((val) => {
                    return(
            <tbody key={val.id}>
            <tr>
                <td><input type="checkbox"id={val.id} onChange={e=>changeState(e)}defaultChecked={val.done?true:false} ></input></td>
                <td>{val.name}</td>
                <td>{val.priority}</td>
                <td>{val.dueDate}</td>
                <td><EditToDo data={{name:val.name,id:val.id,priority:val.priority,dueDate:val.dueDate}}onAdd={fetchdata}/><DeleteToDo data={val.id}></DeleteToDo></td>
            </tr>
            </tbody>
                    )})}
            </table>
            </div>
    )
}
export default ListToDo;