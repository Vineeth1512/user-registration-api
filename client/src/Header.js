import React from 'react'

import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className="user-register-wrapper">
    <div>
      <h2>User Registration</h2>
    </div>
    <div>
      <Link className='link-btn' to={'/addUser'} >Add User</Link>
    </div>

  </div>
  )
}

export default Header