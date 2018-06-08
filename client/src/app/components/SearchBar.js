import React, {Component} from "react";
import "../scss/searchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {  
    render() {
        return (
            <div className={"searchBarWrapper"}>
                <div className={"searchBar"}>
                    <div className="searchInputWrapper">
                        <input type="text" placeholder="SearchMemes" />
                        <button>
                            Search
                        </button>
                    </div>
                    <div className="searchType">
                        {(this.props.activeType !== "classic") && <button className={"typeButton"}>
                            Classic
                        </button>}
                        {(this.props.activeType !== "popular") && <button className={"typeButton"}>
                            Popular
                        </button>}
                        {(this.props.activeType !== "latest") && <button className={"typeButton"}>
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
