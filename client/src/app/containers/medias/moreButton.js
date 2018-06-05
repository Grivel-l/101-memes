import {connect} from "react-redux";

import {MEDIAS_REPORT, MEDIAS_DELETE} from "../../actions/medias";
import MoreButton from "../../components/medias/MoreButton";

const mapStateToProps = ({users}) => {
    return {
        login: users.login,
        role: users.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reportMedia: payload => dispatch({payload, type: MEDIAS_REPORT}),
        deleteMedia: media => dispatch({type: MEDIAS_DELETE, payload: media})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreButton);
