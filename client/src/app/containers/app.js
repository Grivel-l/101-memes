import {connect} from "react-redux";

import {
    MEDIAS_GET,
    MEDIAS_EXPAND_HIDE
} from "../actions/medias";
import App from "../components/App";

const mapStateToProps = ({medias}) => {
    return {
        ...medias,
        status: medias.status.get
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMedias: pageNbr => dispatch({type: MEDIAS_GET, payload: pageNbr}),
        hideExpand: () => dispatch({type: MEDIAS_EXPAND_HIDE})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
