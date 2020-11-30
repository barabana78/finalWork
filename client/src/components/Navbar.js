import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions'

export const Navbar = () => {
  const dispatch = useDispatch()
  const authParam = useSelector(state => state.auth)

  const history = useHistory()

  const logoutHandler = event => {
    event.preventDefault()
    dispatch(logout())
    history.push('/') //redirect
  }

  const isAdmin = authParam.role === 'admin' ? true : false

  if (isAdmin) {
    return (
      <nav>
        <div className="wrapper navBar">
          <div className="logo">{authParam.nickname}</div>
          <ul className="navList">
            <li className="navItem">
              <NavLink to={`/home`}>Home</NavLink>
            </li>
            <li className="navItem">
              <NavLink to={`/profile/${authParam.userId}`}>Profile</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/users">Users list</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/companies">Companies</NavLink>
            </li>
            <li className="navItem">
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  /********************************NOT ADMIN********************* */
  return (
    <nav>
      <div className="wrapper navBar">
        <div className="logo">{authParam.nickname}</div>
        <ul className="navList">
          <li className="navItem">
            <NavLink to={`/home`}>Home</NavLink>
          </li>
          <li className="navItem">
            <NavLink to={`/profile/${authParam.userId}`}>Profile</NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/create">Create</NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/companies">Companies</NavLink>
          </li>
          <li className="navItem">
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
