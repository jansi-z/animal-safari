import API from '../../api'
import { LOAD_ERROR } from '../loading'

export const GUESS = 'GUESS'
const ADD_WIN = 'ADD_WIN'


const api = new API()

// { guesses: { player: guessData.player, guess: guessData.guess }}

export default (gameId, guessData) => {
  return (dispatch) => {

    const backend = api.service('games')

    api.authenticate()
      .then(() => {
        backend.patch(gameId, { type: GUESS, payload: guessData })
          .then((result) => {
            console.log(result)
            
            return api.service('users').patch(result.winnerId, { type: ADD_WIN })
              .then((whatever) => {
                console.log(whatever)
              })
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
