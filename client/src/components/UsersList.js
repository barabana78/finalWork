import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import getUsers from '../redux/selectors/usersSelector'

export const UsersList = ({ delItemHandler, sortHandler }) => {
  const users = useSelector(state => getUsers(state))
  if (users === undefined || users.length === 0) {
    return <h2 className="posAbsolutCenter">No users.</h2>
  }
  return (
    <div>
      <h2>Users list</h2>
      <table className="companies">
        <thead>
          <tr>
            <th></th>
            <th>
              <div className="companiesNameCell">
                <div
                  onClick={() => sortHandler(['email', 'ASC'])}
                  className="arrUp"
                >
                  &#8593;
                </div>
                Email
                <div
                  onClick={() => sortHandler(['email', 'DESC'])}
                  className="arrDown"
                >
                  &#8595;
                </div>
              </div>
            </th>
            <th>Last name</th>
            <th>First name</th>
            <th>nickname</th>
            <th>Detail</th>
            <th>Delete user</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.email}</td>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>
                <td>{item.nickname}</td>
                <td className="cellCenter">
                  <Link className="openLink" to={`/profile/${item.id}`}>
                    open
                  </Link>
                </td>
                <td
                  onClick={() => {
                    delItemHandler([item.id])
                  }}
                  className="cellDel cellCenter openLink"
                >
                  delete
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
