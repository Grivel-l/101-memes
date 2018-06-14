import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";
import "../../scss/app.css";
import Loader from "../Loader";

class MediaBlock extends Component {
    constructor() {
        super();

        this.loader = React.createRef();
    }
    shouldComponentUpdate(nextProps) {
        return (
            this.props.media._id !== nextProps.media._id ||
            this.props.index !== nextProps.index || 
            this.props.triggerRender !== nextProps.triggerRender
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
                    triggerRender={this.props.triggerRender}
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
