import React, { Component } from 'react';
import Sidebar from '../sidebar';
import SchedulerTable from './schedulerTable';

class Scheduler extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Sidebar/>
            </div>
        );
    }
}

export default Scheduler;