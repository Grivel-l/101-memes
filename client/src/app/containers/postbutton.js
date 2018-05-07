import {connect} from "react-redux";

import {MEDIA_PUBLISH} from "../actions/medias";
import PostButton from "../components/PostButton";

const mapStateToProps = ({medias}) => {
    return {
        status: medias.status.post
    };
};

const mapDispatchToProps = dispatch => {
    return {
        publishMedia: payload => dispatch({payload, type: MEDIA_PUBLISH})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostButton);
