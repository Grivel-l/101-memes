import React, {Component} from "react";
import config from "../../config/globalConfig";
import PropTypes from "prop-types";
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
                    this.props.swapPage({searchRequest: {
                        ...this.props.searchRequest,
                        page: props.index + 1
                    }});
                }}
            >{props.index + 1}</div>
        );
    }

    renderPages() {
        let i = 0;
        let displayed = 0;
        const result = [];

        if (this.props.page - 2 > 0) {
            result.push(
                <div key={"morePrev"} className={"morePage"}>
                    {"..."}
                </div>
            );
            i = this.props.page - 2;
        }
        while (i < this.props.pageNbr && displayed < 5) {
            displayed++;
            result.push(
                this.Paginator({index: i})
            );
            i += 1;
        }
        if (displayed === 5) {
            result.push(
                <div key={"moreNext"} className={"morePage"}>
                    {"..."}
                </div>
            );
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

Pagination.propTypes = {
    page: PropTypes.number,
    pageNbr: PropTypes.number,
    swapPage: PropTypes.func,
    searchRequest: PropTypes.object
};

export default Pagination;
