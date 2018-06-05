import React, {Component} from "react";
import PropTypes from "prop-types";

import DeleteButton from "./DeleteButton";
import ReportButton from "./ReportButton";
import "../../scss/moreButton.css";

class MoreButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
    }

    render() {
        return (
            <div className={`moreButton ${this.props.small ? "smallButton" : "bigButton"} ${this.state.toggled ? "on" : "off"}`}>
                <div className={"moreHeader"} onClick={() => {
                    this.setState({
                        toggled: !this.state.toggled
                    });
                }}>
                    <p>{"More"}</p>
                    <svg version="1.1" id="more" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" x="0px" y="0px"
                        viewBox="0 0 60 60">
                        <g>
                            <path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z"/>
                            <path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z"/>
                            <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"/>
                        </g>
                    </svg>
                </div>
                <div className={`moreContent ${this.state.toggled ? "on" : "off"}`}>
                    {(this.props.role === "admin" || this.props.role === "moderator" || this.props.login === this.props.media.author) &&
                        <DeleteButton 
                            media={this.props.media}
                            hideExpand={this.props.hideExpand}
                            deleteMedia={this.props.deleteMedia}
                        />
                    }
                    <ReportButton
                        media={this.props.media}
                        hideExpand={this.props.hideExpand}
                        reportMedia={this.props.reportMedia}
                    />
                </div>
            </div>
        );
    }
}

MoreButton.propTypes = {
    login: PropTypes.string,
    role: PropTypes.string,
    media: PropTypes.object.isRequired,
    hideExpand: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    reportMedia: PropTypes.func.isRequired,
    small: PropTypes.bool,
};

MoreButton.defaultProps = {
    small: true
};

export default MoreButton;
