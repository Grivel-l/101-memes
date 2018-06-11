import {connect} from "react-redux";

import {MEDIAS_SWAP_PAGE} from "../actions/medias";
import Paginatiom from "../components/Pagination";

const mapStateToProps = ({medias}) => {
    return {
        pageNbr: medias.results.pageNbr,
        searchRequest: medias.searchRequest
    };
};

const mapDispatchToProps = dispatch => {
    return {
        swapPage: payload => dispatch({payload, type: MEDIAS_SWAP_PAGE})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginatiom);
