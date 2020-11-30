import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { UserCard } from '../components/UserCard'
import { serverFetch } from '../redux/actions'
import getLoading from '../redux/selectors/loadingSelector'
import { getToken } from '../redux/selectors/tokenSelector'
import { FETCH_USER } from '../redux/types'

export const UserPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => getLoading(state))
  const token = useSelector(state => getToken(state))
  const userId = useParams().id

  const getProfile = useCallback(async () => {
    try {
      await dispatch(
        serverFetch(
          `/api/user/${userId}`,
          'GET',
          null,
          { Authorization: token },
          FETCH_USER,
        ),
      )
    } catch (e) {}
  }, [dispatch, token, userId])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  //EDIT
  const displayEditButtons = () => {
    const hide = Array.from(document.getElementsByClassName('hide'))
    const hideKey = Array.from(document.getElementsByClassName('hideKey'))
    hide.map(i => i.classList.remove('hide'))
    hideKey.map(i => i.classList.add('hide'))
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && (
        <UserCard cancelEditUser={getProfile} edit={displayEditButtons} />
      )}
    </>
  )
}
