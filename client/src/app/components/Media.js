import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class Media extends Component {
    render() {
        return (
            <div className={"mediaContainer"}>
                <div className={"subMediaContainer"}>
                    <img
                        src={this.props.media.path}
                        alt={this.props.media.name}
                        className={"mediaImg"}
                        onClick={() => this.props.expandMedia(this.props.media)}
                    />
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
