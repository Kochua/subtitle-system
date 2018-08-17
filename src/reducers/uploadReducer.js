import { ADD_TO_UPLOAD } from "../actions/types";

export default function (state = new FormData(), action) {
  switch (action.type) {
    case ADD_TO_UPLOAD:
      const { paramName, file } = action.payload;
      state.append(paramName, file);
      break;
  }

  return state;
}
