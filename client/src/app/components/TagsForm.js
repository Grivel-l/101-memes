import React, {Component} from "react";
import PropTypes from "prop-types";

class TagsForm extends Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <div className={"tagsForm"} >
                <h2>
                    Tags
                </h2>
                <button className={"addTag"}>
                    Add
                </button>

            </div>
        );
    }
}

TagsForm.propTypes = {
    tagsArray: PropTypes.arrayOf(String).isRequired,
};

export default TagsForm;
