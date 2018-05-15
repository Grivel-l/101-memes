import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class Media extends Component {
    constructor(props) {
        super(props);

        this.state = {
            muted: true
        };

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
                <Fragment>
                    <video
                        src={this.props.media.path}
                        alt={this.props.media.name}
                        loop={true}
                        autoPlay={true}
                        className={"mediaImg"}
                        onClick={() => this.props.expandMedia(this.props.media)}
                        muted={this.state.muted}
                    />
                    <div className={"soundButton"} onClick={() => this.setState({muted: !this.state.muted})}>
                        {this.state.muted
                            ? <svg enable-background="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px"><path d="M511.603,303.727l-47.694,47.726l-47.726-47.726l-47.726,47.726l-47.693-47.726L368.457,256l-47.693-47.725l47.693-47.726  l47.726,47.726l47.726-47.726l47.694,47.726L463.907,256L511.603,303.727z M256.266,511.868L128.332,383.936H32.381  c-17.678,0-31.983-14.307-31.983-31.983V160.05c0-17.679,14.307-31.983,31.983-31.983h95.951L256.266,0.133  c0,0,31.983-3.998,31.983,31.983c0,173.535,0,425.718,0,447.769C288.249,515.866,256.266,511.868,256.266,511.868z M224.282,128.066  l-63.968,63.967H64.364v127.934h95.951l63.968,63.969V128.066z"/></svg>
                            : <svg enable-background="new 0 0 512 512" height="30px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="30px"><path d="M319.967,503.497v-67.34C394.335,409.732,447.9,339.457,447.9,256c0-83.426-53.564-153.732-127.934-180.156V8.503  C430.254,36.988,511.867,136.812,511.867,256C511.867,375.188,430.254,475.043,319.967,503.497z M256,511.868L128.066,383.936  h-95.95c-17.679,0-31.983-14.307-31.983-31.983V160.05c0-17.679,14.306-31.983,31.983-31.983h95.95L256,0.133  c0,0,31.982-3.998,31.982,31.983c0,72.899,0,382.053,0,447.769C287.983,515.866,256,511.868,256,511.868z M224.017,128.066  l-63.967,63.967H64.099v127.934h95.951l63.967,63.969V128.066L224.017,128.066z M415.916,256  c0,59.532-40.854,109.132-95.949,123.404v-68.309c19.053-11.087,31.982-31.482,31.982-55.096c0-23.612-12.931-44.008-31.982-55.097  v-68.308C375.063,146.869,415.916,196.469,415.916,256z"/></svg>}
                    </div>
                </Fragment>
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
