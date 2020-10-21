import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from 'react-bootstrap';
import './scheduler.scss';
import { Modal } from "react-bootstrap";
import ModalComponent from "./modal"

function createData(schedulerId, keyId, session, resourceId, type, time) {
  return {schedulerId, keyId, session, resourceId, type, time};
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
  return order === 'desc'
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

const headCells = [
  { id: 'schedulerId', numeric: false, disablePadding: true, label: ' Scheduler ID ' },
  { id: 'keyId', numeric: false, disablePadding: false, label: 'Key ID' },
  { id: 'session', numeric: false, disablePadding: false, label: 'Session' },
  { id: 'resourceId', numeric: false, disablePadding: false, label: 'Resource ID' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#18181f',
          backgroundColor: '#6b6e7c',
        }
      : {
          color: '#18181f',
          backgroundColor: '#6b6e7c',
        },
  title: {
    flex: '1 1 100%',
  },
  icon : {
      color : '#18181f'
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          No rows selected
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '82%',
    float : 'right',
    margin : '0 1.5vw 0 0',
    paddingTop : '20px',
    boxSizing : 'border-box'
  },
  paper: {
    width: '100%',
    boxShadow : '5px 10px 20px #18181f99',
    borderRadius : '.7rem',
    overflow:'hidden'
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function getTime(hour, min){
  let result = ''
  if (hour < 10) {
    result += `0`
  } 
  result += `${hour}:`
  
  if (min < 10) {
    result += `0`
  } 

  result += `${min}`
  return result
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [showHide,setShowHide]=useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('subnetAssociated');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(14);
  const [schedulerData, setSchederData] = React.useState([])

  useEffect(()=>{
    async function getSchedulerData() {
      let url = `${process.env.REACT_APP_SERVER_URL}/api/scheduler`
      let data = (await fetch(url).then(res=>res.json()))
      let result = []

      for (let i of data['schedulerData']) {
        result.push(createData(i.schedulerId, i.keyId, i.session, i.resourceId, i.type? 'ON' : 'OFF', getTime(i.time.hour, i.time.min)))
      }
      setSchederData(result)      
    }

    getSchedulerData()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = schedulerData.map((n) => n.schedulerId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleModalShowHide = () => {
    setShowHide(!showHide);
}

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, schedulerData.length - page * rowsPerPage);

  return (
    <>
    <div className="scheduler-container">
        <h2 className="listview-title scheduler-btn-container">SCHEDULER
                <div className="scheduler-btns">
                    <Button variant="primary" className="add-btn" onClick={()=>{
                      handleModalShowHide()
                    }} >Add</Button>
                    <Button variant="primary" className="delete-btn" onClick={()=>{
                      let result=[]
                      for(let tmp in schedulerData){
                        for(let tmp_select in selected){
                          if(schedulerData[tmp].schedulerId==selected[tmp_select]){
                            result.push(schedulerData[tmp].schedulerId)
                          }
                        }
                      }

                      let url = `${process.env.REACT_APP_SERVER_URL}/api/scheduler`
                      for(let id of result) {
                        fetch(`${url}?schedulerId=${id}`, { method: 'DELETE'})
                      }
                      window.location.reload()
                    }}>Delete</Button>
                </div>
        </h2>
    </div>
    <div className="table">
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={schedulerData.length}
                />
                <TableBody>
                {stableSort(schedulerData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.schedulerId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.schedulerId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.schedulerId}
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.schedulerId}
                        </TableCell>
                        <TableCell align="right">{row.keyId}</TableCell>
                        <TableCell align="right">{row.session}</TableCell>
                        <TableCell align="right">{row.resourceId}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 10 : 43) * emptyRows }}>
                    <TableCell colSpan={8} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={schedulerData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    </div>
    <Modal
        show={showHide}
        size="lg"
        dialogClassName="width :50%"
        dialogClassName="height:50%"
        centered
        scrollable={true}
    > 
        <Modal.Header closeButton onClick={() => handleModalShowHide()}>
            <Modal.Title>Schedule Instance</Modal.Title>
        </Modal.Header>
        <ModalComponent/>
    </Modal>
    </>
  );
}