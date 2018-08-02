import React, {Component} from "react";
import {Transition} from "react-transition-group";
import PropTypes from "prop-types";

import "../../scss/loader.css";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.transparent = false;
        this.state = {
            in: this.props.in,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.in !== this.state.in ||
            nextState.in !== this.state.in ||
            this.props.hover !== nextProps.hover;  
    }
    componentWillMount() {
        if (this.props.in) {
            this.transparent = this.props.transparent;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.in === false) {
            setTimeout(()=> {
                this.setState({
                    in: nextProps.in
                });
            }, 100);
        }
        else {
            this.transparent = nextProps.transparent;
            this.setState({
                in: nextProps.in
            });
        }
    }
    render() {
        return (
            <Transition in={this.state.in} timeout={0}>
                {(status) => (
                    <div style={{pointerEvents: this.state.in ? "all" : "none"}} className={`${this.props.hover ? "loaderHover" : ""} ${this.transparent ? "transparent" : ""} ${this.props.name ? `loader${this.props.name}` : ""} loader ${status}`} />
                )}
            </Transition>
        );
    }
}

Loader.proptypes = {
    transparent: PropTypes.bool,
    in: PropTypes.bool.isRequired,
    name: PropTypes.string,
    hover: PropTypes.bool
};

Loader.defaultProps = {
    hover: false
};

export default Loader;
