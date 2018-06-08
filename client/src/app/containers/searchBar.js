import {connect} from "react-redux";

import SearchBar from "../components/SearchBar";
import {MEDIAS_SEARCH} from "../actions/medias";

const mapStateToProps = ({medias}) => {
    return {
        ...medias.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchMedias: payload => dispatch({payload, type: MEDIAS_SEARCH})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
