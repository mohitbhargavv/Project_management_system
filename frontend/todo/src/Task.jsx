import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Update from './Update'
import AddItem from './AddItem';

function Task() {
  const {_id}= useParams();
  const [tasks,setTasks]=useState([]);
  // const [info,setInfo]=useState({})
  const [itemId,setItemId]=useState('')  

  useEffect(()=>{
    const loadData =async()=>{
      const res= await axios.post('http://localhost:3001/user/task',{id:_id})
      console.log(res.data)
      // console.log(res.data.task.map(e=>console.log(e.Status)))
        // setInfo(res.data)
        setTasks(res.data.task)
      
    }
    loadData();
  },[])
  const items = tasks.map((e)=>{
    return(
      <div key={e._id}>
        id:{e._id}
        <br />
        description:{e.taskDes } 
        <br />

        Status:{e.Status.toString() }
        <br />

        <button onClick={()=>{refData(e)}}>Reference</button>
      </div>
    )
  })
  const refData =(val)=>{
    setItemId(val._id)
    console.log("frontend task refData",val)
  }

  return (
    <div>
      {/* {info.title} */}
    {items}
    <Update spaceId={_id} selectedId={itemId}/>
    <AddItem docId={_id}/></div>
  )
}

export default Task