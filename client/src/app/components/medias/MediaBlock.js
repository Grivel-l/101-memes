import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";
import "../../scss/app.css";
import Loader from "../utilities/Loader";

class MediaBlock extends Component {
    constructor() {
        super();

        this.loader = React.createRef();
        this.notifyLoad = this.notifyLoad.bind(this);
        this.state = {
            loading: true
        };
        this.mounted = true;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.media.voted !== nextProps.media.voted ||
            this.props.media._id !== nextProps.media._id ||
            this.props.index !== nextProps.index || 
            this.props.triggerRender !== nextProps.triggerRender || 
            this.state.loading !== nextState.loading
        );
    }

    componentWillUpdate(nextProps) {
        if (nextProps.media._id !== this.props.media._id) {
            this.setState({
                loading: true
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
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

    notifyLoad() {
        if (this.mounted)
            this.setState({
                loading: false
            });
    }

    render() {
        return (
            <div className={"mediaContainer"} style={{width: `${this.getWidthLoader(this.props.media.width, this.props.media.height)}px`}}>
                <Media
                    media={this.props.media}
                    clickable={true}
                    className={"mediaImg"}
                    index={this.props.index}
                    notifyLoad={this.notifyLoad}
                />
                <Loader ref={this.loader} in={this.state.loading} />
            </div>
        );
    }
}

MediaBlock.propTypes = {
    media: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default MediaBlock;
