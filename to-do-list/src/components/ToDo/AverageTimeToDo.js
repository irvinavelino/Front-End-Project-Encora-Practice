import React, { useState ,useEffect} from 'react';
import Card from '../UI/Card';
import classes from './AverageTime.module.css'
const AverageTimeToDo=({HighToDosDone,MiddleToDosDone,LowToDosDone})=>{
    const[averageTime,setAverageTime]=useState()
    const[averageTimeLow,setAverageTimeLow]=useState()
    const[averageTimeMedium,setAverageTimeMedium]=useState()
    const[averageTimeHigh,setAverageTimeHigh]=useState('')
    
    const averageTimeHandler=()=>{
        let sum=0;
        let tim='seconds'
        const second=1000;
        const minute=second*60;
        const hour=minute*60;
        const day=hour*24;
        console.log(HighToDosDone,MiddleToDosDone,LowToDosDone)
        if(HighToDosDone.length>0)
        {
            for(let i=0;i<HighToDosDone.length;i++) 
        {
            sum+=new Date(HighToDosDone[i].doneDate).getTime()-new Date(HighToDosDone[i].creationDate).getTime()
        }
        sum/=HighToDosDone.length
        let days=Math.floor(sum/day%30)
        let hours=Math.floor(sum/hour%24)
        let minutes=Math.floor(sum/minute%60)
        let seconds=Math.floor(sum/second%60)
        if(minutes>0)tim='minutes'
        else if(hours>0)tim='hours'
        else if(days>0)tim='days'
        setAverageTimeHigh(days+':'+hours+':'+minutes+':'+seconds+' '+tim)
        }else{setAverageTimeHigh('0')}
        if(MiddleToDosDone.length>0)
        {
            sum=0
        tim='seconds'
        for(let i=0;i<MiddleToDosDone.length;i++) 
        {
            sum+=new Date(MiddleToDosDone[i].doneDate).getTime()-new Date(MiddleToDosDone[i].creationDate).getTime()
        }
        sum/=MiddleToDosDone.length
        let days=Math.floor(sum/day%30)
        let hours=Math.floor(sum/hour%24)
        let minutes=Math.floor(sum/minute%60)
        let seconds=Math.floor(sum/second%60)
        if(minutes>0)tim='minutes'
        else if(hours>0)tim='hours'
        else if(days>0)tim='days'
        setAverageTimeMedium(days+':'+hours+':'+minutes+':'+seconds+' '+tim)
        }else{setAverageTimeMedium('0')}
        if(LowToDosDone.length>0)
        {
            sum=0
        tim='seconds'
        for(let i=0;i<LowToDosDone.length;i++) 
        {
            sum+=new Date(LowToDosDone[i].doneDate).getTime()-new Date(LowToDosDone[i].creationDate).getTime()
        }
        sum/=LowToDosDone.length
        let days=Math.floor(sum/day%30)
        let hours=Math.floor(sum/hour%24)
        let minutes=Math.floor(sum/minute%60)
        let seconds=Math.floor(sum/second%60)
        if(minutes>0)tim='minutes'
        else if(hours>0)tim='hours'
        else if(days>0)tim='days'
        setAverageTimeLow(days+':'+hours+':'+minutes+':'+seconds+' '+tim)
        }else{setAverageTimeLow('0')}
        sum=0;
        tim='seconds'
        if(HighToDosDone.length>0)
        {
            for(let i=0;i<HighToDosDone.length;i++) 
            {
                sum+=new Date(HighToDosDone[i].doneDate).getTime()-new Date(HighToDosDone[i].creationDate).getTime()
            }
        }
        else sum+=0
        if(MiddleToDosDone.length>0)
        {
            for(let i=0;i<MiddleToDosDone.length;i++) 
            {
                sum+=new Date(MiddleToDosDone[i].doneDate).getTime()-new Date(MiddleToDosDone[i].creationDate).getTime()
            }
        }else sum+=0
        if(LowToDosDone.length>0)
        {
        for(let i=0;i<LowToDosDone.length;i++) 
        {
            sum+=new Date(LowToDosDone[i].doneDate).getTime()-new Date(LowToDosDone[i].creationDate).getTime()
        }
        }else sum+=0
        sum/=HighToDosDone.length+MiddleToDosDone.length+LowToDosDone.length
        let days=Math.floor(sum/day%30)
        let hours=Math.floor(sum/hour%24)
        let minutes=Math.floor(sum/minute%60)
        let seconds=Math.floor(sum/second%60)
        if(minutes>0)tim='minutes'
        else if(hours>0)tim='hours'
        else if(days>0)tim='days'
        if(seconds)
        {
        setAverageTime(days+':'+hours+':'+minutes+':'+seconds+' '+tim)
        }else setAverageTime('0')
    }
    useEffect(averageTimeHandler,[HighToDosDone,MiddleToDosDone,LowToDosDone])
    
    return(
        <Card>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td>
                        <label >Average Time to finish tasks:  </label>
                        </td>
                        <td>
                            Average Time to finish task by priority:
                        </td>
                    </tr>
                    <tr>
                    <td>
                        <label >{averageTime}</label>
                        </td>
                        <td>
                            Low:{averageTimeLow}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Medium:{averageTimeMedium}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>High:{averageTimeHigh}</td>
                    </tr>
                </tbody>
            </table>
            
        </Card>
    )
}
export default AverageTimeToDo