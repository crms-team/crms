import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Table from './table';

class Listview extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="listview">
                <Sidebar/>
                <Table className="table" />
            </div>
        );
    }
}

export default Listview;