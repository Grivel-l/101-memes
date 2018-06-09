import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

import Loader from "./Loader";
import MediaHover from "./medias/MediaHover";
import MediaBlock from "./medias/MediaBlock";
import PostButton from "../containers/postbutton";
import Toaster from "../containers/toaster";
import SearchBar from "../containers/searchBar";
import Footer from "../components/Footer";
import Pagination from "../containers/pagination";
import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);
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
        if (nextProps.status.redirect) {
            window.history.pushState(null, null, "/");
            this.props.getMedias(1);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("resize", this.adjustDivSize);
    }

    componentDidUpdate() {
        setTimeout(()=> {
            this.adjustDivSize();
        }, 100);
    }

    keyDown({keyCode}) {
        if (keyCode === 27) {
            this.props.hideExpand();
        }
    }

    renderMedias() {
        return this.props.results.data.map((media, index) => {
            return (
                <MediaBlock key={`media${index}`} index={index} media={media} />
            );
        });
    }

    adjustDivSize() {
        if (this.props.status.img.loaded === true) {
            const first = this.medias.current.children[0];
            if (first === undefined) {
                return ;
            }
            const last = this.medias.current.children[this.medias.current.children.length - 1];
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
                        <div className="category">
                            <p>{`${this.props.searchRequest.type} (${this.props.results.total} result${this.props.results.total !== 1 ? "s" : ""})`}</p>
                        </div>
                        <div className={"flexContainer"}  style={{height: (this.subWrapperSize)}} ref={this.medias}>
                            {this.renderMedias()}
                        </div>
                        <Pagination />
                    </div>
                    <Footer />
                    <PostButton showToast={this.props.showToast} />
                </div>
                <MediaHover expand={this.props.expand} hideExpand={this.props.hideExpand} />
                <Loader key="MainLoader" in={!((this.props.status.searching === "ERROR" || this.props.status.get === "ERROR" || this.props.status.delete === "ERROR" || this.props.status.post === "ERROR") || (this.props.status.img.loaded && this.props.status.post !== "PENDING" && this.props.status.delete !== "PENDING" && this.props.status.get !== "PENDING" && this.props.status.searching !== "PENDING"))} transparent={this.props.status.post === "PENDING" || this.props.status.delete === "PENDING"}/>
                <Toaster />
            </Fragment>
        );
    }
}

App.propTypes = {
    results: PropTypes.object,
    pageNbr: PropTypes.number,
    getMedias: PropTypes.func,
    hideExpand: PropTypes.func,
    showToast: PropTypes.func,
    searching: PropTypes.string,
    status: PropTypes.string,
    post: PropTypes.string,
    delete: PropTypes.string
};

export default App;
