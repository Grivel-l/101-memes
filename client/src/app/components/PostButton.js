import React, {Component} from "react";
import PropTypes from "prop-types";

import config from "../../config/globalConfig";
import Media from "../containers/medias/media";
import TagsForm from "../containers/tagsForm";
import placeholder from "../../imgs/imgPlaceholder.svg";
import "../scss/postbutton.css";

class PostButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            tmpImg: null,
            showLoader: false,
            tags: []
        };
        this.filename = null;
        this.showImage = this.showImage.bind(this);
        this.publishMedia = this.publishMedia.bind(this);
        this.quitHover = this.quitHover.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.active !== nextState.active ||
            this.state.tmpImg !== nextState.tmpImg ||
            this.state.showLoader !== nextState.showLoader ||
            this.props.error.status !== nextProps.error.status
        );
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.error.status === "PENDING" && nextProps.error.status !== "PENDING") {
            this.setState({showLoader: false});
        }
        if (this.state.active && !nextState.active) {
            this.filename.value = "";
            this.setState({tmpImg: null});
        }
    }

    showImage(event) {
        if (event.target.files.length > 0) {        
            const file = event.target.files[0];
            if (file.size / 1024 / 1024 > config.maxFileSize) {
                this.props.showToast({
                    type: "error",
                    timeout: 3000,
                    message: "File size is too big",
                    action: null
                });
                return ;
            }
            const reader = new FileReader();
            reader.onload = data => this.setState({tmpImg: {
                file,
                data: data.target.result
            }});
            reader.readAsDataURL(file);
        }
    }

    publishMedia() {
        if (this.filename !== null && this.state.tmpImg !== null) {
            if (this.filename.value === "") {
                this.props.showToast({
                    type: "error",
                    timeout: 3000,
                    message: "Please enter a valid title to your file",
                    action: null
                });
                return ;
            }
            const form = new FormData();
            form.append("name", this.filename.value);
            form.append("media", this.state.tmpImg.file);
            this.props.publishMedia(form);
            this.filename.value = "";
            this.setState({
                showLoader: true,
                active: false,
                tmpImg: null
            });
        }
    }

    quitHover(event) {
        if (typeof event.target.className === "string") {
            if (event.target.className.includes("expandWrapper") || event.target.className === "mediaDesc") {
                this.setState({
                    active: false
                });
            }
        }
    }

    renderHover() {
        if (!this.state.showLoader) {
            const media = {
                name: "placeholder",
                path: this.state.tmpImg !== null ? this.state.tmpImg.data : placeholder,
                type: this.state.tmpImg !== null ? this.state.tmpImg.file.type : "image"
            };
            return (
                <div className={this.state.active ? "expandWrapper showExpand" : "expandWrapper"}
                    onClick={this.quitHover}>
                    <div className={"expandSubWrapper postSubWrapper"}>
                        <div className={"imgPlaceholder"}>
                            <input type={"file"} accept={".jpg, .jpeg, .png, .gif, .mp4, .webm"} onChange={this.showImage} className={"fileInput postInput"} />
                            <Media
                                media={media}
                                clickable={false}
                                className={"postMediaImg"}
                            />
                        </div>
                        <input
                            type={"text"}
                            ref={ref => this.filename = ref}
                            placeholder={"Filename"}
                            className={"nameInput postInput"}
                            maxLength={50}
                        />
                        <TagsForm />
                        <div
                            className={"postButton finalPostButton"}
                            onClick={this.publishMedia}
                        >
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div
                className={"postWrapper"}
                style={this.state.active ? {pointerEvents: "all"} : {}}
                onClick={event => {
                    if (this.state.active && event.nativeEvent.target.className === "postWrapper") {
                        this.setState({active: false});
                    }
                }}
            >
                <div
                    className={"postButton expandPostButton"}
                    onClick={() => !this.state.active && this.setState({active: true})}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
                </div>
                {this.renderHover()}
            </div>
        );
    }
}

PostButton.propTypes = {
    publishMedia: PropTypes.func,
    error: PropTypes.object,
    showToast: PropTypes.func,
    tagsArray: PropTypes.arrayOf(String).isRequired,
};

export default PostButton;
