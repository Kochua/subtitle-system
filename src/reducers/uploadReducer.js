import { ADD_TO_UPLOAD, REMOVE_UPLOAD_FILE } from "../actions/types"

export default function(state = new FormData(), action) {
  switch (action.type) {
    case ADD_TO_UPLOAD:
      return action.payload
    case REMOVE_UPLOAD_FILE:
      return action.payload

    default:
      return state
  }
}
