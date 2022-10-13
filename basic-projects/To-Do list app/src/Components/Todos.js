import React from 'react'
import {TodoItem} from "../Components/TodoItem";
export const Todos = (props) => {
  let myStyle ={
    minHeight: "70vh",
    margin: "50px auto"
  }
    return (
      <div className="container my-3" style={myStyle}>
          <h3 className="">Todos List</h3>
          {props.todos.length === 0? "No Todo's to display":
          props.todos.map((todo)=>{
            return(<TodoItem todo={todo} key={todo.index} onDelete={props.onDelete}/> 
            )
          })
        }
          
          
      </div>
    )
}
