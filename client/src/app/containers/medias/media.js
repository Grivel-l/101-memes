import {connect} from "react-redux";

import {
    MEDIAS_EXPAND_SHOW,
    MEDIAS_TOGGLE_SOUND
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
        toggleSound: payload => dispatch({payload, type: MEDIAS_TOGGLE_SOUND})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
