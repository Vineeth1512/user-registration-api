import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom'
import './UserTable.css'
function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId:"",
    name: "",
    email: "",
    password: ""
  })
  const {  userId ,name, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    loadUsers();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    await axios.put(`http://localhost:8080/updateUsers/${id}`, user);
    alert("Updated Successfully..!");
    navigate('/');
  }
  const loadUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/users/${id}`)
      setUser(result.data);
    } catch (error) {
      console.error('Error loading users:', error.message);
    }

  }

  return (
    <div className='user-register'>
      <form onSubmit={(e) => onSubmit(e)}>
        <h3>Edit User Registration Form</h3>
        <label for="name">User Id:</label>
        <input type="text"
          value={userId}
          id="userId"
          name="userId"
          readOnly
          onChange={(e) => onInputChange(e)}
        />
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

        <label for="mobile">Password:</label>
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

export default EditUser