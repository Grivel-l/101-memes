import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "./Media";
import "../scss/app.css";

class App extends Component {
    componentDidMount() {
        document.body.addEventListener("scroll", event => {
            console.log('Event', event);
        });
    }

    renderMedias() {
        return this.props.medias.map((media, index) => {
            return (
                <Media key={`media${index}`} media={media} />
            );
        });
    }

    render() {
        return (
            <div className={"wrapper"}>
                {this.renderMedias()}
            </div>
        );
    }
}

App.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.object)
};

export default App;
