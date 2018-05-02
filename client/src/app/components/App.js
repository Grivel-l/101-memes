import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderMedias() {
        return this.props.medias.map((media, index) => <img key={`media${index}`} src={media.path} alt={media.name} className={"mediaImg"} />);
    }

    render() {
        return (
            <div>
                {this.renderMedias()}
            </div>
        );
    }
}

App.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.object)
};

export default App;
