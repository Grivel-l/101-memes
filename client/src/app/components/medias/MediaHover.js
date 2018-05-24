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
            this.props.deleteMedia({id: this.props.expand._id, index: this.props.expand.index});
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

    treateDate(nbr) {
        if (nbr < 10) {
            return (`0${nbr}`);
        }
        return (nbr);
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
                            <div className={"mediaWrapper"}>
                                <Media
                                    muted={false}
                                    clickable={false}
                                    media={this.props.expand}
                                    className={"expandedMediaImg"}
                                />
                            </div>
                            <div className={"mediaDesc"}>
                                <div className="metas">
                                    <p className="date">{`${this.treateDate(date.getDay())}/${this.treateDate(date.getMonth())}/${date.getFullYear()}`}</p>
                                </div>
                                <h2>{this.props.expand.name}</h2>
                                <h3 className="author"> 
                                    <a  href={`https://profile.intra.42.fr/users/${this.props.expand.author}`}>
                                        {this.props.expand.author}
                                    </a>
                                </h3>
                                {(this.props.login === this.props.expand.author || this.admins.indexOf(this.props.login) !== -1) &&
                                <button type={"button"}
                                    className={"deleteButton"}
                                    onClick={this.deleteMedia}
                                >
                                    Delete
                                </button>
                                }
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
