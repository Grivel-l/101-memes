import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "./Media";
import "../scss/app.css";

class App extends Component {
    renderMedias() {
        return this.props.medias.data.map((media, index) => {
            return (
                <Media key={`media${index}`} media={media} />
            );
        });
    }

    renderPages() {
        const result = [];
        let i = 0;
        while (i < this.props.medias.pageNbr) {
            result.push(<a>{i}</a>);
            i += 1;
        }
        return result;
    }

    render() {
        console.log("Pagenbr: ", this.props.medias.pageNbr);
        return (
            <div className={"wrapper"}>
                {this.renderMedias()}
                {this.renderPages()}
            </div>
        );
    }
}

App.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.object)
};

export default App;
