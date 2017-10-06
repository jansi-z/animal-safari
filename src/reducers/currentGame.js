import { GET_GAME } from '../actions/games/get'
import { JOIN_GAME } from '../actions/games/join'
import { START_GAME } from '../actions/games/start'
import { GAME_UPDATED } from '../actions/games/subscribe'
import { END_GAME } from '../actions/games/end'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case JOIN_GAME :
      return payload

    case GET_GAME :
      return payload

    case START_GAME :
      return payload

    case GAME_UPDATED :
      return payload

    case END_GAME :
      return payload

    default :
      return state
  }
}
