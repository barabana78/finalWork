import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  LOGIN,
  LOGOUT,
} from './types'

export function showLoader() {
  return { type: SHOW_LOADER }
}
export function hideLoader() {
  return { type: HIDE_LOADER }
}
export function showAlert(text) {
  return { type: SHOW_ALERT, payload: { visible: true, text: text } }
}
export function hideAlert() {
  return { type: HIDE_ALERT }
}
export function loginAfterReset(token, userId, nickname, role) {
  return { type: LOGIN, payload: { token, userId, nickname, role } }
}
export function logout() {
  return { type: LOGOUT }
}

export function serverFetch(
  url,
  method = 'GET',
  body = null,
  headers = {},
  type,
) {
  return async dispatch => {
    dispatch(showLoader())
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const json = await response.json()
      dispatch(hideLoader())
      dispatch({ type: type, payload: json })
      if (json.message) {
        dispatch(showAlert(json.message))
      }
    } catch (e) {
      dispatch(hideLoader())
      dispatch(showAlert(e.message))
      throw e
    }
  }
}
