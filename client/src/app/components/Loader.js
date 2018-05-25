import React, {Component} from "react";
import {Transition} from "react-transition-group";
import PropTypes from "prop-types";

import "../scss/loader.css";

class Loader extends Component {

    constructor(props) {
        super(props);
        this.transparent = false;
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.in !== this.props.in;
    }
    componentWillMount() {
        if (this.props.in) {
            this.transparent = this.props.transparent;
        }
    }
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.in) {
            this.transparent = nextProps.transparent;
        }
    }
    render() {
        return (
            <Transition in={this.props.in} timeout={0}>
                {(status) => (
                    <div className={`${this.transparent ? "transparent" : ""} ${this.props.name ? `loader${this.props.name}` : ""} loader ${status}`} />
                )}
            </Transition>
        );
    }
}

Loader.proptypes = {
    transparent: PropTypes.bool,
    in: PropTypes.bool.isRequired,
    name: PropTypes.string
};

export default Loader;
