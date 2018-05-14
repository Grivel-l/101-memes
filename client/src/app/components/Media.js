import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class Media extends Component {
    constructor(props) {
        super(props);

        this.admins = ["legrivel", "jmarquet"];
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    deleteMedia() {
        if (window.confirm("Are you sure you want to delete this media ?")) {
            this.props.deleteMedia(this.props.media._id);
        }
    }

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
                    {(this.props.login === this.props.media.author || this.admins.indexOf(this.props.login) !== -1) &&
                    <svg onClick={this.deleteMedia} className={"deleteIcon"} enableBackground="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px"><path d="M20.377,16.519l6.567-6.566c0.962-0.963,0.962-2.539,0-3.502l-0.876-0.875c-0.963-0.964-2.539-0.964-3.501,0  L16,12.142L9.433,5.575c-0.962-0.963-2.538-0.963-3.501,0L5.056,6.45c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.538,0,3.501l0.876,0.876c0.963,0.963,2.539,0.963,3.501,0L16,20.896l6.567,6.566  c0.962,0.963,2.538,0.963,3.501,0l0.876-0.876c0.962-0.963,0.962-2.538,0-3.501L20.377,16.519z" fill="#515151"/></svg>}
                </div>
            </div>
        );
    }
}

Media.propTypes = {
    medias: PropTypes.object,
    expandMedia: PropTypes.func,
    login: PropTypes.string,
    deleteMedia: PropTypes.func
};

export default Media;
