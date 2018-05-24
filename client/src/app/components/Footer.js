import React, {Component} from "react";
import "../scss/footer.css";

class Footer extends Component {  
    constructor(props) {
        super(props);
        this.svgSize = 40;
    }

    renderGithub(link) {
        return (
            <a className={"logoLink"} href={link} alt={"Github logo"}>
                <svg height={this.svgSize} width={this.svgSize}><path transform={"scale(0.039)"} d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z"/></svg>
            </a>
        );
    }

    renderIntra(link) {
        return (
            <a className={"logoLink intraLogo"} href={link} alt={"Intra logo"}>
                <svg height={this.svgSize} width={this.svgSize}>
                    <g id="g3" transform="translate(-55, -85) scale(0.25)">
                        <polygon points="229.2,443.9 279.9,443.9 279.9,469.3 305.2,469.3 305.2,423.4 254.6,423.4 305.2,372.7 279.9,372.7 229.2,423.4 " id="polygon5"/>
                        <polygon points="316.1,398.1 341.4,372.7 316.1,372.7 " id="polygon7"/>
                        <polygon points="341.4,398.1 316.1,423.4 316.1,448.7 341.4,448.7 341.4,423.4 366.8,398.1 366.8,372.7 341.4,372.7 " id="polygon9"/>
                        <polygon points="366.8,423.4 341.4,448.7 366.8,448.7 " id="polygon11"/>
                    </g>
                </svg>
            </a>
        );
    }

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
