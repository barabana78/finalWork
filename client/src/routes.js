import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreatePage } from './pages/CreatePage'
import { CompaniesPage } from './pages/CompaniesPage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
import { UsersPage } from './pages/UsersPage'
import { UserPage } from './pages/UserPage'
import { HomePage } from './pages/HomePage'

// флаг isAuthenticated если пользователь уже зарегистрирован в системе то возвращать набор роутов
export const useRoutes = isAuthenticated => {
  /*если у пользователя есть токен(зарегистрирован) */
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/profile/:id">
          <UserPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/companies" exact>
          <CompaniesPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Redirect to="/home" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
