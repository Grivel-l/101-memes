import React, {Component} from "react";
import config from "../../config/globalConfig";

import update from "immutability-helper";
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

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.reset !== this.props ||
            nextState.tagsArray !== this.state.tagsArray);
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
                        placeholder={"Enter a tag"}
                        className={"tagInput"}
                        maxLength={config.maxTagsStringSize}
                        value={this.state.tagsArray[index]}
                        onChange={this.handleUpdate.bind(this, index)}
                    />
                    <button className={"delTagButton"} onClick={this.handleDelete.bind(this, index)}>
                        <svg version="1.1" id="delIcon" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 348.333 348.334"><g><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/></g></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
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
