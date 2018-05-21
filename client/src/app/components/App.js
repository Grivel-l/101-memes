import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

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
    }

    componentWillMount() {
        this.page = parseInt(new URLSearchParams(window.location.search).get("page") || this.page, 10);
        this.props.getMedias(this.page);
        document.addEventListener("keydown", this.keyDown);
    }

    componentWillReceiveProps(nextProps) {
        if (this.page > nextProps.pageNbr) {
            window.location = config.clientUrl;
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
        return (
            <Fragment>
                <div className={"wrapper"}>
                    <div className={"subWrapper"}>
                        {this.renderMedias()}
                        <PostButton />
                    </div>
                    <div>
                        {this.renderPages()}
                    </div>
                    <Toaster />
                </div>
                <MediaHover expand={this.props.expand} hideExpand={this.props.hideExpand} />
            </Fragment>
        );
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
