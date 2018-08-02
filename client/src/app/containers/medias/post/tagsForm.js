import {connect} from "react-redux";

import TagsForm from "../../../components/medias/post/TagsForm";
import {UPDATE_TAGS} from "../../../actions/tags";

const mapDispatchToProps = dispatch => {
    return {
        updateTags: payload => dispatch({type: UPDATE_TAGS, payload})
    };
};

export default connect(null, mapDispatchToProps)(TagsForm);
