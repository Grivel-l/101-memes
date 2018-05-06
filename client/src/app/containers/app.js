import {connect} from "react-redux";

import {MEDIAS_GET} from "../actions/medias";
import App from "../components/App";

const mapStateToProps = ({medias}) => {
    return {medias};
};

const mapDispatchToProps = dispatch => {
    return {
        getMedias: pageNbr => dispatch({type: MEDIAS_GET, payload: pageNbr})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
