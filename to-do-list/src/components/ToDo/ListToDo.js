import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import AddToDo from './AddToDo';
import SearchToDo from './SearchToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';
import Pagination from '../UI/Pagination';
import classes from './ListToDo.module.css'
import AverageTimeToDo from './AverageTimeToDo';
const ListToDo=(props) => {
    const order=['HIGH', 'MEDIUM', 'LOW']
    const[currentPage,setCurrentPage]=useState(1)
    const[todosPerPage]=useState(10)
    const [toDo,setToDo]=useState([]);
    const [upDownDate,setupDownDate]=useState(null);
    const [upDownPriority,setupDownPriority]=useState(null);
    const[filter,setFilter]=useState({name:null,priority:null,done:null});
    const filteredToDo=toDo.filter(data=>{
        if(filter.name==null && filter.priority==null && filter.done==null&&upDownDate==null&&upDownPriority==null)
        {
            return toDo;
        }
        else if(filter.name!=null || filter.priority!=null || filter.done!=null)
        {
            return data.name.includes(filter.name) && data.priority.includes(filter.priority)&& data.done.toString().includes(filter.done)
        }
        else if(upDownDate)
        {
            return toDo.sort((a,b)=>new Date(a.dueDate).getTime()-new Date(b.dueDate).getTime())
        }
        else if(!upDownDate && upDownDate!=null)
        {
            return toDo.sort((a,b)=>new Date(b.dueDate).getTime()-new Date(a.dueDate).getTime())
        }
        else if(upDownPriority)
        {
            return toDo.sort((a,b)=>order.indexOf(a.priority)-order.indexOf(b.priority))
        }
        else if(!upDownPriority && upDownPriority!=null)
        {  
            return toDo.sort((a,b)=>order.indexOf(b.priority)-order.indexOf(a.priority))
        }
        return toDo;
    })
    const sortedData=(e)=>{
        filter.name=null;
        filter.priority=null;
        filter.done=null;
        if(e.target.id==="dueDate")
        {
            setupDownPriority(null)
            if(upDownDate===false || upDownDate==null)
            {
                setupDownDate(true)
            }
        else
            setupDownDate(false)
        }else if(e.target.id==="priority")
        {
            setupDownDate(null)
            if(upDownPriority===false || upDownPriority==null)
            {
                setupDownPriority(true)
            }
        else
            setupDownPriority(false)
        }
    }
        
    const dataFromChild=data=>{
        setFilter(data);
    }
    const fetchdata = ()=>{
        fetch('http://localhost:9090/todos').then((response) =>{
        return response.json();
    }).then((data)=> {setToDo(data)})
    }
    const HighToDosDone=[]
    const MiddleToDosDone=[]
    const LowToDosDone=[]
    toDo.forEach((data)=>{if(data.priority.includes('HIGH')&&data.done.toString().includes('true'))
    {
        HighToDosDone.push({creationDate:data.creationDate,doneDate:data.doneDate})
    }
    else if(data.priority.includes('MEDIUM')&&data.done.toString().includes('true'))
    {
        MiddleToDosDone.push({creationDate:data.creationDate,doneDate:data.doneDate})
    }
    else if(data.priority.includes('LOW')&&data.done.toString().includes('true'))
    {
        LowToDosDone.push({creationDate:data.creationDate,doneDate:data.doneDate})
    }})
    
    const indexOfLastToDo=currentPage*todosPerPage;
    const indexOfFirstToDo=indexOfLastToDo -todosPerPage;
    const currentToDos=filteredToDo.slice(indexOfFirstToDo,indexOfLastToDo);
    const paginate=pageNumber=>setCurrentPage(pageNumber);
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
            <table className={classes.table}>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Priority<Button id="priority"onClick={e=>sortedData(e)}>▲▼</Button></th>
                    <th>Due Date<Button id="dueDate"onClick={e=>sortedData(e)}>▲▼</Button ></th>
                    <th>Actions</th>
                </tr>
                </thead>
                {currentToDos.map((val) => {
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
            <AverageTimeToDo HighToDosDone={HighToDosDone} MiddleToDosDone={MiddleToDosDone} LowToDosDone={LowToDosDone}></AverageTimeToDo>
            <Pagination toDosPerPage={todosPerPage} totalTodos={toDo.length}paginate={paginate}currentPage={currentPage}></Pagination>
            </div>
    )
}
export default ListToDo;