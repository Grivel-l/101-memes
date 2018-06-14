import React, {Component} from "react";
import PropTypes from "prop-types";

import Media from "../../containers/medias/media";
import MoreButton from "../../containers/medias/moreButton";

class MediaHover extends Component {
    constructor(props) {
        super(props);

        this.quitHover = this.quitHover.bind(this);
        this.renderTags = this.renderTags.bind(this);
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
    renderTags() {
        return this.props.expand.tags.map((tag) => {
            return (
                <li key={tag} className={"tag"}>{tag}</li>
            );
        });
    }
    render() {
        const date = this.props.expand !== null ? new Date(this.props.expand.createDate).toLocaleDateString() : null;
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
                                    hideExpand={this.props.hideExpand}
                                    expanded={true}
                                />
                            </div>
                            <div className={"mediaDesc"}>
                                <div className="metas">
                                    <p className="date">{`${this.treateDate(parseInt(date.split("/")[1], 10))}/${this.treateDate(parseInt(date.split("/")[0], 10))}/${parseInt(date.split("/")[2], 10)}`}</p>
                                </div>
                                <h2>{this.props.expand.name}</h2>
                                <h3 className="author"> 
                                    <a  href={`https://profile.intra.42.fr/users/${this.props.expand.author}`}>
                                        {this.props.expand.author}
                                    </a>
                                </h3>
                                
                                {(this.props.expand.tags.length > 0) && <ul className={"tags"}>
                                    {this.renderTags()}
                                </ul>}
                                <MoreButton
                                    media={this.props.expand}
                                    hideExpand={this.props.hideExpand}
                                />
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
