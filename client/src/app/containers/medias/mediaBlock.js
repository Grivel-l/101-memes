import {connect} from "react-redux";

import {MEDIAS_EXPAND_SHOW} from "../../actions/medias";
import MediaBlock from "../../components/medias/MediaBlock";

const mapDispatchToProps = dispatch => {
    return {
        expandMedia: media => dispatch({type: MEDIAS_EXPAND_SHOW, payload: media})
    };
};

export default connect(null, mapDispatchToProps)(MediaBlock);
