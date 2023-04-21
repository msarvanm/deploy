import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="" /></Link>
        </div>
        <div className="links">
          <Link className='link' to='/'>
            <h6>HOME</h6>
          </Link>
          <Link className='link' to='/cheque'>
            <h6>CHEQUES</h6>
          </Link>

          <span>{currentUser? currentUser.username : <p>John</p>}</span>
          {currentUser? <span onClick={logout}>Logout</span> : <Link to="/login" className='link'>Login</Link>}
          <span className='write'>
            <Link className='link' to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
