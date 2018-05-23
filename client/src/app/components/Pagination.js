import React, {Component} from "react";
import config from "../../config/globalConfig";
import "../scss/pagination.css";

class Pagination extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.page !== this.props.page || nextProps.pageNbr !== this.props.pageNbr;
    }

    Paginator(props) {
        return (
            <div
                key={`page${props.index}`}
                className={this.props.page === props.index + 1 ? "paginator selected" : "paginator"}
                onClick={() => {
                    window.location.href = `${config.clientUrl}?page=${props.index + 1}`;
                }}
            >{props.index + 1}</div>
        );
    }

    renderPages() {
        let i = 0;
        const result = [];
        while (i < this.props.pageNbr) {
            result.push(
                this.Paginator({index: i})
            );
            i += 1;
        }
        if (this.props.page < this.props.pageNbr) {
            result.push(
                <div key={"next"} className={"paginator "} onClick={() => {
                    window.location.href = `${config.clientUrl}?page=${this.props.page + 1}`;
                }}>
                    {">"}
                </div>
            );
        }
        if (this.props.page > 1) {
            result.unshift(
                <div key={"prev"} className={"paginator prev"}  onClick={() => {
                    window.location.href = `${config.clientUrl}?page=${this.props.page - 1}`;
                }}>
                    {"<"}
                </div>
            );
        }
        return result;
    }
    render() {
        return (
            <div className={"pagination"}>
                {this.renderPages()}
            </div>
        );
    }
}

export default Pagination;
