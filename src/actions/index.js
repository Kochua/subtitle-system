import axios from "axios"
import { setCookie } from "../utils/cookies"
import filtredDataForTables_u from "../utils/filtredDataForTables_u"
import getHostName_u from "../utils/getHostName_u"
import {
  SERVER_STATUS,
  FECHT_TABLES,
  ADD_TO_UPLOAD,
  REMOVE_UPLOAD_FILE
} from "./types"

//DOMAIN NAME
const domain = getHostName_u()

//test domain
// const domain = "subs.mqg6d2hmcj.club"

//LOGIN FORM
export const submitLogin_a = (
  { email, password },
  history
) => async dispatch => {
  try {
    const res = await axios.get(
      `https://${domain}/login.php?email=${email}&password=${password}`
    )
    if (res.data.result.token) {
      setCookie("user", res.data.result.token, 7)
      setTimeout(() => {
        history.push("/")
      }, 1500)

      dispatch({ type: SERVER_STATUS, payload: "done" })
    } else {
      dispatch({ type: SERVER_STATUS, payload: "wrong" })
    }
  } catch (err) {
    console.error(err)
    dispatch({ type: SERVER_STATUS, payload: "error" })
  }
}

//SERVER MSG CLEARING
export const clearServerStatus_a = () => async dispatch => {
  dispatch({ type: SERVER_STATUS, payload: undefined })
}

//GET TABLES DATA
export const getTablesData_a = () => async dispatch => {
  try {
    const res = await axios.get(`https://${domain}/missing.php`)
    const filteredData = filtredDataForTables_u(res.data)
    dispatch({ type: FECHT_TABLES, payload: filteredData })
  } catch (err) {
    console.error(err)
    dispatch({ type: FECHT_TABLES, payload: null })
  }
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
    await axios.post(`https://${domain}/upload.php`, file)
    dispatch({ type: SERVER_STATUS, payload: "done" })
  } catch (err) {
    console.error(err)
    dispatch({ type: SERVER_STATUS, payload: "wrong" })
  }
}
