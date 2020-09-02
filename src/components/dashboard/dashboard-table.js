import React, { useState, Component } from "react";
import "./dashboard-table.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function rowColorStyle(row) {
    // Transform, Create, Modify, Remove
    try {
        return row.title.split(" ")[0];
    } catch {
        return "Transform";
    }
}

class DashboardTable extends Component {
    render() {
        return (
            <div className="dashboard__table-container">
                <BootstrapTable
                    className="dashboard__table"
                    data={this.props.dataset}
                    trClassName={rowColorStyle}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="index"
                        dataAlign="center"
                    >
                        Index
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="keyId" dataAlign="center">
                        Key ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataAlign="center">
                        Title
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="time" dataAlign="center">
                        Time
                    </TableHeaderColumn>
                </BootstrapTable>
                <button className="log-page" onClick={()=>{
                    window.location.href=`/history`
                }}>
                    More Historys
                </button>
            </div>
        );
    }
}

export default DashboardTable;
