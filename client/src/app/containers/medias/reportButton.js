import {connect} from "react-redux";

import {MEDIAS_REPORT} from "../../actions/medias";
import ReportButton from "../../components/medias/ReportButton";

const mapDispatchToProps = dispatch => {
    return {
        reportMedia: payload => dispatch({payload, type: MEDIAS_REPORT})
    };
};

export default connect(null, mapDispatchToProps)(ReportButton);
