import axios from "axios";
import { setCookie } from "../utils/cookies";
import filtredDataForTables_u from "../utils/filtredDataForTables_u";
import { SERVER_STATUS, FECHT_TABLES } from "./types";

//LOGIN FORM
export const submitLogin_a = (
  { email, password },
  history
) => async dispatch => {
  const res = await axios.get(
    `https://subs.mqg6d2hmcj.club/upload/login.php?email=${email}&password=${password}`
  );

  if (!res.data) {
    dispatch({ type: SERVER_STATUS, payload: "error" });
  } else if (res.data.result.token) {
    setCookie("user", res.data.result.token, 7);
    setTimeout(() => {
      history.push("/");
    }, 1500);

    dispatch({ type: SERVER_STATUS, payload: "done" });
  } else {
    dispatch({ type: SERVER_STATUS, payload: "wrong" });
  }
};

export const getTablesData_a = () => async dispatch => {
  const res = await axios.get(
    "https://subs.mqg6d2hmcj.club/upload/missing.php"
  );

  const filteredData = filtredDataForTables_u(res.data);

  dispatch({ type: FECHT_TABLES, payload: filteredData });
};
