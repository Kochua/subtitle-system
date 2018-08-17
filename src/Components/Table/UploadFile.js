import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Flag from "react-world-flags"

class UploadFile extends Component {
  fileUploadHandler = e => {
    const { addToUpload_a, upload, lang } = this.props
    let file = e.target.files[0]

    upload.append("strupload[" + lang.code + "]", file)
    addToUpload_a(upload)
  }

  render() {
    const { lang } = this.props
    return (
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <span style={{ marginRight: 20 }}>
          <Flag code={lang.code} height="32" />
        </span>
        <input
          style={{ width: 250 }}
          type="file"
          name="file"
          accept="application/zip"
          onChange={e => {
            this.fileUploadHandler(e)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ upload }) => {
  return { upload }
}

export default connect(
  mapStateToProps,
  actions
)(UploadFile)
