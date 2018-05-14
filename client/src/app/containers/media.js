import {connect} from "react-redux";

import {MEDIAS_EXPAND_SHOW} from "../actions/medias";
import Media from "../components/Media";

const mapStateToProps = ({users}) => {
    return {
        login: users.login
    };
};

const mapDispatchToProps = dispatch => {
    return {expandMedia: media => dispatch({type: MEDIAS_EXPAND_SHOW, payload: media})};
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
