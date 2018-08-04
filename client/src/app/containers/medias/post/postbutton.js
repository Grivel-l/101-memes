import {connect} from "react-redux";

import {MEDIA_PUBLISH} from "../../../actions/medias";
import PostButton from "../../../components/medias/post/PostButton";

const mapStateToProps = ({medias, tags}) => {
    return {
        error: {
            status: medias.status.post,
            message: medias.status.message
        },
        tagsArray: tags.tagsArray
    };
};

const mapDispatchToProps = dispatch => {
    return {
        publishMedia: payload => dispatch({payload, type: MEDIA_PUBLISH})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostButton);
