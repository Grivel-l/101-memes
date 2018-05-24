import React, {Component} from "react";
import "../scss/footer.css";

class Footer extends Component {  
    constructor(props) {
        super(props);
        this.svgSize = 40;
    }

    renderGithub(link) {
        return (
            <div className={"logoLink intraLogo"} href={link} alt={"Github logo"}>
                <svg preserveAspectRatio="false" fill="#fff" version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                    <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 
                        32,279.1 "/>
                    <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 "/>
                    <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "/>
                    <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 "/>
                </svg>
            </div>
        );
    }

    renderIntra(link) {
        return (
            <div className={"logoLink githubLogo"} href={link} alt={"Intra logo"}>
                <svg  fill="#fff" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </div>
        );
    }

    render() {
        return (
            <div className={"footer"}>
                <div className={"footerFlex"}>
                    <div className={"footerCol terms"}>
                        <div className={"footerColWrapper"}>
                            <p><a>Terms of use</a></p>
                        </div>
                    </div>
                    <div className={"footerCol creators"}>
                        <div className={"footerColWrapper"}>
                            <div className={"creator"}>
                                <div className={"creatorProfileWrapper"}>
                                    <p>Julien Marquet</p>
                                </div>
                                {this.renderIntra("https://profile.intra.42.fr/users/jmarquet")}
                                {this.renderGithub("https://github.com/julien-marquet")}
                            </div>
                            <div className={"creator"}>
                                <div className={"creatorProfileWrapper"}>
                                    <p>Léo Grivel</p>
                                </div>
                                {this.renderIntra("https://profile.intra.42.fr/users/legrivel")}
                                {this.renderGithub("https://github.com/Grivel-l")}
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
