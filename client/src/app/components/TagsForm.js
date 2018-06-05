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
            tagsArray: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reset === true) {
            this.setState({
                tagsArray: [],
            });
        }
    }

    componentDidUpdate() {
        this.props.updateTags(this.state.tagsArray);
    }

    handleDelete(index) {
        this.setState({
            tagsArray: update(this.state.tagsArray, {$splice: [[index, 1]]})
        });
    }

    handleUpdate(index, event) {
        this.setState({
            tagsArray: update(this.state.tagsArray, {[index]: {$set: event.target.value}})
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
                <div key={`tagInputWrapper${index}`} className={"tagInputWrapper"} >
                    <input
                        key={`tagInput${index}`}
                        type={"text"}
                        ref={ref => this.filename = ref}
                        placeholder={"Tags"}
                        className={"postInput"}
                        maxLength={50}
                        value={this.state.tagsArray[index]}
                        onChange={this.handleUpdate.bind(this, index)}
                    />
                    <button className={"delTagButton"} onClick={this.handleDelete.bind(this, index)}>
                        del
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={"tagsForm"} >
                <h2>
                    Tags
                </h2>
                {this.renderTagsInput()}
                {(this.state.tagsArray.length < config.maxTagsArraySize) && 
                    <button className={"addTag"} onClick={this.addTagsInput}>
                        Add
                    </button>
                }
            </div>
        );
    }
}

TagsForm.propTypes = {
    updateTags: PropTypes.func.isRequired,
    reset: PropTypes.bool,
};

export default TagsForm;
