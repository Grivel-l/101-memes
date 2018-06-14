import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import MoreButton from "../../containers/medias/moreButton";

class Media extends Component {
    constructor(props) {
        super(props);

        this.state = {
            muted: props.muted,
            hasAudio: false
        };

        this.mounted = true;
        this.ref = false;
        this.expand = this.expand.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.media === undefined ||
            this.state.muted !== nextState.muted ||
            this.props.gotSound !== nextProps.gotSound ||
            this.state.hasAudio !== nextState.hasAudio ||
            this.props.media._id !== nextProps.media._id ||
            this.props.media.path !== nextProps.media.path ||
            this.props.clickable !== nextProps.clickable || 
            this.props.className !== nextProps.className ||
            this.state.mediaLoaded !== nextState.mediaLoaded);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.muted && nextProps.gotSound !== this.props.media._id) {
            if (this.mounted) {
                this.setState({muted: !this.state.muted});
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    expand() {
        if (this.props.clickable) {
            this.props.toggleSound(null);
            this.props.expandMedia({...this.props.media, index: this.props.index});
        }
    }

    toggleSound() {
        this.setState({muted: !this.state.muted}, () => this.props.toggleSound(this.props.media._id));
    }

    render() {
        if (this.props.media === undefined) {
            return null;
        }
        const split = this.props.media.type.split("/");
        return (
            <Fragment>
                {(split[0] === "video" || (this.props.className !== "postMediaImg" && split[1] === "gif")) ?
                    <video
                        src={this.props.className !== "postMediaImg" ? null : this.props.media.path}
                        alt={this.props.media.name}
                        loop={true}
                        autoPlay={true}
                        onClick={this.expand}
                        muted={this.state.muted}
                        className={this.props.className || null}
                        ref={ref => {
                            if (!this.ref) {
                                this.ref = true;
                                ref.addEventListener("canplaythrough", () => this.setState({mediaLoaded: true}));
                                ref.addEventListener("loadeddata", () => {
                                    if (this.props.notifyLoad)
                                        this.props.notifyLoad();
                                    if (ref.mozHasAudio || ref.webkitAudioDecodedByteCount > 0) {
                                        if (this.mounted) {
                                            this.setState({hasAudio: true});
                                        }
                                    }
                                });
                            }
                        }}
                    >
                        {this.props.className !== "postMediaImg" && ["webm", "mp4"].map((ext, index) => {
                            const split = this.props.media.path.split(".");
                            return (
                                <source
                                    src={`${this.props.media.path.substring(0, this.props.media.path.length - split[split.length - 1].length)}${ext}`}
                                    type={`video/${ext}`}
                                    key={`${this.props.media._id}${index}`}
                                />
                            );
                        })}
                    </video> :
                    <img
                        src={this.props.media.path}
                        alt={this.props.media.name}
                        onClick={this.expand}
                        onLoad={() => {
                            if (this.props.notifyLoad)
                                this.props.notifyLoad();
                            this.setState({mediaLoaded: true});
                        }}
                        className={this.props.className || null}
                    />}
                {this.props.expanded && 
                    <MoreButton
                        media={this.props.media}
                        hideExpand={this.props.hideExpand}
                        small={false}
                    />}
                {this.state.hasAudio  &&
                    <div className={"soundButton"} onClick={this.toggleSound}>
                        {this.state.muted
                            ? <svg enableBackground="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px"><path d="M511.603,303.727l-47.694,47.726l-47.726-47.726l-47.726,47.726l-47.693-47.726L368.457,256l-47.693-47.725l47.693-47.726  l47.726,47.726l47.726-47.726l47.694,47.726L463.907,256L511.603,303.727z M256.266,511.868L128.332,383.936H32.381  c-17.678,0-31.983-14.307-31.983-31.983V160.05c0-17.679,14.307-31.983,31.983-31.983h95.951L256.266,0.133  c0,0,31.983-3.998,31.983,31.983c0,173.535,0,425.718,0,447.769C288.249,515.866,256.266,511.868,256.266,511.868z M224.282,128.066  l-63.968,63.967H64.364v127.934h95.951l63.968,63.969V128.066z"/></svg>
                            : <svg enableBackground="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px"><path d="M319.967,503.497v-67.34C394.335,409.732,447.9,339.457,447.9,256c0-83.426-53.564-153.732-127.934-180.156V8.503  C430.254,36.988,511.867,136.812,511.867,256C511.867,375.188,430.254,475.043,319.967,503.497z M256,511.868L128.066,383.936  h-95.95c-17.679,0-31.983-14.307-31.983-31.983V160.05c0-17.679,14.306-31.983,31.983-31.983h95.95L256,0.133  c0,0,31.982-3.998,31.982,31.983c0,72.899,0,382.053,0,447.769C287.983,515.866,256,511.868,256,511.868z M224.017,128.066  l-63.967,63.967H64.099v127.934h95.951l63.967,63.969V128.066L224.017,128.066z M415.916,256  c0,59.532-40.854,109.132-95.949,123.404v-68.309c19.053-11.087,31.982-31.482,31.982-55.096c0-23.612-12.931-44.008-31.982-55.097  v-68.308C375.063,146.869,415.916,196.469,415.916,256z"/></svg>}
                    </div>}
            </Fragment>
        );
    }
}

Media.defaultProps = {
    muted: true,
    expanded: false,
    postMedia: false,
};

Media.propTypes = {
    hideExpand: PropTypes.func,
    expanded: PropTypes.bool,
    media: PropTypes.object.isRequired,
    expandMedia: PropTypes.func.isRequired,
    clickable: PropTypes.bool,
    className: PropTypes.string,
    toggleSound: PropTypes.func.isRequired,
    gotSound: PropTypes.string,
    muted: PropTypes.bool,
    postMedia: PropTypes.bool,
};

export default Media;
