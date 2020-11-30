import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverFetch } from '../redux/actions'
import { getToken } from '../redux/selectors/tokenSelector'
import getCompany from '../redux/selectors/companySelector'
import { DISPLAY_COMPANY } from '../redux/types'

export const CompanyCard = ({ cancelEditCompany }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => getToken(state))
  const company = useSelector(state => getCompany(state))
  const [editCompany, setEditCompany] = useState({ ...company })

  useEffect(() => {
    setEditCompany({ ...company })
  }, [company])

  const changeHandler = event => {
    setEditCompany({ ...editCompany, [event.target.name]: event.target.value })
  }

  const edit = () => {
    const hide = Array.from(document.getElementsByClassName('hide'))
    const hideKey = Array.from(document.getElementsByClassName('hideKey'))
    hide.map(i => i.classList.remove('hide'))
    hideKey.map(i => i.classList.add('hide'))
  }
  const editCompanyHandler = async () => {
    try {
      await dispatch(
        serverFetch(
          `/api/company/${editCompany.id}`,
          'PATCH',
          { ...editCompany },
          { Authorization: token },
          DISPLAY_COMPANY,
        ),
      )
    } catch (e) {}
  }

  return (
    <div>
      <h2>{company.name}</h2>
      <div>
        <table className="company">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tabRowHeight">
              <td>
                <label htmlFor="nameEditCompany">Name:</label>
              </td>
              <td>
                <div className="hideKey">{company.name}</div>
                <input
                  id="nameEditCompany"
                  type="text"
                  name="name"
                  value={editCompany.name}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="addressEditCompany">Address:</label>
              </td>
              <td>
                <div className="hideKey">{company.address}</div>
                <input
                  id="addressEditCompany"
                  type="text"
                  name="address"
                  value={editCompany.address}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>
            <tr className="tabRowHeight">
              <td>
                <label htmlFor="serviceOfActivityEditCompany">
                  Service of activity:
                </label>
              </td>
              <td>
                <div className="hideKey">{company.serviceOfActivity}</div>
                <input
                  id="serviceOfActivityEditCompany"
                  type="text"
                  name="serviceOfActivity"
                  value={editCompany.serviceOfActivity}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="numberOfEmployeesEditCompany">
                  Number of employees:
                </label>
              </td>
              <td>
                <div className="hideKey">{company.numberOfEmployees}</div>
                <input
                  id="numberOfEmployeesEditCompany"
                  type="text"
                  name="numberOfEmployees"
                  value={editCompany.numberOfEmployees}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="companyTypeEditCompany">Company type:</label>
              </td>
              <td>
                <div className="hideKey">{company.companyType}</div>
                <input
                  id="companyTypeEditCompany"
                  type="text"
                  name="companyType"
                  value={editCompany.companyType}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="companyDescriptionEditCompany">
                  Description:
                </label>
              </td>
              <td>
                <div className="hideKey">{company.description}</div>
                <input
                  id="companyDescriptionEditCompany"
                  type="text"
                  name="description"
                  value={editCompany.description}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>Create date:</td>
              <td>
                <div>{company.createdAt}</div>
              </td>
            </tr>

            <tr className="trLast">
              <td colSpan="2" align="right" className="buttonContainer">
                <button
                  onClick={edit}
                  className="buttonCompany buttonEdit hideKey"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={cancelEditCompany}
                  className="buttonCompany buttonCancel hide"
                >
                  Cancel
                </button>
                <button
                  onClick={editCompanyHandler}
                  className="buttonCompany buttonSave hide"
                  type="button"
                >
                  Save
                </button>
              </td>
            </tr>

            {/*Object.keys(company)
            .filter(item => item !== '_id' && item !== 'owner' && item !== '__v')
            .map(item => {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td className="companyTableCenter">{company[item]}</td>
                </tr>
              )
            })*/}
          </tbody>
        </table>
      </div>
    </div>
  )
}
