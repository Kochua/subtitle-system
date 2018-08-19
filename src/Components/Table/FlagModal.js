import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Flag from "react-world-flags"
import UploadFile from "./UploadFile"
import { ModalWrapper, FlagContainer } from "./styles"
import * as actions from "../../actions"
import findByFilename from "../../utils/findByFilename"

import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"

function Transition(props) {
  return <Slide direction="down" {...props} />
}

//props: RenderLangs
class FlagModal extends Component {
  state = {
    open: false,
    loading: false,
    isActivBtn: true
  }

  handleClickOpen = () => {
    //reset depenencies
    this.setState({ open: true })
    this.setState({ loading: false })
    this.setState({ isActivBtn: true })
    this.props.clearServerStatus_a()
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.clearUploadFile_a()
  }
  makeBtnActive = () => {
    this.setState({ isActivBtn: false })
  }

  //serer anwer rendering
  renderServerStatus(serverMsg) {
    if (serverMsg === "done") {
      return <div style={{ color: "green" }}>Files uploaded succesfully!</div>
    } else if (serverMsg === "wrong") {
      return (
        <div style={{ color: "red" }}>
          Files didnt uploaded try again or later!
        </div>
      )
    } else {
      console.error("someting went wrong")
    }
  }
  //render flags in table
  renderLangs() {
    const { langs } = this.props
    return langs.map(lang => {
      if (lang.code === "il") {
        return (
          <FlagContainer
            key={lang.code}
            exist={lang.active}
            onClick={() => this.handleClickOpen()}
          >
            <Flag code={lang.code} height="28" />
          </FlagContainer>
        )
      }
      return (
        <FlagContainer
          key={lang.code}
          exist={lang.active}
          onClick={() => this.handleClickOpen()}
        >
          <Flag code={lang.code} height="22" />
        </FlagContainer>
      )
    })
  }

  //RENDER CONTENT IN MODAL
  renderPopupContent() {
    const { langs } = this.props
    return langs.map((lang, i) => {
      if (lang.active) {
        return ""
      }
      return (
        <UploadFile makeBtnActive={this.makeBtnActive} key={i} lang={lang} />
      )
    })
  }

  //AFTER BUTTON CLICK POST
  uploadHandler = () => {
    const { upload, tables, fileName, type, uploadToServer_a } = this.props
    const [isFileExist] = upload

    if (isFileExist) {
      if (type === "serial") {
        const { userToken, imbdID, episode, season } = findByFilename(
          tables,
          fileName,
          type
        )
        upload.append("token", userToken)
        upload.append("imdb", imbdID)
        upload.append("season", season)
        upload.append("episode", episode)
      } else {
        const { userToken, imbdID } = findByFilename(tables, fileName, type)

        upload.append("token", userToken)
        upload.append("imdb", imbdID)
      }

      uploadToServer_a(upload)
      //upload ready for post
      this.setState({ loading: true })
      setTimeout(() => {
        this.handleClose()
      }, 1500)
    } else {
    }
  }

  render() {
    const { serverMsg } = this.props
    const { loading, isActivBtn } = this.state
    return (
      <Fragment>
        {this.renderLangs()}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          onClose={this.handleClose}
        >
          <ModalWrapper>
            {serverMsg ? (
              this.renderServerStatus(serverMsg)
            ) : (
              <Fragment>
                {this.renderPopupContent()}
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={() => {
                      this.uploadHandler()
                    }}
                    className="btn btn-primary"
                    style={{ marginBottom: -10 }}
                    disabled={isActivBtn}
                  >
                    {loading ? "Loading..." : "Upload"}
                  </button>
                </div>
              </Fragment>
            )}
          </ModalWrapper>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ upload, tables, serverMsg }) => {
  return { upload, tables, serverMsg }
}

export default connect(
  mapStateToProps,
  actions
)(FlagModal)
