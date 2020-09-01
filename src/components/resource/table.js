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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FilterListIcon from '@material-ui/icons/FilterList';
import PauseIcon from '@material-ui/icons/Pause';
import './table.scss';
import {useParams} from 'react-router-dom'
import { managerType, awsManager, idType } from "../../manager";

function createData(keys, data) {
  let result = {}

  for(let key of keys) {
    result[key] = data[key]
  }

  return result
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

const COLUMES = {
  server: [
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public_ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  volume:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
  ],
  ip:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'public_ip', numeric: false, disablePadding: false, label: 'Public IP' },
    { id: 'private_ip', numeric: false, disablePadding: false, label: 'Private IP' },
    { id: 'sever_id', numeric: false, disablePadding: false, label: 'Server ID' }
  ],
  keypair:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'fingerprint', numeric: false, disablePadding: false, label: 'Fingerprint' }
  ],
  database:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'identifier', numeric: false, disablePadding: true, label: 'Identifier' },
    { id: 'engine_type', numeric: false, disablePadding: false, label: 'Engine type' },
    { id: 'engine_version', numeric: false, disablePadding: false, label: 'Engine version' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
    { id: 'availability', numeric: false, disablePadding: false, label: 'Availability' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' }
  ],
  vpc:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'ipv4_cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'ipv6_cidr', numeric: false, disablePadding: false, label: 'IPv6 CIDR' }
  ],
  subnet:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'state', numeric: false, disablePadding: false, label: 'State' },
    { id: 'vpc', numeric: false, disablePadding: false, label: 'VPC' },
    { id: 'available_ipv4_cidr', numeric: false, disablePadding: false, label: 'Available IPv4 CIDR' },
    { id: 'ipv4_cidr', numeric: false, disablePadding: false, label: 'IPv4 CIDR' },
    { id: 'availability_zone', numeric: false, disablePadding: false, label: 'Availability Zone' }
  ],
  securitygroup:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'vpc_id', numeric: false, disablePadding: false, label: 'VPC ID' },
    { id: 'descryption', numeric: false, disablePadding: false, label: 'Descryption' },
    { id: 'group_name', numeric: false, disablePadding: false, label: 'Group Name' }
  ],
  bucket:[
    { id: 'key_id', numeric: false, disablePadding: true, label: ' KeyID ' },
    { id: 'name', numeric: false, disablePadding: true, label: ' Name ' },
    { id: 'access', numeric: false, disablePadding: false, label: 'Access' },
    { id: 'region', numeric: false, disablePadding: false, label: 'Region' },
    { id: 'create_data', numeric: false, disablePadding: false, label: 'Create Data' }
  ]
}

const MATCHINGS = {
  aws: {
    ec2: (key_id, resource) => {
      let attr = resource.Instances[0]
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.InstanceId,
        public_ip: attr.PublicIpAddress,
        status: attr.State.Name,
        type: attr.InstanceType,
      }
    },
    ebs: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.VolumeId,
        state: attr.State,
        size: attr.Size,
        type: attr.VolumeType,
      }
    },
    eip: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.AllocationId,
        public_ip: attr.PublicIp,
        private_ip: attr.PrivateIpAddress,
        sever_id: attr.InstanceId,
      }
    },
    keypair: (key_id, resource) => {
      let attr = resource
      let name = ""
      
      return {
        key_id: key_id,
        name: attr.KeyName,
        id: attr.KeyPairId,
        fingerprint: attr.KeyFingerprint,
      }
    },
    rds: (key_id, resource) => {
      let attr = resource

      return {
        key_id: key_id,
        identifier: attr.DBInstanceIdentifier,
        engine_type: attr.Engine,
        engine_version: attr.EngineVersion,
        state:attr.DBInstanceStatus,
        size: attr.AllocatedStorage,
        availability: attr.AvailabilityZone,
        vpc: attr.DBSubnetGroup.VpcId
      }
    },
    vpc: (key_id, resource) => {
      let attr = resource
      let name = ""
      let ipv6 = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }

      for (let ipv6 of attr.Ipv6CidrBlockAssociationSet) {
        if (ipv6.Key == "CidrBlock")  {
          ipv6 = ipv6.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.VpcId,
        state: attr.State,
        ipv4_cidr: attr.CidrBlock,
        ipv6_cidr: ipv6
      }
    },
    subnet: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.SubnetId,
        vpc: attr.VpcId,
        state: attr.State,
        available_ipv4_cidr: attr.CidrBlock,
        ipv4_cidr: attr.CidrBlock,
        availability_zone: attr.AvailabilityZone
      }
    },
    securitygroup: (key_id, resource) => {
      let attr = resource
      let name = ""

      for (let tag of attr.Tags) {
        if (tag.Key == "Name")  {
          name = tag.Value
          break
        }
      }
      
      return {
        key_id: key_id,
        name: name,
        id: attr.GroupId,
        vpc_id: attr.VpcId,
        descryption: attr.Description,
        group_name: attr.GroupName,
      }
    },
    s3: (key_id, resource) => {
      let attr = resource
      
      return {
        key_id: key_id,
        name: attr.Name,
        access: attr.Name,
        region: attr.Name,
        create_data: attr.CreationDate,
      }
    }
  }
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
      color : '#27262b!important'
  }
}));

const EnhancedTableToolbar = (props) => {
  let classes = useToolbarStyles();
  const numSelected  = props.numSelected.length;
  const { data }= props;
  classes = {"root":"makeStyles-root-5","highlight":"makeStyles-highlight-6","title":"makeStyles-title-7","icon":"makeStyles-icon-8"}
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
        <>
          <Tooltip title="On">
            <IconButton 
              aria-label="off"
              onClick={async ()=>{
                let type=props.type
                for (let idx of props.numSelected){
                  let id = data[idx].id
                  let key_id = data[idx].key_id
                  let rst = await idType["aws"][type].manage.start(key_id,id)
                }
              }}
            >
              <PlayArrowIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Off">
              <IconButton 
                onClick={async ()=>{
                  let type=props.type
                  for (let idx of props.numSelected){
                    let id = data[idx].id
                    let key_id = data[idx].key_id
                    let rst = await idType["aws"][type].manage.stop(key_id,id)
                  }
                }}
                aria-label="off"
              >
              <PauseIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              aria-label="delete"
              onClick={async ()=>{
                let type=props.type
                let id;
                for (let idx of props.numSelected){
                  if(type=="keypair"){
                    id=data[idx].name
                  }
                  else if(type=="bucket"){
                    id=data[idx].name
                  }
                  else if(type=="database"){
                    console.log(data[idx])
                    id=data[idx].identifier
                  }
                  else{
                    id = data[idx].id
                  }
                    let key_id = data[idx].key_id
                  let rst = await idType["aws"][type].manage.delete(key_id,id)
                }
              }}
            >
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </>
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
  let keys=JSON.parse(localStorage.getItem('key'))

  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('subnetAssociated');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(()=> {
    setRows([]);
    setSelected([])
    async function test(){
      let result = []
      let columes_list = []

      for (let col of COLUMES[type]) {
        columes_list.push(col.id)
      }


      for(let key of keys){
        let resource_type = managerType[key.vendor][type]
        let response = await fetch(`http://localhost:4000/api/cloud/data/${resource_type}?key_id=${key.key}`).then(res=>res.json())
        if (response.data){
          for (let resource of response.data) {
            result.push(createData(columes_list, MATCHINGS[key.vendor][resource_type](key.key, resource)))
          }  
        }
      }

      setRows(result)
    }
    test();
  },[type])

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick= (event,name,row)=>{
    if(event.target.type=="checkbox"){
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
      setSelected(newSelected)
    }
    else{
      let tmp_type=""
      for(let key of keys){
        if(key.key==row.key_id){
          tmp_type=key.vendor
        }
      }
      window.location.href=`/detail/${row.key_id}/${managerType[tmp_type][type]}/${row.id?row.id: row.identifier ? row.identifier : row.name}`
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
    <h2 className="listview-title">{subject}</h2>
    <div className="table">
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected} data={rows} type={type} />
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
                    const isItemSelected = isSelected(index);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const table =  Object.keys(row).map((v)=>{
                      return <TableCell align="right">{row[v]}</TableCell>
                    })

                    return (
                        <TableRow
                        hover
                        role="checkbox"
                        onClick={(event)=> handleClick(event, index,row)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                          {table}
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