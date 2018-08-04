import React, {Component} from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

import "../../scss/pagination.css";

class Pagination extends Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(nextProps.searchRequest, this.props.searchRequest)|| nextProps.pageNbr !== this.props.pageNbr;
    }

    Paginator(props) {
        return (
            <div
                key={`page${props.index}`}
                className={this.props.searchRequest.page === props.index + 1 ? "paginator selected" : "paginator"}
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

        if (this.props.searchRequest.page - 2 > 0) {
            result.push(
                <div key={"morePrev"} className={"morePage"}>
                    {"..."}
                </div>
            );
            i = this.props.searchRequest.page - 2;
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
        if (this.props.searchRequest.page < this.props.pageNbr) {
            result.push(
                <div key={"next"} className={"paginator "} onClick={() => {
                    this.props.swapPage({searchRequest: {
                        ...this.props.searchRequest,
                        page: this.props.searchRequest.page + 1
                    }});
                }}>
                    {">"}
                </div>
            );
        }
        if (this.props.searchRequest.page > 1) {
            result.unshift(
                <div key={"prev"} className={"paginator prev"}  onClick={() => {
                    this.props.swapPage({searchRequest: {
                        ...this.props.searchRequest,
                        page: this.props.searchRequest.page - 1
                    }});
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
    pageNbr: PropTypes.number,
    swapPage: PropTypes.func,
    searchRequest: PropTypes.object
};

export default Pagination;
