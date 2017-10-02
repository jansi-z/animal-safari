// src/actions/games/join.js

import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const JOIN_GAME = 'JOIN_GAME'

const api = new API()

export default (gameId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('games')

    api.authenticate()
      .then(() => {
        backend.patch(gameId, { type: JOIN_GAME })
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: JOIN_GAME,
              payload: result
            })
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
