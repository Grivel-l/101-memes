import {connect} from "react-redux";

import {
    MEDIAS_GET,
    MEDIAS_EXPAND_HIDE
} from "../actions/medias";
import App from "../components/App";

const mapStateToProps = ({medias}) => {
    return {
        ...medias,
        status: medias.status.get,
        imgLoaded: (medias.status.img.getted === true && medias.status.img.toLoad <= 0),
        post: medias.status.post,
        delete: medias.status.delete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMedias: pageNbr => dispatch({type: MEDIAS_GET, payload: pageNbr}),
        hideExpand: () => dispatch({type: MEDIAS_EXPAND_HIDE})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
