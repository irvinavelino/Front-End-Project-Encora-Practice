import React from 'react';
import classes from '../UI/Pagination.module.css'
const Pagination=({toDosPerPage, totalTodos,paginate, currentPage})=>{
    const pageNumber=[]
    for (let i=1; i<=Math.ceil(totalTodos/toDosPerPage); i++) 
    {
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul className={classes.pagination}>
                {pageNumber.map(number=>(
                    <li  key={number}>
                        <a onClick={()=>paginate(number)}href='!#'className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination