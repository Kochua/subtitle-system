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
    success: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
    this.setState({ success: false })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

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

  renderPopupContent() {
    const { langs } = this.props
    return langs.map((lang, i) => {
      return <UploadFile key={i} lang={lang} />
    })
  }

  uploadHandler = () => {
    const { upload, tables, fileName, type } = this.props
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

    //upload ready for post
    this.setState({ success: true })
    setTimeout(() => {
      this.handleClose()
    }, 1500)
  }

  render() {
    return (
      <Fragment>
        {this.renderLangs()}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <ModalWrapper>
            {this.state.success ? (
              <div>Uploaded Sucesffuly!</div>
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
                  >
                    Upload
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

const mapStateToProps = ({ upload, tables }) => {
  return { upload, tables }
}

export default connect(
  mapStateToProps,
  actions
)(FlagModal)
