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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import './table.scss';
import {useParams} from 'react-router-dom'

function createData(name, subnetAssociated, shared, external, status, adminState, availabilityZones) {
  return { name,  subnetAssociated, shared, external, status, adminState, availabilityZones};
}

const rows = [
  createData('contribution', 'subnet_1 172.32.0.0/24', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('private', 'ipv6', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('shared', 'subnet_1 172.32.0.0/26', '아니오', '예', 'Active', 'UP', 'nova'),
  createData('public', 'subnet_1 172.32.0.0/21', '예', '아니오', 'Active', 'UP', 'nova'),
  createData('data test4', 'subnet_1 172.32.0.0/20', '예', '아니오', 'Active', 'UP', 'nova'),
  createData('data test5', 'subnet_1 172.32.0.0/21', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('data test6', 'subnet_1 172.32.0.0/24', '아니오', '예', 'Active', 'UP', 'nova'),
  createData('data test7', 'subnet_1 172.32.0.0/24', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('data test8', 'subnet_1 172.32.0.0/24', '예', '예', 'Active', 'UP', 'nova'),
  createData('data test9', 'subnet_1 172.32.0.0/24', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('data test10', 'subnet_1 172.32.0.0/24', '예', '아니오', 'Active', 'UP', 'nova'),
  createData('data test11', 'subnet_1 172.32.0.0/24', '아니오', '아니오', 'Active', 'UP', 'nova'),
  createData('data test12', 'subnet_1 172.32.0.0/24', '예', '아니오', 'Active', 'UP', 'nova'),
  createData('data test13', 'subnet_1 172.32.0.0/24', '아니오', '아니오', 'Active', 'UP', 'nova'),
  
];

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

const COLUMES = {
  server: [
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  volume:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  ip:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'private ip', numeric: false, disablePadding: false, label: 'Private IP' },
    { id: 'sever id', numeric: false, disablePadding: false, label: 'Server ID' }
  ],
  keypair:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'fingerprint', numeric: false, disablePadding: false, label: 'Fingerprint' }
  ],
  database:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'identifier', numeric: false, disablePadding: true, label: 'Identifier' },
    { id: 'engine type', numeric: false, disablePadding: false, label: 'Engine type' },
    { id: 'engine version', numeric: false, disablePadding: false, label: 'Engine version' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'availability', numeric: false, disablePadding: false, label: 'Availability' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' }
  ],
  vpc:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'ipv4 cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'ipv6 cidr', numeric: false, disablePadding: false, label: 'IPv6 CIDR' }
  ],
  subnet:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' },
    { id: 'available ipv4 cidr', numeric: false, disablePadding: false, label: 'Available IPv4 CIDR' },
    { id: 'ipv4 cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'availability zone', numeric: false, disablePadding: false, label: 'Availability Zone' }
  ],
  securitygroup:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'vpc id', numeric: false, disablePadding: false, label: 'VPC ID' },
    { id: 'descryption', numeric: false, disablePadding: false, label: 'Descryption' },
    { id: 'group name', numeric: false, disablePadding: false, label: 'Group Name' }
  ],
  bucket:[
    { id: 'keyid', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'access', numeric: false, disablePadding: false, label: 'Access' },
    { id: 'region', numeric: false, disablePadding: false, label: 'Region' },
    { id: 'create data', numeric: false, disablePadding: false, label: 'Create Data' }
  ]
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, type } = props;
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
        {COLUMES[type].map((headCell) => (
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
      color : '#292933'
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

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
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

export default function EnhancedTable() {

  let {type} =useParams();
  let subject=type.toUpperCase();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('subnetAssociated');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [apiData, setApiData] = useState([])

  /*useEffect(async ()=> {
    let key=JSON.parse(localStorage.getItem('key'))
    let tmp_type=""
    let result = []

    for(let i=0;i<key.length;i++){
      let tmp_data={
        key:key[i],
        data:[]
      }
      if(type=="server"){
          tmp_type="ec2"
      }
      else if(type=="volume"){
        tmp_type="ebs"
      }
      let response = await fetch(`http://localhost:4000/api/cloud/data/${key[i].vendor}/${tmp_type}?key_id=${key[i].key}&type=data`).then(res=>res.json())
      tmp_data.data=response.data
      result.push(tmp_data)
    }

    setApiData(result)
  }, [])*/

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
    <h2 className="listview-title">{subject}</h2>
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
                rowCount={rows.length}
                type={type}
                />
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.subnetAssociated}</TableCell>
                        <TableCell align="right">{row.shared}</TableCell>
                        <TableCell align="right">{row.external}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.adminState}</TableCell>
                        <TableCell align="right">{row.availabilityZones}</TableCell>
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