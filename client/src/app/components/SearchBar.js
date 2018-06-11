import React, {Component} from "react";
import "../scss/searchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.launchSearch = this.launchSearch.bind(this);
        this.updateType = this.updateType.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.searchInput = React.createRef();

        this.categoryPresets = {
            custom: {
                type: "custom",
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

    launchSearch(preset = "custom") {
        this.props.searchMedias({
            ...this.categoryPresets[preset],
            terms: this.categoryPresets[preset].terms ? this.searchInput.current.value : ""
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
                        <input className={"searchInput"} type="text" placeholder="Search Memes" ref={this.searchInput} onKeyDown={this.keyPress}/>
                        <button className={"searchButton"} onClick={() => this.launchSearch()}>
                            <svg version={"1.1"} xmlns={"http://www.w3.org/2000/svg"} height={"30px"} width={"30px"} x={"0px"} y={"0px"}
                                viewBox={"0 0 250.313 250.313"}>
                                <g>
                                    <path style={{"fillRule": "evenodd", "clipRule": "evenodd"}} d={"M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236C170.146,140.044,140.043,170.146,102.911,170.146z"}/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className={"categoryWrapper"}>
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
            </div>
        );
    }
}

SearchBar.propTypes = {
    type: PropTypes.string,
    searchMedias: PropTypes.func
};

export default SearchBar;
