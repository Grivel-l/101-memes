import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

import Loader from "./Loader";
import MediaHover from "../containers/medias/mediaHover";
import MediaBlock from "./medias/MediaBlock";
import config from "../../config/globalConfig";
import PostButton from "../containers/postbutton";
import Toaster from "../containers/toaster";
import SearchBar from "../containers/searchBar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
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

    componentWillReceiveProps(nextProps) {
        if (this.page > nextProps.pageNbr) {
            window.location = config.clientUrl;
        }
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
                <MediaBlock key={`media${index}`} index={index} media={media} />
            );
        });
    }

    adjustDivSize() {
        if (this.props.imgLoaded === true) {
            const first = this.medias.current.children[0];
            const last = this.medias.current.children[this.medias.current.children.length - 2];
            const style = window.getComputedStyle(first);
            const size = Number(style.height.replace(/px/g,""));
            const marginTop = Number(style.marginTop.replace(/px/g,""));
            document.getElementsByClassName("flexContainer")[0].style.height = `${this.getY(last) + size + marginTop * 2 - this.getY(first)}px`;
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
                <div className="wrapper">
                    <SearchBar />
                    <div className={"subWrapper"}>
                        <div className={"flexContainer"}  style={{height: (this.subWrapperSize)}} ref={this.medias}>
                            {this.renderMedias()}
                        </div>
                        {this.props.pageNbr > 0 ? <Pagination page={this.page} pageNbr={this.props.pageNbr}/> : ""}
                    </div>
                    <PostButton />
                    <Footer />
                </div>
                <MediaHover expand={this.props.expand} hideExpand={this.props.hideExpand} />
                <Loader key="MainLoader" in={!this.props.imgLoaded || this.props.post === "PENDING" || this.props.delete === "PENDING"} transparent={this.props.post === "PENDING" || this.props.delete === "PENDING"}/>
                <Toaster />
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
