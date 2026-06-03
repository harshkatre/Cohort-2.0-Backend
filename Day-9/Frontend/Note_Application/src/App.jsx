import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const App = () => {

const [notes, setnotes] = useState([
  // {title : "note title 1" ,
  //   description : "note 1 description"
  // },

  //  {title : "note title 2" ,
  //   description : "note 2 description"
  // },


  // {title : "note title 3" ,
  //   description : "note 3 description"
  // },

  // {title : "note title 4" ,
  //   description : "note 4 description"
  // }
]);


function callApi(){
  axios.get('http://localhost:3000/notes')
  .then((res)=>{
   setnotes(res.data.note)
  })
}

useEffect(() => {
  callApi();
}, []);
  
async function createNote(title,description){
   await axios.post('http://localhost:3000/notes',{
    title,
    description
  })
  callApi();
}

async function deleteNote(noteId){
   await axios.delete('http://localhost:3000/notes/delete/'+noteId);
   callApi();
}

async function updesc(id,description){
   await axios.patch('http://localhost:3000/notes/update/'+id , {
     description
   })
   callApi();
 }


  function subHandler(e){
    e.preventDefault();
    const {title,description} = e.target.elements;
    createNote(title.value,description.value);
  }


  function upHandler(e) {
    e.preventDefault();
    const {titlename,Update} =  e.target.elements

    notes.forEach((obj,i)=>{
         const {title} = obj ;
        if(title===titlename.value){
          updesc(obj._id,Update.value);
        }
        else if(notes.length-1===i) alert("No Title Name Found");
    })

  }

  return (
   <>
   <form  action="" onSubmit={subHandler} >
    <input  name='title' required type="text"  placeholder='Title' />
    <input name='description' required type="text" placeholder='Description'/>
    <button>Subbmit</button>
   </form>

   <form  action=""  onSubmit={upHandler} >
    <input  name='titlename' type="text"  placeholder='Title Name' />
    <input name='Update' type="text" placeholder='Update description'/>
    <button>Updated</button>
   </form>

   <div className="notes">
     {notes.map((note)=>{
       return <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button  onClick={(e)=>{
        e.preventDefault();
       deleteNote(note._id)
      }}>Delete</button>
    </div>
     })}
   </div>
   </>
  )
}

export default App
