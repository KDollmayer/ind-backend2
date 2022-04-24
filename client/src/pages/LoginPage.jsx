import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        console.log("geh")
        e.preventDefault()
        const url = "http://localhost:5000/api/users/login"
        const payload = { username, password }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token
                console.log(token)
                localStorage.setItem("token", token)
                //console.log(token);
                navigate('/user/home')
            })
    }

    return <div>
        Log in
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

            <br />
            <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <br />
            <button >Log in</button>
            <br />
            <Link to="/">Back to signup</Link>
        </form>
    </div>
}