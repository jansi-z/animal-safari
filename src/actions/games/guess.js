import API from '../../api'
import { LOAD_ERROR } from '../loading'

export const GUESS = 'GUESS'

const api = new API()

// { guesses: { player: guessData.player, guess: guessData.guess }}

export default (gameId, guessData) => {
  return (dispatch) => {

    const backend = api.service('games')

    api.authenticate()
      .then(() => {
        backend.patch(gameId, { type: GUESS, payload: guessData })
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
