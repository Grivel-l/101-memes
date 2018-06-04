import {connect} from "react-redux";

import {MEDIAS_REPORT, MEDIAS_DELETE} from "../../actions/medias";
import MoreButton from "../../components/medias/MoreButton";

const mapDispatchToProps = dispatch => {
    return {
        reportMedia: payload => dispatch({payload, type: MEDIAS_REPORT}),
        deleteMedia: media => dispatch({type: MEDIAS_DELETE, payload: media})
    };
};

export default connect(null, mapDispatchToProps)(MoreButton);
