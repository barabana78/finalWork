import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverFetch } from '../redux/actions'
import { AUTH_USER } from '../redux/types'
import getLoading from '../redux/selectors/loadingSelector'

export const AuthPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => getLoading(state))

  /*TABS*/
  const [tab, setTab] = useState({
    tab: 'login',
  })

  const tabHandler = event => {
    setTab({ tab: event.target.id })
  }
  useEffect(() => {
    const tabs = Array.from(document.getElementsByClassName('tab'))
    tabs.map(item => item.classList.remove('active'))
    document.getElementById(tab.tab).classList.add('active')

    const tabRegister = document.getElementById('register').className
    if (tabRegister === 'tab active') {
      const labels = Array.from(document.getElementsByClassName('hideKey'))
      labels.map(item => item.classList.remove('hide'))
      const logButton = Array.from(document.getElementsByClassName('logButton'))
      logButton.map(item => item.classList.add('hide'))
    } else {
      const labels = Array.from(document.getElementsByClassName('hideKey'))
      labels.map(item => item.classList.add('hide'))
      const logButton = Array.from(document.getElementsByClassName('logButton'))
      logButton.map(item => item.classList.remove('hide'))
    }
  })

  /*REGISTRATION*/
  const [form, setForm] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    nickname: '',
    position: '',
    description: '',
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const registerHandler = async event => {
    event.preventDefault()
    try {
      await dispatch(
        serverFetch('/api/auth/signUp', 'POST', { ...form }, {}, null),
      )
      //clear form after registration
      setForm({
        ...form,
        email: '',
        password: '',
        phoneNumber: '',
        lastName: '',
        firstName: '',
        nickname: '',
        position: '',
        description: '',
      })
    } catch (e) {}
  }

  /*LOGIN*/

  const loginHandler = async event => {
    event.preventDefault()
    try {
      await dispatch(
        serverFetch(
          '/api/auth/signIn',
          'POST',
          {
            email: form.email,
            password: form.password,
          },
          {},
          AUTH_USER,
        ),
      )
    } catch (e) {}
  }
  return (
    <div>
      <h1>Create company service.</h1>
      <div id="container">
        <header className="formHeader">
          <div onClick={tabHandler} id="login" className="tab active">
            Login
          </div>
          <div onClick={tabHandler} id="register" className="tab">
            Register
          </div>
        </header>

        <form onSubmit={registerHandler} method="post" className="regForm">
          <label className="logLabel" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Enter email"
            id="email"
            type="text"
            name="email"
            className="logInput"
            value={form.email}
            onChange={changeHandler}
          />

          <label className="logLabel" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Enter password"
            id="password"
            type="password"
            name="password"
            className="logInput"
            value={form.password}
            onChange={changeHandler}
          />

          {/*register*/}
          <label className="regLabel hide hideKey" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            placeholder="Enter phone number"
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            className="regInput hide hideKey"
            value={form.phoneNumber}
            onChange={changeHandler}
          />
          <label className="regLabel hide hideKey" htmlFor="lastName">
            Last name
          </label>
          <input
            placeholder="Enter last name"
            id="lastName"
            type="text"
            name="lastName"
            className="regInput hide hideKey"
            value={form.lastName}
            onChange={changeHandler}
          />
          <label className="regLabel hide hideKey" htmlFor="firstName">
            First Name
          </label>
          <input
            placeholder="Enter first name"
            id="firstName"
            type="text"
            name="firstName"
            className="regInput hide hideKey"
            value={form.firstName}
            onChange={changeHandler}
          />
          <label className="regLabel hide hideKey" htmlFor="nickname">
            Nickname
          </label>
          <input
            placeholder="Enter nickname"
            id="nickname"
            type="text"
            name="nickname"
            className="regInput hide hideKey"
            value={form.nickname}
            onChange={changeHandler}
          />

          <label className="regLabel hide hideKey" htmlFor="position">
            Position
          </label>
          <input
            placeholder="Enter position"
            id="position"
            type="text"
            name="position"
            className="regInput hide hideKey"
            value={form.position}
            onChange={changeHandler}
          />

          <label className="regLabel hide hideKey" htmlFor="description">
            Description
          </label>
          <textarea
            placeholder="Description your company"
            id="description"
            type="text"
            name="description"
            className="regInput hide hideKey"
            value={form.description}
            onChange={changeHandler}
          />
          <button
            type="submit"
            onClick={loginHandler}
            className="logButton"
            disabled={loading}
          >
            Sign in
          </button>
          <button
            type="submit"
            className="regButton hide hideKey"
            disabled={loading}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
