import { GET_GAME } from '../actions/games/get'
import { JOIN_GAME } from '../actions/games/join'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case JOIN_GAME :
    case GET_GAME :
      return payload._id

    default :
      return state
  }
}
