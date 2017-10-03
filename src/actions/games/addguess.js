// src/actions/games/patch.js

import API from '../../api'
import {
  ADD_GUESS,
  APP_DONE_LOADING,
  APP_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export default (gameId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('games')

    api.authenticate()
      .then(() => {
        backend.patch(gameId, data)
          .then((result) => {
            dispatch({ type: ADD_GUESS })
            dispatch({ type: LOAD_SUCCESS })
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
