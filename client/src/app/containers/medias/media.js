import {connect} from "react-redux";

import {
    MEDIAS_EXPAND_SHOW,
    MEDIAS_TOGGLE_SOUND,
    NOTIFY_IMG_LOAD,
    NOTIFY_IMG_UNLOAD
} from "../../actions/medias";
import Media from "../../components/medias/Media";

const mapStateToProps = ({medias}) => {
    return {
        gotSound: medias.gotSound
    };
};

const mapDispatchToProps = dispatch => {
    return {
        expandMedia: media => dispatch({type: MEDIAS_EXPAND_SHOW, payload: media}),
        toggleSound: payload => dispatch({payload, type: MEDIAS_TOGGLE_SOUND}),
        notifyImgLoad: () => dispatch({type: NOTIFY_IMG_LOAD}),
        notifyImgUnload: () => dispatch({type: NOTIFY_IMG_UNLOAD})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
