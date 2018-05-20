import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

import Loader from "./Loader";
import MediaHover from "../containers/mediaHover";
import Media from "../containers/media";
import config from "../../config/globalConfig";
import PostButton from "../containers/postbutton";
import Toaster from "../containers/toaster";
import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.keyDown = this.keyDown.bind(this);
        this.adjustDivSize = this.adjustDivSize.bind(this);
        this.medias = React.createRef();
        this.subWrapperSize = "0px";
    }

    componentWillMount() {
        this.page = parseInt(new URLSearchParams(window.location.search).get("page") || this.page, 10);
        this.props.getMedias(this.page);
        document.addEventListener("keydown", this.keyDown);
        window.addEventListener("resize", this.adjustDivSize);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("resize", this.adjustDivSize);
    }

    componentDidUpdate() {
        this.adjustDivSize();
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

    adjustDivSize() {
        if (this.props.imgLoaded === true) {
            const first = this.medias.current.children[0];
            const last = this.medias.current.children[this.medias.current.children.length - 2];
            const style = window.getComputedStyle(first);
            const size = Number(style.height.replace(/\D/g,""));
            const marginTop = Number(style.marginTop.replace(/\D/g,""));
            document.getElementsByClassName("subWrapper")[0].style.height = `${this.getY(last) + size + marginTop * 2 - this.getY(first)}px`;
        }
    }

    getY(el) {
        let yPos = 0;
        while (el) {
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
        }
        return yPos;
    }

    render() {
        return (
            <Fragment>
                <div className={"wrapper"}>
                    <div className={"subWrapper"} style={{height: (this.subWrapperSize)}} ref={this.medias}>
                        {this.renderMedias()}
                        <PostButton />
                    </div>
                    <div>
                        {this.renderPages()}
                    </div>
                    <Toaster />
                </div>
                <MediaHover expand={this.props.expand} hideExpand={this.props.hideExpand} />
                <Loader key="MainLoader" in={!this.props.imgLoaded || this.props.post === "PENDING" || this.props.delete === "PENDING"} transparent={this.props.post === "PENDING" || this.props.delete === "PENDING"}/>
            </Fragment>
        );
    }
}

App.propTypes = {
    data: PropTypes.array,
    pageNbr: PropTypes.number,
    status: PropTypes.object,
    getMedias: PropTypes.func,
    hideExpand: PropTypes.func
};

export default App;
