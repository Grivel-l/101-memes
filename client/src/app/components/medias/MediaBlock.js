import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";
import "../../scss/app.css";

class MediaBlock extends Component {
    render() {
        return (
            <div className={"mediaContainer"}>
                <Media
                    media={this.props.media}
                    clickable={true}
                    className={"mediaImg"}
                    index={this.props.index}
                />
            </div>
        );
    }
}

MediaBlock.propTypes = {
    medias: PropTypes.object,
    index: PropTypes.number.isRequired
};

export default MediaBlock;
