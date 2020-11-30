import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from './components/Alert'
import { getToken } from './redux/selectors/tokenSelector'
import { loginAfterReset } from './redux/actions'

function App() {
  const token = useSelector(state => getToken(state))
  const showPopup = useSelector(state => state.app.alert.visible)
  const dispatch = useDispatch()

  const isAuthenticated = !!token //флаг который говорит зарегистр. ли пользователь или нет определяем по наличию токена
  const routes = useRoutes(isAuthenticated)

  const storageName = 'userData'
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      dispatch(
        loginAfterReset(data.token, data.userId, data.nickname, data.role),
      )
    }
  }, [dispatch])

  return (
    <Router>
      <div className="spacer">
        {isAuthenticated && <Navbar />}
        {showPopup && <Alert />}
        <div className="wrapper">{routes}</div>
      </div>
      <Footer />
    </Router>
  )
}

export default App
