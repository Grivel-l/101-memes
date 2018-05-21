import React, {Component} from "react";
import PropTypes from "prop-types";

import placeholder from "../../imgs/imgPlaceholder.svg";
import "../scss/postbutton.css";

class PostButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            tmpImg: null,
            showLoader: false
        };
        this.filename = null;
        this.showImage = this.showImage.bind(this);
        this.publishMedia = this.publishMedia.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.error.status === "PENDING" && nextProps.error.status !== "PENDING") {
            this.setState({showLoader: false});
        }
    }

    showImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = data => this.setState({tmpImg: {
            file,
            data: data.target.result
        }});
        reader.readAsDataURL(file);
    }

    publishMedia() {
        if (this.filename !== null && this.state.tmpImg !== null) {
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

    renderHover() {
        if (!this.state.showLoader) {
            return (
                <div className={this.state.active ? "postHover postHoverActive" : "postHover"}>
                    <input
                        type={"text"}
                        ref={ref => this.filename = ref}
                        placeholder={"Filename"}
                        className={"nameInput postInput"}
                    />
                    <div className={"mediaImg imgPlaceholder"}>
                        {this.state.tmpImg !== null && this.state.tmpImg.file.type.split("/")[0] === "video"
                            ? <video src={this.state.tmpImg.data} className={"mediaImg"} alt={"placeholder"} autoPlay={true} loop={true} />
                            : <img src={this.state.tmpImg === null ? placeholder : this.state.tmpImg.data} className={"mediaImg"} alt={"placeholder"} />}
                        <input type={"file"} accept={".jpg, .jpeg, .png, .gif, .mp4"} onChange={this.showImage} className={"fileInput postInput"} />
                    </div>
                    <div
                        className={"postButton finalPostButton"}
                        onClick={this.publishMedia}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
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
                    className={"postButton"}
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
    error: PropTypes.object
};

export default PostButton;
