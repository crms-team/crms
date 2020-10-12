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
import '../resource/table.scss';

const COLUMES = {
    scheduler:[
      {id :'ket_id', numeric: false, disablePadding: false, label: 'KeyID'},
      {id :'session', numeric: false, disablePadding: false, label: 'Session'},
      {id :'resource_id', numeric: false, disablePadding: false, label: 'ResourceID'},
      {id :'time', numeric: false, disablePadding: false, label: 'Time'},
      {id :'date', numeric: false, disablePadding: false, label: 'Date'},
      {id :'cmd', numeric: false, disablePadding: false, label: 'CMD'},
      {id :'always', numeric: false, disablePadding: false, label: 'Always'},
    ]
  }