import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CompanyCard } from '../components/CompanyCard'
import { Loader } from '../components/Loader'
import { serverFetch } from '../redux/actions'
import { DISPLAY_COMPANY } from '../redux/types'
import { getToken } from '../redux/selectors/tokenSelector'
import getLoading from '../redux/selectors/loadingSelector'

export const DetailPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => getLoading(state))
  const token = useSelector(state => getToken(state))
  const companyId = useParams().id //id берем из роутов т.к. сами его так назвали

  const getDetailCompany = useCallback(async () => {
    try {
      await dispatch(
        serverFetch(
          `/api/company/${companyId}`,
          'GET',
          null,
          { Authorization: token },
          DISPLAY_COMPANY,
        ),
      )
    } catch (e) {}
  }, [token, companyId, dispatch])
  //когда готов компонент
  useEffect(() => {
    getDetailCompany()
  }, [getDetailCompany])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && <CompanyCard cancelEditCompany={getDetailCompany} />}</>
}
