import React, {Component} from "react";
import config from "../../config/globalConfig";

import update from "react-addons-update";
import PropTypes from "prop-types";

class TagsForm extends Component {
    constructor(props) {
        super(props);

        this.addTagsInput = this.addTagsInput.bind(this);
        this.renderTagsInput = this.renderTagsInput.bind(this);

        this.state = {
            isInit: false,
            tagsArray: [],
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.isInit) {
            this.props.updateTags(this.state.tagsArray);
        }
    }

    handleUpdate(index, event) {
        this.setState({
            tagsArray: update(this.state.tagsArray, {[index]: {$set: event.target.value}}),
            isInit: true
        });
    }

    addTagsInput() {
        if (this.state.tagsArray.length < config.maxTagsArraySize) {
            this.setState({
                tagsArray: [...this.state.tagsArray, ""]
            });
        }
    }

    renderTagsInput() {
        return this.state.tagsArray.map((tag, index) => {
            return (
                <input
                    key={`tagInput${index}`}
                    type={"text"}
                    ref={ref => this.filename = ref}
                    placeholder={"Tags"}
                    className={"postInput"}
                    maxLength={50}
                    onChange={this.handleUpdate.bind(this, index)}
                />
            );
        });
    }

    render() {
        return (
            <div className={"tagsForm"} >
                <h2>
                    Tags
                </h2>
                {(this.state.tagsArray.length < config.maxTagsArraySize) && 
                    <button className={"addTag"} onClick={this.addTagsInput}>
                        Add
                    </button>
                }
                {this.renderTagsInput()}
            </div>
        );
    }
}

TagsForm.propTypes = {
    updateTags: PropTypes.func.isRequired
};

export default TagsForm;
