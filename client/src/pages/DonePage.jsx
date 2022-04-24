import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function DonePage() {
    const [todos, setTodos] = useState([]);
    const url = "http://localhost:5000/api/todos/done";
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        })
          .then((res) => res.json())
          .then((data) => setTodos(data.todo));
      }, []);
  return (
    <div>
      
      ToDoPage <br />
      <Link to="/done">Todo-Done</Link> <br />
      <Link to="/notdone">Todo-DoneNot</Link> <br />
      <Link to="/user/home">All todos</Link>
     
      {todos &&
        todos.map((todo, index) => {
          return (
            <div key={index}>
                
                <hr />
              <p>Title: {todo.title}</p>
              <p>Description: {todo.body}</p>
              <p>Created at: {todo.createdAt}</p>
              
              <p>done: {todo.done ? "true" : "false"}</p>
              <button >done</button>
              <hr />

            </div>
          );
        })}
    </div>
  )
}
