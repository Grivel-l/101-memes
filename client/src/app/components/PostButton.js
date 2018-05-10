import React, {Component} from "react";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

import Loader from "./Loader";
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
        if (this.props.status === "PENDING" && nextProps.status === null) {
            this.setState({showLoader: false});
            toast.success("Media successfully uploaded", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        else if (this.props.status === "PENDING" && nextProps.status === "ERROR") {
            this.setState({showLoader: false});
            toast.error("An error occurred, your media hasn't been uploaded", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
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
                        <img src={this.state.tmpImg === null ? placeholder : this.state.tmpImg.data} className={"mediaImg"} />
                        <input type={"file"} accept={".jpg, .jpeg, .png, .gif"} onChange={this.showImage} className={"fileInput postInput"} />
                    </div>
                    <div
                        className={"postButton finalPostButton"}
                        onClick={this.publishMedia}
                    >
                        <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M33.60522,16.05977c-0.63184,0.2207-1.3252,0.24219-1.83838,0.21094l0.12109-0.10156    c3.12403-1.90625,4.22803-3.78418,4.22412-4.8125c-0.00146-0.36133-0.14014-0.64355-0.39014-0.79297    c-0.80908-0.48926-2.19873,0.67285-2.55322,1.00098C16.1018,22.01582,14.04663,36.35567,14.02954,36.4875    c-0.00732,0.04492-0.06543,0.44922,0.21631,0.76074c0.18457,0.2041,0.45361,0.30664,0.80078,0.30664    c0.04102,0,0.08301-0.00098,0.12646-0.00391c0.48779-0.0332,0.63184-0.54883,0.8706-1.40332    c0.54053-1.93457,1.66162-5.94531,7.43213-10.28711c0.46973,0.05371,1.90283,0.0957,4.20605-0.8916    c2.90967-1.24707,2.94336-3.29199,2.94336-3.37793c0-0.11621-0.05811-0.22559-0.15527-0.29102    c-0.0957-0.06445-0.21875-0.07715-0.32764-0.0332c-0.69189,0.28418-1.32959,0.16602-1.76221,0.00586l0.51562-0.25879    c1.41455-0.30566,3.13819-1.3418,5.12451-3.08008l0.12402-0.10742c0.3457-0.29688,0.89941-1.09473,0.6123-1.5918    C34.57348,15.91524,34.18725,15.85664,33.60522,16.05977z" /><path d="M20.22241,16.56367c0.19336,0,0.3501-0.15625,0.3501-0.34961s-0.15674-0.34961-0.3501-0.34961    h-5.15918c-1.75098,0-3.17529,1.42383-3.17529,3.1748v5.18848c0,0.19336,0.15674,0.34961,0.3501,0.34961    s0.3501-0.15625,0.3501-0.34961v-5.18848c0-1.36523,1.11035-2.47559,2.4751-2.47559H20.22241z" /><path d="M34.00512,26.72481c-0.19336,0-0.3501,0.15625-0.3501,0.34961v5.16016    c0,1.36523-1.11035,2.47559-2.47559,2.47559h-5.4834c-0.19336,0-0.3501,0.15625-0.3501,0.34961s0.15674,0.34961,0.3501,0.34961    h5.4834c1.75098,0,3.17578-1.42383,3.17578-3.1748v-5.16016C34.35522,26.88106,34.19848,26.72481,34.00512,26.72481z" /></g></g></svg>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Loader showHover={true} />
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
                    <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M33.60522,16.05977c-0.63184,0.2207-1.3252,0.24219-1.83838,0.21094l0.12109-0.10156    c3.12403-1.90625,4.22803-3.78418,4.22412-4.8125c-0.00146-0.36133-0.14014-0.64355-0.39014-0.79297    c-0.80908-0.48926-2.19873,0.67285-2.55322,1.00098C16.1018,22.01582,14.04663,36.35567,14.02954,36.4875    c-0.00732,0.04492-0.06543,0.44922,0.21631,0.76074c0.18457,0.2041,0.45361,0.30664,0.80078,0.30664    c0.04102,0,0.08301-0.00098,0.12646-0.00391c0.48779-0.0332,0.63184-0.54883,0.8706-1.40332    c0.54053-1.93457,1.66162-5.94531,7.43213-10.28711c0.46973,0.05371,1.90283,0.0957,4.20605-0.8916    c2.90967-1.24707,2.94336-3.29199,2.94336-3.37793c0-0.11621-0.05811-0.22559-0.15527-0.29102    c-0.0957-0.06445-0.21875-0.07715-0.32764-0.0332c-0.69189,0.28418-1.32959,0.16602-1.76221,0.00586l0.51562-0.25879    c1.41455-0.30566,3.13819-1.3418,5.12451-3.08008l0.12402-0.10742c0.3457-0.29688,0.89941-1.09473,0.6123-1.5918    C34.57348,15.91524,34.18725,15.85664,33.60522,16.05977z" /><path d="M20.22241,16.56367c0.19336,0,0.3501-0.15625,0.3501-0.34961s-0.15674-0.34961-0.3501-0.34961    h-5.15918c-1.75098,0-3.17529,1.42383-3.17529,3.1748v5.18848c0,0.19336,0.15674,0.34961,0.3501,0.34961    s0.3501-0.15625,0.3501-0.34961v-5.18848c0-1.36523,1.11035-2.47559,2.4751-2.47559H20.22241z" /><path d="M34.00512,26.72481c-0.19336,0-0.3501,0.15625-0.3501,0.34961v5.16016    c0,1.36523-1.11035,2.47559-2.47559,2.47559h-5.4834c-0.19336,0-0.3501,0.15625-0.3501,0.34961s0.15674,0.34961,0.3501,0.34961    h5.4834c1.75098,0,3.17578-1.42383,3.17578-3.1748v-5.16016C34.35522,26.88106,34.19848,26.72481,34.00512,26.72481z" /></g></g></svg>
                </div>
                {this.renderHover()}
            </div>
        );
    }
}

PostButton.propTypes = {
    publishMedia: PropTypes.func
};

export default PostButton;