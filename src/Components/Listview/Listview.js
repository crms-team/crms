import React, { Component } from 'react';
import Sidemenu from '../Sidemenu/Sidemenu';
import Table from './Table';

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