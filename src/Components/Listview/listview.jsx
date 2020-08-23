import React, { Component } from 'react';
import Sidemenu from '../sidemenu/sidemenu';
import Table from './table';

class Listview extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="listview">
                <Sidemenu />
                <Table className="table" />
            </div>
        );
    }
}

export default Listview;