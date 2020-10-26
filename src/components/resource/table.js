import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./table.scss";
import { COLUMES, MATCHINGS } from "./constants";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    makeStyles,
} from "@material-ui/core";
import {
    Delete as DeleteIcon,
    PlayArrow as PlayArrowIcon,
    FilterList as FilterListIcon,
    Pause as PauseIcon,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { idType } from "../../manager";

function createData(keys, data) {
    let result = {};

    for (let key of keys) {
        result[key] = data[key];
    }

    return result;
}

function checkVendor(key) {
    let tmp_list = JSON.parse(localStorage.getItem("key"));
    for (let tmp of tmp_list) {
        if (tmp.key == key) {
            return tmp.vendor;
        }
    }
}

function getIdValue(vendor, id) {
    if (vendor == "aws") {
        return id;
    } else {
        let tmp_arr = id.split("/");
        return ({
            resourceGroupName: tmp_arr[4],
            name: tmp_arr[8],
        });
    }
}

function getSubnetValue(vendor, id) {
    if (vendor == "aws") {
        return id;
    } else {
        let tmp_arr = id.split("/");
        return ({
            resourceGroupName: tmp_arr[4],
            vnetName: tmp_arr[8],
            subnetName: tmp_arr[10]
        });
    }
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        type,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all" }}
                    />
                </TableCell>
                {COLUMES[type].map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        background: "#7d9edf",
        minHeight: "10px !important",
    },
    title: {
        flex: '1 1 100%',
        color: "#2d2e3d",
        paddingLeft: "10px",
        fontSize: "20px",
        fontWeight: 700,
        textAlign: "center",
    },
    rowIconButton: {
        color: '#27262b!important'
    }
}));

const EnhancedTableToolbar = (props) => {
    let { type } = useParams();
    let classes = useToolbarStyles();
    const numSelected = props.numSelected.length;
    const { data } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        No rows selected
                    </Typography>
                )}

            {numSelected > 0 ? (
                <>
                    {(type == "server" || type == "database") ? <Tooltip title="On">
                        <IconButton
                            aria-label="off"
                            onClick={async () => {
                                let type = props.type;
                                for (let idx of props.numSelected) {
                                    let typeId = "id";
                                    if (type == "database") {
                                        typeId = "identifier";
                                    }
                                    let id = data[idx][typeId];
                                    let key_id = data[idx].key_id;
                                    let key_vendor = checkVendor(key_id);
                                    id = getIdValue(key_vendor, id);
                                    if (idType[key_vendor][type]["manage"] == "") {
                                        alert("Not Support this api");
                                    }
                                    else {
                                        let rst = await idType[key_vendor][type]["manage"].start(key_id, id);
                                        alert(rst.result ? "Success" : "Failed");
                                    }
                                    window.location.reload();
                                }
                            }}
                        >
                            <PlayArrowIcon className="rowIconButton" />
                        </IconButton>
                    </Tooltip> : <></>}

                    {(type == "server" || type == "database") ? <Tooltip title="Off">
                        <IconButton
                            onClick={async () => {
                                let type = props.type;
                                let typeId = "id";
                                if (type == "database") {
                                    typeId = "identifier";
                                }
                                for (let idx of props.numSelected) {
                                    let id = data[idx][typeId];
                                    let key_id = data[idx].key_id;
                                    let key_vendor = checkVendor(key_id);
                                    id = getIdValue(key_vendor, id);
                                    if (idType[key_vendor][type]["manage"] == "") {
                                        alert("Not Support this api");
                                    }
                                    else {
                                        let rst = await idType[key_vendor][type]["manage"].stop(key_id, id);
                                        alert(rst.result ? "Success" : "Failed");
                                    }
                                }
                            }}
                            aria-label="off"
                        >
                            <PauseIcon className="rowIconButton" />
                        </IconButton>
                    </Tooltip> : <></>}

                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={async () => {
                                let type = props.type;
                                let id;
                                let vendor;
                                for (let idx of props.numSelected) {
                                    let key_id = data[idx].key_id;
                                    vendor = checkVendor(key_id);
                                    if (type == "keypair") {
                                        id = data[idx].name;
                                        vendor = checkVendor(key_id);
                                        if (vendor == "azure") {
                                            id = data[idx].id;
                                        }
                                        id = getIdValue(vendor, id);
                                    } else if (type == "bucket") {
                                        id = data[idx].name;
                                    } else if (type == "database") {
                                        id = data[idx].identifier;
                                    } else if (type == "subnet") {
                                        id = data[idx].id;
                                        id = getSubnetValue(vendor, id);
                                    } else {
                                        id = data[idx].id;
                                        id = getIdValue(vendor, id);

                                    }
                                    if (idType[vendor][type]["manage"] == "") {
                                        alert("Not Support this api");
                                    } else {
                                        console.log(vendor, type)
                                        let rst = await idType[vendor][type]["manage"].delete(key_id, id);
                                        console.log(rst)
                                        alert(rst.result == true ? "Success" : "Failed");
                                    }
                                    window.location.reload();
                                }
                            }}
                        >
                            <DeleteIcon className="rowIconButton" />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon className="rowIconButton" />
                        </IconButton>
                    </Tooltip>
                )
            }
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "82%",
        float: "right",
        margin: "0 1.5vw 0 0",
        paddingTop: "20px",
        boxSizing: "border-box",

    },
    paper: {
        width: "100%",
        boxShadow: "5px 10px 20px #18181f99",
        borderRadius: ".7rem",
        overflow: "hidden",
        backgroundColor: '#212125',
        color: "#7d9edf",
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    let { type } = useParams();
    let subject = type.toUpperCase();
    let keys = JSON.parse(localStorage.getItem("key"));

    const [rows, setRows] = useState([]);
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("subnetAssociated");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        setRows([]);
        setSelected([]);
        async function test() {
            let result = [];
            let columes_list = [];

            for (let col of COLUMES[type]) {
                columes_list.push(col.id);
            }

            for (let key of keys) {
                let response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${type}?key_id=${key.key}`
                ).then((res) => res.json());
                if (response.data) {
                    for (let resource of response.data) {
                        result.push(
                            createData(
                                columes_list,
                                MATCHINGS[key.vendor][type](key.key, resource)
                            )
                        );
                    }
                }
            }

            setRows(result);
        }
        test();
    }, [type]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n, i) => i);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleClick = (event, name, row) => {
        if (event.target.type == "checkbox") {
            const selectedIndex = selected.indexOf(name);
            let newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }
            setSelected(newSelected);
        } else {
            let tmp_type = "";
            for (let key of keys) {
                if (key.key == row.key_id) {
                    tmp_type = key.vendor;
                }
            }
            window.location.href = `/detail/${row.key_id}/${type}/${btoa(
                row.id ? row.id : row.identifier ? row.identifier : row.name
            )}`;
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <>
            <h2 className="listview-title">{subject}</h2>
            <div className="table">
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <EnhancedTableToolbar
                            numSelected={selected}
                            data={rows}
                            type={type}
                        />
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size={dense ? "small" : "medium"}
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    type={type}
                                />
                                <TableBody>
                                    {stableSort(
                                        rows,
                                        getComparator(order, orderBy)
                                    )
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(
                                                index
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            const table = Object.keys(row).map(
                                                (v) => {
                                                    return (
                                                        <TableCell align="right">
                                                            {row[v]}
                                                        </TableCell>
                                                    );
                                                }
                                            );

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            index,
                                                            row
                                                        )
                                                    }
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    key={index}
                                                    style={{ height: "70px" }}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby": labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    {table}
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height:
                                                    (dense ? 10 : 43) *
                                                    emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={0} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </>
    );
}
