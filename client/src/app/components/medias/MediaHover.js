import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";

class MediaHover extends Component {
    constructor(props) {
        super(props);

        this.admins = ["legrivel", "jmarquet"];
        this.quitHover = this.quitHover.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    deleteMedia() {
        if (window.confirm("Are you sure you want to delete this media ?")) {
            this.props.deleteMedia(this.props.expand._id);
            this.props.hideExpand();
        }
    }

    quitHover(event) {
        if (typeof event.target.className === "string") {
            if (event.target.className.includes("expandWrapper") || event.target.className === "mediaDesc") {
                this.props.hideExpand();
            }
        }
    }

    render() {
        const date = this.props.expand !== null ? new Date(this.props.expand.createDate) : null;
        return (
            <div
                className={this.props.expand !== null ? "expandWrapper showExpand" : "expandWrapper"}
                onClick={this.quitHover}
            >
                <div className={"expandSubWrapper"}>
                    {this.props.expand !== null &&
                        <div className={"mediaExpanded"}>
                            <h2>{this.props.expand.name}</h2>
                            <div className={"mediaWrapper"}>
                                <Media
                                    clickable={false}
                                    media={this.props.expand}
                                />
                            </div>
                            <div className={"mediaDesc"}>
                                {(this.props.login === this.props.expand.author || this.admins.indexOf(this.props.login) !== -1) &&
                                <input
                                    type={"button"}
                                    value={"Delete"}
                                    className={"deleteButton"}
                                    onClick={this.deleteMedia}
                                />}
                                <div className={"alignCenter"}>
                                    <a href={`https://profile.intra.42.fr/users/${this.props.expand.author}`}>{this.props.expand.author}</a>
                                    <p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
                                </div>
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
    hideExpand: PropTypes.func,
    login: PropTypes.string
};

export default MediaHover;
