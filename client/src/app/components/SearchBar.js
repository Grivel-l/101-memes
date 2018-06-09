import React, {Component} from "react";
import "../scss/searchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.launchSearch = this.launchSearch.bind(this);
        this.updateType = this.updateType.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.categoryPresets = {
            classic: {
                type: "classic",
                terms: true,
                limit: 24,
                page: 1
            },
            popular: {
                type: "popular",
                terms: false,
                limit: 24,
                page: 1
            },
            latest: {
                type: "latest",
                terms: false,
                limit: 24,
                page: 1
            }
        };

    }

    launchSearch(preset = "classic") {
        this.props.searchMedias({
            ...this.categoryPresets[preset],
            terms: this.categoryPresets[preset].terms ? this.refs.searchInput.value : ""
        });
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
                        <input className={"searchInput"} type="text" placeholder="Search Memes" ref="searchInput" onKeyDown={this.keyPress}/>
                        <button className={"searchButton"} onClick={() => this.launchSearch()} ref="searchButton">
                            Search
                        </button>
                    </div>
                    {(this.props.type !== "popular") && <button 
                        className={"categoryButton"}
                        onClick={() => this.launchSearch("popular")}>
                            Popular
                    </button>}
                    {(this.props.type !== "latest") && <button 
                        className={"categoryButton"}
                        onClick={() => this.launchSearch("latest")}>
                            Latest
                    </button>}
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    type: PropTypes.string,
    searchMedias: PropTypes.func
};

export default SearchBar;
