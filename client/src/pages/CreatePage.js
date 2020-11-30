import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverFetch } from '../redux/actions'
import { getToken } from '../redux/selectors/tokenSelector'

export const CreatePage = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => getToken(state))
  const [company, setCompany] = useState({
    name: '',
    address: '',
    serviceOfActivity: '',
    numberOfEmployees: 1,
    companyType: '',
    description: '',
  })

  const changeHandler = event => {
    setCompany({ ...company, [event.target.name]: event.target.value })
  }

  const companySaveHandler = async event => {
    event.preventDefault()

    try {
      await dispatch(
        serverFetch(
          '/api/company/generate',
          'POST',
          { ...company },
          { Authorization: token },
          null,
        ),
      )
    } catch (e) {}
  }
  return (
    <div>
      <h2>Create new company</h2>
      <div id="container">
        <form method="post" onSubmit={companySaveHandler} className="regForm">
          <label className="logLabel" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Enter name company"
            id="name"
            type="text"
            name="name"
            className="logInput"
            value={company.name}
            onChange={changeHandler}
          />

          <label className="logLabel" htmlFor="address">
            Address
          </label>
          <input
            placeholder="Enter address"
            id="address"
            type="text"
            name="address"
            className="logInput"
            value={company.address}
            onChange={changeHandler}
          />
          <label className="regLabel" htmlFor="serviceOfActivity">
            Service of activity
          </label>
          <input
            placeholder="Service of activity"
            id="serviceOfActivity"
            type="text"
            name="serviceOfActivity"
            className="regInput"
            value={company.serviceOfActivity}
            onChange={changeHandler}
          />
          <label className="regLabel" htmlFor="numberOfEmployees">
            Number of employees
          </label>
          <input
            placeholder="Enter number of employees"
            id="numberOfEmployees"
            type="text"
            name="numberOfEmployees"
            className="regInput"
            value={company.numberOfEmployees}
            onChange={changeHandler}
          />
          <label className="regLabel" htmlFor="companyType">
            Company type
          </label>
          <input
            placeholder="Enter company type"
            id="companyType"
            type="text"
            name="companyType"
            className="regInput"
            value={company.companyType}
            onChange={changeHandler}
          />
          <label className="regLabel" htmlFor="companyDescription">
            Description
          </label>
          <textarea
            placeholder="Description your company"
            id="companyDescription"
            type="text"
            name="description"
            className="regInput"
            value={company.description}
            onChange={changeHandler}
          />
          <button type="submit" className="logButton">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
