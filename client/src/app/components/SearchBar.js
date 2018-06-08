import React, {Component} from "react";
import "../scss/searchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.launchSearch = this.launchSearch.bind(this);
        this.updateType = this.updateType.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.state = {
            activeType: "classic"
        };
    }

    launchSearch() {
        this.props.searchMedias({"type": this.state.activeType, "terms": this.refs.searchInput.value, "limit": 24, "page": 1});
    }

    updateType(type) {
        this.setState({
            activeType: type
        });
    }

    keyPress(event) {
        if (event.keyCode === 13){
            this.launchSearch();
        }
    }

    render() {
        return (
            <div className={"searchBarWrapper"}>
                <div className={"searchBar"}>
                    <div className="searchInputWrapper">
                        <input type="text" placeholder="Search Memes" ref="searchInput" onKeyDown={this.keyPress}/>
                        <button className={"searchButton"} onClick={this.launchSearch} ref="searchButton">
                            Search
                        </button>
                    </div>
                    <div className="searchType">
                        <button 
                            className={`typeButton ${this.state.activeType === "classic" ? "selected" : ""}`}
                            onClick={() => this.updateType("classic")}>
                            Classic
                        </button>
                        <button 
                            className={`typeButton ${this.state.activeType === "popular" ? "selected" : ""}`}
                            onClick={() => this.updateType("popular")}>
                            Popular
                        </button>
                        <button 
                            className={`typeButton ${this.state.activeType === "latest" ? "selected" : ""}`}
                            onClick={() => this.updateType("latest")}>
                            Latest
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    activeType: PropTypes.string,
    searchMedias: PropTypes.func
};

export default SearchBar;
