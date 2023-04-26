import React,{ useState,useRef } from 'react'
import axios from 'axios'
import './Retrieve.css'
import TodoList from './TodoList';
import {Link, useParams  } from 'react-router-dom'; 

const Retrieve = ()=>{

    const [list,setList]=useState([]);
    const [_id,setId]=useState("");
    const [task,setTask]=useState([]);
    const inputRef=useRef();
    const dRef=useRef();

    // function SetValue(e){
    //     e.preventdefalut();
        
    //     setItem(inputRef.current.value);
    // }
    // function SetValue(e){
    //     e.preventdefalut();

    //     setStatus(inputRef.current.value);
    // }
    const fetchData= async ()=>{
        const res =  await axios.get('http://localhost:3001/user')
        
            setList(res.data)
            console.log(res.data)     

        // setId(id=>id+1);
        
    }
   
    // const fetchTask=(value)=>{
    //     const taskLi=value.task.map((e)=>{
    //         return(e.taskDes)
    //     })
        
    //     setTask(taskLi);
    //     console.log(taskLi)
    // }

    const remove=async(value)=>{
        console.log(value._id)
        // _id: JSON.stringify(value._id)
        const val = await axios.delete('http://localhost:3001/user',{data:{id:value._id}})
        // .then((err)=>{
        //     console.log(err);
        // }
        // )
        console.log(val);
        alert(val.data);
    
    }
        const cart =list.map((value)=>{
            return  (
                <div className='fetch'  key={value._id}>

                        {value._id}  | {value.title} 
                        <Link to={`/todos/${value._id}`}>More Details...</Link> 

                        {/* <button onClick={()=>fetchTask(value)} 
                            
                             ref={inputRef}>More Details...</button> */}
                        <button onClick={()=>{remove(value)}}>remove</button>
                    
                </div>
            
            )
    
        })
        // const todosList = list.map((e)=>{
        //     return(<div>{e.toString()}</div>)
        // })
   
        
    
    return(
        <React.Fragment>
            <div>
                GET REQUEST
               
                {/* {Get Request} */}
                <button onClick={fetchData}>fetch</button>

                <br />
                    {/* <h3>itemName    itemId</h3> */}
            <ul>

                {cart}
            </ul>
            {/* <TodoList list={task}/> */}


            </div>
        </React.Fragment>
    )
}
export default Retrieve;