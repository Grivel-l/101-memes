import {connect} from "react-redux";

import SearchBar from "../components/SearchBar";

const mapStateToProps = ({medias}) => {
    return {
        ...medias.search
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
