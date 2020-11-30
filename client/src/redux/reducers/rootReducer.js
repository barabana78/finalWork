import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { companiesReducer } from './companiesReducer'
import { authReducer } from './authReducer'
import { usersReducer } from './usersReducer'

export const rootReducer = combineReducers({
  companies: companiesReducer,
  auth: authReducer,
  app: appReducer,
  users: usersReducer,
})
