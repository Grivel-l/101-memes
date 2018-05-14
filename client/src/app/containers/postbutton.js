import {connect} from "react-redux";

import {MEDIA_PUBLISH} from "../actions/medias";
import PostButton from "../components/PostButton";

const mapStateToProps = ({medias}) => {
    return {
        error: {
            status: medias.status.post,
            message: medias.status.message
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        publishMedia: payload => dispatch({payload, type: MEDIA_PUBLISH})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostButton);
