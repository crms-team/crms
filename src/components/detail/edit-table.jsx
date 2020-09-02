import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import "./table.css";

export default class EditCellClassNameTable extends React.Component {
    constructor(props) {
        super(props);

        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    editRow(row, cellName, cellValue) {
        let now = this.props.rowData

        for (let i in now) {
            if (now[i].index == row.index) {
                now[i] = row;
                break;
            }
        }
        this.props.handler(this.props.keyId, now);
    }

    deleteRow(row, rows, cellValue) {
        let now = this.props.rowData

        for (let cell of rows) {
            for (let i in now) {
                if (now[i].index == cell.index) {
                    now.splice(i, 1);
                    break;
                }
            }
        }

        this.props.handler(this.props.keyId, now);
    }

    addRow(row) {
        let now = this.props.rowData
        now.push(row);
        this.props.handler(this.props.keyId, now);
    }

    render() {
        let data = this.props.rowData

        for (let i in data) {
            data[i].index = data[i].index ? data[i].index : i;
        }
        return (
            <BootstrapTable
                data={data}
                cellEdit={{
                    mode: "click",
                    afterSaveCell: this.editRow,
                }}
                options={{
                    afterInsertRow: this.addRow,
                    afterDeleteRow: this.deleteRow,
                }}
                insertRow
                deleteRow
                selectRow={{
                    mode: "checkbox",
                }}
                headerStyle={{
                    textAlign: "center",
                }}
                trStyle={{
                    textAlign: "center",
                }}
                tableStyle={{
                    marginBottom: "20px",
                }}
            >
                <TableHeaderColumn dataField="index" hidden autoValue isKey>
                    Index
                </TableHeaderColumn>
                <TableHeaderColumn
                    thStyle={{
                        padding: "0px !important",
                    }}
                    dataAlign="center"
                    dataField="protocol"
                    editable={{
                        type: "select",
                        options: { values: ["tcp", "udp", "icmp", "-1"] },
                    }}
                >
                    Protocol
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField="port"
                    editable={{ type: "textarea" }}
                >
                    Port
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField="cidr"
                    editable={{ type: "textarea" }}
                >
                    CIDR
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField="description"
                    editable={{ type: "textarea" }}
                >
                    Description
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
