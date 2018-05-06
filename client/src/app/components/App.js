import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "./Media";
import config from "../../config/globalConfig";
import PostButton from "../containers/postbutton";
import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.page = 1;
    }

    componentWillMount() {
        this.page = parseInt(new URLSearchParams(window.location.search).get("page") || this.page, 10);
        this.props.getMedias(this.page);
    }

    renderMedias() {
        return this.props.medias.data.map((media, index) => {
            return (
                <Media key={`media${index}`} media={media} />
            );
        });
    }

    renderPages() {
        let i = 0;
        const result = [];
        while (i < this.props.medias.pageNbr) {
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
            <div className={"wrapper"}>
                <div className={"subWrapper"}>
                    {this.renderMedias()}
                    <PostButton />
                </div>
                <div>
                    {this.renderPages()}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    medias: PropTypes.object,
    getMedias: PropTypes.func
};

export default App;
