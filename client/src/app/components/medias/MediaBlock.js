import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";
import "../../scss/app.css";

class MediaBlock extends Component {
    render() {
        return (
            <div className={"mediaContainer"}>
                <div className={"subMediaContainer"}>
                    <Media
                        media={this.props.media}
                        clickable={true}
                        className={"mediaImg"}
                    />
                </div>
            </div>
        );
    }
}

MediaBlock.propTypes = {
    medias: PropTypes.object
};

export default MediaBlock;
