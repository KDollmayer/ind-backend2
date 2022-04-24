import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function HomePage() {

    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const url = "http://localhost:5000/api/todos";
    const token = localStorage.getItem("token");

    function fetchData() {
      //console.log(tag)
      
      const token = localStorage.getItem('token')
      const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      };
      fetch(url, {
          headers: headers,
      })
      .then((res) => res.json())
      .then((data) => setTodos(data.todo))
              //console.log(data.entries)
      
  };


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


  function handleOnSubmit(e) {
    e.preventDefault();

    const url = "http://localhost:5000/api/todos";

    const payload = { title, body };
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => fetchData(url));
  }
  function handleOnClick() {
    localStorage.clear();
    navigate("/user/login");
};

const doneTodo = async slug => {
      console.log(slug)
      
      fetch(`http://localhost:5000/api/todos/${slug}/done`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      }).then((res) => res.json())
      .then(fetchData())
}
const notDoneTodo = async slug => {
  console.log(slug)
  
  fetch(`http://localhost:5000/api/todos/${slug}/done`, {
    method: "DELETE",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  }).then((res) => res.json())
  .then(fetchData())
}

  return (
    
    <div>
      TodoCreatePage
      <button onClick={handleOnClick}>logout</button>
      <form onSubmit={handleOnSubmit}>

        <label htmlFor="title">Title:</label>
        <input 
        type="text"
        placeholder='Title' 
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          />
        <label htmlFor="body">Todo:</label>
        <textarea
          id="body"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          columns="30"
        />

        <button type="submit">Submit</button>
      </form>
      <div>
      
      ToDoPage <br />
      <Link to="/done">Todo-Done</Link> <br />
      <Link to="/notdone">Todo-DoneNot</Link>
     
      {todos &&
        todos.map((todo) => {
          return (
            <div key={todo.slug}>
                
                <hr />
              <p>Title: {todo.title}</p>
              <p>Description: {todo.body}</p>
              <p>Created at: {todo.createdAt}</p>
              
              <p>done: {todo.done ? "true" : "false"}</p>
              <button onClick={() => doneTodo(todo.slug)}>done</button>
              <button onClick={() => notDoneTodo(todo.slug)}>Undo</button>
              <hr />

            </div>
          );
        })}
    </div>
      
    </div>
  );
}

