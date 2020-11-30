import {
  FETCH_COMPANIES,
  DISPLAY_COMPANY,
  EDIT_DISPLAY_COMPANY,
} from '../types'

const initialState = {
  companies: [],
  company: {
    name: '',
    address: '',
    serviceOfActivity: '',
    numberOfEmployees: 1,
    companyType: '',
    description: '',
    createdAt: '',
    updateddAt: '',
  },
}

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES:
      return { ...state, companies: action.payload.companies }
    case DISPLAY_COMPANY:
      return { ...state, company: action.payload }
    case EDIT_DISPLAY_COMPANY:
      return { ...state, company: action.payload }
    default:
      return state
  }
}
