import React, {Component} from "react";
import PropTypes from "prop-types";

import "../scss/app.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderMedias() {
        return this.props.medias.map((media, index) => {
            return (
                <div key={`media${index}`} className={"mediaContainer"}>
                    <div className={"subMediaContainer"}>
                        <img
                            src={media.path}
                            alt={media.name}
                            className={"mediaImg"}
                        />
                        <div className={"mediaHover"}>
                            <div className={"downloadButton"}>
                                <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><g><path d="M16.707,7.404C16.518,7.216,16.259,7.121,16,7.121s-0.518,0.095-0.707,0.283L13,9.697V3c0-0.552-0.448-1-1-1s-1,0.448-1,1   v6.697L8.707,7.404C8.518,7.216,8.267,7.111,8,7.111S7.482,7.216,7.293,7.404c-0.39,0.39-0.39,1.024,0,1.414L12,13.5l4.709-4.684   C17.097,8.429,17.097,7.794,16.707,7.404z"/><path d="M20.987,16c0-0.105-0.004-0.211-0.039-0.316l-2-6C18.812,9.275,18.431,9,18,9h-0.219c-0.094,0.188-0.21,0.368-0.367,0.525   L15.932,11h1.348l1.667,5H5.054l1.667-5h1.348L6.586,9.525C6.429,9.368,6.312,9.188,6.219,9H6C5.569,9,5.188,9.275,5.052,9.684   l-2,6C3.017,15.789,3.013,15.895,3.013,16C3,16,3,21,3,21c0,0.553,0.447,1,1,1h16c0.553,0,1-0.447,1-1C21,21,21,16,20.987,16z"/></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={"wrapper"}>
                {this.renderMedias()}
            </div>
        );
    }
}

App.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.object)
};

export default App;
