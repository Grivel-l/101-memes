import React, {Component} from "react";
import config from "../../config/globalConfig";
import "../scss/pagination.css";

class Pagination extends Component {  
    renderPages() {
        let i = 0;
        const result = [];
        while (i < this.props.pageNbr) {
            result.push(
                <a
                    key={`page${i}`}
                    href={`${config.clientUrl}?page=${i + 1}`}
                    className={this.props.page === i + 1 ? "pageNbr pageNbrSelected" : "pageNbr"}
                >{i + 1}</a>
            );
            i += 1;
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
