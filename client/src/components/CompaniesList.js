import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import getCompanies from '../redux/selectors/companiesSelector'

export const CompaniesList = ({ delItemHandler, sortHandler }) => {
  const companies = useSelector(state => getCompanies(state))

  if (companies === undefined || !companies.length) {
    return <h2 className="posAbsolutCenter">You have no companies.</h2>
  }
  return (
    <div>
      <h2>Companies list</h2>
      <table className="companies">
        <thead>
          <tr>
            <th></th>

            <th>
              <div className="companiesNameCell">
                <div
                  onClick={() => sortHandler(['name', 'ASC'])}
                  className="arrUp"
                >
                  &#8593;
                </div>
                Name
                <div
                  onClick={() => sortHandler(['name', 'DESC'])}
                  className="arrDown"
                >
                  &#8595;
                </div>
              </div>
            </th>

            <th>
              <div className="companiesNameCell">
                <div
                  onClick={() => sortHandler(['serviceOfActivity', 'ASC'])}
                  className="arrUp"
                >
                  &#8593;
                </div>
                Service of activity
                <div
                  onClick={() => sortHandler(['serviceOfActivity', 'DESC'])}
                  className="arrDown"
                >
                  &#8595;
                </div>
              </div>
            </th>

            <th>
              <div className="companiesNameCell">
                <div
                  onClick={() => sortHandler(['numberOfEmployees', 'ASC'])}
                  className="arrUp"
                >
                  &#8593;
                </div>
                Number of employees
                <div
                  onClick={() => sortHandler(['numberOfEmployees', 'DESC'])}
                  className="arrDown"
                >
                  &#8595;
                </div>
              </div>
            </th>
            <th>Detail</th>
            <th>Delete company</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.serviceOfActivity}</td>
                <td>{item.numberOfEmployees}</td>
                <td className="cellCenter">
                  <Link className="openLink" to={`/detail/${item.id}`}>
                    open
                  </Link>
                </td>
                <td
                  onClick={() => {
                    delItemHandler(item.id)
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
