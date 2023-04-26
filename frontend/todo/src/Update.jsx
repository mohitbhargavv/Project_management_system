import React,{ useState,useRef } from 'react'
import axios from 'axios'

const Update = ({spaceId,selectedId})=>{
    const [item,setItem]=useState("");
    const [status,setStatus]=useState(false);
    const [title,setTitle]=useState("")

    const [list,setList]=useState([]);
    // const [currId,setCurrId]=useState("");
    const inputRef=useRef();
    const dRef=useRef();

   
   
    const UpdateValue=(e)=>{
        e.preventDefault();
        console.log("frontend Updatvalue selectedId",spaceId)
        axios.put('http://localhost:3001/user',{
            spaceId:spaceId,
            id:selectedId,
            taskDes:item,
            Status: status
        })
    }

       
    
        
    
    return(
        <React.Fragment>
            <div>
                Todo
            {/* {update request} */}
                <form onSubmit={UpdateValue}>
                   
                {/* <input 
                    type="text"
                    name="title-entry"
                    value={title}    
                    placeholder="Title Entry"
                    ref={inputRef}         
                    onChange={(e)=>setTitle(e.target.value)}/> */}

                    <input 
                    type="text"
                    name="item-entry"
                    value={item}    
                    placeholder="Item Entry"
                    ref={inputRef}         
                    onChange={(e)=>setItem(e.target.value)}/>
                    
                    <input 
                    type="checkbox"
                    name="item-entry"
                    value={status}    
                    placeholder="Status"
                    ref={inputRef}         
                    onChange={(e)=>setStatus(e.target.value)}/>


                    <button type="submit">Update Item</button>
                </form>
                
            </div>
        </React.Fragment>
    )
}

export default Update;