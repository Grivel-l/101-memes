import React, {Component} from "react";
import "../scss/footer.css";

class Footer extends Component {  
    render() {
        return (
            <div className={"footer"}>
                <div className={"footerFlex"}>
                    <div className={"footerCol terms"}>
                        <p><a>Terms of use</a></p>
                    </div>
                    <div className={"footerCol creators"}>
                        <div className={"footerColWrapper"}>
                            <div className={"creator"}>
                                <div className={"creatorProfileWrapper"}>
                                    <a className={"creatorProfile"}>
                                        Julien Marquet
                                    </a>
                                </div>
                                <button className={"creatorButton"}>GIT</button>
                                <button className={"creatorButton"}>LNK</button>
                            </div>
                            <div className={"creator"}>
                                <div className={"creatorProfileWrapper"}>
                                    <a className={"creatorProfile"}>
                                        Léo Grivel
                                    </a>
                                </div>
                                <button className={"creatorButton"}>GIT</button>
                                <button className={"creatorButton"}>LNK</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"footerResp"} />
            </div>
        );
    }
}

export default Footer;
