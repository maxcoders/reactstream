



  render() {
    const muteControls = this.props.showMuteControls && (
      <div>
        <i
          onClick={this.mutemic}
          style={{
            cursor: "pointer",
            padding: 5,
            fontSize: 20,
            color: (this.state.mic && "white") || "red",
          }}
          className="material-icons"
        >
          {(this.state.mic && "mic") || "mic_off"}
        </i>
        <i
          onClick={this.mutecamera}
          style={{
            cursor: "pointer",
            padding: 5,
            fontSize: 20,
            color: (this.state.camera && "white") || "red",
          }}
          className="material-icons"
        >
          {(this.state.camera && "videocam") || "videocam_off"}
        </i>
      </div>
    );

    return (
      <div style={{ ...this.props.frameStyle }}>
        {/* <audio id={this.props.id} muted={this.props.muted} ref={ (ref) => {this.video = ref }}></audio> */}
        <video
          id={this.props.id}
          muted={this.props.muted}
          autoPlay
          style={{
            visibility: (this.state.videoVisible && "visible") || "hidden",
            ...this.props.videoStyles,
          }}
          // ref={ this.props.videoRef }
          ref={(ref) => {
            this.video = ref;
          }}
        ></video>
        {muteControls}
      </div>
    );
  }
}

export default Video;
