import React, {Component} from "react";
import PropTypes from "prop-types";

class ReportButton extends Component {
    constructor(props) {
        super(props);

        this.reportMedia = this.reportMedia.bind(this);
    }

    reportMedia() {
        if (window.confirm("Are you sure you want to report this media ?")) {
            this.props.reportMedia({mediaId: this.props.media._id});
            this.props.hideExpand();
        }
    }


    render() {
        if (this.props.hide) {
            return (null);
        }
        return (
            <button type={"button"}
                className={"moreOption reportButton"}
                onClick={this.reportMedia}>
                Report
            </button>
        );
    }
}

ReportButton.propTypes = {
    media: PropTypes.object.isRequired,
    hideExpand: PropTypes.func.isRequired,
    reportMedia: PropTypes.func.isRequired,
};
ReportButton.defaultProps = {
    hide: false
};

export default ReportButton;
