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
    constructor(props) {
        super(props);

        this.state = {
            dataset: [],
        };
    }

    async componentDidMount() {
        let historys = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/history?count=5`).then(res=>res.json())

        let dataset = [];
        let i = 1;

        for (let history of historys.history) {
            dataset.push({
                index: i++,
                keyId: history.keyId,
                time: history.time,
                title: history.title,
            });
        }

        this.setState({ dataset: dataset });
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
