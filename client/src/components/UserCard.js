import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { serverFetch } from '../redux/actions'
import { getToken } from '../redux/selectors/tokenSelector'
import getUser from '../redux/selectors/userSelector'
import { FETCH_USER } from '../redux/types'

export const UserCard = ({ edit, cancelEditUser }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => getUser(state))
  const token = useSelector(state => getToken(state))
  const [editUser, setEditUser] = useState({ ...user })

  useEffect(() => {
    setEditUser({ ...user })
  }, [user])

  const changeHandler = event => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value })
  }

  const editUserHandler = async () => {
    try {
      await dispatch(
        serverFetch(
          `/api/user/${editUser.id}`,
          'PATCH',
          { ...editUser },
          { Authorization: token },
          FETCH_USER,
        ),
      )
    } catch (e) {}
  }

  return (
    <div>
      <h2>{user.email}</h2>
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
                <label htmlFor="emailEditUser">Email:</label>
              </td>
              <td>
                <div className="hideKey">{user.email}</div>
                <input
                  id="emailEditUser"
                  type="email"
                  name="email"
                  value={editUser.email}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="phoneEditUser">Phone number:</label>
              </td>
              <td>
                <div className="hideKey">{user.phoneNumber}</div>
                <input
                  id="phoneEditUser"
                  type="text"
                  name="phoneNumber"
                  value={editUser.phoneNumber}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="lastNameEditUser">Last name</label>
              </td>
              <td>
                <div className="hideKey">{user.lastName}</div>
                <input
                  id="lastNameEditUser"
                  type="text"
                  name="lastName"
                  value={editUser.lastName}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="firstNameEditUser">First name:</label>
              </td>
              <td>
                <div className="hideKey">{user.firstName}</div>
                <input
                  id="firstNameEditUser"
                  type="text"
                  name="firstName"
                  value={editUser.firstName}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="nicknameEditUser">Nickname:</label>
              </td>
              <td>
                <div className="hideKey">{user.nickname}</div>
                <input
                  id="nicknameEditUser"
                  type="text"
                  name="nickname"
                  value={editUser.nickname}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="positionEditUser">Position:</label>
              </td>
              <td>
                <div className="hideKey">{user.position}</div>
                <input
                  id="positionEditUser"
                  type="text"
                  name="position"
                  value={editUser.position}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
              </td>
            </tr>

            <tr className="tabRowHeight">
              <td>
                <label htmlFor="userDescriptionEditUser">Description:</label>
              </td>
              <td>
                <div className="hideKey">{user.description}</div>
                <input
                  id="userDescriptionEditUser"
                  type="text"
                  name="description"
                  value={editUser.description}
                  className="tabRowHeight inputEditCompany hide"
                  onChange={changeHandler}
                />
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
                  onClick={cancelEditUser}
                  className="buttonCompany buttonCancel hide"
                >
                  Cancel
                </button>
                <button
                  onClick={editUserHandler}
                  className="buttonCompany buttonSave hide"
                  type="button"
                >
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
