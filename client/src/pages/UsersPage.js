import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { UsersList } from '../components/UsersList'
import { serverFetch } from '../redux/actions'
import getLoading from '../redux/selectors/loadingSelector'
import { getToken } from '../redux/selectors/tokenSelector'
import { FETCH_USERS } from '../redux/types'

export const UsersPage = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => getToken(state))
  const loading = useSelector(state => getLoading(state))

  const fetchUsers = useCallback(
    async (sort = ['email', 'ASC']) => {
      try {
        await dispatch(
          serverFetch(
            '/api/user/list',
            'POST',
            sort,
            { Authorization: token },
            FETCH_USERS,
          ),
        )
      } catch (e) {}
    },
    [dispatch, token],
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  /*DELETE USER*/
  const delHandler = async value => {
    const conf = window.confirm('Confirm delete')
    if (conf) {
      try {
        await dispatch(
          serverFetch(
            `/api/user/${value}`,
            'DELETE',
            null,
            { Authorization: token },
            null,
          ),
        )
      } catch (e) {}
      fetchUsers() //обновляем таблицу users на экране
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && (
        <UsersList delItemHandler={delHandler} sortHandler={fetchUsers} />
      )}
    </>
  )
}
