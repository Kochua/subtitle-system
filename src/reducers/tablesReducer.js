import { FECHT_TABLES } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case FECHT_TABLES:
      return action.payload
    default:
      return state
  }
}
