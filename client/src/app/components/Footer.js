import React, {Component} from "react";
import "../scss/footer.css";

class Footer extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            showTerms: false
        };
        this.svgSize = 40;
    }

    renderGithub(link) {
        return (
            <div className={"logoLink githubLogo"} alt={"Intra logo"}>
                <a href={link}>
                    <svg  fill="#fff" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
            </div>

        );
    }

    renderIntra(link) {
        return (
            <div className={"logoLink intraLogo"}  alt={"Github logo"}>
                <a href={link}>
                    <svg fill="#fff" version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 -200 960 960" enableBackground="new 0 -200 960 960">
                        <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 
                        32,279.1 "/>
                        <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 "/>
                        <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "/>
                        <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 "/>
                    </svg>
                </a>
            </div>
        );
    }

    renderTerms() {
        return (
            <div className={this.state.showTerms ? "termsWrapper showTerms" : "termsWrapper"} onClick={() => this.setState({showTerms: !this.state.showTerms})}>
                <p>{"This terms have been greatly inpired by those of imgur.com. \
The use of this application is reserved exclusively for users with an active account on intra.42.fr. \
Using our app to do anything other than access the links to this \"Terms\" page or accessing any page of our application other than this \"Terms\" page constitutes your consent to these terms of use and to our Privacy Policy. If you do not consent, do not use our application. \
Your use of our application to do anything beyond simply accessing/viewing it (that is, uploading, downloading, etc.), constitutes not merely your consent, but also your electronic signature, meaning that you are contractually bound by these terms and by our Privacy Policy. \
Stuff not to do \
If someone else might own the copyright to it, don't upload it. Don't upload gore, \"hate speech\" (i.e. demeaning race, gender, age, religious or sexual orientation, etc.), or material that is threatening, harassing, defamatory, or that encourages violence or crime. Don't upload illegal content such as child porn or nonconsensual (\"revenge\") porn. Don't hotlink to adult content or to file-sharing, gambling, torrent, warez sites. Don't impersonate someone else. Also, don't use 101_memes to host image libraries you link to from elsewhere, content for your website, advertising, avatars, or anything else that turns us into your content delivery network. If you do or if you do anything illegal, in addition to any other legal rights we may have, we will ban delete all your images, report you to the authorities if necessary, and prevent you from viewing any images hosted on 101_memes. \
Stuff to do \
If you see anything on our site that shouldn't be there because it violates our policies, is illegal (e.g. revenge porn or child porn), or for some other reason, please let us know by emailing us at « email de moderation » or by contacting an admin or a moderator. \
About images you upload \
By uploading images online you accept that any other user can access and share them. \
 \
PRIVACY POLICY \
 \
Information we collect and how we use it \
Automatically collected technical information: Our servers can log information about each computer connecting with our site such as IP address, dates and times of each login, browser type, type of connection, page and image viewing statistics. We also log the metadata associated with any images or videos you upload. None of this automatically collected technical information is associated with any identified person at the time it is collected, but it could be associated with you if we are required to disclose our server logs as a result of a subpoena or other legal process, some third party such as your internet provider could match our anonymous technical information with you, using information beyond what is found on our servers. \
We may use cookies, web beacons, or other anonymous tracking information to improve our server's interaction with your computer. These cookies are required in order for the application to function properly. \
Personal Data Protection \
We store no other personnal data than those hosted on your intra42 profile. \
Image Privacy \
Every image uploaded to 101_meme can always be accessed and viewed by any logged user. \
 \
Community rules \
 \
If you see an image or a title that breaks the following, we welcome you to report it to moderators. \
If content breaks these community rules, it may be removed and the original poster warned about the removal. Warnings will expire. However, if multiple submissions break the rules in a short time frame, warnings will accumulate, which could lead the concerned user to be added to a blacklist preventing him from accessing any content hosted on 101_memes. \
•    No nudity or sexually explicit, provocative, inflammatory, unsettling, or suggestive posts. \
•    No hate speech, abuse, or harassment. \
•    No content that condones illegal or violent activity. \
•    No gore or mutilation. \
•    No spam or prohibited behavior. \
•    No posts that violate 101_memes terms of service."}</p>
            </div>
        );
    }

    render() {
        return (
            <div className={"footer"}>
                <div className={"footerFlex"}>
                    <div className={"footerCol terms"}>
                        <div className={"footerColWrapper"}>
                            <p className={"terms"} onClick={() => this.setState({showTerms: !this.state.showTerms})}>Terms of use</p>
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
                {this.renderTerms()}
            </div>
        );
    }
}

export default Footer;
