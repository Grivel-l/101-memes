import {connect} from "react-redux";

import {MEDIAS_EXPAND_SHOW, NOTIFY_IMG_LOAD} from "../actions/medias";
import Media from "../components/Media";

const mapDispatchToProps = dispatch => {
    return {
        expandMedia: media => dispatch({type: MEDIAS_EXPAND_SHOW, payload: media}),
        notifyImgLoad: () => dispatch({type: NOTIFY_IMG_LOAD})
    };
};

export default connect(null, mapDispatchToProps)(Media);
