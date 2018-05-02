import React, {Component} from "react";
import PropTypes from "prop-types";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log("Medias: ", this.props);
        return (
            <div />
        );
    }
}

App.propTypes = {};

export default App;
