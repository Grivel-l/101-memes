import React, {Component} from "react";
import PropTypes from "prop-types";

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.deleteMedia = this.deleteMedia.bind(this);        
    }
    deleteMedia() {
        if (window.confirm("Are you sure you want to delete this media ?")) {
            this.props.deleteMedia({id: this.props.media._id, index: this.props.media.index});
            this.props.hideExpand();
        }
    }

    render() {
        return (
            <button type={"button"}
                className={"moreOption deleteButton warning"}
                onClick={this.deleteMedia}>
                Delete
            </button>
        );
    }
}

DeleteButton.propTypes = {
    media: PropTypes.object.isRequired,
    hideExpand: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
};

export default DeleteButton;
