import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CompaniesList } from '../components/CompaniesList'
import { serverFetch } from '../redux/actions'
import { FETCH_COMPANIES } from '../redux/types'
import { Loader } from '../components/Loader'
import { getRole, getToken } from '../redux/selectors/tokenSelector'
import getLoading from '../redux/selectors/loadingSelector'

export const CompaniesPage = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => getToken(state))
  const loading = useSelector(state => getLoading(state))
  const role = useSelector(state => getRole(state))
  const isAdmin = role === 'admin' ? true : false

  const fetchCompanies = useCallback(
    async (sort = ['name', 'DESC']) => {
      try {
        if (!isAdmin) {
          await dispatch(
            serverFetch(
              '/api/company/list',
              'POST',
              sort,
              { Authorization: token },
              FETCH_COMPANIES,
            ),
          )
        } else {
          await dispatch(
            serverFetch(
              '/api/company/adminList',
              'POST',
              sort,
              { Authorization: token },
              FETCH_COMPANIES,
            ),
          )
        }
      } catch (e) {}
    },
    [dispatch, token, isAdmin],
  )

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  if (loading) {
    return <Loader />
  }

  /*DELETE COMPANY*/
  const delHandler = async value => {
    const conf = window.confirm('Confirm delete')
    if (conf) {
      try {
        await dispatch(
          serverFetch(
            `/api/company/${value}`,
            'DELETE',
            null,
            { Authorization: token },
            null,
          ),
        )
      } catch (e) {}
      fetchCompanies() //обновляем таблицу компаний на экране
    }
  }

  return (
    <>
      {!loading && (
        <CompaniesList
          delItemHandler={delHandler}
          sortHandler={fetchCompanies}
        />
      )}
    </>
  )
}
