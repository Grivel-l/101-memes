import {connect} from "react-redux";

import MediaHover from "../../components/medias/MediaHover";

const mapStateToProps = ({users}) => {
    return {
        login: users.login,
        role: users.role
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaHover);
