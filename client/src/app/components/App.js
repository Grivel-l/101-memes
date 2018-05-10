import React, {Component} from "react";
import PropTypes from "prop-types";
import {ToastContainer, toast} from "react-toastify";

import MediaHover from "./MediaHover";
import Media from "../containers/media";
import config from "../../config/globalConfig";
import PostButton from "../containers/postbutton";
import "../scss/app.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.page = 1;
        this.keyDown = this.keyDown.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status === null && nextProps.status === "ERROR") {
            toast.error("An error occured", {
                autoClose: false,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    componentWillMount() {
        this.page = parseInt(new URLSearchParams(window.location.search).get("page") || this.page, 10);
        this.props.getMedias(this.page);
        document.addEventListener("keydown", this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    }

    keyDown({keyCode}) {
        if (keyCode === 27) {
            this.props.hideExpand();
        }
    }

    renderMedias() {
        return this.props.data.map((media, index) => {
            return (
                <Media key={`media${index}`} media={media} />
            );
        });
    }

    renderPages() {
        let i = 0;
        const result = [];
        while (i < this.props.pageNbr) {
            result.push(
                <a
                    key={`page${i}`}
                    href={`${config.clientUrl}?page=${i + 1}`}
                    className={this.page === i + 1 ? "pageNbr pageNbrSelected" : "pageNbr"}
                >{i + 1}</a>
            );
            i += 1;
        }
        return result;
    }

    render() {
        return [
            <MediaHover key={"main1"} expand={this.props.expand} hideExpand={this.props.hideExpand} />,
            <div key={"main2"} className={"wrapper"}>
                <div className={"subWrapper"}>
                    {this.renderMedias()}
                    <PostButton />
                </div>
                <div>
                    {this.renderPages()}
                </div>
                <ToastContainer autoClose={4000} />
            </div>
        ];
    }
}

App.propTypes = {
    data: PropTypes.array,
    pageNbr: PropTypes.number,
    status: PropTypes.string,
    getMedias: PropTypes.func,
    hideExpand: PropTypes.func
};

export default App;
