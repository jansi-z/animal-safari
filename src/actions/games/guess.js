import API from '../../api'
import { LOAD_ERROR } from '../loading'

export const GUESS = 'GUESS'

const api = new API()

export default (gameId, guessData) => {
  return (dispatch) => {

    const backend = api.service('games')

    api.authenticate()
      .then(() => {
        backend.patch(gameId, { type: GUESS, payload: guessData })
          .then((result) => {
            console.log(result)
          })
          .catch((error) => {
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
