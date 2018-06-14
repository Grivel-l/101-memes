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

    getWidthLoader(width, height) {
        
        let max;
        if (window.innerWidth > 1920) {
            max = 300;
        } else if (window.innerWidth > 1200) {
            max = 250;
        } else if (window.innerWidth > 768) {
            max = 200;
        } else if (window.innerWidth > 576) {
            max = 150;
        } else {
            max = 125;
        }
        const res = height > max ? width - ((height - max) / height) * width : width;
        return res > (window.innerWidth/100) * 80 ? Math.ceil((window.innerWidth / 100) * 80) : Math.ceil(res);
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
                <Loader ref={this.loader} width={`${this.getWidthLoader(this.props.media.width, this.props.media.height)}px`} in={true} />
            </div>
        );
    }
}

MediaBlock.propTypes = {
    media: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default MediaBlock;
