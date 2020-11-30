import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../redux/actions'

export const Alert = () => {
  const dispatch = useDispatch()
  const text = useSelector(state => state.app.alert.text)

  const hidePopup = () => {
    dispatch(hideAlert())
  }

  useEffect(() => {
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        hidePopup()
      }
    })
  })

  return (
    <>
      <div className="popup">
        <div className="popup_inner">
          <button onClick={hidePopup} className="clousePopup">
            X
          </button>
          <p>{text}</p>
        </div>
      </div>
    </>
  )
}