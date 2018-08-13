import axios from "axios";
import { FETCH_USER } from "./types";

export const submitLogin_a = (
  { email, password },
  history
) => async dispatch => {
  const res = await axios.get(
    `https://subs.mqg6d2hmcj.club/upload/login.php?email=${email}&password=${password}`
  );

  if (!res.data) {
    //something went wrong
  } else if (res.data.result.token) {
    history.push("/dashboard");
    dispatch({ type: FETCH_USER, payload: res.data.token });
  } else {
    //wrong password
  }
};
