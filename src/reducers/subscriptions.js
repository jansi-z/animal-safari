import { SUBSCRIBED_TO_GAMES_SERVICE } from '../actions/games/subscribe'

export default (state = [], { type } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_GAMES_SERVICE :
      return state.concat('games')

    default :
      return state
  }
}
