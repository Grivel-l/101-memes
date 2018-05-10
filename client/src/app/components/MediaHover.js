import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

class MediaHover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false
        };
    }

    render() {
        const date = this.props.expand !== null ? new Date(this.props.expand.createDate) : null;
        return (
            <div
                className={this.props.expand !== null ? "expandWrapper showExpand" : "expandWrapper"}
                onClick={this.props.hideExpand}
            >
                <div className={"expandSubWrapper"}>
                    {this.props.expand !== null &&
                        <div
                            className={"imgExpanded"}
                            onMouseEnter={() => this.setState({showHover: true})}
                            onMouseLeave={() => this.setState({showHover: false})}
                        >
                            <img src={this.props.expand.path} />
                            <div className={this.state.showHover ? "imgHover showImgHover" : "imgHover"}>
                                <a href={`https://profile.intra.42.fr/users/${this.props.expand.author}`}>{this.props.expand.author}</a>
                                <p>{this.props.expand.name}</p>
                                <p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

MediaHover.propTypes = {
    expand: PropTypes.object,
    hideExpand: PropTypes.func    
};

export default MediaHover;
