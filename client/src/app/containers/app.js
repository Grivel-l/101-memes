import {connect} from "react-redux";

import {
    MEDIAS_GET,
    MEDIAS_EXPAND_HIDE
} from "../actions/medias";
import {TOAST_SHOW} from "../actions/toasts";
import App from "../components/App";

const mapStateToProps = ({medias}) => {
    return {
        ...medias,
        status: medias.status.get,
        imgLoaded: (medias.status.img.getted === true && medias.status.img.toLoad <= 0),
        post: medias.status.post,
        delete: medias.status.delete,
        searchActiveType: medias.searchRequest.type
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMedias: pageNbr => dispatch({type: MEDIAS_GET, payload: pageNbr}),
        hideExpand: () => dispatch({type: MEDIAS_EXPAND_HIDE}),
        showToast: payload => dispatch({payload, type: TOAST_SHOW})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
