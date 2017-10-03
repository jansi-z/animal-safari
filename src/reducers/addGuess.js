import { ADD_GUESS } from '../actions/games/addguess'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case ADD_GUESS :
      return state.concat(payload)

    default :
      return state
  }
}
