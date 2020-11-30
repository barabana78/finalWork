import { AUTH_USER, LOGIN, LOGOUT } from '../types'

const initialState = {
  token: null,
  userId: null,
  nickname: 'No authorization',
  role: ''
}
const storageName = 'userData'

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: action.payload.token,
          userId: action.payload.userId,
          nickname: action.payload.nickname,
          role: action.payload.role
        })
      )
      return { ...state, ...action.payload }
    case LOGIN:
      return { ...state, ...action.payload }
    case LOGOUT:
      localStorage.removeItem(storageName)
      return { ...state, token: null, userId: null, nickname: 'No authorization' }
    default:
      return state
  }
}
