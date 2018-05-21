import React, {Component} from "react";
import PropTypes from "prop-types";

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
        if (event.target.className.includes("expandWrapper") || event.target.className === "mediaDesc") {
            this.props.hideExpand();
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
                            <div className={"mediaWrapper"}>
                                {this.props.expand.type.split("/")[0] === "video"
                                    ? <video src={this.props.expand.path} alt={this.props.expand.name} loop={true} autoPlay={true} />
                                    : <img src={this.props.expand.path} alt={this.props.expand.name} />}
                            </div>
                            <div className={"mediaDesc"}>
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
                {this.props.expand !== null &&
                        <div className="metas">
                            <p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
                        </div>
                }
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
