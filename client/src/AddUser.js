import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import './UserTable.css'
function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = user;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("https://user-registration-api-omega.vercel.app/user/signup", user);
        navigate('/');
    }
    return (
        <div className='user-register'>
            <form onSubmit={(e) => onSubmit(e)}>
                <h3>User Registration Form</h3>
                <label for="name">UserName:</label>
                <input type="text" 
                value={name}
                id="name"
                 name="name" 
                 required
                 onChange={(e) => onInputChange(e)}
                />

                <label for="email">Email:</label>
                <input type="email"
                 id="email" 
                 name="email"
                  required
                  value={email}
                 onChange={(e) => onInputChange(e)}
                />

                <label for="password">Password:</label>
                <input type="password"
                 id="mobile" 
                 name="password"
                
                   required
                   value={password}
                    onChange={(e) => onInputChange(e)}
                />

                <button className='edit-btn'>Submit</button>
                <Link className='delete-btn' to={'/'} >Cancel</Link>
            </form>
        </div>
    )
}

export default AddUser