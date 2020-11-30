import { FETCH_USER, FETCH_USERS } from '../types'

const initialState = {
  users: [],
  user: {
    email: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    nickname: '',
    position: '',
    description: '',
   },
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload.users }
    case FETCH_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
