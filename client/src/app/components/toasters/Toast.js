import React, {Component} from "react";

import "../../scss/toasters.css";

class Toast extends Component {
    constructor() {
        super();

        this.state = {
            transition: "off",
        };
        this.mounted = true;
        this.transitionDuration = 600;
        this.renderButton = this.renderButton.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    componentDidMount() {
        if (this.props.toast !== null) {
            setTimeout(() => {
                this.setState({
                    transition: "on"
                });
            }, 100);
            if (typeof(this.props.toast.timeout) === "number")
                setTimeout(() => {
                    if (this.mounted) {
                        this.dismissToast();
                    }
                }, this.props.toast.timeout);
        }
    }

    dismissToast() {
        this.mounted = false;
        this.setState({
            transition: "off"
        });
        setTimeout(() => {
            this.props.hideToast({id: this.props.id});
        }, this.transitionDuration);
    }

    renderButton(){
        if (this.props.toast.action !== null && this.props.toast.action !== undefined) {
            return (
                <div className="toast-action-wrapper">
                    <button className="toast-action" onClick={() => {
                        this.props.toast.action.func();
                        this.dismissToast();
                    }}>
                        {this.props.toast.action.label}
                    </button>
                </div>
            );
        }
    }
    chooseIcons() {
        switch(this.props.toast.type) {
        case "info":
            return "fa-info";
        case "success":
            return "fa-check";
        case "warn":
            return "fa-exclamation-triangle";
        case "error":
            return "fa-exclamation-circle";
        default:
            return "fa-info";
        }
        
    }
    renderIcons() {
        if (!this.props.toast.action) {
            return (
                <i className={`icon-type fas ${this.chooseIcons()}`} />
            );
        }
    }

    render() {
        if (this.props.toast !== null) {
            return (
                <div className={`toast ${this.state.transition} ${this.props.toast.type}`}>
                    <div className="content">
                        {this.renderButton()}
                        <div className="message">
                            {this.renderIcons()}
                            <p>
                                {this.props.toast.message}
                            </p>
                        </div>
                    </div>
                    <button className="dismiss-toast" onClick={() => this.dismissToast()}>
                        <svg version="1.1" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 348.333 348.334"><g><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/></g></svg>
                    </button>
                </div>
            );
        }
        return null;
    }
}

export default Toast;
