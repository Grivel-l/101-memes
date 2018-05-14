import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class Media extends Component {
    renderType() {
        if (this.props.media.type.split("/")[0] === "video") {
            return (
                <video
                    src={this.props.media.path}
                    alt={this.props.media.name}
                    loop={true}
                    autoPlay={true}
                    className={"mediaImg"}
                    onClick={() => this.props.expandMedia(this.props.media)}
                />
            );
        } else {
            return (
                <img
                    src={this.props.media.path}
                    alt={this.props.media.name}
                    className={"mediaImg"}
                    onClick={() => this.props.expandMedia(this.props.media)}
                />
            );
        }
    }
    render() {
        return (
            <div className={"mediaContainer"}>
                <div className={"subMediaContainer"}>
                    {this.renderType()}
                </div>
            </div>
        );
    }
}

Media.propTypes = {
    medias: PropTypes.object,
    expandMedia: PropTypes.func
};

export default Media;
