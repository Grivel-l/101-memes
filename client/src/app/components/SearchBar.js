import React, {Component} from "react";
import "../scss/searchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.launchSearch = this.launchSearch.bind(this);
    }

    launchSearch(type) {
        console.log(type);
    }

    render() {
        return (
            <div className={"searchBarWrapper"}>
                <div className={"searchBar"}>
                    <div className="searchInputWrapper">
                        <input type="text" placeholder="Search Memes" />
                        <button>
                            Search
                        </button>
                    </div>
                    <div className="searchType">
                        {(this.props.activeType !== "classic") && <button 
                            className={"typeButton"}
                            onClick={() => this.launchSearch("classic")}>
                            Classic
                        </button>}
                        {(this.props.activeType !== "popular") && <button 
                            className={"typeButton"}
                            onClick={() => this.launchSearch("popular")}>
                            Popular
                        </button>}
                        {(this.props.activeType !== "latest") && <button 
                            className={"typeButton"}
                            onClick={() => this.launchSearch("latest")}>
                            Latest
                        </button>}
                    </div>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    activeType: PropTypes.string
};

export default SearchBar;
