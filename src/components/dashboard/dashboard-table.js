import React, { useState, Component } from "react";
import "./dashboard-table.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function rowColorStyle(row, rowIndex) {
    if (row["condition"] === "변경") {
        row["condition"] = "changed";
    } else if (row["condition"] === "삭제") {
        row["condition"] = "delete";
    } else if (row["condition"] === "추가") {
        row["condition"] = "add";
    } else {
        row["condition"] = "other";
    }
    return row["condition"];
}

class DashboardTable extends Component {
    render() {
        return (
            <div className="dashboard__table-container">
                <BootstrapTable
                    className="dashboard__table"
                    data={this.props.data}
                    trClassName={rowColorStyle}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="index"
                        dataAlign="center"
                    >
                        Index
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="cloudID" dataAlign="center">
                        cloud ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="changeResource"
                        dataAlign="center"
                    >
                        변경된 리소스
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="time" dataAlign="center">
                        시간
                    </TableHeaderColumn>
                </BootstrapTable>
                <button className="log-page">
                    <a href="#"></a>More Logs
                </button>
            </div>
        );
    }
}

export default DashboardTable;
