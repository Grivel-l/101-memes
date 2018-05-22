import {connect} from "react-redux";

import {MEDIAS_DELETE} from "../../actions/medias";
import MediaHover from "../../components/medias/MediaHover";

const mapStateToProps = ({users}) => {
    return {
        login: users.login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteMedia: media => dispatch({type: MEDIAS_DELETE, payload: media})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaHover);
