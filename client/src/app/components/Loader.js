import React, {Component} from "react";
import PropTypes from "prop-types";

import loaderImg from "../../imgs/loaderImg.svg";
import "../scss/loader.css";

class Loader extends Component {
    render() {
        return (
            <div className={this.props.showHover && "loaderHover"}>
                <img src={loaderImg} className={"loaderImg"} />
            </div>
        );
    }
}

Loader.propTypes = {
    showHover: PropTypes.bool
};

export default Loader;
