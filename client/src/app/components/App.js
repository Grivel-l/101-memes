import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderMedias() {
        return this.props.medias.map((media, index) => {
            return (
                <div key={`media${index}`} className={"mediaContainer"}>
                    <img src={media.path} alt={media.name} className={"mediaImg"} />
                </div>
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
