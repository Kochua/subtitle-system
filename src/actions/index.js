import axios from "axios"
import { setCookie } from "../utils/cookies"
import filtredDataForTables_u from "../utils/filtredDataForTables_u"
import {
  SERVER_STATUS,
  FECHT_TABLES,
  ADD_TO_UPLOAD,
  REMOVE_UPLOAD_FILE
} from "./types"

//LOGIN FORM
export const submitLogin_a = (
  { email, password },
  history
) => async dispatch => {
  const res = await axios.get(
    `https://subs.mqg6d2hmcj.club/upload/login.php?email=${email}&password=${password}`
  )

  if (!res.data) {
    dispatch({ type: SERVER_STATUS, payload: "error" })
  } else if (res.data.result.token) {
    setCookie("user", res.data.result.token, 7)
    setTimeout(() => {
      history.push("/")
    }, 1500)

    dispatch({ type: SERVER_STATUS, payload: "done" })
  } else {
    dispatch({ type: SERVER_STATUS, payload: "wrong" })
  }
}

//SERVER MSG CLEARING
export const clearServerStatus_a = () => async dispatch => {
  dispatch({ type: SERVER_STATUS, payload: undefined })
}

//GET TABLES DATA
export const getTablesData_a = () => async dispatch => {
  const res = await axios.get("https://subs.mqg6d2hmcj.club/upload/missing.php")

  const filteredData = filtredDataForTables_u(res.data)

  dispatch({ type: FECHT_TABLES, payload: filteredData })
}

//UPLOAD FILES

export const addToUpload_a = file => dispatch => {
  dispatch({ type: ADD_TO_UPLOAD, payload: file })
}

export const clearUploadFile_a = () => dispatch => {
  const fd = new FormData()
  dispatch({ type: REMOVE_UPLOAD_FILE, payload: fd })
}

export const uploadToServer_a = file => async dispatch => {
  try {
    await axios.post("https://subs.mqg6d2hmcj.club/upload/upload.php", file)
    dispatch({ type: SERVER_STATUS, payload: "done" })
  } catch (err) {
    console.error(err)
    dispatch({ type: SERVER_STATUS, payload: "wrong" })
  }
}
