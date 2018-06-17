import {connect} from "react-redux";

import {MEDIAS_UPVOTE} from "../../actions/medias";
import Upvote from "../../components/medias/Upvote";

const mapDispatchToProps = dispatch => {
    return {
        upvote: payload => dispatch({payload, type: MEDIAS_UPVOTE})
    };
};

export default connect(null, mapDispatchToProps)(Upvote);
