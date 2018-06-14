import React, {Component} from "react";
import PropTypes from "prop-types";

import Upvote from "../../containers/medias/upvote";
import Media from "../../containers/medias/media";
import "../../scss/app.css";

class MediaBlock extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.media.voted !== nextProps.media.voted ||
            this.props.media._id !== nextProps.media._id ||
            this.props.index !== nextProps.index
        );
    }

    render() {
        return (
            <div className={"mediaContainer"}>
                <Media
                    media={this.props.media}
                    clickable={true}
                    className={"mediaImg"}
                    index={this.props.index}
                />
                <Upvote
                    _id={this.props.media._id}
                    votesNbr={this.props.media.votes}
                    voted={this.props.media.voted}
                />
            </div>
        );
    }
}

MediaBlock.propTypes = {
    media: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default MediaBlock;
