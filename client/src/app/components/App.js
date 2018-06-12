import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

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
    }

    componentWillMount() {
        this.page = parseInt(new URLSearchParams(window.location.search).get("page") || this.page, 10);
        this.props.getMedias(this.page);
        document.addEventListener("keydown", this.keyDown);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status.redirect) {
            window.history.pushState(null, null, "/");
            this.props.getMedias(1);
        }
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
        return this.props.results.data.map((media, index) => {
            return (
                <MediaBlock key={`media${index}`} index={index} media={media} />
            );
        });
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
                            <p><span className={"capitalize"}>{`${this.props.searchRequest.type}`}</span> {`(${this.props.results.total} result${this.props.results.total !== 1 ? "s" : ""})`}</p>
                        </div>
                        <div className={"flexContainer"}>
                            {this.renderMedias()}
                        </div>
                        <Pagination />
                    </div>
                    <Footer />
                    <PostButton showToast={this.props.showToast} />
                </div>
                <MediaHover expand={this.props.expand} hideExpand={this.props.hideExpand} />
                <Toaster />
            </Fragment>
        );
    }
}

App.propTypes = {
    getMedias: PropTypes.func,
    hideExpand: PropTypes.func,
    showToast: PropTypes.func,
};

export default App;
