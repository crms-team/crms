import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
    Box,
    Collapse,
    IconButton,
    makeStyles
} from "@material-ui/core";
import { Modal } from "react-bootstrap";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ModalContent from "./modal"
import "./history.scss";

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

function makeValue(instances) {
    if (instances && JSON.stringify(instances) != "{}") {
        let create = 0;
        let modify = 0;
        let remove = 0;

        for (let instance in instances) {
            create += instances[instance].create.length;
            modify += instances[instance].modify.length;
            remove += instances[instance].remove.length;
        }

        return (
            "+" +
            create.toString() +
            "/" +
            modify.toString() +
            "/-" +
            remove.toString()
        );
    }

    return "+0/0/-0";
}

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

function createDetailData(
    keyID,
    title,
    time,
    compute,
    database,
    network,
    storage,
    price,
    index,
    history
) {
    return {
        keyID,
        title,
        time,
        compute,
        database,
        network,
        storage,
        price,
        index,
        history,
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow
                className={classes.root}
                onClick={() => setOpen(!open)}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                                <KeyboardArrowDownIcon />
                            )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.keyID}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.compute}</TableCell>
                <TableCell align="right">{row.database}</TableCell>
                <TableCell align="right">{row.network}</TableCell>
                <TableCell align="right">{row.storage}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={8}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>session</TableCell>
                                        <TableCell>resource</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>state</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}
                                            onClick={(e) => {
                                                if (!e.target.closest(".MuiSvgIcon-root")) {
                                                    props.click(true)
                                                    props.data(historyRow)
                                                    props.modalKey(row.keyID)
                                                }
                                            }}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.session}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.resource}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow.id}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow.state}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            })
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const headCells = [
    { id: "keyID", numeric: false, disablePadding: true, label: " keyID " },
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "title",
    },
    { id: "time", numeric: false, disablePadding: false, label: "time" },
    {
        id: "compute",
        numeric: false,
        disablePadding: false,
        label: "compute",
    },
    {
        id: "database",
        numeric: false,
        disablePadding: false,
        label: "database",
    },
    { id: "network", numeric: false, disablePadding: false, label: "network" },
    { id: "storage", numeric: false, disablePadding: false, label: "storage" },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headCells.map((headCell) => (
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
        minHeight: "48px !important",
    },
    title: {
        flex: "1 1 100%",
        color: "#2d2e3d",
        paddingLeft: "10px",
        fontSize: "20px",
        fontWeight: 700,
        textAlign: "center",    
    },
    icon: {
        color: "#18181f",
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            id="header"
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography
                className={classes.title}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                HISTORY
            </Typography>
        </Toolbar>
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
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("subnetAssociated");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(undefined);
    const [keyData, setKeyData] = React.useState(undefined);


    useEffect(() => {
        async function getData() {
            let rowList = [];
            let response = await (
                await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/api/cloud/history`
                )
            ).json();

            for (let data of response.history) {
                let compute = makeValue(data.detail.compute);
                let database = makeValue(data.detail.database);
                let network = makeValue(data.detail.network);
                let storage = makeValue(data.detail.storage);

                let history = [];

                for (let session in data.detail) {
                    for (let resource in data.detail[session]) {
                        for (let state in data.detail[session][resource]) {
                            for (let info of data.detail[session][resource][state]) {
                                history.push({
                                    session: session,
                                    resource: resource,
                                    id: info.id,
                                    state: state,
                                    detail: info.detail
                                });
                            }
                        }
                    }
                }

                rowList.push(
                    createDetailData(
                        data.keyId,
                        data.title,
                        data.time,
                        compute,
                        database,
                        network,
                        storage,
                        1,
                        rowList.length + 1,
                        history
                    )
                );
            }
            setRows(rowList);
        }
        getData();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        setSelected([]);
    };

    const handleModalShowHide = () => {
        setOpenModal(!openModal);
    }

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
            <div className="table-container">
                <h2 className="listview-title">History</h2>
                <div className="table">
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={dense ? "small" : "medium"}
                                    aria-label="collapsible enhanced table"
                                >
                                    <EnhancedTableHead
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
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
                                            .map((row) => {
                                                const table = (
                                                    <Row
                                                        key={row.index}
                                                        row={row}
                                                        click={setOpenModal}
                                                        data={setModalContent}
                                                        modalKey={setKeyData}
                                                    />
                                                );

                                                return <>{table}</>;
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow>
                                                <TableCell colSpan={8} />
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
            </div>
            <Modal
                show={openModal}
                dialogClassName="modal-90w"
                centered
                scrollable={true}
                onHide={handleModalShowHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <ModalContent data={modalContent} dataKey={keyData} />
            </Modal>
        </>
    );
}
