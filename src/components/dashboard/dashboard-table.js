import React, { useState, Component } from "react";
import "./dashboard-table.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function rowColorStyle(row) {
    console.log(row)
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
    constructor (props) {
        super(props)

        this.state = {
            dataset: []
        }
    }

    async componentDidMount() {
        let historys = await fetch(`http://localhost:4000/api/cloud/history?count=5`).then(res=>res.json())

        let dataset = []
        let i = 1

        for (let history of historys.history) {
            dataset.push({
                index: i++,
                keyId: history.keyId,
                time: history.time,
                title: history.title
            })
        }

        this.setState({dataset: dataset})
    }

    render() {
        return (
            <div className="dashboard__table-container">
                <BootstrapTable
                    className="dashboard__table"
                    data={this.state.dataset}
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
                    <TableHeaderColumn
                        dataField="title"
                        dataAlign="center"
                    >
                        Title
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="time" dataAlign="center">
                        Time
                    </TableHeaderColumn>
                </BootstrapTable>
                <button className="log-page">
                    <a href="#"></a>More Historys
                </button>
            </div>
        );
    }
}

export default DashboardTable;
