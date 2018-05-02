import React, {Component} from "react";
import PropTypes from "prop-types";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log("Medias: ", this.props.medias);
        return (
            <div />
        );
    }
}

App.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.object)
};

export default App;
