import React, { useState, useRef } from "react";
import axios from "axios";
function AddItem({docId}) {
    const [item, setItem] = useState("");
  const [status, setStatus] = useState(true);
//   const [title, setTitle] = useState("");

  const inputRef = useRef();
  const dRef = useRef();

  const SubmitValue = (e) => {
    e.preventDefault();
    console.log(docId);
    axios.put("http://localhost:3001/user/item", {
        id:docId,
      taskDes: item,
      Status: status,
    });
  };
  return (
    <div>AddItem

        Post request
        doc_id:{docId}
        <br />
        <form onSubmit={SubmitValue}>
          

          <input
            type="text"
            name="item-entry"
            value={item}
            placeholder="Item Entry"
            ref={inputRef}
            onChange={(e) => setItem(e.target.value)}
          />

          <input
            type="checkbox"
            name="item-entry"
            value={status}
            placeholder="Status"
            ref={inputRef}
            onChange={(e) => setStatus(!(e.target.value))}
          />

          <button type="submit">Add Item</button>
        </form>
    </div>
  )
}

export default AddItem