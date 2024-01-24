import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
function UserTable() {

    const [user, setUser] = useState([]);
    const { id } = useParams();
    const loadUsers = async () => {
        axios.get("https://user-registration-api-omega.vercel.app/user/users").then((response) => {
            setUser(response.data);
        })

    }
   
    const deleteUsers = async (id) => {
        const isConfirmed = window.confirm("Confirm to delete?");
        if(isConfirmed){
        axios.delete(`https://user-registration-api-omega.vercel.app/user/delete/${id}`)
        .then(response => {
            console.log('Response:', response);
            loadUsers();
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
    }
    useEffect(() => {
        loadUsers();
    }, [])
    return (
        <>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>UserName</th>
                            <th>EmailId</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, i) => {
                            return <tr key={i}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link className='view-btn' to={"/viewUser"}>View</Link>
                                    <Link className='edit-btn' to={`/editUser/${user.userId}`} >Edit</Link>
                                    <button onClick={()=>deleteUsers(user.userId)} className='delete-btn'>Delete</button>
                                </td>
                            </tr>

                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserTable