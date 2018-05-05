import {connect} from "react-redux";

import App from "../components/App";

const mapStateToProps = ({medias}) => {
    return {medias};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
