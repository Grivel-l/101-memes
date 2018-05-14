import {connect} from "react-redux";

import {
    MEDIAS_EXPAND_SHOW,
    MEDIAS_DELETE
} from "../actions/medias";
import Media from "../components/Media";

const mapStateToProps = ({users}) => {
    return {
        login: users.login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        expandMedia: media => dispatch({type: MEDIAS_EXPAND_SHOW, payload: media}),
        deleteMedia: media => dispatch({type: MEDIAS_DELETE, payload: media})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
